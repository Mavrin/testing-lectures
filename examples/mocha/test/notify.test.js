const notify = require('../notify');
const assert = require('assert');


describe('notify', () => {
    it('should call subscription with string message', (done) => {
        const expected = 'Hello Rolling Scopes';
        notify.subscribe(function (message) {
            assert.equal(message, expected);
            done();
        });
        notify.send(expected);
    });
    it('should call subscription with object message', (done) => {
        const expected = {id: 1, message: 'Hello Rolling Scopes'};
        notify.subscribe(function (message) {
            assert.equal(message, expected);
            done();
        });
        notify.send(expected);
    });
});