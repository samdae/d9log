import { build } from 'velite';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // Base path for GitHub Pages (repo name)
  basePath: '/deuk9-blog',
  // Disable Image Optimization for GH Pages
  images: {
    unoptimized: true,
  },
  // Velite integration
  webpack: config => {
    config.plugins.push(new VelitePlugin());
    return config;
  },
};

class VelitePlugin {
  static started = false;
  constructor() {
    this.name = 'VelitePlugin';
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise(this.name, async () => {
      if (VelitePlugin.started) return;
      VelitePlugin.started = true;
      const dev = compiler.options.mode === 'development';
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
