import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

type FooterData = {
  _id: string;
  created_at?: string;
  email_ofc?: string;
  nomor_ketua?: string;
  id_line_sekre?: string;
  ig_link?: string;
  tiktok_link?: string;
  x_link?: string;
  yt_link?: string;
  fb_link?: string;
};

export async function GET() {
  try {
    const data = await runSanityQuery<FooterData | null>(footerQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
