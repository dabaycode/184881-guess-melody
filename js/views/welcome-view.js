import AbstractView from '../views/abstract-view';
import {initState} from '../data/game-data';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="welcome">
    <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">Правила просты:</p>
    <ul class="welcome__rules-list">
      <li>За  ${Math.floor(initState.time / 60)} минут нужно ответить на все вопросы.</li>
      <li>Можно допустить ${initState.lives} ошибки.</li>
    </ul>
    <p class="welcome__text">Удачи!</p>
    </section>`;
  }

  playBtnHandler() {}

  bind() {
    const playBtn = this.element.querySelector(`.welcome__button`);

    playBtn.addEventListener(`click`, () => {
      this.playBtnHandler();
    });

  }
}


