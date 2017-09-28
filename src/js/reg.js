// ÁÐ±íÒ³
/*jQuery(function($){
	console.log('list');

	$('body').css({backgroundColor:'#f00'});
});
*/
require(['config'],function(){
	require(['jquery','common'],function($,com){

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
			
		})

		
	})
})
