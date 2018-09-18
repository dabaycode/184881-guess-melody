import WelcomeView from '../views/welcome-view';
import Application from '../application';

export default class WelcomeScreen {
  constructor(data) {
    this.data = data;
    this.screen = new WelcomeView();
    this.bind();
  }

  get element() {

    return this.screen.element;
  }

  bind() {
    this.screen.playBtnHandler = () => {
      Application.showGame(this.data);
    };
  }
}


