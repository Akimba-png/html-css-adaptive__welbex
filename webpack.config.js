const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';

module.exports = {
  mode,
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'),
    },
    port: 5000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SVGSpritemapPlugin('./src/assets/icons/**/*.svg', {
      output: {
        filename: 'assets/sprite.svg',
        svg: {
          sizes: false,
        },
        svgo: true,
      },
      sprite: {
        prefix: false,
        generate: {
          use: true,
          symbol: true,
          view: '-fragment',
        },
      },
      styles: {
        format: 'fragment',
      }
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => {
                  if (/\.svg/.test(url)) {
                    return false;
                  }
                  return true;
                },
              }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env'),
                ],
              },
            },
          },
          'sass-loader',
        ]
      },
      {
        test: /\.woff2$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpe?g)/,
        use: isProd ? [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
            }
          },
        ] : [],
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[ext]',
        },
      }
    ]
  }
};
