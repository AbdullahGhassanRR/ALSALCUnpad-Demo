'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import MARCH from '@/asset/NEWSLETTER-MARCH.png';
import APRIL from '@/asset/NEWSLETTER-APRIL.png';
import MAY from '@/asset/NEWSLETTER-MAY.png';
import JUNE from '@/asset/NEWSLETTER-JUNE.png';
import JULY from '@/asset/NEWSLETTER-JULY.png';
import AUGUST from '@/asset/NEWSLETTER-AUGUST.png';

// Ganti file ini sesuai asset dekorasi kanan yang kamu punya
import publicationDecoration from '@/asset/publication-decoration.png';

export type PublicationResponse = {
  success: boolean;
  data?: PublicationItem[];
};

export type Newsletter = {
  src: string;
  alt: string;
  href: string;
  periode: string;
};

export type PublicationItem = {
  _id: string;
  created_at: string;
  link_drive: string;
  periode: string;
  poster_image_url: string | null;
};

export const FALLBACK_NEWSLETTERS: Newsletter[] = [
  {
    src: `${MARCH.src}`,
    alt: 'Newsletter March',
    href: 'https://drive.google.com/file/d/1DTVURd2HNM7kAxN1WZsnyrUmK1Rno4q4/view?usp=drive_link',
    periode: '2025/2026',
  },
  {
    src: `${APRIL.src}`,
    alt: 'Newsletter April',
    href: 'https://drive.google.com/file/d/1iE3rTPFYQFZYda6alHqPfhdIHY_MQs6q/view?usp=drive_link',
    periode: '2025/2026',
  },
  {
    src: `${MAY.src}`,
    alt: 'Newsletter May',
    href: 'https://drive.google.com/file/d/1QUOj1xmqX_WeI04Rhe-RSjiH2Vlv2SQx/view?usp=drive_link',
    periode: '2025/2026',
  },
  {
    src: `${JUNE.src}`,
    alt: 'Newsletter June',
    href: 'https://drive.google.com/file/d/1f1nnygsYWS1gkgp_ZgGCUXQwySBFIcDC/view?usp=drive_link',
    periode: '2025/2026',
  },
  {
    src: `${JULY.src}`,
    alt: 'Newsletter July',
    href: 'https://drive.google.com/file/d/1hDZb5c_CvKxXVkMd4BTaKS8hWjsIuymR/view?usp=drive_link',
    periode: '2025/2026',
  },
  {
    src: `${AUGUST.src}`,
    alt: 'Newsletter August',
    href: 'https://drive.google.com/file/d/1ea7PPBYTy3srQCWmvpYj33rWdyFiyyyF/view?usp=drive_link',
    periode: '2025/2026',
  },
];

const DECORATION_SRC = publicationDecoration;
const ITEMS_PER_VIEW = 3;

