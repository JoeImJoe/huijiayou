
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('compileSass',function(){

	gulp.src('./src/**/*.scss')

		// 编译sass文件
		.pipe(sass({outputStyle:'compact'}).on('error', sass.logError))

		// 输出文件到硬盘
		.pipe(gulp.dest('./src/css/'));
});


gulp.task('jtSass',function(){
	// 监听home.scss文件，如果有修改,则自动自动compileSass任务
	gulp.watch('./src/sass/*.scss',['compileSass']);
});


