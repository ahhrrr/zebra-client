zebra-client
============

Just-in-time label printing with the Zebra ZP450 using node.js + Easypost + Pusher. A merger of high and low tech.

We use this at yerdle to print labels for shipments.

[Read this blog post for background and usage details.](http://codesmaller.com/just-in-time-shipping-at-yerdle/)

### Generate and load a plist file on mac
``` sudo SCRIPT_PATH=<absolute_path_to_script> node osx/OSX-install-plist.js  // IE SCRIPT_PATH=/Users/cassyjens/Projects/zebra-client/
```
### Unload a plist file on mac
``` sudo SCRIPT_PATH=<absolute_path_to_script> node osx/OSX-uninstall-plist.js
```
