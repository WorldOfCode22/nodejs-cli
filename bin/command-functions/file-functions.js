const fs = require('fs-extra')
const shelljs = require('shelljs')
module.exports = class File {
  constructor (name, command) {
    this.name = name
    this.command = command
  }
  getName () {
    return this.name
  }
  getCommand () {
    return this.command
  }
  gqlSetup () {
    return fs.mkdir(`./graphql`)
      .then(
        () => {
          console.log('Made Graphql folder')
          console.log('Making Graphql Root file')
          let text = `const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList} = require('graphql')
module.exports = new GraphQLObjectType({
  name: 'Root_Query',
  fields: {

  }
})
`
          shelljs.cd('./graphql')
          return fs.writeFile('./root.js', text)
        },
        err => { throw new Error(err) }
      )
      .then(
        () => {
          console.log('Created Root File')
          console.log('Creating Mutations File')
          let text = `const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList} = require('graphql')
module.exports = new GraphQLObjectType({
  name: 'Root_Mutations',
  fields: {

  }
})
`
          return fs.writeFile('./mutations.js', text)
        },
        err => { throw new Error(err) }
      )
      .then(
        () => {
          console.log('Created Root File')
          console.log('Creating Schema File')
          let text = `const root = require('./root')
const {GraphQLSchema} = require('graphql')
module.exports = new GraphQLSchema({
  query: root
});
`
          fs.writeFile('./schema.js', text)
        },
        err => { throw new Error(err) }
      )
      .then(
        () => {
          console.log('Created Schema File')
          console.log('Creating Types Folder')
          fs.mkdir('./types')
        },
        err => { throw new Error(err) }
      )
      .then(
        () => {
          console.log('Created Types Folder')
        },
        err => { throw new Error(err) }
      )
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
  createEnv () {
    let text =
    `PORT=3000
MONGO_URI=mongodb-uri-here
    `
    return fs.writeFile(`./.env`, text)
  }
  createMongooseModelsDir () {
    if (this.command.mongoose) {
      return fs.mkdir('./mongoose-models')
    }
  }
  createGitignore () {
    let text =
    `.env
node_modules
    `
    return fs.writeFile(`./.gitignore`, text)
  }
  createExpressApp () {
    let self = this
    function getModules () {
      let text = ``
      if (self.command.mongoose) {
        text +=
`
const mongoose = require('mongoose')`
      }
      if (self.command.graphql) {
        text +=
`
const expressGraphQL = require('express-graphql')
const GQLSchema = require('./graphql/schema.js')`
      }
      return text
    }
    function mongooseSetup () {
      if (self.command.mongoose) {
        return `
mongoose.connect(process.env.MONGO_URI)
  .then(
    () => { console.log('Database connected') },
    err => { throw new Error(err) }
  )
  .catch(
    err => { console.log(err) }
  )`
      } else {
        return ''
      }
    }
    function graphqlSetup () {
      if (self.command.graphql) {
        return `
app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema: GQLSchema
}))`
      } else {
        return ''
      }
    }
    let text =
`require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
${getModules()}
${mongooseSetup()}
${graphqlSetup()}

app.listen(port,
  () => { console.log('app waiting for request on port: ' + port) }
)
`
    return fs.writeFile('./index.js', text)
  }
  npmInstall () {
    console.log('Installing modules this may take a few minutes')
    if (this.command.express) {
      let npmStr = 'express dotenv '
      if (this.command.mongoose) {
        npmStr += 'mongoose '
      }
      if (this.command.graphql) {
        npmStr += 'graphql express-graphql'
      }
      shelljs.cd(this.name)
      return this.shelljsExec(`npm install ${npmStr} --save`)
    } else {
      throw new Error('Right now only express is supported as a framework so the -e tag is required')
    }
  }
  npmInit () {
    console.log('Creating package.json')
    let pack =
    {
      name: this.name,
      version: '1.0.0',
      description: 'This project was made with nodejs-cli',
      main: 'index.js',
      scripts: {
        start: 'node index.js'
      },
      license: 'MIT'
    }
    return fs.writeFile(`./${this.name}/package.json`, JSON.stringify(pack))
  }
  shelljsExec (cmd) {
    return new Promise((resolve, reject) => {
      shelljs.exec(cmd, {async: true, silent: false},
        (err) => {
          if (err) reject(err)
          else resolve()
        })
    })
  }
}
