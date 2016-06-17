//var elixir = require('laravel-elixir');
//
///*
// |--------------------------------------------------------------------------
// | Elixir Asset Management
// |--------------------------------------------------------------------------
// |
// | Elixir provides a clean, fluent API for defining some basic Gulp tasks
// | for your Laravel application. By default, we are compiling the Sass
// | file for our application, as well as publishing vendor resources.
// |
// */
//
//elixir(function(mix) {
//    mix.sass('app.scss');
//});

// Configuration
var $path = {
    'css': 'public/css/',
    'scss': 'sass/'
};

// Require
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// Tasks
gulp.task('sass', function () {
    gulp.src($path.scss+'*.scss')
        .pipe($.sass().on('error', console.error.bind(console, "SASS Error:")
        ))
        .pipe($.autoprefixer({
            cascade:true
        }))
        .pipe(gulp.dest($path.css));
    //.pipe($.size())
});

gulp.task('default', function(){
    gulp.watch($path.scss+'*.scss', ['sass'])
});
