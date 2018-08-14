const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getElementFromTemplate = (template) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;
  return elem;
};

export {getRandomElement, getElementFromTemplate};
