const cmdFunctions = require('../command-functions.js')
module.exports = (name, cmd) => {
  cmdFunctions.File.createProjectRoot(name, cmd)
    .then(
      console.log('Root File Made')
    )
}
