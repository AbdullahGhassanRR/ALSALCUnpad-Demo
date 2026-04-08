import board_image from "@/asset/board_of_directors.png";

export default function BoardPreview() {
  return (
    <section 
      className="
        w-auto 
        overflow-hidden 
        bg-cover 
        bg-no-repeat 

        /* uncomment this when updating transition and animation later
        transition-all 
        duration-1000 */

        
        /* Desktop defaults */
        h-[100vh] 
        mt-[clamp(1rem,24vh,13rem)] 
        
        /* Mobile overrides (< 768px) */
        max-md:h-[min(300px,30vh)] 
        max-md:mt-[max(6vh,40px)]
      "
    >
      <div className="h-full 
                      w-auto 
                      flex 
                      justify-center 
                      items-end 
                      relative

                      bg-cover 
                      bg-no-repeat 
                      bg-[position:50%_50%]
                      "
              style={{
                         backgroundImage: `url(${board_image.src})`,
                    }}>
      </div>
    </section>
  );
}