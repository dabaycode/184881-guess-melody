'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const mainElement = document.querySelector(`.main`);

const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`)).
  map((it) => it.content);

const genreScreen = screens[1];
screens[1] = screens[2];
screens[2] = genreScreen;

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
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
    border: 2px solid black;
    padding: 5px 20px;
  }
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
</div>`;

app.insertAdjacentHTML(`beforeEnd`, html);

const arrowsWrap = document.querySelector(`.arrows__wrap`);
const arrows = arrowsWrap.querySelectorAll(`.arrows__btn`);

arrows.forEach((it) => {
  it.style = `color: white; border-color: white;`;
});

arrowsWrap.addEventListener(`click`, (evt) => {
  switch (evt.target.innerText) {
    case (`<-`):
      select(current - 1);
      break;
    case (`->`):
      select(current + 1);
      break;
  }
});

select(0);
