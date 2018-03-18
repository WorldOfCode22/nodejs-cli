const File = require('../command-functions/file-functions')
module.exports = (name, cmd) => {
  let FileOps = new File(name, cmd)
  FileOps.createProjectRoot()
    .then(
      () => { FileOps.npmInit() },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('NPM File Created')
      },
      err => { throw new Error(err) }
    )
}
