require(['config'],function(){
	require(['jquery','xcarousel'],function($){
		$('.top_t_R').hover(function(){
			$('.buycar').show();
		},function(){
			$('.buycar').hide();
		});

		$('.show').xCarousel({
			imgs:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg'],
			width:714,
			height:385,
			index:3,
			type:'fade'
		})


		var endTime = Date.parse('2017-9-29 23:29:00');//时间只能是同天的时间
		var daojishi = setInterval(function(){
			var nowTime = Date.now();
			var offset = parseInt((endTime - nowTime)/1000);// 计算时间差 得到秒数

			// console.log(offset);
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


		$('.head').load('html/header.html');
		$('.foot').load('html/footer.html');

		var $totop = $('.totop');
		$totop.hide();
		window.onscroll = ()=>{
			let scrollTop = window.scrollY;
			if(scrollTop > 200){
				$totop.fadeIn();
			}else{
				$totop.fadeOut();
			}
		}
		$totop.click(function(){
			console.log(666)
			let speed = 10;
			let timer = setInterval(()=>{
				let scrollTop = window.scrollY;
				speed = Math.ceil(scrollTop/10);
				scrollTop -= speed;
				if(scrollTop <= 10){
					clearInterval(timer);
					scrollTop = 0;
				}
				window.scrollTo(0,scrollTop);
			},30);
		});

		$.ajax({
			url:"api/goodslist.php",
			type:"get",
			success:function(res){
				console.log($.parseJSON(res));//从php拿到数据
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `	<li>
								<a href="#"><img src="${item.imgurl}">
								<span>${item.discount}折</span>
								<b>${item.title}</b>
								<p>${item.saleprice}<del>${item.price}</del></p>
								<strong><p>立即</p><p>抢购</p></strong>
								</a>
							</li>`
				}).join('');
				
				$('.showlist').append(html).width($res.length*233);
				// console.log(233*5)
				var idx = 0;
				$('.livenext').click(function(){
					idx++;
					$('.showlist').stop().animate({left:-idx*1165});
					console.log(idx)
					if(idx>=3){
						idx=0;
					}
				})
				$('.liveprev').click(function(){
					if(idx<=0){idx=3}
					$('.showlist').stop().animate({left:-idx*1165});
					console.log(idx)
						idx--;
				})
			}
		});


	})
})
