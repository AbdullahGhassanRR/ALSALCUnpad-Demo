'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import fallbackLogo from '@/asset/logo_alsalcunpad_primary_color.png';

type PartnersPreviewResponse = {
  success?: boolean;
  data?: unknown;
};

type PartnerCard = {
  id: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

type PartnerGroupProps = PartnerRowProps & {
  ariaHidden?: boolean;
};

type PartnerRowProps = {
  partners: PartnerCard[];
  reverse?: boolean;
};

const MINIMUM_CARD_COUNT = 6;
const FALLBACK_IMAGE_SRC = fallbackLogo.src;

const FALLBACK_PARTNERS: PartnerCard[] = [
  {
    id: 'fallback-partner-1',
    imageAlt: 'ALSA partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'ALSA Partner',
  },
  {
    id: 'fallback-partner-2',
    imageAlt: 'Academic partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Academic Partner',
  },
  {
    id: 'fallback-partner-3',
    imageAlt: 'Community partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Community Partner',
  },
  {
    id: 'fallback-partner-4',
    imageAlt: 'Media partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Media Partner',
  },
  {
    id: 'fallback-partner-5',
    imageAlt: 'Event partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Event Partner',
  },
  {
    id: 'fallback-partner-6',
    imageAlt: 'Institutional partner logo',
    imageSrc: FALLBACK_IMAGE_SRC,
    title: 'Institutional Partner',
  },
];

const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--primary-color)] flex flex-col items-center justify-center " +
  "gap-[clamp(12px,2vw,28px)] py-[clamp(48px,7vw,88px)] " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(95%,1300px)] text-4xl md:text-[7.2vw] " +
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
  "border-[5px] border-[var(--secondary-color)] bg-[var(--secondary-color)] " +
  "rounded-[clamp(10px,2vw,20px)] flex flex-col items-center justify-center " +
  "gap-[clamp(10px,1.6vw,18px)] text-center " +
  "max-md:w-[clamp(9rem,46vw,23rem)] max-md:h-[12rem] " +
  "max-lg:w-[30vw] max-lg:h-[35vh]";

const IMAGE_FRAME_CLASSES =
  "relative h-[clamp(4rem,12vw,8rem)] w-[75%] max-w-[12rem]";

const IMAGE_CLASSES =
  "object-contain";

const CARD_TITLE_CLASSES =
  "w-full text-[clamp(1rem,1.7vw,1.5rem)] text-[var(--primary-color)] " +
  "font-bold leading-tight break-words";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getTextValue(value: unknown) {
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

function getPartnerTitle(item: Record<string, unknown>, index: number) {
  const title = getFirstTextValue(item, [
    'partner_name',
    'partners_name',
    'partner_title',
    'title',
    'name',
  ]);

  if (title) {
    return title;
  }

  return `Partner ${index + 1}`;
}

function mapPartnerItem(item: Record<string, unknown>, index: number): PartnerCard {
  const id = getTextValue(item._id) ?? `partner-${index}`;
  const title = getPartnerTitle(item, index);
  const imageSrc = isSafeImageSrc(item.partners_logo_image_url)
    ? item.partners_logo_image_url.trim()
    : FALLBACK_IMAGE_SRC;

  return {
    id,
    imageAlt: `${title} logo`,
    imageSrc,
    title,
  };
}

function ensureMarqueeCardCount(cards: PartnerCard[]) {
  if (cards.length >= MINIMUM_CARD_COUNT) {
    return cards;
  }

  const expandedCards: PartnerCard[] = [];

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

function PartnerGroup({ partners, reverse, ariaHidden }: PartnerGroupProps) {
  return (
    <div
      className={`${GROUP_BASE_CLASSES} ${getGroupAnimationClasses(reverse)}`}
      aria-hidden={ariaHidden}
    >
      {partners.map(function (partner) {
        return (
          <div key={partner.id} className={CARD_CLASSES}>
            <div className={IMAGE_FRAME_CLASSES}>
              <Image
                src={partner.imageSrc}
                alt={partner.imageAlt}
                fill
                sizes="(max-width: 768px) 42vw, (max-width: 1024px) 30vw, 23vw"
                className={IMAGE_CLASSES}
              />
            </div>
            <h3 className={CARD_TITLE_CLASSES}>{partner.title}</h3>
          </div>
        );
      })}
    </div>
  );
}

function PartnerRow({ partners, reverse }: PartnerRowProps) {
  return (
    <div className={CAROUSEL_CLASSES}>
      <PartnerGroup partners={partners} reverse={reverse} />
      <PartnerGroup partners={partners} reverse={reverse} ariaHidden />
    </div>
  );
}

export default function PartnersPreview() {
  const [partners, setPartners] = useState<PartnerCard[]>(FALLBACK_PARTNERS);

  useEffect(function () {
    let isMounted = true;

    async function loadPartners() {
      try {
        const response = await fetch('/api/partners-preview', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as PartnersPreviewResponse;

        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          return;
        }

        const nextPartners = payload.data
          .filter(isRecord)
          .map(function (item, index) {
            return mapPartnerItem(item, index);
          });

        if (isMounted && nextPartners.length > 0) {
          setPartners(ensureMarqueeCardCount(nextPartners));
        }
      } catch {
        // Keep fallback partners when the CMS request fails.
      }
    }

    loadPartners();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>Our Partners</h2>
      <PartnerRow partners={partners} />
      <PartnerRow partners={partners} reverse />
    </section>
  );
}
