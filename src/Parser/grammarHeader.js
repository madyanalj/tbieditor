/**
 * Transfers helpers from TypeScript files into Jison parser.
 */

const helpers = require('../../../src/Parser/helpers')

Object.assign(global, helpers)
