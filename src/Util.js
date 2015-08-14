var _ = require('lodash'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    sourceMaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    gulpDebug = require('gulp-debug');

function toArray(input) {
    if (_.isUndefined(input)) {
        return input;
    }
    return _.isArray(input) ? input : [input];
}

function gatherSources(baseSourceDir, src, pluginConfig) {
    if (_.isFunction(src)) {
        src = src(pluginConfig);
    }

    var sources = [];

    _.each(toArray(baseSourceDir), function(base) {
        _.each(toArray(src), function(src) {
            sources.push(base + '/' + src);
        });
    });

    return sources;
}

function hasSource(globArray) {
    for (var i = 0; i < globArray.length; i++) {
        var result = glob.sync(globArray[i]);
        if (result.length > 0) {
            return true;
        }
    }

    return false;
}

function startBuild(sources, pluginName, config) {
    var build = gulp.src(sources);
	if (gutil.env.debug) {
		build = build.pipe(gulpDebug());
	}

	return build.pipe(plumber({
            errorHandler: function(error) {
                if (!config.silent) {
                    gutil.beep();
                }
                if (config.notifyError) {
                    notify.onError('Error at ' + pluginName + ': <%= error.message %>')(error);
                }
            }
        }))
        .pipe(gulpIf(config.sourceMaps, sourceMaps.init()));
}

function finishBuild(build, output, pluginName, config) {
    return build.pipe(gulpIf(config.sourceMaps, sourceMaps.write('.')))
        .pipe(gulp.dest(output))
        .pipe(gulpIf(config.notifySuccess, notify({
            message: pluginName + ' succesfully finished.',
            onLast: true
        })));
}

function copy(sources, outputDest) {
	var build = gulp.src(sources);
	if (gutil.env.debug) {
		build = build.pipe(gulpDebug());
	}
    return build.pipe(gulp.dest(outputDest));
}

module.exports = {
    toArray: toArray,
    gatherSources: gatherSources,
    hasSource: hasSource,
    startBuild: startBuild,
    finishBuild: finishBuild,
    copy: copy
};