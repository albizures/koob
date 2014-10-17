var mongoose = require('mongoose'),
	Usuario = mongoose.model('users');

exports.buscarUsuario = function(req, res){
	console.log('Buscando usuarios');
	Usuario.find(function(err, usuarios){
		if(err) res.send(500, err.message);

		console.log('Get /usuarios');
		res.status(200).jsonp(usuarios);
	});
};

exports.buscarPorId = function(res, res){
	Usuario.findById(req.params.id, function(err, usuario){
		if(err) return res.send(500, err.message);

		console.log('Get /usuario/' + req.params.id);
		res.status(200).jsonp(usuario);
	});
};

exports.agregarUsuario = function(req, res){
	console.log('Agregar usuario');
	console.log(req.body);

	var usuario = new Usuario({
		//nombre 				: req.body.nombre,
		//apellido 			: req.body.apellido,
		nick       		    : req.body.nick,
		email 				: req.body.correo,
		pass 				: req.body.pass,
		//experiencia 		: req.body.experiencia
	});
	console.log(usuario);
	usuario.save(function(err,post){
        if(err) return res.send(500, err.message);
        
        res.status(200)//.jsonp(usuario);
       // res.redirectio

    });
};

exports.editarUsuario = function(req, res){
	console.log('Editar usuario');
	console.log(req.body);

	Usuario.findById(req.params.id, function(err, usuario){
		usuario.nombre 		= req.body.nombre;
		usuario.apellido 	= req.body.apellido;
		usuario.nick 		= req.body.nick;
		usuairo.email 		= req.body.email;
		usuario.pass		= req.body.pass;
		usuario.experiencia	= req.body.experiencia;

	 	usuario.save(function(err){
	 		if(err) return res.send(500, err.message);
	 		res.status(200).jsonp(usuario);
	 	});

	});
};

exports.eliminarUsuario = function(req, res){
	Usuario.findById(res.params.id, function(err, usuario){
		usuario.remove(function(err){
			res.statu(200);
		});
	});
};
var usrBuscado = null;
exports.buscarUnUsr = function (nick, pass, callback){
  Usuario.findOne({'nick': nick ,'pass' : pass }).exec(function(err, usr){
    if(err)
      console.log(err);

      //console.log(usr);
      
      if(callback) callback(usr);
      
    //console.log('El autor del post es %s', doc.autores.nick);
   });
  //return usrBuscado;
};
exports.usrSession = function  (req,res) {
	Usuario.findOne({'nick':req.session.usr}).exec(function  (err,usuario) {
		if(err)
			console.log(err);
		res.status(200).jsonp(usuario);
		//if(callback) callback(urs);
	})
}