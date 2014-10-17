Koob.Views.Historia = Backbone.View.extend({
	initialize : function() {
		this.$el.css('display','inline-block');
		this.render();
	},
	render : function() {
		this.template = _.template( $('#historia-template').html());
		var data = this.model.toJSON();
		//console.log(data);
		var html = this.template(data);
		this.$el.html(html);
		//this.$el.find('.descripcion').
		
	}
});