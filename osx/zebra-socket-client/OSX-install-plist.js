// Created by Cassy Jens
// Run this script to generate and load a .plist file to run a node program

var Service = require('node-mac').Service;

// Create a new service object
var svc = new Service({
  name:'Zebra Printer Web Socket',
  description: 'The Zebra Printer web socket.',
  script: process.env.SCRIPT_PATH + 'zebra-socket-client.js',
  wait: 2,
  grow: .5,
  env: {
    name: 'ZEBRA_PRINT_QUEUE_NAME',
    value: 'Zebra_Technologies_ZTC_GK420t'
  }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
  console.log("service successfully installed");
});

svc.on('alreadyinstalled', function () {
  console.log("service is already installed");
});

svc.on('invalidinstallation', function () {
  console.log("invalid installation");
});

svc.on('error', function () {
  console.log("an error occurred during installation");
});

svc.install();
