var wizard = require('gulp-wizard'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    gulpIf = require('gulp-if'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

wizard.register({
    id: 'less',
    name: 'Compile less',
    watch: '**/*.less',
    config: {
        src: '*.less',
        dest: 'css',
        less: {},
        autoprefixer: {
            browsers: ['last 2 versions'],
            remove: true
        },
        cleancss: {}
    },
    build: function(build, pluginConfig, config) {
        return build.pipe(gulpIf(!!pluginConfig.less, less(pluginConfig.less)))
            .pipe(gulpIf(!!pluginConfig.autoprefixer, autoprefixer(pluginConfig.autoprefixer)))
            .pipe(gulpIf(!!pluginConfig.cleancss, cleanCSS(pluginConfig.cleancss)))
            .pipe(gulpIf(!!pluginConfig.out, concat(pluginConfig.out || 'app.css')));
    }
});