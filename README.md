# nodejs-cli
A Command Line Interface for scaffolding and quick node development. This CLI has both commands to start your project and commands to pre-compile text of repetitive task. Commands will be added as I use them in development and if anybody wants to add their own features, feature suggestions and creation are both welcome. 
## Getting Started
### Prerequisites
* Nodejs
* NPM
### Installing
This command is coming soon:   
``` npx @worldofcode22/nodejs-cli ```
## Authors
Sloan Gwaltney (worldofcode22@gmail.com)
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
Creates a new project   
options:   
* -e, --express will set up an express app as the backend framework for node. Right now this is the only supported framework and an error will be given if this tag is not in the command line args.
* -m, --mongoose will set up mongoose and mongoose folders for this project.
* -g, --graphql will set up graphql and graphql folders for this project.
### nmm
Creates a new mongoose model in the current directory.   
options:   
* None
### gqt
Creates a new Graphql type in the current directory.   
options:   
* None
