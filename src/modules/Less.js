var wizard = require('gulp-wizard'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    gulpIf = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

wizard.register({
    id: 'less',
    name: 'Compile less',
    watch: true,
    config: {
        src: '*.less',
        dest: 'css',
        less: {},
        autoprefixer: {
            browsers: ['last 2 versions'],
            remove: true
        },
        minifycss: {}
    },
    build: function(build, pluginConfig, config) {
        return build.pipe(gulpIf(!!pluginConfig.less, less(pluginConfig.less)))
            .pipe(gulpIf(!!pluginConfig.autoprefixer, autoprefixer(pluginConfig.autoprefixer)))
            .pipe(gulpIf(!!pluginConfig.minifycss, minifyCSS(pluginConfig.minifycss)))
            .pipe(gulpIf(!!pluginConfig.out, concat(pluginConfig.out || 'app1234.css')));
    }
});