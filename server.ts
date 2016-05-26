var express = require('express')
var app = express()
var request = require('request');
var Promise = require('promise');
var parseString = require('xml2js').parseString;
import { FeedType } from "./app/entities/feed/feed";

app.set('port', (process.env.PORT || 5000));

//main app - completely static 
// app.use(express.static(__dirname + '/app'));

//modules for use in the app (ie angular,etc)
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//main app - completely static 
app.use('/app', express.static(__dirname + '/app'));
app.use('/lib', express.static(__dirname + '/lib'));

app.get('/systemjs.config.js', function(req, res, next) {
  res.sendFile('systemjs.config.js', { root: __dirname  });
});

//default request - load index.html
app.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname  });
});

//google news feed
app.get('/feed/google-news', function(req, res, next) {
  var clientip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  // console.log('Client IP:' + clientip); 
  var url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss" 
    + "&userip=" + clientip;
  request(
    {
      uri: url,
      method: 'GET',
      json: true
    }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.header('Content-Type', 'application/json');      
      body.feedType =  FeedType.GoogleNews;
      res.send(body);
    }
  });
  
});

//Read an xml feed and return as JSON
function xmlFeedToJson(url) {
    return new Promise(function (fulfill, reject) {
      request( {
      uri: url,
      method: 'GET',
      json: true
    }, function (error, response, body) {
          if (!error && response.statusCode == 200) {  
            parseString(body, 
            { 
                tagNameProcessors: [function(name:string) {
                  return name.replace(":","_");
                }],
                trim: true,
                explicitArray: false,
                // ignoreAttrs : true               
            }, function (err, parsedXmlResult) {
              fulfill(parsedXmlResult);
            });
          } else {
            reject(error);
          }
      });
    });
}

//Read an xml feed and return as JSON
app.get('/feed/toJson', function(req, res, next) {
  var url = req.query.url;
  var feedType = req.query.feedType;
  if (!url)
  {
      res.header('Content-Type', 'application/json');
      res.send(null);
  }
  
  xmlFeedToJson(url).then(function(body) {
        res.header('Content-Type', 'application/json');
        body.feedType =  feedType;       
        res.send(body);  
  });    
  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

