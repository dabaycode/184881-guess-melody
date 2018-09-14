import showScreen from './show-screen';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import SplashScreen from './views/splash-view';
import ServerWorker from './server-worker';
import ErrorView from './views/error-view';
export default class Application {

  static start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    splash.start();
    ServerWorker.loadData().then((gameData) => this.showGame(gameData)).
then(() => splash.stop()).catch(this.showError);
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame(data) {
    this.currentData = data;
    const screen = new GameScreen(new GameModel(data));
    showScreen(screen.element);
  }

  static showResult(screen) {
    screen.replayBtnHandler = () => {
      this.showGame(this.currentData);
    };

    showScreen(screen.element);
  }

  static showError(error) {
    showScreen(new ErrorView(error).element);
  }

}
