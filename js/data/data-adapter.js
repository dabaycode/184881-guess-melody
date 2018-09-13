export default (data) => {

  const newData = {
    'genre': [],
    'artist': [],
  };

  const getGenreAnswers = (level) => {
    const rightAnswer = level.genre;
    const newAnswers = level.answers.slice();

    newAnswers.forEach((item) => {
      if (item.genre === rightAnswer) {
        item.isRight = true;
      } else {
        item.isRight = false;
      }
    });
    return newAnswers;
  };


  data.forEach((it) => {
    if (it.type === `genre`) {
      newData[`genre`].push(
          {
            title: it.question,
            answers: getGenreAnswers(it),
          }
      );
    } else if (it.type === `artist`) {
      newData[`artist`].push(
          {
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
      );
    }
  });

  return newData;
};
