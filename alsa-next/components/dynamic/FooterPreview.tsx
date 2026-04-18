import Image from 'next/image';
import Link from 'next/link';

import footerLogo from '@/asset/logo_alsalcunpad_secondary_color.png';

type SocialLink = {
  href: string;
  icon: 'facebook' | 'instagram' | 'tiktok' | 'x' | 'youtube';
  label: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://www.instagram.com/alsalcunpad/',
    icon: 'instagram',
    label: 'Instagram',
  },
  {
    href: 'https://www.tiktok.com/@alsalcunpad',
    icon: 'tiktok',
    label: 'TikTok',
  },
  {
    href: 'https://x.com/alsalcunpad',
    icon: 'x',
    label: 'X',
  },
  {
    href: 'https://www.youtube.com/@alsalcunpad2112',
    icon: 'youtube',
    label: 'YouTube',
  },
  {
    href: 'https://www.facebook.com/alsalcunpad/',
    icon: 'facebook',
    label: 'Facebook',
  },
];

const FOOTER_CLASSES =
  "bg-[var(--bg-color-primary)] flex flex-col justify-center w-full h-max " +
  "min-h-[clamp(300px,34vw,430px)] py-[clamp(28px,4vw,56px)]";

const FOOTER_TOP_CLASSES =
  "w-[min(90%,1100px)] mx-auto grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] " +
  "gap-[clamp(32px,6vw,96px)] pb-[clamp(22px,3vw,36px)] " +
  "max-md:grid-cols-1 max-md:gap-[clamp(20px,5vw,32px)]";

const CONTACT_CLASSES =
  "flex flex-col items-start justify-start text-left";

const SOCIAL_CLASSES =
  "flex flex-col items-end justify-start text-right max-md:items-start max-md:text-left";

const CONTACT_HEADER_CLASSES =
  "font-normal text-3xl md:text-4xl leading-tight";

const CONTACT_TEXT_CLASSES =
  "mt-[clamp(6px,1vw,10px)] text-sm md:text-base leading-relaxed";

const SOCIAL_HEADER_CLASSES =
  "font-normal mb-[clamp(14px,2vw,22px)] text-3xl md:text-4xl leading-tight";

const SOCIAL_LINKS_CLASSES =
  "no-underline gap-[clamp(8px,1.2vw,14px)] flex flex-wrap justify-end items-center max-md:justify-start";

const SOCIAL_MARK_CLASSES =
  "group relative flex h-[clamp(34px,3.5vw,44px)] w-[clamp(34px,3.5vw,44px)] items-center justify-center " +
  "rounded-[8px] " +
  "font-bold transition-colors duration-[250ms] ease-in hover:text-white";

const SOCIAL_ICON_CLASSES =
  "h-[clamp(17px,1.8vw,23px)] w-[clamp(17px,1.8vw,23px)] fill-current";

const FOOTER_BOTTOM_CLASSES =
  "w-[min(90%,1100px)] mx-auto flex flex-row-reverse items-center justify-between " +
  "gap-[clamp(18px,4vw,48px)] pt-[clamp(18px,3vw,32px)] border-t border-[rgba(240,240,234,0.18)] " +
  "max-md:flex-col max-md:items-start max-md:text-left";

const LOGO_CLASSES =
  "w-[clamp(60px,9vw,115px)] h-[clamp(63px,9.5vw,120px)]";

const COPYRIGHT_PRIMARY_CLASSES =
  "font-bold text-sm md:text-base leading-relaxed";

const COPYRIGHT_SECONDARY_CLASSES =
  "font-normal text-xs md:text-sm leading-relaxed";

function SocialIcon({ icon }: { icon: SocialLink['icon'] }) {
  if (icon === 'instagram') {
    return (
      <svg className={SOCIAL_ICON_CLASSES} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm0 2a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm4.8-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
      </svg>
    );
  }

  if (icon === 'tiktok') {
    return (
      <svg className={SOCIAL_ICON_CLASSES} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.4 2c.3 2.6 1.8 4.2 4.4 4.4v3.3c-1.5.1-2.8-.4-4.3-1.3v6.4c0 8.1-8.9 10.6-12.5 4.8-2.3-3.7-.9-10.2 6.5-10.4v3.5c-.5.1-1 .2-1.5.4-1.5.5-2.3 1.5-2 3.2.6 3.2 6.2 4.2 5.7-2.1V2h3.7Z" />
      </svg>
    );
  }

  if (icon === 'x') {
    return (
      <svg className={SOCIAL_ICON_CLASSES} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.9 10.5 21.2 2h-3.1l-5.6 6.5L8 2H2l7.7 11.1L2.1 22h3.1l5.9-6.9 4.8 6.9H22l-8.1-11.5Zm-2 2.3-1.4-2L5.9 4.3h1l4.4 6.2 1.4 2 4.9 7.1h-1l-4.7-6.8Z" />
      </svg>
    );
  }

  if (icon === 'youtube') {
    return (
      <svg className={SOCIAL_ICON_CLASSES} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 8.1a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.5A3 3 0 0 0 2 8.1 31 31 0 0 0 1.5 12c0 1.3.2 2.6.5 3.9a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.5-2.6.5-3.9a31 31 0 0 0-.5-3.9ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    );
  }

  return (
    <svg className={SOCIAL_ICON_CLASSES} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 8h3V4h-3c-3.3 0-5 2-5 5v2H7v4h3v7h4v-7h3.3l.7-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className={SOCIAL_LINKS_CLASSES}>
      {SOCIAL_LINKS.map(function (socialLink) {
        return (
          <a
            key={socialLink.href}
            href={socialLink.href}
            aria-label={socialLink.label}
            className="no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={SOCIAL_MARK_CLASSES} aria-hidden="true">
              <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  pathLength="100"
                  className="fill-none stroke-current stroke-2 [stroke-dasharray:100_100] [stroke-dashoffset:-100] transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[stroke-dashoffset:0]"
                />
              </svg>
              <SocialIcon icon={socialLink.icon} />
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function FooterPreview() {
  return (
    <footer className={FOOTER_CLASSES}>
      <div className={FOOTER_TOP_CLASSES}>
        <div className={CONTACT_CLASSES}>
          <h2 className={CONTACT_HEADER_CLASSES}>Contact Us</h2>
          <p className={CONTACT_TEXT_CLASSES}>unpad.alsa@gmail.com</p>
          <p className={CONTACT_TEXT_CLASSES}>+62 822-5229-8589 (Nino)</p>
          <p className={CONTACT_TEXT_CLASSES}>id_line_sekre (Secretariat ID Line) </p>
        </div>

        <div className={SOCIAL_CLASSES}>
          <h2 className={SOCIAL_HEADER_CLASSES}>Social Media</h2>
          <SocialLinks />
        </div>
      </div>

      <div className={FOOTER_BOTTOM_CLASSES}>
        <Link href="/">
          <Image
            src={footerLogo}
            alt="logo ALSA Local Chapter Unpad"
            width={115}
            height={120}
            className={LOGO_CLASSES}
          />
        </Link>

        <div>
          <p className={COPYRIGHT_PRIMARY_CLASSES}>
            &copy;2026 Asian Law Student&apos;s Association Local Chapter Unpad
          </p>
          <p className={COPYRIGHT_SECONDARY_CLASSES}>
            Organized by ICT. All Logos & Trademarks are the property of their respective holders.{' '}
          </p>
        </div>
      </div>
    </footer>
  );
}
