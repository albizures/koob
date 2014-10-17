Koob.Views.Topbar = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		this.template = _.template( $('#topbar-template').html());

		var data = this.model.toJSON();
		
		$('.id').val(data._id);
	
		var html = this.template(data);

		this.$el.html(html);
	}
});