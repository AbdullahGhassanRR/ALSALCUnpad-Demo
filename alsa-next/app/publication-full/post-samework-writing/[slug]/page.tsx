import { type SanityDocument } from "next-sanity";
import {sanityClient}  from "@/app/api/_lib/sanity";
import InsideArticle from "@/components/publication-full/InsideArticle";

const POST_QUERY = `*[_type == "post_samework_writing" && slug.current == $slug][0]`;

export default async function InsidePostSameworkWritingPage({params,} : {params:Promise<{slug:string}>}){
    console.log('masuk ke InsidePostSameworkWritingPage ')
    const {slug} = await params;
    const post = await sanityClient.fetch<SanityDocument>(POST_QUERY, {slug});    
    console.log(post);

    return(
        <InsideArticle post = {post} subdirectory_origin="post-samework-writing"/>
    );
}
