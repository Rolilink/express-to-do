module.exports = function(mongoose){
	function validateDate(value){
		return (value >= new Date()) && value;
	}

	function validatePriority(priority){
		return(priority > 0 && priority < 4 && priority);
	}

	function validateContent(content){
		return( content.length > 0 && content.length < 140 && content) ;
	}

	var schema = mongoose.Schema({
		duedate: {
			type: Date
			,validate: [validateDate,"invalid date"]
			,default: function(){
				var nowDate = new Date();
				nowDate.setHours(nowDate.getHours() + 1);
				return nowDate;
			}
		}
		,priority: {
			type: Number
			,validate: [validatePriority,"invalid priority"]
			,default: 1
		}
		,tag: String
		,content: {
			type:String
			,validate:[validateContent,"invalid content"]
		}
		,completed: {
			type:Boolean
			,default:false
		}
	});
	var Task = mongoose.model('Task',schema);
	return Task;
};