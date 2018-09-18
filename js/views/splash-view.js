import AbstractView from './abstract-view';

export default class SplashView extends AbstractView {
  constructor() {
    super();
    this._cursor = 0;
    this._symbolsSeq = [``, `.`, `..`, `...`];
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this._cursor = ++this._cursor >= this._symbolsSeq.length ? 0 : this._cursor;
    this.element.innerHTML = `<p style='color: black;'>Загрузка${this._symbolsSeq[this._cursor]}</p>`;
    this.timeout = setTimeout(() => this.start(), 300);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
