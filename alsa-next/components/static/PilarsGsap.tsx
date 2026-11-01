"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PilarsAnimation({
  children,
}: {
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const section = root.querySelector<HTMLElement>("[data-pilars-section]");
    const cardsArea = root.querySelector<HTMLElement>(
      "[data-pilars-cards-area]",
    );

    if (!section || !cardsArea) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".pilar-card"),
    );
    if (cards.length < 2) return;

    const areaHeight = cardsArea.offsetHeight;
    const scrollPerCard = window.innerHeight;
    if (areaHeight === 0 || scrollPerCard === 0) return;

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          y: index > 0 ? areaHeight : 0,
        });
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const startOffset = (index - 1) * scrollPerCard;
        const endOffset = index * scrollPerCard;

        gsap.to(card, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${startOffset} top`,
            end: `top+=${endOffset} top`,
            scrub: true,
          },
        });

        gsap.to(cards[index - 1], {
          scale: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${startOffset} top`,
            end: `top+=${endOffset} top`,
            scrub: true,
          },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}