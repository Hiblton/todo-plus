var express = require("express");
var bodyParser = require("body-parser");
var pg = require('pg');
var pool = new pg.Pool({
  database: 'todo',
  user: 'postgres',
  password: 1234,
  connectionString: process.env.DATABASE_URL //for deployment on Heroku
});

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(request, response) {
    response.render('dist/index.html');
});

/*  "/api/tasks/"
 *    GET: finds all tasks
 *    POST: creates a new task
 */
app.get('/api/tasks/', function (request, response) {
  var queryObj = {
    text: 'SELECT * FROM tasks ORDER BY id'
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
      } else {
        response.status(200).json({results: result.rows});
      }
      done();
    });
  });
});

app.post("/api/tasks/", function(request, response) {
  if (!request.body.name) {
    handleError(response, "Invalid user input", "Must provide a name of task.", 400);
    return;
  }

  var queryObj = {
    text: 'INSERT INTO tasks(name, date) VALUES($1, $2)',
    values: [request.body.name, new Date()]
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to create task.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

/*  "/api/tasks/:id"
 *    GET: finds details of a task
 *    POST: marks as done
 *    PUT: edites a task
 *    DELETE: deletes a task
 */
app.get('/api/tasks/:id', function (request, response) {
  var queryObj = {
    text: 'SELECT * FROM tasks WHERE id=$1',
    values: [request.params.id]
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get task's details.");
      } else {
        response.status(200).json({results: result.rows});
      }
      done();
    });
  });
});


app.post('/api/tasks/:id', function (request, response) {
  var queryObj = {
    text: 'UPDATE tasks SET is_done=TRUE WHERE id=$1',
    values: [request.params.id]
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to mark task as done.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

app.put('/api/tasks/:id', function (request, response) {
  if (!request.body.name) {
    handleError(response, "Invalid user input", "Must provide a name of task.", 400);
    return;
  }

  var queryObj = {
    text: 'UPDATE tasks SET name=$1 WHERE id=$2',
    values: [request.body.name, request.params.id]
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to update task.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

app.delete('/api/tasks/:id', function (request, response) {
  var queryObj = {
    text: 'DELETE FROM tasks WHERE id=$1',
    values: [request.params.id]
  };
  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to delete task.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

// Generic error handler used by all endpoints.
function handleError(response, reason, message, code) {
  console.log("ERROR: " + reason);
  response.status(code || 500).json({"error": message});
}
