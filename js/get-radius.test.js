import assert from 'assert';
import {getRadius} from './get-radius';

const circleLength = Math.ceil(2 * Math.PI * 370);
const circleLengthPart = (part) => Math.ceil(circleLength / part);


describe(`Function should correctly calculate circle length`, () => {
  describe(`Normal cases`, () => {
    it(`Should return full length and 0 in initial state`, () => {
      assert.equal(getRadius(1, 370).stroke, circleLength);
      assert.equal(getRadius(1, 370).offset, 0);
    });

    it(`Should return 0 and full length in the final state`, () => {
      assert.equal(getRadius(0, 370).stroke, 0);
      assert.equal(getRadius(0, 370).offset, circleLength);
    });

    it(`Offset and length should be equal on a half`, () => {
      assert.equal(getRadius(0.5, 370).stroke, circleLengthPart(2));
      assert.equal(getRadius(0.5, 370).offset, circleLengthPart(2));
    });

    it(`Offset and length should be equal on a half`, () => {
      assert.equal(getRadius((1 / 3), 370).stroke, circleLengthPart(3));
      assert.equal(getRadius((2 / 3), 370).offset, circleLengthPart(1.5));
    });
  });
});
