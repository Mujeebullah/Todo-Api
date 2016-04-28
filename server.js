var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var __ = require( 'underscore' );
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
	var todosId = parseInt( req.params.id );
	var matchedTodo = __.findWhere( todos, { id: todosId } );	
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

	var body = __.pick( req.body, "description", "completed" );
	if ( !__.isString( body.description ) ||  !__.isBoolean( body.completed ) || body.description.trim().length == 0 ){
		return res.status( 404 ).send();		
	}
	body.id = todosId;
	body.description = body.description.trim();		
	todos.push( body );
	todosId++;
	res.json( body );
	

});

// DELETE /todos/:id

app.delete( '/todos/:id', function( req, res) {	
	if( !__.isNumber( req.params.id  ) ){	
		return res.status( 404 ).json({
			"error": "Number is not given to delete a specific todo item"
		});
	}
	var todosId	 = parseInt( req.params.id );	
	var matchedTodo = __.findWhere( todos, { id: todosId } );
	if ( !matchedTodo ){
		return res.status( 404 ).json({
			"error": "no todo found with that id"
		});
	}	
	todos = __.without( todos, matchedTodo );
	res.status( 200 ).json( matchedTodo );
});
app.listen( PORT, function(){
	console.log( 'Running Todo Api Server at ' + PORT );
});