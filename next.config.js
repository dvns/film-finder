const path = require('path');

module.exports = {
  target: 'serverless',
  webpack(config) {
    config.resolve.modules.push(path.resolve('./'));
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
};