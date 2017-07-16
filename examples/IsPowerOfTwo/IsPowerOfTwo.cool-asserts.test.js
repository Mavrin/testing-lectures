const isPowerOfTwo = require('./isPowerOfTwo');
const assert = require('./cool-assert');

assert.equal(isPowerOfTwo(2), true, '2 should be power of two');
assert.equal(isPowerOfTwo(3), false, '3 should not be power of two');
assert.equal(isPowerOfTwo(6), false, '6 should not be power of two');
assert.equal(isPowerOfTwo(8), true, '2 should be power of two');
assert.equal(isPowerOfTwo(-2), false, '-2 should not be power of two');
assert.equal(isPowerOfTwo(0), false, '0 should not be power of two');
assert.equal(isPowerOfTwo(1), true, '1 should be power of two');
