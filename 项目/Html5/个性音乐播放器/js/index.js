// 获取音乐播放器
var oAudio = document.getElementById('audio'),
    // 获取当前音乐播放时间
    CurrentTime = document.getElementsByClassName('current-time')[0],
    // 获取音乐播放总时间
    oAllTime = document.getElementsByClassName('all-time')[0],
    // 获取播放按钮
    oStart = document.getElementsByClassName('start')[0],
    // 获取播放控件
    oBtn = document.getElementsByClassName('btn')[0],
    // 获取iconfont播放矢量图元素标签
    oSpan = oBtn.getElementsByClassName('iconfont')[1],
    // 获取进度条活动状态
    oProActive = document.getElementsByClassName('pro-active')[0],
    // 获取进度条的容器盒子
    oProBox = document.getElementsByClassName('pro-box')[0],
    // 获取音乐小圆点的容器盒子
    oRadioBox = document.getElementsByClassName('radio-box')[0],
    // 获取唱片图片
    oImg = document.getElementsByClassName('img')[0],
    // 获取上一曲按钮
    oPrevious = document.getElementsByClassName('previous')[0],
    // 获取下一曲按钮
    oNext = document.getElementsByClassName('next')[0],
    // 获取图片音乐内容容器
    oMain = document.getElementsByClassName("main")[0];
// 获取计时器时间
var timer,
    // 获取当前音乐总时长
    duration,
    // 获取进度条的盒子宽度
    bgWidth = 212;
// 创建图片数组
var imgAry = [
    "http://p0.so.qhmsg.com/bdr/_240_/t01d569bb5ad9d0c195.jpg",
    "https://imgessl.kugou.com/stdmusic/20190116/20190116133013972079.jpg",
    "https://imgessl.kugou.com/stdmusic/20161229/20161229233400375274.jpg",
    "https://imgessl.kugou.com/stdmusic/20180629/20180629183230180126.jpg"
];
// 创建音乐数组
var musicAry = [
    "http://fs.w.kugou.com/201901261950/e04c51b986c181c24eaa6f38d596ae87/G095/M09/02/13/nw0DAFkYax2AFr6pADFA-SgCRo0220.mp3",
    "http://fs.w.kugou.com/201901262006/7801f83fa0609d2771b4ff6c2fe2bc7a/G106/M0A/0E/15/qg0DAFwclZ2AX7I0AENmj9ZonyU174.mp3",
    "http://fs.w.kugou.com/201901262018/772b2f77262f6e5a31d834f0e63c4a9f/G083/M08/00/04/84YBAFhks0aAYGsBADl8RUL2DXQ825.mp3",
    "http://fs.w.kugou.com/201901261956/d891e304facf024539b4e9509d05a191/G085/M09/02/11/NZQEAFs2Ee6APmfGADRMJ_HKl9o172.mp3"
];
// 显示歌曲名
var oMusicName = document.getElementsByClassName('musicName')[0];
var musicNameAry = ["「 刚好遇见你.mp3 」",
    "「 知否知否.mp3 」",
    "「 光年之外.mp3 」",
    "「 way back home.mp3 」"];
// 显示歌手
var oName = document.getElementsByClassName('name')[0];
var nameAry = ["冯提莫 ♪ ", "郁可唯&胡夏 ♪", "邓紫棋 ♪", " SHAUN ♪"];
// 设置数组索引值
var num = 0;
var len = musicAry.length;

// 如果是线上资源获取 再获取时间 用ondurationchange方法更佳
// window.onload是等所有资源都加载完成才。。。
//每次重新加载资源 触发一次 onloadedmetadata方法
// 本地资源加载时,每次播放时才会触发，获取总时长用oncanplay方法更佳
oAudio.oncanplay = function timeSet() {
    // console.log(this);
    // 进度条从0开始
    CurrentTime.innerHTML = convarsion(oAudio.currentTime);
    // 获取当前音乐总时长
    duration = this.duration;
    oAllTime.innerHTML = convarsion(duration);
}
// 转换时间数字形式00:00
function convarsion(time) {
    // 三步运算符进行判断，是否大于10，小于就拼接0在前面，否则就直接打印
    var sec = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);//秒
    var min = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);//分
    return min + ':' + sec;
}
// 设置音乐的播放
oStart.onmouseup = function () {
    if (oAudio.paused) {
        musicPlay();//执行播放
        oImg.style.animationPlayState = 'running';
    } else {
        musicPause();//执行暂停
        oImg.style.animationPlayState = 'paused';
    }
}
// 计算音乐播放时长
function movePro() {
    // 声明当前时长
    var currentTime = oAudio.currentTime;
    // console.log(currentTime);
    // 获取当前音乐播放的时间
    CurrentTime.innerHTML = convarsion(currentTime);
    oProActive.style.width = 8 + currentTime / duration * bgWidth + 'px';
}
// 音乐播放
function musicPlay() {
    oAudio.play();
    oSpan.innerHTML = '&#xe65d;';
    // 每隔1秒调一格，但是为了追求计时器的精准，设置为200ms
    timer = setInterval(movePro, 200);
    oImg.style.transform = "rotate(0deg)";
    oImg.style.animation = "move 6s linear infinite";
}
// 音乐暂停
function musicPause() {
    oAudio.pause();
    oSpan.innerHTML = '&#xe640;';
    clearInterval(timer);
}
// 切换上一曲
oPrevious.onclick = function preMusic() {
    change(-1);
    // num--;
    // if (num < 0) {
    //     num = len - 1;
    // }
}
//切换下一曲
oNext.onclick = function nextMusic() {
    change(1);
    // num++;
    // if (num > len - 1) {
    //     num = 0;
    // }
}
function change(Num) {
    clearInterval(timer);
    num += Num;
    if (num > len - 1) {
        num = 0;
    } else if (num < 0) {
        num = len - 1;
    }
    oMain.innerHTML = "<img src='' alt='' class='img'>";
    oImg = document.getElementsByClassName("img")[0];
    oImg.src = imgAry[num];
    oAudio.src = musicAry[num];
    oName.textContent = nameAry[num];
    oMusicName.textContent = musicNameAry[num];
    console.log(oName);
    console.log(oName.textContent);
    // 路径改变时需要重新加载音乐
    oAudio.load();
    oImg.style.transform = "rotate(0deg)";
    oImg.style.animation = "move 6s linear infinite paused";
    musicPlay();
}

