var _ = require('lodash'),
    wizard = require('gulp-wizard'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    ngAnnotate = require('gulp-ng-annotate'),
    babel = require('gulp-babel');

wizard.register({
    id: 'javascript',
    name: 'Aggregate javascript',
    watch: true,
    config: {
        src: '**/*.js',
        dest: 'js',
        out: 'app.js',
        eslint: {
            parser: 'babel-eslint',
            parserOptions: {
                ecmaVersion: 7,
                sourceType: 'script'
            },
            rules: {
                strict: 0,
                quotes: 0,
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
                'no-alert': 1
            }
        },
        uglify: {},
        ngAnnotate: {},
        babel: {
            compact: false,
            presets: ['es2015'],
            plugins: ['babel-plugin-transform-decorators-legacy']
        }
    },
    build: function(build, pluginConfig, config) {
        if (!config.develop && pluginConfig.eslint || pluginConfig.eslintDev) {
            var eslintConfig = _.merge({}, pluginConfig.eslint);

            if (config.develop && pluginConfig.eslintDev) {
                eslintConfig = _.merge(eslintConfig, pluginConfig.eslintDev);
            }
        }

        return build.pipe(gulpIf(!!pluginConfig.eslint, eslint(eslintConfig)))
            .pipe(gulpIf(!!pluginConfig.eslint, eslint.format()))
            .pipe(gulpIf(!!pluginConfig.eslint, eslint.failOnError()))
            .pipe(concat(pluginConfig.out))
            .pipe(gulpIf(!!pluginConfig.babel, babel(pluginConfig.babel)))
            .pipe(gulpIf(!!pluginConfig.ngAnnotate, ngAnnotate(pluginConfig.ngAnnotate)))
            .pipe(gulpIf(!!pluginConfig.uglify ,uglify()));
    }
});