import Image, { type StaticImageData } from "next/image";
import PilarsAnimation from "./PilarsGsap";

import internationallyMindedImage from "@/asset/internationally-minded-image-bg.png";
import academicallyCommittedImage from "@/asset/academically-commited-image-bg.png";
import legallySkilledImage from "@/asset/legally-skilled-image-bg.png";
import sociallyResponsibleImage from "@/asset/socially-responsible-image-bg.png";

type Pilar = {
  icon: string;
  label: string;
  image: StaticImageData;
  imagePosition?: string;
};

const PILARS: Pilar[] = [
  {
    icon: "fa-solid fa-globe fa-10x",
    label: "Internationally\nMinded",
    image: internationallyMindedImage,
    imagePosition: "center 60%",
  },
  {
    icon: "fas fa-book-open fa-10x",
    label: "Academically\nCommited",
    image: academicallyCommittedImage,
  },
  {
    icon: "fa-solid fa-scale-balanced fa-10x",
    label: "Legally\nSkilled",
    image: legallySkilledImage,
  },
  {
    icon: "fas fa-users fa-10x",
    label: "Socially\nResponsible",
    image: sociallyResponsibleImage,
  },
];

const TEXT_BOX_CLASSES =
  "bg-[var(--secondary-color)] h-[clamp(5rem,12vw,13rem)] w-[clamp(12rem,22vw,26rem)] " +
  "mr-[clamp(1.5rem,7vw,11rem)] flex items-center justify-center " +
  "rounded-[clamp(12px,2vw,20px)] max-md:mr-0 max-md:h-auto";

const TEXT_CLASSES =
  "font-bold text-[var(--primary-color)] text-[clamp(1.2rem,2.5vw,3rem)] text-center max-md:text-[1.5rem]";

export default function Pilars() {
  return (
    <PilarsAnimation>
      <section
        data-pilars-section
        className="relative w-full"
        style={{ height: `${PILARS.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-linear-to-b from-[#76030A] to-(--primary-color)">
          <div className="flex shrink-0 items-center justify-center pt-32">
            <h1 className="text-center text-[clamp(1.9rem,8vw,8rem)] font-bold text-white">
              Four Pillars of ALSA
            </h1>
          </div>

          <div
            data-pilars-cards-area
            className="relative flex-1 overflow-hidden"
          >
            {PILARS.map((pilar, index) => {
              const lines = pilar.label.split("\n");

              return (
                <div
                  key={pilar.label}
                  className={
                    "pilar-card absolute left-1/2 top-3/7 " +
                    "flex h-[clamp(220px,40vw,50vh)] w-[min(90%,1200px)] " +
                    "items-center justify-between overflow-hidden " +
                    "rounded-[clamp(12px,2vw,20px)] max-md:justify-evenly"
                  }
                  style={{ zIndex: index + 1 }}
                >
                  <Image
                    src={pilar.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 1200px"
                    className="z-0 object-cover"
                    style={{ objectPosition: pilar.imagePosition ?? "center" }}
                  />

                  <div className="relative z-10 ml-[clamp(1.5rem,8vw,13rem)] flex flex-1 items-center max-md:ml-0 max-md:flex-none max-md:justify-center">
                    <i
                      aria-hidden="true"
                      className={`${pilar.icon} max-md:text-[60px]!`}
                    />
                  </div>

                  <div className={`relative z-10 ${TEXT_BOX_CLASSES}`}>
                    <h2 className={TEXT_CLASSES}>
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PilarsAnimation>
  );
}