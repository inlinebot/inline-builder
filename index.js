const express = require('express');
const request = require('superagent');
const app = express();
pushToDockerhub = require('./push-to-dockerhub');
app.get('/build', (req, res) => {
  if (process.env.ACCESS_KEY != req.query.accessKey) {
    res.send({ message: 'Unauthorized '});
    return;
  }
  res.send({ message: 'Build script started' });
  console.log('requested');
  try {
    pushToDockerhub(req.query.username, req.query.repository, req.query.moduleName);
    console.log('success');
    request.get(`${req.query.callback}/${req.query.moduleName}?status=built`).end();
  } catch (e) {
    request.get(`${req.query.callback}/${req.query.moduleName}?status=error`).end();
    console.log('error');
  }
})
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}!`);
});