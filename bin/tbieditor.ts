#!/usr/bin/env ts-node

import commander from 'commander'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { transpile } from '../src/Transpiler'

function ensureDirectoryExists(path: string): void {
  const directory = dirname(path)
  if (existsSync(directory)) return
  ensureDirectoryExists(directory)
  mkdirSync(directory)
}

const { log } = console
log('Hello tbieditor user! 👋')

commander
  .version('1.0.0')
  .usage('[file...]')
  .option('-o, --outDir <directory>', 'destination directory for outputted files', '/')
  .parse(process.argv)

const inputFilenames = commander.args
inputFilenames.forEach((inputFilename) => {
  const input = readFileSync(inputFilename, 'utf8')
  log(` 👀  Read '${inputFilename}'`)
  transpile(input, (outpulFilename, output) => {
    const path = join(process.cwd(), commander.outDir, outpulFilename)
    ensureDirectoryExists(path)
    writeFileSync(path, output)
    log(` 👌  Outputted '${outpulFilename}'`)
  })
})
