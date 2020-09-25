const express = require('express');

const PID = process.pid;

function log(msg) {
  console.log(`[${PID}]` ,new Date(), msg);
}

const app = express();

app.get('/healthcheck', function healthcheck(req, res) {
  log('they check my health');
  res.send('all good!\n')
});


const crypto = require('crypto');

function randomString() {
  return crypto.randomBytes(100).toString('hex');
}

app.get('/compute-sync', function computeSync(req, res) {
  log('computing sync!');
  const hash = crypto.createHash('sha256');
  for (let i=0; i < 10e6; i++) {
    hash.update(randomString())
  }
  res.send(hash.digest('hex') + '\n');
});


app.get('/compute-async', async function computeAsync(req, res) {
  log('computing async!');

  const hash = crypto.createHash('sha256');

  const asyncUpdate = async () => hash.update(randomString());

  for (let i = 0; i < 10e6; i++) {
    await asyncUpdate();
  }
  res.send(hash.digest('hex') + '\n');
});


app.get('/compute-with-set-timeout', async function computeWSetTimeout (req, res) {
  log('computing async with setTimeout!');

  function setTimeoutPromise(delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), delay);
    });
  }

  const hash = crypto.createHash('sha256');
  for (let i = 0; i < 10e6; i++) {
    hash.update(randomString());
    await setTimeoutPromise(0);
  }
  log('done ' + req.url);
  res.send(hash.digest('hex') + '\n');
});


module.exports = app;