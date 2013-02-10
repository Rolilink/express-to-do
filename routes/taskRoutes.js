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
			var values = {
				duedate: new Date(req.body.duedate)
				,priority: req.body.priority
				,tag : req.body.tag
				,content: req.body.content
			}
			taskController.createTask(
				values
				,function(task){
					res.status(200);
					res.send({id: task.id});
				},function(error){
					console.log(error);
					res.send(400);
				}
			);
			return;
		}
		res.send(400);
	});

	app.get('/tasks/:id',function(req,res){

	});

	app.put('/tasks/:id',function(req,res){

	});

	app.del('/tasks/:id',function(req,res){

	});
}