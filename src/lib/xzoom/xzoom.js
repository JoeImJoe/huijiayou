/*
	放大镜插件
		* 小图
		* 大图
		* 放大镜

	本插件不支持低版本浏览器
		* ie10+
 */
function XZoom(options){
	
	this._init(options);
}

XZoom.prototype = {
	//生成DOM节点
	//绑定事件
	_init:function(options){
		// 默认属性
		var defaults = {
			// 大图的宽高
			width:460,
			height:460,

			// 大图显示位置
			position:'right',

			// 大图与小图的间距
			gap:45,

			// 需要实现放大效果的元素
			ele:'.xzoom'
		}

		// 扩展参数
		var opt = Object.assign({},defaults,options);

		// 小图容器
		this.ele = document.querySelector(opt.ele);

		// 小图
		var smallImg = this.ele.children[0];


		
		//生成DOM节点(大图)
		var big = document.createElement('div');
		big.className = 'xzoom-big';
		var bigImg = new Image();
		bigImg.src = smallImg.src;

		// 定义大图样式
		big.style.width = opt.width + 'px';
		big.style.height = opt.height + 'px';

		big.appendChild(bigImg);

		smallImg.onload = ()=>{
			// 大图位置
			if(opt.position === 'right'){
				big.style.left = this.ele.offsetLeft + smallImg.offsetWidth + opt.gap + 'px';
				big.style.top = this.ele.offsetTop + 'px';
			}else if(opt.position === 'left'){
				big.style.left = this.ele.offsetLeft - opt.width - opt.gap + 'px';
				big.style.top = this.ele.offsetTop + 'px';
			}else if(opt.position === 'top'){
				big.style.left = this.ele.offsetLeft + 'px';
				big.style.top = this.ele.offsetTop - opt.height - opt.gap + 'px';
			}else if(opt.position === 'bottom'){
				big.style.left = this.ele.offsetLeft + 'px';
				big.style.top = this.ele.offsetTop + this.ele.offsetHeight + opt.gap + 'px';
			}
		}


		// 生成放大镜
		var zoom = document.createElement('span');
		zoom.className = 'minzoom';


		// 传递big
		this.big = big;
		this.zoom = zoom;



		// 鼠标移入移出
		this.ele.onmouseenter = (e)=>{
			// if(不在这个位置){
			// 	return;
			// }
			this.show();
		}
		this.ele.onmouseleave = ()=>{
			this.hide();
		}

		this.ele.onmousemove = (e)=>{
			var left = e.clientX - this.ele.offsetLeft - this.zoom.offsetWidth/2;
			var top = e.clientY - this.ele.offsetTop - this.zoom.offsetHeight/2;

			// 限定left，top值
			if(left<0){
				left = 0;
			}else if(left > smallImg.offsetWidth-this.zoom.offsetWidth){
				left = smallImg.offsetWidth-this.zoom.offsetWidth
			}

			if(top<0){
				top = 0;
			}else if(top > smallImg.offsetHeight-this.zoom.offsetHeight){
				top = smallImg.offsetHeight-this.zoom.offsetHeight
			}

			// 定位放大镜
			// 跟随鼠标移动
			this.zoom.style.left = left + 'px';
			this.zoom.style.top = top + 'px';


			bigImg.style.left = -left * this.ratio + 'px';
			bigImg.style.top = -top * this.ratio + 'px';
		}

	},
	// 显示
	show:function(){
		
		document.body.appendChild(this.big);
		this.ele.appendChild(this.zoom);

		var bigImg = this.big.children[0];
		var smallImg = this.ele.children[0];

		if(bigImg.complete){
			this.ratio = bigImg.offsetWidth/smallImg.offsetWidth;

			// 定义放大镜尺寸
			this.zoom.style.width = this.big.offsetWidth/this.ratio + 'px';
			this.zoom.style.height = this.big.offsetHeight/this.ratio + 'px';
		}

		// 计算大图与小图的比率
		bigImg.onload = ()=>{
			this.ratio = bigImg.offsetWidth/smallImg.offsetWidth;

			// 定义放大镜尺寸
			this.zoom.style.width = this.big.offsetWidth/this.ratio + 'px';
			this.zoom.style.height = this.big.offsetHeight/this.ratio + 'px';
		}
	},
	hide:function(){
		this.big.parentNode.removeChild(this.big);
		this.zoom.parentNode.removeChild(this.zoom);
	}

}


function xZoom(options){
	return new XZoom(options);
}