// "use client";

// import { useEffect, useRef } from "react";
import HeroGsap from "./HeroGsap";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import batik_kiri from "@/asset/batik_kiri_new.png";
import batik_kanan from "@/asset/batik_kanan_new.png";
import statue from "@/asset/statue__.png";
import leftBatik from "@/asset/left-batik.png";
import rightBatik from "@/asset/right-batik.png";
import logo from "@/asset/logo_alsalcunpad_primary_color.png";

gsap.registerPlugin(ScrollTrigger);
const SCROLL_ANIMATION_LEFT = "animate-[slide-left-scroll_linear] [animation-timeline:scroll()] [animation-range:exit]";
const SCROLL_ANIMATION_RIGHT = "animate-[slide-right-scroll_linear] [animation-timeline:scroll()] [animation-range:exit]";

export default function Hero() {
  
  return (
    /*
      Layout:
        - section1: 100vh  (big title + cropped statue)
        - section2: 100vh  (welcome element, pinned by ScrollTrigger during reveal)
        - batik: position:fixed, always on screen, driven by GSAP
    */
    <HeroGsap>

      {/* ── SECTION 1 ─────────────────────────────────────────────── */}
      <section
        id="section-1"
        className="relative h-[100vh] overflow-hidden bg-[rgb(240,240,234)] max-md:hidden"
      >
        <h1
          id="big-title"
          aria-label="ALSA LC UNPAD"
          className="
            hero-title-stroke pointer-events-none select-none
            absolute left-1/2 top-[50%] z-[1]
            w-[110vw] -translate-x-1/2 -translate-y-1/2
            text-center font-bold leading-none text-[#76030A]
            text-[clamp(64px,13vw,240px)]
            max-lg:top-[25%]
            max-md:top-[28%] max-md:w-[126vw] max-md:text-[clamp(56px,18vw,104px)]
          "
        >
          ALSA LC UNPAD
        </h1>

        {/*
          Statue: much larger, anchored to top-center, overflows section bottom.
          overflow-hidden on section clips the bottom half cleanly.

          
        */}
        <div
          id="law-statue-desktop"
          className="pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 max-md:hidden"
          style={{
            top: "20%",
            left: "44%",
            width: "clamp(280px, 50vw, 640px)",
            height: "100vh",
          }}
        >
          <Image
            src={statue}
            alt="Law statue"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-contain object-top"
          />
        </div>

      </section>

      {/* ── SECTION 2 ─────────────────────────────────────────────── */}
      <section
        id="section-2"
        className="relative h-screen overflow-hidden bg-[rgb(240,240,234)]"
      >
        <div
          id="welcome-element"
          className="absolute inset-0 z-[1] flex items-end justify-center px-[5vw] py-16 md:py-24 md:items-center"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-12 md:flex-row md:gap-8">
            <div className="flex-1 space-y-4 max-md:text-left">
              <h2 className="text-[clamp(30px,6vw,64px)] font-bold leading-tight text-[#76030A]">
                Welcome
              </h2>
              <p className="text-[clamp(10px,2.5vw,32px)] font-medium leading-snug text-[#76030A]">
                to Asian Law Students&apos; Association
                <br />
                Local Chapter Universitas Padjadjaran
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative md:h-[260px] md:w-[360px] lg:h-[320px] lg:w-[480px] max-md:hidden">
                <Image
                  src={logo}
                  alt="ALSA LC Unpad Logo"
                  fill
                  sizes = "40vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        ── BATIK DECORATOR FOR DESKTOP ────────────────────────────────────────────
        Fixed to the viewport so GSAP can control its position purely
        via translateY (y).

        Initial resting position: straddling the s1/s2 boundary.
          - The boundary is at 100vh from page top.
          - We want the batik centered on that line.
          - So: top = 100vh, transform: translateY(-50%) centers it on the boundary.
          - GSAP then adds y: 50vh in Phase 1 to move center → middle of s2.

        z-index 20 so it sits above both sections' content.
      */}
      <div
        id="batik-decorator-desktop"
        className="pointer-events-none fixed left-0 w-full md:block"
        style={{
          // Center the batik on the section boundary (100vh from top of page)
          top: "100vh",
          transform: "translateY(-50%)",
          height: "clamp(170px, 30vw, 390px)",
          zIndex: 20,
        }}
      >
        {/* Left half */}
        <div
          id="left-batik"
          className="absolute right-1/2 h-full w-[50.5vw] max-md:h-30 max-md:w-[70vw]"
        >
          <Image
            src={leftBatik}
            alt="Left batik ornament"
            fill
            priority
            sizes="60vw"
            className="object-fill"
          />
        </div>

        {/* Right half */}
        <div
          id="right-batik"
          className="absolute left-1/2 h-full w-[50.5vw] max-md:h-30 max-md:w-[70vw]"
        >
          <Image
            src={rightBatik}
            alt="Right batik ornament"
            fill
            priority
            sizes="60vw"
            className="object-fill"
          />
        </div>
      </div>

      <div id='batik-decorator-mobile' className="h-[clamp(200px,40vh)] w-auto flex justify-center overflow-clip max-md:visible max-md:h-[15vh] md:hidden">
        
        <div id='scroll-wrapper-left' className={`w-full h-full ${SCROLL_ANIMATION_LEFT}`}>
          <Image
            src={batik_kiri}
            alt="batik-kiri"
            width={600}
            height={800}
            className="w-full h-full animate-[slide-left_1.3s]"
          />
        </div>

        <div id='scroll-wrapper-right' className={`w-full h-full ${SCROLL_ANIMATION_RIGHT}`}>
          <Image
            src={batik_kanan}
            alt="batik-kanan"
            width={600}
            height={800}
            className="w-full h-full animate-[slide-right_1.3s]"
          />
        </div>
      </div>
    </HeroGsap>
  );
}
