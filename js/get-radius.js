const MAX_TIME = 300; // sec

const getRadius = (timeRatio, radius) => {
  const length = Math.ceil(2 * Math.PI * radius);
  const stepSize = length / MAX_TIME;
  const stepQuantity = Math.ceil(length / stepSize);
  const currentStroke = stepSize * stepQuantity;

  return {
    get stroke() {
      return Math.ceil(currentStroke * timeRatio);
    },
    get offset() {
      return Math.ceil(currentStroke - (currentStroke * timeRatio));
    }
  };

};

export {getRadius};
