const fs = require('fs-extra')

module.exports = (name) => {
  let text = `const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList} = require('graphql')

module.exports = new GraphQLObjectType({
  name: '${name}_Type',
  fields: {

  }
})
`
  fs.writeFile(`./${name}.js`, text)
    .then(
      () => { console.log('GraphQLType Created') },
      err => { throw new Error(err) }
    )
    .catch(
      err => { console.log(err) }
    )
}
