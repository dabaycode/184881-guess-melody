const getGenreAnswers = (level) => {
  const rightAnswer = level.genre;
  const newAnswers = level.answers.slice();

  newAnswers.forEach((item) => {
    item.isRight = (item.genre === rightAnswer);
  });

  return newAnswers;
};


export default (data) => {

  const newData = [];

  data.forEach((it) => {
    if (it.type === `genre`) {
      newData.push(
          {
            type: `genre`,
            question: {
              title: it.question,
              answers: getGenreAnswers(it),
            }
          }
      );
    } else if (it.type === `artist`) {
      newData.push(
          {
            type: `artist`,
            question: {
              title: it.question,
              src: it.src,
              answers: it.answers.map((item) => {
                return {
                  artist: item.title,
                  image: item.image.url,
                  isRight: item.isCorrect,
                };
              }),
            }
          }
      );
    }
  });

  return newData;
};
