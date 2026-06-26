'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';

import LAMP_image from '@/asset/LAMP.png';
import ASVP_image from '@/asset/ASVP.png';
import alsa_english_challenge_image from '@/asset/alsa-english-challenge.png';
import greekStatue from '@/asset/greek-statue.png';
import classicFrame from '@/asset/classic-frame.png';

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

const LEFT_DECORATION_SRC = greekStatue;
const FRAME_OVERLAY_SRC = classicFrame;

export default function EventPreview() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<EventSlide[]>(FALLBACK_SLIDES);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(1);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewViewportRef = useRef<HTMLDivElement | null>(null);

  const isPanningRef = useRef(false);
  const panStartRef = useRef({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const activeSlide = slides[slideIndex];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function openPreview() {
    resetTimeout();
    setPreviewZoom(1);
    setIsPreviewOpen(true);
  }

  function closePreview() {
    setIsPreviewOpen(false);
    setPreviewZoom(1);
  }

  function zoomIn() {
    setPreviewZoom(function (currentZoom) {
      return Math.min(currentZoom + 0.25, 3);
    });
  }

  function zoomOut() {
    setPreviewZoom(function (currentZoom) {
      return Math.max(currentZoom - 0.25, 1);
    });
  }

  function resetZoom() {
    setPreviewZoom(1);

    if (previewViewportRef.current) {
      previewViewportRef.current.scrollLeft = 0;
      previewViewportRef.current.scrollTop = 0;
    }
  }

  function handlePreviewPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (previewZoom <= 1) {
      return;
    }

    const viewport = previewViewportRef.current;

    if (!viewport) {
      return;
    }

    event.preventDefault();

    isPanningRef.current = true;

    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePreviewPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isPanningRef.current) {
      return;
    }

    const viewport = previewViewportRef.current;

    if (!viewport) {
      return;
    }

    const deltaX = event.clientX - panStartRef.current.x;
    const deltaY = event.clientY - panStartRef.current.y;

    viewport.scrollLeft = panStartRef.current.scrollLeft - deltaX;
    viewport.scrollTop = panStartRef.current.scrollTop - deltaY;
  }

  function handlePreviewPointerUp(event: PointerEvent<HTMLDivElement>) {
    isPanningRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function plusSlides(n: number) {
    resetTimeout();

    setSlideIndex(function (prevIndex) {
      if (prevIndex + n >= slides.length) {
        return 0;
      }

      if (prevIndex + n < 0) {
        return slides.length - 1;
      }

      return prevIndex + n;
    });
  }

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
            return Boolean(
              item.event_image_url &&
                item.event_title &&
                item.event_description
            );
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

  useEffect(
    function () {
      if (isPreviewOpen) {
        resetTimeout();
        return;
      }

      resetTimeout();

      timeoutRef.current = setTimeout(function () {
        setSlideIndex(function (prevIndex) {
          return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
        });
      }, 5000);

      return function () {
        resetTimeout();
      };
    },
    [slideIndex, slides.length, isPreviewOpen]
  );

  useEffect(
    function () {
      if (!isPreviewOpen) {
        return;
      }

      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setIsPreviewOpen(false);
          setPreviewZoom(1);
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return function () {
        document.body.style.overflow = originalBodyOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isPreviewOpen]
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden border border-[#d9d9d9] bg-[var(--secondary-color)] text-[var(--primary-color)]">
      <div className="grid min-h-screen w-full grid-cols-[27%_73%] max-lg:grid-cols-1">
        {/* Left Greek Decoration Panel */}
        <aside className="relative min-h-screen border-r border-[#d9d9d9] bg-[var(--secondary-color)] max-lg:hidden">
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <Image
              src={LEFT_DECORATION_SRC}
              alt=""
              width={520}
              height={900}
              className="h-[88vh] w-auto object-contain opacity-45"
              priority
            />
          </div>
        </aside>

        {/* Main Program Area */}
        <div className="relative min-h-screen border-l border-[#d9d9d9] bg-[var(--secondary-color)] px-[clamp(28px,5vw,82px)] py-[clamp(32px,4vw,64px)]">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <h1 className="rounded-[4px] bg-white px-2 text-[clamp(2.5rem,3.6vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--primary-color)]">
              Our Program
            </h1>

            <a
              href="/program"
              className="mt-6 text-[clamp(1.25rem,1.7vw,2rem)] font-semibold leading-none text-[var(--primary-color)] underline underline-offset-[6px] transition-opacity hover:opacity-70"
            >
              Lihat semua
            </a>
          </div>
          {/* Content */}
<div className="mt-[clamp(70px,8vw,120px)] grid items-start gap-[clamp(48px,6vw,90px)] lg:grid-cols-[1.45fr_0.9fr]">
  {/* Framed Image */}
  <div className="relative mx-auto w-full max-w-[820px]">
    {/* Frame */}
    <Image
      src={FRAME_OVERLAY_SRC}
      alt=""
      width={774}
      height={546}
      className="h-auto w-full"
      priority
    />

    {/* Clickable Photo */}
    <button
      type="button"
      onClick={openPreview}
      className="group absolute left-[8.5%] top-[10%] h-[80%] w-[83%] cursor-zoom-in overflow-hidden"
      aria-label={`Preview ${activeSlide.title}`}
    >
      <Image
        src={activeSlide.src}
        alt={activeSlide.alt}
        fill
        sizes="(max-width: 1024px) 80vw, 45vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />

      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--primary-color)] opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
        Click to preview
      </span>
    </button>
  </div>

  {/* Right Side */}
  <div className="flex flex-col">
    {/* Text Card */}
    <article className="min-h-[550px] border border-dashed border-[#d7d7d7] px-[clamp(32px,3.5vw,60px)] py-[clamp(32px,3vw,54px)]">
      <h2 className="max-w-[360px] text-[clamp(1.8rem,2vw,2.5rem)] font-bold leading-[1.12] text-[var(--primary-color)]">
        {activeSlide.title}
      </h2>

      <p className="mt-10 text-justify text-[clamp(1rem,1.28vw,1.45rem)] font-medium leading-[1.55] tracking-[0.03em] text-[var(--primary-color)]">
        {activeSlide.description}
      </p>
    </article>

    {/* Navigation */}
    <div className="mt-6 flex justify-end gap-4">
      <button
        type="button"
        onClick={function () {
          plusSlides(-1);
        }}
        aria-label="Previous event slide"
        className="grid size-[56px] place-items-center rounded-full bg-[var(--primary-color)] text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16 4L6 12L16 20Z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={function () {
          plusSlides(1);
        }}
        aria-label="Next event slide"
        className="grid size-[56px] place-items-center rounded-full bg-[var(--primary-color)] text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 4L18 12L8 20Z" />
        </svg>
      </button>
    </div>
  </div>
