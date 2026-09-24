import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// `staticGET` exports the search index as a JSON file at build time; the browser
// downloads it and searches locally, since a static host has no search server.
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
