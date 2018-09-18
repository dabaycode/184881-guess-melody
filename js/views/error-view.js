import AbstractView from "./abstract-view";

export default class ModalView extends AbstractView {
  constructor(error) {
    super();
    this._error = error;
  }

  get template() {
    return `<section class="modal" id="fdff">
    <h2 class="modal__title">Произошла ошибка!</h2>
    <p class="modal__text">Статус: ${this._error}. Пожалуйста, перезагрузите страницу.</p>
  </section>`;
  }

  bind() {}
}
