define([
	'mediator',
	'jquery'
	],
	function(Mediator,$){
		var url = '/tasks'
		var contentType = 'application/json'
		var dataType = 'json'

		function returnUrl(url,id){
			return url + '/' + id;
		}

		function createTask(data){
			console.log(data);
			$.ajax({
				contentType: contentType
				,data: JSON.stringify(data)
				,dataType: dataType
				,type:'POST'
				,url: url
				,success: function(data){
					console.log(data);
				}
				,error: function(error){
					console.log(error);
				}
			});
		}

		function updateTask(data){
			$.ajax({
				contentType: contentType
				,data: JSON.stringify(data.task)
				,dataType: dataType
				,type:'POST'
				,url: returnUrl(url,data.id)
				,success: function(data){
					console.log(data);
				}
				,error: function(error){
					console.log(error);
				}
			});
		}

		function deleteTask(data){
			$.ajax({
				contentType: "text/plain"
				,type:'DELETE'
				,url: returnUrl(url,data.id)
				,success: function(data){
					console.log(data);
				}
				,error: function(error){
					console.log(error);
				}
			});
		}

		function initialize(){
			$(document).ready(function(){
				Mediator.subscribe('create-task',createTask,this);
				Mediator.subscribe('delete-task',deleteTask,this);
				Mediator.subscribe('update-task',updateTask,this);
			});
		}

		return{
			initialize: initialize
		}
	}
)