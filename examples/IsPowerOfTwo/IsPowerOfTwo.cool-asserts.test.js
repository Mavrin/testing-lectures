const isPowerOfTwo = require('./isPowerOfTwo');
const {describe, it} = require('./describe');
const assert = require('./cool-assert');

describe('IsPowerOfTwo', function () {
    it('0 should not be power of two', function () {
        assert.equal(isPowerOfTwo(0), false);
    });
    it('1 should be power of two', function () {
        assert.equal(isPowerOfTwo(1), true);
    });
    it('2 should be power of two', function () {
        assert.equal(isPowerOfTwo(2), true);
    });
    it('3 should not be power of two', function () {
        assert.equal(isPowerOfTwo(3), false);
    });
    it('6 should not be power of two', function () {
        assert.equal(isPowerOfTwo(3), false);
    });
    it('8 should be power of two', function () {
        assert.equal(isPowerOfTwo(8), true);
    });
    it('-2 should be power of two', function () {
        assert.equal(isPowerOfTwo(-2), false);
    });
});