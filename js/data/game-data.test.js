import {assert} from 'chai';
import {getPoints} from './game-data.js';
import {getResult} from './game-data.js';
import {getLives} from './game-data.js';


const RESULTS = [1, 4, 13, 5, 4];
const SUCCESS_RESULT = {points: 10, lives: 3, time: 430};
const FAIL_TIME_RESULT = {points: 10, lives: 3, time: 0};
const FAIL_LIVES_RESULT = {points: 10, lives: 0, time: 13};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getAnswers = (quantityRight, quantityRightFast, quantityAnswers) => {

  if (quantityRight < quantityRightFast || quantityAnswers < quantityRight) {
    return false;
  }

  let answers = [];

  for (let i = 0; i < quantityRightFast; i++) {
    answers.push({isRight: true, time: getRandomInt(0, 30)});
  }

  while (answers.length < quantityRight) {
    answers.push({isRight: true, time: getRandomInt(31, 300)});
  }

  while (answers.length < quantityAnswers) {
    answers.push({isRight: false, time: getRandomInt(0, 300)});
  }

  return answers;
};


describe(`Game statistic`, () => {
  describe(`Get points`, () => {

    it(`Should return -1 if answers < 10 and random quantity of lives left`, () => {
      assert.equal(getPoints(getAnswers(3, 2, 5), 2), -1);
    });

    it(`Should return 10 if all answers are correct and time > 30 and 3 lives left`, () => {
      assert.equal(getPoints(getAnswers(10, 0, 10), 3), 10);
    });

    it(`Should return 5 if 5 answers are correct and time > 30 and and 3 lives left`, () => {
      assert.equal(getPoints(getAnswers(5, 0, 10), 3), 5);
    });

    it(`Should return 3 if 5 answers are correct and time > 30 and and 1 live left`, () => {
      assert.equal(getPoints(getAnswers(3, 0, 10), 1), 3);
    });

    it(`Should return 0 if 5 answers are correct and time > 30 and and 0 lives left`, () => {
      assert.equal(getPoints(getAnswers(5, 0, 10), 0), 0);
    });

    it(`Should return 11 if all answers are correct and one time < 30 and 3 lives left`, () => {
      assert.equal(getPoints(getAnswers(10, 1, 10), 3), 11);
    });

    it(`Should return 13 if all answers are correct and 3 time < 30 and 3 lives left`, () => {
      assert.equal(getPoints(getAnswers(10, 3, 10), 3), 13);
    });

    it(`Should return 1 if 1 answer is correct and time > 30 and min 1 live left`, () => {
      assert.equal(getPoints(getAnswers(1, 0, 10), 1), 1);
    });

    it(`Should return 2 if 1 answer is correct and time < 30 and min 1 live left`, () => {
      assert.equal(getPoints(getAnswers(1, 1, 10), 1), 2);
    });
  });

  describe(`Get lives`, () => {
    it(`Should return 0 if 3 answer are incorrect`, () => {
      assert.equal(getLives(getAnswers(7, 1, 10)), 0);
    });
    it(`Should return 0 if 5 answer are incorrect`, () => {
      assert.equal(getLives(getAnswers(5, 1, 10)), 0);
    });
    it(`Should return 1 if 2 answers are incorrect`, () => {
      assert.equal(getLives(getAnswers(8, 1, 10)), 1);
    });
    it(`Should return 2 if 1 answers are incorrect`, () => {
      assert.equal(getLives(getAnswers(9, 1, 10)), 2);
    });
    it(`Should return 3 if all answers are correct`, () => {
      assert.equal(getLives(getAnswers(10, 1, 10)), 3);
    });
  });

  describe(`Total statistic`, () => {
    it(`Should return string`, () => {
      assert.isString(getResult(RESULTS, SUCCESS_RESULT));
    });

    it(`Should return «Время вышло! Вы не успели отгадать все мелодии» if time = 0`, () => {
      assert.equal(getResult(RESULTS, FAIL_TIME_RESULT), `Время вышло! Вы не успели отгадать все мелодии`);
    });

    it(`Should return «У вас закончились все попытки. Ничего, повезёт в следующий раз!» if lives = 0`, () => {
      assert.equal(getResult(RESULTS, FAIL_LIVES_RESULT), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
    });

    it(`Should return string that include «Вы заняли» if points > 0 and time > 0 and lives > 0`, () => {
      assert.include(getResult(RESULTS, SUCCESS_RESULT), `Вы заняли`, `String contains value`);
    });
  });
});


