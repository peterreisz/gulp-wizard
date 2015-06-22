var wizard = require('gulp-wizard'),
    concat = require('gulp-concat'),
	sass = require('gulp-sass'),
    gulpIf = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

wizard.register({
    id: 'sass',
    name: 'Compile sass',
    watch: '**/*.scss',
    config: {
        src: '*.scss',
        dest: 'css',
        sass: {},
        autoprefixer: {
            browsers: ['last 2 versions'],
            remove: true
        },
        minifycss: {}
    },
    build: function(build, pluginConfig, config) {
        return build.pipe(gulpIf(!!pluginConfig.sass, sass(pluginConfig.sass)))
            .pipe(gulpIf(!!pluginConfig.autoprefixer, autoprefixer(pluginConfig.autoprefixer)))
            .pipe(gulpIf(!!pluginConfig.minifycss, minifyCSS(pluginConfig.minifycss)))
            .pipe(gulpIf(!!pluginConfig.out, concat(pluginConfig.out || 'app.css')));
    }
});