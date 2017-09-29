require(['config'],function(){
	require(['jquery','xzoom'],function($){
		
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
		console.log(id);
		$.ajax({
			url:"../api/goods.php",
			type:"get",
			data:{
				id :id
			},
			success:function(res){
				
				var $res = $.parseJSON(res);
				console.log($res);
				console.log($res.imgurl)

				$('.title').html($res.title);
				$('.saleprice').html('￥'+$res.saleprice);
				$('.money').html('￥'+$res.price);
				$('.guid').html($res.guid);
				$('.salenum').html($res.salenum+'件');
				$('.bigimg').attr('src',$res.imgurl);
				$('.smallimg').attr('src',$res.smallimgurl);
				$('.content1').attr('src',$res.descript);
				$('.content2').html($res.details);
			}
		});


	})
})
