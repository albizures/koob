Koob.Views.HistoriaLectura = Backbone.View.extend({
	events:{
		"click .agregar-fragmento"  : "agregar_fragmento",
		"submit form" 				: "guardar_fragmento",
		"click .like"				: "like",
		"click .dislike"			: "dislike"
	},
	agregar_fragmento : function(e) {
		e.preventDefault();
		$('.agregar-fragmento').slideToggle();
		$('.div-historia-informacion2').slideToggle();
		$('.div-agregar').slideToggle();

		if(!window.editor){
			window.editor = new Quill('#textarea-agregar', 
			{
				modules: {
					'toolbar': { 
						container: '#formatting-container' 
					},
				'image-tooltip': true,
				'link-tooltip': true
			}
			}); 
			editor.on('text-change', function(delta, source) {
				$('.primer-post').val( editor.getHTML());
				//console.log($('.id').val());
			}); 
		}
		
	},
	guardar_fragmento : function(e) {
		e.preventDefault();
		$('.agregar-fragmento').slideToggle();
		$('.div-historia-informacion2').slideToggle();
		$('.div-agregar').slideToggle();

		
		var contenido =  editor.getHTML();
		var historia = $('#idHistoria').val();
		var usr = window.models.usrSession.toJSON()._id;
		var numeroPost = 1;
		_.max(window.collections.posts.toJSON(),function(post) {
			numeroPost = post.numeroPost+1;
		});
		var data = {
			"contenido" : contenido,
			"historia" 	: historia,
			"autor"		: usr,
			'numeroPost': numeroPost
		};

		var  model = new Koob.Models.Post(data);
		model.save();
		window.socket.emit('post message', {numero : data.numeroPost, idHistoria : data.historia});
		//$('.posts').empty();
		
		editor.setHTML('');
	},
	initialize : function() {
		this.render();
	},
	render : function() {
		this.template = _.template( $('#historiaLectura-template').html());
		console.log(this.model.toJSON());
		var data = this.model.toJSON();
		
		//$('.id').val(data._id);
	
		var html = this.template(data);

		this.$el.html(html);

	},
	like : function(e) {
		e.preventDefault();
		/*data ={
			likes : this.model.toJSON().likes =
		}*/
		data = {
			_id : this.model.toJSON()._id, 
			likes : this.model.toJSON().likes + 1
		};
		var model = new Koob.Models.HistoriaLectura(data);
		
		model.save();
		$('.like p').text(data.likes);
		console.log($('.like p').text());
	},
	dislike : function(e) {
		e.preventDefault();
		data = {
			_id : this.model.toJSON()._id, 
			dislikes : this.model.toJSON().dislikes + 1
		};
		var model = new Koob.Models.HistoriaLectura(data);
		
		model.save();
		$('.dislike p').text(data.dislikes);
		console.log($('.dislike p').text());
	}
});