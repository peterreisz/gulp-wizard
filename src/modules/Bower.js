var _ = require('lodash'),
    wizard = require('gulp-wizard'),
    bowerMainFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    gulpFilter = require('gulp-filter'),
    headerfooter = require('gulp-headerfooter');

function getVendorFiles(extensions, bowerMainFilesConfig) {
    var bowerDir = process.cwd() + '/bower_components/';
    
    if (extensions && !_.isArray(extensions)) {
        extensions = [extensions];
    }

    return _.chain(bowerMainFiles(bowerMainFilesConfig))
        .filter(function(item) {
            // Exclude minified files and source maps
            return !item.match(/([\.-]min.(js|css)|map)$/);
        })
        .unique()
        .map(function(item) {
            // Make pathes relative
            return item.substring(bowerDir.length);
        })
        .filter(function(item) {
            if (!extensions) {
                return item;
            }

            var ext = item.substring(item.lastIndexOf('.') + 1);
            return _.includes(extensions, ext);
        })
        .value();
}

wizard.register({
    id: 'bower-css',
    name: 'Vendor css files',
    watch: false,
    vendor: true,
    config: {
        src: function(pluginConfig) {
            return getVendorFiles('css', pluginConfig.bower);
        },
        dest: 'css',
        out: 'vendor.css',
        bower: {}
    },
    build: function(build, pluginConfig, config) {
        return build.pipe(urlAdjuster({
                replace: function(url) {
                    // TODO: copy assets and replace url
                    return url;
                }
            }))
            .pipe(minifyCSS())
            .pipe(concat(pluginConfig.out));
    }
});

wizard.register({
    id: 'bower-js',
    name: 'Vendor js files',
    watch: false,
    vendor: true,
    config: {
        src: function(pluginConfig) {
            return getVendorFiles('js', pluginConfig.bower);
        },
        dest: 'js',
        out: 'vendor.js',
        bower: {}
    },
    build: function(build, pluginConfig, config) {
        var ngI18nFilter = gulpFilter('**/angular-locale_*.js');

        return build
            // angularjs i18n hack for changing $locale
            .pipe(ngI18nFilter)
                .pipe(concat('ngI18n.js'))
                .pipe(headerfooter.header('function angularI18n(angular) {'))
                .pipe(headerfooter.footer('}'))
            .pipe(ngI18nFilter.restore())
        
            .pipe(uglify())
            .pipe(concat(pluginConfig.out));
    }
});