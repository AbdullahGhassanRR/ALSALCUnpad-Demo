'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import internationally_minded_image from '@/asset/internationally-minded-image-bg.png';
import academically_commited_image from '@/asset/academically-commited-image-bg.png';
import legally_skilled_image from '@/asset/legally-skilled-image-bg.png';
import socially_responsible_image from '@/asset/socially-responsible-image-bg.png';

type Pilar = { icon: string; label: string; bgImage: string; bgPosition?: string };

const PILARS: Pilar[] = [
  { icon: 'fa-solid fa-globe fa-10x',       label: 'Internationally\nMinded',    bgImage: `url(${internationally_minded_image.src})`, bgPosition: 'center 60%' },
  { icon: 'fas fa-book-open fa-10x',        label: 'Academically\nCommited',     bgImage: `url(${academically_commited_image.src})`,  bgPosition: 'center center' },
  { icon: 'fa-solid fa-scale-balanced fa-10x', label: 'Legally\nSkilled',        bgImage: `url(${legally_skilled_image.src})`,        bgPosition: 'center center' },
  { icon: 'fas fa-users fa-10x',            label: 'Socially\nResponsible',      bgImage: `url(${socially_responsible_image.src})`,   bgPosition: 'center center' },
];

const TEXT_BOX_CLASSES =
  "bg-[var(--secondary-color)] h-[clamp(5rem,12vw,13rem)] w-[clamp(12rem,22vw,26rem)] " +
  "mr-[clamp(1.5rem,7vw,11rem)] flex items-center justify-center " +
  "rounded-[clamp(12px,2vw,20px)] max-md:mr-0 max-md:h-auto";

const TEXT_CLASSES =
  "font-bold text-[var(--primary-color)] text-[clamp(1.2rem,2.5vw,3rem)] text-center max-md:text-[1.5rem]";

export default function Pilars() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !cardsAreaRef.current) return;

    const cards = Array.from(sectionRef.current.querySelectorAll<HTMLElement>('.pilar-card'));
    const areaHeight = cardsAreaRef.current.offsetHeight;
    const scrollPerCard = window.innerHeight;

    const ctx = gsap.context(() => {
      // Position all cards: centered via xPercent/yPercent, cards after first start below the area
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          y: i > 0 ? areaHeight : 0,
        });
      });

      // For each card after the first: slide it in while scaling the previous card down
      cards.forEach((card, i) => {
        if (i === 0) return;

        const startOffset = (i - 1) * scrollPerCard;
        const endOffset = i * scrollPerCard;

        gsap.to(card, {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${startOffset} top`,
            end: `top+=${endOffset} top`,
            scrub: true,
          },
        });

        gsap.to(cards[i - 1], {
          scale: 0.88,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${startOffset} top`,
            end: `top+=${endOffset} top`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Section height = 1 visible screen (sticky) + (n-1) card transitions × 100vh
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--primary-color)]"
      style={{ height: `${PILARS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[90vh] flex flex-col overflow-hidden bg-linear-to-b from-[#76030A] to-(--primary-color) md:h-screen">

        {/* Title — stays fixed at top while cards animate below */}
        <div className="shrink-0 flex items-center justify-center py-[clamp(0.5rem,2vh,2rem)]">
          <h1 className="font-bold text-[clamp(1.8rem,8vw,8rem)] text-white text-center">
            Four Pillars of ALSA
          </h1>
        </div>

        {/* Cards area — overflow hidden so off-screen cards are invisible */}
        <div ref={cardsAreaRef} className="relative flex-1 overflow-hidden">
          {PILARS.map((pilar, index) => {
            const lines = pilar.label.split('\n');
            return (
              <div
                key={index}
                className={
                  "pilar-card absolute top-1/2 left-1/2 " +
                  "h-[clamp(220px,40vw,50vh)] w-[min(90%,1200px)] " +
                  "flex items-center justify-between bg-cover " +
                  "rounded-[clamp(12px,2vw,20px)] max-md:justify-evenly"
                }
                style={{
                  backgroundImage: pilar.bgImage,
                  backgroundPosition: pilar.bgPosition,
                  zIndex: index + 1,
                }}
              >
                <div className="flex-1 ml-[clamp(1.5rem,8vw,13rem)] flex items-center max-md:flex-none max-md:justify-center max-md:ml-0">
                  <i className={`${pilar.icon} max-md:text-[60px]!`}></i>
                </div>
                <div className={TEXT_BOX_CLASSES}>
                  <h1 className={TEXT_CLASSES}>
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}