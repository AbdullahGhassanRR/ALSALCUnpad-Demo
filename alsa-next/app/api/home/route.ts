import {NextResponse} from 'next/server';

import {runSanityQuery} from '@/app/api/_lib/sanity';

const boardPreviewQuery = `*[_type == "board_preview"] | order(created_at desc)[0]{
  _id,
  created_at,
  "background_image_url": background_image.asset->url
}`;

const eventPreviewQuery = `*[_type == "event_preview"] | order(created_at desc){
  _id,
  created_at,
  event_title,
  event_description,
  "event_image_url": event_image.asset->url
}`;

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

const merchandisePreviewQuery = `*[_type == "merchandise_preview"] | order(created_at desc){
  _id,
  created_at,
  merchandise_type,
  merchandise_name,
  "merchandise_image_url": merchandise_image.asset->url
}`;

const partnersPreviewQuery = `*[_type == "partners_preview"] | order(created_at desc){
  _id,
  created_at,
  partner_name,
  partner_category,
  "partners_logo_image_url": partners_logo_image.asset->url
}`;

const publicationQuery = `*[_type == "publication"] | order(created_at desc){
  _id,
  created_at,
  link_drive,
  periode,
  "poster_image_url": poster_image.asset->url
}`;

const testimoniesQuery = `*[_type == "testimonies"] | order(created_at desc){
  _id,
  created_at,
  nama_orang,
  role,
  testimoni
}`;

export async function GET() {
  try {
    const [
      boardPreview,
      eventPreview,
      footer,
      merchandisePreview,
      partnersPreview,
      publication,
      testimonies,
    ] = await Promise.all([
      runSanityQuery(boardPreviewQuery),
      runSanityQuery(eventPreviewQuery),
      runSanityQuery(footerQuery),
      runSanityQuery(merchandisePreviewQuery),
      runSanityQuery(partnersPreviewQuery),
      runSanityQuery(publicationQuery),
      runSanityQuery(testimoniesQuery),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          boardPreview,
          eventPreview,
          footer,
          merchandisePreview,
          partnersPreview,
          publication,
          testimonies,
        },
      },
      {status: 200},
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({success: false, message}, {status: 500});
  }
}
