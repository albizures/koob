Koob.Views.Post = Backbone.View.extend({
	className:"post",

	initialize : function  () {
		this.render();
		
	},
	eliminar : function  (e) {
		console.log('Se a eliminado');
		this.remove(function () {
			console.log('Se a eliminado un post');
		});
	},
	render : function  () {
		this.template = _.template( $('#post-template').html());

		var data = this.model.toJSON();

		var html =  this.template(data);
		// this.$el.css('background',getRandomColor);
		this.$el.html(html);
	}
});
