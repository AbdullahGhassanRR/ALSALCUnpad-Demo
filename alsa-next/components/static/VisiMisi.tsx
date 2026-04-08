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
    <section className="h-max min-h-[100vh] w-full bg-[var(--primary-color)] max-md:min-h-[90vh]">
      
      {/* Vision Section */}
      <div className="mt-0 flex justify-start flex-wrap bg-[var(--primary-color)]">
        <h1 className={TITLE_CLASSES}>Vision</h1>
        <p className={CONTENT_CLASSES}>
          To make ALSA Local Chapter Universitas Padjadjaran as an organization based on the
          principles of kinship and professionalism, dedicated to developing human resources in
          reflecting the four pillars of ALSA in an inclusive, progressive, collaborative, and
          innovative environment.
        </p>
      </div>

      {/* Objective/Misi Section */}
      <div className={MISI_CONTAINER_CLASSES}>
        <h1 className={MISI_TITLE_CLASSES}>Objective</h1>
        <p className={MISI_CONTENT_CLASSES}>
          {OBJECTIVES.map(function (item, index) {
            return (
              <p key={index} className={MISI_CONTENT_CLASSES}>
                ▢ {item}
                {index < OBJECTIVES.length - 1 && (
                  <>
                  <br />
                  <br />
                  </>
                )}
              </p>
            );
          })}
        </p>
      </div>
    </section>
  );
}