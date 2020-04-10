const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');



module.exports = {
  devServer: {
    proxy: {
      '/api': {
        pathRewrite: { '^/api': '' },
        target: 'http://localhost:3000/'
      }
    }
  },
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [{
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new VueLoaderPlugin()
    
  ]
}