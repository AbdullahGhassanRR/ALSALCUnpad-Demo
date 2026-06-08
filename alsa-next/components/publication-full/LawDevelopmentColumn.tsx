// download link from google client: https://drive.usercontent.google.com/u/0/uc?id=1fS23zjVhJPQj76rInazAz1cm0a8Izn8L&export=download

"use client"
import { PublicationResponse, Newsletter, PublicationItem , FALLBACK_NEWSLETTERS, formatPublicationLabel} from '@/components/dynamic/PublicationPreview';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PERIODE_CLASSES = " px-[10vw] text-2xl text-[var(--primary-color)] font-bold flex items-center gap-[12px]";

const ARTICLE_GRID_CLASSES = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] p-[20px] max-w-[1200px] mx-auto"

const CARD_CLASSES = 
  "border border-[#eee] rounded-[12px] overflow-hidden bg-[var(--secondary-color)] " +
  "shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-1 " +
  "flex flex-col p-[15px]";

const CARD_IMAGE_CLASSES = 
  "w-full h-[max(100%,400px)] object-cover rounded-[8px] mb-[15px]";

const BTN_BASE_CLASSES = 
  "block text-center no-underline py-[10px] mt-[8px] rounded-[6px] font-semibold text-[14px] transition-opacity duration-200 hover:opacity-90";


const VIEW_BTN_CLASSES = `${BTN_BASE_CLASSES} bg-[var(--primary-color)] text-white`;

function NewsletterPeriodeGroup({restOfNewsletters, periode }:{restOfNewsletters:Newsletter[], periode:string[]}){
  console.log(periode);  
  return(
      <div className="bg-[var(--secondary-color)] min-h-screen">

        <div className='h-40'></div>

        <h1 className='text-7xl max-md:text-4xl text-[var(--primary-color)] font-bold px-[10vw] text-center tracking-widest mb-17'>Law Development Column</h1>
        

        {periode.map((currentPeriod, index) => {
        if (!currentPeriod) return null;

        // Filter items for this specific period
        const filteredItems = restOfNewsletters.filter(
          (item) => item.periode === currentPeriod
        );

        if (filteredItems.length === 0) return null;

        return (
          <div key={index}>
            <h1 className={PERIODE_CLASSES}>
              {currentPeriod}
              <span className="flex-grow h-[2px] bg-[var(--primary-color)] min-w-[50px] rounded-full"></span>
            </h1>
            
            <section 
              id={`article-grid-${index}`} 
              className={ARTICLE_GRID_CLASSES}
            >
              {filteredItems.map((item, itemIndex) => (
                <article 
                  key={`${currentPeriod}-${itemIndex}`} 
                  className={CARD_CLASSES}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={300} 
                    height={400} 
                    className={CARD_IMAGE_CLASSES}
                  />
                  
                  <Link 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={VIEW_BTN_CLASSES}
                  >
                    View
                  </Link>
                </article>
              ))}
            </section>

            <div className='min-h-[70px]'></div>

          </div>
          
        );
      })}

    </div>
    );
}

export default function LawDevelopmentColumn(){
    const [restOfNewsletters, setRestOfNewsLetters] = useState<Newsletter[]>([]);
    const [periode, setPeriode]= useState<string[]>([]);

    useEffect(function(){
        let isMounted = true;

        async function loadPublicationsFull(){
            try {
                const response = await fetch('/api/publication-full/law-development-column',{
                    method: 'GET',
                    cache: 'no-store'
                });

                if (!response.ok){
                    console.log("No response when fetching. inside async function loadPublicationsFull-> !response.ok");

                    return;
                }

                const payload = (await response.json()) as PublicationResponse;

                if (!payload.success || !payload.data || payload.data.length === 0) {
                    console.log("Failed in async function loadPublicationsFull-> !payload.success etc");

                    return;
                }

                const restOfNewsletters = payload.data
                .filter(function (item){
                    return Boolean(item.poster_image_url && item.link_drive && item.periode);
                })
                .map(function(item){
                    return{
                        src: item.poster_image_url as string,
                        alt: formatPublicationLabel(item._id),
                        href: item.link_drive,
                        periode:item.periode
                    };
                });

                if(isMounted && restOfNewsletters.length > 0){
                    setRestOfNewsLetters(restOfNewsletters);
                    const uniquePeriods = [...new Set(restOfNewsletters.map(item => item.periode))];
                    setPeriode(uniquePeriods);
                }

          


            }catch{
                console.log("Failed in async function loadPublicationsFull");
            }
        }

        loadPublicationsFull();

        return function(){
            isMounted = false;
        };
    }, []);

    return(
      <NewsletterPeriodeGroup restOfNewsletters={restOfNewsletters} periode={periode}/>
    );
}

