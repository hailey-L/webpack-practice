//import 'normalize.css';
import styles from './index.module.scss';
import $ from 'jquery';
import gpImg from './images/gp.jpg';
import prrImg from './images/prr.svg';

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Webpack이예요';

  //file-loader
  const imgElement = document.createElement('img');
  imgElement.src = prrImg; //gpImg;
  imgElement.classList = styles.prrImg;
  console.log(gpImg);

  console.log(styles);

  element.appendChild(imgElement);
  element.classList = styles.helloWebpack;

  return element;
}

document.body.appendChild(component());

//클래스이름을 사용해서 돔의 갯수가 몇개 인지 체크하는 코드 추가
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION MODE: ${IS_PRODUCTION}`);
