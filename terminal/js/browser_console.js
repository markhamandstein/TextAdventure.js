// ############################################################
// _. - utlity object
// 
// _.extend -  mixin function for objects 
// 
// can mixin multiple objects
// 
// Object.getOwnPropertyDescriptor() - get props of object without using prototype chain.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
// 
// Object.defineProperty()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

var _ = {};

_.extend = function(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {

        var descriptor, prop;

        if (source) {
            for (prop in source) {
            	
                descriptor = Object.getOwnPropertyDescriptor(source, prop);
                // create new object with new props
                Object.defineProperty(obj, prop, descriptor);
            }
        }
    });
    return obj;
};

// ############################################################
// create game command object to be put on window
// 

function create_command_obj(command, directive){
	var full_command = directive + " " + command;
		full_command = full_command.trim();

	return {
		get [command]() {
	  		requestGameInfo(full_command);
	  		return full_command; 
		}
	}
}

// ############################################################
// create game objects to be placed on the window
// 

function create_window_commands(commands, directive){
	for (let command of commands) {
		const command_object = create_command_obj(command, directive);
		const descriptor = Object.getOwnPropertyDescriptor(command_object, command);
        Object.defineProperty(window, command, descriptor);
	}
}

// ############################################################
// create game objects (action.object)
// 

function create_interactive_objects(commands, directive){
	let interactive_object = {};

	for (let command of commands) {
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

// gold game
const game_commands 		= ['die', 'restart', 'inventory' ];
const game_views 			= ['helmets', 'note', 'sign' ];
const game_take 			= ['helmet'];
const game_use 				= ['helmet'];
const game_exits 			= ['inside', 'outside', 'Deeper'];
const game_cartridges 		= ['gold_mine'];

create_window_commands(game_commands, '');
create_window_commands(game_cartridges, 'load');
create_window_commands(game_exits, 'go');

const look = create_interactive_objects(game_views, 'look');
const take = create_interactive_objects(game_take, 'take');
const use = create_interactive_objects(game_use, 'use');
const drop = create_interactive_objects(game_take, 'drop');

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

// 4
// clean up code for object creation



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




























