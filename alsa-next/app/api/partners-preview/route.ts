import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const partnersPreviewQuery = `*[_type == "partners_preview"] | order(created_at desc){
  _id,
  created_at,
  partner_name,
  partner_category,
  "partners_logo_image_url": partners_logo_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(partnersPreviewQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
