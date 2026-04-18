type TestimonyRowProps = {
  reverse?: boolean;
};

type TestimonyGroupProps = TestimonyRowProps & {
  ariaHidden?: boolean;
};

const TESTIMONIES = ['1', '2', '3', '4', '5', '6'];

const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--primary-color)] flex flex-col items-center justify-center " +
  "gap-[clamp(12px,2vw,28px)] py-[clamp(48px,7vw,88px)] " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(95%,1300px)] text-4xl md:text-[7.2vw] " +
  "mb-[clamp(10px,2vw,24px)] text-center font-bold leading-[1.05]";

const CAROUSEL_CLASSES =
  "my-[5px] mx-auto w-[min(95%,1300px)] rounded-[clamp(10px,2vw,20px)] " +
  "flex overflow-x-hidden group [&::-webkit-scrollbar]:hidden " +
  "[-ms-overflow-style:'none'] [scrollbar-width:'none']";

const GROUP_BASE_CLASSES =
  "flex items-center justify-center gap-[1em] pr-[.8em] " +
  "group-hover:[animation-play-state:paused]";

const GROUP_FORWARD_CLASSES =
  "animate-[marquee_200s_linear_infinite]";

const GROUP_REVERSE_CLASSES =
  "animate-[marquee_200s_linear_infinite_reverse]";

const CARD_CLASSES =
  "flex-none w-[23vw] h-[37vh] p-[1em]" +
  "border border-[5px] border-[var(--secondary-color)] text-2xl md:text-3xl lg:text-5xl " +
  "rounded-[clamp(10px,2vw,20px)] text-center content-center "+
  "max-md:w-[clamp(6.5rem,42vw,23rem)] max-md:h-[12rem] " + 
  "max-lg:w-[30vw] max-lg:h-[35vh]";

function getGroupAnimationClasses(reverse?: boolean) {
  if (reverse) {
    return GROUP_REVERSE_CLASSES;
  }

  return GROUP_FORWARD_CLASSES;
}

function TestimonyGroup({ reverse, ariaHidden }: TestimonyGroupProps) {
  return (
    <div
      className={`${GROUP_BASE_CLASSES} ${getGroupAnimationClasses(reverse)}`}
      aria-hidden={ariaHidden}
    >
      {TESTIMONIES.map(function (testimony) {
        return (
          <div key={testimony} className={CARD_CLASSES}>
            {testimony}
          </div>
        );
      })}
    </div>
  );
}

function TestimonyRow({ reverse }: TestimonyRowProps) {
  return (
    <div className={CAROUSEL_CLASSES}>
      <TestimonyGroup reverse={reverse} />
      <TestimonyGroup reverse={reverse} ariaHidden />
    </div>
  );
}

export default function TestimoniesPreview() {
  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>What They Said About Us</h2>
      <TestimonyRow />
      <TestimonyRow reverse />
    </section>
  );
}
