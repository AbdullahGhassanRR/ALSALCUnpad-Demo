import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const directorGreetingQuery = `*[_type == "director_greeting"] | order(created_at desc)[0]{
  _id,
  name,
  period,
  greeting,
  "director_image_url": director_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(directorGreetingQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
