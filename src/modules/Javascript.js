var _ = require('lodash'),
    wizard = require('gulp-wizard'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint');

wizard.register({
    id: 'javascript',
    name: 'Aggregate javascript',
    watch: true,
    config: {
        src: '**/*.js',
        dest: 'js',
        out: 'app.js',
        eslint: {
            rules: {
                strict: 0,
                quotes: 0,
                indent: 2,
                yoda: 0
            },
            globals: {
                '_': true,
                '$': true,
                angular: true,
                angularI18n: true,
                grecaptcha: true,
                jQuery: true,
                moment: true,
                'moment-range': true,
                s: true
            },
            envs: [
                'browser'
            ]
        },
        eslintDev: {
            rules: {
                'no-unused-vars': 1,
                'no-console': 1,
                'no-alert': 1,
                indent: 1,
                'no-use-before-define': 1
            }
        },
        uglify: {}
    },
    build: function(build, pluginConfig, config) {
        if (!config.develop && pluginConfig.eslint || pluginConfig.eslintDev) {
            var eslintConfig = _.merge({}, pluginConfig.eslint);

            if (config.develop && pluginConfig.eslintDev) {
                eslintConfig = _.merge(eslintConfig, pluginConfig.eslintDev);
            }
        }

        return build.pipe(gulpIf(eslint, eslint(eslintConfig)))
            .pipe(gulpIf(eslint, eslint.format()))
            .pipe(gulpIf(eslint, eslint.failOnError()))
            .pipe(concat(pluginConfig.out))
            .pipe(gulpIf(!!pluginConfig.uglify ,uglify()));
    }
});