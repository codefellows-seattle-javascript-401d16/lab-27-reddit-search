'use strict'

const HtmlPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // tells webpack where to load the app from 
  entry: `${__dirname}/src/main.js`,
  // tells webpack where to put the bundles once their built
  output: {
    // tells webpack what the js bundle should be called
    filename: 'bundle-[hash].js',
    // tells webpack where to put all the bundles once its done
    path: `${__dirname}/build`,
    // tells wepack what to prefix all relevant src and href tags with i
    publicPath: '/',
  },
  plugins: [
    // adds dynamic script/link tags to index.html
    new HtmlPlugin({ template: `${__dirname}/src/index.html`}),
    // makes a bundle out of our styles
    new ExtractPlugin('bundle-[hash].css'),
  ],
  module: {
    // configure loaders
    rules: [
      // turn jsx and es6 in to es5
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // turn scss into css
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
}