const ejs = require('ejs');
const fs = require('fs');
const execSync = require('child_process').execSync;

const templateString = `{
  "builders":[{
    "type": "docker",
    "image": "node:5",
    "commit": true
  }],
  "provisioners":[
    {
      "type": "shell",
      "inline": [
        "git clone https://github.com/<%= username %>/<%= repository %>.git <%= moduleName %>",
        "cd <%= moduleName %>",
        "npm install"
      ]
    }
  ],
  "post-processors": [
    [
      {
        "type": "docker-tag",
        "repository": "inlinebot/module-<%= moduleName %>",
        "tag": "latest",
        "force": true
      },
      {
        "type": "docker-push",
        "login": true,
        "login_email": "<%= dockerHub.email %>",
        "login_username": "<%= dockerHub.username %>",
        "login_password": "<%= dockerHub.password %>"
      }
    ]
  ]
}`;

const template = ejs.compile(templateString);

module.exports = (username, repository, moduleName) => {
  const dockerHub = {
    email: process.env.DOCKERHUB_EMAIL,
    username: process.env.DOCKERHUB_USERNAME,
    password: process.env.DOCKERHUB_PASSWORD
  };
  fs.writeFileSync(`module-${moduleName}.json`, template({ username, repository, dockerHub, moduleName }));
  execSync(`packer build module-${moduleName}.json`, { stdio:[0,1,2] });
  fs.unlinkSync(`module-${moduleName}.json`);
};