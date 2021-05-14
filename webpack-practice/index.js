import 'normalize.css';
import styles from './index.css';
import $ from 'jquery';

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Webpack이예요';

  console.log(styles);

  element.classList = styles.helloWebpack;

  return element;
}

document.body.appendChild(component());

//클래스이름을 사용해서 돔의 갯수가 몇개 인지 체크하는 코드 추가
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION MODE: ${IS_PRODUCTION}`);
