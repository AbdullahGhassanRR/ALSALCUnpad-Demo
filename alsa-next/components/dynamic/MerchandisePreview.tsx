const SECTION_CLASSES =
  "min-h-[100vh] bg-[var(--secondary-color)] flex flex-col justify-center items-center " +
  "gap-[clamp(20px,4vw,44px)] py-[clamp(48px,7vw,88px)] " +
  "max-[834px]:min-h-[78vh] max-md:min-h-[70vh]";

const TITLE_CLASSES =
  "w-[min(90%,1100px)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl " +
  "text-[var(--primary-color)] text-center font-bold leading-[1.05]";

const CONTAINER_CLASSES =
  "w-[min(90%,1100px)] min-h-[clamp(340px,60vh,620px)] relative flex justify-center items-center " +
  "border-[5px] border-[var(--primary-color)] rounded-[20px] px-[clamp(20px,5vw,48px)]";

const COMING_SOON_CLASSES =
  "text-3xl sm:text-4xl md:text-5xl text-[var(--primary-color)] text-center font-bold leading-tight";

export default function MerchandisePreview() {
  return (
    <section className={SECTION_CLASSES}>
      <h2 className={TITLE_CLASSES}>Merchandise</h2>
      <div className={CONTAINER_CLASSES}>
        <p className={COMING_SOON_CLASSES}>Coming Soon!</p>
      </div>
    </section>
  );
}
