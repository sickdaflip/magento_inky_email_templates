/*
 * @project magento_inky_email_templates
 *
 * @author pbreitsprecher
 * @copyright 2017
 * @license https://opensource.org/licenses/MIT The MIT License (MIT)
 *
 * @last_modified 10.02.17 09:03
 * @file gulpfile.js
 *
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    inky = require('inky'),
    env = process.env.NODE_ENV || 'development';

// SASS tasks
gulp.task('sass_email', function () {
    return gulp.src('src/email/email-inline.scss')
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(gulpif(env === 'development', sass.sync().on('error', sass.logError)))
        .pipe(gulpif(env === 'development', sourcemaps.write()))
        .pipe(gulpif(env === 'production', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'production', cleancss()))
        .pipe(gulp.dest('../../gd-theme/default/css'))
        .pipe(notify('Successfully compiled SASS'));
});

// Inky tasks
gulp.task('inky', function () {
    return gulp.src([
        'src/email/template/**/*.html',
        '!src/email/template/**/header_inky.html',
        '!src/email/template/**/footer_inky.html'
    ])
        .pipe(inky())
        .pipe(gulp.dest('../../../../app/locale/de_DE/template/email'))
        .pipe(notify('Successfully converts HTML'));
});

// copy Files
gulp.task('copy_header_footer', function() {
    return gulp.src([
        'src/email/template/**/header_inky.html',
        'src/email/template/**/footer_inky.html'
    ])
        .pipe(gulp.dest('../../../../app/locale/de_DE/template/email'))
        .pipe(notify('Successfully copy Header and Footer'));
});

// Watch
gulp.task('watch', function () {
    // Watch .scss files for email
    gulp.watch('src/email/**/*.scss', ['sass_email']);
    // Watch .html files for email
    gulp.watch('src/email/template/**/*.html', ['inky']);
});

// Default task
gulp.task('default', ['sass_email', 'inky', 'copy_header_footer', 'watch'], function () {

});