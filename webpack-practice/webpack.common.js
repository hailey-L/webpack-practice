const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

// common파일엔 공통적으로 사용하는 요소만 남김

module.exports = {
  entry: './index.js',
  output: {
    // filename에 해시값주면 번들마다 다른 url가져서 캐싱 시 혼돈 안할 수 있다.
    // 해시값3가지 - hash  contenthash  chunkhash
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // test = 어떤 파일들이 로더의 대상이 되는지 정규표현식을 통해 패턴 매칭으로 설정
        // use = 사용하는 로더를 지정하는 로더 키와 로더의 동작을 변경할 수 있는 옵션스라는 키 사용
        test: /\.css$/i,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag',
          //   },
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './template.hbs',
      // template - 자동으로 생성되는 html문서가 특정파일을 기준으로 만들어지게끔 파일 지정해주는 역할

      // meta라는 키가 있음 meta 설정하게 되면 meta태그 자동 완성해줌
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
      // 마크업 최적화하기
      minify: isProduction //isProduction이 production모드이면 압축 dev모드이면 압축 안하게 하기
        ? {
            // 공백없애기
            collapseWhitespace: true,
            // 짧게 만들기
            useShortDoctype: true,
            // 스크립트타입 속성 없애기
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    // clean plugin : build 될 때마다 dist안에 내용 지워주고, 새 build 파일만 남김
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 모듈 전역으로 제공되는 상수값을 접근하기 위한 이름 지정, 플러그인의 객체에 인자로 전달할 수 있다.
      IS_PRODUCTION: true,
    }),
  ],
};
