import HeaderView from '../../views/header-view';
import GenreView from '../../views/genre-view';
import {gameStat} from '../../data/game-data';
import {changeLevel} from '../../level-change';
import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';

const genreScreen = (state, level) => {
  const screen = new GenreView(state, level);

  const header = new HeaderView(state);

  header.backBtnHandler = () => {
    showScreen(welcomeScreen());
  };

  screen.element.insertBefore(header.element, screen.element.querySelector(`.game__screen`));

  const getKeys = (currentLevel) => currentLevel.question.answers.map((it) => it.isRight);

  const getAnswers = (checks) => Array.from(checks).map((it) => it.checked);

  const isAnswersCorrect = (keys, answers) => {
    return (answers.toString() === keys.toString());
  };

  screen.submitBtnHandler = (evt, checkItems) => {
    evt.preventDefault();

    gameStat.addAnswer = {isRight: isAnswersCorrect(getKeys(level), getAnswers(checkItems)), time: 30};

    changeLevel(state);
  };

  return screen.element;
};

export default genreScreen;
