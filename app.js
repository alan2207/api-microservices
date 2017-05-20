// importing required packages
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


// importing controllers
var timestamp = require('./controllers/timestamp');
var whoami = require('./controllers/whoami');
var getFileMeta = require('./controllers/get-file-meta');
var shortenURL = require('./controllers/url-shortener');
var imageSearch = require('./controllers/image-search');

var app = express();

// adding middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.static(__dirname + '/public'));



// MICROSERVICES:

// timestamp microservice
timestamp(app);


// request-header-parser microservice
whoami(app);


// file-metadata microservice
getFileMeta(app);


// URL shortener microservice
shortenURL(app);


// image search microservice
imageSearch(app);



// index route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}) 


app.listen(3000, function() {
    console.log('Server started on localhost:3000');
});