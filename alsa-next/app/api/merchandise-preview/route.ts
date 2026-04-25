import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const merchandisePreviewQuery = `*[_type == "merchandise_preview"] | order(created_at desc){
  _id,
  created_at,
  merchandise_type,
  merchandise_name,
  "merchandise_image_url": merchandise_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(merchandisePreviewQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
