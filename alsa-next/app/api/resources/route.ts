import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const resourcesQuery = `*[_type == "resources"] | order(created_at asc){
  _id,
  created_at,
  link_drive,
  periode,
  "poster_image_url": poster_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(resourcesQuery);
    console.log(data);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
