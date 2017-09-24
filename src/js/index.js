require(['config'],function(){
	require(['jquery','xcarousel'],function($){
		$('.top_t_R').hover(function(){
			$('.buycar').show();
		},function(){
			$('.buycar').hide();
		});

		$('.show').xCarousel({
			imgs:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg'],
			width:714,
			height:385,
			type:'fade'
		})




	})
})
