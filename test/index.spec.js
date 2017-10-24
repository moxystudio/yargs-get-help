'use strict';

const yargs = require('yargs/yargs');
const getHelp = require('..');

it('should return the help', () => {
    const yargsInstance = yargs()
    .strict()
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    expect(getHelp(yargsInstance)).toMatchSnapshot();
});

it('should return the help even if help is disabled', () => {
    const yargsInstance = yargs()
    .strict()
    .help(false)
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    expect(getHelp(yargsInstance)).toMatchSnapshot();
});

it('should normalize the output if `options.normalize` is true', () => {
    const yargsInstance = yargs()
    .strict()
    .wrap(120)
    .help(false)
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    const help1 = getHelp(yargsInstance);
    const help2 = getHelp(yargsInstance.wrap(140));

    expect(help1).toBe(help2);
});

it('should NOT normalize the output if `options.normalize` is false', () => {
    const yargsInstance = yargs()
    .strict()
    .help(false)
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    yargsInstance.wrap(120);

    const normalizedHelp = getHelp(yargsInstance);

    yargsInstance.wrap(120);

    const nonNormalizedHelp = getHelp(yargsInstance, { normalize: false });

    expect(normalizedHelp).not.toBe(nonNormalizedHelp);
    expect(nonNormalizedHelp.length).toBeGreaterThan(normalizedHelp.length);
});

it('should return the help for a sub-command', () => {
    const yargsInstance = yargs()
    .command('serve', 'Start the server', (yargs) => {
        yargs
        .option('port', {
            describe: 'The port to bind on',
            default: 5000,
        });
    }, () => {})
    .command('build', 'Builds the project', (yargs) => {
        yargs
        .option('public-path', {
            describe: 'The webpack public-path',
            default: '/',
        });
    }, () => {});

    expect(getHelp(yargsInstance, ['serve'])).toMatchSnapshot();
});

it('should throw an error if yargs parsing fails', () => {
    const yargsInstance = yargs();

    yargsInstance.parse = (args, fn) => {
        fn(new Error('foo'));
    };

    expect(() => getHelp(yargsInstance)).toThrow('foo');
});
