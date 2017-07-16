let handler = () => {
};

module.exports = {
    subscribe(fn) {
        handler = fn;
    },
    send(message) {
        setTimeout(() => {
            handler(message);
        }, 100);
    }
};
