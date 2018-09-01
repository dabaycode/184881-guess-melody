const pauseMusic = (btn, audioItem) => {
  audioItem.pause();

  btn.classList.add(`track__button--play`);
  btn.classList.remove(`track__button--pause`);

  btn.removeEventListener(`click`, pauseMusic);
  btn.addEventListener(`click`, () => playMusic(btn, audioItem));
};

const playMusic = (btn, audioItem) => {

  audioItem.play();

  btn.classList.remove(`track__button--play`);
  btn.classList.add(`track__button--pause`);


  btn.addEventListener(`click`, () => pauseMusic(btn, audioItem));
};

export {playMusic};
