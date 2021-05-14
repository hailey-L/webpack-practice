const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
    new OptimizeCssAssetsPlugin({
      // 어떤css파일을 최적화 시킬것인지에 대해 정규표현식 사용해서 압축할 css파일 지정하는 것
      assetNameRegExp: /\.css$/g,
      //css프로세서 중 어떤 것을 사용할 것인지 설정
      cssProcessor: require('cssnano'),
      //css프로세서에 대한 옵션 설정
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      // 콘솔에 옵션 출력하는 옵션
      canPrint: true,
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
      minify: {
        // 공백없애기
        collapseWhitespace: true,
        // 짧게 만들기
        useShortDoctype: true,
        // 스크립트타입 속성 없애기
        removeScriptTypeAttributes: true,
      },
    }),
    // clean plugin : build 될 때마다 dist안에 내용 지워주고, 새 build 파일만 남김
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // 런타임코드 따로 chunk로 분류됨
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          // 공통으로 묶는 청크파일이 노드모듈스 내에 해당하는 모듈들이다라고 정의
          test: /[\\/]node_modules[\\/]/,
          name: 'venders',
          chunks: 'all',
        },
      },
    },
    // minimize: true - 웹팩 내부에서 terser 실행 압축 진행 시킴
    minimize: true,
    // minimizer - 압축과정에서 어떤 컴프레서 사용할 것인지 설정할 수 있음 바벨 넣고 싶은 터서 대신 바벨 넣음 됨
    minimizer: [
      new TerserWebpackPlugin({
        cache: true, // 빠르게 빌드 진행되도록 작성한 코드
      }),
    ],
  },
  mode: 'none',
};
