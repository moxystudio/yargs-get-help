'use strict';

const stripAnsi = require('strip-ansi');

function normalizeTerminalWidth(yargs) {
    yargs.wrap(100);
}

function normalizeLocale(yargs) {
    yargs.locale('en');
}

function normalizeDollarZero(yargs) {
    yargs.$0 = 'cli';
}

function yargsGetHelp(yargs, args, options) {
    let err;
    let output;

    // Parse options
    if (args && !Array.isArray(args)) {
        options = args;
        args = undefined;
    }

    args = args || [];
    options = Object.assign({
        normalize: true,
    }, options);

    // Apply normalization to yargs
    if (options.normalize) {
        normalizeTerminalWidth(yargs);
        normalizeLocale(yargs);
        normalizeDollarZero(yargs);
    }

    // Grab the help
    yargs
    .help()
    .parse([...args, '--help'], (err_, parsed, output_) => {
        err = err_;
        output = output_;
    });

    if (err) {
        throw err;
    }

    // Apply normalization to the output
    if (options.normalize) {
        output = stripAnsi(output);
    }

    return output;
}

module.exports = yargsGetHelp;
