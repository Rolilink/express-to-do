define([
	'mediator',
	'jquery'
	],
	function(Mediator,$){
		var listid;

		function addItem(data){
			var li = '<li '
					+'data-tag="' + data.tag +'" '
					+'data-priority="' + data.priority +'" '
					+'data-id="' + data._id +'" '
					+'data-content="' + data.content +'" '
					+'data-duedate="' + data.duedate +'" '
					+'data-completed="' + data.completed.toString() +'"'
					+'></li>';
			var row1 = '<div class="row">'
						+'<p class="span3 offset1 item-tag">' + data.tag + '</p>'
						+'<p class="span4 item-duedate">' + formatDateString(new Date(data.duedate)) + '</p>'
						+'<p class="span4 item-priority">' + data.priority + '</p>'
						+'</div>';

			var row2 = '<div class="row">'
					+'<p class="span7 offset1 item-content">' + data.content + '</p>'
					+'<button class="span2 offset1 closebtn close">&times;</button>'
					+'</div>';

			var row3 = '<div class="row">'
						+'<button class="btn btn-success span4 offset2 itemupdate">Update</button>'
						+'<button class="btn btn-danger span4 itemdelete">Delete</button>'
						+'</div>';

			li = $(li).addClass('item')
						.addClass('well')
						.append(row1)
						.append(row2)
						.append(row3)
						.hide()
						.prependTo(listid)
						.fadeIn('fast')
		}

		function updateItem(data){
			var itemselector = 'li[ data-id="' + data.id + '" ]';
			if(data.task.duedate){
				$(itemselector + ' .item-duedate').text(data.task.duedate);
				$(itemselector).attr('data-duedate',data.task.duedate);
			}
			
			if(data.task.priority){
				$(itemselector + ' .item-priority').text(data.task.priority);
				$(itemselector).attr('data-priority',data.task.priority);
			}

			if(data.task.content){
				$(itemselector + ' .item-content').text(data.task.content);
				$(itemselector).attr('data-content',data.task.content);
			}

			if(data.task.tag){
				$(itemselector + ' .item-tag').text(data.task.tag);
				$(itemselector).attr('data-tag',data.task.tag);
			}
		}

		function formatDateString(date){
			return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
		}
		
		function deleteItem(id){
			$('ul>li[data-id="' + id + '"]').fadeOut('fast',function(){
				$(this).remove();
				Mediator.publish('delete-task',{id: id})
			});
		}
		
		function getParentItem(child){
			return $(child).parents('li.item');
		}

		function getItemData(child){
			return getParentItem(child).data();
		}

		function deleteThisItem(event){
			event.preventDefault();
			var child = $(this);
			var data = getItemData(child);
			deleteItem(data.id);

		}

		function callUpdate(event){
			var child = $(this);
			var data = getItemData(child);
			Mediator.publish('require-update',data);
		}

		function registerEvents(){
			$(listid).delegate('.itemupdate','click',callUpdate);
			$(listid).delegate('.itemdelete','click',deleteThisItem);
		}

		
		function subscribe(){
			Mediator.subscribe('add-task',addItem,this);
			Mediator.subscribe('update-task',updateItem,this)
		}

		function initialize(){
			listid = '#tasklist';
			registerEvents();
			subscribe();
		}

		return{
			initialize: initialize
		}
	}
)