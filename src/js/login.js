
require(['config'],function(){
	require(['jquery','common'],function($,com){

		$('.head').load('./header.html',function(){
			//加载完成后执行
			$('.top_t_R').hover(function(){
				$('.buycar').show();
			},function(){
				$('.buycar').hide();
			});

		});
		
		$('.foot').load('./footer.html');

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

		$('.scode').html(com.yanzhengma()).css('color',com.randomColor()).click(function(){
			$(this).html(com.yanzhengma()).css('color',com.randomColor());event.preventDefault();
		});

	})
})