var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
var life_table = null;
var response_data = null;

fs.readFile('life-table.json', function(err, data) {
  if (err) throw err;
  life_table = JSON.parse(data);
  console.log("Read life table.");
});

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/', function(request, response) {
  var user = request.body;
  console.log("Sex: " + user.sex + ", Age: " + user.age);
  response_data = {life_expectancy: life_table[user.sex][user.age]};
  console.log("Life expectancy: " + response_data.life_expectancy);
  response.status(200).send(JSON.stringify(response_data));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
