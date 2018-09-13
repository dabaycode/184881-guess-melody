import AbstractView from './abstract-view';

export default class SplashView extends AbstractView {
  constructor() {
    super();
    this.cursor = 0;
    this.symbolsSeq = [``, `.`, `..`, `...`];
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
    this.element.innerHTML = `<p style='color: black;'>Загрузка${this.symbolsSeq[this.cursor]}</p>`;
    this.timeout = setTimeout(() => this.start(), 300);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}
