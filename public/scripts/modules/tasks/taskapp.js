define([
	'form'
	,'endpoint'
	],
	function(){
		var modules = Array.prototype.slice.call(arguments);
		function initialize(){
			for(key in modules){
				modules[key].initialize();
			}
		}

		return{
			initialize: initialize
		}
	}
)