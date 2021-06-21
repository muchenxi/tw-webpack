const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // 处理图片资源
      {
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          options: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块
          esModule: false
      },
      // 处理html中img资源
      {
          test: /\.html$/,
          loader: 'html-loader'
      },
      {
        // 处理其他资源 
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        option: {
            name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    // contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8088,
    open: true
  }
}