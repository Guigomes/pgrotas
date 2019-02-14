var gulp = require('gulp');


var jsValidate = require('gulp-jsvalidate');

var gutil = require('gulp-util');

var pump = require('pump');

var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');

let uglify = require('gulp-uglify-es').default;
var paths = {
    templateCache: ['./pages/*.html'],
    ng_annotate: ['./scripts/**/*.js'],
    validate: ['./scripts/**/*.js'],

    useref: ['./pages/*.html']

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
    return gulp.src('./pages/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('./dist'));

});

gulp.task('ng_annotate', function (done) {
    return gulp.src('./dist/templates.js')
        .pipe(ngAnnotate({
            single_quotes: true
        }))
        .pipe(gulp.dest('./dist'));

});

gulp.task('useref', function () {

    return gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulp.dest('./'));
});

gulp.task('validate', function () {
    return gulp.src('./www/js/**/*.js')
        .pipe(jsValidate()).on('end', function () {
            gutil.log("Javascript validado com sucesso");
        })
});

gulp.task('compressjs', function () {
    return gulp.src('./dist/app.min.js')
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./dist'));



});


gulp.task('clean', function () {
    gulp.src(['./scripts', './styles', './pages'])
        .pipe(clean({
            force: true
        }))
        .pipe(gulp.dest('dist'));


});


gulp.task('minify-css', () => {
    return gulp.src('./dist/app.min.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'));
});

gulp.task('replace-templates', function () {
    return gulp.src(['./scripts/**/*.js'])
        .pipe(replace('pages/', ''))
        .pipe(gulp.dest('./scripts/'));
});