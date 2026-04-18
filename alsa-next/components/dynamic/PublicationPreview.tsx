import Image from 'next/image';
import MARCH from '@/asset/NEWSLETTER-MARCH.png'
import APRIL from '@/asset/NEWSLETTER-APRIL.png'
import MAY from '@/asset/NEWSLETTER-MAY.png'
import JUNE from '@/asset/NEWSLETTER-JUNE.png'
import JULY from '@/asset/NEWSLETTER-JULY.png'
import AUGUST from '@/asset/NEWSLETTER-AUGUST.png'

const NEWSLETTERS = [
  { src: `${MARCH.src}`, alt: 'Newsletter March' },
  { src: `${APRIL.src}`, alt: 'Newsletter April' },
  { src: `${MAY.src}`, alt: 'Newsletter May' },
  { src: `${JUNE.src}`, alt: 'Newsletter June' },
  { src: `${JULY.src}`, alt: 'Newsletter July' },
  { src: `${AUGUST.src}`, alt: 'Newsletter August' },
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

function NewsletterGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div id='groupClasses' className={GROUP_CLASSES} aria-hidden={ariaHidden}>
      {NEWSLETTERS.map(function (newsletter, index) {
        return (
          <div id='cardClasses' key={index} className={CARD_CLASSES}>
            <Image 
              src={newsletter.src} 
              alt={newsletter.alt} 
              fill
              sizes='(max-width:768px) 6vw, (max-width:1200px) 6vw'
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function PublicationPreview() {
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
        <NewsletterGroup />
        <NewsletterGroup ariaHidden />
      </div>
    </section>
  );
}