import gulp from 'gulp';
import minifycss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import htmlclean from 'gulp-htmlclean';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

// 压缩css文件
export const minifyCss = () => {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
};

// 压缩html
export const minifyHtml = () => {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      ignoreCustomFragments: [/\{\{[\s\S]*?\}\}/],
    }))
    .pipe(gulp.dest('./public'));
};

// 压缩js文件
export const minifyJs = () => {
  return gulp.src(['./public/**/*.js', '!./public/js/**/*min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
};

// 压缩图片
export const minifyImages = () => {
  return gulp.src([
    './public/**/*.png',
    './public/**/*.jpg',
    './public/**/*.svg',
  ])
    .pipe(imagemin([
      imageminOptipng({ optimizationLevel: 5 }),
      imageminMozjpeg({ quality: 100, progressive: true }),
      imageminSvgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      }),
    ]))
    .pipe(gulp.dest('./public'));
};

// 定义默认任务
export const defaultTask = gulp.series(
  gulp.parallel(minifyHtml, minifyCss, minifyJs, minifyImages)
);

export default defaultTask;
