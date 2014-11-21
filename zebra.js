//  Zebra client by Carl Tashian, yerdle.
//  Modified by Ezra Spier
//  Modified by Cassy Jens (converted from coffee to js)
//
//  To run in debug mode and output labels to a file instead of a printer,
//  $ node zebra.js debug

var DEBUG, app, bodyParser, child_process, cors, dotenv, express, fs, request;

dotenv = require('dotenv');
dotenv.load();

console.log("starting server...");
console.log("print queue: ", process.env.ZEBRA_PRINT_QUEUE_NAME);

child_process = require('child_process');
fs = require('fs');
request = require('request');
express = require('express');
cors = require('cors');
bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cors());

DEBUG = process.argv[2] === 'debug';

if (DEBUG) {
  console.log("Running in debug mode");
}

app.post('/print', function(req, res) {
  console.log("post");
  var label, lpr;

  label = req.body.label;

  if (DEBUG) {
    console.log(label);
    lpr = child_process.spawn("bash", ['-c', "cat > label"]);
  } else {
    lpr = child_process.spawn("lp", ['-d', process.env.ZEBRA_PRINT_QUEUE_NAME, '-o', 'raw']);
  }

  lpr.stdout.pipe(process.stdout);
  lpr.stdin.write(label);
  lpr.stdin.end();
  lpr.on('close', function(code) {
    if (DEBUG) {
      return console.log("Child process exit with code " + code);
    }
  });

  return res.send('Added to print queue.');
});

app.listen(4000);
