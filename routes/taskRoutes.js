module.exports = function(app,mongoose){
	var Task = (require('../models/task'))(mongoose);
	var taskController = (require('../controllers/taskController'))(Task);
	app.get('/tasks',function(req,res){
		
	});

	app.get('/test',function(req,res){
		res.render('test',{});
	});


	app.post('/tasks',function(req,res){
		if(req.get('content-type') == 'application/json'){
			taskController.createTask(
				req.body
				,function(task){
					res.status(200);
					res.send({id: task.id});
					res.end();
				},function(error){
					console.log(error);
					res.send(400);
					res.end();
				}
			);
			return;
		}
		res.send(400);
	});

	app.get('/tasks/:id',function(req,res){
		taskController.getTask(
			req.params.id
			,function(task){
				var rvalue = task.toJSON();
				res.json(rvalue);
				res.end();
				return;
			}
			,function(error){
				if(error){
					console.log(error);
				}
				res.send(400);
				res.end();
				return;
			}
		);
	});

	app.put('/tasks/:id',function(req,res){
		if(req.get('content-type') == 'application/json'){
			taskController.updateTask(
				req.params.id
				,req.body
				,function(task){
					res.status(200);
					res.send(task);
					res.end();
				},function(error){
					console.log(error);
					res.send(400);
					res.end();
				}
			);
			return;
		}
		res.send(400);
	});

	app.del('/tasks/:id',function(req,res){
		console.log('entro');
		taskController.deleteTask(
				req.params.id
				,function(){
					res.status(200);
					res.send('Task Deleted:' + req.params.id);
					res.end();
				}
				,function(error){
					console.log(error);
					res.send(400);
					res.end();
				}
			);
	});
}