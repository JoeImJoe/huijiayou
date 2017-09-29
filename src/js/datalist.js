require(['config'],function(){
	require(['jquery'],function($){
		
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

		$('.head').load('./header.html',function(){
			//加载完成后执行
			$('.top_t_R').hover(function(){
				$('.buycar').show();
			},function(){
				$('.buycar').hide();
			});

		});

		$('.foot').load('./footer.html');


		var $params = window.location.search;//获取地址栏出来的id
		var $kind = $params.substring(6)
		
		console.log($kind)
		$.ajax({
			url:"../api/goodskind.php",
			type:"get",
			data:{
				kind :$kind
			},
			success:function(res){

				var $res = $.parseJSON(res);
				var html = $.map($res,function(item,idx){
					return `<li><a href="./details.html?id=${item.id}">
							<img src="${item.imgurl}">
							<b>${item.title}</b>
							<p>￥${item.saleprice}<del>￥${item.price}</del></p>
							<span>月销${item.salenum}件</span>
						</a></li>`
				}).join('');
				$('.goodlist').html(html);	

				var html1 = $.map($res,function(item,idx){
					return `<li>
						<i class="first"></i>
						<a href="./details.html?id=${item.id}"><img src="${item.imgurl}">
						<div><p>${item.title}</p>
						<span>￥${item.saleprice}</span></div></a>
						</li>`
				}).join('');
				$('.hotlist').html(html1);		
			}
		});



	})
})
