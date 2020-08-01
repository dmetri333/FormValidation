var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');

gulp.task('build', function() {

    var files = [
        'src/FormValidation.js'
    ];
    
    return gulp.src(files)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(concat('formValidation.min.js'))
        .pipe(gulp.dest('dist'));
});

