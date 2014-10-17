exports = module.exports = function(app,mongoose){

	var historiaSchema = mongoose.Schema({
	  	titulo 			: {type : String, trim : true, index:true},
	  	tipoHistoria 	: {type : String, trim : true},
	  	genero 			: {type : String, trim : true},
	  	descripcion 	: {type : String, trim : true},
	  	visitas			: {type : Number, trim : true},
	  	likes			: {type : Number, trim : true},
	  	dislikes 		: {type : Number, trim : true},
	  	img				: {type : String, trim  : true},
	    posts			: []
	 });
	mongoose.model('historias',historiaSchema,'historias');
};
