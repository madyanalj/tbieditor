const { dirname, join } = require('path')

function requireFile(file) {
  const currentDir = dirname(require.main.filename)
  const path = join(currentDir, `../${file}`)
  return require(path)
}

const { Assignment, Block } = requireFile('Constructor')
const { Identifier, Literal } = requireFile('Constructor/Expression')
