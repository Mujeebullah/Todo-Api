// Underscore java script
var __ = require( 'Underscore' );
var todos = [{
	id: 1,
	description: 'work at home',
	completed: false
},{
	id: 2,
	description: 'work at office',
	completed: true
},{
	id: 3,
	description: 'paly games',
	completed: true
},{
	id: 4,
	description: 'luch at office',
	completed: false
},{
	id: 5,
	description: 'dinner with mom',
	completed: true
},{
	id: 6,
	description: 'walt the cat',
	completed: false
},{
	id: 7,
	description: 'see movie cliphhard',
	completed: true
},{
	id: 8,
	description: 'chat with friend',
	completed: false
}];

/*var filteredTods = __.filter( todos, function( todo ){	
	return todo.description.indexOf( 'Work' )  > -1 ; 
});
console.log( filteredTods );


filteredTods = __.where( todos, { "completed" : false } );
console.log( filteredTods );*/

/*filteredTods = __.findWhere(todos, { "description": 'work at office' } );
console.log( filteredTods );*/


filteredTods = __.find(todos, function( todo ){
	console.log( todo.description.indexOf( 'work' ) )
	return todo.description.indexOf( 'work' ) > -1;
});
console.log( filteredTods );