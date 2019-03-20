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
// all game commands
// 
// might want to split these commands up into more readable objects
// could group them with alias options

var main_conmmands = {
  	get die() {
		requestGameInfo('die');
    	return "die";
  	},
  	get drop() {
		requestGameInfo('drop');
    	return "drop";
  	},
  	get inventory() {
		requestGameInfo('inventory');
    	return "inventory";
  	},
  	get look() {
		requestGameInfo('look');
    	return "look";
  	},
  	get take() {
		requestGameInfo('take');
    	return "take";
  	},
  	get use() {
		requestGameInfo('use');
    	return "use";
  	},
  	get restart(){
  		// need to clean up this restart function
  		// will need to add it to the api
  		// its currently calling it twice
  		requestGameInfo('die');
  		requestGameInfo('get games');
  	}
}

var view = {
	get helmet() {
		requestGameInfo('look helmets');
    	return "Look at Helmet";
  	},
  	get notes() {
		requestGameInfo('look note');
    	return "Look at Note";
  	},
  	get sign() {
		requestGameInfo('look sign');
    	return "Look at Sign";
  	},
}

var take = {
	get helmet() {
		requestGameInfo('take helmet');
    	return "Take Helmet";
  	}
}

var use = {
	get helmet() {
		requestGameInfo('use helmet');
    	return "Use Helmet";
  	}
}

var exits = {
	get inside() {
		requestGameInfo('go inside');
    	return "Inside";
  	},
  	get outside(){
  		requestGameInfo('go Outside');
    	return "Outside";
  	},
  	get deeper(){
  		requestGameInfo('go Deeper');
    	return "Deeper";
  	}
}

var games = {
	get gold_mine() {
		requestGameInfo('load gold_mine');
    	return "load gold_mine";
  	},
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
// game commands
// 

_.extend(window, main_conmmands, games, exits);

// init game
main_conmmands.restart;






// ############################################################
// TO DO
// 

// Setup demo working in a web page being served by Apache
// Express is an API

// - create a statement that tells you all the current commands
// - have this triggered at the start

// - certain rooms might need to load objects into console window prop
// - same as above, but with items in inventory

// - game needs an end screen
// - maybe game over ascii

// - need some aliasing for plural commands
// - maybe have warning message of what the commands are

// - have it print out how many commands it took you to win
// - what is the least amount of moves it takes




























