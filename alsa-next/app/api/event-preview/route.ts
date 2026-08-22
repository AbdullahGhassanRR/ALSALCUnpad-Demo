import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const eventPreviewQuery = `*[_type == "event_preview"] | order(created_at desc){
  _id,
  created_at,
  event_title,
  event_description,
  "event_image_url": event_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(eventPreviewQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
