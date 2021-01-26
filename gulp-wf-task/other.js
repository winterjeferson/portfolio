const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');
const helper = require('./helper.js');

const folder = 'other/';
const fileAll = [
    `${configuration.src}${folder}${configuration.allFolderFile}`,
    `${configuration.src}${folder}.htaccess`,
];
const fileClean = [
    `${configuration.dist}.htaccess`,
    `${configuration.dist}*.txt`,
    `${configuration.dist}*.xml`,
];



gulp.task('buildOtherClean', (done) => {
    clean(fileClean);
    done();
});

gulp.task('buildOtherMove', (done) => {
    return gulp
        .src(fileAll)
        .pipe(gulp.dest(configuration.dist));
    done();
});

gulp.task('buildOther', gulp.series(
    'buildOtherClean',
    'buildOtherMove',
));



module.exports = {
    fileAll: fileAll,
};