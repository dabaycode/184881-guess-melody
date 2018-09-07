import {game, getGameLevels, gameStat} from '../data/game-data';
import {changeLevel} from '../level-change';
import {initState} from '../data/game-data';
import WelcomeView from '../views/welcome-view';

export default () => {
  const screen = new WelcomeView();

  screen.playBtnHandler = () => {
    const state = Object.assign({}, initState);

    gameStat.clear();
    game.addLevels = getGameLevels();

    changeLevel(state);
  };

  return screen.element;
};


