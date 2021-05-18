const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: 'postcss.config.js',
    },
  },
};
const isProduction = process.env.NODE_ENV === 'PRODUCTION';

// common파일엔 공통적으로 사용하는 요소만 남김

module.exports = {
  entry: './src/index.js',
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
        test: /\.s?css$/,
        oneOf: [
          // oneOf - 여러 룰 중 하나의 룰이 작동이 되게끔 조건을 걸어주는 키
          {
            test: /\.module\.s?css$/,
            use: [
              // 배열 형태라 체이닝~ 인덱스 큰 순서부터 적용됨
              /* {
                 loader: 'style-loader',
                 options: {
                   injectType: 'singletonStyleTag',
                 },
               },*/
              {
                // css 내용 외부 리소스로 관리가 되게끔 외부 파일로 변환되고, html에 link태그로 추가됨
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              'sass-loader', // 축약형
            ],
          },
          {
            // test 조건이 아닌 나머지는 이 경로를 따라 적용
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postcssLoader,
              'sass-loader',
            ],
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
      {
        // test - 어떤 로더가 어떤 모듈을 인식할지에 대해 특정 파일을 지칭하는 규칙을 정의
        test: /\.(png|jpe?g|gif)$/i, // $ 끝맺음, i 대소문자 구별 안함
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (!isProduction) {
                  return '[path][name].[ext]'; //ext 확장자
                }
                return '[contenthash].[ext]';
              },
              publicpath: 'assets/', // 파일불러올 때 url정보 추가하게 함
              outputpath: 'assets/', // 파일 로더를 통해 읽어들인(빌드) 모듈들이 dist>assets>생성되게 함
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit 파일크기에 제한 둘 수 있다. (바이트(파일)크기의 단위에 숫자 작성)
              limit: 8192, //8Kbyte까지만 url로더 적용하겠다
            },
          },
        ],
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
      IS_PRODUCTION: isProduction,
    }),
  ],
};
