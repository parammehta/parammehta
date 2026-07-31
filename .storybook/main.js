const path = require('path');

module.exports = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-mcp'],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async config => {
    config.resolve.modules = [path.resolve(__dirname, '../src'), 'node_modules'];

    const imageRule = config.module.rules.find(
      rule => rule.test instanceof RegExp && rule.test.test('.svg')
    );
    if (imageRule) imageRule.exclude = /\.svg$/;

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos, models, and hdrs (fonts handled by framework preset)
    config.module.rules.push({
      test: /\.(mp4|hdr|glb)$/i,
      type: 'asset/resource',
    });

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },
};
