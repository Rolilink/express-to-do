module.exports = function(Task){

	function validateTaskJson(taskjson){
		var rjson = {};
		Task.schema.eachPath(function(pathname,type){
			if(taskjson[pathname]){
				if(type===Date){
					rjson[pathname] = new Date(taskjson[pathname]);
				}else{
					rjson[pathname] = taskjson[pathname];
				}
			}
		});
		return rjson;
	}
	
	return {
		createTask:function(values,successcallback,errorcallback){
			values = validateTaskJson(values);
			var task = new Task(values);
			task.save(function(err){
				if(err){
					errorcallback(err);
					return;
				}
				successcallback(task);
			});
		}
		,deleteTask:function(id,successcallback,errorcallback){
			Task.findByIdAndRemove(id,function(err,task){
				if(err){
					errorcallback(error);
					return;
				}
				successcallback(task);
			});
		}
		,updateTask:function(id,values,successcallback,errorcallback){
			values = validateTaskJson(values);
			Task.findByIdAndUpdate(id,values,function(err,task){
				if(err){
					errorcallback(err);
					return;
				}
				successcallback(task);
			});
		}
		,getTask:function(id,successcallback,errorcallback){
			Task.findById(id,function(err,task){
				if(err ){
					errorcallback(err);
					return;
				}
				if(task){
					successcallback(task);
				}else{
					errorcallback('not found');
				}
				
			});
		}
		,getAllTasks:function(successcallback,errorcallback){
			Task.find({},function(err,tasks){
				if(err ){
					errorcallback(err);
					return;
				}
				if(tasks){
					successcallback(tasks);
				}else{
					successcallback(tasks);
				}
			});
		}
	}
}