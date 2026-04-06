import Image from 'next/image';
import internationally_minded_image from '@/asset/internationally-minded-image-bg.png'
import academically_commited_image from '@/asset/academically-commited-image-bg.png';
import legally_skilled_image from '@/asset/legally-skilled-image-bg.png'
import socially_responsible_image from '@/asset/socially-responsible-image-bg.png'

type Pilar = {
  icon: string;
  label: string;
  bgImage: string;
  bgPosition?: string;
};

const PILARS: Pilar[] = [
  { 
    icon: 'fa-solid fa-globe fa-10x', 
    label: 'Internationally\nMinded',
    bgImage: `url(${internationally_minded_image.src})`,
    bgPosition: 'center 60%' // Approximation of -0px 60%
  },
  { 
    icon: 'fas fa-book-open fa-10x', 
    label: 'Academically\nCommited',
    bgImage: `url(${academically_commited_image.src})`,
    bgPosition: 'center center'
  },
  { 
    icon: 'fa-solid fa-scale-balanced fa-10x', 
    label: 'Legally\nSkilled',
    bgImage: `url(${legally_skilled_image.src})`,
    bgPosition: 'center center'
  },
  { 
    icon: 'fas fa-users fa-10x', 
    label: 'Socially\nResponsible',
    bgImage: `url(${socially_responsible_image.src})`,
    bgPosition: 'center center'
  },
];

// DRY: Shared styles for the main container card
const CONTAINER_BASE_CLASSES = 
  "h-[clamp(220px,40vw,50vh)] w-[min(90%,1200px)] flex items-center justify-center " +
  "bg-cover rounded-[clamp(12px,2vw,20px)] max-md:gap-[25px]";

// DRY: Shared styles for the icon column
const ICON_CONTAINER_CLASSES = 
  "flex-1 ml-[clamp(1.5rem,8vw,13rem)] max-md:flex-none max-md:flex max-md:justify-center";

// DRY: Shared styles for the text box
const TEXT_BOX_CLASSES = 
  "bg-[var(--secondary-color)] h-[clamp(5rem,12vw,13rem)] w-[clamp(14rem,22vw,26rem)] " +
  "mr-[clamp(1.5rem,7vw,11rem)] flex items-center justify-center " +
  "rounded-[clamp(12px,2vw,20px)] max-md:mr-0 max-md:w-auto max-md:h-auto max-md:bg-transparent";

// DRY: Shared styles for the text inside the box
const TEXT_CLASSES = 
  "text-[var(--primary-color)] text-[clamp(1.2rem,2.5vw,3rem)] text-center max-md:text-[1.5rem]";

export default function Pilars() {
  return (
    <section className="w-full h-max min-h-[268vh] overflow-hidden flex flex-col items-center bg-cover bg-gradient-to-b from-[#76030A] via-[var(--primary-color)] to-[var(--primary-color)] bg-[length:100%_100%] gap-[clamp(2rem,4vw,5rem)] mb-0 max-md:min-h-[100vh]">
      <h1 className="text-[clamp(2rem,8vw,6.25rem)] pt-[clamp(0.5rem,1.5vh,1rem)] mb-0 text-center">
        Four Pillars of ALSA
      </h1>

      {PILARS.map(function (pilar, index) {
        const lines = pilar.label.split('\n');
        
        // Specific gap adjustments for mobile based on original CSS media queries
        const specificMobileGap = (index === 2 || index === 3) ? "max-md:gap-[20px]" : "";

        return (
          <div 
            id='pilars-container'
            key={index} 
            className={`${CONTAINER_BASE_CLASSES} ${specificMobileGap}`}
            style={{ backgroundImage: pilar.bgImage, backgroundPosition: pilar.bgPosition }}
          >
            <div id='pilars-subcontainer-1' className={ICON_CONTAINER_CLASSES}>
              <i className={`${pilar.icon} max-md:text-[70px]`}></i>
            </div>
            
            <div id='pilars-subcontainer-2' className={TEXT_BOX_CLASSES}>
              <h1 className={TEXT_CLASSES}>
                {lines[0]}
                <br />
                {lines[1]}
              </h1>
            </div>
          </div>
        );
      })}
    </section>
  );
}