export function formatPublicationLabel(documentId: string) {
  const monthLabel = documentId
    .replace('publication-newsletter-', '')
    .split('-')
    .map(function (part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');

  return `Newsletter ${monthLabel}`;
}

function getVisibleNewsletters(
  newsletters: Newsletter[],
  startIndex: number
): Newsletter[] {
  if (newsletters.length <= ITEMS_PER_VIEW) {
    return newsletters;
  }

  const visibleItems: Newsletter[] = [];

  for (let index = 0; index < ITEMS_PER_VIEW; index += 1) {
    const itemIndex = (startIndex + index) % newsletters.length;
    visibleItems.push(newsletters[itemIndex]);
  }

  return visibleItems;
}

export default function PublicationPreview() {
  const [newsletters, setNewsletters] = useState(FALLBACK_NEWSLETTERS);
  const [startIndex, setStartIndex] = useState(0);

  const visibleNewsletters = getVisibleNewsletters(newsletters, startIndex);

  function moveNewsletters(direction: 'prev' | 'next') {
    if (newsletters.length <= ITEMS_PER_VIEW) {
      return;
    }

    setStartIndex(function (currentIndex) {
      const step = direction === 'next' ? ITEMS_PER_VIEW : -ITEMS_PER_VIEW;
      const nextIndex = currentIndex + step;

      return (
        ((nextIndex % newsletters.length) + newsletters.length) %
        newsletters.length
      );
    });
  }

  useEffect(function () {
    let isMounted = true;

    async function loadPublications() {
      try {
        const response = await fetch('/api/publication', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as PublicationResponse;

        if (!payload.success || !payload.data || payload.data.length === 0) {
          return;
        }

        const nextNewsletters = payload.data
          .filter(function (item) {
            return Boolean(item.poster_image_url && item.link_drive);
          })
          .map(function (item) {
            return {
              src: item.poster_image_url as string,
              alt: formatPublicationLabel(item._id),
              href: item.link_drive,
              periode: item.periode,
            };
          });

        if (isMounted && nextNewsletters.length > 0) {
          setNewsletters(nextNewsletters);
          setStartIndex(0);
        }
      } catch {
        // Keep fallback newsletters when the CMS request fails.
      }
    }

    loadPublications();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden border border-[#d9d9d9] bg-[var(--secondary-color)] text-[var(--primary-color)]">
  <div className="grid min-h-screen w-full grid-cols-[69.5%_30.5%] max-lg:grid-cols-1">
        {/* Main Publication Area */}
<div className="relative min-h-screen border-r border-[#d9d9d9] bg-[var(--secondary-color)] px-[clamp(28px,5vw,82px)] py-[clamp(32px,4vw,72px)] max-lg:border-r-0">
          {/* Header */}
<div className="flex items-start justify-between gap-6">
  <div>
    <h1 className="w-fit rounded-[4px] bg-white px-2 text-[clamp(2.5rem,3.6vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--primary-color)]">
      Our Publication
    </h1>

    <a
      href="https://www.instagram.com/alsalcunpad/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-7 block w-fit rounded-[4px] bg-white px-1 text-[clamp(1.4rem,1.9vw,2.3rem)] font-medium leading-tight text-[var(--primary-color)] transition-opacity hover:opacity-70"
    >
      Follow us on @alsalcunpad
    </a>
  </div>

  <a
    href="/publication"
    className="mt-6 text-[clamp(1.25rem,1.7vw,2rem)] font-semibold leading-none text-[var(--primary-color)] underline underline-offset-[6px] transition-opacity hover:opacity-70"
  >
    Lihat semua
  </a>
</div>
          {/* Publication Cards */}
<div className="mt-[clamp(72px,8vw,120px)]">
  <div className="grid grid-cols-3 gap-[clamp(28px,2.2vw,42px)] max-md:grid-cols-1">
    {visibleNewsletters.map(function (newsletter, index) {
      return (
        <a
          key={`${newsletter.alt}-${startIndex}-${index}`}
          href={newsletter.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${newsletter.alt}`}
          className="group relative block aspect-[0.64/1] w-full overflow-hidden border border-[#d9d9d9] bg-white shadow-sm transition-transform duration-300 hover:-translate-y-2"
        >
          <Image
            src={newsletter.src}
            alt={newsletter.alt}
            fill
            sizes="(max-width: 768px) 80vw, 22vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>
      );
    })}
  </div>

  {/* Navigation */}
  <div className="mt-10 flex justify-end gap-4">
    <button
      type="button"
      onClick={function () {
        moveNewsletters('prev');
      }}
      aria-label="Previous publication group"
      className="grid size-[56px] place-items-center rounded-full bg-[var(--primary-color)] text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      disabled={newsletters.length <= ITEMS_PER_VIEW}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18 3L4 12L18 21Z" />
      </svg>
    </button>

    <button
      type="button"
      onClick={function () {
        moveNewsletters('next');
      }}
      aria-label="Next publication group"
      className="grid size-[56px] place-items-center rounded-full bg-[var(--primary-color)] text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      disabled={newsletters.length <= ITEMS_PER_VIEW}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M6 3L20 12L6 21Z" />
      </svg>
    </button>
  </div>
</div>
</div>
        {/* Right Decoration Panel */}
<aside className="relative min-h-screen bg-[var(--secondary-color)] max-lg:hidden">
  <div className="absolute inset-0 flex items-center justify-center px-8">
    <Image
      src={DECORATION_SRC}
      alt=""
      width={520}
      height={900}
      className="h-[88vh] w-auto object-contain opacity-15"
      priority
    />
  </div>
</aside>
      </div>
    </section>
  );
}