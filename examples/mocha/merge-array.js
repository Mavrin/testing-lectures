module.exports = function (a = [], b = []) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return [...new Set(a.concat(b))];
    }
    throw new Error('Arguments should have array type')
};