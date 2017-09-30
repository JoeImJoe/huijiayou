require(['config'],function(){
	require(['jquery','xcarousel'],function($){
		
		$('.head').load('html/header.html',function(){
			//这里的数据是在加载完header页面之后才有的，所以要放在他的回调函数里面
			$('#buysome').hover(function(){
				$('.buycar').show();
			},function(){
				$('.buycar').hide();
			});

			var carlist = [];
			var cookies = document.cookie;
			if(cookies.length>0){
				cookies = cookies.split('; ');
				cookies.forEach(function(cookie){
					var temp = cookie.split('=');
					if(temp[0] === 'carlist'){
						carlist = JSON.parse(temp[1]);
					}
				})
			}

			render();

			out();	

			function render(){
				var totalPrice = 0;// 计算总价
				var totalNum = 0;// 计算总数
				var car = $('.carlist').get(0);
				car.innerHTML = '';
				car.innerHTML = carlist.map(function(item){
					totalPrice += item.price * item.qty;
					totalNum +=item.qty*1;
					return `<li class="clearfix" data-guid="${item.id}">
								<a href="./details.html?id=${item.id}">
								<img src="${item.imgurl}" >
								<span>${item.title}</span></a>
								<p><span>${item.price} X ${item.qty}</span><b>删除</b></p>
							</li>`
				}).join('');

				$('.goodsnum').html(totalNum);
				var goodstotal = document.querySelector('#goodstotal');
				goodstotal.innerHTML = totalPrice;

				$('.buycar').show();
			}

			$('.buycar').on('click','b',function(){

				var currentLi = $(this).parent().parent()[0];
				$(this).parent().parent().remove();
				var guid = currentLi.getAttribute('data-guid');
				console.log(guid);
				for(var i=0;i<carlist.length;i++){console.log(666)
					if(carlist[i].id === guid){
						carlist.splice(i,1);
						break;
					}
				}
				var date = new Date();
				date.setDate(date.getDate()+7);
				document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() +';path = '/'';
				// $('.carlist').get(0).innerHTML = '';
				// location.reload();
				render();
				out();
			});
			
			$('.gocar').click(function(){
				location.href = '../html/buycar.html';
			});
			function out(){
				var buycar = $('.buycar').get(0);
				if($('.carlist').children().length==0){
					$('.something').hide();
				}else{
					$('.nothing').hide();
				}
			}



			var html = `<li><a href="html/datalist.html?kind=flygo">海外购</a></li>
					<li><a href="html/datalist.html?kind=ele">生活电器</a></li>
					<li><a href="html/datalist.html?kind=food">品质厨房</a></li>
					<li><a href="html/datalist.html?kind=ele">厨房电器</a></li>
					<li><a href="html/datalist.html?kind=cloth">生活家居</a></li>
					<li><a href="html/datalist.html?kind=cloth">布艺家纺</a></li>
					<li><a href="html/datalist.html?kind=cloth">服装服饰</a></li>
					<li><a href="html/datalist.html?kind=cloth">箱包配饰</a></li>
					<li><a href="html/datalist.html?kind=beauty">美妆个护</a></li>
					<li><a href="html/datalist.html?kind=food">食品饮料</a></li>
					<li><a href="html/datalist.html?kind=sport">运动健康</a></li>
					<li><a href="html/datalist.html?kind=3c">3C数码</a></li>
					`;
			$('.typelist').html(html);

		});


		$('.foot').load('html/footer.html');

		
		

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
				// console.log($.parseJSON(res));//从php拿到数据
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `	<li>
								<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
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
				$('.livenext').first().click(function(){
					idx++;
					$('.showlist').stop().animate({left:-idx*1165});
					// console.log(idx)
					if(idx>=3){
						idx=0;
					}
				})
				$('.liveprev').first().click(function(){
					if(idx<=0){idx=3}
					$('.showlist').stop().animate({left:-idx*1165});
					// console.log(idx)
						idx--;
				})
			}
		});

		$.ajax({
			url:"api/goodslist.php",
			type:"get",
			success:function(res){
				// console.log($.parseJSON(res));//从php拿到数据
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `	<li>
								<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
								<span>${item.discount}折</span>
								<b>${item.title}</b>
								<p>${item.saleprice}<del>${item.price}</del></p>
								<strong><p>立即</p><p>抢购</p></strong>
								</a>
							</li>`
				}).join('');
				
				$('.showlist2').append(html).width($res.length*233);
				// console.log(233*5)
				var idx = 0;
				$('.livenext').last().click(function(){
					idx++;
					$('.showlist2').stop().animate({left:-idx*1165});
					// console.log(idx)
					if(idx>=3){
						idx=0;
					}
				})
				$('.liveprev').last().click(function(){
					if(idx<=0){idx=3}
					$('.showlist2').stop().animate({left:-idx*1165});
					// console.log(idx)
						idx--;
				})
			}
		});

		$.ajax({
			url:"api/goodstop5.php",
			type:"get",
			data:{
				type :"'品质家居'"
			},
			success:function(res){
				
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					// console.log(item)
					return `<li>
							<i class="first"></i>
							<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
							<div><p>${item.title}</p>
							<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				
				$('.hotlist1').html(html);
				
				
			}
		});

		$.ajax({
			url:"api/goodstop5.php",
			type:"get",
			data:{
				type :"'美妆个护'"
			},
			success:function(res){
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `<li>
							<i class="first"></i>
							<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
							<div><p>${item.title}</p>
							<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				
				$('.hotlist2').html(html);		
			}
		});

		$.ajax({
			url:"api/goodstop5.php",
			type:"get",
			data:{
				type :"'服装美饰'"
			},
			success:function(res){
			
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `<li>
							<i class="first"></i>
							<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
							<div><p>${item.title}</p>
							<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				
				$('.hotlist3').html(html);		
			}
		});

		$.ajax({
			url:"api/goodstop5.php",
			type:"get",
			data:{
				type :"'食品保健'"
			},
			success:function(res){
				
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `<li>
							<i class="first"></i>
							<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
							<div><p>${item.title}</p>
							<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				
				$('.hotlist4').html(html);		
			}
		});

		$.ajax({
			url:"api/goodstop5.php",
			type:"get",
			data:{
				type :"'生活电器'"
			},
			success:function(res){
				
				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `<li>
							<i class="first"></i>
							<a href="./html/details.html?id=${item.id}"><img src="${item.imgurl}">
							<div><p>${item.title}</p>
							<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				
				$('.hotlist5').html(html);		
			}
		});


	})
})
