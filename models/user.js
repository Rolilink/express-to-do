module.exports = function(mongoose){
	var schema = mongoose.Schema({
		nickname: String
		,hashed_pass: String
		,salt: String
		,email: String
	});
	var User = mongoose.model('User',schema);
	console.log(User);
	var mongoose = null;
	
	return function(options,successcallback,errorcallback){
		errors = [];
		if(errors.length == 0){
			var user = new User(options);
			successcallback(user);
		}else{
			errorcallback(errors);
		}
	}
}