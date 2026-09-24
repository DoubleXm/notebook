import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Emit a fully static site, so it can be hosted without a Node.js server.
  output: 'export',
  // The export has no image optimization server to talk to.
  images: { unoptimized: true },
};

export default withMDX(config);
