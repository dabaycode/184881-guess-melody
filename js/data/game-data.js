const INIT_PARAMS = Object.freeze({
  POINTS: 0,
  LIVES: 3,
  FAST_TIME: 30,
  POINT_RIGHT: 1,
  POINT_FALSE: 2,
  LEVELS_QUANTITY: 10,
  TIME: 300,
});

const initState = Object.freeze({
  time: INIT_PARAMS.TIME,
  lives: INIT_PARAMS.LIVES,
  level: 0,
  points: 0,
});

const CIRCLE = Object.freeze({
  radius: 370,
  get length() {
    return Math.ceil(2 * Math.PI * this.radius);
  },
});

const getPoints = (answers, lives) => {

  let points = INIT_PARAMS.POINTS;

  if (answers.length < INIT_PARAMS.LEVELS_QUANTITY) {
    return -1;
  }

  if (lives === 0) {
    return 0;
  }

  answers.forEach((it) => {

    if (it.isRight) {
      points += INIT_PARAMS.POINT_RIGHT;
      if (it.time <= INIT_PARAMS.FAST_TIME) {
        points += INIT_PARAMS.POINT_RIGHT;
      }
    } else {
      points -= INIT_PARAMS.POINT_FALSE;
    }
  });

  if (points < 0) {
    points = 0;
  }

  return points;
};

const getResult = (totalResults, gamerResult) => {
  const stat = totalResults.slice();
  const gameResult = Object.assign({}, gamerResult);

  if (gameResult.lives === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (gameResult.time === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  const points = gameResult.points;

  stat.push(points);

  const compareReversed = (a, b) => b - a;

  stat.sort(compareReversed);

  const place = stat.indexOf(points) + 1;
  const success = Math.floor((stat.length - place) / stat.length * 100);

  return `Вы заняли ${place} место из ${stat.length} игроков. Это лучше, чем у ${success}% игроков`;
};

const getLives = (answers) => {

  let lives = INIT_PARAMS.LIVES;

  answers.forEach((it) => {
    if (!it.isRight) {
      lives--;
    }
  });

  if (lives < 0) {
    lives = 0;
  }

  return lives;
};

export {getPoints, getResult, getLives, initState, CIRCLE, INIT_PARAMS};
