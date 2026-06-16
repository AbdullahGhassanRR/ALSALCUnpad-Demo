import { sanityClient } from "@/app/api/_lib/sanity";
import { type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import Image from 'next/image';
const { projectId, dataset } = sanityClient.config();

const does_projectId_dataset_exist = projectId && dataset;

// function to create image from post.poster_image, since post.poster_image is not an URL.
// ive used different query method compared to other files. check out POST_QUERY on @/publication-full/post-samework-writing/[slug]/page.tsx 

function urlFor (source: SanityImageSource){ 
    return does_projectId_dataset_exist ? createImageUrlBuilder({ projectId, dataset }).image(source) : null;
}

export default function InsideArticle({post, subdirectory_origin} : {post: SanityDocument, subdirectory_origin: string}){
    console.log(post);

    const postImageUrl = urlFor(post.poster_image)?.url();
    postImageUrl as string;

    const link_href = `/publication-full/${subdirectory_origin}`

    return(
        <main className="bg-[var(--primary-color)]">
            <div className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col">
                <div className="h-[120px]"></div>
                <Link href = {link_href} className="hover:underline">
                    ← Back to posts
                </Link>

                <div className="h-[20px]"></div>

                <div id="div-image" className="flex justify-center">
                    <Image
                        src={postImageUrl!}
                        alt={post.title}
                        className="object-cover"
                        width={`${55 * 7}`}
                        height={`${31 * 7}`}
                    />
                </div>
                <div className="h-[40px]"></div>
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <div className="prose">
                    <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
                    <div className="h-[40px]"></div>
                    <div id="article-content" className="text-justify">
                     {post.article_content}
                    </div>
                </div>

                <div className="h-[40px]"></div>
                {post.link_drive && <Link href = {post.link_drive} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Read More
                </Link>}
            </div>
        </main>
    );
}