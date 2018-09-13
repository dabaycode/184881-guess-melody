import showScreen from './show-screen';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import SplashScreen from './views/splash-view';
import ErrorView from './views/error-view';
import dataAdapter from './data/data-adapter';


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Application {

  static start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => dataAdapter(data)).
      then((gameData) => Application.showGame(gameData)).
      catch(Application.showError).
      then(() => splash.stop());
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame(data) {
    const screen = new GameScreen(new GameModel(data));
    showScreen(screen.element);
  }

  static showResult(screen) {
    screen.replayBtnHandler = () => {
      this.start();
    };

    showScreen(screen.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    showScreen(errorView.element);
  }


}
