import AbstractView from "./abstract-view";
import Application from "../application";

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {

    return `<section class="modal">
    <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__buttons">
      <button id="ok" class="modal__button button">Ок</button>
      <button class="modal__button button">Отмена</button>
    </div>
  </section>`;
  }

  bind() {
    const buttons = Array.from(this._element.querySelectorAll(`.modal__button, .modal__close`));

    buttons.forEach((btn)=>{
      btn.addEventListener(`click`, (evt)=>{
        if (evt.target.id === `ok`) {
          Application.showWelcome();
        }
        document.body.removeChild(this._element);
      });
    });

  }
}
