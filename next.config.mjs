import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'learn-ml-visual';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật static export cho GitHub Pages
  // Note: 'output: export' only affects production builds
  // Development mode (npm run dev) runs in server mode, enabling:
  // - Server Actions
  // - WebSocket streaming for Claude Code integration
  // - Real-time logging
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

  // Externalize server-only packages (don't bundle for browser)
  // Required for WebSocket streaming and Pino logging in development mode
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty', 'ws'],
  },
};

export default withMDX(nextConfig);