// 音乐进度条每秒时长的计算：
// currentTime / duration = width / bgWidth
// currentTime / duration * bgWidth = width

// 设置当前音乐播放结束后的操作
oAudio.onended = function () {
    // 音乐暂停
    musicPause();
    // 清空计时器
    clearInterval(timer);
    // 音乐时间从00：00开始
    oAudio.currentTime = 0;
    CurrentTime.innerHTML = convarsion(0);
    // 设置进度条初始宽度8px
    oProActive.style.width = 8 + 'px';
    // 自动播放下一曲音乐，触发点击事件
    oNext.onclick();
}

// 鼠标按下 down-->move-->up
oRadioBox.onmousedown = function () {
    // 当鼠标按下时清空计时器 使进度条和时间不再自动增
    clearInterval(timer);
    // 声明拖拽后的当前的时间c
    var c = oAudio.currentTime;
    // 鼠标移动，拖拽
    document.body.onmousemove = function (e) {
        // 鼠标距离浏览器页面最左侧的x坐标值 - 当前该元素距离浏览器左侧的left值
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;
        console.log(newWidth);
        if (newWidth < 8) {
            newWidth = 8;
        } else if (newWidth > 220) {
            newWidth = 220;
        }
        oProActive.style.width = newWidth + 'px';
        // 拖动进度条获取当前时间
        c = (newWidth - 8) / bgWidth * duration;
        // oAudio.currentTime = c;
        // 显示当前的拖拽时的进度时间的变化
        CurrentTime.innerHTML = convarsion(c);
    }
    // 鼠标抬起
    document.body.onmouseup = function () {
        // 取消移动的事件
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        musicPlay();
        oAudio.currentTime = c;
    }
}
// 音量调整

// 获取音量小圆点的容器盒子
var oRadioBox1 = document.getElementsByClassName('radio-box1')[0],
    // 获取音量容器
    oVolBox = document.getElementsByClassName('volume-box')[0],
    // 获取iconfont喇叭矢量图元素标签
    oBee = oVolBox.getElementsByClassName('iconfont')[0],
    // 获取进度条动作
    oVolActive = document.getElementsByClassName('volume-active')[0],
    // 获取音量背景色的容器
    oVolBg = document.getElementsByClassName('volume-bg')[0];
oRadioBox1.onmousedown = function () {
    var vol;
    document.body.onmousemove = function (a) {
        var nowHeight = a.clientY - oVolBg.getBoundingClientRect().top;
        // 获取音量的最大高度值
        var maxHeight = oVolBg.offsetHeight;
        if (nowHeight < 0) {
            nowHeight = 0;

        } else if (nowHeight > maxHeight) {
            nowHeight = maxHeight;
        }
        oVolActive.style.height = maxHeight - nowHeight + 'px';
        // oRadioBox1.style.top = nowHeight - 10 + 'px';

        // 拖动进度条获取当前音量数 最大-->最小
        vol = parseInt((maxHeight - nowHeight) / maxHeight * 10) / 10;
        // vol = parseInt((nowHeight) / maxHeight * 10) / 10;
        // oAudio.volume = vol;
        if (vol >= 0 && vol <= 1) {
            oAudio.volume = vol;
            oBee.innerHTML = '&#xe60c;';
        }
        if (vol == 0) {
            oAudio.volume = vol;
            oBee.innerHTML = '&#xe60a;';
        }
        console.log(oAudio.volume);
        document.body.onmouseup = function () {
            // 取消移动的事件
            document.body.onmousemove = null;
            document.body.onmouseup = null;
            // musicPlay();
        }
    }
}
// 显示音量盒子
var oVolume = oVolBox.getElementsByClassName("volume")[0],
    oBgColorBox = document.getElementsByClassName("bgcolor-box")[0];
oVolume.onmousemove = function () {
    // console.log(this);
    if (this.className != "show") {
        this.className = "show";
        oBgColorBox.style.display = "block";
    }
}
oVolume.onmouseout = function () {
    // console.log(this);
    if (this.className != "")
        this.className = "";
    oBgColorBox.style.display = "none";
}
