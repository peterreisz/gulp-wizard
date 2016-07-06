## Gulp Wizard

Gulp wizard is a general automated build tool for building client side javascript applications with [NodeJS](https://nodejs.org/) and [Bower](http://bower.io/).
With this you don't have to write the same build file over and over again, just configure some options and start the build.
Now it specialized only for [Angularjs](https://angularjs.org/) applications.

## Features

* Aggregate and compress vendor javascript and css files with [Bower](http://bower.io/). Just create a bower.json and add some dependencies. It uses the following plugins:
 * [main-bower-files](https://github.com/ck86/main-bower-files) module, for gathering the main files.
* Generate application stylesheets from less and sass. It uses the following plugins:
 * [gulp-less](https://github.com/plus3network/gulp-less) for compiling less.
 * [gulp-sass](https://github.com/dlmanning/gulp-sass) for compiling sass.
 * [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) for autoprefixing the vendor specific css rules.
 * [gulp-clean-css](https://github.com/scniro/gulp-clean-css) for compressing the output.
* Generating application javascript. It uses the following plugins:
 * [gulp-eslint](https://github.com/adametry/gulp-eslint) for the good code quality.
 * [gulp-ng-annotate](https://github.com/Kagami/gulp-ng-annotate) for easy angular dependency injection.
 * [gulp-babel](https://github.com/babel/gulp-babel) for ES6 compatibility.
 * [gulp-uglify](https://github.com/terinjokes/gulp-uglify) for compressing the output.
* Generate angularjs template cache. It uses the following plugins:
 * [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) for compressing the templates
 * [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache) for the generation itself.

## Install

```
npm install --save-dev gulp-wizard
```

## Usage

* Create a very simple gulpfile:
 ```
 require('gulp-wizard')();
 ```

* Put some less, javascript and html files into the `src` folder (check out the example)
* Run the gulp build, some examples:
 
```
gulp
gulp --develop
gulp --debug
gulp watch
gulp javascript less bower-css bower-js templatecache
```

It will generate the output files into the destination directory, which is `public` by default.


## Configuration

You can pass configuration to the wizard:

```
require('gulp-wizard')({
   foo: 'bar' // configuration options
   pluginid: {
   	pluginOption: ... // module options
   }
});
```

* Basic configurations
 * `baseSourceDir`: all sources located here, default: `src`
 * `vendorBaseSourceDir`: bower directory, default: `bower_components`,
 * `destDir`: all output goes there, default `public`
 * `develop`: are we in the develop mode?, default `false`. Use the command line parameter to activate.
 * `debug`: debug the build process, default `false`. It shows what files are processing. Use the command line parameter to activate.
 * `sourceMaps`: generation source maps (it's on in case develop mode), default: `false`
 * `notifyError`: alert the user of any failure, default: `true`
 * `notifySuccess`: notify the user in case the build was success, default: `false`
 * `silent`: do not make noise in case error, default: `false`

* Basic module options
 * `src`: Source files inside the base source directory
 * `dest`: Destination folder inside the destDir
 * `out`: Output file name

* You can set options for every plugin listed above in the feature section. Setting the module plugins to false means turning them off. 
 * `bower-css`: `bower`, `cleancss`
 * `bower-js`: `bower`, `uglify`
 * `less`: `less`, `autoprefixer`, `cleancss`
 * `javascript`: `eslint`, `eslintDev` (this will merge to the `eslint` in case develop mode), `babel`, `ngAnnotate`, `uglify`
 * `templatecache`: `htmlmin`, `templateCache`

Non null default values for the module plugin options:
* `autoprefixer`: 
 * `browsers`: `['last 2 versions']`
 * `remove`: `true`
* `eslint`:
 * `parser`: `'babel-eslint'`
 * `parserOptions`: `{ ecmaVersion: 7, sourceType: 'script' }`
 * `rules`: `{ strict: 0, quotes: 0, yoda: 0 }`
 * `globals`: `{ '_': true, '$': true, angular: true, angularI18n: true, grecaptcha: true, jQuery: true, moment: true, 'moment-range': true, s: true }`
 * `envs`: `[ 'browser' ]`
* `eslintDev`:
 * `rules`: `{ 'no-unused-vars': 1, 'no-console': 1, 'no-alert': 1 }`
* `ngAnnotate`: `{}`
* `babel` `{ compact: false, presets: ['es2015'], plugins: ['babel-plugin-transform-decorators-legacy'] }`
* `htmlmin`:
 * `collapseWhitespace`: `true`
 * `removeComments`: `true`
* `templateCache`:
 * `standalone`: `true`

Complex example for:
* make the build silent
* change the application stylesheet filename
* setup autoprefixer browser versions
* turn off the javascript compression
* manually turn of the bower-css module

```
require('gulp-wizard')({
  silent: true
  less: {
    out: 'another.css'
    autoprefixer: {
      browsers: ['> 1%']
    }
  },
  javascript: {
    uglify: false
  },
  'bower-css': false
});
```

## Changelog

__0.4.0__
- Add: babel with es2015 + decorator presets
- Add: ng-annotate

__0.3.1__
- Update: dependencies
- Update: replace minifycss with cleancss
- Fix: bower-js accepts uglify options
- Fix: show all build time properly
- Fix: merge source options properly

__0.2.5__
- Add: debug option to the build process
- Update: dependencies
- Update: publish bower-js and bower-css compression options
- Update: allow more globals in eslint

__0.2.4__
- Fix: add missing gulp-sass dependency
- Fix: less/sass watch for files under subfolders

__0.2.3__
- Add: sass support
- Add: example project
- Update: replace jslint with eslint
- Update: bump dependencies to the latest version
- Update: make templatecache html minification able to be turned off
- Fix: less/sass watch for files under subfolders
- Fix: don't generate sourcemaps in case simple copy
- Fix: make modules able to be turned off

__0.1.0__ 
- Initial release

## TODO

- Add more modules
- Tests
- Source code documentation

## License

MIT