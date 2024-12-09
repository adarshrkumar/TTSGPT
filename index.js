var fName = ''

var fs = require('fs')
var request = require('request'); 
var express =  require('express')
var app = express()
  
var newRequest = require('./request.js').default

// User inputs
app.get('/', function(req, res) {
  res.redirect('/create')
})

app.get('/sendRequest', function(req, res) {
  var prompt = req.query.p
  var type = req.query.t
  var voice = req.query.v
  var model = 'hd';
  newRequest(res, prompt, voice, model)
})

app.get('*', function(req, res) {
  var path = req.path
  if (!path.includes('.')) path = `${path}.html`
  res.sendFile(__dirname + path)
})

app.listen(8080)