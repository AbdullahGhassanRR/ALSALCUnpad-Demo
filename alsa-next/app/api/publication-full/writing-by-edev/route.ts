import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const publicationQuery = `*[_type == "writing_by_edev" && defined(slug.current)] | order(created_at asc){
  _id,
  created_at,
  title,
  article_content,
  slug,
  "poster_image_url": poster_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(publicationQuery);
    console.log(data);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
