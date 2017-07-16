module.exports = {
  equal(actual, expected, message = `actual: ${actual} but expect ${expected}`) {
      if(actual !== expected) {
          throw new Error(message);
      }
  }
};