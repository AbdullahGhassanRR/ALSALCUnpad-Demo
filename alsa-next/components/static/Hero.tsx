"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import statue from "@/asset/statue.png";
import leftBatik from "@/asset/left-batik.png";
import rightBatik from "@/asset/right-batik.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const leftBatikRef = useRef<HTMLDivElement | null>(null);
  const rightBatikRef = useRef<HTMLDivElement | null>(null);
  const welcomeTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    const leftBatik = leftBatikRef.current;
    const rightBatik = rightBatikRef.current;
    const welcomeText = welcomeTextRef.current;

    if (!hero || !scene || !leftBatik || !rightBatik || !welcomeText) return;

    const ctx = gsap.context(() => {
      gsap.set(welcomeText, { autoAlpha: 0, y: 36 });
      gsap.set([leftBatik, rightBatik], { xPercent: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=80%",
            pin: scene,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
          },
        })
        .to(leftBatik, { xPercent: -82, ease: "none" }, 0)
        .to(rightBatik, { xPercent: 82, ease: "none" }, 0)
        .to(
          welcomeText,
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
          },
          0.12,
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-x-hidden bg-[rgb(240,240,234)]"
    >
      <div ref={sceneRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[rgb(240,240,234)]" />

        <h1
          aria-label="ALSA LC UNPAD"
          className="hero-title-stroke pointer-events-none absolute left-1/2 top-[25%] z-[1] w-[120vw] -translate-x-1/2 -translate-y-1/2 select-none text-center text-[clamp(64px,13vw,240px)] font-bold leading-none text-[#76030A] max-lg:top-[28%] max-md:top-[31%] max-md:w-[126vw] max-md:text-[clamp(56px,18vw,104px)]"
        >
          ALSA LC UNPAD
        </h1>

        <div className="pointer-events-none absolute left-1/2 top-[53%] z-[2] h-[min(83vh,860px)] w-[min(46vw,485px)] -translate-x-1/2 -translate-y-1/2 max-lg:h-[min(78vh,760px)] max-lg:w-[min(56vw,430px)] max-md:top-[52%] max-md:h-[min(66vh,590px)] max-md:w-[min(76vw,315px)]">
          <Image
            src={statue}
            alt="Law statue"
            fill
            priority
            sizes="(max-width: 768px) 76vw, (max-width: 1024px) 56vw, 46vw"
            className="object-contain"
          />
        </div>

        <div
          ref={welcomeTextRef}
          className="absolute left-1/2 top-[34%] z-[3] w-[min(78vw,920px)] -translate-x-1/2 text-center max-md:top-[24%] max-md:w-[88vw]"
        >
          <p className="text-[clamp(42px,7vw,112px)] font-bold leading-[0.92] text-[#76030A] max-md:text-[clamp(36px,14vw,68px)]">
            Welcome
          </p>
          <p className="mx-auto mt-4 max-w-[780px] text-[clamp(18px,2.1vw,34px)] font-bold leading-tight text-[#76030A] max-md:mt-3 max-md:text-[clamp(15px,4.8vw,22px)]">
            to Asian Law Students&apos; Association
            <br />
            Local Chapter Universitas Padjadjaran.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-[4] flex h-[clamp(170px,30vw,390px)] items-center justify-center max-md:bottom-[13vh] max-md:h-[clamp(118px,38vw,210px)]">
          <div
            ref={leftBatikRef}
            className="absolute left-1/2 h-full w-[min(58vw,650px)] -translate-x-[93%] max-md:w-[72vw] max-md:-translate-x-[91%]"
          >
            <Image
              src={leftBatik}
              alt="Left batik ornament"
              fill
              priority
              sizes="(max-width: 768px) 72vw, 58vw"
              className="object-contain object-right"
            />
          </div>

          <div
            ref={rightBatikRef}
            className="absolute left-1/2 h-full w-[min(60vw,690px)] -translate-x-[7%] max-md:w-[76vw] max-md:-translate-x-[9%]"
          >
            <Image
              src={rightBatik}
              alt="Right batik ornament"
              fill
              priority
              sizes="(max-width: 768px) 76vw, 60vw"
              className="object-contain object-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
