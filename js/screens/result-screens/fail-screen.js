import showScreen from '../../show-screen';
import welcomeScreen from '../welcome-screen';
import FailView from '../../views/fail-view';


const failScreen = (state) => {
  const screen = new FailView(state);

  screen.replayBtnHandler = () => {
    showScreen(welcomeScreen());
  };

  return screen.element;
};

export default failScreen;
