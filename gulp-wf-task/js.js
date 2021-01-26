const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes"); //npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const removeCode = require('gulp-remove-code'); //npm install gulp-remove-code --save-dev //https://www.npmjs.com/package/gulp-remove-code
const eslint = require('gulp-eslint'); //npm install gulp-eslint --save-dev //https://www.npmjs.com/package/gulp-eslint

const configuration = require('./configuration.js');

const extension = 'js';
const filePrefix = `${configuration.prefix}${configuration.theme}`;
const filePrefixPlugin = `${configuration.prefix}${configuration.plugin}`;
const folder = `${configuration.src}${extension}/`;
const file = [
    `${folder}${filePrefix}/!(${configuration.index})*.${extension}`,
    `${folder}${filePrefix}/${configuration.index}.${extension}`,

];
const filePlugin = [
    `${folder}${filePrefixPlugin}/!(${configuration.index})*.${extension}`,
    `${folder}${filePrefixPlugin}/${configuration.index}.${extension}`,
];
const fileName = `${filePrefix}.${extension}`;
const fileNamePlugin = `${filePrefixPlugin}.${extension}`;
const fileAll = folder + configuration.allFolderFile;

gulp.task('buildJsConcat', () => {
    return gulp
        .src(file)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.dist}${configuration.assets}${extension}/`));
});

gulp.task('buildJsConcatPlugin', () => {
    return gulp
        .src(filePlugin)
        .pipe(concat(fileNamePlugin))
        .pipe(gulp.dest(`${configuration.dist}${configuration.assets}${extension}/`));
});

gulp.task('buildJsMinify', () => {
    return gulp
        .src(`${configuration.dist}${configuration.assets}${extension}/${configuration.allFile}`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.dist}${configuration.assets}${extension}/`));
});

gulp.task('buildJsRemoveCode', () => {
    return gulp
        .src(`${configuration.dist}${configuration.assets}${extension}/*.${extension}`)
        .pipe(removeCode({
            dist: true
        }))
        .pipe(removeCode({
            noDevFeatures: false,
            commentStart: '/*',
            commentEnd: '*/'
        }))
        .pipe(gulp.dest(`${configuration.dist}${configuration.assets}${extension}/`));
});

gulp.task('buildJsLint', () => {
    return gulp
        .src(`${configuration.src}${extension}/${configuration.allFolderFile}`)
        .pipe(eslint({
            "extends": "eslint:recommended",
            configFile: 'eslint.json'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


gulp.task('buildJs', gulp.series(
    'buildJsConcat',
    'buildJsLint',
    'buildJsConcatPlugin',
));


module.exports = {
    fileAll: fileAll,
};