show();
function show() {
    var vector = document.getElementsByClassName('vector');
    for (var i = 0; i < vector.length; i++) {
        vector[i].addEventListener('mouseenter', enter)
    }

    function enter(e) {
        $(this).children('.thumbnail').attr('class', 'thumbnail');
        var dir = getDiretion(e, this);
        switch (dir) {
            case 0:
                $(this).children('.thumbnail').addClass('ccc');
                break;
            case 1:
                $(this).children('.thumbnail').addClass('bbb');
                break;
            case 2:
                $(this).children('.thumbnail').addClass('ddd');
                break;
            case 3:
                $(this).children('.thumbnail').addClass('aaa');
        }
    }

    function getDiretion(e, n) {
        var w = n.offsetWidth;
        var h = n.offsetHeight;
        //转换成正方形 哪边大  哪边乘以他们的比例
        var x = (e.offsetX - w / 2) * (w > h ? h / w : 1);
        var y = (e.offsetY - h / 2) * (h > w ? w / h : 1);
        var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
        return d;
    }
}