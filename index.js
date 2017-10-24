'use strict';

const stripAnsi = require('strip-ansi');

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

    // Normalize terminal width
    if (options.normalize) {
        yargs.wrap(100);
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

    return options.normalize ? stripAnsi(output) : output;
}

module.exports = yargsGetHelp;
