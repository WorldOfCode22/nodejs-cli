const fs = require('fs-extra')
const shelljs = require('shelljs')
module.exports.File = class File {
  static createProjectRoot (name, cmd) {
    console.log('Creating Project Root')
    return fs.mkdir(`./${name}`)
      .then(
        () => {
          console.log('Project Root Created')
        },
        err => { throw new Error(err) }
      )
  }
  installModules (cmd, err) {
    if (err) {
      throw new Error(err)
    }
    console.log('Installing modules this may take a few minutes')
    if (cmd.express) {
      let npmStr = 'express '
      if (cmd.mongoose) {
        npmStr += 'mongoose '
      }
      return shelljs.exec(`npm install ${npmStr} --save`)
    } else {
      throw new Error('Right now only express is supported as a framework so the -e tag is required')
    }
  }
}
