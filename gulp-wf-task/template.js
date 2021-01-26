const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
const rename = require("gulp-rename"); //npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del
const htmllint = require('gulp-htmllint');
const fancyLog = require('fancy-log');
const colors = require('ansi-colors');

const configuration = require('./configuration.js');
const helper = require('./helper.js');

const extension = 'html';
const folder = `${configuration.src + extension}/`;
const file = `${folder}*.${extension}`;
const fileAll = folder + configuration.allFolderFile;
const fileClean = `${configuration.dist}*.${extension}`;




gulp.task('buildTemplateClean', (done) => {
    clean(fileClean);
    done();
});


gulp.task('buildTemplateInclude', () => {
    return gulp
        .src(file)
        .pipe(nunjucksRender({
            path: [folder]
        }))
        .pipe(gulp.dest(configuration.dist));
});

gulp.task('buildTemplateMinify', () => {
    return gulp
        .src(`${configuration.dist}*.${extension}`)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(configuration.dist));
});

gulp.task('buildTemplateLint', () => {
    return gulp.src(fileAll)
        .pipe(htmllint({}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {

    if (issues.length > 0) {
        issues.forEach(function (issue) {
            if (issue.code === 'E015') {
                return;
            }

            fancyLog(colors.cyan('[gulp-htmllint] ') +
                colors.white(filepath +
                    ' [' + issue.line + ',' + issue.column + ']: ') +
                colors.red('(' + issue.code + ') ' + issue.msg));
        });
    }
}

gulp.task('buildTemplate', gulp.series(
    'buildTemplateLint',
    'buildTemplateClean',
    'buildTemplateInclude',
));



module.exports = {
    fileAll: fileAll,
};