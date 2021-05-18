const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// 공통적으로 사용하는 설정 내용 가져와야 해서 common을 불러옴

const config = {
  mode: 'development',
  devServer: {
    // open : 최초로 웹팩과 관련된 스크립트를 실행했을 때 기본 브라우저가 자동으로 함께 실행됨
    open: true,

    // 에러 메세지가 발생했을 때 브라우저 화면에 나타나게 함
    overlay: true,

    /*history api fallback :데브서버 키 안에서 사용할 수 있음 - 라우팅 관련, 제공하지 않는 라우팅으로 이동하면 예외 처리를 하거나 특정 라우팅은 그에 맞게 특정 html로 이동하게끔 제공
      history api fallback: trun - 라우팅 지원하지 않는 곳으로 이동시 루트화면을 보여줌 
      history api fallback:false - 라우팅 지원하지 않는 곳으로 이동시 404에러 */
    historyApiFallback: {
      rewrites: [
        // 정규표현식을 통해 라우팅에 대한 모습을 지정 , to: '라우팅 따라서 어디로 이동시킬지 지점 명시'
        { from: /^\/subpage$/, to: 'subpage.html' },
        { from: /./, to: '404.html' },
      ],
    },

    // port : 자동으로 설정되어 있는 포트값을 임의의 포트값으로 수정해 줄 수 있게 해줌
    // port: 3333, //작업환경에 맞는 걸로 충돌 안나게 임의의 숫자 고려해서 작성할 것
  },
};
// dev - 개발환경을 위한 설정들을 진행할 예정이라 모드값만 development적용

module.exports = merge(common, config);
// merge를 통해서 dev에 환경설정 파일을 병합한 상태
