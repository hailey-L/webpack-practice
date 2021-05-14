const { merge } = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

const config = {
  plugins: [
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
  mode: 'production',
};

module.exports = merge(common, config);
