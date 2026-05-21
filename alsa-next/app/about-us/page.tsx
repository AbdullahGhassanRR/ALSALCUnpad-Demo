"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import HeaderNavbar from "@/components/static/HeaderNavbar";
import ShapeGrid from "@/components/static/ShapeGrid";
import FooterPreview from "@/components/dynamic/FooterPreview";

type DirectorGreeting = {
  _id: string;
  name: string;
  period: string;
  greeting: string;
  director_image_url: string | null;
};

type DirectorGreetingResponse = {
  success: boolean;
  data?: DirectorGreeting | null;
};

type LocalChapter = {
  _id: string;
  university_name: string;
  instagram_url: string;
  logo_url: string | null;
};

type LocalChaptersResponse = {
  success: boolean;
  data?: LocalChapter[];
};

type AlsaNumberStat = {
  label: string;
  value: number;
};

const ALSA_NUMBER_STATS: AlsaNumberStat[] = [
  {
    label: "Members",
    value: 9000,
  },
  {
    label: "National Chapter",
    value: 18,
  },
];

const VISION_TEXT =
  "To make ALSA Local Chapter Universitas Padjadjaran as an organization based on the principles of kinship and professionalism, dedicated to developing human resources in reflecting the four pillars of ALSA in an inclusive, progressive, collaborative, and innovative environment.";

const MISSION_ITEMS = [
  "The optimization of ALSA LC Unpad as a platform for the self-development of its members, with the objective of cultivating quality human resources that possess a global perspective.",
  "The establishment of a sense of unity and belonging within ALSA LC Unpad, characterized by interactive, inclusive, and innovative environments that seamlessly integrate professionalism with a spirit of unity.",
  "The positioning of ALSA LC Unpad as an organization that contributes to and synergizes with KMFH, Unpad, Alumni, ALSA Indonesia, and the community.",
  "The organization is committed to being a pioneer in implementing innovative changes.",
];

const FALLBACK_LOCAL_CHAPTERS: LocalChapter[] = [
  {
    _id: "fallback-universitas-syiah-kuala",
    university_name: "Universitas Syiah Kuala",
    instagram_url: "https://www.instagram.com/alsalcusk",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-indonesia",
    university_name: "Universitas Indonesia",
    instagram_url: "https://www.instagram.com/alsalcui",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-gadjah-mada",
    university_name: "Universitas Gadjah Mada",
    instagram_url: "https://www.instagram.com/alsalcugm",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-brawijaya",
    university_name: "Universitas Brawijaya",
    instagram_url: "https://www.instagram.com/alsalcub",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-mulawarman",
    university_name: "Universitas Mulawarman",
    instagram_url: "https://www.instagram.com/alsalcunmul",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-andalas",
    university_name: "Universitas Andalas",
    instagram_url: "https://www.instagram.com/alsalcunand",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-padjadjaran",
    university_name: "Universitas Padjadjaran",
    instagram_url: "https://www.instagram.com/alsalcunpad",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-diponegoro",
    university_name: "Universitas Diponegoro",
    instagram_url: "https://www.instagram.com/alsalcundip",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-jember",
    university_name: "Universitas Jember",
    instagram_url: "https://www.instagram.com/alsalcuj",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-hasanuddin",
    university_name: "Universitas Hasanuddin",
    instagram_url: "https://www.instagram.com/alsalcunhas",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-sriwijaya",
    university_name: "Universitas Sriwijaya",
    instagram_url: "https://www.instagram.com/alsalcunsri",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-jenderal-soedirman",
    university_name: "Universitas Jenderal Soedirman",
    instagram_url: "https://www.instagram.com/alsalcunsoed",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-airlangga",
    university_name: "Universitas Airlangga",
    instagram_url: "https://www.instagram.com/alsalcunair",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-udayana",
    university_name: "Universitas Udayana",
    instagram_url: "https://www.instagram.com/alsalcunud",
    logo_url: null,
  },
  {
    _id: "fallback-universitas-sam-ratulangi",
    university_name: "Universitas Sam Ratulangi",
    instagram_url: "https://www.instagram.com/alsalcunsrat",
    logo_url: null,
  },
];

