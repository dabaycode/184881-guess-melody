const playMusic = (btn) => {
  btn.classList.replace(`track__button--play`, `track__button--pause`);

  const audio = btn.parentNode.querySelector(`audio`);
  audio.play().catch(() => {});
};

const pauseMusic = (btn) => {
  btn.classList.replace(`track__button--pause`, `track__button--play`);


  btn.parentNode.querySelector(`audio`).pause();
};

const stopMusic = (audioElements) => {
  Array.from(audioElements).forEach((audio) => audio.pause());
};

const playerWorker = (btn) => {
  if (btn.classList.contains(`track__button--play`)) {

    const form = btn.closest(`.game__tracks`);

    if (form) {
      const playingButton = form.querySelector(`.track__button--pause`);

      if (playingButton) {
        pauseMusic(playingButton);
      }
    }

    playMusic(btn);

  } else if (btn.classList.contains(`track__button--pause`)) {
    pauseMusic(btn);
  }
};

export {playerWorker, stopMusic};
