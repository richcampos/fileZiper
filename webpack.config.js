const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// For multiple pages unComment this and add .concat(HWPConfig) at the end of plugins
/*

  let htmlPages = ['']

  let HWPConfig = htmlPages.map(entryName => {
    return new HtmlWebpackPlugin({
      filename: `${entryName}/index.html`,
      template: `./src/${entryName}.pug`
    })
  })

*/

module.exports = {
  entry: {
    app: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg|mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            publicPath: '../images'
          }
        }]
      },
      {
        test: /\.pdf$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'PDFs',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(otf|ttf|eot|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  }
}