const FALLBACK_GREETING: DirectorGreeting = {
  _id: "fallback-director-greeting",
  name: "Muhammad Fadhlurrahman Wijaya",
  period: "2025-2026",
  director_image_url: null,
  greeting: `Assalamu'alaikum warahmatullahi wabarakatuh,

Shalom,
Om Swastiastu,
Namo Buddhaya,
Greetings Virtue.

Greetings, ALSA-ians!

        Welcome to the official website of ALSA Local Chapter Universitas Padjadjaran (ALSA LC Unpad). ALSA or Asian Law Students' Association is a non-political and non-profit organization that connects law students across Asia. ALSA consist of 18 National Chapters from various Asian countries and 1 Associate Chapter in the United Kingdom. In Indonesia, ALSA has 15 Local Chapters and ALSA LC Unpad is one of the Local Chapters which has stood strong for more than 24 years. ALSA has four pillars that represent the whole values of ALSA itself, which are Internationally Minded, Socially Responsible, Academically Committed, and Legally Skilled. These pillars are reflected in our members and are implemented through every activity we conduct.

      This website contains information about ALSA LC Unpad's work programs, the history of ALSA, the Local Board of ALSA LC Unpad, former Local Boards, and various resources that you can access anytime. We also feature one of our a work programs, "ALSA Legal Aid", where you can submit questions or concerns regarding current legal issues, and our academic team will assist you by providing appropriate guidance.

       Lastly, I am proud to present this website to you. I hope this website can broaden your insight of ALSA Local Chapter Universitas Padjadjaran.

Wassalamu'alaikum Warahmatullahi Wabarakatuh,
Shalom,
Om Shanti Shanti Shanti Om,
Namo Buddhaya.

Show your contribution,
develop your skills,
and connect to others.

ALSA, Always Be One!`,
};

const FADE_UP_ANIMATION = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

const VIEWPORT_ONCE = { once: true, amount: 0.22 } as const;

function CountUpStat({ label, value }: AlsaNumberStat) {
  const [displayValue, setDisplayValue] = useState(0);
  const statRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      const element = statRef.current;

      if (!element) return;

      let frameId = 0;
      let hasAnimated = false;

      function animateCount() {
        const duration = 1400;
        const startTime = performance.now();

        function update(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setDisplayValue(Math.round(value * easedProgress));

          if (progress < 1) {
            frameId = requestAnimationFrame(update);
          }
        }

        frameId = requestAnimationFrame(update);
      }

      const observer = new IntersectionObserver(
        function (entries) {
          const entry = entries[0];

          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCount();
            observer.disconnect();
          }
        },
        {
          threshold: 0.35,
        },
      );

      observer.observe(element);

      return function () {
        observer.disconnect();
        cancelAnimationFrame(frameId);
      };
    },
    [value],
  );

  return (
    <div ref={statRef} className="text-center">
      <div className="text-[clamp(3.25rem,8vw,6.5rem)] font-extrabold leading-none text-(--secondary-color)">
        {displayValue.toLocaleString("en-US")}
      </div>
      <p className="mt-3 text-[clamp(1.15rem,2.2vw,1.8rem)] font-bold text-(--secondary-color)">
        {label}
      </p>
    </div>
  );
}

