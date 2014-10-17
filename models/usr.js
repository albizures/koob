exports = module.exports = function(app,mongoose){
	
	var usrSchema = mongoose.Schema({
    	nombre 		: {type : String, trim : true},
    	apellido 	: {type	: String, trim : true},
   		nick 		: {type : String, trim : true, index : true},
    	email 		: {type : String, trim : true},
    	pass 		: {type	: String, trim : true},
    	experiencia : {type : String, trim : true},
        foto        : {type : String, trimg : true},
    	filtros 	: {type : String}
	});

	mongoose.model('users',usrSchema,'users');
};