var express = require('express')
var app = express()
 
app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/app'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/systemjs.config.js', function(req, res, next) {
  res.sendFile('systemjs.config.js', { root: __dirname  });
});

app.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});