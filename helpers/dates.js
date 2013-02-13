module.exports = function(){
	function formatDateString(date){
		return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
	}
	return{
		dateToString: formatDateString
	}
}();
