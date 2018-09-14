import showScreen from './show-screen';
import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import SplashScreen from './views/splash-view';
import ServerWorker from './server-worker';
export default class Application {

  static start() {
    const splash = new SplashScreen();
    showScreen(splash.element);
    splash.start();
    ServerWorker.loadData().then((gameData) => this.showWelcome(gameData)).
then(() => splash.stop()).catch(ServerWorker.showError);
  }

  static showWelcome(data = this._currentData) {

    if (data === undefined) {
      ServerWorker.showError();
      return;
    }

    this._currentData = data;

    const welcome = new WelcomeScreen(this._currentData);
    showScreen(welcome.element);
  }

  static showGame(data) {

    const screen = new GameScreen(new GameModel(data));
    showScreen(screen.element);
  }

  static showResult(screen) {
    screen.replayBtnHandler = () => {
      this.showGame(this._currentData);
    };

    showScreen(screen.element);
  }

}
