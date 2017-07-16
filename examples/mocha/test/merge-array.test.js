const mergeArray = require('../merge-array');
const assert = require('assert');


describe('merge array', () => {
    it('should return empty array if function is called without param', () => {
        assert.deepEqual(mergeArray(), []);
    });
    it('should merge two array', () => {
        assert.deepEqual(mergeArray([1], [1, 2, 5, 1]), [1, 2, 5]);
    });
    it('should throw Error if one of argument is not Array', () => {
        assert.throws(() => {
            mergeArray([1], '');
        }, /Arguments should have array type/);
    });
});