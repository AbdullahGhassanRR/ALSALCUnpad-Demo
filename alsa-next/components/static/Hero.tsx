"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import statue from "@/asset/statue.png";
import leftBatik from "@/asset/left-batik.png";
import rightBatik from "@/asset/right-batik.png";
import logo from "@/asset/logo_alsalcunpad_primary_color.png";

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
      gsap.set([leftBatik, rightBatik], { xPercent: 0 });
      gsap.set(welcomeText, { autoAlpha: 0, y: 40 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=100%",
            pin: scene,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
          },
        })
        .to(leftBatik, { duration: 55, xPercent: -100, autoAlpha: 0, ease: "none" }, 0)
        .to(rightBatik, { duration: 55, xPercent: 100, autoAlpha: 0, ease: "none" }, 0)
        .to(welcomeText, { duration: 55, autoAlpha: 1, y: 0, ease: "none" }, 45);
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
          className="absolute inset-0 z-[3] flex items-center justify-center bg-[rgb(240,240,234)] px-[5vw] py-16 md:py-24"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 md:flex-row md:gap-8">
            <div className="flex-1 space-y-4 max-md:text-center">
              <h2 className="text-[clamp(40px,6vw,64px)] font-bold leading-tight text-[#76030A]">
                Welcome
              </h2>
              <p className="text-[clamp(20px,2.5vw,32px)] font-medium leading-snug text-[#76030A]">
                to Asian Law Students&apos; Association
                <br />
                Local Chapter Universitas Padjadjaran
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative h-[180px] w-[240px] md:h-[260px] md:w-[360px] lg:h-[320px] lg:w-[480px]">
                <Image
                  src={logo}
                  alt="ALSA LC Unpad Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-[4] flex h-[clamp(170px,30vw,390px)] w-full items-center justify-center max-md:bottom-[13vh] max-md:h-[clamp(118px,38vw,210px)]">
          <div
            ref={leftBatikRef}
            className="absolute right-1/2 h-full w-[50.5vw]"
          >
            <Image
              src={leftBatik}
              alt="Left batik ornament"
              fill
              priority
              sizes="51vw"
              className="object-fill"
            />
          </div>

          <div
            ref={rightBatikRef}
            className="absolute left-1/2 h-full w-[50.5vw]"
          >
            <Image
              src={rightBatik}
              alt="Right batik ornament"
              fill
              priority
              sizes="51vw"
              className="object-fill"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
