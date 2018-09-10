import AbstractView from './abstract-view';
import {initState, getResult} from '../data/game-data';

export default class SuccessView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.userResult = {
      points: state.points,
      lives: state.lives,
      time: state.time,
    };
    this.RESULTS = [1, 4, 13, 5];
  }

  get template() {
    return `<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${Math.floor((initState.time - this.state.time) / 60)} минуты и ${Math.floor((initState.time - this.state.time) % 60)} секунд вы набрали ${this.state.points} баллов, совершив ${initState.lives - this.state.lives} ошибки</p>
    <p class="result__text">${getResult(this.RESULTS, this.userResult)}</p>
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
