import AbstractView from '../views/abstract-view';
import {playerWorker, stopMusic} from '../player';
import HeaderView from '../views/header-view';
import ServerWorker from '../server-worker';

const DEBUG = new URLSearchParams(location.search).has(`debug`);
const DEBUG_STYLE = `style="outline: 2px solid #FF9749; outline-offset: 2px; box-sizing: border-box;"`;

export default class ArtistView extends AbstractView {
  constructor(state, level) {
    super();
    this._state = state;
    this._level = level;
  }

  get template() {

    return `
    <section class="game game--artist">
    ${new HeaderView(this._state).template}
    <section class="game__screen">
  
    <h2 class="game__title">${this._level.question.title}</h2>
  
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio src="${this._level.question.src}" preload="auto"></audio>
    </div>
  
    <form class="game__artist">
  
    ${this._level.question.answers.map((it, i) => `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.artist}" id="answer-${i}">
    <label class="artist__name" for="answer-${i}">
      <img class="artist__picture" src="${it.image}" alt="${it.artist}" ${DEBUG && it.isRight ? DEBUG_STYLE : ``}>
      ${it.artist}
    </label>
  </div>`).join(``)}
  
    </form>
    </section>
    </section>`;
  }

  submitBtnHandler() {}

  bind() {
    const track = this.element.querySelector(`.game__track`);
    const btn = track.querySelector(`.track__button`);
    const inputItems = this.element.querySelectorAll(`.artist__input`);

    const audioElements = this.element.querySelectorAll(`audio`);
    audioElements[0].setAttribute(`autoplay`, true);

    btn.classList.replace(`track__button--play`, `track__button--pause`);

    const playerHandler = (evt) => {
      const btnClicked = evt.target;

      playerWorker(btnClicked);
    };

    btn.addEventListener(`click`, playerHandler);

    inputItems.forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        stopMusic(audioElements);
        const answer = [evt.target.value];
        this.submitBtnHandler(answer);
      });
    });

  }
}
