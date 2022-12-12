function promisfy(fn) {
    const _prev = fn;
    return (...args) => {
        return new Promise((resolve, reject) => {
            _prev(...args, (err, response) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            })
        })
    }
}

module.exports = promisfy;
