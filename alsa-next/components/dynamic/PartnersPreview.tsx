const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--primary-color)] flex flex-col justify-center items-center " +
  "gap-[clamp(20px,4vw,44px)] py-[clamp(48px,7vw,88px)] " +
  "max-[834px]:min-h-[78vh] max-[768px]:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(90%,1100px)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl " +
  "text-center font-bold leading-[1.05]";

const COMING_SOON_CLASSES =
  "w-[min(90%,1100px)] min-h-[clamp(220px,42vh,420px)] flex items-center justify-center " +
  "px-[clamp(20px,5vw,48px)] text-3xl sm:text-4xl md:text-5xl " +
  "text-[var(--secondary-color)] text-center font-bold leading-tight";

export default function PartnersPreview() {
  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>Our Partners</h2>
      <p className={COMING_SOON_CLASSES}>Coming Soon!</p>
    </section>
  );
}
