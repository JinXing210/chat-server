//-------------------------------------------------------//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var	https = require('https');
//-------------------------------------------------------//
// var hskey = fs.readFileSync('key.pem');
// var hscert = fs.readFileSync('cert.pem');
// var options = {
//     key: hskey,
//     cert: hscert
// };
//-------------------------------------------------------//
// Setting environment
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/client'));
//-------------------------------------------------------//
// Start the app by listening on <port>
// var port = process.env.PORT || 443;
// var port = process.env.PORT || 443;
 var port = process.env.PORT || 80;
//-------------------------------------------------------//
// var options =
// {
//   key:  fs.readFileSync('keys/server.key'),
//   cert: fs.readFileSync('keys/server.crt')
// };
// var options = {
//   key:  fs.readFileSync('keys/privkey.pem'),
//   cert: fs.readFileSync('keys/cert.pem')
// //   ca: fs.readFileSync('keys/fullchain.pem')
// };
var server = app.listen(port, function(){
    console.log("Live Video Chat Server has started on port " + port);
});
// var server = https.createServer(options, app).listen(port, function(){
//     console.log("Live Video Chat Server has started on port " + port);
// });

require('./chat-server/socket_server');
//-------------------------------------------------------//
// RESTful API for client
//-------------------------------------------------------//
app.get('/', function(req, res) {
    console.log( "index.html/"+req.params );
    res.render('index.html');
});
