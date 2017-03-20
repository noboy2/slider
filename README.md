# slider
JQUERY幻灯插件（支持无缝滚动、箭头切换、下标导航、小图导航、和自带标题）

```
*目前支持的展示方式：  
*-------fade（淡入淡出）  
*-------left（横向滚动--无缝或回滚）  
*-------top（垂直滚动）  
```


## html代码：
```
<div id="slider" class="slider">
        <div class="sliderCon">
            <ul>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic01.jpg" width="898" height="588" alt="图片1" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic02.jpg" width="898" height="588" alt="图片2" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic03.jpg" width="898" height="588" alt="图片3" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic04.jpg" width="898" height="588" alt="图片4" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic05.jpg" width="898" height="588" alt="图片5" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic06.jpg" width="898" height="588" alt="图片6" /></a></li>
                <li><a href="javascript:void(0)"><img src="images/wallpaper/pic07.jpg" width="898" height="588" alt="图片7" /></a></li>
            </ul>
        </div> 
    </div>
```





js 调用：
=================================================================
$("#slider").slider({});
=================================================================




```
js 参数说明：
=================================================================

*isBtn ：true             (是否开启箭头切换 true|false)   
*showNum ：1              (主图片显示数量 number)   
*showTime : 3000          (轮播时间间隔.毫秒)  
*seamless : false         (是否无缝轮播 true|false)  
*isAutoPlay : true        (是否自动轮播 true|fasle)  
*isSubNav : true          (是否开启下标导航 true|fasle)  
*isImgNav : true          (是否开启小图导航 true|fasle)  
*smallImgNum : 4          (小图导航显示个数 true|fasle)  
*oSmallImg : "smallImg"   (小图导航标签ID string)  
*hasTitle : true          (是否开启显示标题.需设置alt值 true|fasle)  
*bind :  "click"          (触发事件 click|mouseover)  
*effect : "fade"          (展示方式 fade|left|top) 

=================================================================
```