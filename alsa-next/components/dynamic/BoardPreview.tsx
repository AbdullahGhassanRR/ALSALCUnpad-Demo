import board_image from "@/asset/board_of_directors.png";

export default function BoardPreview() {
  return (
    <section 
      className="
        w-auto 
        overflow-hidden 
        bg-cover 
        bg-no-repeat 

        transition-all 
        duration-1000 */

        h-[100vh] 
        
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
                      "
              >
                <img src={board_image.src} alt="board_image" />

      </div>
    </section>
  );
}