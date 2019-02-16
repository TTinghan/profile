var stage = document.getElementById('stage');
var hammer = document.getElementById('hammer');
var Score = document.getElementById('score');
var CountDown = document.getElementById('countdown');
var container = document.getElementsByClassName('container')[0];
var start = document.getElementById('start');
var end = document.getElementById('end');
var prompt = document.getElementById('prompt');
// 监听鼠标按下事件
stage.onmousedown = function () {
    hammer.src = "img/hammer2.png";
}
// 监听鼠标松开事件
stage.onmouseup = function () {
    hammer.src = "img/hammer1.png";
}
// 监听鼠标移动事件
stage.onmousemove = function (e) {
    // 获取鼠标的位置
    var x = e.clientX;
    var y = e.clientY;
    // 跟随鼠标
    hammer.style.top = e.clientY - stage.getBoundingClientRect().top + "px";
    hammer.style.left = e.clientX - stage.getBoundingClientRect().left + "px";
    // 隐藏小锤子
    if (y >= 850 | x >= 1050) {
        hammer.style.display = "none";
    } else {
        hammer.style.display = "block";
    }
}
//点击小老鼠
var index = true;
var ScoreValue = 0;//分数
Score.innerText = ScoreValue;//初始化分数

//碰撞检测--》小锤锤老鼠
stage.onclick = function (e) {
    // 获取鼠标点
    var x = e.clientX;
    var y = e.clientY;
    // 获取老鼠和洞口的 交接点
    var x1 = mouseAry[mouseID].offsetLeft + hollowAry[mouseID].offsetLeft + 300;
    // console.log(x1);
    var x2 = x1 + mouseAry[mouseID].offsetWidth;
    var y1 = mouseAry[mouseID].offsetTop + hollowAry[mouseID].offsetTop;
    var y2 = hollowAry[mouseID].offsetTop + hollowAry[mouseID].offsetHeight;
    // 判断鼠标是否点中 交接点
    if (x > x1 && x < x2 && y > y1 && y < y2) {
        mouseAry[mouseID].src = "img/mouse2.png";
        // 分数判断
        if (index) {
            index = false;
            ScoreValue++;
            Score.innerText = ScoreValue;
        }
    }
}
// 倒计时的
var Shijian = 60;//一分钟
var Thestart = 0;
var Thelast = 10;//倒数10秒
// 小老鼠的
var hollowAry = []; //小洞口的数组
var mouseAry = [];  //老鼠的数组
var initTop = 102; //初始top值
var EndTop = 0;    //最终top值
var nowTop = 102;  //当前top值
// 等待时间的
var waitTime = 0; //初始时间
var time = 40;     //30毫秒
var WMaxtime = 1000; // 1秒
var timer1, timer2, timer3;
// 初始化倒计时
CountDown.innerText = "01:" + "0" + Thestart;
function sj() {
    Shijian -= 1;
    if (Shijian < Thelast) {
        Shijian = "0" + Shijian;
    }
    if (Shijian == Thestart) {
        hammer.style.display = "none";
        prompt.style.display = "block";
        container.style.zIndex = "999";
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
    }
    CountDown.innerText = "00:" + Shijian;
}
// 获取小老鼠和洞口
for (var i = 0; i < 9; i++) {
    hollowAry[i] = document.getElementById('mouse' + (i + 1));
    mouseAry[i] = hollowAry[i].getElementsByTagName("img")[0];
}
// 随机生成 老鼠
var mouseID = parseInt(Math.random() * 9);
var What = null;
// 每两秒生成一个老鼠
function mouseUp() {
    if (What == null) {
        // 生成老鼠
        mouseID = parseInt(Math.random() * 9);
        // 初始化值
        nowTop = initTop;
        waitTime = 0;
        mouseAry[mouseID].src = "img/mouse1.png";
        timer1 = setInterval(mouseShow, time);
    }
}
// 让老鼠跳出洞口
function mouseShow() {
    if (nowTop > EndTop) {
        nowTop -= 8;
    }
    if (nowTop < EndTop) {
        nowTop = EndTop;
    }
    if (nowTop == EndTop) {
        //  跳出洞口后等待1秒
        if (waitTime < WMaxtime) {
            waitTime += 100;
        }
        if (waitTime >= WMaxtime) {
            nowTop = initTop;
            index = true;
            What = null;
            clearInterval(timer1);
        }
    }
    mouseAry[mouseID].style.top = nowTop + "px";
}
// 开始游戏
var kg = 1;
start.onclick = function () {
    container.style.zIndex = "-1";
    ScoreValue = 0;
    Score.innerText = ScoreValue;
    if (kg) {
        kg = 0;
        timer2 = setInterval(mouseUp, 2000);
        timer3 = setInterval(sj, 1000);
    }
}
// 结束游戏
end.onclick = function () {
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
    CountDown.innerText = "01:" + "00";
    mouseAry[mouseID].style.top = initTop + "px";
    prompt.style.display = "block";
    container.style.zIndex = "999";
    kg = 1;
    Shijian = 60;
}
// 切出页面
window.onblur = function () {
    kg = 1;
    window.location.reload();
}
