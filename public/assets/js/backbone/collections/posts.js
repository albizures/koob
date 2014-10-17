Koob.Collections.Posts = Backbone.Collection.extend({
	model: Koob.Models.Post,
	url: 'api/posts',
	name : 'posts'
});