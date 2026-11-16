"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import testiFrame from "@/asset/testi-frame.png";

type SanityTestimony = {
  _id?: string;
  created_at?: string;
  recap_name?: string | null;
  recap_image?: string | null;
};

type Testimony = {
  id: string;
  name: string;
  recap_image: string;
};

type TestimonyRowProps = {
  testimonies: Testimony[];
  reverse?: boolean;
};

type TestimonyGroupProps = TestimonyRowProps & {
  ariaHidden?: boolean;
};

type TestimoniesResponse = {
  success?: boolean;
  data?: SanityTestimony[];
};

const FALLBACK_NAME = "ALSA EVENT";
const FALLBACK_ROLE = "@alsalcunpad";
const FALLBACK_CONTENT = "ALSA, Always be One!";
import fallback_image from  "@/asset/fallback-image.png";
const FALLBACK_IMAGE =  fallback_image.src;
const MINIMUM_CARD_COUNT = 6;

const FALLBACK_TESTIMONIES = Array.from(
  { length: MINIMUM_CARD_COUNT },
  function (_, index) {
    return {
      id: `fallback-${index}`,
      name: FALLBACK_NAME,
      recap_image: FALLBACK_IMAGE
    };
  },
);

const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--primary-color)] flex flex-col items-center justify-start " +
  "gap-[clamp(18px,2.4vw,34px)] py-[clamp(48px,6vw,76px)] overflow-hidden " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(95%,1300px)] text-center font-medium leading-[clamp(48px,6vw,84px)] " +
  "text-[clamp(32px,4vw,56px)] text-white";

const CAROUSEL_CLASSES =
  "my-[5px] mx-auto w-[min(96%,1380px)] rounded-[clamp(10px,2vw,20px)] " +
  "flex overflow-x-hidden group [&::-webkit-scrollbar]:hidden " +
  "[-ms-overflow-style:'none'] [scrollbar-width:'none']";

const GROUP_BASE_CLASSES =
  "flex items-center justify-center gap-[clamp(14px,2vw,28px)] pr-[clamp(14px,1vw,28px)] " +
  "group-hover:[animation-play-state:paused]";

const GROUP_FORWARD_CLASSES = "animate-[marquee_120s_linear_infinite]";

const GROUP_REVERSE_CLASSES = "animate-[marquee_60s_linear_infinite_reverse]";

const CARD_CLASSES =
  "relative flex-none w-[clamp(19rem,34vw,34rem)] " +
  "max-lg:w-[clamp(18rem,42vw,28rem)] max-md:w-[min(82vw,23rem)] aspect-[3/4]";

const CARD_CONTENT_CLASSES =
  "absolute inset-0 z-20 flex flex-col overflow-hidden px-[13%] pb-[13%] pt-[12%] text-left";

const TESTIMONY_TEXT_CLASSES =
  "mt-[clamp(10px,1.4vw,18px)] overflow-hidden text-justify text-[clamp(14px,1.05vw,16px)] " +
  "font-normal leading-[24px] text-[#333333] " +
  "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] " +
  "max-md:[-webkit-line-clamp:4]";

const PROFILE_TEXT_CLASSES =
  "text-[clamp(14px,1.05vw,16px)] leading-[24px] tracking-[0px] text-[#606060]";

function getTrimmedValue(value: string | null | undefined, fallback: string) {
  const trimmedValue = value?.trim();

  if (trimmedValue) {
    return trimmedValue;
  }

  return fallback;
}

function normalizeTestimony(item: SanityTestimony, index: number): Testimony {
  return {
    id: item._id ?? `sanity-testimony-${index}`,
    name: getTrimmedValue(item.recap_name, FALLBACK_NAME),
    recap_image: getTrimmedValue(item.recap_image, FALLBACK_IMAGE)
  };
}

function fillMarqueeCards(testimonies: Testimony[]) {
  if (testimonies.length === 0) {
    return FALLBACK_TESTIMONIES;
  }

  const filledTestimonies = [...testimonies];

  while (filledTestimonies.length < MINIMUM_CARD_COUNT) {
    const nextItem = testimonies[filledTestimonies.length % testimonies.length];

    filledTestimonies.push({
      ...nextItem,
      id: `${nextItem.id}-duplicate-${filledTestimonies.length}`,
    });
  }

  return filledTestimonies;
}

function normalizeTestimonies(data: SanityTestimony[] | undefined) {
  if (!Array.isArray(data) || data.length === 0) {
    return FALLBACK_TESTIMONIES;
  }

  return fillMarqueeCards(data.map(normalizeTestimony));
}

function getGroupAnimationClasses(reverse?: boolean) {
  if (reverse) {
    return GROUP_REVERSE_CLASSES;
  }

  return GROUP_FORWARD_CLASSES;
}

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  return (
    <article className={CARD_CLASSES}>
      <div className={CARD_CONTENT_CLASSES}>
        <Image
              src={testimony.recap_image}
              alt=""
              width={1080}
              height={1440}
              className="h-full w-full"
              draggable = {false}
              unoptimized
              />
      </div>
    </article>
  );
}

function TestimonyGroup({
  testimonies,
  reverse,
  ariaHidden,
}: TestimonyGroupProps) {
  return (
    <div
      className={`${GROUP_BASE_CLASSES} ${getGroupAnimationClasses(reverse)}`}
      aria-hidden={ariaHidden}
    >
      {testimonies.map(function (testimony, index) {
        return (
          <TestimonyCard
            key={`${testimony.id}-${index}-${reverse ? "reverse" : "forward"}`}
            testimony={testimony}
          />
        );
      })}
    </div>
  );
}

function TestimonyRow({ testimonies, reverse }: TestimonyRowProps) {
  return (
    <div className={CAROUSEL_CLASSES}>
      <TestimonyGroup testimonies={testimonies} reverse={reverse} />
      <TestimonyGroup testimonies={testimonies} reverse={reverse} ariaHidden />
    </div>
  );
}

export default function TestimoniesPreview() {
  const [testimonies, setTestimonies] =
    useState<Testimony[]>(FALLBACK_TESTIMONIES);

  useEffect(function () {
    let isActive = true;

    async function loadTestimonies() {
      try {
        const response = await fetch("/api/testimonies", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load testimonies");
        }

        const result = (await response.json()) as TestimoniesResponse;

        if (!isActive) {
          return;
        }

        setTestimonies(normalizeTestimonies(result.data));
      } catch {
        if (isActive) {
          setTestimonies(FALLBACK_TESTIMONIES);
        }
      }
    }

    loadTestimonies();

    return function cleanup() {
      isActive = false;
    };
  }, []);

  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>Event Recap</h2>
      <TestimonyRow testimonies={testimonies} />
      {/* <TestimonyRow testimonies={testimonies} reverse /> */}
    </section>
  );
}
