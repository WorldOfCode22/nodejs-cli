#! /usr/bin/env node
const commander = require('commander')

commander
  .command('np <name>')
  .option('-m', '--mongoose', 'Sets up mongoose for mongoDB databases')
  .option('-e', '--e', 'Adds express to project')
  .action(
    (name, cmd) => {
      
    }
  )
commander
  .version('0.1.0')

commander.parse(process.argv)
