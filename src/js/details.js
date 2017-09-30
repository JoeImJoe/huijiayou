require(['config'],function(){
	require(['jquery','common','xzoom'],function($,com){
		
		$('.head').load('./header.html',function(){
			//加载完成后执行
			$('.top_t_R').hover(function(){
				$('.buycar').show();
			},function(){
				$('.buycar').hide();
			});

		});
		
		$('.foot').load('./footer.html');

		

		$('.filter').on('click','ul li',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.m2m').addClass('active');
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
	
		// xZoom();
		$('.small').on('mousemove','ul li img',function(){
			 $('.big').find('img').attr('src',$(this).attr('src'));
			 xZoom();
			 // $(this).addClass('active').siblings('img').removeClass('active');
		});

		var $tab = $('.tab');
		var $content = $tab.children('.content');
		var $tabItem = $tab.find('.header li');

		$content.slice(1).hide();// 隐藏除第一个以外的.content
		$tabItem.first().addClass('active');// 高亮显示第一个tab

		$tab.on('click','.header li',function(){
		    var idx = $(this).index();// 获取当前索引值    
		    $(this).addClass('active').siblings('li').removeClass();// 高亮
		    $content.eq(idx).show().siblings('.content').hide(); // 显示对应的内容
		});

		var $params = window.location.search;//获取地址栏出来的id
		var id = $params.substring(4);
		$.ajax({
			url:"../api/goods.php",
			type:"get",
			data:{
				id :id
			},
			success:function(res){
				
				var $res = $.parseJSON(res);
				// console.log($res);
				// console.log($res.imgurl)

				$('.title').html($res.title);
				$('.saleprice').html('￥'+$res.saleprice);
				$('.money').html('￥'+$res.price);
				$('.guid').html($res.guid);
				$('.salenum').html($res.salenum+'件');
				$('.bigimg').attr('src',$res.imgurl);
				$('.smallimg').attr('src',$res.smallimgurl);
				$('.content1').attr('src',$res.descript);
				$('.content2').html($res.details);


				
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
				
				var add2car = document.getElementById('add2car');
				add2car.onclick = function(){

					if($('.carlist').children().length==0){
						 location.reload();
					}
					var guid = $res.guid;
					// 判断当前guid是否已经存在于carlist中
					// 如果存在，找到这个商品，并且数量+1
					// 如果不存，则添加一个商品到carlist中（默认数量为1）
					var has = false;
					for(var i=0;i<carlist.length;i++){
						// 已经存在
						if(carlist[i].guid === guid){
							carlist[i].qty++;
							has=true;
							break;
						}
					}
					if(!has){// 不存在
						var goods = {
							imgurl:$res.imgurl,
							title:$res.title,
							price:$res.saleprice,
							qty:$res.qty,
							id:$res.id,
							guid:guid
						}
						carlist.push(goods)
					}
					var date = new Date();// 写入cookie
					date.setDate(date.getDate()+7);
					document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() +';path = '/'';
					render();
				};

			}
		});


	})
})
