import Image from 'next/image';

import floating_logo from "@/asset/logo_alsalcunpad_primary_color.png";
import batik_kiri from "@/asset/batik_kiri_new.png";
import batik_kanan from "@/asset/batik_kanan_new.png";

const PRIMARY_TEXT_CLASSES = "font-bold text-[var(--primary-color)]";

// access animation code in @/app/global.css
const FADE_IN_ANIMATION = "animate-[fade-in_2.5s]";
const SCROLL_ANIMATION_LEFT = "animate-[slide-left-scroll_linear] [animation-timeline:scroll()] [animation-range:exit]";
const SCROLL_ANIMATION_RIGHT = "animate-[slide-right-scroll_linear] [animation-timeline:scroll()] [animation-range:exit]";

export default function Hero() {
  return (
    <section id="hero" className="h-[max(100vh,600px)] static [perspective:1000px]">

      <div id='hero-container-1' className="h-[75vh] w-full mx-0 flex items-end justify-center max-md:h-[85vh] max-md:flex-col max-md:justify-end max-md:items-center max-md:gap-[min(8vh,3.5rem)] max-md:shadow-none">
        
        <div id='animasi-pas-hover' className="w-[80%] flex flex-row justify-center items-center gap-[clamp(1rem,5vw,6rem)]">

          <div id='hero-text' className={`text-left mb-[4%] ${FADE_IN_ANIMATION}`}>
              <h1 id='hero-h1' className={`w-full text-[clamp(1.8rem,100px,6rem)] ${PRIMARY_TEXT_CLASSES} mb-[5px] whitespace-nowrap overflow-hidden max-md:text-[50px]`}>
                Welcome 
              </h1>
              <h2 id='hero-h2' className={`text-[clamp(1rem,2.5vw,2.2rem)] ${PRIMARY_TEXT_CLASSES} mt-[10px] ml-[clamp(0px,1vw,15px)] whitespace-nowrap overflow-hidden`}>
                to Asian Law Students' Association <br /> Local Chapter Universitas Padjadjaran.
              </h2>
          </div>

      
          <div id='logo-melayang' className={`w-[clamp(150px,25vw,330px)] h-[clamp(150px,25vw,330px)] mb-[2%] flex items-center justify-center ${FADE_IN_ANIMATION} max-md:hidden`}>
            <Image
              src = {floating_logo}
              alt="logo ALSA Unpad"
              width={256}
              height={199}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div id='hero-container-2' className="h-[clamp(200px,40vh)] w-auto flex justify-center overflow-clip max-md:visible max-md:h-[15vh]">
        
        <div id='scroll-wrapper-left' className={`w-full h-full ${SCROLL_ANIMATION_LEFT}`}>
          <Image
            src={batik_kiri}
            alt="batik-kiri"
            width={600}
            height={800}
            className="w-full h-full animate-[slide-left_1.3s]"
          />
        </div>

        <div id='scroll-wrapper-right' className={`w-full h-full ${SCROLL_ANIMATION_RIGHT}`}>
          <Image
            src={batik_kanan}
            alt="batik-kanan"
            width={600}
            height={800}
            className="w-full h-full animate-[slide-right_1.3s]"
          />
        </div>
      </div>
    </section>
  );
}