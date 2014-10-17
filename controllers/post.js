var mongoose =  require('mongoose'),
    Post = mongoose.model('posts');

exports.buscarPosts =  function(req, res){
    Post.find(function(err,posts){
        if(err) res.send(500,err.message);
        
        console.log('GET /posts');
        res.status(200).jsonp(posts);
    });
};

exports.buscarPorId = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err) return res.send(500,err.message);
        console.log('GET /post/'+req.params.id);
        res.status(200).jsonp(post);
    });
};

exports.agregarPost =  function(req,res){
    console.log('POST');
    //console.log(req.body);

    // var cont(req.body.contenido).replace('\n','<br>')
    var post = new Post({
        contenido   : req.body.contenido,
        autor       : req.body.autor,
        historia    : req.body.historia,
        numeroPost  : req.body.numeroPost
        // like        : 0,
        // dislike     : 0,
    });
    //console.log(post);
    post.save(function(err,post){
        if(err) return res.send(500, err.message);
        
        res.status(200).jsonp(post);
    });
};
exports.primerPost = function(post,idUsr,idHistoria, fn ) {
	var post = new Post({
		contenido : post,
		autor 	  : idUsr,
		historia  : idHistoria,
        numeroPost: 1
	});
	post.save(function(err,post) {
		if(err) if(fn) fn(err,null);
		fn(null,post);
	});
};

exports.editarPost =  function(req,res){
    console.log('PUT');
    //console.log(req.body);
    
    Post.findById(req.params.id,function(err,post){
        post.contenido  = req.body.contenido;
        post.autor = mongoose.Schema.Types.ObjectId(req.body.id);
        // post.like       = req.body.like;
        // post.dislike    = req.body.dislike;
        
        post.save(function(err){
            if(err) return res.send(500,err.message);
            res.status(200).jsonp(post);
        }); 
    });
};

exports.eliminarPost = function(req, res){
    Post.findById(res.params.id,function(err,post){
        post.remove(function(err){
            res.status(200);
        });
    });
};
exports.buscarPorHistoriaLectura = function(req,res) {
    Post.find({historia: req.query.id},function(err,posts) {
        if(err) return res.send(500,err.message);
        res.status(200).jsonp(posts)
        //if(callback) callback(posts);
    });
};
exports.buscarPorHistoria = function(idHistoria,callback) {
    Post.find({'historia': idHistoria},function(err,posts) {
        if(err) return res.send(500,err.message);
        //console.log(posts);
        if(callback) callback(posts);
    });
};