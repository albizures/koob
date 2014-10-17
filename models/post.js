exports = module.exports = function(app,mongoose){

	var postSchema = mongoose.Schema({
	    contenido 	: {type : String, trim : true, index : true},
	    numeroPost	: {type : Number},
	    autor 		: {type : mongoose.Schema.Types.ObjectId/*, ref : 'autores'*/},
	    historia 	: {type : mongoose.Schema.Types.ObjectId}
	});
	mongoose.model('posts',postSchema,'posts');
};
