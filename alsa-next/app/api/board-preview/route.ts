import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const boardPreviewQuery = `*[_type == "board_preview"] | order(created_at desc)[0]{
  _id,
  created_at,
  "background_image_url": background_image.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(boardPreviewQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
