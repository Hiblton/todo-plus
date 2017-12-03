var express = require("express");
var bodyParser = require("body-parser");
var pg = require('pg');
var pool = new pg.Pool({
  database: 'todo',
  user: 'postgres',
  password: 1234,
  //connectionString: process.env.DATABASE_URL
});

var app = express();
app.set('port', (process.env.PORT || 5000));
//app.set('view engine', 'html');
app.use(bodyParser.json());
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.get('/', function(request, response) {
    response.render('dist/index.html');
});

app.get('/db', function (request, response) {
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      if (err) {
        console.error(err); response.send("Error " + err);
      } else {
        //response.render('dist/index', {results: result.rows} ); 
        //response.render('index.html');
        response.sendFile('index.html', {root: distDir});
      }
      done();
    });
  });
});
