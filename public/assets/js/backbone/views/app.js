Koob.Views.App = Backbone.View.extend({
	events: {
		"click .desplazar"		: "desplazar",
		"click .registrar"		: "registrar",
		"click .iniciar-sesion"	: "iniciarSesion",
		"click .div-sesiones, .sesion-salir" : "ocultarSesiones",
		"click .div-iniciar-sesion, .div-registrar" : "panelesSesiones"
		// "click .btn-guardar-publicar": "guardarPublicar"
	},
	initialize : function ($el) {
		this.$el = $el;
	},
	desplazar : function (e) {
		e.preventDefault();
		var ancla = $('.desplazar').attr('href');
		$('body,html').stop(true,true).animate({
			scrollTop: $(ancla).offset().top
		},800);
	},
	registrar : function (e) {
		e.stopPropagation();
		$('.div-registrar').css('display','block');
		$('.div-sesiones').fadeToggle(400);
	},
	iniciarSesion : function(e) {
		e.stopPropagation();

		$('.div-iniciar-sesion').css('display','block');
		$('.div-sesiones').fadeToggle(400);
	},
	ocultarSesiones : function(e) {
		e.stopPropagation();
		$('.div-sesiones').fadeToggle(400);
		$('.div-registrar, .div-iniciar-sesion').css('display','none');
	},
	panelesSesiones : function(e) {
		e.stopPropagation();
	}
	// guardarPublicar : function(e) {
	// 	e.preventDefault();

	// }

});