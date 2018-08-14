const mainElement = document.querySelector(`.main`);

const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export default showScreen;
