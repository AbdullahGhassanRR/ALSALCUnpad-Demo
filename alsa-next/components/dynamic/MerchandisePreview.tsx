'use client';

import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';

import fallbackLogo from '@/asset/logo_alsalcunpad_secondary_color.png';
import properti_title_right from '@/asset/properti_title_right_merchandise.png'
import properti_title_left from '@/asset/properti_title_left_merchandise.png'
import properti_pilar from '@/asset/properti_pilar_b_merchandise.png'

type MerchandisePreviewResponse = {
  success?: boolean;
  data?: unknown;
};

type MerchandiseCard = {
  detail?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};


const ITEMS_PER_SLIDE = 3;

type SlideDirection = 'left' | 'right' | 'none';

interface MerchandiseRowProps {
  merchandise: MerchandiseCard[];
  slideIndex: number;
  prevSlideIndex: number;
  direction: SlideDirection;
  animating: boolean;
}

interface MerchandiseGroupProps {
  merchandise: MerchandiseCard[];
  startIndex: number;
  active: boolean;
  entering: boolean;
  exiting: boolean;
  direction: SlideDirection;
}
const FALLBACK_IMAGE_SRC = fallbackLogo.src;

const FALLBACK_MERCHANDISE: MerchandiseCard[] = [
  {
    id: 'fallback-merchandise-1',
    imageAlt: 'ALSA merchandise image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'ALSA Merchandise',
  },
  {
    id: 'fallback-merchandise-2',
    imageAlt: 'Official merchandise image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Official Merchandise',
  },
  {
    id: 'fallback-merchandise-3',
    imageAlt: 'ALSA product image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'ALSA Product',
  },
  {
    id: 'fallback-merchandise-4',
    imageAlt: 'Local chapter merchandise image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Local Chapter Merch',
  },
  {
    id: 'fallback-merchandise-5',
    imageAlt: 'Community product image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Community Product',
  },
  {
    id: 'fallback-merchandise-6',
    imageAlt: 'ALSA collection image',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'ALSA Collection',
  },
];

// Section: flex-col, top-aligned, no bottom padding so cards can bleed to bottom edge
const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--secondary-color)] flex flex-col items-center justify-start " +
  "pt-[clamp(48px,7vw,88px)] overflow-hidden " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const BOX_TITLE_CLASSES = "flex justify-center items-center w-[90vw] gap-5 max-md:gap-4";

const TITLE_CLASSES =
  "text-2xl md:text-5xl " +
  "text-center leading-[1.05] text-[var(--primary-color)] py-2";

const SEPARATOR_CLASSES = 'h-10'

// Carousel: grows to fill remaining section height, no overflow-hidden so pillars bleed to bottom
const CAROUSEL_CLASSES =
  "relative flex-1 w-full overflow-hidden flex justify-center";

// Group: fills full height of carousel, items stretch to bottom
const GROUP_BASE_CLASSES =
  "flex items-end justify-center gap-[1em] " +
  "group-hover:[animation-play-state:paused]";

const CARD_CLASSES =
  "flex-none w-[23vw] h-[62vh] flex flex-col items-center justify-start " +
  "text-center " +
  "max-md:w-[clamp(8rem,30vw,23rem)] max-md:h-[40vh] " +
  "max-lg:w-[30vw]";

const IMAGE_FRAME_CLASSES =
  "relative h-[clamp(8rem,18vw,14rem)] w-[80%] flex-shrink-0";

const IMAGE_CLASSES =
  "object-contain";

const PILAR_CLASSES =
  "flex-1 w-70 relative max-lg:w-60 max-md:w-35";

const NAV_BTN_BASE_CLASSES =
  "cursor-pointer absolute top-1/2 w-auto px-[clamp(8px,1.5vw,16px)] bg-[var(--primary-color)] " +
  "text-[var(--secondary-color)] font-bold text-[clamp(0.875rem,1.5vw,1.125rem)] " +
  "transition-[background-color] duration-[0.6s] ease select-none " +
  "hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] hover:border-2 border-[var(--primary-color)] z-20";

const PREV_BTN_CLASSES = `${NAV_BTN_BASE_CLASSES} h-10 w-10 left-10 rounded-full`;
const NEXT_BTN_CLASSES = `${NAV_BTN_BASE_CLASSES} h-10 w-10 right-10 rounded-full`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mapMerchandiseItem(item: Record<string, unknown>, index: number): MerchandiseCard {
  return {
    id: typeof item.id === 'string' ? item.id : `merchandise-${index}`,
    imageAlt: typeof item.imageAlt === 'string' ? item.imageAlt : 'Merchandise image',
    imageSrc: typeof item.imageSrc === 'string' ? item.imageSrc : FALLBACK_IMAGE_SRC,
    title: typeof item.title === 'string' ? item.title : 'Merchandise',
    detail: typeof item.detail === 'string' ? item.detail : undefined,
  };
}

