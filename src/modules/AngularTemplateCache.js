var _ = require('lodash'),
    wizard = require('gulp-wizard'),
    templateCache = require('gulp-angular-templatecache'),
    gulpIf = require('gulp-if'),
    htmlmin = require('gulp-htmlmin');

wizard.register({
    id: 'templatecache',
    name: 'Generate AngularJS template cache',
    watch: true,
    config: {
        src: '**/*.html',
        dest: 'js',
        out: 'templates.js',
        htmlmin: {
            collapseWhitespace: true,
            removeComments: true
        },
        templateCache: {
            standalone: true
        }
    },
    build: function(build, pluginConfig, config) {
        return build.pipe(gulpIf(!!pluginConfig.htmlmin, htmlmin(pluginConfig.htmlmin)))
            .pipe(templateCache(_.merge({}, pluginConfig.templateCache, {
                filename: pluginConfig.out
            })));
    }
});