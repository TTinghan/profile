window.onload = function () {

    /**
     *  file的几种获取方式:
     *    1.input type=file的时候 这个控件发生onchange时候 e.target.files
     *    2.drop时候 e.dataTransfer.files
     *    3.input type=file的时候 这个控件的files属性
     *    4.FileReader对象的 onload等事件的时候 e.target.result
     * */

    var oldCode = document.getElementById('oldCode'),
        newCode = document.getElementById('newCode'),
        upfile = document.getElementById('upfile'),
        result = document.getElementsByClassName('result')[0],
        dealBtn = document.getElementsByClassName('blue')[0],
        downBtn = document.getElementsByClassName('green')[0],
        blob,
        reader = new FileReader();

    oldCode.addEventListener('dragover', function (e) {
        e.preventDefault();
    })

    oldCode.addEventListener('drop', function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        read(file);
    })

    /* 粘贴事件 clipBoardEvent*/
    oldCode.addEventListener('paste', function (e) {
        console.log(e);
    })

    upfile.onchange = function (e) {
        var file = e.target.files[0];
        read(file);
    }

    function read(file) {
        if (file && file.name.match(/\.css$/)) {
            downBtn.setAttribute('download', file.name.replace(/\.css$/, '-min.css'));
            reader.readAsText(file);
        } else {
            alert(file.name + '不是css文件!');
        }
    }

    reader.onload = function (e) {
        oldCode.value = e.target.result;
        dealBtn.click();
        blob = new Blob([newCode.value]);
        downBtn.href = URL.createObjectURL(blob);  //创建下载信息
    }

    /* 处理相关数据   正则部分不是很擅长,这部分基本都是照着写*/
    dealBtn.onclick = function () {
        var oldData = oldCode.value, l = oldData.length, newData;
        if (l == 0) {
            alert('尚未添加css代码');
            return false;
        }
        //1.去除注释  /* */  中间包括换行等
        newData = oldData.replace(/\/\*((.|\n|\t)*?)\*\//g, '');
        //2.去除首尾样式空格
        newData = newData.replace(/(\s)*{\s*/g, "{").replace(/(\s)*}\s*/g, '}');
        //3.去除样式间空格
        newData = newData.replace(/(\s)*;\s*/g, ';');
        //4.去除样式名称后面空格
        newData = newData.replace(/:(\s)*/g, ':');
        //5.去除换行符
        newData = newData.replace(/(\n|\t)+/g, '');
        //6.去除末尾分号
        newData = newData.replace(/;}/g, '}');
        newCode.value = newData;
        var nl = newData.length;
        var saveL = l - nl;
        result.innerHTML = '原CSS文件大小大约' + getSize(l) + 'K<br/>现大小约' + getSize(nl) + 'K<br/>节约大小约<span style="color:red">' + getSize(saveL) + '</span>K';
    }

    downBtn.onclick = function () {
        URL.revokeObjectURL(blob);
    }

    function getSize(num) {
        return Math.round(num / 1024 * 1000) / 1000;
    }

}