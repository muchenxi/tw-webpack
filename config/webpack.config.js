const path = require('path');
const cwd = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath:"../",
    filename: 'js/main.js',
    path: path.join(__dirname, '../build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // 处理图片资源
      {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              // url-loader 依赖于 file-loader
              loader: 'url-loader',
              options: {
                // 关闭es6模块使用commonjs,url-loader默认使用es6
                esModule: false,
                limit: 8 * 1024,
                name: function(file) {
                  console.log(file);
                  var filename = file.replace(
                    path.resolve(path.resolve(cwd), 'src') + path.sep,
                      ''
                  ); // 去掉路径

                  filename = filename.split('.')[0]; // 去掉扩展名部分
                  console.log('img-name', filename + '.[hash:10].[ext]')
                  return filename + '.[hash:10].[ext]';
                }
              }
            }
          ]
      },
      // 处理html中img资源
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            // 关闭es6模块
            esModule: false,
            minimize: true
          }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    port: 8087,
    open: true
  }
}