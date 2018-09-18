const Time = {
  ONE_MIN: 60,
  TWO_DIGIT_NUMBER: 10,
};


const getElementFromTemplate = (str) => new DOMParser().parseFromString(str, `text/html`).body.firstChild;

const getSec = (state) => {
  return (state.time % Time.ONE_MIN + ``).padStart(2, `0`);
};

export {getElementFromTemplate, getSec};
