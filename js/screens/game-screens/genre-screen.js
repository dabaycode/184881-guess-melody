import {getElementFromTemplate} from '../../utils';
import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';
import header from './header';
import {playMusic} from '../../player';
import {gameStat} from '../../data/game-data';
import {changeLevel} from '../../level-change';

const getTracks = (level) => {

  const answers = [];
  let id = 1;
  for (let it of level.question.answers) {
    answers.push(`
    <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio src="${it.src}"></audio>
    </div>
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="answer" value="${it.genre}" id="answer-${id}}">
      <label class="game__check" for="answer-${id}}">Отметить</label>
    </div>
  </div>
    `);
    id++;
  }

  return answers;

};

const genreScreenTemplate = (state, level) => {
  const elem = getElementFromTemplate(`
  <section class="game game--genre">
  ${header(state)}
  <section class="game__screen">

  <h2 class="game__title">${level.question.title}</h2>

  <form class="game__tracks">
  
  ${getTracks(level).join(``)}

    <button class="game__submit button" type="submit">Ответить</button>
  </form>
</section>
</section>`);

  const backBtn = elem.querySelector(`.game__back`);
  backBtn.addEventListener(`click`, () => showScreen(welcomeScreen));

  const submitBtn = elem.querySelector(`.game__submit`);
  submitBtn.disabled = `true`;

  const checkInputItems = elem.querySelectorAll(`.game__input`);
  checkInputItems.forEach((it) => {
    it.addEventListener(`click`, () => {
      if (Array.from(checkInputItems).some((item) => item.checked)) {
        submitBtn.disabled = `false`;
        submitBtn.removeAttribute(`disabled`);
      } else {
        submitBtn.disabled = `true`;
      }
    });
  });

  const tracks = elem.querySelectorAll(`.track`);

  const play = (btn, audio) => {
    playMusic(btn, audio);

    btn.removeEventListener(`click`, play);
  };

  for (let it of tracks) {
    let btn = it.querySelector(`.track__button`);
    let audio = it.querySelector(`.track__status audio`);

    btn.addEventListener(`click`, () => play(btn, audio));
  }

  const getKeys = (currentLevel) => {
    const keys = [];

    for (let it of currentLevel.question.answers) {
      keys.push(it.isRight);
    }

    return keys;
  };


  const getAnswers = (checks) => {
    const userAnswers = [];

    for (let it of checks) {
      userAnswers.push(it.checked);
    }

    return userAnswers;
  };

  const isAnswersCorrect = (keys, answers) => {
    if (answers.toString() === keys.toString()) {
      return true;
    }
    return false;
  };

  submitBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const checkItems = elem.querySelectorAll(`.game__input`);

    if (isAnswersCorrect(getKeys(level), getAnswers(checkItems))) {
      gameStat.addAnswer = {isRight: true, time: 30};
    } else {
      gameStat.addAnswer = {isRight: false, time: 30};
    }

    changeLevel(state);
  });

  return elem;
};

export default genreScreenTemplate;
