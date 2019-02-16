var main = document.getElementById('main');
var go = document.getElementById('go');
var speed = 5, num = 0, timer, flag = true;
var colors = ['red', 'green', 'black', 'blue'];

function cDiv() {
    // 创建行
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.setAttribute('class', 'row');
    // 创建列   一行中有四列
    for (var j = 0; j < 4; j++) {
        var iDiv = document.createElement('div');
        // 将创建的列div插入到行中
        oDiv.appendChild(iDiv);
    }
    // 如果main区域为空  没有任何行元素
    // 直接将新创建的这一行插在main区域中
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        // 如果当前区域已经存在行元素 将新生成的行插在原有元素行之前
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    // 将一行中的四列中随机挑选一列添加上class类名，
    // 并且添加一个随机颜色，作为被点击的块
    for (var i = 0; i < 4; i++) {
        if (i == index) {
            var clickDiv = main.childNodes[0].childNodes[index];
            //    为当前点击div设置上class类名 作为标记
            clickDiv.setAttribute('class', 'i');
            clickDiv.style.backgroundColor = colors[index];
        }
    }
}

function move() {
    // 先清除一下定时器
    clearInterval(timer);
    // 设置定时器 将main移动
    timer = setInterval(function () {
        // 获得到运动区域的top值 加上速度值 改变top值
        // 看起来是每一行向下移动
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        // 当main运动到wrapper区域内 将main移到top值为-150同时在上面插入新的一行
        if (parseInt(main.offsetTop) >= 0) {
            cDiv();
            main.style.top = '-150px';
        }
        var len = main.childNodes.length;
        // 判断下移元素的最后一行中是否包含未点击方块
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].children[i].classList.contains('i')) {
                    // 利用已经标记的class进行判断  
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    // flag 用于标记当前游戏是否结束
                    flag = false;
                }
            }
            // 当元素运动到最下方 移除main区域中的最后一行
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20);
    bindEvent();
}


function bindEvent() {
    main.addEventListener('click', function (e) {
        if (flag) {
            var tar = e.target;
            // 判断点击方块的class名 正确则改变当前方块的背景颜色 并且分数加一
            if (tar.className == 'i') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('i');
                num++;
            } else {
                // 如果没有点击正确方块  游戏结束
                alert('游戏结束，得分：' + num);
                clearInterval(timer);
                // flag 用于标记当前游戏是否结束
                flag = false;
            }
            // 提高速度  改变每次改变的距离
            // 当当前分数达到能被10整除时 提高速度
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}

function clickStart() {
    go.addEventListener('click', function () {
        go.style.display = 'none';
        move();
    })
}
clickStart();
