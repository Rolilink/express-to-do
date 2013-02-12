define([
	
	],
	function(){
		var modules = Array.prototype.slice.call(arguments);
		function initialize(){
			for(key in modules){
				modules[key].init();
			}
		}

		return{
			initialize: initialize
		}
	}
)