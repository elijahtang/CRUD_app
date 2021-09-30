const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { LoaderOptionsPlugin, webpack } = require('webpack');

module.exports = {
    entry: '/client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')

    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    // module: {
    //   rules: [
    //     { test: /\.svg$/, use: 'svg-inline-loader' },
    //     { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    //     { test: /\.(js)$/, use: 'babel-loader'},

    // ]
    // },
    module: {
        rules: [
            { 
              test: /\.jsx?/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env','@babel/preset-react']
                  }
              }
            }, 
            {
               test: /\.s[ac]ss$/i,
               use: ["style-loader", "css-loader", "sass-loader"],
              }
        ]
      },
    
    plugins: [
      new HtmlWebpackPlugin({template: './client/index.html'})
      // new webpack.EnvironmentPlugin({
      //     'NODE_ENV' : 'production'
      // })
    ],
    devServer: {
      publicPath: '/',
      proxy: {
        '*': { target: 'http://localhost:3000', secure: false },
        '/list': { target: 'http://localhost:3000', secure: false },

      },
      hot: true,
    },
    // devServer: {
    //     publicPath: '/build/',
    //     proxy: {
    //             '/api/**': {
    //                 target: 'http://localhost:3000/',
    //                 secure: false,
    //             },
    //             '/assets/**': {
    //         target: 'http://localhost:3000/',
    //         secure: false,
    //       },
    //     }
    //   },
    }    


// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
// 	entry: './client/index.js',
// 	output: {
// 		path: path.resolve(__dirname, 'build'),
// 		filename: 'bundle.js',
// 		// publicPath: '/'
// 	},
//     mode: process.env.NODE_ENV,
//     devServer: {
//     publicPath: '/',
//     proxy: {
// 			'/api/**': {
// 				target: 'http://localhost:3000/',
// 				secure: false,
// 			},
// 			'/assets/**': {
//         target: 'http://localhost:3000/',
//         secure: false,
//     },
// }
// },
// plugins: [new MiniCssExtractPlugin()],
// module: {
//     rules: [{
//   test: /\.jsx?/,
//   exclude: /node_modules/, // |bower_components
//   use: {
//     loader: 'babel-loader',
//     options: {
//       presets: ['@babel/preset-env', '@babel/preset-react']
//     }
//   }
// },
// {
//         test: /\.s[ac]ss$/i,
//         // exclude: /node_modules/, // |bower_components
//         use: [
//             MiniCssExtractPlugin.loader,
//             // Creates `style` nodes from JS strings
//             // 'style-loader',
//         // Translates CSS into CommonJS
//         'css-loader',
//         // Compiles Sass to CSS
//         'sass-loader',
//         ],
//         }]
//         }

// }
