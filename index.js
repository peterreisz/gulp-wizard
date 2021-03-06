var _ = require('lodash'),
	gulp = require('gulp'),
	runSequence = require('run-sequence'),
	gutil = require('gulp-util'),
	util = require('./src/Util');

var plugins = [];

Wizard = function(config) {
	require('require-dir')('./src/modules');

	var dev = gutil.env.develop;

	var config = _.merge({}, {
		baseSourceDir: 'src',
		vendorBaseSourceDir: 'bower_components',
		destDir: 'public',
		develop: dev,
		sourceMaps: dev,
		notifyError: true,
		notifySuccess: false,
		silent: false
	}, config);

	var tasks = [];
	var watches = [];

	plugins.sort(function(p1, p2) {
		if (!p1.depends && !p2.depends) {
			return 0;
		}

		if (p1.depends && _.includes(p1.depends, p2.id)) {
			return 1;
		}

		if (p2.depends && _.includes(p2.depends, p1.id)) {
			return -1;
		}

		return 0;
	});

	plugins.forEach(function(plugin) {
		if (config[plugin.id] === false) {
			return;
		}

		var pluginConfig = _.mergeWith({}, plugin.config, config[plugin.id], function(o, n) {
			if (n === true) {
				return o;
			}
			if (_.isObject(o) && _.isObject(n)) {
				return _.merge({}, o, n);
			}
			return n;
		});

		var baseSourceDir = plugin.vendor ? config.vendorBaseSourceDir : config.baseSourceDir;
		var sources = util.gatherSources(baseSourceDir, pluginConfig.src, pluginConfig);
		if (!util.hasSource(sources)) {
			return;
		}

		tasks.push(plugin.id);
		if (plugin.watch) {
			watches.push({
				task: plugin.id,
				sources: _.isBoolean(plugin.watch) ? sources : util.gatherSources(baseSourceDir, plugin.watch, pluginConfig)
			});
		}

		gulp.task(plugin.id, util.toArray(plugin.depends) || [], function() {
			var outputDest = config.destDir + '/' + pluginConfig.dest;

			if (plugin.build) {
				var build = util.startBuild(sources, plugin.name, config);
				build = plugin.build(build, pluginConfig, config);
				return util.finishBuild(build, outputDest, plugin.name, config);
			} else {
				return util.copy(sources, outputDest);
			}
		});
	});

	gulp.task('default', function(cb) {
		return runSequence.apply(runSequence, tasks.concat(cb));
	});

	gulp.task('watch', ['default'], function() {
		watches.forEach(function(item) {
			var watcher = gulp.watch(item.sources, [item.task]);
			watcher.on('change', function(event) {
				gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			});
		});
	});
};

Wizard.register = function(plugin) {
	plugins.push(plugin);
};

module.exports = Wizard;