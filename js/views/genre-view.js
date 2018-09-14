import AbstractView from '../views/abstract-view';
import {playHandler, pauseHandler, pauseMusic} from '../player';
import HeaderView from '../views/header-view';
import ServerWorker from '../server-worker';

const DEBUG = new URLSearchParams(location.search).has(`debug`);
const DEBUG_STYLE = `style="outline: 2px solid #FF9749; outline-offset: 2px; box-sizing: border-box;"`;

export default class GenreView extends AbstractView {
  constructor(state, level) {
    super();
    this._state = state;
    this._level = level;
  }

  get template() {

    return `
    <section class="game game--genre">
    ${new HeaderView(this._state).template}
    <section class="game__screen">
  
    <h2 class="game__title">${this._level.question.title}</h2>
  
    <form class="game__tracks">

    ${this._level.question.answers.map((it, i) => `<div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio src="${it.src}" preload="auto"></audio>
    </div>

    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${i}">
      <label class="game__check" ${DEBUG && it.isRight ? DEBUG_STYLE : ``} for="answer-${i}">Отметить</label>
    </div>
  </div>`).join(``)}
  
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
  </section>`;
  }

  submitBtnHandler() {}

  bind() {
    const tracks = this.element.querySelectorAll(`.track`);

    const firtsBtn = this.element.querySelector(`.track__button`);

    firtsBtn.classList.replace(`track__button--play`, `track__button--pause`);

    const firstAudio = this.element.querySelector(`audio`);
    firstAudio.setAttribute(`autoplay`, true);
    firstAudio.addEventListener(`error`, ServerWorker.showError);

    for (let it of tracks) {
      let btn = it.querySelector(`.track__button`);
      if (!btn.classList.contains(`track__button--pause`)) {
        btn.addEventListener(`click`, playHandler);
      } else {
        btn.addEventListener(`click`, pauseHandler);
      }
    }

    const checkInputItems = Array.from(this.element.querySelectorAll(`.game__input`));
    const submitBtn = this.element.querySelector(`.game__submit`);

    submitBtn.disabled = `true`;
    submitBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      for (let it of tracks) {
        let btn = it.querySelector(`.track__button`);
        pauseMusic(btn);
      }

      const checkedAnswer = checkInputItems.filter((it) => it.checked).map((element) => element.value);
      this.submitBtnHandler(checkedAnswer);
    });

    checkInputItems.forEach((it) => {
      it.addEventListener(`click`, () => {
        if (Array.from(checkInputItems).some((item) => item.checked)) {
          submitBtn.disabled = `false`;
          submitBtn.removeAttribute(`disabled`);
        } else {
          submitBtn.disabled = `true`;
        }
      });
    });
  }
}
