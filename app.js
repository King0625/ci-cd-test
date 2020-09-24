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

module.exports = app;