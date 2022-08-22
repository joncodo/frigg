/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const packageName = require('./defaultConfig.json').name;

module.exports = {
    // preset: '@friggframework/test-environment',
    roots: [`<rootDir>/api-module-library/${packageName}`],
    coverageThreshold: {
        global: {
            statements: 13,
            branches: 0,
            functions: 1,
            lines: 13,
        },
    },
    // A path to a module which exports an async function that is triggered once before all test suites
    globalSetup: '../../scripts/set-up-tests.js',

    // A path to a module which exports an async function that is triggered once after all test suites
    globalTeardown: '../../scripts/tear-down-tests.js',
    rootDir: './../..',
};
