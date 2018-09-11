import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import showScreen from '../show-screen';
import HeaderView from '../views/header-view';
import FailView from '../views/fail-view';
import SuccessView from '../views/success-view';
import Application from '../application';

const ScreenMap = {
  genre: GenreView,
  artist: ArtistView,
};

class GameScreen {
  constructor(model) {
    this.model = model;
    this.SEC = 1000;
    this.screen = new ScreenMap[this.model.currentLevel.type](this.model.state, this.model.currentLevel);
    this.bind();
  }

  get element() {
    this.startTimer();
    return this.screen.element;
  }

  goToNextLevel() {
    this.model.plusLevel();
    showScreen(new GameScreen(this.model).element);
  }

  updateHeader() {
    const headerElem = new HeaderView(this.model.state).element;
    this.screen.element.replaceChild(headerElem, this.screen.element.firstElementChild);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.model.tick();
      this.updateHeader();
      if (this.model.fail()) {
        Application.showResult(new FailView(this.model.state));
      }
      this.startTimer();
    }, this.SEC);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  bind() {
    this.screen.submitBtnHandler = (answer) => {
      this.stopTimer();

      this.model.addAnswer(answer);

      if (this.model.fail()) {
        Application.showResult(new FailView(this.model.state));
      } else if (this.model.success()) {
        Application.showResult(new SuccessView(this.model.state));
      } else {
        this.goToNextLevel();
      }
      this.updateHeader();
    };

  }
}

export default GameScreen;
