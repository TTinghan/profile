//-----构造函数封装小组件-----//
function FileLoader(file, events) {
    //文件
    this.file = file;
    //步数1M
    this.step = 1024 * 1024;
    //文件内容的读取
    this.reader = new FileReader();
    //上传文件的大小
    this.total = file.size;
    //上传的当前总长度
    this.loaded = 0;
    //获取用户对象
    this.events = events;
    //执行读取文件操作
    this.readBlob(this.reader, 0, this.step);
    this.bindEvent();
}
// 将函数拓展到对象下面
FileLoader.prototype = {
    readBlob: function (reader, start, step) {//创建blob对象 用FileReader读取文件内容
        // var reader = new FileReader();
        //判断浏览器是否支持文件slice裁剪的方法
        var file = this.file;
        var reader = this.reader;
        if (file.slice) {
            //支持就裁剪1M
            var blob = file.slice(start, start + step);
        } else {
            //不支持就不裁剪
            var blob = file;
        }
        reader.readAsText(blob);
    },
    bindEvent: function () {//reader事件的监听(绑定事件)
        var reader = this.reader;
        //接收外部obj对象FileLoad的this
        var _this = this;
        //监听文件的进程
        reader.onprogress = function (e) {
            //e.loaded存储你这一次上传的是多少
            _this.onProgress(e.loaded); //封装上传的函数方法onProgress
        }
        //监听文件的完成，进行每一步step都会触发该事件
        reader.onload = function () {
            _this.onLoad();
        }
    },
    onProgress: function (num) {
        //num是e.loaded的值
        this.loaded += num;
        //进度条的百分比
        var per = this.loaded / this.total;
        if (per > 1) {
            per = 1;
        }
        this.events.progressIng(per);//封装
    },
    onLoad: function () {
        //执行文件上传的操作
        var result = this.reader.result;
        this.events.stepLoad(this.loaded);//封装

        if (this.loaded < this.total) {
            // 没读取完就再进行一次循环reader、loaded、step
            this.readBlob(this.reader, this.loaded, this.step);

        } else {
            this.events.finish();//封装
        }
    }
}

//绑定drag事件为了获取文件信息
// var file;
// var step = 1024 * 1024;//定义1M的步长
// var reader = new FileReader();//定义reader读取对象
// var loaded = 0;//已经上传了多少
// var total;//定义一个总长度





