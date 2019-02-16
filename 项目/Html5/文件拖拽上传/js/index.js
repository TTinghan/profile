//-----用户的文件-----//
var content = document.getElementsByClassName('content')[0];
var active = document.getElementsByClassName('active')[0];
var text = document.getElementsByClassName('text')[0];
//绑定drapover事件为了取消其默认事件，防止drop事件不被触发
content.addEventListener('dragover', function (e) {
    e.preventDefault();//取消默认事件
});
content.addEventListener('drop', function (e) {
    e.preventDefault();
    file = e.dataTransfer.files[0];//对拖过来的文件获取
    // total = file.size;//获取文件的总大小

    var loader = new FileLoader(file, events);//调用组件
});

//用户对象的回调操作
var events = {
    progressIng: function (per) {
        active.style.width = (per * 250) + 'px';
        text.innerHTML = Math.round(per * 100) + '%';//Math.round四舍五入取整
    },
    stepLoad: function (loaded) {
        console.log('上传' + loaded + '部分');
    },
    finish: function () {
        console.log("我终于上传完成了！");
        // alert("文件上传成功O(∩_∩)O！");
    }
}
function fileSelected() {
    document.getElementById('uponload').click();
}
