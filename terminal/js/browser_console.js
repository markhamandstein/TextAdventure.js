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

var console_conmmands = {
	get load() {
		requestGameInfo('load gold_mine');
    	return "load";
  	},
}

var o = {
	get fast() {
		requestGameInfo('load gold_mine');
    	return "load";
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

_.extend(window, console_conmmands);

// init game
requestGameInfo('get games');







































