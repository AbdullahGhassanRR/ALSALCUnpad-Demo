import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const publicationQuery = `*[_type == "publication"] | order(created_at asc){
  _id,
  created_at,
  link_drive,
  periode,
  "poster_image_url": poster_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(publicationQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
