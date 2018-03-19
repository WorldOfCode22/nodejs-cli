#! /usr/bin/env node
const commander = require('commander')
const np = require('./commands/np')
const nmm = require('./commands/nmm')
const gqt = require('./commands/gqt')
// New Project
commander
  .command('np <name>')
  .description('Setup new project')
  .option('-m, --mongoose', 'Sets up mongoose for mongoDB databases')
  .option('-e, --express', 'Adds express to project')
  .option('-g, --graphql', 'Adds graphql to project')
  .action(
    (name, cmd) => {
      np(name, cmd)
    }
  )
commander
  .command('nmm <name>')
  .description('Adds new mongose model scaffold to project')
  .action(
    (name, cmd) => {
      nmm(name, cmd)
    }
  )
commander
  .command('gqt <name>')
  .description('Adds new graphql type to project')
  .action(
    (name, cmd) => {
      gqt(name)
    }
  )
commander
  .version('0.1.0')

commander.parse(process.argv)
