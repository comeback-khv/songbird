/* imports */
import 'core-js/stable';
import './index.scss';
import './index.html';
import birdsData from './js/birds.js';

const container = document.querySelector('.container');

let level = 0;

class App {
  main;

  next;

  pickedBirdId;

  hiddenBirdId;

  constructor() {
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
    this.setHiddenBird();
  }

  renderHeader() {
    const html = `<header class='header'>
      <a href='' class='header__link'>
        <img
          src=''
          alt='Songbird лого'
          class='header__logo'
        />
      </a>
    </header>`;
    container.insertAdjacentHTML('beforeend', html);
  }

  renderMain() {
    const html = `<main class="main"></main>`;
    container.insertAdjacentHTML('beforeend', html);
    this.main = document.querySelector('.main');
    this.renderLevels();
    this.renderQuestion(level);
    this.renderOptions(level);
    this.renderAnswer(level);
    this.renderNext();
  }

  renderLevels() {
    const html = `<section class="main__section levels">
          <ul class="levels__list">
            <li class="levels__item">Разминка</li>
            <li class="levels__item">Воробьиные</li>
            <li class="levels__item">Лесные птицы</li>
            <li class="levels__item">Певчие птицы</li>
            <li class="levels__item">Хищные птицы</li>
            <li class="levels__item">Морские птицы</li>
          </ul>
        </section>`;
    this.main.insertAdjacentHTML('beforeend', html);
  }

  renderQuestion(level) {
    const question = document.querySelector('.question');
    if (question) {
      question.remove();
    }
    const html = `<section class='main__section question'>
      <img
        src='./assets/img/hidden-bird.jpg'
        alt='******'
        class='bird-img'
      />
      <h2 class='title question__title'>******</h2>
      <div class='player'>
        <div class='player__btn'></div>
        <div class='player__line'></div>
        <div class='player__time-start'></div>
        <div class='player__time-end'></div>
      </div>
    </section>`;
    this.main.insertAdjacentHTML('beforeend', html);
  }

  renderOptions(level) {
    const options = document.querySelector('.options');
    if (options) {
      options.remove();
    }
    const html = `<section class="main__section options">
          <ul class="options__list">
            <li class="options__item">${birdsData[level][0].name}</li>
            <li class="options__item">${birdsData[level][1].name}</li>
            <li class="options__item">${birdsData[level][2].name}</li>
            <li class="options__item">${birdsData[level][3].name}</li>
            <li class="options__item">${birdsData[level][4].name}</li>
            <li class="options__item">${birdsData[level][5].name}</li>
          </ul>`;
    this.main.insertAdjacentHTML('beforeend', html);
    const optionsItem = document.querySelectorAll('.options__item');
    optionsItem.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.pickedBirdId = index;
        if (this.isGuessed()) {
          this.showQuestion();
        }
      });
      item.addEventListener('click', this.showAnswer.bind(this));
    });
  }

  renderAnswer(level) {
    const answer = document.querySelector('.answer');
    if (answer) {
      answer.remove();
    }
    const html = `<section class='main__section answer'>
      <p class='title answer__text'>Послушайте плеер.Выберите птицу из списка</p>
    </section>`;
    this.main.insertAdjacentHTML('beforeend', html);
  }

  renderNext() {
    const html = `<section class='main__section next'>
      <button class='next__btn'>Next Level</button>
    </section></main>`;
    this.main.insertAdjacentHTML('beforeend', html);
    this.next = document.querySelector('.next__btn');
    this.next.removeEventListener('click', this.changeLevel.bind(this));
  }

  renderFooter() {
    const html = `<footer class='footer'>
            <p class='footer__github'>Comeback__khv</p>
            <p class='footer__year'>2022</p>
            <a href='' class='footer__link'>
              <img src='#' alt='Course logo' class='footer__logo' />
            </a>
          </footer>`;
    container.insertAdjacentHTML('beforeend', html);
  }

  changeLevel() {
    if (this.isGuessed()) {
      level += 1;
      this.renderQuestion(level);
      this.renderOptions(level);
      this.renderAnswer(level);
      this.setHiddenBird();
    }
  }

  showQuestion() {
    const question = document.querySelector('.question');
    question.innerHTML = `<section class='main__section question'>
      <img
        src='${birdsData[level][this.hiddenBirdId].image}'
        alt='${birdsData[level][this.hiddenBirdId].name}'
        class='bird-img'
      />
      <h2 class='title question__title'>${
        birdsData[level][this.hiddenBirdId].name
      }</h2>
      <div class='player'>
        <div class='player__btn'></div>
        <div class='player__line'></div>
        <div class='player__time-start'></div>
        <div class='player__time-end'></div>
      </div>
    </section>`;
  }

  showAnswer() {
    const answer = document.querySelector('.answer');
    answer.innerHTML = `<img
        src='${birdsData[level][this.pickedBirdId].image}'
        alt='Птица'
        class='bird-img'
      />
      <h2 class='title answer__title'>${
        birdsData[level][this.pickedBirdId].name
      }</h2>
      <h3 class='title answer__subtitle'>${
        birdsData[level][this.pickedBirdId].species
      }</h3>
      <div class='player'>
        <div class='player__btn'></div>
        <div class='player__line'></div>
        <div class='player__time-start'></div>
        <div class='player__time-end'></div>
      </div>
      <p class='answer__description'>
      ${birdsData[level][this.pickedBirdId].description}
      </p>`;
    this.next = document.querySelector('.next__btn');
    this.next.addEventListener('click', this.changeLevel.bind(this));
  }

  setHiddenBird() {
    this.hiddenBirdId = Math.round(Math.random() * 5);
  }

  isGuessed() {
    return this.pickedBirdId === this.hiddenBirdId;
  }
}

const app = new App();
