import {getElementFromTemplate} from '../utils';
import {initState, game, getGameLevels, gameStat} from '../data/game-data';
import {changeLevel} from '../level-change';


const screenTemplate = `<section class="welcome">
<div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
<h2 class="welcome__rules-title">Правила игры</h2>
<p class="welcome__text">Правила просты:</p>
<ul class="welcome__rules-list">
  <li>За  ${Math.floor(initState.time / 60)} минут нужно ответить на все вопросы.</li>
  <li>Можно допустить ${initState.lives} ошибки.</li>
</ul>
<p class="welcome__text">Удачи!</p>
</section>`;

const moduleElement = getElementFromTemplate(screenTemplate);

const playBtn = moduleElement.querySelector(`.welcome__button`);


playBtn.addEventListener(`click`, () => {
  const state = Object.assign({}, initState);

  gameStat.clear();
  game.addLevels = getGameLevels();

  changeLevel(state);
});

export default moduleElement;


