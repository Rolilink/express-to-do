define([
	'mediator',
	'jquery'
	],
	function(Mediator,$){
		var listid;
		function deleteTaskFromUi(id){
			$('ul>li[data-id="' + id + '"]').fadeOut('fast',function(){
				$(this).remove();
				Mediator.publish('delete-task',{id: id})
			});
		}
		
		function getParentItem(child){
			console.log($(child).parents('li.item'));
			return $(child).parents('li.item');
		}

		function getItemData(child,dataid){
			return getParentItem(child).data(dataid);
		}

		function callDelete(event){
			event.preventDefault();
			console.log('deleting');
			var child = $(this);
			console.log(child);
			var id = getItemData(child,'id');
			console.log(id);
			deleteTaskFromUi(id);

		}

		function callUpdate(event){

		}

		function initialize(){
			listid = '#tasklist';
			$(listid).delegate('.itemupdate','click',callUpdate);
			$(listid).delegate('.itemdelete','click',callDelete);
		}

		return{
			initialize: initialize
		}
	}
)