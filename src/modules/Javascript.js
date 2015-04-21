var _ = require('lodash'),
    wizard = require('gulp-wizard'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jsLint = require('gulp-jslint');

wizard.register({
    id: 'javascript',
    name: 'Aggregate javascript',
    watch: true,
    config: {
        src: '**/*.js',
        dest: 'js',
        out: 'app.js',
        jsLint: {
            browser: true,
            global: ['_', 's', 'angular', 'angularI18n'],
            sloppy: true,
            unparam: true,
            nomen: true
        },
        jsLintDev: {
            devel: true
        },
        uglify: {}
    },
    build: function(build, pluginConfig, config) {
        if (pluginConfig.jsLint) {
            var jsLintConfig = _.merge({}, pluginConfig.jsLint);
        
            if (config.develop && pluginConfig.jsLintDev) {
                jsLintConfig = _.merge(jsLintConfig, pluginConfig.jsLintDev);
            }
        }
        
        return build.pipe(gulpIf(jsLintConfig, jsLint(jsLintConfig)))
            .pipe(concat(pluginConfig.out))
            .pipe(gulpIf(!!pluginConfig.uglify ,uglify()));
    }
});