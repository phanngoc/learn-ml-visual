import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'learn-ml-visual';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật static export cho GitHub Pages
  output: 'export',

  // MDX cho App Router
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // GitHub Pages (project site) cần basePath + assetPrefix
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Không dùng image optimization server-side khi export
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);

