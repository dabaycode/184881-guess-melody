import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';
import SuccessView from '../../views/success-view';


const successScreen = (state) => {
  const screen = new SuccessView(state);

  screen.replayBtnHandler = () => {
    showScreen(welcomeScreen());
  };

  return screen.element;
};

export default successScreen;
