$(document).ready(function(){
	console.log('Se ha cargado en main');

  $(document).load($(window).bind("resize", checkPosition));
  
  var porcentaje = (($('video').width() * 100)/900)/100;
  $('video').height(450*porcentaje);



	$('.notificacion').slideToggle(600);
	$('.notificacion').vibrate('x',5,4,100);
	$('.notificacion').show().delay(4000).slideToggle(600);

	$('.notificacion-sucessHistoria').slideToggle(500);
	$('.notificacion-sucessHistoria').vibrate('x',5,4,100);
	$('.notificacion-sucessHistoria').show().delay(4000).slideToggle(600);

	window.views.app = new Koob.Views.App( $('body') );
	
	if(Koob.Models.UsrSession) {
		window.models.usrSession = new Koob.Models.UsrSession();
		
		window.models.usrSession.on('change',function(model) {
			console.log('change usrSession');
			var view = new Koob.Views.Topbar({model:model});
			$('#topbar-content').prepend(view.$el.show());
			view.render();
		});	
		window.models.usrSession.fetch();
	}
	if(Koob.Models.HistoriaLectura) {
		window.models.historiaLectura = new Koob.Models.HistoriaLectura();

		window.models.historiaLectura.on('change',function(model) {
			console.log('change historiaLectura')
			var view = new Koob.Views.HistoriaLectura({model:model});
			window.collections.posts.fetch({'data' : {id : $('#idHistoria').val()}});
			$('.div-principal-lectura').prepend(view.$el.show());
			view.render();
		});

		if($('#idHistoria').val()){
			window.models.historiaLectura.fetch({ 'data' : { id : $('#idHistoria').val() } });
	}
	}
	if(Koob.Collections.Posts) {
		window.collections.posts = new Koob.Collections.Posts();
		window.collections.posts.comparator = 'numeroPost';
		window.collections.posts.on('add',function(model) {
			var view =  new Koob.Views.Post({model:model});
			$('.posts').append(view.$el.show());
			view.render
		});

	}
	if(Koob.Collections.Historias) {
		window.collections.historias = new Koob.Collections.Historias();

		window.collections.historias.on('add',function(model) {
	        var view = new Koob.Views.Historia({model:model});
	        var view2 = new Koob.Views.Historia({model:model});
			$('.recomendaciones').prepend(view.$el.show());
	        $('.recomendaciones2').prepend(view2.$el.show());
			$('.recomendaciones').slickAdd(view.$el.show());
	        $('.recomendaciones2').slickAdd(view2.$el.show());

	    	view.render();
			view2.render();

	        view.$el.find('.container-history-view').mouseover(function(e) {
	        	view.$el.find('.container-history-view').find('.descripcion').css('display','block');
	        	view.$el.find('.container-history-view').find('.descripcion').css('height','100%');
	        });
	        view.$el.find('.container-history-view').mouseout(function(e) {
	        	view.$el.find('.container-history-view').find('.descripcion').css('display','none');
	        	view.$el.find('.container-history-view').find('.descripcion').css('height','0');
	      	});
	    	view2.$el.find('.container-history-view').mouseover(function(e) {
	         	view2.$el.find('.container-history-view').find('.descripcion').css('display','block');
	        	view2.$el.find('.container-history-view').find('.descripcion').css('height','100%');
	      	});
	      	view2.$el.find('.container-history-view').mouseout(function(e) {
	        	view2.$el.find('.container-history-view').find('.descripcion').css('display','none');
	       		view2.$el.find('.container-history-view').find('.descripcion').css('height','0');
	      	});
		});

		window.collections.historias.fetch();
	}

		
	
    window.socket.on('post message', function(msg){
        $('.posts').empty();
        console.log(msg);
        //window.collections.posts.fetch();
        window.collections.posts.fetch({'data' : {id : $('#idHistoria').val()}});
    });


    if($('.recomendaciones , .recomendaciones2').slick) init_slick();
});





function init_slick () {
	console.log('entro');
    $('.recomendaciones , .recomendaciones2').slick({
     dots: false,
     infinite: true,
     speed: 300,
     slidesToShow: 4,
     touchMove: true,
     slidesToScroll: 1,
     lazyLoad: 'ondemand',
     responsive: 
     [{
          breakpoint: 3000,
          settings: {
               slidesToShow:8,
               slidesToScroll: 1,
               dots: false
          }
     },
     {
          breakpoint: 2000,
          settings: {
               slidesToShow:6,
               slidesToScroll: 1,
               dots: false
          }
     },
     {
          breakpoint: 1600,
          settings: {
               slidesToShow:4,
               slidesToScroll: 1,
               dots: false
          }
     },
     {
          breakpoint: 996,
          settings: {
               slidesToShow: 4,
               slidesToScroll: 1,
               dots: false
          }
     },
     {
          breakpoint: 971,
          settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               dots: false
          }
     },
     {
          breakpoint: 768,
          settings: {
               dots:false,
               slidesToShow: 3,
               slidesToScroll: 1
          }
     },
     {
          breakpoint: 675,
          settings: {
               dots:false,
               slidesToShow: 2,
               slidesToScroll: 1
        }
     },
     {
          breakpoint: 500,
          settings: {
               dots:false,
               slidesToShow: 1,
               slidesToScroll: 1,
              // centerMode: true,
             	//centerPadding: '40px'
                adaptiveHeight: true
        }
      },
       {
        breakpoint: 321,
        settings: {
          dots:false,
          slidesToShow: 1,
          //slidesToScroll: 1,
         // centerMode: true,
        	//centerPadding: '0px',
          adaptiveHeight: true
        }
      },
    ]
     });

     $('.recomendaciones2').slickRemove(0);
     $('.recomendaciones').slickRemove(0);
}
function checkPosition() {
    var porcentaje = (($('video').width() * 100)/900)/100;
    $('video').height(450*porcentaje);
    //if (window.matchMedia('(max-width: 767px)').matches) {
        //console.log('df');
    //} else {
        console.log('fd');
    //}
}
