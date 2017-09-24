/*
	* 避免污染全局命名空间
	* 定义模块时，指定依赖
 */
define(['jquery'],function($){
	// 在require引入模块时，回调函数中得到什么，取决于这里return什么
	return {
		randomColor:function (){
			var str = '0123456789abcdef';

			var res = '#';
			for(var i=0;i<6;i++){
				var idx = Math.floor(Math.random()*str.length);
				res += str[idx];
			}
			return res;
		},
		randomNumber: function (min,max){
			var res = parseInt(Math.random()*(max-min+1)) + min;

			return res
		},
		getSize:function(selector){
			return {
				width:$(selector).width(),
				height:$(selector).height()
			}
			
		}

	}
})