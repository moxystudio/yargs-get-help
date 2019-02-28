# yargs-get-help

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] 

[npm-url]:https://npmjs.org/package/yargs-get-help
[npm-image]:http://img.shields.io/npm/v/yargs-get-help.svg
[downloads-image]:http://img.shields.io/npm/dm/yargs-get-help.svg
[travis-url]:https://travis-ci.org/moxystudio/yargs-get-help
[travis-image]:http://img.shields.io/travis/moxystudio/yargs-get-help/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/yargs-get-help
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/yargs-get-help/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/yargs-get-help
[david-dm-image]:https://img.shields.io/david/moxystudio/yargs-get-help.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/yargs-get-help?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/yargs-get-help.svg

Get the help output from a yargs instance.

This module is very handy when you are developing tests for a project that has a CLI,
specially when used in conjunction with snapshot testing.


## Installation

`$ npm install yargs-get-help`


## Usage

### getHelp(yargs, [options])

```js
import yargs from 'yargs';
import getHelp from 'yargs-get-help';

yargs
.option('include', { type: 'boolean', describe: 'This is the include option' });

const help = getHelp(yargs);
// `help` will contain yargs `$0 --help` output as a string
```

### getHelp(yargs, [args], [options])

```js
import yargs from 'yargs';
import getHelp from 'yargs-get-help';

yargs
.command('serve', 'Start the server', (yargs) => {
    yargs
    .option('port', {
        describe: 'The port to bind on',
        default: 5000,
    });
}, (argv) => {
    serve(argv.port);
})
.command('build', 'Builds the project', (yargs) => {
    yargs
    .option('public-path', {
        describe: 'The webpack public-path',
        default: '/',
    });
}, (argv) => {
    build(argv.publicPath);
});

const help = getHelp(yargs, ['serve']);
// `help` will contain yargs `$0 serve --help` output as a string
```

Available options:

- `normalize`: Normalizes the output, unifying things like terminal sizes, locale, $0 and ansi-codes (defaults to `true`)


**NOTE:** This package mutates the passed `yargs` instance. If this is a problem, please consider using [yargs/yargs](https://github.com/moxystudio/yargs-get-help/blob/7d797ca29c49e6ffd27c496356657e19a8973069/test/index.spec.js#L3) instead.


## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

[MIT License](http://opensource.org/licenses/MIT)
