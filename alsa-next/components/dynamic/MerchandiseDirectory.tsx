'use client';

import Image from 'next/image';
import {useEffect, useMemo, useState} from 'react';

import fallbackLogo from '@/asset/logo_alsalcunpad_primary_color.png';

type MerchandiseDirectoryResponse = {
  success?: boolean;
  data?: unknown;
};

const MERCHANDISE_TYPES = [
  {title: 'Apparel', value: 'apparel'},
  {title: 'Headwear', value: 'headwear'},
  {title: 'Accessories', value: 'accessories'},
  {title: 'Bags', value: 'bags'},
  {title: 'Stationery', value: 'stationery'},
  {title: 'Drinkware', value: 'drinkware'},
  {title: 'Lanyards', value: 'lanyards'},
  {title: 'Pins and Badges', value: 'pins_badges'},
  {title: 'Stickers', value: 'stickers'},
  {title: 'Bundles', value: 'bundles'},
  {title: 'Limited Edition', value: 'limited_edition'},
  {title: 'Other', value: 'other'},
] as const;

type MerchandiseType = (typeof MERCHANDISE_TYPES)[number]['value'];

type MerchandiseCard = {
  id: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
  type: MerchandiseType;
  typeLabel: string;
};

const FALLBACK_IMAGE_SRC = fallbackLogo.src;

const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--secondary-color)] px-[clamp(18px,5vw,72px)] " +
  "pb-[clamp(56px,8vw,112px)] pt-[clamp(120px,14vw,172px)]";

const INNER_CLASSES =
  "mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(34px,5vw,64px)]";

const PAGE_TITLE_CLASSES =
  "text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[1.02] text-[var(--primary-color)]";

const EMPTY_STATE_CLASSES =
  "rounded-[8px] border border-[rgba(116,1,7,0.2)] bg-white px-6 py-8 " +
  "text-center text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-[var(--primary-color)]";

const TYPE_SECTION_CLASSES =
  "flex flex-col gap-[clamp(18px,2.8vw,32px)]";

const TYPE_HEADER_CLASSES =
  "grid grid-cols-[auto_1fr] items-center gap-[clamp(14px,2vw,24px)]";

const TYPE_TITLE_CLASSES =
  "text-[clamp(1.35rem,2.7vw,2.25rem)] font-bold leading-tight text-[var(--primary-color)]";

const TYPE_LINE_CLASSES =
  "h-[2px] w-full bg-[var(--primary-color)] opacity-80";

const GRID_CLASSES =
  "grid grid-cols-2 gap-[clamp(14px,2.4vw,28px)] sm:grid-cols-3 lg:grid-cols-4";

const CARD_CLASSES =
  "flex min-h-[clamp(180px,22vw,260px)] flex-col items-center justify-between gap-4 " +
  "rounded-[8px] border border-[rgba(116,1,7,0.14)] bg-white pb-[clamp(16px,2.4vw,26px)] " +
  "shadow-[0_10px_28px_rgba(116,1,7,0.08)] overflow-hidden";

const IMAGE_FRAME_CLASSES =
  "relative h-[clamp(120px,18vw,200px)] w-full";

const IMAGE_CLASSES =
  "object-cover w-full h-full";

const CARD_TEXT_CLASSES =
  "flex w-full flex-col items-center gap-2 text-center px-[clamp(16px,2.4vw,26px)]";

const CARD_TITLE_CLASSES =
  "w-full text-[clamp(0.95rem,1.2vw,1.15rem)] font-bold leading-snug " +
  "text-[var(--primary-color)] break-words";

const TYPE_LABEL_CLASSES =
  "rounded-full border border-[rgba(116,1,7,0.2)] px-3 py-1 " +
  "text-[clamp(0.72rem,0.9vw,0.82rem)] font-semibold uppercase text-[var(--primary-color)]";

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

