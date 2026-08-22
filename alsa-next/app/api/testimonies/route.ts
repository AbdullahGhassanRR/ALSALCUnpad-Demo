import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const testimoniesQuery = `*[_type == "testimonies"] | order(created_at desc){
  _id,
  created_at,
  nama_orang,
  role,
  testimoni
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(testimoniesQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
