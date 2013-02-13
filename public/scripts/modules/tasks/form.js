define([
	'mediator',
	'jquery',
	'bootstrap',
	'datepicker'
	],
	function(){
		var formid,contentid,duedateid,tagid,priorityid,addbtn,updatebtn,cancelbtn;
		var formMode;
		var TasktoUpdate;
		var modules = Array.prototype.slice.call(arguments);
		var Mediator = modules[0];

		function changeToUpdate(values){
			cleanFields();
			if(formMode == 'create'){
				$(addbtn).remove();
				$(formid).append(updatebtn);
				$(formid).append(cancelbtn);
				updatebtn = $('#update-btn');
				cancelbtn = $('#cancel-btn');
			}
			uiValues(values);
			TasktoUpdate = values.id;
			formMode = 'update';
			
		}

		function uiValues(values){
			console.log(values);
			$(contentid).val(values.content);
			$(tagid).val(values.tag);
			$(priorityid).val(values.priority);
		}

		function changeToCreate(){
			cleanFields();
			if(formMode == 'update'){
				$(updatebtn).remove();
				$(cancelbtn).remove();
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
			cancelbtn = '<button class="btn btn-danger" id="cancel-btn">Cancel</button>'
		}

		function getFormData(){
			var data = {};
			if($(contentid).val()){
				data.content = $(contentid).val();	
			}

			if($(dateid).val()){
				data.duedate = $(dateid).val();	
			}

			if($(priorityid).val()){
				data.priority = $(priorityid).val();	
			}

			if($(tagid).val()){
				data.tag = $(tagid).val();	
			}
			return data;
		}

		function cleanFields(){
			$(contentid).val('');
			$(priorityid).val('');
			$(dateid).val('');
			$(tagid).val('');
		}

		function addTask(event){
			var task = getFormData();
			Mediator.publish('create-task',task);
		}

		function updateTask(event){
			var data = getFormData();
			var id = TasktoUpdate;
			Mediator.publish('update-task',{task:data,id:id});
			formToUpdate = 'none';
			changeToCreate();
		}

		function initialize(){
			initializeUI();
			$(dateid).datepicker();
			formMode = 'create';
			$(formid).delegate('button#add-btn','click',addTask);
			$(formid).delegate('button#update-btn','click',updateTask);
			$(formid).delegate('button#cancel-btn','click',changeToCreate);
			$(formid).submit(function(event){
				event.preventDefault();
			});
			Mediator.subscribe('require-update',changeToUpdate,this);
		}
		return{
			initialize: initialize
		}
	}
)