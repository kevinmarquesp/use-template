<div align="center">
    <h1>✨ <code>use-template</code> ✨</h1>
       <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"></img>
       <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></img>
</div>
A small and simple tool to clone GitHub repositories and use them as template. When you choose a repo, you can choose which branch you want to use as a template. so you can create a single repository for all your project templates and import these with this app.

<br>

`[ Image here... ]`

<br>


## Instalation

```bash
npm i -g create-new-template # with npm
yarn global add create-new-template # Or, if you are using yarn
```

## Usage

 you don't need to give arguments to the command, but, if you don't, it will ask where is the templates repo, which branch you wanna to use and the project's name (command will not be asked).
```yml
Usage: use-template [PROJECT NAME] -r [USER/REPO] -b [BRANCH] -c [COMMAND]
  or: use-template
A small and simple tool to clone GitHub repositories and use them as template.

      --repo -r       Github repository, you need to specify. Like that: example/examplerepo
      --branch -b     Branch of the repository that have your template. (e.g. main, master, dev...)
      --command -c    Command to run after cloning the repo and before initialize that.
```
Usage example:

```shell
use-template [PROJECT NAME] -r [USER/REPO] -b [BRANCH] -c [COMMAND]
```
(you don't have to follow any pattern.)


## Todo

- [X] Improve my english in README...
- [X] Publish on NPM


##

![](https://img.shields.io/badge/GNU_General_Public_Licence_v3.0-E58080?style=for-the-badge&logo=bookstack&logoColor=white)

Thanks for reading the project description! `<3`

[👆 Back to top](#top)

