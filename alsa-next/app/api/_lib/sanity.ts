import {createClient} from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'glfbau31';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.SANITY_API_VERSION ?? '2026-04-18';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});


export async function runSanityQuery<T>(query: string, params?: Record<string, unknown>) {
  return sanityClient.fetch<T>(query, params ?? {});
}
