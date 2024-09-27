const chai = require('chai');
const assert = chai.assert;

const { getRandom } = require('../server');

describe('Unit Test', () => {
  it('Should generate a random whole number between 0 and 100', () => {
    var random = getRandom();

    assert.isNotNull(random);
    assert.isNumber(random);
    assert.isAtLeast(random, 0);
    assert.isAtMost(random, 100);
  });
});