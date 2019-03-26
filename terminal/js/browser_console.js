// ############################################################
// Object.getOwnPropertyDescriptor() - get props of object without using prototype chain.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
// 
// Object.defineProperty()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty


// ############################################################
// create game command object
// 

function create_command_obj(command, directive){
	return {
		get [command]() {
	  		requestGameInfo(directive);
	  		return directive; 
		}
	}
}

// ############################################################
// create single commands
// 

function create_single_command(commands){
	const entries = Object.entries(commands);
	for (const [command, directive] of entries) {
		const command_object = create_command_obj(command, directive);
		const descriptor = Object.getOwnPropertyDescriptor(command_object, command);
  		Object.defineProperty(window, command, descriptor);
	}
}

// ############################################################
// create interactive commands (action.object)
// 

function create_interactive_commands(commands){
	let interactive_object = {};

	const entries = Object.entries(commands);

	for (const [command, directive] of entries) {
		const command_object = create_command_obj(command, directive);
		const descriptor = Object.getOwnPropertyDescriptor(command_object, command);
  		Object.defineProperty(interactive_object, command, descriptor);
	}
	return interactive_object;
}

// ############################################################
// ajax request to get more data
// 

function requestGameInfo(gameCommand){
	$.post(window.location.href+'console', {"input": gameCommand}, function(data) {
		message = '> ' + data.response;
		console.log(message);
		
	}).fail(function(){
		console.error('request to server failed')
	});
}

// ############################################################
// all game commands
// 

// single commands
const game_commands 	= { 'die' : 'die',
					 		'restart': 'restart',
					 		'inventory' : 'inventory' };

create_single_command(game_commands);

// interactive commands
const game_cartridges 	= { 'goldmine' : 'load gold_mine' };
const game_views 		= { 'around' : 'look',
					 		'helmets': 'look helmets',
					 		'note'   : 'look note',
					 		'sign'   : 'look sign' };
const game_take			= { 'helmet' : 'take helmet' };
const game_use 	 		= { 'helmet' : 'use helmet' };
const game_drop 		= { 'helmet' : 'drop helmet' };
const game_exits 		= { 'inside' : 'go inside',
					 		'outside': 'go outside',
					 		'Deeper' : 'go Deeper' };

const look = create_interactive_commands(game_views);
const take = create_interactive_commands(game_take);
const use = create_interactive_commands(game_use);
const drop = create_interactive_commands(game_drop);
const go = create_interactive_commands(game_exits);
const load = create_interactive_commands(game_cartridges);

// init game
requestGameInfo('get games');






// ############################################################
// TO DO
// 

// 1
// Setup demo working in a web page being served by Apache
// Express is an API

// 2
// - need to create a restart for the api
 
// 3
// - create a statement that tells you all the current commands
// - have this triggered at the start

// - certain rooms might need to load objects into console window prop
// - same as above, but with items in inventory

// - game needs an end screen
// - maybe game over ascii
// 
// - game needs a start screen
// - ascii logo

// - need some aliasing for plural commands
// - maybe have warning message of what the commands are

// - have it print out how many commands it took you to win
// - what is the least amount of moves it takes

// - Delay loading of game to ensure its after errors could be on the console

























