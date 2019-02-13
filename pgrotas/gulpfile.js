var gulp = require('gulp');

var run = require('gulp-run');
var jsValidate = require('gulp-jsvalidate');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var sh = require('shelljs');
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');



var paths = {
    templateCache: ['./pgrotas/pages/*.html'],
    ng_annotate: ['./pgrotas/pgrotas/**/*.js'],
    validate: ['./pgrotas/pgrotas/**/*.js'],

    useref: ['./pgrotas/pages/*.html']

};
gulp.task('default', ['validate']);



gulp.task('build', function (done) {
    runSequence('validate', 'replace-templates', 'templatecache', 'ng_annotate', 'useref', ['compressjs', 'minify-css', 'clean'], done);
});


gulp.task('watch', function () {

    //    gulp.watch(paths.templatecache, ['templatecache']);
    //   gulp.watch(paths.ng_annotate, ['ng_annotate']);
    //    gulp.watch(paths.useref, ['useref']);
    gulp.watch(paths.validate, ['validate']);


});

gulp.task('templatecache', function (done) {
    return gulp.src('./www/templates/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('./www/dist_js/app'));

});

gulp.task('ng_annotate', function (done) {
    return gulp.src('./www/dist_js/app/templates.js')
        .pipe(ngAnnotate({
            single_quotes: true
        }))
        .pipe(gulp.dest('./www/dist_js/app'));

});

gulp.task('useref', function () {

    return gulp.src('./www/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./www'));
});

gulp.task('validate', function () {
    return gulp.src('./www/js/**/*.js')
        .pipe(jsValidate()).on('end', function () {
            gutil.log("Javascript validado com sucesso");
        })
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('./www/dist_js/*.js'),
        uglify(),

        gulp.dest('./www/dist_js'),

    ]);
});

gulp.task('compressjs', function () {
    return gulp.src('./www/dist_js/app.min.js')
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./www/dist_js'));



});


gulp.task('clean', function () {
    gulp.src(['./www/css', './www/js', './www/lib', './www/templates'])
        .pipe(clean({
            force: true
        }))
        .pipe(gulp.dest('dist'));


});


gulp.task('minify-css', () => {
    return gulp.src('./www/dist_css/styles.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./www/dist_css'));
});

gulp.task('replace-templates', function () {
    return gulp.src(['./www/js/**/*.js'])
        .pipe(replace('templates/', ''))
        .pipe(gulp.dest('./www/js/'));
});