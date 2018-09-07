import {gameStat} from '../../data/game-data';
import {changeLevel} from '../../level-change';
import ArtistView from '../../views/artist-view';
import HeaderView from '../../views/header-view';
import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';

const artistScreen = (state, level) => {

  const screen = new ArtistView(state, level);

  const header = new HeaderView(state);

  header.backBtnHandler = () => {
    showScreen(welcomeScreen());
  };

  screen.element.insertBefore(header.element, screen.element.querySelector(`.game__screen`));

  const getKey = () => {

    for (let it of level.question.answers) {
      if (it.isRight) {
        return it.artist;
      }
    }

    return false;
  };

  screen.changeInputHandler = (evt) => {
    const answer = evt.target.value;

    gameStat.addAnswer = {isRight: (answer === getKey()), time: 30};

    changeLevel(state);
  };

  return screen.element;
};

export default artistScreen;
