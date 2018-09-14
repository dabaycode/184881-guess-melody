import AbstractView from './abstract-view';
import {getResult} from '../data/game-data';

export default class FailView extends AbstractView {
  constructor(state, userResult) {
    super();
    this._state = state;
    this._userResult = userResult;

    this.title = this._state.lives === 0 ? `Какая жалость!` : `Увы и ах!`;
  }

  get template() {
    return `
<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">${this.title}</h2>
<p class="result__total result__total--fail">${getResult(this._userResult)}</p>
<button class="result__replay" type="button">Сыграть ещё раз</button>
</section>
`;
  }

  replayBtnHandler() {}

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, () => {
      this.replayBtnHandler();
    });
  }
}
