var assetsHelper = function(){
	function buildStyleUrl(name,env){
		if(env==='development' || env==='test'){
			return '/stylesheets/' + name +'.css';
		}else{
			return '/stylesheets/' + name +'.min.css';
		}
	}

	function buildScriptUrl(name,env){
		if(env==='development' || env==='test'){
			return '/scripts/' + name +'.js';
		}else{
			return '/scripts/' + name +'.min.js';
		}
	}

	function buildImageUrl(name,format){
		return '/images/' + name +'.'+format;
	}
	return{
		buildStyleUrl: buildStyleUrl
		,buildScriptUrl: buildScriptUrl
		,buildImageUrl:buildImageUrl
	}
}();
