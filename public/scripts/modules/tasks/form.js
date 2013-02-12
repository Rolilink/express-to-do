define([
	'mediator',
	'jquery',
	'bootstrap',
	'datepicker'
	],
	function(){
		var formid,contentid,duedateid,tagid,priorityid,addbtn,updatebtn;
		var formMode;
		var TasktoUpdate;
		var modules = Array.prototype.slice.call(arguments);
		var Mediator = modules[0];

		function changeToUpdate(values){
			if(formMode == 'create'){
				$(addbtn).remove();
				$(formid).append(updatebtn);
				updatebtn = $('#update-btn');
			}
			uiValues(values);
			TasktoUpdate = values.id;
			formMode = 'update';
			
		}

		function uiValues(values){
			$(contentid).val(values.content);
			$(tagid).val(values.tag);
			$(priorityid).val(values.priority);
			$(duedateid).val(values.date);
		}

		function changeToCreate(){
			if(formMode == 'update'){
				$(updatebtn).remove();
				$(formid).append(addbtn);
			}
			formMode = 'create';
			TasktoUpdate = 'none';
		}

		function initializeUI(){
			contentid = '#content-input';
			dateid = '#date-input';
			priorityid = '#priority-input';
			tagid = '#tag-input';
			duedateid = '#date-input';
			formid = '#sidemenu';
			addbtn = $('button#add-btn');
			updatebtn = '<button class="btn btn-success" id="update-btn">Update</button>'
		}

		function addTask(event){
			var task = {
				content: $(contentid).val()
				,duedate: $(dateid).val()
				,priority: $(priorityid).val()
				,tag: $(tagid).val()
			}
			Mediator.publish('create-task',task);
		}

		function updateTask(event){

		}

		function initialize(){
			initializeUI();
			$(dateid).datepicker();
			formMode = 'create';
			$(formid).delegate('button#add-btn','click',addTask);
			$(formid).delegate('button#update-btn','click',updateTask);
			$(formid).submit(function(event){
				event.preventDefault();
			});
		}
		return{
			initialize: initialize
		}
	}
)