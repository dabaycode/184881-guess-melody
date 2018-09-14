import ServerWorker from './server-worker';

const pauseMusic = (btn) => {
  btn.removeEventListener(`click`, pauseHandler);

  btn.classList.remove(`track__button--pause`);
  btn.classList.add(`track__button--play`);

  btn.parentNode.querySelector(`audio`).pause();

  btn.addEventListener(`click`, playHandler);
};

const pauseHandler = (evt) => {
  const btn = evt.target;
  pauseMusic(btn);
};

const playMusic = (btn) => {
  btn.removeEventListener(`click`, playHandler);

  const form = btn.closest(`.game__tracks`);
  const audio = btn.parentNode.querySelector(`audio`);

  if (form) {
    const buttonPlay = form.querySelector(`.track__button--pause`);
    pauseMusic(buttonPlay);
  }

  btn.classList.remove(`track__button--play`);
  btn.classList.add(`track__button--pause`);

  audio.addEventListener(`error`, ServerWorker.showError);

  audio.play();

  btn.addEventListener(`click`, pauseHandler);
};

const playHandler = (evt) => {
  const btn = evt.target;
  playMusic(btn);
};

export {playHandler, playMusic, pauseMusic, pauseHandler};
