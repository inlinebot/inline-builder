const express = require('express');
const request = require('superagent');
const app = express();
pushToDockerhub = require('./push-to-dockerhub');
app.get('/:username/:repository', (req, res) => {
  if (process.env.ACCESS_KEY != req.query.accessKey) {
    res.send({ message: 'Unauthorized '});
    return;
  }
  res.send({ message: 'Build script started' });
  console.log('requested');
  try {
    pushToDockerhub(req.params.username, req.params.repository);
    console.log('success');
    request.get(`${req.query.callback}/${req.params.username}/${req.params.repository}?status=success`).end();
  } catch (e) {
    request.get(`${req.query.callback}/${req.params.username}/${req.params.repository}?status=error`).end();
    console.log('error');
  }
})
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}!`);
});