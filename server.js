var express = require( 'express' );
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Go to office',
	completed: false
},{
	id: 2,
	description: 'Go to home',
	completed: false
},{
	id: 3,
	description: 'Played game',
	completed: false
}];

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

app.listen( PORT, function(){
	console.log( 'Running Todo Api Server at ' + PORT );
});