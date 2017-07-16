module.exports = function (n) {
    while (n % 2 === 0 && n >= 2) {
        if (n === 2) {
            return true;
        } else {
            n = n/2;
        }
    }
    return false;
};