</div>
</div>
</div>
      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 px-6 py-8 backdrop-blur-sm"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSlide.title} image preview`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closePreview}
            className="absolute right-6 top-6 z-30 grid size-12 place-items-center rounded-full bg-white text-2xl font-bold leading-none text-[var(--primary-color)] shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Close image preview"
          >
            ×
          </button>

          {/* Zoom Controls */}
          <div
            className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white px-4 py-3 shadow-lg"
            onClick={function (event) {
              event.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={zoomOut}
              className="grid size-10 place-items-center rounded-full bg-[var(--primary-color)] text-xl font-bold text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95"
              aria-label="Zoom out"
            >
              -
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="min-w-[72px] rounded-full border border-[var(--primary-color)] px-3 py-2 text-sm font-bold text-[var(--primary-color)] transition-opacity hover:opacity-75"
              aria-label="Reset zoom"
            >
              {Math.round(previewZoom * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              className="grid size-10 place-items-center rounded-full bg-[var(--primary-color)] text-xl font-bold text-[var(--secondary-color)] transition-transform hover:scale-105 active:scale-95"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

          {/* Preview Content */}
          <div
            ref={previewViewportRef}
            className={`max-h-[82vh] w-full max-w-[1180px] overflow-auto rounded-[24px] bg-white/5 p-4 select-none touch-none ${
              previewZoom > 1
                ? 'cursor-grab active:cursor-grabbing'
                : 'cursor-default'
            }`}
            onClick={function (event) {
              event.stopPropagation();
            }}
            onPointerDown={handlePreviewPointerDown}
            onPointerMove={handlePreviewPointerMove}
            onPointerUp={handlePreviewPointerUp}
            onPointerCancel={handlePreviewPointerUp}
          >
            <div
              className="relative mx-auto aspect-[643/436] transition-[width] duration-200 ease-out"
              style={{
                width: `${previewZoom * 100}%`,
                maxWidth: previewZoom === 1 ? '100%' : 'none',
              }}
            >
              <Image
                src={activeSlide.src}
                alt={activeSlide.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}