const fs = require('fs-extra')
module.exports = (name, cmd) => {
  console.log(cmd.file)
  let dir = ''
  if (cmd.file) {
    dir = cmd.file
  } else {
    dir = 'mongoose-models'
  }
  let text =
`const mongoose = require('mongoose')

let ${name} = new mongoose.Schema({

})

module.exports = mongoose.model('${name}', ${name})
`
  return fs.writeFile(`./${dir}/${name}.js`, text)
}
