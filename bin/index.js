#! /usr/bin/env node
const commander = require('commander')
const np = require('./commands/np')
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
  .version('0.1.0')

commander.parse(process.argv)
