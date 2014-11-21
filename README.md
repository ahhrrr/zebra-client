zebra-client
============

Just-in-time label printing with the Zebra ZP450 using node.js + Easypost + Pusher. A merger of high and low tech.

We use this at yerdle to print labels for shipments.

[Read this blog post for background and usage details.](http://codesmaller.com/just-in-time-shipping-at-yerdle/)

### Generate and load a plist file on mac
1. npm install
2. create the plist and load it
``` 
sudo SCRIPT_PATH=<absolute_path_to_script> node osx/OSX-install-plist.js  // IE SCRIPT_PATH=/Users/cassyjens/Projects/zebra-client/
```
The script will output error/success text based on error/success. 
** Logs ** The script generates two log files (console output and error output) found in the directory /Library/Logs/Zebra Printer Web Server.

### Unload a plist file on mac
``` 
sudo SCRIPT_PATH=<absolute_path_to_script> node osx/OSX-uninstall-plist.js
```

