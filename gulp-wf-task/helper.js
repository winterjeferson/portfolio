const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

clean = (path) => {
    del.sync(path, {
        force: true
    });
};

exports.default = clean;