function isMerchandiseType(value: unknown): value is MerchandiseType {
  if (typeof value !== 'string') {
    return false;
  }

  return MERCHANDISE_TYPES.some(function (type) {
    return type.value === value;
  });
}

function getTypeLabel(typeValue: MerchandiseType) {
  const type = MERCHANDISE_TYPES.find(function (item) {
    return item.value === typeValue;
  });

  return type?.title ?? 'Other';
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

function mapMerchandiseItem(
  item: Record<string, unknown>,
  index: number,
): MerchandiseCard | null {
  const type = getTextValue(item.merchandise_type);

  if (!isMerchandiseType(type)) {
    return null;
  }

  const title = getTextValue(item.merchandise_name) ?? `Merchandise ${index + 1}`;
  const imageSrc = isSafeImageSrc(item.merchandise_image_url)
    ? item.merchandise_image_url.trim()
    : FALLBACK_IMAGE_SRC;

  return {
    id: getTextValue(item._id) ?? `merchandise-${index}`,
    imageAlt: `${title} image`,
    imageSrc,
    title,
    type,
    typeLabel: getTypeLabel(type),
  };
}

function createEmptyGroups(): Record<MerchandiseType, MerchandiseCard[]> {
  return {
    apparel: [],
    headwear: [],
    accessories: [],
    bags: [],
    stationery: [],
    drinkware: [],
    lanyards: [],
    pins_badges: [],
    stickers: [],
    bundles: [],
    limited_edition: [],
    other: [],
  };
}

function groupMerchandiseByType(merchandise: MerchandiseCard[]) {
  const groups = createEmptyGroups();

  merchandise.forEach(function (item) {
    groups[item.type].push(item);
  });

  return groups;
}

function TypeSection({
  merchandise,
  title,
}: {
  merchandise: MerchandiseCard[];
  title: string;
}) {
  if (merchandise.length === 0) {
    return null;
  }

  return (
    <section className={TYPE_SECTION_CLASSES}>
      <div className={TYPE_HEADER_CLASSES}>
        <h2 className={TYPE_TITLE_CLASSES}>{title}</h2>
        <div className={TYPE_LINE_CLASSES} aria-hidden />
      </div>

      <div className={GRID_CLASSES}>
        {merchandise.map(function (item) {
          return (
            <article key={item.id} className={CARD_CLASSES}>
              <div className={IMAGE_FRAME_CLASSES}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18vw"
                  className={IMAGE_CLASSES}
                />
              </div>
              <div className={CARD_TEXT_CLASSES}>
                <h3 className={CARD_TITLE_CLASSES}>{item.title}</h3>
                <p className={TYPE_LABEL_CLASSES}>{item.typeLabel}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function MerchandiseDirectory() {
  const [merchandise, setMerchandise] = useState<MerchandiseCard[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const groupedMerchandise = useMemo(
    function () {
      return groupMerchandiseByType(merchandise);
    },
    [merchandise],
  );

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

        const payload = (await response.json()) as MerchandiseDirectoryResponse;

        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          return;
        }

        const nextMerchandise = payload.data
          .filter(isRecord)
          .map(function (item, index) {
            return mapMerchandiseItem(item, index);
          })
          .filter(function (item): item is MerchandiseCard {
            return Boolean(item);
          });

        if (isMounted) {
          setMerchandise(nextMerchandise);
        }
      } catch {
        // Keep the page stable when the CMS request fails.
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    }

    loadMerchandise();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <section className={SECTION_CLASSES}>
      <div className={INNER_CLASSES}>
        <h1 className={PAGE_TITLE_CLASSES}>Merchandise</h1>

        {hasLoaded && merchandise.length === 0 ? (
          <p className={EMPTY_STATE_CLASSES}>No merchandise is available yet.</p>
        ) : null}

        {MERCHANDISE_TYPES.map(function (type) {
          return (
            <TypeSection
              key={type.value}
              title={type.title}
              merchandise={groupedMerchandise[type.value]}
            />
          );
        })}
      </div>
    </section>
  );
}
