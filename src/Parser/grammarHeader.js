const { dirname, join } = require('path')

const currentDir = dirname(require.main.filename)
const helpers = require(join(currentDir, 'helpers'))

Object.assign(global, helpers)
