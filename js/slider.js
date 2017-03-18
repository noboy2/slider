// JavaScript Document



//for slider plug

/*-------------------------------------
   运用：
   
   slider({
		sliderBox:"#slider",
		sliderList:"#slider ul li",
		showsize:1,
		arrow:
		{
			isBtn:true,
			leftBtn:".aleft",
			rightBtn:".aright"
		},
		isAutoPlay:true,   新增两个类：aleft和aright                                      
		showTime:3000,
		isSubNum:true,     单独开启数字导航（不带标题）新增两个id:#subNum(父级)，#subList(列表),当前状态类：subOn
		smallImg:true,     开启缩略图
		samllSize:3,       缩略图显示个数
		bind:"click",      
		effect:"fade"      三种切换模式可选 fade|left|top
		hasTitle:true      除了上面新增数字导航的东西还多了一个id：#subTitle   必须给img设置alt属性值
		});

   默认状态：左右箭头关闭，数字导航关闭，带标题关闭，自动播放关闭，显示个数为2；
   

--------------------------------------*/

var slider=function(opt){
    //settings
    var settings=jQuery.extend({
        sliderBox:"#slider",//整个图片展示id
        sliderList:"#slider ul li",//图片列表
        now:0,//默认选中标签下标
		arrow:{
				isBtn:false,//是否需要左右按钮
				leftBtn:".aleft",//左边按钮
				rightBtn:".aright"//右边按钮
			},
		showsize:2,//主图显示个数
		isAutoPlay:false,//是否自动播放
		showTime:3000,//自动播放切换时间
		isSubNum:false,//是否增加数字导航
		hasTitle:false,//是否带标题
		smallImg:false,//是都带缩略图
		smallSize:3,//缩略图显示个数
		organWidth:0,//风琴效果---水平（宽度）
		organHidth:0,//风琴效果---垂直（高度）
		bind:"click",//鼠标事件
		effect:"fade",//大图切换效果 left,top,fade,organ
		callBack:false//回调
    },opt);
    var 
        $now=settings.now,
		aBtn=settings.arrow,
		$showsize=settings.showsize,
		isBtn=aBtn.isBtn,
		$leftBtn=$(aBtn.leftBtn),
		$rightBtn=$(aBtn.rightBtn),
		$sliderBox=$(settings.sliderBox),
        $sliderList=$(settings.sliderList),
		isAutoPlay=settings.isAutoPlay,
		isSubNum=settings.isSubNum,
		hasTitle=settings.hasTitle,
		smallImg=settings.smallImg,
		$smallSize=settings.smallSize,
		$organWidth=settings.organWidth,
		$organHeight=settings.organHeight,
		$bind=settings.bind,
		$effect=settings.effect,
		$showTime=settings.showTime,
        callBack=settings.callBack;
		
    var maxSize=$sliderList.size();//列表总条数
	var $liH=$sliderList.eq(0).outerHeight(true);
	var $liW=$sliderList.eq(0).outerWidth(true);//单张图片的宽度+（包括margin padding border的值）
	var $liW2=$sliderList.eq(0).outerWidth()//单张图片的宽度（包括padding border,不包括margin的值）
	var $liMargin=$liW-$liW2;//求出 margin 左右的值
	if($effect!="organ")
	{
		$sliderList.parent().parent().css("width",$liW*$showsize-$liMargin+'px');//图片展示区域尺寸
	}
	
	//$sliderList.parent().css("width",maxSize*$liW);//图片列表的总宽度
	imgEffect();

	
	function imgEffect(index)
	{
		switch($effect)
		{
			case "left":
			            $sliderList.parent().css({position:"absolute",top:"0",width:maxSize*$liW+'px',height:$liH+'px'});
						$sliderList.css({"float":"left"});
						$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});
						break;
			case "top":	
			           $sliderList.parent().css({position:"absolute",left:"0",width:$liW+'px',height:maxSize*$liH+'px'});
					   $sliderList.css({"float":"left"});
					   $sliderList.parent().stop(true).animate({"top":-$liH*index+'px'},{duration:1000,easing:"easeInOutCubic"});
					   break;	
			case "fade":
			          
					   $sliderList.parent().css({position:"relative",width:$liW+'px',height:$liH+'px'});
					   $sliderList.css({"position":"absolute",left:0,top:0,zIndex:1,opacity:0.5});
					   $sliderList.eq(index).stop(true).css({zIndex:99}).animate({opacity:1},{duration:1000,easing:"easeOutCubic"});
					   break;
			case "organ":
					   $sliderList.find("a").bind($bind,function(){
						  $(this).parent().addClass("liOn").siblings().removeClass("liOn");
						  $(this).siblings().show().stop(true).animate({height:$organHeight+'px'},{duration:500,easing:"easeOutQuad"});
						  $(this).parent().siblings().find("div").stop(true).animate({height:0},{duration:500,easing:"easeOutQuad",complete:function(){$(this).hide()}})
					   })
					   break;		   
		}
	}	
	
	if(isSubNum)//判断如果有数字导航时执行
	{
		if(hasTitle)
		{
			var subNumHtml='<div id="subNum"><div id="subTitle"></div><div id="subList"></div></div>';
			$sliderBox.append(subNumHtml);
			var imgAlt=$sliderList.find("img").eq(0).attr("alt"); 
			$("#subTitle").html(imgAlt);

		}
		else
		{
			var subNumHtml='<div id="subNum"><div id="subList"></div></div>';
			$sliderBox.append(subNumHtml);
		}
		
		for(var i=0;i<maxSize;i++)
			{
				var numListHtml='<span>'+(i+1)+'</span>'
				$("#subList").append(numListHtml);
				
			}
			$("#subList").find("span").eq(0).addClass("sOn");
			
		$("#subList").find("span").bind($bind,
			function(){
				$(this).addClass("sOn").siblings().removeClass("sOn");
				var index=$(this).index();
				    imgEffect($now);
					//$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});	
					$now=index;	
			});
	};
	
	
	if(smallImg)   //判断是否带缩略图
	{

		var smallImgHtml='<div id="smallImg"><ul></ul></div>'
		$("#slider").append(smallImgHtml);
		
		$sliderList.each(function(){
			var bigSrc=$(this).find("img").attr("src");
			bigSrc=bigSrc.split(".");		
			var smallImgList='<li><a href="javascript:void(0)"><img src="'+bigSrc[0]+'b.jpg" /></a></li>';
		$("#smallImg ul").append(smallImgList);
		});
		
		var smallUl=$("#smallImg ul");
		var smallLi=$("#smallImg ul li");
		var smallLiW=$("#smallImg ul li").eq(0).outerWidth(true);
		var smallLiW2=$("#smallImg ul li").eq(0).outerWidth();
		var smallLiMargin=smallLiW-smallLiW2;
		var smallLiH=$("#smallImg ul li").eq(0).outerHeight(true);
		
        $("#smallImg").css({
			width:smallLiW*$smallSize-smallLiMargin+'px',
			height:smallLiH+"px",
			overflow:"hidden"
		});
		
		smallUl.css({
			width:maxSize*smallLiW+'px',
			height:smallLiH+"px",
			position:"absolute",
			left:0,
			top:0	
		});
		
		smallLi.bind($bind,
			function(){
				var index=$(this).index();
				    smallLi.removeClass("lOn");
				    $(this).addClass("lOn");
					if(maxSize-$smallSize>index-1)
					{
						smallUl.stop(true).animate({"left":-smallLiW*index+'px'},{duration:1000,easing:"easeInOutCubic"});	
					}	
					else if(index>=maxSize-1)
					{
						smallUl.stop(true).animate({"left":-smallLiW*(maxSize-$smallSize)+'px'},{duration:1000,easing:"easeInOutCubic"});	
					}
					
					else if(index>maxSize)
					{
						smallUl.stop(true).animate({"left":0},{duration:1000,easing:"easeInOutCubic"});
					}
					if($now!=index)
					{
						imgEffect(index);
					}
					//$sliderList.parent().stop(true).animate({"left":-$liW*index+'px'},{duration:1000,easing:"easeInOutCubic"});	
					$now=index;	
			});
			
	}
	
	if(isBtn==true)//判断如果有左右箭头时执行
	{
		var arrowHtml='<a class="aleft" href="javascript:void(0)">向左</a><a class="aright" href="javascript:void(0)">向右</a>';
		$sliderBox.append(arrowHtml);
		$leftBtn=$(aBtn.leftBtn);
		$rightBtn=$(aBtn.rightBtn);
		$rightBtn.click(clickRight);
	    $leftBtn.click(clickLeft);
	}	
	
	
   //图片滚动的位置
	function imgPosition()
	{
		if(smallImg)
		{
			
			
			 smallLi.removeClass("lOn");
		     smallLi.eq($now).addClass("lOn");
			if(maxSize-$smallSize>$now-1)
			{
				smallUl.stop(true).animate({"left":-smallLiW*$now+'px'},{duration:1000,easing:"easeInOutCubic"});	
			}	

			else if($now>=maxSize-1)
			{
				smallUl.stop(true).animate({"left":-smallLiW*(maxSize-$smallSize)+'px'},{duration:1000,easing:"easeInOutCubic"});	
			}
			
			else if($now>maxSize)
			{
				smallUl.stop(true).animate({"left":0},{duration:1000,easing:"easeInOutCubic"});
			}	
		}
		imgEffect($now);
		//$sliderList.parent().stop(true).animate({"left":-$liW*$now+'px'},{duration:1000,easing:"easeInOutCubic"});
	}
   
	//点击左箭头
	function clickLeft()
	{
		if($now<=0)
		{
			$now=maxSize-$showsize;
		}
		else
		{
			$now--;
		}
		
		imgPosition();
	}
	
	
	//点击右箭头
	function clickRight()
	{
		if($now>=maxSize-$showsize)
		{
			$now=0;
		}
		else
		{
			$now++;
		}
		
		if(isSubNum==true)
		{
			if(hasTitle==true)
			{
				var imgAlt=$sliderList.find("img").eq($now).attr("alt"); 
				$("#subTitle").html(imgAlt);
			}	
			$("#subList").find("span").removeClass("sOn").eq($now).addClass("sOn");	
		}
		
		imgPosition();
			
	}
	
	//自动播放
	var timer=null;
	function autoPlay()
	{
		clearInterval(timer);
		timer=setInterval(clickRight,$showTime);		
	}
	if(isAutoPlay)
	{
		autoPlay();
		$sliderBox.hover(
		function(){clearInterval(timer);},
		function(){autoPlay();})
	}
};


