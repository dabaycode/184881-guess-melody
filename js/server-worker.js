import ErrorView from './views/error-view';
import showScreen from './show-screen';
import dataAdapter from './data/data-adapter';

const URL = `https://es.dump.academy/guess-melody`;
const APP_ID = `22101985`;

const StatusMap = {
  SUCСESS: 200,
  MULTIPLE_CHOICES: 300,
};

const checkStatus = (response) => {
  if (response.status >= StatusMap.SUCСESS && response.status < StatusMap.MULTIPLE_CHOICES) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class ServerWorker {

  static loadData() {
    return fetch(`${URL}/questions`).
    then(checkStatus).
    then((response) => response.json()).
    then((data) => dataAdapter(data)).
    catch(this.showError);
  }

  static loadResults() {
    return fetch(`${URL}/stats/${APP_ID}`)
      .then(checkStatus)
      .then((response) => response.json()).catch(this.showError);
  }

  static saveResult(data) {
    const request = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}/stats/${APP_ID}`, request)
      .then(checkStatus).catch(this.showError);
  }


  static showError(error) {
    const errorView = new ErrorView(error);
    showScreen(errorView.element);
  }
}


