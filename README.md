## Gulp Wizard

Gulp wizard is a general automated build tool for building client side javascript applications with [NodeJS](https://nodejs.org/) and [Bower](http://bower.io/).
With this you don't have to write the same build file over and over again, just configure some options and start the build.
Now it specialized only for [Angularjs](https://angularjs.org/) applications.

## Features

* Aggregate and compress vendor javascript and css files with [Bower](http://bower.io/). Just create a bower.json and add some dependencies. It uses the following plugins:
 * [main-bower-files](https://github.com/ck86/main-bower-files) module, for gathering the main files.
* Generate application stylesheets from less. It uses the following plugins:
 * [gulp-less](https://github.com/plus3network/gulp-less) for compiling less.
 * [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) for autoprefixing the vendor specific css rules.
 * [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css) for compressing the output.
* Generating application javascript. It uses the following plugins:
 * [gulp-jslint](https://github.com/karimsa/gulp-jslint) for the good code quality.
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

* Put some less, javascript and html files into the `src` folder
* Run the gulp build, some examples:
 
```
gulp
gulp --develop
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
 * `develop`: are we in the develop mode?, default `false`
 * `sourceMaps`: generation source maps (it's on in case develop mode), default: `false`
 * `notifyError`: alert the user of any faliure, default: `true`
 * `notifySuccess`: notify the user in case the build was success, default: `false`
 * `silent`: do not make noise in case error, default: `false`

* Basic module options
 * `src`: Source files inside the base source directory
 * `dest`: Destination folder inside the destDir
 * `out`: Output file name

* You can set options for every plugin listed above in the feature section. Setting the module plugins to false means turning them off. 
 * `bower-css`: `bower`
 * `bower-js`: `bower`
 * `less`: `less`, `autoprefixer`, `minifycss`
 * `javascript`: `jsLint`, `jsLintDev` (this will merge to the `jsLint` in case develop mode), `uglify`
 * `templatecache`: `htmlmin`, `templateCache`

Non null default values for the module plugin options:
* `autoprefixer`: 
 * `browsers`: `['last 2 versions']`
 * `remove`: `true`
* `jsLint`:
 * `browser`: `true`
 * `global`: `['_', 's', 'angular', 'angularI18n']`
 * `sloppy`: `true`
 * `unparam`: `true`
 * `nomen`: `true`
* `jsLintDev`:
 * `devel`: `true`
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
  }
});
```

## Changelog

__0.1.0__ 
- Initial release

## TODO

- Add more modules
- Tests
- Source code documentation

## License

MIT