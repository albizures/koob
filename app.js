//declaración de variables
var express 		= require('express'),
	app 			= require('express')(),
	http 			= require('http').Server(app),
	port 			= process.env.PORT || 3333,
	io 				= require('socket.io')(http),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	cookieParser 	= require('cookie-parser'),
	expressSession 	= require('express-session'),
	methodOverride 	= require('method-override'),
	fs = require("fs"),
	path = require('path'),
	formidable = require('formidable');


app.set('views', __dirname + '/public');
app.set('view engine', 'jade');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

//Middleware
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(methodOverride());
app.use(expressSession({ secret: 'keyboard', cookie: { maxAge: 60000 * 1000 }}));
app.use(express.static(__dirname + '/public/assets'));


//Conexión a Base de Datos
mongoose.connect('mongodb://localhost:27017/koob_DB',function(err,res){
//mongoose.connect('mongodb://testusr:testpassword@ds041160.mongolab.com:41160/koobdb', function(err, res){
	if(err) throw err;
	console.log('Base de datos conectada');
});

var Usr 		= require('./models/usr')(app, mongoose),
	UsrCtrl 	= require('./controllers/usr'),
	Post 		= require('./models/post')(app,mongoose),
	PostCtrl	= require('./controllers/post'),
	Historia 	= require('./models/historia')(app,mongoose),
	HistoriaCtrl= require('./controllers/historia');
	



var router = express.Router();
app.use(router);
var api = express.Router();

api.route('/usrSession').get(UsrCtrl.usrSession);
api.route('/historiaLectura').get(HistoriaCtrl.historiaLectura).post(HistoriaCtrl.editarHistoria);
api.route('/posts').get(PostCtrl.buscarPorHistoriaLectura);
api.route('/posts').post(PostCtrl.agregarPost);
api.route('/historias').get(HistoriaCtrl.historiaLectura);
//api.route('/historias').get(HistoriaCtrl.historiaLectura);


app.use('/api', api);

function authenticate (usr, pass, fn) {
	//if(!module.parent) console.log('auntenticacion %s : %s', usr, pass);

	var usr2;

	UsrCtrl.buscarUnUsr(usr, pass, function  (user) {
		usr2 = user;
		if(!usr2) return fn(new Error('Usuario no encontrado'));

		fn(null,usr2);
	});
 }

app.get('/' ,function  (req, res) {
	//res.sendFile(__dirname + '/public/index.html');
	res.render('index',{usr : req.session.usr,error : req.session.error});
	console.log('Expiración get: '+req.session.cookie.maxAge);
});


app.post('/' , function (req, res,next) {
	if(req.body.tipo == "acceder"){
		authenticate(req.body.usr, req.body.pass, function (err, usr) {
			if(usr){
				req.session.regenerate(function () {
					req.session.usr = usr.nick;
					req.session.id = usr._id;
					console.log('Expiración post: '+req.session.cookie.maxAge);
					res.redirect('/new');
					//next();
				});
			}else{
				req.session.error = 'contraseña y/o usuario incorrecto';
				res.locals.session = req.session;
				//res.redirect('/');
				res.render('index',{usr : req.session.usr,error : req.session.error});
				//next();
			}
		});
	}else{
		UsrCtrl.agregarUsuario(req,res);
		res.redirect('/');
		//next();
	}
});

app.get('/new', function (req ,res) {
	//res.sendFile(__dirname + '/public/new.html');
	if(req.session.usr){
		//res.sendFile(__dirname + '/public/new.html');
		res.render('new');
		console.log('Expiración new: '+req.session.cookie.maxAge);
	}else{
		req.session.error = 'Inicie sesión para acceder a la pagina';
		res.redirect('/');
		//res.render('index',{error : req.session.error});
	}
});


app.get('/logout', function (req, res) {
	req.session.destroy(function () {
		res.redirect('/');
	});
});

app.get('/nueva',function(req,res) {
	res.render('nueva');
	if(req.session.usr){
		//res.sendFile(__dirname + '/public/nueva.html');
		res.render('nueva');
		//console.log('Expiración nueva: '+req.session.cookie.maxAge);
	}else{
		req.session.error = 'Inicie sesión para acceder a la página';
		res.redirect('/');
	}
});
app.post('/nueva',function(req, res) {
	HistoriaCtrl.agregarHistoria(req,res);
});
app.get('/lectura',function(req,res) {
	//console.log("/lectura");
	if(req.session.usr){
		//console.log('Expiración lectura: '+req.session.cookie.maxAge);
		if(req.query.idhistoria)	
			res.render('lectura',{
				usuario 		: req.session.usr,
				historia 		: req.query.idhistoria,
				sucessHistoria	: req.query.sucessHistoria});
		else{
			res.redirect('/new');	
		}
		
	}else{
		req.session.error = 'Inicie sesión para acceder a la página';
		res.redirect('/');
	}
});

app.post('/subirImg',function(req,res) {
	var form = new formidable.IncomingForm();
	
	form.parse(req, function  (err, fields, files) {
		console.log(files);
		var old_path = files.foto.path,
		file_size = files.foto.size,
		file_ext = files.foto.name.split('.').pop(),
		index = old_path.lastIndexOf('/') + 1,
		file_name = old_path.substr(index),
		new_file_name = file_name.substr(0,5),
		new_path = path.join( __dirname, '/public/assets/img',new_file_name + '.' + file_ext);
		

		console.log("nombre del archivo " + file_name);
		
		console.log('Este es la nombre del archivo: ' + new_file_name + '.' + file_ext);
		console.log('Este es el path: ' + new_path);
		

		fs.readFile(old_path, function  (err, data) {
			fs.writeFile(new_path, data, function  (err) {
				fs.unlink(old_path, function  (err) {
					if(err){
						res.status(500);
						console.log('no se agrego');
						//res.json({'success':false});
					}else{
						res.status(200).send(new_file_name + '.' + file_ext);
						//HistoriaCtrl.agregarHistoria(req,res);
						console.log('se agrego');
						//res.json({'success':true});
					}
				});
			});
		});
	});
});

io.on('connection', function (socket) {
	//console.log('alguien se conecto' + socket);
	socket.on('disconnect', function () {
		
	});

	socket.on('post message' , function (msgPost) {
		io.emit('post message', msgPost);
	});
});

http.listen(port, function () {
	console.log('Esperando en el puerto' + port);
})