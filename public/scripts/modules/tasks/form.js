define([
	'mediator',
	'jquery',
	'bootstrap',
	'datepicker'
	],
	function(){
		var formid,contentid,duedateid,tagid,priorityid,&addbtn,&updatebtn;
		var formMode;
		var TasktoUpdate;
		var modules = Array.prototype.slice.call(arguments);

		function changeToUpdate(values){
			if(formMode == 'create'){
				$addbtn.remove();
				$(formid).append($updatebtn);
			}
		}

		function changeToCreate(){

		}

		function initializeUI(){
			contentid = '#content-input';
			dateid = '#date-input';
			priorityid = '#priority-input';
			tagid = '#tag-input';
			duedateid = '#date-input';
			formid = '#sidemenu';
			$addbtn = $('button#add-btn');
		}

		function initialize(){
			initializeUI();
			formMode = 'create';
			$(formid).delegate('button#add-btn','click',addTask);
			$(formid).delegate('button#update-btn','click',updateTask);
		}

		return{
			initialize: initialize
		}
	}
)