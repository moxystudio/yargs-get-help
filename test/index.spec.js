'use strict';

const yargs = require('yargs/yargs');
const chalk = require('chalk');
const getHelp = require('..');

it('should return the help', () => {
    const yargsInstance = yargs()
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    expect(getHelp(yargsInstance)).toMatchSnapshot();
});

it('should return the help even if help is disabled', () => {
    const yargsInstance = yargs()
    .help(false)
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    expect(getHelp(yargsInstance)).toMatchSnapshot();
});

it('should return the help correctly if it has an alias', () => {
    const yargsInstance = yargs()
    .help()
    .alias('help', 'h')
    .option('include', { type: 'boolean', describe: 'This is the include option' });

    expect(getHelp(yargsInstance)).toMatchSnapshot();
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

describe('normalization', () => {
    it('should normalize terminal with', () => {
        const yargsInstance = yargs().wrap(120);
        const help1 = getHelp(yargsInstance);
        const help2 = getHelp(yargsInstance.wrap(140));

        expect(help1).toBe(help2);
    });

    it('should normalize $0', () => {
        const yargsInstance = yargs()
        .usage('$0 [options]')
        .example('$0 --foo', 'Run with --foo');
        const help = getHelp(yargsInstance);

        expect(help).toContain('cli [options]');
        expect(help).toContain('cli --foo');
    });

    it('should normalize the locale', () => {
        const yargsInstance = yargs().locale('fr');
        const help = getHelp(yargsInstance);

        expect(help).toContain('Show help');
        expect(help).not.toContain('Affiche');
    });

    it('should strip ansi codes', () => {
        const yargsInstance = yargs().usage(`Usage: ${chalk.cyan('[options]')}`);

        expect(getHelp(yargsInstance)).toContain('Usage: [options]');
    });

    it('should NOT normalize if `options.normalize` is false', () => {
        const yargsInstance = yargs()
        .option('include', { type: 'boolean', describe: 'This is the include option' });

        yargsInstance.wrap(120);

        const normalizedHelp = getHelp(yargsInstance);

        yargsInstance.wrap(120);

        const nonNormalizedHelp = getHelp(yargsInstance, { normalize: false });

        expect(normalizedHelp).not.toBe(nonNormalizedHelp);
        expect(nonNormalizedHelp.length).toBeGreaterThan(normalizedHelp.length);
    });
});
