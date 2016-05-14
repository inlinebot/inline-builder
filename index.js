const express = require('express');
const request = require('superagent');
const app = express();
pushToDockerhub = require('./push-to-dockerhub');
deployToRancher = require('./deploy-to-rancher');

app.get('/build', (req, res) => {
  if (process.env.ACCESS_KEY != req.query.accessKey) {
    res.send({ message: 'Unauthorized '});
    return;
  }
  res.send({ message: 'Build script started' });
  console.log('requested');
  try {
    pushToDockerhub(req.query.username, req.query.repository, req.query.moduleName);
    console.log('built');
    request.get(`${req.query.callback}/${req.query.moduleName}?status=deploying`).end();
    deployToRancher(req.query).then(() => {
      console.log('deployed')
      request.get(`${req.query.callback}/${req.query.moduleName}?status=live`).end();
    }).catch((e) => {
      throw e;
    });
  } catch (e) {
    request.get(`${req.query.callback}/${req.query.moduleName}?status=error`).end();
    console.log('error');
  }
});

app.get('/deploy', (req, res) => {
  deployToRancher(req.query.moduleName, true).then(() => {
    console.log('deployed');
    // request.get(`${req.query.callback}/${req.query.moduleName}?status=live`).end();
  }).catch((e) => {
    console.log(e);
    res.send(e);
    throw e;
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}!`);
});