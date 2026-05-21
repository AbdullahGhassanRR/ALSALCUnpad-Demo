import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const localChaptersQuery = `*[_type == "local_chapter"] | order(order asc, university_name asc){
  _id,
  university_name,
  instagram_url,
  "logo_url": logo.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(localChaptersQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
