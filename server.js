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
app.set('port', (process.env.PORT || 5000));
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

/*  "/api/tasks/"
 *    GET: finds all tasks
 *    POST: creates a new task
 */
app.get('/api/tasks/', function (request, response) {
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
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
  var task = request.body;
  task.createdAt = new Date();

  if (!request.body.name) {
    handleError(response, "Invalid user input", "Must provide a name of task.", 400);
    return;
  }

  const queryObj = {
    text: 'INSERT INTO test_table(name) VALUES($1)',
    values: [request.body.name]
  }

  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
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
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM test_table WHERE id=' + request.params.id, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
      } else {
        response.status(200).json({results: result.rows});
      }
      done();
    });
  });
});


app.post('/api/tasks/:id', function (request, response) {
  // var task = request.body;
  // task.updatedAt = new Date();

  const queryObj = {
    text: 'UPDATE test_table SET done=TRUE WHERE id=$1',
    values: [request.params.id]
  }

  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

app.put('/api/tasks/:id', function (request, response) {
  // var task = request.body;
  // task.updatedAt = new Date();

  if (!request.body.name) {
    handleError(response, "Invalid user input", "Must provide a name of task.", 400);
    return;
  }

  const queryObj = {
    text: 'UPDATE test_table SET name=$1 WHERE id=$2',
    values: [request.body.name, request.params.id]
  }

  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
      } else {
        response.status(200).json({results: true});
      }
      done();
    });
  });
});

app.delete('/api/tasks/:id', function (request, response) {
  if (!request.params.id) {
    handleError(response, "Invalid user input", "Must provide a name of task.", 400);
    return;
  }

  const queryObj = {
    text: 'DELETE FROM test_table WHERE id=$1',
    values: [request.params.id]
  }

  pool.connect(function(err, client, done) {
    client.query(queryObj, function(err, result) {
      if (err) {
        handleError(response, err.message, "Failed to get tasks.");
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
