const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getElementFromTemplate = (str) => new DOMParser().parseFromString(str, `text/html`).body.firstChild;

const getSec = (state) => {
  if (state.time % 60 < 10) {
    return `0` + Math.floor(state.time % 60);
  } else {
    return Math.floor(state.time % 60);
  }
};

export {getRandomElement, getElementFromTemplate, getSec};
