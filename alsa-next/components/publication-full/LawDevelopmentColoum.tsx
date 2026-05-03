"use client"
import { PublicationResponse, Newsletter, PublicationItem , FALLBACK_NEWSLETTERS, formatPublicationLabel} from '@/components/dynamic/PublicationPreview';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CARD_CLASSES = 
  "border border-[#eee] rounded-[12px] overflow-hidden bg-[var(--secondary-color)] " +
  "shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-1 " +
  "flex flex-col p-[15px]";

const CARD_IMAGE_CLASSES = 
  "w-full h-[max(100%,400px)] object-cover rounded-[8px] mb-[15px]";

const BTN_BASE_CLASSES = 
  "block text-center no-underline py-[10px] mt-[8px] rounded-[6px] font-semibold text-[14px] transition-opacity duration-200 hover:opacity-90";


const VIEW_BTN_CLASSES = `${BTN_BASE_CLASSES} bg-[#3b82f6] text-white`;
const DOWNLOAD_BTN_CLASSES = `${BTN_BASE_CLASSES} bg-[#f3f4f6] text-[#374151] border border-[#d1d5db]`;

function NewsletterPeriodeGroup({newslettersFirst, restOfNewsletters, periode }:{newslettersFirst:Newsletter[], restOfNewsletters:Newsletter[], periode:string[]}){
  console.log(periode);  
  return(
      <div className="bg-[var(--secondary-color)] min-h-screen">

        {/* line 26 sampe 115 itu code nya sama persis, cuma beda periode-periode di tags h1, dan di logic .filter() di dalem sectionnya.  */}
         <h1>{periode[0]}</h1>
          <section id="article-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] p-[20px] mt-[15vh] max-w-[1200px] mx-auto">
            {
              newslettersFirst
              .filter(function(item){
                return Boolean(item.periode === periode[0])
              })
              .map(function (item, index) {
                return (
                  <article key={index} className={CARD_CLASSES}>
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={300} 
                      height={400} 
                      className={CARD_IMAGE_CLASSES}
                    />
                      
                    <Link href={item.href} target="_blank" rel="noopener noreferrer" className={VIEW_BTN_CLASSES}>
                      View
                    </Link>
                      
                    {/* <Link href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className={DOWNLOAD_BTN_CLASSES}>
                      Download
                    </Link> */}
                  </article>
                );
              })}
          </section> 

         <h1>{periode[1]}</h1>
          <section id="article-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] p-[20px] mt-[15vh] max-w-[1200px] mx-auto">
            {
              newslettersFirst
              .filter(function(item){
                return Boolean(item.periode === periode[1])
              })
              .map(function (item, index) {
                return (
                  <article key={index} className={CARD_CLASSES}>
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={300} 
                      height={400} 
                      className={CARD_IMAGE_CLASSES}
                    />
                      
                    <Link href={item.href} target="_blank" rel="noopener noreferrer" className={VIEW_BTN_CLASSES}>
                      View
                    </Link>
                      
                    {/* <Link href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className={DOWNLOAD_BTN_CLASSES}>
                      Download
                    </Link> */}
                  </article>
                );
              })}
          </section> 

         <h1>{periode[2]}</h1>
          <section id="article-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] p-[20px] mt-[15vh] max-w-[1200px] mx-auto">
            {
              newslettersFirst
              .filter(function(item){
                return Boolean(item.periode === periode[2])
              })
              .map(function (item, index) {
                return (
                  <article key={index} className={CARD_CLASSES}>
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={300} 
                      height={400} 
                      className={CARD_IMAGE_CLASSES}
                    />
                      
                    <Link href={item.href} target="_blank" rel="noopener noreferrer" className={VIEW_BTN_CLASSES}>
                      View
                    </Link>
                      
                    {/* <Link href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className={DOWNLOAD_BTN_CLASSES}>
                      Download
                    </Link> */}
                  </article>
                );
              })}
          </section> 

    </div>
    );
}

export default function LawDevelopmentColoum(){
    const [newslettersFirst, setNewslettersFirst] = useState(FALLBACK_NEWSLETTERS);
    const [restOfNewsletters, setRestOfNewsLetters] = useState<Newsletter[]>([]);
    const [periode, setPeriod]= useState<string[]>([]);

    useEffect(function () {
    let isMounted = true;

    async function loadPublications() {
      try {
        const response = await fetch('/api/publication-preview', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
            console.log("No response when fetching. inside async function loadPublications -> !response.ok");
            return;
          }
          console.log("ini response:" ,response);

        const payload = (await response.json()) as PublicationResponse;

        if (!payload.success || !payload.data || payload.data.length === 0) {
          console.log("Failed in async function loadPublicationsDedicated-> !payload.success etc");
          console.log("payload.success:", payload.success);
          console.log("payload.data:", payload.data);
          console.log("payload.data.length:", payload!.data!.length);
          return;
        }

        const nextNewsletters = payload.data
          .filter(function (item) {
            return Boolean(item.poster_image_url && item.link_drive);
          })
          .map(function (item) {
            return {
              src: item.poster_image_url as string,
              alt: formatPublicationLabel(item._id),
              href: item.link_drive,
              periode: item.periode
            };
          });

        if (isMounted && nextNewsletters.length > 0) {
          setNewslettersFirst(nextNewsletters);
          const uniquePeriods = [...new Set(nextNewsletters.map(item => item.periode))];
          setPeriod(uniquePeriods);
        }
      } catch {
        // Keep fallback newsletters when the CMS request fails.
      }
    }

    loadPublications();

    return function () {
      isMounted = false;
    };
  }, []);

    useEffect(function(){
        let isMounted = true;

        async function loadPublicationsDedicated(){
            try {
                const response = await fetch('/api/publication-full',{
                    method: 'GET',
                    cache: 'no-store'
                });

                if (!response.ok){
                    console.log("No response when fetching. inside async function loadPublicationsDedicated-> !response.ok");

                    return;
                }

                const payload = (await response.json()) as PublicationResponse;

                if (!payload.success || !payload.data || payload.data.length === 0) {
                    console.log("Failed in async function loadPublicationsDedicated-> !payload.success etc");

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
                    setPeriod(uniquePeriods);
                }

            }catch{
                console.log("Failed in async function loadPublicationsDedicated");
            }
        }

        loadPublicationsDedicated();

        return function(){
            isMounted = false;
        };
    }, []);

    return(
      <NewsletterPeriodeGroup newslettersFirst={newslettersFirst} restOfNewsletters={restOfNewsletters} periode={periode}/>
    );
}

