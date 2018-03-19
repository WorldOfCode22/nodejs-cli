const fs = require('fs-extra')
module.exports = (name, cmd) => {
  let text =
`const mongoose = require('mongoose')

let ${name} = new mongoose.Schema({

})

module.exports = mongoose.model('${name}', ${name})
`
  return fs.writeFile(`./${name}.js`, text)
    .then(
      () => { console.log('Mongoose Model Made') },
      err => { throw new Error(err) }
    )
    .catch(
      err => { console.log(err) }
    )
}
