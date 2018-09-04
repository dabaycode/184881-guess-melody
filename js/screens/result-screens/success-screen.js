import {getElementFromTemplate} from '../../utils';
import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';
import {gameStat, initState, getResult} from '../../data/game-data';


const successScreenTemplate = (state) => {
  const RESULTS = [1, 4, 13, 5];

  const userResult = {points: gameStat.points, lives: state.lives, time: state.time};

  const elem = getElementFromTemplate(`<section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Вы настоящий меломан!</h2>
    <p class="result__total">За ${Math.floor((initState.time - state.time) / 60)} минуты и ${Math.floor((initState.time - state.time) % 60)} секунд вы набрали ${gameStat.points} баллов, совершив ${initState.lives - state.lives} ошибки</p>
    <p class="result__text">${getResult(RESULTS, userResult)}</p>
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  </section>`);

  const replayBtn = elem.querySelector(`.result__replay`);

  replayBtn.addEventListener(`click`, () => showScreen(welcomeScreen()));

  return elem;
};


export default successScreenTemplate;
