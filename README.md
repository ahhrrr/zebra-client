zebra-client
============

Just-in-time label printing with the Zebra ZP450 using node.js + Easypost + Pusher. A merger of high and low tech.

We use this at yerdle to print labels for shipments.

[Read this blog post for background and usage details.](http://codesmaller.com/just-in-time-shipping-at-yerdle/)

### Troubleshooting
The follow items are possible actions to fix a printer issue in OtherMRP.
- Make sure the printer is plugged in, turned on and connected to the USB router.
- If the printer is not working, first try restarting the computer that it is hosted on.
- If the above steps don't work, try uninstalling and reinstalling the daemon (instructions here in this README.md file)
- If this doesn't work, try reinstalling the printer (instructions here in this README.md file)

Helpful tools for diagnosing an issue: On the computer that the Zebra app lives, open the Console app and navigate to "Files" > "/Library/Logs" > "Zebra Printer Web Socket"
and view the logs. The error log file should be empty. The regular log file should update with pings and pongs from Pusher if it is connected. If there is text in the error log, then the daemon likely
crashed and should be restarted. However, it should restart upon a restart of the computer.

### Test
- git clone zebraclient (from OMCO account)
- npm install in zebra client
- Test locally:
  - Grab the Queue Name from Printers
  - ``` ZEBRA_PRINT_QUEUE_NAME=<name> node zebra.js ```
  - If you're moving the printer to a new machine, change the otherbom environment variable PRINTER_ENDPOINT to be the new IP

### Launch
- Create a launch script for OSX and launch it (see below)

## Launching the zebra client on OSX

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
