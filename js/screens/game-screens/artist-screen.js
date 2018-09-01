import {getElementFromTemplate} from '../../utils';
import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';
import header from './header';
import {playMusic} from '../../player';
import {gameStat} from '../../data/game-data';
import {changeLevel} from '../../level-change';

const getArtists = (level) => {

  const answers = [];
  let id = 1;
  for (let it of level.question.answers) {
    answers.push(`
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="answer" value="${it.artist}" id="answer-${id}">
      <label class="artist__name" for="answer-${id}">
        <img class="artist__picture" src="${it.image}" alt="${it.artist}">
        ${it.artist}
      </label>
    </div>
    `);
    id++;
  }

  return answers;

};

const artistScreenTemplate = (state, level) => {
  const elem = getElementFromTemplate(`
  <section class="game game--artist">
  ${header(state)}
  <section class="game__screen">

  <h2 class="game__title">${level.question.title}</h2>

  <div class="game__track">
    <button class="track__button track__button--play" type="button"></button>
    <audio src="${level.question.src}"></audio>
  </div>

  <form class="game__artist">

  ${getArtists(level).join(``)}

  </form>
  </section>
  </section>`);


  const play = (btn, audio) => {
    playMusic(btn, audio);

    btn.removeEventListener(`click`, play);
  };

  const track = elem.querySelector(`.game__track`);

  const btn = track.querySelector(`.track__button`);
  const audio = track.querySelector(`audio`);

  btn.addEventListener(`click`, () => play(btn, audio));

  const backBtn = elem.querySelector(`.game__back`);
  backBtn.addEventListener(`click`, () => showScreen(welcomeScreen));

  const getKey = () => {

    for (let it of level.question.answers) {
      if (it.isRight) {
        return it.artist;
      }
    }

    return false;
  };

  const inputItems = elem.querySelectorAll(`.artist__input`);

  inputItems.forEach((it) => {
    it.addEventListener(`change`, (evt) => {
      const answer = evt.target.value;

      if (answer === getKey()) {
        gameStat.addAnswer = {isRight: true, time: 30};
      } else {
        gameStat.addAnswer = {isRight: false, time: 30};
      }

      changeLevel(state);
    });

  });


  return elem;

};

export default artistScreenTemplate;