function ensureMarqueeCardCount(cards: MerchandiseCard[]): MerchandiseCard[] {
  if (cards.length >= 3) return cards;
  const padded = [...cards];
  while (padded.length < 3) {
    padded.push({
      ...FALLBACK_MERCHANDISE[padded.length % FALLBACK_MERCHANDISE.length],
      id: `padded-${padded.length}`,
    });
  }
  return padded;
}

function MerchandiseGroup(props: MerchandiseGroupProps) {
  const { merchandise, startIndex, active, entering, exiting, direction } = props;

  const slice = merchandise.slice(startIndex, startIndex + ITEMS_PER_SLIDE);

  let animClass = '';
  if (exiting) {
    animClass = direction === 'left' ? 'animate-slide-out-left' : 'animate-slide-out-right';
  } else if (entering) {
    animClass = direction === 'left' ? 'animate-slide-in-right' : 'animate-slide-in-left';
  }

  if (!active && !exiting && !entering) return null;

  return (
    <div
      id='merchandise-group'
      className={`${GROUP_BASE_CLASSES} absolute inset-0 ${animClass}`}
      aria-hidden={!active}
    >
      {slice.map((item) => (
        <div id='card' key={item.id} className={CARD_CLASSES}>
          <div id='image-frame' className={IMAGE_FRAME_CLASSES}>
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 768px) 42vw, (max-width: 1024px) 30vw, 23vw"
              className={IMAGE_CLASSES}
            />
          </div>

          <div className={PILAR_CLASSES}>
            <Image
              src={properti_pilar}
              alt="properti_pilar"
              fill
              style={{ objectFit: 'fill', objectPosition: 'top center' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MerchandiseRow(props: MerchandiseRowProps) {
  const { merchandise, slideIndex, prevSlideIndex, direction, animating } = props;

  const totalSlides = Math.ceil(merchandise.length / ITEMS_PER_SLIDE);

  return (
    <div id='carousel' className={CAROUSEL_CLASSES}>
      {Array.from({ length: totalSlides }).map((_, pageIdx) => {
        const startIndex = pageIdx * ITEMS_PER_SLIDE;
        const isActive = pageIdx === slideIndex;
        const wasActive = animating && pageIdx === prevSlideIndex;

        return (
          <MerchandiseGroup
            key={pageIdx}
            merchandise={merchandise}
            startIndex={startIndex}
            active={isActive && !animating}
            entering={isActive && animating}
            exiting={wasActive}
            direction={direction}
          />
        );
      })}
    </div>
  );
}

export default function MerchandisePreview() {
  const [merchandise, setMerchandise] = useState<MerchandiseCard[]>(FALLBACK_MERCHANDISE);
  const [slideIndex, setSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>('none');
  const [animating, setAnimating] = useState(false);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = Math.ceil(merchandise.length / ITEMS_PER_SLIDE);

  function plusSlides(n: number) {
    if (animating) return;

    setSlideIndex(function (prevIndex) {
      const nextIndex =
        prevIndex + n >= totalSlides
          ? 0
          : prevIndex + n < 0
          ? totalSlides - 1
          : prevIndex + n;

      setPrevSlideIndex(prevIndex);
      setDirection(n > 0 ? 'left' : 'right');
      setAnimating(true);

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setAnimating(false);
        setDirection('none');
      }, 500);

      return nextIndex;
    });
  }

  useEffect(function () {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  useEffect(function () {
    let isMounted = true;

    async function loadMerchandise() {
      try {
        const response = await fetch('/api/merchandise-preview', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as MerchandisePreviewResponse;

        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          return;
        }

        const nextMerchandise = payload.data
          .filter(isRecord)
          .map(function (item, index) {
            return mapMerchandiseItem(item, index);
          });

        if (isMounted && nextMerchandise.length > 0) {
          setMerchandise(ensureMarqueeCardCount(nextMerchandise));
        }
      } catch {
        // Keep fallback merchandise when the CMS request fails.
      }
    }

    loadMerchandise();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide-in-right  { animation: slideInFromRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-in-left   { animation: slideInFromLeft  0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-out-left  { animation: slideOutToLeft   0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-out-right { animation: slideOutToRight  0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      <section className={SECTION_CLASSES}>
        <div id='box-tilte' className={BOX_TITLE_CLASSES}>
          <img src={properti_title_left.src} alt="properti-title-left" className='w-[51px] h-[18px] max-md:w-[20.4px] max-md:h-[7.2px]'/>
          <h2 className={TITLE_CLASSES}>Merchandise</h2>
          <img src={properti_title_right.src} alt="properti-title-right" className='w-[53px] h-[20px] max-md:w-[21.2px] max-md:h-[8px]'/>
        </div>

        <div id='separator' className={SEPARATOR_CLASSES}> </div>

        <div className="relative w-full flex-1 flex items-stretch justify-center">
          <button
            type="button"
            className={PREV_BTN_CLASSES}
            onClick={function () { plusSlides(-1); }}
            aria-label="Previous event slide"
          >
            ❮
          </button>

          <MerchandiseRow
            merchandise={merchandise}
            slideIndex={slideIndex}
            prevSlideIndex={prevSlideIndex}
            direction={direction}
            animating={animating}
          />

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
    </>
  );
}
