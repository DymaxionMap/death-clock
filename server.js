var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/', function(request, response) {
  var info = request.body;
  console.log("Sex: " + info.sex + ", Age: " + info.age);
  response.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
