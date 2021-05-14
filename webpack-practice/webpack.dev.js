const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// 공통적으로 사용하는 설정 내용 가져와야 해서 common을 불러옴

const config = {
  mode: 'development',
};
// dev - 개발환경을 위한 설정들을 진행할 예정이라 모드값만 development적용

module.exports = merge(common, config);
// merge를 통해서 dev에 환경설정 파일을 병합한 상태
