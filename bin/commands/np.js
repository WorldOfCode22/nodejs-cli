const File = require('../command-functions/file-functions')
module.exports = (name, cmd) => {
  let FileOps = new File(name, cmd)
  FileOps.createProjectRoot()
    .then(
      () => { return FileOps.npmInit() },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('NPM File Created')
      },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log(`Changed Directory To ${FileOps.getName()}`)
        console.log('Installing Modules')
        return FileOps.npmInstall()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('Modules Installed')
        console.log('Creating .env')
        return FileOps.createEnv()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('Created .env')
        console.log('creating .gitignore')
        return FileOps.createGitignore()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('created .gitignore')
        console.log('creating index.js')
        return FileOps.createExpressApp()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('Created index.js')
        console.log('Creating Mongoose Model File')
        return FileOps.createMongooseModelsDir()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => { console.log('Created Mongoose Model File') },
      err => { throw new Error(err) }
    )
    .then(
      () => {
        console.log('Creating Graphql Files')
        return FileOps.gqlSetup()
      },
      err => { throw new Error(err) }
    )
    .then(
      () => { console.log('Created Graphql Files') },
      err => { throw new Error(err) }
    )
    .catch(
      err => { console.log(err) }
    )
}
