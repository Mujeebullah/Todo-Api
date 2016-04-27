var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();

var PORT = process.env.PORT || 3000;

var todos = [];
var todosId = 1;

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded( { extended: false } );

app.use( jsonParser );

app.get( '/todos', function( req, res){	
	res.json( todos );	
});

app.get( '/todos/:id', function( req, res){
	console.log( 'Asking for todo with id of '+ req.params.id );
	var matchedTodo;
	todos.forEach( function (todo){
		if ( parseInt( req.params.id )  === todo.id ){
			matchedTodo = todo;
		}
	});
	if ( matchedTodo ){
		res.json( matchedTodo );
	}else{
		res.status(404).send();
	}
});

app.get( '/', function( req, res){
	res.send( 'Todo Api Root' );
});

//POST /todos

app.post( '/todos', function( req, res ){	
	var body = req.body;
	body.id = todosId;
	todos.push( body );
	console.log( todos );
	res.json( body );
	todosId++;
});

app.listen( PORT, function(){
	console.log( 'Running Todo Api Server at ' + PORT );
});