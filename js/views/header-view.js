import AbstractView from '../views/abstract-view';
import ConfirmView from './confirm-view';
import {Circle, initState} from '../data/game-data';
import {getRadius} from '../get-radius';
import {getSec} from '../utils';


export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `<header class="game__header">
    <a class="game__back" href="#">
      <span class="visually-hidden">Сыграть ещё раз</span>
      <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
    </a>
    
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle class="timer__line" cx="390" cy="390" r="370"
              style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center; stroke-dasharray: ${Circle.length};stroke-dashoffset: ${getRadius(this._state.time / initState.time, Circle.radius).offset};"/>
    </svg>
    
    <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml" ${this._state.time <= 30 ? `style="color: red; animation: blink 1000ms steps(1, end) infinite;"` : ``}>
      <span class="timer__mins">${Math.floor(this._state.time / 60)}</span>
      <span class="timer__dots">:</span>
      <span class="timer__secs">${getSec(this._state)}</span>
    </div>
    
    <div class="game__mistakes">
    
    ${(`<div class="wrong"></div>`).repeat(this._state.lives)}
    
    </div>
    </header>`;
  }

  bind() {
    this.element.querySelector(`.game__back`).addEventListener(`click`, () => {
      const modal = new ConfirmView();
      document.body.appendChild(modal.element);
    });
  }
}


