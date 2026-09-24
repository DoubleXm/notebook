import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { ImageProps } from 'fumadocs-core/framework';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { LineCard, LineCards } from './line-card';

/**
 * MDX resolves a local image to an object carrying its intrinsic size, which
 * the DOM's `src` type does not admit — Fumadocs' own image component is handed
 * the same value, and the zoom wrapper reads `.src` off it. The source is
 * therefore passed through unchanged; only the prop type narrows.
 */
function ZoomableImage({ src, ...props }: ComponentProps<'img'>) {
  return <ImageZoom src={src as ImageProps['src']} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card: LineCard,
    Cards: LineCards,
    img: ZoomableImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
