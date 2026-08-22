'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import logo_img from '@/asset/logo_alsalcunpad_primary_color.png';

const NAV_LINK_CLASSES = `text-[var(--primary-color)] no-underline font-normal relative text-[clamp(0.75rem,1.1vw,1rem)] after:content-[''] after:absolute after:left-[0px] after:bottom-[-5px] after:h-[1.5px] after:w-full after:bg-[var(--primary-color)] after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100`;

const DROPDOWN_BTN_CLASSES = `border-none bg-transparent p-0 text-[var(--primary-color)] text-[clamp(0.75rem,1.1vw,1rem)] font-normal cursor-pointer`;

const DROPDOWN_CONTENT_CLASSES = (isOpen: boolean) => 
  `bg-[var(--secondary-color)] absolute z-10 rounded-[12px] transition-[opacity,box-shadow,visibility] duration-300 ease-in-out max-md:right-[-5px] ${
    isOpen 
      ? 'opacity-100 visible shadow-[0px_3px_4px_0px_rgba(0,0,0,0.2)]' 
      : 'opacity-0 invisible'
  }`;

const DROPDOWN_LINK_CLASSES = `text-[var(--primary-color)] no-underline block m-[clamp(10px,1.5vw,20px)] text-[clamp(0.75rem,1.1vw,1rem)] relative after:content-[''] after:absolute after:left-[0px] after:bottom-[-6px] after:h-[2px] after:w-full after:bg-[var(--primary-color)] after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 max-md:text-left`;

const HEADER_CLASSES = [
  'bg-[rgba(240,240,234,0.8)]',
  'backdrop-blur-[5px]',
  'flex',
  'justify-evenly',
  'items-center',
  'gap-[clamp(1rem,5vw,4rem)]',
  'w-full',
  'fixed',
  'left-0',
  'top-0',
  'pt-[clamp(12px,2.5vw,28px)]',
  'pb-[clamp(12px,2.5vw,28px)]',
  'm-0',
  'z-10',
  'transition-[top]',
  'duration-700',
  'max-md:gap-0',
].join(' ');

export default function HeaderNavbar() {
  const [publicationOpen, setPublicationOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(function () {
    let previousScrollPosition = window.pageYOffset;
    
    function handleScroll() {
      const currentScrollPosition = window.pageYOffset + 10;
      const header = document.getElementById('headerNavbar');
      if (!header) return;

      if (previousScrollPosition > currentScrollPosition) {
        header.style.top = '0';
      } else {
        header.style.top = '-100px';
      }

      previousScrollPosition = currentScrollPosition;
    }

    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setPublicationOpen(false);
        setMoreOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header id="headerNavbar" className={HEADER_CLASSES}>
      <div id="logo-alsa-text" className="flex gap-[clamp(5px,1vw,10px)]">
        <Link href="/">
          <Image
            src={logo_img}
            alt="logo ALSA Local Chapter Unpad"
            width={60}
            height={47}
            className="w-[clamp(44px,6vw,77px)] h-[clamp(36px,5vw,63px)]"
          />
        </Link>
        <div id="all-text" className="hidden md:flex flex-col justify-center">
          <Link href="/" className="text-[var(--primary-color)] font-bold mb-[1.5px] no-underline tracking-[0.3px] text-[clamp(0.75rem,1.2vw,1rem)]">
            ALSA Local Chapter <br /> Universitas Padjadjaran
          </Link>
          <Link href="/" className="text-[var(--primary-color)] text-[clamp(0.6rem,0.9vw,0.875rem)] m-0 no-underline">
            ALSA, Always be One!
          </Link>
        </div>
      </div>
      
      <nav id="navBar" className="navigation-bar flex items-center">
        <ul id="nav-links" className="flex items-center gap-[2.5vw] opacity-100 visible flex-wrap">
          <li className="list-none">
            <Link href="/board" className={NAV_LINK_CLASSES}>Board</Link>
          </li>
          <li className="list-none">
            <Link href="/about-us" className={NAV_LINK_CLASSES}>About Us</Link>
          </li>
          <li className="list-none">
            <Link href="/events" className={NAV_LINK_CLASSES}>Events</Link>
          </li>

          {/* Publication Dropdown */}
          <li className="relative list-none dropdown-container">
            <button 
              className={DROPDOWN_BTN_CLASSES}
              onClick={(e) => {
                e.stopPropagation();
                setPublicationOpen(!publicationOpen);
                setMoreOpen(false);
              }}
            >
              Publication
            </button>
            <div className={DROPDOWN_CONTENT_CLASSES(publicationOpen)}>
              <Link 
                href="/publication-full/law-development-column" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setPublicationOpen(false)}
              >
                Law Development Column
              </Link>
              <Link 
                href="/publication-full/writing-by-edev" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setPublicationOpen(false)}
              >
                Writing by Edev
              </Link>
              <Link 
                href="/publication-full/post-samework-writing" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setPublicationOpen(false)}
              >
                Post-Semwork Writing
              </Link>
            </div>
          </li>

          {/* More Dropdown */}
          <li className="relative list-none dropdown-container">
            <button 
              className={DROPDOWN_BTN_CLASSES}
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen(!moreOpen);
                setPublicationOpen(false);
              }}
            >
              More
            </button>
            <div className={DROPDOWN_CONTENT_CLASSES(moreOpen)}>
              <Link 
                href="/partnership" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setMoreOpen(false)}
              >
                Partnership
              </Link>
              <Link 
                href="/merchandise" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setMoreOpen(false)}
              >
                Merchandise
              </Link>
              <Link 
                href="/resources" 
                className={DROPDOWN_LINK_CLASSES}
                onClick={() => setMoreOpen(false)}
              >
                Resources
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}