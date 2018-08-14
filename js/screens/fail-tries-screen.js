import {getElementFromTemplate} from '../utils.js';
import showScreen from '../show-screen.js';
import welcomeScreen from './welcome-screen.js';

const moduleElement = getElementFromTemplate(`<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
<h2 class="result__title">Какая жалость!</h2>
<p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
<button class="result__replay" type="button">Попробовать ещё раз</button>
</section>`);

const replayBtn = moduleElement.querySelector(`.result__replay`);

replayBtn.addEventListener(`click`, () => showScreen(welcomeScreen));

export default moduleElement;
