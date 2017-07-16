module.exports = function (n) {
    while (n % 2 === 0 && n > 1) {
        n = n / 2;
    }
    return n === 1;
};