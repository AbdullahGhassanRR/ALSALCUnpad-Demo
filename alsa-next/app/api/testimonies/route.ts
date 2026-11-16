import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const testimoniesQuery = `*[_type == "event_recap"] | order(created_at desc){
  _id,
  created_at,
  recap_name,
  "recap_image": recap_image.asset->url,
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(testimoniesQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
