'use strict';

const mainElement = document.querySelector(`.main`);

const screenList = [
  `welcome`,
  `game-artist`,
  `game-genre`,
  `result-success`,
  `fail-time`,
  `fail-tries`
];

const screenItems = [];

screenList.forEach((it) => {
  screenItems.push(document.querySelector(`#${it}`));
});

const screens = screenItems.map((it) => it.content);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

select(0);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.key) {
    case `ArrowRight`:
      select(current + 1);
      break;
    case `ArrowLeft`:
      select(current - 1);
      break;
  }
});

const app = document.querySelector(`.app`);
const html = `<div class="arrows__wrap">
<style>
  .arrows__wrap {
    position: absolute;
    top: 135px;
    left: 50%;
    margin-left: -56px;
  }
  .arrows__btn {
    background: none;
    border: 2px solid white;
    color: white;
    padding: 5px 20px;
  }
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

app.insertAdjacentHTML(`beforeEnd`, html);

const arrows = document.querySelectorAll(`.arrows__wrap .arrows__btn`);

arrows[0].addEventListener(`click`, () => select(current - 1));
arrows[1].addEventListener(`click`, () => select(current + 1));
