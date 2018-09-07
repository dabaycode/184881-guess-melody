import showScreen from './show-screen';
import genreScreen from './screens/game-screens/genre-screen';
import artistScreen from './screens/game-screens/artist-screen';
import {getLives, gameStat, game} from './data/game-data';
import failScreen from './screens/result-screens/fail-screen';
import successScreen from './screens/result-screens/success-screen';

const changeLevel = (state) => {
  const tempState = Object.assign({}, state);
  const levels = game.levels.slice();

  tempState.lives = getLives(gameStat.answers);

  if (tempState.lives === 0 || tempState.time === 0) {
    showScreen(failScreen(tempState));
  } else if (tempState.level === 10) {
    showScreen(successScreen(tempState));
  } else {
    const nextLevel = levels[tempState.level];

    tempState.level++;

    switch (nextLevel.type) {
      case `genre`: {
        showScreen(genreScreen(tempState, nextLevel));
        break;
      }
      case `artist`: {
        showScreen(artistScreen(tempState, nextLevel));
        break;
      }
    }
  }

};

export {changeLevel};
