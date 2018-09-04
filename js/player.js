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

const playHandler = (evt) => {

  const btn = evt.target;
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

  btn.removeEventListener(`click`, playHandler);

  btn.classList.remove(`track__button--play`);
  btn.classList.add(`track__button--pause`);

  btn.parentNode.querySelector(`audio`).play();

  btn.addEventListener(`click`, pauseHandler);
};

export {playHandler};
