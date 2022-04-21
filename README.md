# `create-new-template`

A small and simple command line tool to clone GitHub repositories and use them as template. When you choose a repo, you can choose which branch you want to use as a template. So you can create a single repository for all of your projects template and import these with this app.

The script will clone the chosen repo with your new project name, delete the `.git/` directory (run a custom command if you want to) and run `git init` again to generate your new project.


### Powerful Node packages used to build this app

- 📦 [**shelljs**](https://github.com/shelljs/shelljs) to run shell commands;
- 📦 [**gar**](https://github.com/ethanent/gar) to manipulate command arguments more easily.

<br>

`[ Gif here... ]`

<br>


## Instalation

```bash
sudo npm i -g create-new-template           # with npm
sudo yarn global add create-new-template    # Or, if you want to use yarn
```

## Usage

You don't need to give any arguments to the command, but, if you don't, it will ask where is the templates repo, which branch you want to use and the project's name (the custom command option will not be asked).

```
Usage: create-new-template [PROJECT NAME] -r [USER/REPO] -b [BRANCH] -c [COMMAND]
or: create-new-template

A small and simple tool to clone GitHub repositories and use them as template.

    --repo -r       Github repository, you need to specify. Like that: exampleuser/examplerepo
    --branch -b     Branch of the repository that have all of your templates.
                    (e.g. main, master, dev...)
    --command -c    Command to run after cloning the repo and before initialize that.
    --help -h       Show this message
```

Usage example:

```shell
use-template [PROJECT NAME] --repo [USER/REPO] --branch [BRANCH] --command [COMMAND]
```

> *You don't have to follow any pattern.*


## Todo

- [X] Improve my english in README...
- [X] Publish on NPM
- [X] Add `--help | -h` option


##

<br>

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GPLv3](https://img.shields.io/badge/GNU_General_Public_Licence_v3-E58080?style=for-the-badge&logo=bookstack&logoColor=white)

*Thanks for reading the project description!* `✨`

[**`👆 Back to top`**](#create-new-template)

