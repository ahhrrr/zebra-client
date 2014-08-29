# Zebra client by Carl Tashian, yerdle.
# Modified by Ezra Spier
#
# To run in debug mode and output labels to a file instead of a printer,
#  $ coffee zebra.js.coffee debug

dotenv = require('dotenv')
dotenv.load()

child_process = require('child_process')
fs = require('fs')
request = require('request')
express = require('express')
bodyParser = require('body-parser')

app = express()
app.use(bodyParser.urlencoded(
  extended: true
))
app.use(bodyParser.json())

DEBUG = (process.argv[2] == 'debug')
console.log "Running in debug mode" if DEBUG

app.post '/print', (req, res) ->
  label = req.body.label
  if DEBUG
    console.log label
    lpr = child_process.spawn "bash", ['-c', "cat > label"]
  else
    lpr = child_process.spawn "lp", ['-d', process.env.ZEBRA_PRINT_QUEUE_NAME, '-o', 'raw']

# pipe child process output to script output
  lpr.stdout.pipe(process.stdout);

  lpr.stdin.write(label)
  lpr.stdin.end()
  lpr.on 'close', (code) ->
    console.log "Child process exit with code #{code}" if DEBUG
  res.send('Added to print queue.')

app.listen(3000)

