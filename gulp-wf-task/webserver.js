const gulp = require('gulp');
const webserver = require('gulp-webserver');

const configuration = require('./configuration.js');

gulp.task('webserver', () => {
    gulp.src(configuration.dist)
        .pipe(webserver({
            port: configuration.port,
            livereload: true,
            host: configuration.ip,
            open: true,
        }))
});