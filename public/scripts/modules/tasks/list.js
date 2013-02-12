define([
	'mediator',
	'jquery'
	],
	function(Mediator,$){
		var listid;

		function formatDateString(date){
			return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
		}
		
		function deleteTaskFromUi(id){
			$('ul>li[data-id="' + id + '"]').fadeOut('fast',function(){
				$(this).remove();
				Mediator.publish('delete-task',{id: id})
			});
		}
		
		function getParentItem(child){
			return $(child).parents('li.item');
		}

		function getItemData(child,dataid){
			return getParentItem(child).data(dataid);
		}

		function callDelete(event){
			event.preventDefault();
			var child = $(this);
			var id = getItemData(child,'id');
			deleteTaskFromUi(id);

		}

		function callUpdate(event){
			var child = $(this);
			var id = getItemData(child,'id');
			Mediator.publish('require-update',{id:id});
		}

		function registerEvents(){
			$(listid).delegate('.itemupdate','click',callUpdate);
			$(listid).delegate('.itemdelete','click',callDelete);
		}

		function addTask(data){
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
						+'<p class="span4 item-date">' + formatDateString(new Date(data.duedate)) + '</p>'
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
			$.data(li,'tag',data.tag)
			$.data(li,'priority',data.priority)
			$.data(li,'id',data.id)
			$.data(li,'content',data.content)
			$.data(li,'duedate',data.duedate)
			$.data(li,'completed',data.completed.toString());

		}

		function subscribe(){
			//Mediator.subscribe('delete-task',deleteTask,this);
			Mediator.subscribe('add-task',addTask,this);
			//Mediator.subscribe('update-task',updateTask,this)
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