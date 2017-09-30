// 脕脨卤铆脪鲁
/*jQuery(function($){
	console.log('list');

	$('body').css({backgroundColor:'#f00'});
});
*/
require(['config'],function(){
	require(['jquery','common'],function($,com){

		$('.head').load('./header.html',function(){
			//加载完成后执行
			$('.top_t_R').hover(function(){
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
						console.log(temp[1])
					}
				})
			};


			function render(){
				var totalPrice = 0;// 计算总价
				var totalNum = 0;// 计算总数
				var car = $('.carlist').get(0);
				car.innerHTML = carlist.map(function(item){
					totalPrice += item.price * item.qty;
					totalNum +=item.qty*1;
					return `<li class="clearfix">
								<a href="./details.html?id=${item.id}">
								<img src="${item.imgurl}" >
								<span>${item.title}</span></a>
								<p><span>${item.price} X ${item.qty}</span><b>删除</b></p>
							</li>`
				}).join('');

				$('.goodsnum').html(totalNum);
				var goodstotal = document.querySelector('#goodstotal');
				goodstotal.innerHTML = totalPrice;

				// $('.buycar').show();
			};
			render();
			function out(){
				var buycar = $('.buycar').get(0);
				if($('.carlist').children().length==0){
					$('.something').hide();
				}else{
					$('.nothing').hide();
				}
			}
			out();
			$('.buycar').on('click','b',function(){

				$(this).parent().parent().remove();
				var date = new Date();
				date.setDate(date.getDate()-15);
				document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() +';path = '/'';
				
				 location.reload();
				
				// render();
				out();
				console.log(777)
			});
			
			$('.gocar').click(function(){
				location.href = '../html/buycar.html';
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


		$('.scode').html(com.yanzhengma()).css('color',com.randomColor()).click(function(){
			$(this).html(com.yanzhengma()).css('color',com.randomColor());event.preventDefault();
		});

		$('.toreg').click(function(){
			var $phone = $('#phone').val();
			var $password = $('#password').val();
			$.ajax({
				url:"../api/reg.php",
				type:"get",
				data:{
					phone:$phone,
					password:$password
				},
				success:function(response){
					console.log(response);
				}
			});
			
		});

		
	})
})
