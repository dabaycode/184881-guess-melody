import AbstractView from './abstract-view';
import {initState, getResult} from '../data/game-data';

export default class SuccessView extends AbstractView {
  constructor(state, userResult, totalResults) {
    super();
    this._state = state;
    this._userResult = userResult;
    this._totalResults = totalResults;
  }

  get template() {
    return `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${Math.floor((initState.time - this._state.time) / 60)} минуты и ${Math.floor((initState.time - this._state.time) % 60)} секунд вы набрали ${this.state.points} баллов, совершив ${initState.lives - this._state.lives} ошибки</p>
    <p class="result__text">${getResult(this._totalResults, this._userResult)}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>`;
  }

  replayBtnHandler() {}

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, () => {
      this.replayBtnHandler();
    });
  }
}
