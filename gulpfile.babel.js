// generated on 2016-05-04 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import browserify from 'browserify';
import babelify from 'babelify';
// import shim from 'browserify-shim';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();

gulp.task('styles', () => {
  return gulp.src('public/src/css/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/asset/styles'));
});

gulp.task('scripts', () => {
    const b = browserify({
        entries: 'public/src/js/main.jsx',
        transform: [
            // 'browserify-shim',
            'babelify'
        ],
        debug: true
    });
    return b.bundle()
    .pipe(source('bundle.js'))//+
    .pipe($.plumber())
    .pipe(buffer())//+
    .pipe($.sourcemaps.init({loadMaps: true}))//+
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public/asset/scripts'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true,
    es6: true,
    node: true,
    browser: true
  },
  "extends": "eslint:recommended"
};

const lintOptions = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  "extends": "eslint:recommended"
};

gulp.task('lint', lint('public/src/js/**/*.js', lintOptions));

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('public/*.html')
    .pipe($.useref({searchPath: ['public/asset', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest());
});

gulp.task('images', () => {
  return gulp.src('public/src/imgs/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('public/asset/imgs'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('public/src/fonts/**/*'))
    .pipe(gulp.dest('public/asset/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
}).pipe(gulp.dest('public/asset'));
});

gulp.task('clean', del.bind(null, ['public/asset']));

gulp.task('watched', ['styles', 'scripts', 'fonts', 'images'], () => {
    gulp.watch('public/src/css/*.scss', ['styles']);
    gulp.watch('public/src/js/**/*.js', ['scripts']);
    gulp.watch('public/src/js/**/*.jsx', ['scripts']);
    gulp.watch('public/src/fonts/**/*', ['fonts']);
    gulp.watch('public/src/imgs/**/*', ['images']);
});

gulp.task('watch', ['clean'], () => {
    gulp.start('watched');
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('public/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('public/styles'));

  gulp.src('public/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {//'lint',
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
