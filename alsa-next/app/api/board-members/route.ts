import {fail, ok} from '@/app/api/_lib/responses';
import {runSanityQuery} from '@/app/api/_lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const boardMembersQuery = `*[_type == "board_member" && coalesce(is_current, true) == true] | order(category_key asc, position_key asc, order asc, name asc){
  _id,
  name,
  category_key,
  position_key,
  order,
  "photo_url": photo.asset->url
}`;

export async function GET() {
  try {
    const data = await runSanityQuery(boardMembersQuery);
    return ok(data);
  } catch (error) {
    return fail(error);
  }
}
