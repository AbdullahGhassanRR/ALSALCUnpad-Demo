// Objectives or Misi content must be separated, to properly set each indent for each objective items

const OBJECTIVES = [
  'The optimization of ALSA LC Unpad as a platform for the self-development of its members, with the objective of cultivating quality human resources that possess a global perspective.',
  'The establishment of a sense of unity and belonging within ALSA LC Unpad, characterized by interactive, inclusive, and innovative environments that seamlessly integrate professionalism with a spirit of unity.',
  'The positioning of ALSA LC Unpad as an organization that contributes to and synergizes with KMFH, Unpad, Alumni, ALSA Indonesia, and the community.',
  'The organization is committed to being a pioneer in implementing innovative changes.',
];

// DRY: Shared styles for section titles (Visi & Misi)
const TITLE_CLASSES = 
  "text-[var(--secondary-color)] font-bold text-[clamp(2.5rem,8vw,6.25rem)] text-left ml-[10vw]";

// DRY: Shared styles for content paragraphs (Visi & Misi)
const CONTENT_CLASSES = 
  "text-[var(--secondary-color)] text-[clamp(1rem,2vw,1.875rem)] text-justify " +
  "mx-[11vw] max-md:mx-[5vw] mb-[clamp(2rem,8vw,11rem)] mt-0";

// DRY: Specific styles for Misi section (inverted colors)
const MISI_CONTAINER_CLASSES = 
  "flex justify-start flex-wrap bg-[var(--secondary-color)]";

const MISI_TITLE_CLASSES = 
  "text-[var(--primary-color)] font-bold text-[clamp(2.5rem,8vw,6.25rem)] text-left ml-[10vw] mb-3";

const MISI_CONTENT_CLASSES = 
  "text-[var(--primary-color)] text-[clamp(1rem,2vw,1.875rem)] text-justify " +
  "mx-[5.5vw] max-md:mx-[5vw] mt-0";

export default function VisiMisi() {
  return (
    <section className="flex min-h-screen w-full flex-col bg-[var(--primary-color)]">

      {/* VISION */}
      <div className="
        flex flex-col
        justify-center
        flex-1
        py-12 md:py-20
      ">

        <h1 className={TITLE_CLASSES}>
          Vision
        </h1>

        <p className="
          text-[var(--secondary-color)]
          text-[clamp(1rem,2vw,1.875rem)]
          text-justify
          mx-[11vw] max-md:mx-[5vw]
          mt-4 md:mt-8
          leading-relaxed
        ">
          To make ALSA Local Chapter Universitas Padjadjaran as an organization based on the
          principles of kinship and professionalism, dedicated to developing human resources in reflecting the four pillars of ALSA in an inclusive, progressive, collaborative, and innovative environment.
        </p>

      </div>

      {/* MISSION */}
      <div className="
        flex flex-col
        bg-[var(--secondary-color)]
        py-20 md:py-28
      ">

        {/* 🔥 SINGLE ALIGN WRAPPER (KEY FIX) */}
        <div className="mx-[10vw] max-md:mx-[5vw]">

          {/* TITLE */}
          <h1 className={MISI_TITLE_CLASSES + " -ml-6 md:-ml-1"}>
            Mission
          </h1>

          {/* LIST */}
          <div className="mt-10">

            {OBJECTIVES.map((item, index) => (
              <p
                key={index}
                className="
                  mb-6
                  text-[var(--primary-color)]
                  text-[clamp(1rem,2vw,1.875rem)]
                  text-justify
                  leading-relaxed
                "
              >
                ▢ {item}
              </p>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}