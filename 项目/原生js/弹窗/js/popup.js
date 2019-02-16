var myAD = document.getElementById("myAD");
var myClose = document.getElementById("myClose");
var adHeight = 0;//广告的初始高度为0

myClose.onclick = function(){
    show = setInterval(adHiddenFunc,20);
    // myAD.style.display = "none";//通过调整css属性让广告消失掉
}
//var show = setInterval(adShowFunc,20);//存储清理的计时器
// setInterval(adShowFunc,20);设置计时器，通过函数让广告的高度变化每20ms执行一次

function adShowFunc(){
    if(adHeight < 321){//使图片在恰当的额位置停止
        adHeight += 2;//广告的高度每次增加2像素
        myAD.style.height = adHeight + "px";//设置广告的高度，赋值的是字符串
    }else{
        myAD.style.height = "321px";
        adHeight = 321;
        clearInterval(show);//清除计时器，同时需要一个东西存储计时器
    }           
}

function adHiddenFunc(){//弹窗向下慢慢消失
    if(adHeight > 0){
        adHeight -= 2;
        myAD.style.height = adHeight + "px";//设置广告的高度，赋值的是字符串        
    }else{
        myAD.style.height = "0";
        adHeight = 0;
        clearInterval(show);//清除计时器，同时需要一个东西存储计时器
    }
}
window.onload = function(){//整个页面加载完以后，再去做后续的事情  
    show = setInterval(adShowFunc,20);//计时器启动
} 