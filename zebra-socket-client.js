/**
 * A socket endpoint for the 'prints' channel.
 */

var DEBUG;
var PusherClient;
var child_process;
var dotenv;
var fs;
var pres;
var pusher_client;
var request;

dotenv = require('dotenv');
dotenv.load();
PusherClient = require('pusher-node-client').PusherClient;
child_process = require('child_process');
fs = require('fs');
request = require('request');
DEBUG = process.argv[2] === 'debug';

if (DEBUG) {
  console.log("Running in debug mode");
}

pusher_client = new PusherClient({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET
});

pres = null;

pusher_client.on('connect', function() {
  console.log('pusher_client has connected to heroku web server');

  pres = pusher_client.subscribe('prints');
  console.log('pusher_client has subscribed to prints');

  return pres.on('print', function (data) {
    var label = data.label;
    var lpr;

    if (DEBUG) {
      console.log(label);
      lpr = child_process.spawn("bash", ['-c', "cat > label"]);
    } else {
      lpr = child_process.spawn("lpr", ['-P', process.env.ZEBRA_PRINT_QUEUE_NAME, '-o', 'raw']);
    }

    lpr.stdout.pipe(process.stdout);
    lpr.stdin.write(label);
    lpr.stdin.end();
    lpr.on('close', function(code) {
      if (DEBUG) {
        return console.log("Child process exit with code " + code);
      }
    });

    console.log('added to print queue');
  });
});

pusher_client.connect();
