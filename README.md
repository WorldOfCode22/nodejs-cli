# nodejs-cli
A Command Line Interface for scaffolding and quick node development. This CLI has both commands to start your project and commands to pre-compile text of repetitive task. Commands will be added as I use them in development and if anybody wants to add their own features, feature suggestions and creation are both welcome.
## Getting Started
### Prerequisites
* Nodejs
* NPM
### Installing
Install the package:   
``` npx nodejs-cli ```
## Authors
Sloan Gwaltney (worldofcode22@gmail.com)
## Built With
[Commander](https://www.npmjs.com/package/commander)
[fs-extra](https://www.npmjs.com/package/fs-extra)
[shelljs](https://www.npmjs.com/package/shelljs)
## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
## Versioning
We use SemVer for versioning.

# Documentation
## Commands
All commands are typed like this:   
``` nodejs-cli <command> [options] <name> ```   
for example:   
``` nodejs-cli np -e -m -g test ```   
## Command Documentation
### np 
Creates a new project with a given name in the current directory.   
1. args:   
  * name required   
2. options:   
  * -e, --express will set up an express app as the backend framework for node. Right now this is the only supported framework and an   error will be given if this tag is not in the command line args.
  * -m, --mongoose will set up mongoose and mongoose folders for this project.
  * -g, --graphql will set up graphql and graphql folders for this project.
### nmm <name>
Creates a new mongoose model with the given name in the current directory.  
1. args:   
  * name required   
2. options:   
  * None
### gqt <name>
Creates a new Graphql type with the given name in the current directory.   
1. args:   
  * name required   
2. options:   
  * None
