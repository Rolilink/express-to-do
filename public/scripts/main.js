var jsonobj;
$(document).ready(function(){
	$('input#date-input').datepicker();
	$('button#submit-input').click(function(ev){
		var content = $('input#content-input').val();
		var priority = $('input#priority-input').val();
		var date = $('input#date-input').val();
		var data = {
			"content": content,
			"duedate": date,
			"priority": parseInt(priority)
		};

		console.log(data);

		$.ajax({
			contentType: "application/json"
            ,dataType: "json"
			,data: JSON.stringify(data)
			,type:'POST'
			,url:'/tasks'
			,success:function(data){
				console.log(data);
			}
		});
		return false;
	});
	$('form').submit(function(ev){
		ev.preventDefault();
	});
});