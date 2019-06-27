/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

PostgreSQL DB table name is: 'todos'
=================================================================*/

var pool = require('../config');
var query = require('../query');
var results = [];
// console.log(query);
module.exports = {
	/*================================================================
	CREATE - $http post
	=================================================================*/
	//create todo and send back all todos after creation
	createTodo: function(req, res) {
		results = [];

		//Data to be saved to the DB - taken from $http request packet
		var data = {
			text: req.body.text,
			done: false
		};

		// get a pg client from the connection pool
		pool.connect(function(err, client, done) {
			console.log(client);
			if (err) {
				console.log('Can not connect to the DB ' + err);
			}
			if (client) {
				console.log(query);
				client.query(query.INSERT, [data.text, data.done]);

				// var query = client.query(query.GETALLTODOBYASC);

				client.query(this.GETALLTODOBYASC, function(err, result) {
					done();
					if (err) {
						console.log(err);
						res.status(400).send(err);
					}
					res.status(200).send(result);
				});

				// //can stream row results back 1 at a time
				// query.on('row', function(row) {
				// 	results.push(row);
				// });

				// //fired after last row is emitted
				// query.on('end', function() {
				// 	client.end();
				// 	return res.json(results); // return all todos in JSON format
				// });
			}
		});
	},

	/*================================================================
	READ - $http get
	=================================================================*/
	//Get all todos in the database
	getTodos: function(req, res) {
		results = [];
		// console.log(query);
		// get a pg client from the connection pool
		pool.connect(
			function(err, client, done) {
				// console.log(err, client, done);
				// console.log('this', this);

				if (err) {
					console.log('Can not connect to the DB ' + err);
				}
				if (client) {
					// var query = client.query(this.GETALLTODOBYASC).then(response => {
					// 	console.log('response', response);
					// });
					// console.log('query', query);

					//can stream row results back 1 at a time
					// query.on('row', function(row) {
					// 	results.push(row);
					// });

					// //fired after last row is emitted
					// query.on('end', function() {
					// 	client.end();
					// 	return res.json(results); // return all todos in JSON format
					// });

					client.query(this.GETALLTODOBYASC, function(err, result) {
						done();
						if (err) {
							console.log(err);
							res.status(400).send(err);
						}
						res.status(200).send(result);
					});
				}
			}.bind(query)
		);
	},

	/*================================================================
	UPDATE - $http put
	=================================================================*/
	updateTodo: function(req, res) {
		results = [];

		var id = req.params.todo_id;

		var data = {
			text: req.body.text,
			done: req.body.done
		};

		console.log('ID= ' + id); //TEST

		// get a pg client from the connection pool
		pool.connect(function(err, client, done) {
			if (err) {
				console.log('Can not connect to the DB ' + err);
			}
			if (client) {
				client.query(query.UPDATE, [data.text, data.done, id]);
				var query = client.query(query.GETALLTODOBYASC);

				//can stream row results back 1 at a time
				query.on('row', function(row) {
					results.push(row);
				});

				//fired after last row is emitted
				query.on('end', function() {
					client.end();
					return res.json(results); // return all todos in JSON format
				});
			}
		});
	},

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	deleteTodo: function(req, res) {
		results = [];
		var id = req.params.todo_id;

		console.log('id= ' + id); //TEST

		// get a pg client from the connection pool
		pool.connect(function(err, client, done) {
			if (err) {
				console.log('Can not connect to the DB ' + err);
			}
			if (client) {
				client.query(query.DELETE, [id]);

				var query = client.query(query.UPDATE);

				//can stream row results back 1 at a time
				query.on('row', function(row) {
					results.push(row);
				});

				//fired after last row is emitted
				query.on('end', function() {
					client.end();
					return res.json(results); // return all todos in JSON format
				});
			}
		});
	}
};
