/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["courses-top.ru"],
  },
  webpack(config, options) {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      loader: "@svgr/webpack",
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                override: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
};
