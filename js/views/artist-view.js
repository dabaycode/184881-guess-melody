import AbstractView from '../views/abstract-view';
import {playHandler} from '../player';
import HeaderView from '../views/header-view';

export default class ArtistView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {

    return `
    <section class="game game--artist">
    ${new HeaderView(this.state).template}
    <section class="game__screen">
  
    <h2 class="game__title">${this.level.question.title}</h2>
  
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio src="${this.level.question.src}"></audio>
    </div>
  
    <form class="game__artist">
  
    ${this.level.question.answers.map((it, i) => `<div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.artist}" id="answer-${i}">
    <label class="artist__name" for="answer-${i}">
      <img class="artist__picture" src="${it.image}" alt="${it.artist}">
      ${it.artist}
    </label>
  </div>`).join(``)}
  
    </form>
    </section>
    </section>`;
  }

  submitBtnHandler() {}

  backBtnHandler() {}

  bind() {
    const track = this.element.querySelector(`.game__track`);
    const btn = track.querySelector(`.track__button`);

    const inputItems = this.element.querySelectorAll(`.artist__input`);

    inputItems.forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        const answer = [evt.target.value];

        this.submitBtnHandler(answer);
      });
    });

    btn.addEventListener(`click`, playHandler);

    this.element.querySelector(`.game__back`).addEventListener(`click`, () => {
      this.backBtnHandler();
    });
  }
}
