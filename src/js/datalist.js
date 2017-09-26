require(['config'],function(){
	require(['jquery'],function($){
		console.log($('.filter'));
		console.log(666);

		$('.filter').on('click','ul li',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.m2m').addClass('active');
		});
	})
})
