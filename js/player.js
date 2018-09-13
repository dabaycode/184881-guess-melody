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

  if (form) {
    const trackItems = form.querySelectorAll(`audio`);
    for (let it of trackItems) {
      if (it.paused === false) {
        const itBtn = it.parentNode.parentNode.querySelector(`.track__button`);
        pauseMusic(itBtn);
      }
    }
  }

  btn.classList.remove(`track__button--play`);
  btn.classList.add(`track__button--pause`);

  const audio = btn.parentNode.querySelector(`audio`);

  audio.load();
  audio.addEventListener(`canplaythrough`, () => audio.play());

  btn.removeEventListener(`click`, playHandler);
  btn.addEventListener(`click`, pauseHandler);
};

const playHandler = (evt) => {
  const btn = evt.target;
  playMusic(btn);
};

export {playHandler, playMusic, pauseMusic};
