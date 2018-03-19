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
    `
    return fs.writeFile(`./.env`, text)
  }
  createGitignore () {
    let text =
    `.env
MONGO_URI=mongodb-uri-here
    `
    return fs.writeFile(`./.gitignore`, text)
  }
  createExpressApp () {
    let self = this
    function getModules () {
      let text = ``
      if (self.command.mongoose) {
        text +=
`const mongoose = require('mongoose')`
      }
      return text
    }
    function mongooseSetup () {
      if (self.command.mongoose) {
        return `mongoose.connect(process.env.MONGO_URI)
  .then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  )`
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
