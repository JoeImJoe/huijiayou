
require(['config'],function(){
	require(['jquery','common'],function($,com){

		$('.head').load('./header.html',function(){
			//加载完成后执行
			$('.top_t_R').hover(function(){
				$('.buycar').show();
			},function(){
				$('.buycar').hide();
			});

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

		window.onscroll = ()=>{
			if(window.scrollY > 52){
				$('.ft').addClass('fixed');
			}else{
				$('.ft').removeClass('fixed');
			}
		};


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
		render();
		function render(){
			var totalPrice = 0;// 计算总价
			var totalNum = 0;// 计算总数
			var car = $('.cargoods').get(0);
			car.innerHTML = '';
			car.innerHTML += carlist.map(function(item){
				totalPrice += item.price * item.qty;
				totalNum +=item.qty*1;
				return `<li class="goods clearfix" data-guid="${item.id}">
						<label class="label_che"><input type="checkbox"></label>
						<a href="../html/details.html?id=${item.id}" class="goods_goods clearfix">
							<img src="${item.imgurl}">
							<p class="goods_title">${item.title}</p>
							<p class="goods_ele"><span>颜色：咖啡色</span><span>款式：共同</span></p>
						</a>
						<b class="goods_price">${item.price}.00</b>
						<label class="goods_do"><span>-</span><input type="text" value="1"><span>+</span></label>
						<b class="goods_total">${totalPrice}</b>
						<p class="good_del">删除</p>
						</li>`
			}).join('');

			
			$('.goodsnum').html(totalNum);
			$('.total_price').html(totalPrice);
			// var goodstotal = document.querySelector('#goodstotal');
			// goodstotal.innerHTML = totalPrice;
		}
		
		var $checkbox = $('.goods label :checkbox');
		$('.all').click(function(){
			$checkbox.prop('checked',this.checked);
			$('.alltotal').prop('checked',this.checked);
			checkAllStatus();
		})
		$('.alltotal').click(function(){
			$checkbox.prop('checked',this.checked);
			$('.all').prop('checked',this.checked);
			checkAllStatus();
		})

		$('.goods').on('click','label.label_che',function(){
			$(this).prop('checked',this.checked);
			checkAllStatus();
			// var $price = $(this).parent().children().eq(4).text();
			// arr.push($price*1);
			
			checkAllStatus();
		})

		function checkAllStatus(){
			
			$checkedbox = $checkbox.filter(':checked');
			$('.all').prop('checked',$checkbox.length === $checkedbox.length);
			$('.alltotal').prop('checked',$checkbox.length === $checkedbox.length);
			$('.total_num').html($checkedbox.length);
			// var total = 0;
			// for(var i=0;i<$checkedbox.length;i++){
			// 	total +=$checkedbox.eq(i).parent().children().eq(4).text();
			// }
			// console.log(total);
			
		}

		$('.goods').on('click','p.good_del',function(){
			console.log($(this).parent())
			var currentLi = $(this).parent()[0];
			$(this).parent().remove();
			var guid = currentLi.getAttribute('data-guid');
			console.log(guid);
			for(var i=0;i<carlist.length;i++){
				if(carlist[i].id === guid){
					carlist.splice(i,1);
					break;
				}
			}
			var date = new Date();
			date.setDate(date.getDate()+7);
			document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString() +';path = '/'';
			render();
			
		});
		
	

	})
})
