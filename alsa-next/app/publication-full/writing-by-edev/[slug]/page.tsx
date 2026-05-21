import { type SanityDocument } from "next-sanity";
import {sanityClient}  from "@/app/api/_lib/sanity";
import InsideArticle from "@/components/publication-full/InsideArticle";

const POST_QUERY = `*[_type == "writing_by_edev" && slug.current == $slug][0]`;

export default async function InsideWritingByEdevPage({params,} : {params:Promise<{slug:string}>}){
    console.log('masuk ke InsideWritingByEdevPage ')
    const post = await sanityClient.fetch<SanityDocument>(POST_QUERY, await params);    
    console.log(post);

    return(
        <InsideArticle post = {post} subdirectory_origin="writing-by-edev"/>
    );
}
