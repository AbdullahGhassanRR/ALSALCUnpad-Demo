import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

const footerQuery = `*[_type == "footer"] | order(created_at desc)[0]{
  _id,
  created_at,
  email_ofc,
  nomor_ketua,
  id_line_sekre,
  ig_link,
  tiktok_link,
  x_link,
  yt_link,
  fb_link
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(footerQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
