#! /usr/bin/env node
const commander = require('commander')
const np = require('./commands/np')
const nmm = require('./commands/nmm')
// New Project
commander
  .command('np <name>')
  .description('Setup new project')
  .option('-m, --mongoose', 'Sets up mongoose for mongoDB databases')
  .option('-e, --express', 'Adds express to project')
  .action(
    (name, cmd) => {
      np(name, cmd)
    }
  )
commander
  .command('nmm <name>')
  .description('Adds new mongose model scaffold to project')
  .option('-f, --file <file>', 'Adds new model scaffold to the file given to the file tag. This is ideal for projects not made with this CLI')
  .action(
    (name, cmd) => {
      nmm(name, cmd)
    }
  )
commander
  .version('0.1.0')

commander.parse(process.argv)