export default function AboutUsPage() {
  const [directorGreeting, setDirectorGreeting] = useState(FALLBACK_GREETING);
  const [localChapters, setLocalChapters] = useState(FALLBACK_LOCAL_CHAPTERS);
  const [hoveredChapterId, setHoveredChapterId] = useState<string | null>(null);

  useEffect(function () {
    let isMounted = true;

    async function loadAboutUsContent() {
      try {
        const [directorResponse, localChaptersResponse] = await Promise.all([
          fetch("/api/director-greeting", {
            method: "GET",
            cache: "no-store",
          }),
          fetch("/api/local-chapters", {
            method: "GET",
            cache: "no-store",
          }),
        ]);

        if (directorResponse.ok) {
          const directorPayload =
            (await directorResponse.json()) as DirectorGreetingResponse;

          if (isMounted && directorPayload.success && directorPayload.data) {
            setDirectorGreeting(directorPayload.data);
          }
        }

        if (localChaptersResponse.ok) {
          const localChaptersPayload =
            (await localChaptersResponse.json()) as LocalChaptersResponse;

          if (
            isMounted &&
            localChaptersPayload.success &&
            localChaptersPayload.data &&
            localChaptersPayload.data.length > 0
          ) {
            setLocalChapters(localChaptersPayload.data);
          }
        }
      } catch {
        // Keep fallback content when the CMS request is unavailable.
      }
    }

    loadAboutUsContent();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <HeaderNavbar />
      <main className="min-h-screen bg-(--bg-color-primary) pt-40 overflow-hidden">
        <section className="relative isolate pb-32">
          <div className="mx-auto flex w-full max-w-305 flex-col gap-[clamp(44px,6vw,78px)]">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-5xl mx-auto font-extrabold uppercase leading-[1.08] text-(--secondary-color)">
                Greeting From
              </p>
              <h1 className="mt-2 text-5xl mx-auto font-extrabold uppercase leading-[1.12] text-(--secondary-color)">
                Director ALSA LC Unpad {directorGreeting.period}
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.75fr_1fr]">
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={FADE_UP_ANIMATION}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
              >
                <p className="whitespace-pre-wrap text-justify text-base font-semibold leading-[1.55] text-(--secondary-color)">
                  {directorGreeting.greeting}
                </p>
              </motion.article>

              <motion.aside
                className="w-full justify-start overflow-visible"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: "100vw" },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative h-130 w-full overflow-visible">
                    <div className="absolute bottom-0 left-0 h-[72%] w-full rounded-tl-[clamp(34px,6vw,72px)] bg-(--secondary-color) lg:w-screen" />

                    {directorGreeting.director_image_url ? (
                      <Image
                        src={directorGreeting.director_image_url}
                        alt={directorGreeting.name}
                        fill
                        priority
                        className="absolute z-10 object-contain object-bottom-left"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 620px"
                      />
                    ) : (
                      <div className="absolute inset-0 z-10 flex items-center justify-center px-8 text-center text-(--primary-color)">
                        Director image will appear after the CMS seed is
                        published.
                      </div>
                    )}
                  </div>

                  <div className="mt-4 w-fit">
                    <h2 className="text-3xl font-extrabold text-(--secondary-color)">
                      {directorGreeting.name}
                    </h2>
                    <div className="mt-2 mx-auto h-0.5 w-full bg-(--secondary-color)" />
                    <p className="mt-2 text-xl font-semibold text-(--secondary-color)">
                      Director ALSA LC Unpad {directorGreeting.period}
                    </p>
                  </div>
                </motion.div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="bg-(--secondary-color) px-32 py-[clamp(72px,9vw,128px)]">
          <div className="mx-auto grid w-full max-w-305 gap-[clamp(48px,6vw,88px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="mt-2 text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none text-(--primary-color)">
                Visi
              </h2>
              <p className="mt-[clamp(24px,3vw,40px)] text-justify text-[clamp(1.05rem,1.8vw,1.65rem)] font-semibold leading-[1.55] text-(--primary-color)">
                {VISION_TEXT}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            >
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none text-(--primary-color)">
                Misi
              </h2>
              <div className="mt-[clamp(24px,3vw,40px)] space-y-[clamp(18px,2vw,28px)]">
                {MISSION_ITEMS.map(function (item, index) {
                  return (
                    <motion.div
                      key={item}
                      className="grid grid-cols-[auto_1fr] gap-[clamp(12px,1.6vw,20px)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={VIEWPORT_ONCE}
                      variants={FADE_UP_ANIMATION}
                      transition={{
                        duration: 0.55,
                        ease: "easeOut",
                        delay: index * 0.05,
                      }}
                    >
                      <span className="flex h-[clamp(32px,3vw,44px)] w-[clamp(32px,3vw,44px)] items-center justify-center rounded-full border-2 border-(--primary-color) text-[clamp(0.9rem,1.4vw,1.2rem)] font-bold text-(--primary-color)">
                        {index + 1}
                      </span>
                      <p className="text-justify text-[clamp(1rem,1.45vw,1.3rem)] font-semibold leading-[1.55] text-(--primary-color)">
                        {item}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-(--bg-color-primary) py-[clamp(72px,9vw,128px)]">
          <div className="mx-auto w-full max-w-305">
            <motion.h2
              className="text-center text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-none text-(--secondary-color)"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Our Local Chapter
            </motion.h2>

            <div className="mt-[clamp(48px,6vw,84px)] grid grid-cols-2 gap-x-[clamp(28px,6vw,88px)] gap-y-[clamp(44px,7vw,96px)] md:grid-cols-3 lg:grid-cols-5">
              {localChapters.map(function (chapter) {
                const hasHoveredChapter = hoveredChapterId !== null;
                const isHoveredChapter = hoveredChapterId === chapter._id;

                return (
                  <motion.a
                    key={chapter._id}
                    href={chapter.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex min-h-[clamp(190px,22vw,270px)] flex-col items-center justify-start text-center no-underline outline-none"
                    aria-label={`Open ${chapter.university_name} Instagram`}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    animate={{
                      opacity:
                        hasHoveredChapter && !isHoveredChapter ? 0.34 : 1,
                      scale: isHoveredChapter ? 1.12 : 1,
                      filter:
                        hasHoveredChapter && !isHoveredChapter
                          ? "brightness(0.42) saturate(0.75)"
                          : "brightness(1) saturate(1)",
                      zIndex: isHoveredChapter ? 10 : 1,
                    }}
                    transition={{
                      duration: 0.28,
                      ease: "easeOut",
                    }}
                    onPointerEnter={function () {
                      setHoveredChapterId(chapter._id);
                    }}
                    onPointerLeave={function () {
                      setHoveredChapterId(null);
                    }}
                    onFocus={function () {
                      setHoveredChapterId(chapter._id);
                    }}
                    onBlur={function () {
                      setHoveredChapterId(null);
                    }}
                  >
                    <div className="absolute inset-x-3 top-2 h-[clamp(118px,13vw,170px)] rounded-full bg-[rgba(240,240,234,0.12)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    <div className="relative flex h-[clamp(118px,13vw,170px)] w-[clamp(118px,13vw,170px)] items-center justify-center transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">
                      {chapter.logo_url ? (
                        <Image
                          src={chapter.logo_url}
                          alt={`${chapter.university_name} logo`}
                          fill
                          sizes="(max-width: 768px) 118px, (max-width: 1024px) 13vw, 170px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-(--secondary-color) text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-(--secondary-color)">
                          {chapter.university_name
                            .replace("Universitas ", "")
                            .split(" ")
                            .map(function (word) {
                              return word[0];
                            })
                            .join("")
                            .slice(0, 3)}
                        </div>
                      )}
                    </div>
                    <p className="mt-5 max-w-45 text-[clamp(1rem,1.6vw,1.35rem)] font-bold leading-tight text-(--secondary-color)">
                      {chapter.university_name}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-(--secondary-color) py-[clamp(64px,8vw,112px)]">
          <div className="relative mx-auto w-full max-w-305 overflow-hidden bg-(--primary-color) px-[clamp(24px,5vw,72px)] py-[clamp(64px,8vw,104px)]">
            <ShapeGrid
              speed={0.45}
              squareSize={46}
              direction="diagonal"
              borderColor="rgba(240,240,234,0.18)"
              hoverFillColor="rgba(240,240,234,0.16)"
              shape="square"
              hoverTrailAmount={5}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-[rgba(116,1,7,0.72)]" />

            <motion.h2
              className="relative z-10 text-center text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-none text-(--secondary-color)"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              ALSA In Numbers
            </motion.h2>

            <motion.div
              className="relative z-10 mx-auto mt-[clamp(32px,5vw,56px)] grid max-w-160 grid-cols-1 gap-[clamp(28px,5vw,64px)] sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={FADE_UP_ANIMATION}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            >
              {ALSA_NUMBER_STATS.map(function (stat) {
                return (
                  <CountUpStat
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                  />
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <FooterPreview />
    </div>
  );
}
