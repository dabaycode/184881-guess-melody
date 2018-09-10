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

const getRandomLevel = (type) => {
  const arr = questions[type].slice();

  return {
    type,
    question: arr[Math.floor(Math.random() * arr.length)],
  };
};

const getGameLevels = () => {
  const arr = [];

  let i = 0;

  while (i < (INIT_PARAMS.LEVELS_QUANTITY / 2)) {
    arr.push(getRandomLevel(`genre`));
    arr.push(getRandomLevel(`artist`));

    i++;
  }

  return arr;
};

const questions = {
  'genre': [
    {
      title: `Выберите рок треки`,
      answers: [
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
          genre: `Jazz`,
          isRight: false,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
          genre: `Rock`,
          isRight: true,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
          genre: `Country`,
          isRight: false,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
          genre: `R&B`,
          isRight: false,
        }
      ],
    },
    {
      title: `Выберете треки в жанре джаз`,
      answers: [
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
          genre: `Jazz`,
          isRight: true,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
          genre: `Rock`,
          isRight: false,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
          genre: `Country`,
          isRight: false,
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
          genre: `Jazz`,
          isRight: true,
        },
      ],
    }
  ],
  'artist': [
    {
      title: `Кто исполняет эту песню?`,
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      answers: [
        {
          artist: `Jingle Punks`,
          image: `https://i.vimeocdn.com/portrait/992615_300x300`,
          isRight: true,
        },
        {
          artist: `Audionautix`,
          image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
          isRight: false,
        },
        {
          artist: `Riot`,
          image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
          isRight: false,
        },
      ],
    },
    {
      title: `Кто исполняет эту песню?`,
      src: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
      answers: [
        {
          artist: `Riot`,
          image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
          isRight: false,
        },
        {
          artist: `Jingle Punks`,
          image: `https://i.vimeocdn.com/portrait/992615_300x300`,
          isRight: false,
        },
        {
          artist: `Quincas Moreira`,
          image: `http://www.atribuna.com.br/fileadmin/_processed_/csm_Quincas-Moreira-Foto-Divulgacao_76d1a8b00e.jpg`,
          isRight: true,
        }
      ],
    }
  ],
};


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

export {getPoints, getResult, getLives, initState, getGameLevels, CIRCLE, INIT_PARAMS};
