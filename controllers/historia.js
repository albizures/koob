var mongoose =  require('mongoose'),
	Historia =  mongoose.model('historias'),
	Post =  mongoose.model('posts'),	
	PostCtrl	= require('./post'); 

exports.buscarHistorias =  function (req,res) {
	Historia.find(function(err,historias) {
		if (err) res.send(550,err.message);
			
			console.log('GET /historias ');
			res.status(200).jsonp(historias);
	});
};
exports.buscarPorId =  function(req,res) {
	Historia.findById(req.params.id,function(err,historia) {
		if (err) return res.send(500,err.message);
		console.log('GET /historias');
		res.status(200).jsonp(historia);
	});
};
exports.historiaLectura = function(req,res) {

	/*console.log(req.params);
	console.log(req.query);
	console.log(req.body);*/
	if(!req.query.id){
		Historia.find(function(err,historias) {
			if (err) res.send(550,err.message);			
			res.status(200).jsonp(historias);
		});

	}else{
		//console.log(req.query.id);
		Historia.findById(req.query.id,function(err,historia) {
			//console.log(historia+" historia");
			if(err) return res.status(500).send(err.message);

			historia.visitas+=1;
			historia.save(function() {
				//console.log(historia);
				res.status(200).jsonp(historia);
			}); 
		});
	}
	
};
exports.agregarHistoria = function(req,res) {
	//console.log(req.body);
	var historia = new Historia({
		titulo	 		: req.body.titulo,
		tipoHistoria 	: req.body.tipoHistoria,
		genero 			: req.body.genero,
		descripcion		: req.body.post,
		visitas 		: 0,
		likes 			: 0,
		dislikes		: 0,
		img				: req.body.urlImg

	});
	historia.save(function(err,historia) {

		if(err) return res.send(500,err.message);

		PostCtrl.primerPost(req.body.post,req.body.id,historia._id,function(err, post) {
			historia.posts.push(post._id);
			historia.save(function(err,historia) {
				if(err) res.send(500,err.message);

				res.status(200).send({
					sucessHistoria : 'Se ha agrego correctamente tu historia',
					idHistoria : historia._id + 'send'
				});
				res.redirect('/lectura?sucessHistoria=Se ha agrego correctamente tu historia&idhistoria='+historia._id);
			});
		});

		
	});
};

exports.editarHistoria = function(req,res) {
	//console.log('PUT /historias');
	//console.log(req.params);
	console.log(req.body);

	Historia.findById(req.body._id,function(err,historia) {
		if(err) return res.rend(500,err.message);

		if (req.body.likes){ 
			console.log('likes');
			historia.likes = req.body.likes;
		}

		if(req.body.dislikes){ 
			console.log('dislikes');
			historia.dislikes = req.body.dislikes;
		}
		
		historia.save(function(err) {
			if(err) return res.send(500,err.message);

			res.status(200).jsonp(historia);
		});
	});
};

exports.eliminarHistoria =  function(req,res) {
	Historia.findById(res.params.id,function(err,historia) {
		historia.remove(function(err) {
			res.status(200);
		});
	});
};
