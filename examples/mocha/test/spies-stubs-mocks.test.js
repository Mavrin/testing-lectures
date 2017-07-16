const notify = require('../notify');
const sinon = require('sinon');
const assert = require('assert');

describe('spies stubs mocks', () => {
    describe('spies', function () {
        it('should call subscription with string message', (done) => {
            const expected = 'Hello Rolling Scopes';
            const spy = sinon.spy(() => {
                assert(spy.getCall(0), expected);
                assert(spy.callCount, 0);
                done();
            });
            notify.subscribe(spy);
            notify.send(expected);
        });

    });
    describe('fake timers', function () {
        before(function () {
            this.clock = sinon.useFakeTimers();
        });
        after(function () {
            this.clock.restore();
        });
        it('should call subscription with string message', function () {
            const expected = 'Hello Rolling Scopes';
            const spy = sinon.spy();
            notify.subscribe(spy);
            notify.send(expected);
            this.clock.tick(99);
            assert(spy.notCalled);
            this.clock.tick(1);
            assert(spy.calledOnce);
        });
    });
});