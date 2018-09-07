import {getElementFromTemplate} from '../utils';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`AbstractView can not be used independently`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}

}
