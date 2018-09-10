import AbstractView from '../views/abstract-view';
import {CIRCLE, initState} from '../data/game-data';
import {getRadius} from '../get-radius';
import {getSec} from '../utils';


export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="game__header">
    <a class="game__back" href="#">
      <span class="visually-hidden">Сыграть ещё раз</span>
      <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
    </a>A
    
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle class="timer__line" cx="390" cy="390" r="370"
              style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center; stroke-dasharray: ${CIRCLE.length};stroke-dashoffset: ${getRadius(this.state.time / initState.time, CIRCLE.radius).offset};"/>
    </svg>
    
    <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer__mins">${Math.floor(this.state.time / 60)}</span>
      <span class="timer__dots">:</span>
      <span class="timer__secs">${getSec(this.state)}</span>
    </div>
    
    <div class="game__mistakes">
    
    ${(`<div class="wrong"></div>`).repeat(this.state.lives)}
    
    </div>
    </header>`;
  }

  // backBtnHandler() {}

  // bind() {
  //   this.element.querySelector(`.game__back`).addEventListener(`click`, () => {
  //     this.backBtnHandler();
  //   });
  // }
}


