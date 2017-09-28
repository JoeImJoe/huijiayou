// 列表页
/*jQuery(function($){
	console.log('list');

	$('body').css({backgroundColor:'#f00'});
});
*/
require(['config'],function(){
	require(['jquery','common'],function($,com){

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
