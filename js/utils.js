const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getElementFromTemplate = (str) => new DOMParser().parseFromString(str, `text/html`).body.firstChild;

export {getRandomElement, getElementFromTemplate};
