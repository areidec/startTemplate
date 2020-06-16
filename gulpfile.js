const gulp 			   = require('gulp');
const njkRender    = require('gulp-nunjucks-render');
const prettify     = require('gulp-html-prettify');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');
const snippets     = require('sass-snippets');
const cleanCSS     = require('gulp-clean-css');
const rename       = require('gulp-rename');

const watchSassFiles = 'dev/scss/**/*.+(sass|scss)';
const watchJsFiles = ['dev/js/**/*.js', '!js/libs/*.js'];
const watchNJK = 'dev/templates/**/*.njk';

function browser() {
	browserSync.init({
		server: {
			baseDir: './dist'
		},
		notify: false,
	});
}

function devJs() {
	return gulp
		.src(watchJsFiles)
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest('dist/js'));
}

function devSass() {
	return gulp
		.src(watchSassFiles)
		.pipe(
			sass({
				includePaths: snippets.includePaths
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(gulp.dest('dist/css'));
}

function nunjucks() {
	return gulp
		.src(watchNJK)
		.pipe(njkRender({
			path: ['dev/templates/'],
		}))
		.pipe(prettify({indent_size : 4}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({ stream: true }));
}

function watcher() {
	gulp.watch(watchSassFiles, devSass);
	gulp.watch(watchJsFiles, devJs);
	gulp.watch(watchNJK, nunjucks);
}

exports.default = gulp.parallel(nunjucks, devSass, devJs, browser, watcher);
