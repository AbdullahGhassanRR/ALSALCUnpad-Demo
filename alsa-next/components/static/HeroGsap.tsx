"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroGsap({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const media = gsap.matchMedia(wrapper);

    media.add("(min-width: 768px)", () => {
      const section2 = wrapper.querySelector<HTMLElement>("#section-2");
      const batik = wrapper.querySelector<HTMLElement>(
        "#batik-decorator-desktop",
      );
      const leftBatik = wrapper.querySelector<HTMLElement>("#left-batik");
      const rightBatik = wrapper.querySelector<HTMLElement>("#right-batik");

      if (!section2 || !batik || !leftBatik || !rightBatik) return;

      gsap.to(batik, {
        y: "-50vh",
        ease: "none",
        scrollTrigger: {
          trigger: section2,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section2,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: section2,
            pinSpacing: true,
          },
        })
        .to(leftBatik, { xPercent: -110, ease: "none" }, 0)
        .to(rightBatik, { xPercent: 110, ease: "none" }, 0);
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {children}
    </div>
  );
}