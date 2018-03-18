const fs = require('fs-extra')
const shelljs = require('shelljs')
module.exports = class File {
  constructor (name, command) {
    this.name = name
    this.command = command
  }
  createProjectRoot () {
    console.log('Creating Project Root')
    return fs.mkdir(`./${this.name}`)
      .then(
        () => {
          console.log('Project Root Created')
        },
        err => { throw new Error(err) }
      )
  }
  createExpressApp () {

  }
  installModules (err) {
    if (err) {
      throw new Error(err)
    }
    console.log('Installing modules this may take a few minutes')
    if (this.cmd.express) {
      let npmStr = 'express '
      if (this.cmd.mongoose) {
        npmStr += 'mongoose '
      }
      return shelljs.exec(`npm install ${npmStr} --save`)
    } else {
      throw new Error('Right now only express is supported as a framework so the -e tag is required')
    }
  }
  npmInit () {
    console.log('npm init')
  }
}
