const merge = require('webpack-merge');

const nodeExternals = require('webpack-node-externals');

const baseConfig = require('./base.config');

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: './src/entry-server.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  devtool: 'source-map',
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRServerPlugin()
  ]
});
