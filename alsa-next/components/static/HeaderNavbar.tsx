'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import logo_img from '@/asset/logo_alsalcunpad_primary_color.png';

const NAV_LINK_CLASSES = `
text-[var(--primary-color)] no-underline font-normal relative 
text-[clamp(0.75rem,1.1vw,1rem)]
after:content-[''] after:absolute after:left-[0px] after:bottom-[-5px]
after:h-[1.5px] after:w-full
after:bg-[var(--primary-color)]
after:origin-left after:scale-x-0
after:transition-transform after:duration-700
hover:after:scale-x-100
`;
                          
const DROPDOWN_BTN_CLASSES = `
border-none bg-transparent p-0                              
text-[var(--primary-color)] text-[clamp(0.75rem,1.1vw,1rem)] font-normal`;

const DROPDOWN_CONTENT_CLASSES = `
opacity-0 invisible bg-[var(--secondary-color)] absolute z-10 rounded-[12px] shadow-none                                  
transition-[opacity,box-shadow,visibility] duration-300 ease-in-out 
group-hover:visible group-hover:opacity-100 group-hover:shadow-[0px_3px_4px_0px_rgba(0,0,0,0.2)] 
max-md:right-[-5px]`;

const DROPDOWN_LINK_CLASSES = `
text-[var(--primary-color)] no-underline block 
m-[clamp(10px,1.5vw,20px)] 
text-[clamp(0.75rem,1.1vw,1rem)] 
relative
after:content-[''] after:absolute after:left-[0px] after:bottom-[-6px]
after:h-[2px] after:w-full
after:bg-[var(--primary-color)]
after:origin-left after:scale-x-0
after:transition-transform after:duration-700
hover:after:scale-x-100
max-md:text-left
`;

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

  return (
    <header
      id="headerNavbar"
      className={HEADER_CLASSES}
    >
      <div id="logo-alsa-text" className="flex gap-[clamp(5px,1vw,10px)]">
        <Image
          src={logo_img}
          alt="logo ALSA Local Chapter Unpad"
          width={60}
          height={47}
          className="w-[clamp(44px,6vw,77px)] h-[clamp(36px,5vw,63px)]"
        />
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

          <li className="relative list-none group">
            <button className={DROPDOWN_BTN_CLASSES}>Publication</button>
            <div className={DROPDOWN_CONTENT_CLASSES}>
              <Link href="/publication/law-dev-col" className={DROPDOWN_LINK_CLASSES}>Law Development Column</Link>
              <Link href="/publication/writing-by-edev" className={DROPDOWN_LINK_CLASSES}>Writing by Edev</Link>
              <Link href="/publication/post-same-writing" className={DROPDOWN_LINK_CLASSES}>Post Samework Writing</Link>
            </div>
          </li>

          <li className="relative list-none group">
            <button className={DROPDOWN_BTN_CLASSES}>More</button>
            <div className={DROPDOWN_CONTENT_CLASSES}>
              <Link href="/partnership" className={DROPDOWN_LINK_CLASSES}>Partnership</Link>
              <Link href="/merchandise" className={DROPDOWN_LINK_CLASSES}>Merchandise</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
