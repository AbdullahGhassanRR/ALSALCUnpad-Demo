'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import fallbackLogo from '@/asset/logo_alsalcunpad_secondary_color.png';

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

type MerchandiseGroupProps = MerchandiseRowProps & {
  ariaHidden?: boolean;
};

type MerchandiseRowProps = {
  merchandise: MerchandiseCard[];
  reverse?: boolean;
};

const MINIMUM_CARD_COUNT = 6;
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

const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--secondary-color)] flex flex-col items-center justify-center " +
  "gap-[clamp(12px,2vw,28px)] py-[clamp(48px,7vw,88px)] " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(95%,1300px)] text-4xl md:text-[7.2vw] text-[var(--primary-color)] " +
  "mb-[clamp(10px,2vw,24px)] text-center font-bold leading-[1.05]";

const CAROUSEL_CLASSES =
  "my-[5px] mx-auto w-[min(95%,1300px)] rounded-[clamp(10px,2vw,20px)] " +
  "flex overflow-x-hidden group [&::-webkit-scrollbar]:hidden " +
  "[-ms-overflow-style:'none'] [scrollbar-width:'none']";

const GROUP_BASE_CLASSES =
  "flex items-center justify-center gap-[1em] pr-[.8em] " +
  "group-hover:[animation-play-state:paused]";

const GROUP_FORWARD_CLASSES =
  "animate-[marquee_200s_linear_infinite]";

const GROUP_REVERSE_CLASSES =
  "animate-[marquee_200s_linear_infinite_reverse]";

const CARD_CLASSES =
  "flex-none w-[23vw] h-[37vh] p-[clamp(14px,2vw,24px)] " +
  "border-[5px] border-[var(--primary-color)] bg-[var(--primary-color)] " +
  "rounded-[clamp(10px,2vw,20px)] flex flex-col items-center justify-center " +
  "gap-[clamp(8px,1.3vw,16px)] text-center " +
  "max-md:w-[clamp(9rem,46vw,23rem)] max-md:h-[12rem] " +
  "max-lg:w-[30vw] max-lg:h-[35vh]";

const IMAGE_FRAME_CLASSES =
  "relative h-[clamp(4rem,12vw,8rem)] w-[75%] max-w-[12rem]";

const IMAGE_CLASSES =
  "object-contain";

const CARD_TITLE_CLASSES =
  "w-full text-[clamp(1rem,1.7vw,1.5rem)] text-[var(--secondary-color)] " +
  "font-bold leading-tight break-words";

const CARD_DETAIL_CLASSES =
  "w-full text-[clamp(0.75rem,1vw,1rem)] text-[var(--secondary-color)] " +
  "leading-snug opacity-[0.85] break-words";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getTextValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const text = value.trim();

  if (!text) {
    return null;
  }

  return text;
}

function isSafeImageSrc(value: unknown): value is string {
  const src = getTextValue(value);

  if (!src) {
    return false;
  }

  if (src.startsWith('/')) {
    return true;
  }

  try {
    const url = new URL(src);
    return url.protocol === 'https:' && url.hostname === 'cdn.sanity.io';
  } catch {
    return false;
  }
}

function getFirstTextValue(item: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = getTextValue(item[key]);

    if (value) {
      return value;
    }
  }

  return null;
}

function getMerchandiseTitle(item: Record<string, unknown>, index: number) {
  const title = getFirstTextValue(item, [
    'merchandise_name',
    'product_name',
    'title',
    'name',
  ]);

  if (title) {
    return title;
  }

  return `Merchandise ${index + 1}`;
}

function getMerchandiseDetail(item: Record<string, unknown>) {
  return getFirstTextValue(item, [
    'merchandise_type',
    'category',
    'product_category',
    'price',
    'merchandise_price',
    'description',
    'merchandise_description',
  ]);
}

function mapMerchandiseItem(item: Record<string, unknown>, index: number): MerchandiseCard {
  const id = getTextValue(item._id) ?? `merchandise-${index}`;
  const title = getMerchandiseTitle(item, index);
  const imageSrc = isSafeImageSrc(item.merchandise_image_url)
    ? item.merchandise_image_url.trim()
    : FALLBACK_IMAGE_SRC;

  return {
    detail: getMerchandiseDetail(item) ?? undefined,
    id,
    imageAlt: `${title} image`,
    imageSrc,
    title,
  };
}

function ensureMarqueeCardCount(cards: MerchandiseCard[]) {
  if (cards.length >= MINIMUM_CARD_COUNT) {
    return cards;
  }

  const expandedCards: MerchandiseCard[] = [];

  for (let index = 0; index < MINIMUM_CARD_COUNT; index += 1) {
    const card = cards[index % cards.length];

    expandedCards.push({
      ...card,
      id: `${card.id}-repeat-${index}`,
    });
  }

  return expandedCards;
}

function getGroupAnimationClasses(reverse?: boolean) {
  if (reverse) {
    return GROUP_REVERSE_CLASSES;
  }

  return GROUP_FORWARD_CLASSES;
}

function MerchandiseGroup({ merchandise, reverse, ariaHidden }: MerchandiseGroupProps) {
  return (
    <div
      className={`${GROUP_BASE_CLASSES} ${getGroupAnimationClasses(reverse)}`}
      aria-hidden={ariaHidden}
    >
      {merchandise.map(function (item) {
        return (
          <div key={item.id} className={CARD_CLASSES}>
            <div className={IMAGE_FRAME_CLASSES}>
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 42vw, (max-width: 1024px) 30vw, 23vw"
                className={IMAGE_CLASSES}
              />
            </div>
            <h3 className={CARD_TITLE_CLASSES}>{item.title}</h3>
            {item.detail ? <p className={CARD_DETAIL_CLASSES}>{item.detail}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function MerchandiseRow({ merchandise, reverse }: MerchandiseRowProps) {
  return (
    <div className={CAROUSEL_CLASSES}>
      <MerchandiseGroup merchandise={merchandise} reverse={reverse} />
      <MerchandiseGroup merchandise={merchandise} reverse={reverse} ariaHidden />
    </div>
  );
}

export default function MerchandisePreview() {
  const [merchandise, setMerchandise] = useState<MerchandiseCard[]>(FALLBACK_MERCHANDISE);

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
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>Merchandise</h2>
      <MerchandiseRow merchandise={merchandise} />
      <MerchandiseRow merchandise={merchandise} reverse />
    </section>
  );
}
