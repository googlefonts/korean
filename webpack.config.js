var webpack = require('webpack');
var PROD = process.env.NODE_ENV == "production";
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config  = {
  entry: "./app/Main.js",
  output: {
    path : __dirname + '/public',
    filename: PROD ? "./public/bundle.min.js" : "./public/bundle.js"
  },
  module: {
    rules : [
      {
        test : /\.scss$/,
        use : ['extracted-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: true
                }
            }, 
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
          ]
        }))
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader : 'babel-loader',
          options : {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  plugins: PROD ? [
    new ExtractTextPlugin({  
      filename: './public/style.css' 
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [ 
    new ExtractTextPlugin({
      filename: './public/style.css'
    })
  ],
  devtool: 'source-map'
}

module.exports = config;