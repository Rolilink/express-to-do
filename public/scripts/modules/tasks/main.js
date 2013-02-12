require.config({
  paths: {
    jquery: '../../libs/jquery',
    mediator: '../../libs/mediator',
    datepicker: '../../libs/datepicker',
    bootstrap: '../../libs/bootstrap',
    app: 'taskapp',
    formModule: 'form',
    endpoint: 'endpoint'
  },
  shim:{
  	datepicker:{
  		deps: ['bootstrap']
  	},
  	bootstrap:{
  		deps: ['jquery']
  	}
  }

});

require([
	'app',
	'jquery'
], function(app,$){
	$(document).ready(function(){
		app.initialize();
	});
});