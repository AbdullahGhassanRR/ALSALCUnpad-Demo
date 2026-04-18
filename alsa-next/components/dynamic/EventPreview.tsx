'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import LAMP_image from '@/asset/LAMP.png';
import ASVP_image from '@/asset/ASVP.png';
import alsa_english_challenge_image from '@/asset/alsa-english-challenge.png'

type EventPreviewResponse = {
  success: boolean;
  data?: EventPreviewItem[];
};

type EventSlide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type EventPreviewItem = {
  _id: string;
  event_title: string;
  event_description: string;
  event_image_url: string | null;
};

const FALLBACK_SLIDES: EventSlide[] = [
  {
    src: `${LAMP_image.src}`,
    alt: 'Law Alumni Mentoring Programme',
    title: 'Law Alumni Mentoring Programme',
    description:
      'Designed around the concept of guidance and mentorship, involving alumni who are currently working as legal professionals in various fields of law as mentors for student participants.',
  },
  {
    src: `${ASVP_image.src}`,
    alt: 'ALSA Social Village Project',
    title: 'ALSA Social Village Project',
    description:
      'Designed as a community service initiative carried out in rural areas. The program aims to contribute directly to village communities by implementing activities based on the four core pillars.',
  },
  {
    src: `${alsa_english_challenge_image.src}`,
    alt: 'ALSA English Challenge',
    title: 'ALSA English Challenge',
    description:
      'A national annual english competition under the English Development Subdivision of the Academic Activities Division of ALSA LC Unpad that strives to create opportunities to train and sharpen the english skills, both spoken and written, of all students across Indonesia.',
  },
];

// DRY: Shared styles
const SECTION_CLASSES = 
  "min-h-[100vh] w-full flex flex-col items-center bg-[var(--secondary-color)] max-md:min-h-[50vh]";

const TITLE_CLASSES = 
  "text-[var(--primary-color)] text-[clamp(1.8rem,8vw,8rem)] mt-[clamp(24px,4vw,60px)] font-bold";

const CONTAINER_CLASSES = 
  "w-[min(90%,1100px)] h-[clamp(10rem,60vh,30rem)] border-[5px] border-[var(--primary-color)] rounded-[20px] overflow-hidden relative max-md:h-[10rem]";

const SLIDE_CLASSES = 
  "w-full h-full flex flex-row";

const IMAGE_CLASSES = 
  "h-full w-[45vw] object-cover rounded-l-[clamp(10px,1vw,20px)] rounded-r-none overflow-hidden max-md:w-[70vw]";

const TEXT_CONTAINER_CLASSES = 
  "flex-1 text-left mx-[20px] flex flex-col justify-center";

const TEXT_TITLE_CLASSES = 
  "break-words text-[clamp(0.5rem,2.5vw,1.875rem)] text-[var(--primary-color)]";

const TEXT_DESC_CLASSES = 
  "break-words text-[var(--primary-color)] text-[clamp(0.3rem,1vw,1rem)]";

// Navigation Button Styles
const NAV_BTN_BASE_CLASSES = 
  "cursor-pointer absolute top-1/2 w-auto mt-[-22px] px-[clamp(8px,1.5vw,16px)] " +
  "text-[var(--secondary-color)] font-bold text-[clamp(0.875rem,1.5vw,1.125rem)] " +
  "transition-[background-color] duration-[0.6s] ease select-none " +
  "hover:bg-[rgba(116,1,7,0.81)] z-20";

const PREV_BTN_CLASSES = `${NAV_BTN_BASE_CLASSES} left-0 rounded-r-[3px]`;
const NEXT_BTN_CLASSES = `${NAV_BTN_BASE_CLASSES} right-0 rounded-l-[3px]`;

export default function EventPreview() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(function () {
    let isMounted = true;

    async function loadEventSlides() {
      try {
        const response = await fetch('/api/event-preview', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as EventPreviewResponse;

        if (!payload.success || !payload.data || payload.data.length === 0) {
          return;
        }

        const nextSlides = payload.data
          .filter(function (item) {
            return Boolean(item.event_image_url && item.event_title && item.event_description);
          })
          .map(function (item) {
            return {
              src: item.event_image_url as string,
              alt: item.event_title,
              title: item.event_title,
              description: item.event_description,
            };
          });

        if (isMounted && nextSlides.length > 0) {
          setSlides(nextSlides);
          setSlideIndex(0);
        }
      } catch {
        // Keep fallback slides when the CMS request fails.
      }
    }

    loadEventSlides();

    return function () {
      isMounted = false;
    };
  }, []);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(function () {
    resetTimeout();
    timeoutRef.current = setTimeout(function () {
      setSlideIndex(function (prevIndex) {
        return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);

    return function () {
      resetTimeout();
    };
  }, [slideIndex, slides.length]);

  function plusSlides(n: number) {
    resetTimeout();
    setSlideIndex(function (prevIndex) {
      if (prevIndex + n >= slides.length) {
        return 0;
      } else if (prevIndex + n < 0) {
        return slides.length - 1;
      }
      return prevIndex + n;
    });
  }

  return (
    <section className={SECTION_CLASSES}>
      <h1 className={TITLE_CLASSES}>Our Program</h1>
      
      <div className={CONTAINER_CLASSES}>
        {slides.map(function (slide, index) {
          return (
            <div
              key={`${slide.title}-${index}`}
              className={SLIDE_CLASSES}
              style={{ display: index === slideIndex ? 'flex' : 'none' }}
            >
              <Image 
                src={slide.src} 
                alt={slide.alt} 
                width={600} 
                height={400} 
                className={IMAGE_CLASSES}
              />
              <div className={TEXT_CONTAINER_CLASSES}>
                <h2 className={TEXT_TITLE_CLASSES}>{slide.title}</h2>
                <p className={TEXT_DESC_CLASSES}>{slide.description}</p>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className={PREV_BTN_CLASSES}
          onClick={function () { plusSlides(-1); }}
          aria-label="Previous event slide"
        >
          ❮
        </button>
        <button
          type="button"
          className={NEXT_BTN_CLASSES}
          onClick={function () { plusSlides(1); }}
          aria-label="Next event slide"
        >
          ❯
        </button>
      </div>
    </section>
  );
}