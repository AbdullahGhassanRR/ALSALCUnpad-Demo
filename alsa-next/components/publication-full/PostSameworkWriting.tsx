"use client"
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export type ArticleResponse = {
  success: boolean;
  data?: ArticleItem[];
};

export type ArticleItem = {
  _id: string;
  title: string;
  created_at: string;
  poster_image_url: string | null;
  link_drive?:string;
  article_content?:string;
  slug: {
        current: string;
    };
};

export type ArticleWriting = {
    src: string;
    id: string;
    title: string;
    created_at: string;
    link_drive?: string; 
    article_content?:string;
    slug: {
        current: string;
    };
}

// '/api/publication-full/post-samework-writing'

export default function PostSameworkWriting() {
    const [postSameworkList, setPostSameworkList] = useState<ArticleWriting[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    //  Pagination logic
    const totalPages = Math.ceil(postSameworkList.length / ITEMS_PER_PAGE);
    const paginatedList = postSameworkList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // useEffect to get external data
    useEffect(function () {
        let isMounted = true;

        async function loadList_PostSameworkWriting() {
            try {
                const response = await fetch('/api/publication-full/post-samework-writing', {
                    method: 'GET',
                    cache: 'no-store'
                });

                if (!response.ok) {
                    console.log("No response when fetching.");
                    return;
                }

                const payload = (await response.json()) as ArticleResponse;

                if (!payload.success || !payload.data || payload.data.length === 0) {
                    console.log("Failed: empty or unsuccessful payload");
                    return;
                }

                const postSameworkList = payload.data
                    .filter(function (item) {
                        if (!item.slug || !item.slug.current) {
                            console.warn("Missing slug for item:", item);
                            return false;
                        }
                        return Boolean(item.poster_image_url && item.title && item.created_at && item.slug.current && item.article_content);
                    })
                    .map(function (item) {
                        return {
                            src: item.poster_image_url as string,
                            id: item._id,
                            title: item.title,
                            created_at: (new Date(item.created_at)).toString().split(' ').splice(1,3).join(' '),
                            link_drive: item.link_drive,
                            article_content: item.article_content!.length > 75
                                ? item.article_content!.slice(0, 75) + '…'
                                : item.article_content,
                            slug: {
                                current: item.slug.current,
                            },
                        };
                    });

                if (isMounted) setPostSameworkList(postSameworkList);

            } catch (error) {
                console.log("Failed in loadList_PostSameworkWriting", error);
            }
        }

        loadList_PostSameworkWriting();

        return function () {
            isMounted = false;
        };
    }, []);

    

    return (
        <div className="min-h-screen bg-[var(--primary-color)] py-10 px-4 sm:px-8">
            <div className='h-[20vh] max-md:h-[10vh]'></div>
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-7xl max-md:text-4xl font-bold text-[var(--secondary-color)] mb-17 text-center tracking-widest">
                    Post Samework Writing
                </h1>

                {/* card starts here */}
                {paginatedList.map(function (post) {
                    return (
                        <div key={post.id} className="w-full relative group">
                            <Link href={`/publication-full/post-samework-writing/${post.slug.current}`} className="block h-full">
                                <div className="group relative w-full">

                                    <div className="w-full flex flex-row
                                        bg-[var(--primary-color)] overflow-hidden
                                        shadow-lg hover:shadow-3xl
                                        transition-all duration-300
                                        rounded-[clamp(12px,2vw,20px)]
                                        ring-1 ring-[var(--secondary-color)]
                                        hover:ring-3 hover:ring-[var(--secondary-color)]
                                        h-[140px] sm:h-[clamp(220px,40vw,50vh)]">

                                        {/* Image — fixed narrow column on mobile, wider on md+ */}
                                        <div className="relative shrink-0
                                            w-[120px] sm:w-[200px] md:w-5/12
                                            h-full">
                                            <Image
                                                src={post.src}
                                                alt={post.title}
                                                fill
                                                className="object-cover object-top-left"
                                                sizes="(max-width: 640px) 120px, (max-width: 768px) 200px, 45vw"
                                            />
                                        </div>

                                        {/* Text content */}
                                        <div className="flex flex-col justify-center text-left
                                            px-4 py-3
                                            sm:p-6 md:p-8
                                            min-w-0 flex-1">
                                            <h2 className="font-bold text-[var(--secondary-color)] leading-tight mb-1 sm:mb-3
                                                group-hover:text-white transition-colors duration-300
                                                text-sm sm:text-lg md:text-2xl
                                                line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-[var(--secondary-color)] overflow-hidden whitespace-nowrap text-ellipsis
                                                text-xs sm:text-sm md:text-base
                                                opacity-70">
                                                {post.article_content}
                                            </p>
                                            {/* Date — hidden on very small, shown sm+ */}
                                            <span className="hidden sm:block mt-2 text-xs opacity-40 text-[var(--secondary-color)]">
                                                {post.created_at}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    );
                })}

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-4">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-[var(--secondary-color)] text-[var(--secondary-color)]
                                disabled:opacity-30 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]
                                transition-all duration-300"
                        >
                            ←
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg border border-[var(--secondary-color)] transition-all duration-300
                                    ${currentPage === page
                                        ? 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
                                        : 'text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-[var(--secondary-color)] text-[var(--secondary-color)]
                                disabled:opacity-30 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]
                                transition-all duration-300"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}