zebra-client
============

Just-in-time label printing with the Zebra ZP450 using node.js + Easypost + Pusher. A merger of high and low tech.

We use this at yerdle to print labels for shipments.

[Read this blog post for background and usage details.](http://codesmaller.com/just-in-time-shipping-at-yerdle/)

### Test
- git clone zebraclient (from OMCO account)
- npm install in zebra client
- Test locally:
  - Grab the Queue Name from Printers
  - ``` ZEBRA_PRINT_QUEUE_NAME=<name> node zebra.js ```
  - If you're moving the printer to a new machine, change the otherbom environment variable PRINTER_ENDPOINT to be the new IP

### Launch
- Create a launch script for OSX and launch is (see below)

## Launching the zebra client on OSX

### Set environment variables
export KEY=value

### Generate and load a plist file on mac
Install dependencies with npm install. This installs node-mac (https://github.com/coreybutler/node-mac) which is used to generate the plist file and place it in /Library/LaunchDaemons folder.

1. Run ``` npm install ```
2. Run the following code to create the plist and load it
```
sudo SCRIPT_PATH=<absolute_path_to_script> node osx/zebra-socket-client/OSX-install-plist.js  // IE SCRIPT_PATH=/Users/cassyjens/Projects/zebra-client/
```
The script will output error/success text based on error/success.

**Logs**: The script generates two log files (console output and error output) found in the directory /Library/Logs/Zebra Printer Web Server.

### Unload a plist file on mac
```
sudo SCRIPT_PATH=<absolute_path_to_script> node osx/zebra-socket-client/OSX-uninstall-plist.js
```

## Steps to configure Zebra Printer
- Plug it into computer
- Go to localhost:631 in a browser. In the browser, you may see message: if cups hasn't been enabled, run the command line (cupsctl WebInterface=yes. Do that if message exists.
- Reload webpage
- Go to Administration, Add Printer
- Enter admin acct. of machine
-   Choose from a list of printers (Zebra in this case)
-   Share printer
-   Select Raw for Make
-   Continue
-   Raw Queue (en) for model
-   Click: add printer
-   Set default options
