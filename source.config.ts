import { defineConfig } from 'fumadocs-mdx/config';

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: {
      external: true,
      onError: 'hide',
    },
    /**
     * The default pair (`github-light` / `github-dark`) is built for a white
     * card: on this sheet — warm paper in light, near-black in dark — its
     * saturated primaries shout, and a code block is meant to read as a quiet
     * panel of the page. `min-light` / `min-dark` keep the same editorial calm
     * as the rest of the type, with the accent left free to be the only
     * saturated thing on screen.
     */
    rehypeCodeOptions: {
      themes: {
        light: 'min-light',
        dark: 'min-dark',
      },
    },
  },
});
