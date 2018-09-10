import showScreen from './show-screen';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame() {
    const screen = new GameScreen(new GameModel());
    showScreen(screen.element);
  }

  static showResult(screen) {
    screen.replayBtnHandler = () => {
      this.showWelcome();
    };

    showScreen(screen.element);
  }

}
