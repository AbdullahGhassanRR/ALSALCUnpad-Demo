"use client";

import Image from 'next/image';
import {useEffect, useState} from 'react';
import MARCH from '@/asset/NEWSLETTER-MARCH.png'
import APRIL from '@/asset/NEWSLETTER-APRIL.png'
import MAY from '@/asset/NEWSLETTER-MAY.png'
import JUNE from '@/asset/NEWSLETTER-JUNE.png'
import JULY from '@/asset/NEWSLETTER-JULY.png'
import AUGUST from '@/asset/NEWSLETTER-AUGUST.png'

type PublicationResponse = {
  success: boolean;
  data?: PublicationItem[];
};

type Newsletter = {
  src: string;
  alt: string;
  href: string;
};

type PublicationItem = {
  _id: string;
  created_at: string;
  link_drive: string;
  periode: string;
  poster_image_url: string | null;
};

const FALLBACK_NEWSLETTERS: Newsletter[] = [
  {
    src: `${MARCH.src}`,
    alt: 'Newsletter March',
    href: 'https://drive.google.com/file/d/1DTVURd2HNM7kAxN1WZsnyrUmK1Rno4q4/view?usp=drive_link',
  },
  {
    src: `${APRIL.src}`,
    alt: 'Newsletter April',
    href: 'https://drive.google.com/file/d/1iE3rTPFYQFZYda6alHqPfhdIHY_MQs6q/view?usp=drive_link',
  },
  {
    src: `${MAY.src}`,
    alt: 'Newsletter May',
    href: 'https://drive.google.com/file/d/1QUOj1xmqX_WeI04Rhe-RSjiH2Vlv2SQx/view?usp=drive_link',
  },
  {
    src: `${JUNE.src}`,
    alt: 'Newsletter June',
    href: 'https://drive.google.com/file/d/1f1nnygsYWS1gkgp_ZgGCUXQwySBFIcDC/view?usp=drive_link',
  },
  {
    src: `${JULY.src}`,
    alt: 'Newsletter July',
    href: 'https://drive.google.com/file/d/1hDZb5c_CvKxXVkMd4BTaKS8hWjsIuymR/view?usp=drive_link',
  },
  {
    src: `${AUGUST.src}`,
    alt: 'Newsletter August',
    href: 'https://drive.google.com/file/d/1ea7PPBYTy3srQCWmvpYj33rWdyFiyyyF/view?usp=drive_link',
  },
];

// DRY: Shared styles
const SECTION_CLASSES = 
  "min-h-[100vh] bg-[var(--secondary-color)] flex flex-col items-center max-md:min-h-[60vh]";

const TITLE_CLASSES = 
  "text-[var(--primary-color)] text-[clamp(1.8rem,8vw,8rem)] mb-[clamp(4px,1vw,10px)] font-bold  ";

const LINK_CLASSES = 
  "text-[var(--primary-color)] no-underline text-[clamp(1rem,2vw,1.875rem)] font-bold";

const CAROUSEL_CONTAINER_CLASSES = 
  "w-[min(90%,1200px)] rounded-[clamp(10px,2vw,20px)] flex overflow-x-hidden mx-auto my-[clamp(20px,4vw,60px)] group";

// Hide scrollbar utility
const HIDE_SCROLLBAR_CLASSES = 
  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

const GROUP_CLASSES = 
  "flex items-center justify-center gap-[5em] pr-[5em] animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]";

const CARD_CLASSES = 
  "relative flex-none w-[clamp(4em,6vw,5em)] aspect-[659/1053] p-[1em] " +
  "bg-[var(--secondary-color)] text-[var(--primary-color)] " +
  "text-[clamp(1.5rem,3vw,3rem)] text-center content-center " +
  "rounded-[clamp(10px,2vw,20px)]";

const CARD_LINK_CLASSES = 'relative block h-full w-full';

function formatPublicationLabel(documentId: string) {
  const monthLabel = documentId
    .replace('publication-newsletter-', '')
    .split('-')
    .map(function (part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');

  return `Newsletter ${monthLabel}`;
}

function NewsletterGroup({
  ariaHidden,
  newsletters,
}: {
  ariaHidden?: boolean;
  newsletters: Newsletter[];
}) {
  return (
    <div id='groupClasses' className={GROUP_CLASSES} aria-hidden={ariaHidden}>
      {newsletters.map(function (newsletter, index) {
        return (
          <div id='cardClasses' key={index} className={CARD_CLASSES}>
            <a
              href={newsletter.href}
              target="_blank"
              rel="noopener noreferrer"
              className={CARD_LINK_CLASSES}
              aria-label={`Open ${newsletter.alt}`}
            >
              <Image 
                src={newsletter.src} 
                alt={newsletter.alt} 
                fill
                sizes='(max-width:768px) 6vw, (max-width:1200px) 6vw'
                className="object-contain"
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default function PublicationPreview() {
  const [newsletters, setNewsletters] = useState(FALLBACK_NEWSLETTERS);

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
            };
          });

        if (isMounted && nextNewsletters.length > 0) {
          setNewsletters(nextNewsletters);
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
    <section className={SECTION_CLASSES}>
      <h1 className={TITLE_CLASSES}>Our Publication</h1>
      
      <a 
        href="https://www.instagram.com/alsalcunpad/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={LINK_CLASSES}
      >
        Follow us on @alsalcunpad
      </a>

      {/* Duplicated groups create infinite scroll loop */}
      <div className={`${CAROUSEL_CONTAINER_CLASSES} ${HIDE_SCROLLBAR_CLASSES}`}>
        <NewsletterGroup newsletters={newsletters} />
        <NewsletterGroup newsletters={newsletters} ariaHidden />
      </div>
    </section>
  );
}