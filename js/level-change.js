import showScreen from './show-screen';
import genreScreen from './screens/game-screens/genre-screen';
import artistScreen from './screens/game-screens/artist-screen';
import {getLives, gameStat, game} from './data/game-data';
import failTriesScreen from './screens/result-screens/fail-tries-screen';
import successScreen from './screens/result-screens/success-screen';

const changeLevel = (state) => {
  const tempState = Object.assign({}, state);
  const levels = game.levels.slice();

  tempState.lives = getLives(gameStat.answers);

  if (tempState.lives === 0) {
    showScreen(failTriesScreen);
  } else if (tempState.level === 10) {
    showScreen(successScreen(tempState));
  } else {

    tempState.level++;

    switch (levels[tempState.level - 1].type) {
      case `genre`: {
        showScreen(genreScreen(tempState, levels[tempState.level - 1]));
        break;
      }
      case `artist`: {
        showScreen(artistScreen(tempState, levels[tempState.level - 1]));
        break;
      }
    }
  }


};

export {changeLevel};
