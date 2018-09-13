import {initState, getPoints, getLives, getGameLevels, INIT_PARAMS} from './game-data';

class GameModel {
  constructor(data) {
    this._data = data;
    this.restart();
  }

  get state() {
    return this._state;
  }

  get points() {
    return this._state.points;
  }

  get answers() {
    return this._state.answers;
  }

  get levels() {
    return this._state.levels;
  }

  get currentLevel() {
    return this._state.levels[this._state.level];
  }

  plusLevel() {
    this._state.level++;
  }

  addAnswer(answer) {
    const getKeys = (levelType) => this.currentLevel.question.answers.filter((it) => it.isRight).map((el) => el[levelType]);

    const isAnswerRight = (keys, answers) => {
      if (keys.toString() === answers.toString()) {
        return true;
      }
      return false;
    };

    this._state.answers.push({isRight: isAnswerRight(getKeys(this.currentLevel.type), answer), time: initState.time - this._state.time});
    this._state.lives = getLives(this._state.answers);
    this._state.points = getPoints(this._state.answers, this._state.lives);
  }

  restart() {
    this._state = Object.assign({}, initState, {levels: getGameLevels(this._data)});
    this._state.answers = [];
  }

  fail() {
    return this._state.lives === 0 || this._state.time === 0;
  }

  success() {
    return this._state.level === INIT_PARAMS.LEVELS_QUANTITY - 1;
  }

  tick() {
    this._state.time--;
  }
}

export default GameModel;
