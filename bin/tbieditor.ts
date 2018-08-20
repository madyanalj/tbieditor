#!/usr/bin/env ts-node

import commander from 'commander'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, extname, join } from 'path'
import sharp from 'sharp'
import { transpile } from '../src/Transpiler'

const { log } = console
log('Hello tbieditor user! 👋')

/**
 * Ensures every directory in a path exists, otherwise creates them.
 * @param path Path to be checked/created.
 */
function ensureDirectoryExists(path: string): void {
  const directory = dirname(path)
  if (existsSync(directory)) return
  ensureDirectoryExists(directory)
  mkdirSync(directory)
}

/**
 * Logs exported image filename to user console.
 * @param filename Exported image filename.
 */
function logOutput(filename: string): void {
  log(` 👌  Outputted '${filename}'`)
}

/**
 * Exports image file to disk.
 * @param logPath    Path of exported image to log to user console.
 * @param outputPath Full path of exported image to write file into.
 * @param type       Image format.
 * @param data       Image source content.
 */
function outputImage(
  logPath: string, outputPath: string, type: string, data: string,
): void {
  if (type === 'png' || type === 'jpeg' || type === 'jpg') {
    let process = sharp(Buffer.from(data))
    process = type === 'png' ? process.png() : process.jpeg()
    process.toFile(outputPath, () => logOutput(logPath))
  } else {
    writeFileSync(outputPath, data)
    logOutput(logPath)
  }
}

// define CLI options
commander
  .version('1.0.0')
  .usage('[file...]')
  .option('-o, --outDir <directory>', 'destination directory for outputted files', '/')
  .parse(process.argv)

// process every inputted script file
const inputFilenames = commander.args
inputFilenames.forEach((inputFilename) => {
  const input = readFileSync(inputFilename, 'utf8')
  log(` 👀  Read '${inputFilename}'`)
  transpile(input, (outpulFilename, output) => {
    const logPath = join(commander.outDir, outpulFilename)
    const outputPath = join(process.cwd(), logPath)
    ensureDirectoryExists(outputPath)
    const mediaType = extname(outpulFilename).slice(1)
    outputImage(logPath, outputPath, mediaType, output)
  }, inputFilename)
})
