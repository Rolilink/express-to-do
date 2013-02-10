module.exports = function(Task){
	return {
		createTask:function(values,successcallback,errorcallback){
			var task = new Task(values);
			task.save(function(error){
				if(error){
					errorcallback(error);
					return;
				}
				successcallback(task);
			});
		}
		,deleteTask:function(id,successcallback,errorcallback){
			Task.findOneByIdAndRemove(id,function(err,task){
				if(err){
					errorcallback(error);
					return;
				}
				successcallback(task);
			});
		}
		,updateTask:function(id,values,successcallback,errorcallback){
			Task.findOneByIdAndUpdate(id,values,function(err,task){
				if(err){
					errorcallback(error);
					return;
				}
				successcallback(task);
			});
		}
		// options:
		// 		id: task id for searching
		,getTask:function(id,successcallback,errorcallback){
			Task.findById(id,function(err,task){
				if(err){
					errorcallback(err);
					return;
				}
				successcallback(task);
			});
		}
	}
}