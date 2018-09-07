import AbstractView from '../views/abstract-view';
import {playHandler} from '../player';

export default class GenreView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {

    return `
    <section class="game game--genre">

    <section class="game__screen">
  
    <h2 class="game__title">${this.level.question.title}</h2>
  
    <form class="game__tracks">

    ${this.level.question.answers.map((it, i) => `<div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio src="${it.src}"></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${i}}">
      <label class="game__check" for="answer-${i}}">Отметить</label>
    </div>
  </div>`).join(``)}
  
      <button class="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
  </section>`;
  }

  submitBtnHandler() {}

  bind() {

    const submitBtn = this.element.querySelector(`.game__submit`);
    const checkInputItems = this.element.querySelectorAll(`.game__input`);

    submitBtn.disabled = `true`;

    submitBtn.addEventListener(`click`, (evt) => {
      this.submitBtnHandler(evt, checkInputItems);
    }
    );

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

    const tracks = this.element.querySelectorAll(`.track`);

    for (let it of tracks) {
      let btn = it.querySelector(`.track__button`);
      btn.addEventListener(`click`, playHandler);
    }
  }
}
