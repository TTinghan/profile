// 选项卡标签的切换
var tabs = document.getElementById("tabs").getElementsByTagName("li");
console.log(tabs);

// 商品信息的切换
var lists = document.getElementById("lists").getElementsByTagName("ul");
console.log(lists);

for(var i=0; i<tabs.length; i++){
    tabs[i].onclick = showlist;
}

var scrollTop = document.documentElement.scrollTop;
console.log(scrollTop);

// 点击操作
function showlist(){
    for(i=0; i<tabs.length; i++){
        if (tabs[i] === this){
            tabs[i].className = "active";
            lists[i].className = "clearfix active";
        }
        else{
            tabs[i].className = "";
            lists[i].className = "clearfix";
        }      
    }
}
var seckillNav = document.getElementById("seckillNav");
// 监听浏览器页面滚动的事件
window.onscroll = function(){
    // 浏览器兼容
    var scrollTop = document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop||0;
    if(scrollTop>=260){
        // 如果大于时固定
        seckillNav.className = "seckill-nav seckill-navfixed";
    }
    else{
        // 不大于时不固定
        seckillNav.className = "seckill-nav";
    }
    console.log(scrollTop);
}


