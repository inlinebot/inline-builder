const ejs = require('ejs');
const fs = require('fs');
const execSync = require('child_process').execSync;

const templateString = `{
  "builders":[{
    "type": "docker",
    "image": "node:5",
    "commit": true,
  }],
  "provisioners":[
    {
      "type": "shell",
      "inline": [
        "git clone https://github.com/<%= username %>/<%= repository %>.git",
        "cd <%= repository %>",
        "npm install"
      ]
    }
  ],
  "post-processors": [
    [
      {
        "type": "docker-tag",
        "repository": "inlinebot/module-<%= repository %>",
        "tag": "latest"
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

module.exports = (username, repository) => {
  const dockerHub = {
    email: process.env.DOCKERHUB_EMAIL,
    username: process.env.DOCKERHUB_USERNAME,
    password: process.env.DOCKERHUB_PASSWORD
  };
  fs.writeFileSync(`module-${repository}.json`, template({ username, repository, dockerHub }));
  execSync(`packer build module-${repository}.json`, { stdio:[0,1,2] });
  fs.unlinkSync(`module-${repository}.json`);
};