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


		var endTime = Date.parse('2017-9-25 20:29:00');//时间只能是同天的时间
		var daojishi = setInterval(function(){
			var nowTime = Date.now();
			var offset = parseInt((endTime - nowTime)/1000);// 计算时间差 得到秒数

			console.log(offset);
			if(offset<0){//判断是否结束
				// $('.showlist').hide();
				$('.end').show();
				clearInterval(daojishi);// 停止定时器
				return;
			}
			var secLeft = offset%60;// 计算剩余时分秒
			var minLeft = parseInt(offset/60)%60;
			var hourLeft = Math.floor(offset/60/60)%24;

			$('.livehour').html(hourLeft);
			$('.livemin').html(minLeft);
			$('.livesec').html(secLeft);

		},1000);
		$('.carousel1').xCarousel({
			imgs:['img/jialunbo1.jpg','img/jialunbo2.jpg','img/jialunbo3.jpg','img/jialunbo4.jpg'],
			width:580,
			height:310,
			type:'fade'
		});
		$('.carousel2').xCarousel({
			imgs:['img/jialunbo5.jpg','img/jialunbo6.jpg'],
			width:580,
			height:310,
			type:'fade'
		});
		$('.carousel3').xCarousel({
			imgs:['img/jialunbo7.jpg','img/jialunbo8.jpg','img/jialunbo9.jpg'],
			width:580,
			height:310,
			type:'fade'
		});
		$('.carousel4').xCarousel({
			imgs:['img/jialunbo10.jpg','img/jialunbo11.jpg','img/jialunbo12.jpg'],
			width:580,
			height:310,
			type:'fade'
		});
		$('.carousel5').xCarousel({
			imgs:['img/jialunbo13.jpg','img/jialunbo14.jpg'],
			width:580,
			height:310,
			type:'fade'
		});

	})
})
