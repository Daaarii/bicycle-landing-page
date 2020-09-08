const { src, dest, parallel, watch } = require('gulp');

const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');

const uglify = require('gulp-uglify-es').default;

const sass = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

const cleancss = require('gulp-clean-css');

const imagemin = require('gulp-imagemin');

const newer = require('gulp-newer');


function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/'},
        notify: false,
        online: true
    })
}

function scripts() {
    return src(['app/js/app.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/main.scss')
        .pipe(sass())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({ overrideBrowsersList: ['last 10 versions'] }))
        .pipe(cleancss({ level: { 1: { specialComments: 0} } }))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/src/*')
        .pipe(newer('app/images/dest/'))
        .pipe(imagemin())
        .pipe(dest('app/images/dest/'))        
}

function startWatch() {
    watch(['app/js/*.js', '!app/js/*.min.js'], scripts);

    watch('app/scss/*.scss', styles);

    watch('app/index.html').on('change', browserSync.reload);

    watch('app/images/src/*', images);
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.default = parallel(styles, scripts, images, browsersync, startWatch);