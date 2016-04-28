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
		return res.status( 404 ).send({ "error": "Something is wrong white post a todo item" });
	}
	body.id = todosId;
	body.description = body.description.trim();		
	todos.push( body );
	todosId++;
	res.json( body );
});

// DELETE /todos/:id

app.delete( '/todos/:id', function( req, res ) {	
	var todosId	 = parseInt( req.params.id );
	var matchedTodo = __.findWhere( todos, { id: todosId } );
	if ( !matchedTodo ){
		return res.status( 404 ).json({ "error": "no todo found with that id" });
	}
	todos = __.without( todos, matchedTodo );
	res.status( 200 ).json( matchedTodo );
});

//PUT /todos/:id

app.put( '/todos/:id', function( req, res ) {
	var body = __.pick( req.body, "description", "completed" );
	if ( !body.hasOwnProperty( 'completed' ) || !__.isBoolean( body.completed ) ){
		return res.status( 404 ).send({ "error": "Something wrong with completed property" });	
	}else if( !body.hasOwnProperty( 'description') || !__.isString( body.description) || body.description.trim().length == 0 ){
		return res.status( 404 ).send({ "error": "Something wrong with description property" });
	}
	var todosId = parseInt( req.params.id );
	var matchedTodo = __.findWhere( todos, { id: todosId } );
	if( !matchedTodo ){
		return res.status( 400 ).json({ // 400 mean Bad Request // 404 mean Page not found
			"error": "Cannot find todo item by given id "
		});
	}
	body.description = body.description.trim();
	__.extend( matchedTodo, body );
	/*body.id = todosId;
	var todoIndexOf = __.indexOf( todos, matchedTodo );	
	todos[todoIndexOf] = body;*/
	res.json( matchedTodo );	
});
app.listen( PORT, function(){
	console.log( 'Running Todo Api Server at ' + PORT );
});