const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.client.common.js')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyPlugin({
      patterns: [
        /**
         * If there are pregenerated sitemap files, copy them
         * into output folder.
         */
        {
          from: 'src/server/sitemap_generator/sitemap_output',
          to: `${common.output.path}/sitemap`,
          noErrorOnMissing: true
        },
        {
          from: 'src/client/robots.txt',
          to: `${common.output.path}`
        }
      ]
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
})
