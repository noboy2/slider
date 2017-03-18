/*===========================
Theme:slide show
Author:xian 
Date:2017.03.16 
Dependent version:jQuery v1.9.1

instruction(主要参数说明):
                      isBtn：       (是否开启箭头切换)
                      showNum：     (主图片显示数量)
                      showTime:     (轮播时间间隔.毫秒)
                      seamless:     (是否无缝轮播)
                      isAutoPlay:   (是否自动轮播)
					  isSubNav:     (是否开启下标导航)
					  isImgNav:     (是否开启小图导航)
					  smallImgNum:  (小图导航显示个数)
					  oSmallImg :   (小图导航标签ID)
					  hasTitle:     (是否开启显示标题.需设置alt值)
					  bind :        (触发事件 click|mouseover)
					  effect :      (展示方式 fade|left|top)
=================================*/
(function(){
    $.fn.extend({
		slider:function(options, callback){
			var defaults={
				oDiv : "#slider",
				oCon : "#slider ul",
				aList : "#slider ul li",
				hasArrow : {
					isBtn:true,
					nextBtn:".aNext",
					prevBtn:".aPrev"
				},
				showCur : 0,
				showNum : 1,
				showTime : 3000,
				seamless : false,
				isAutoPlay : true,
				isSubNav : true,
				isImgNav : true,
				oSmallImg : "smallImg",
				oSmallUl : null,
				aSmallLi : null,
			    smallLiW1 : null,
			    smallLiW2 : null,
			    smallLiH1 : null, 
			    smallLiH2 : null, 
			    smallLiMargin1 : null,
			    smallLiMargin2 : null,
				smallImgNum : 4,

				hasTitle : true,
				clickNext : true,
				bind : "click",
				effect : "fade",
				duration:500,
				easing:"swing"
			}; 
			var options = $.extend(defaults, options);
            var callback = callback || function(){};
            $(this).each(function(){
				var $this = $(this),
					$oDiv = $(options.oDiv),
					$oCon = $(options.oCon),
					$aList = $(options.aList),
					$hasArrow = options.hasArrow,
					$isBtn = $hasArrow.isBtn,
					$nextBtn = $($hasArrow.nextBtn),
					$prevBtn = $($hasArrow.prevBtn),
					$showCur = options.showCur,
					$showNum = options.showNum,
					$showTime = options.showTime,
					$seamless = options.seamless,
					$isAutoPlay = options.isAutoPlay,
					$isSubNav = options.isSubNav,
					$isImgNav = options.isImgNav,

					$oSmallImg = options.oSmallImg,
					$oSmallUl = options.oSmallUl,
					$aSmallLi = options.aSmallLi,
				    $smallLiW1 = options.smallLiW1,
				    $smallLiW2 = options.smallLiW2,
				    $smallLiH1 = options.smallLiH1, 
				    $smallLiH2 = options.smallLiH2, 
				    $smallLiMargin1 = options.smallLiMargin1,
				    $smallLiMargin2 = options.smallLiMargin2,

					$smallImgNum = options.smallImgNum,
					$hasTitle = options.hasTitle,
					$clickNext = options.clickNext,
					$bind = options.bind,
					$effect = options.effect,
					$duration = options.duration,
					$easing = options.easing;


				var aListW = $aList.outerWidth(true),
				    aListH = $aList.outerHeight(true),
				    aListLen = $aList.length;
				    $aList.eq(0).addClass("liOn");

				
				var int = {

					   //展示方式
					   imgEffect : function(index){
						   	switch($effect){
						   		case "left":
						   					var oldOn =  $oCon.find(".liOn").index();
									   		$aList.removeClass("liOn");
									   		$aList.eq(index).addClass("liOn");
									   		$oCon.css({"width":aListW*aListLen+"px"});

									   		if($seamless){
									   			if($isSubNav||$isImgNav){
									   				$oCon.css({"width":aListW+"px","position":"relative"});
									   				if(oldOn<index){
									   					$aList.eq(oldOn).stop(true).animate({"left":"-100%"});
									   					$aList.eq(index).css({"left":"100%"}).stop(true).animate({"left":0});
									   				}
									   				else{
									   					$aList.eq(oldOn).stop(true).animate({"left":"100%"});
									   					$aList.eq(index).css({"left":"-100%"}).stop(true).animate({"left":0});
									   				};

									   			}else{
   										   			if($clickNext){
   										   				$oCon.stop(true).animate({"marginLeft":-aListW+"px"},{duration:$duration,easing:$easing,complete:function(){
   										   					$oCon.css({"marginLeft":0}).append($oCon.children().eq(0));	
   										   				}});
   										   			}
   										   			else{
   										   				$oCon.prepend($oCon.children().eq(aListLen-1))
   				            							$oCon.css({"marginLeft":-aListW+'px'}).animate({"marginLeft":0},{duration:$duration,easing:$easing});
   										   			}
									   			}

									   		}
							   		   		else{
							   			   			$oCon.stop(true).animate({"marginLeft":-aListW*index+"px"},{duration:$duration,easing:$easing});
							   			   		};
									   		break;

								case "top":	
											$oCon.css({"width":aListW+'px',"height":$showNum*aListH+'px'});
											$oCon.stop(true).animate({"marginTop":-aListH*index+'px'},{duration:500,easing:"easeInOutCubic"});
											break;	
								case "fade": 
											var oldOn =  $oCon.find(".liOn").index();
											$aList.removeClass("liOn");
											$aList.eq(index).addClass("liOn");
											$oCon.css({position:"relative","width":aListW+'px',"height":aListH+'px'});
											//$aList.css({"position":"absolute","left":0,"top":0,"zIndex":1});
											$aList.eq(index).css({"zIndex":99,"opacity":0}).stop(true).animate({"opacity":1},{duration:$duration,easing:$easing});
											$aList.eq(oldOn).css({"zIndex":1}).stop(true).animate({"opacity":0},{duration:$duration,easing:$easing});
											break;


						   }
					   },

					   //上一个
					   toPrev : function(){
					   		if($oCon.is(":animated")||$aList.is(":animated")){return false;}

					   		$clickNext =  false;
					   		if($showCur <= 0){
					   			$showCur = aListLen-1;
					   		}
					   		else{
					   			$showCur--;
					   		};

					   		if($isSubNav){
					   			$(".subList").find("span").removeClass("sOn");
					   			$(".subList").find("span").eq($showCur).addClass("sOn");
					   		};
					   		int.titlePub();
					   		int.smallPub($showCur);
					   		int.imgEffect($showCur);		
					   },


					   //下一个
					   toNext : function(){
					   		if($oCon.is(":animated")||$aList.is(":animated")){return false;}

					   		$clickNext = true;
					   		if($showCur >= aListLen-1){
					   			$showCur = 0;
					   		}
					   		else{
					   			$showCur++;
					   		};

					   		if($isSubNav){
					   			$(".subList").find("span").removeClass("sOn");
					   			$(".subList").find("span").eq($showCur).addClass("sOn");
					   		};
					   		int.titlePub();
					   		int.smallPub($showCur);
					   		int.imgEffect($showCur);	
					   },

					   

				      //开启箭头
				      hasArrow : function(){
				      		var $this = this;
				      		if($isBtn===true)//判断如果有左右箭头时执行
				      		{
				      			if(aListLen>$showNum)
				      			{
				      				var arrowHtml='<a class="aPrev" href="javascript:void(0)">向左</a><a class="aNext" href="javascript:void(0)">向右</a>';
				      				$oDiv.append(arrowHtml);
				      				$nextBtn = $($hasArrow.nextBtn);
				   					$prevBtn = $($hasArrow.prevBtn);
				      				$nextBtn.click($this.toNext);
				      				$prevBtn.click($this.toPrev);
				      			}	
				      		}	

				      },

				      //显示标题(直接获取图片alt)
				      showTitle : function(){
			      	      if($hasTitle)
			      			{
			      				var subTitle='<div class="subTitle"></div>';
			      				$oDiv.append(subTitle);
			      				int.titlePub();
			      			}
				      },


				      titlePub : function(){
		      			if($hasTitle){
		      				var imgAlt=$aList.eq($showCur).find("img").eq(0).attr("alt"); 
		      				var imgLink=$aList.eq($showCur).find("a").eq(0).attr("href"); 
		      				var titleListHtml='<span><a href="'+imgLink+'" target="_blank">'+imgAlt+'</a></span>';	
		      				$(".subTitle").html(titleListHtml);	
		      			}
				      },


				      //下标导航
				      subNav : function(){
				      	var $this = this;
				      	if($isSubNav)
				      	{
				      		var subNumHtml='<div class="subNum"><div class="subList"></div></div>';
				      			$oDiv.append(subNumHtml);
				      		
				      		for(var i=0;i<aListLen;i++)
				      			{
				      				var numListHtml='<span></span>'
				      				$(".subList").append(numListHtml);	
				      			}
				      			$(".subList").find("span").eq(0).addClass("sOn");
				      			
				      		$(".subList").find("span").bind($bind,
				      			function(){
				      				$(this).addClass("sOn").siblings().removeClass("sOn");
				      				var index=$(".subList span").index($(this))
				      				    $showCur=index;	
				      				    $this.imgEffect($showCur);	
				      					int.titlePub();	
				      			});
				      	};

				      },

				      //小图导航
				      smallImgNav : function(){

				      	if($isImgNav) 
							{
								var smallImgHtml="<div id='"+$oSmallImg+"'><ul></ul></div>";
								$oDiv.append(smallImgHtml);
								
								$oSmallImg = $("#"+$oSmallImg),
								$oSmallUl = $oSmallImg.find("ul");
								    
								for(var i = 0; i < aListLen;i++){
									var bigImgSrc = $aList.eq(i).find("img").attr("src").split("."),
									    smallImgList = '<li><a href="javascript:void(0)"><img src="'+bigImgSrc[0]+'b.jpg" /></a></li>';
									$oSmallUl.append(smallImgList);    
								}

									$aSmallLi = $oSmallUl.find("li"),
								    $smallLiW1 = $aSmallLi.outerWidth(true),
								    $smallLiW2 = $aSmallLi.outerWidth(),
								    $smallLiH1 = $aSmallLi.outerHeight(true), 
								    $smallLiH2 = $aSmallLi.outerHeight(), 
								    $smallLiMargin1 = $smallLiW1 - $smallLiW2;
								    $aSmallLi.eq(0).addClass("liOn");

								$oSmallImg.css({
									"width":$smallLiW1*$smallImgNum-$smallLiMargin1+'px',
									"height":$smallLiH1+"px"
								});
								
								$oSmallUl.css({
									"width":aListLen*$smallLiW1+'px',
									"height":$smallLiH1+"px",
									"position":"absolute",
									"left":0,
									"top":0	
								});


								$aSmallLi.bind($bind,function(){

										var index = $(this).index(),
										    oldIdx = $oSmallUl.find(".liOn").index();	
											if($showCur!=index)
											{
												int.imgEffect(index);
											}
											$showCur=index;	
											int.titlePub();
											int.smallPub(index);		
									});		
							}
				      },

				      smallPub : function(index){

				      	if($isImgNav){
				      		$aSmallLi.removeClass("liOn");
							$aSmallLi.eq(index).addClass("liOn");
				      	    var myNum =index-$smallImgNum+2;
				      		var smallLeft=-myNum*$smallLiW1;

				      		if(aListLen>$smallImgNum){
				      			if(index<$smallImgNum-1){
				      				smallLeft=0;
				      			}
				      			if(index==aListLen-1){
				      				smallLeft=-(myNum-1)*$smallLiW1;
				      			}
				      			$oSmallUl.stop(true).animate({'left':smallLeft+"px"});
				      			}
					      	} 
				      },


					  //自动播放
					  autoPlay : function(){
					  	var timer = null,
					  		$this = this;
					  	function toPlay()
					  	{
					  		clearInterval(timer);
					  		timer=setInterval($this.toNext,$showTime);	
					  	}
					  	if($isAutoPlay)
					  	{
					  		toPlay();
					  		$oDiv.hover(
					  		function(){clearInterval(timer);},
					  		function(){toPlay();})
					  	}
					  }

				};

				int.autoPlay();
				int.hasArrow();
				int.subNav();
				int.showTitle();
				int.smallImgNav();
			})
		}
	})
})(jQuery);