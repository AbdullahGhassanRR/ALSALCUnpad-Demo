'use client';

import Image from 'next/image';
import {useEffect, useMemo, useState} from 'react';

import fallbackLogo from '@/asset/logo_alsalcunpad_primary_color.png';

type PartnersDirectoryResponse = {
  success?: boolean;
  data?: unknown;
};

const PARTNER_CATEGORIES = [
  {title: 'Government Institutions', value: 'government_institutions'},
  {title: 'Law Firms', value: 'law_firms'},
  {title: 'Student Organization', value: 'student_organization'},
  {title: 'Non-Governmental Institutions', value: 'non_governmental_institutions'},
  {title: 'Media Partner', value: 'media_partner'},
  {title: 'Private Institutions', value: 'private_institutions'},
] as const;

type PartnerCategory = (typeof PARTNER_CATEGORIES)[number]['value'];

type PartnerCard = {
  category: PartnerCategory;
  id: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
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

const CATEGORY_SECTION_CLASSES =
  "flex flex-col gap-[clamp(18px,2.8vw,32px)]";

const CATEGORY_HEADER_CLASSES =
  "grid grid-cols-[auto_1fr] items-center gap-[clamp(14px,2vw,24px)]";

const CATEGORY_TITLE_CLASSES =
  "text-[clamp(1.35rem,2.7vw,2.25rem)] font-bold leading-tight text-[var(--primary-color)]";

const CATEGORY_LINE_CLASSES =
  "h-[2px] w-full bg-[var(--primary-color)] opacity-80";

const GRID_CLASSES =
  "grid grid-cols-2 gap-[clamp(14px,2.4vw,28px)] sm:grid-cols-3 lg:grid-cols-4";

const LOGO_CARD_CLASSES =
  "flex min-h-[clamp(180px,22vw,260px)] flex-col items-center justify-between gap-4 " +
  "rounded-[8px] border border-[rgba(116,1,7,0.14)] bg-white pb-[clamp(16px,2.4vw,26px)] " +
  "shadow-[0_10px_28px_rgba(116,1,7,0.08)] overflow-hidden";

const IMAGE_FRAME_CLASSES =
  "relative h-[clamp(120px,18vw,200px)] w-full";

const IMAGE_CLASSES =
  "object-cover w-full h-full";

const PARTNER_TEXT_CLASSES =
  "flex w-full flex-col items-center gap-2 text-center px-[clamp(16px,2.4vw,26px)]";

const PARTNER_NAME_CLASSES =
  "w-full text-[clamp(0.95rem,1.2vw,1.15rem)] font-bold leading-snug " +
  "text-[var(--primary-color)] break-words";

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

function isPartnerCategory(value: unknown): value is PartnerCategory {
  if (typeof value !== 'string') {
    return false;
  }

  return PARTNER_CATEGORIES.some(function (category) {
    return category.value === value;
  });
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

function mapPartnerItem(item: Record<string, unknown>, index: number) {
  const category = getTextValue(item.partner_category);

  if (!isPartnerCategory(category)) {
    return null;
  }

  const title = getTextValue(item.partner_name) ?? `Partner ${index + 1}`;
  const imageSrc = isSafeImageSrc(item.partners_logo_image_url)
    ? item.partners_logo_image_url.trim()
    : FALLBACK_IMAGE_SRC;

  return {
    category,
    id: getTextValue(item._id) ?? `partner-${index}`,
    imageAlt: title,
    imageSrc,
    title,
  };
}

function createEmptyGroups(): Record<PartnerCategory, PartnerCard[]> {
  return {
    government_institutions: [],
    law_firms: [],
    student_organization: [],
    non_governmental_institutions: [],
    media_partner: [],
    private_institutions: [],
  };
}

function groupPartnersByCategory(partners: PartnerCard[]) {
  const groups = createEmptyGroups();

  partners.forEach(function (partner) {
    groups[partner.category].push(partner);
  });

  return groups;
}

function CategorySection({
  partners,
  title,
}: {
  partners: PartnerCard[];
  title: string;
}) {
  if (partners.length === 0) {
    return null;
  }

  return (
    <section className={CATEGORY_SECTION_CLASSES}>
      <div className={CATEGORY_HEADER_CLASSES}>
        <h2 className={CATEGORY_TITLE_CLASSES}>{title}</h2>
        <div className={CATEGORY_LINE_CLASSES} aria-hidden />
      </div>

      <div className={GRID_CLASSES}>
        {partners.map(function (partner) {
          return (
            <article key={partner.id} className={LOGO_CARD_CLASSES}>
              <div className={IMAGE_FRAME_CLASSES}>
                <Image
                  src={partner.imageSrc}
                  alt={partner.imageAlt}
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18vw"
                  className={IMAGE_CLASSES}
                />
              </div>
              <div className={PARTNER_TEXT_CLASSES}>
                <h3 className={PARTNER_NAME_CLASSES}>{partner.title}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function PartnersDirectory() {
  const [partners, setPartners] = useState<PartnerCard[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const groupedPartners = useMemo(
    function () {
      return groupPartnersByCategory(partners);
    },
    [partners],
  );

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

        const payload = (await response.json()) as PartnersDirectoryResponse;

        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          return;
        }

        const nextPartners = payload.data
          .filter(isRecord)
          .map(function (item, index) {
            return mapPartnerItem(item, index);
          })
          .filter(function (item): item is PartnerCard {
            return Boolean(item);
          });

        if (isMounted) {
          setPartners(nextPartners);
        }
      } catch {
        // Keep the page stable when the CMS request fails.
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    }

    loadPartners();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <section className={SECTION_CLASSES}>
      <div className={INNER_CLASSES}>
        <h1 className={PAGE_TITLE_CLASSES}>Our Partners</h1>

        {hasLoaded && partners.length === 0 ? (
          <p className={EMPTY_STATE_CLASSES}>No partners are available yet.</p>
        ) : null}

        {PARTNER_CATEGORIES.map(function (category) {
          return (
            <CategorySection
              key={category.value}
              title={category.title}
              partners={groupedPartners[category.value]}
            />
          );
        })}
      </div>
    </section>
  );
}
