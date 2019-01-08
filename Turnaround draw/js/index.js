var tdList = document.getElementById("table").getElementsByTagName("td");//获取表中所有表相关的td
var start = document.getElementById("start");//获取表中的start的id
var tdID = 0;//初始化
var tdAry = [0,1,2,3,4,9,14,19,24,23,22,21,20,15,10,5];//设定运行轨迹所达到的数组的位置
var runNum;//需要判断当前跑了多少次
var run = null;
//--class类名进行循环--//
function playFunc(){
    //把上次的取消选中
    tdList[tdAry[tdID]].className = "";//开始时的class为空
   // tdID = tdID+1 >= tdAry.length ? 0:tdID+1; //此行表示以下3行内容
    tdID ++;//td自增
    if(tdID >= tdAry.length){
        tdID = 0;
    }
    tdList[tdAry[tdID]].className = "select";
    runNum ++;//次数自增
    //--判断 当正在循环的总次数等于我们设定的总次数的时候清空计时器，让旋转停止--//
    if(runNum >= maxNum){
        clearInterval(run);//此时清除掉计时器
        run = null;
        prize(tdID);
        return;
    }
    if(runNum == 6){//如果跑了6格子
        clearInterval(run);//先将现有的记录清理掉
        run = setInterval(playFunc,20);//再将函数跑起来，速度变快
    }
    if(runNum + 6 == maxNum){//剩余最后6步时，减速
        clearInterval(run);//先将现有的记录清理掉
        run = setInterval(playFunc,200);//再将函数跑起来，速度变慢
        
    }
}

//--抽奖开始--//
start.onclick = function(){//点击后 才开始奔跑
    t1.innerHTML = "";//先清空所有格子
    t2.innerHTML = "";
    t3.innerHTML = "";
    t4.innerHTML = "";
    t5.innerHTML = "";
    t6.innerHTML = "";
    t7.innerHTML = "";
    t8.innerHTML = "";

    runNum = 0;//开始的初始化   
   //这个值返回的是从0-1之间的小数 *16后才能获取到0-15之间的值,再用parseInt强制转化为整数
   //跑多少n圈 + 随机数，此时需要引入随机数random  
   maxNum = 16 * 3 + parseInt( Math.random() * 16);
   //跑完后需要将计数器清除掉，所以当下的run用来存储计时器
    run = setInterval(playFunc,200);//每200ms调用一次playFunc这个方法，每次调用修改tdlist
}

 //--抽取奖品内容，结束时显示--//
// var gift = document.getElementsByClassName("gift")[0];
 var t1 = document.getElementsByClassName("t1")[0];
 var t2 = document.getElementsByClassName("t2")[0];
 var t3 = document.getElementsByClassName("t3")[0];
 var t4 = document.getElementsByClassName("t4")[0];
 var t5 = document.getElementsByClassName("t5")[0];
 var t6 = document.getElementsByClassName("t6")[0];
 var t7 = document.getElementsByClassName("t7")[0];
 var t8 = document.getElementsByClassName("t8")[0];
 function prize(xx) {
     console.log(xx);
 switch (xx){
 case 0:
   t1.innerHTML='恭喜你获得冰姐<p>奖品最终解释权归cc哥所有</p>';
    break;
 case 1:
   t2.innerHTML='很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 2:
   t3.innerHTML=' 恭喜你获得如花<p>奖品最终解释权归cc哥所有</p>';
    break;
 case 3:
   t6.innerHTML='很遗憾未抽中，再试试吧o(╥﹏╥)o';  
    break;
 case 4:
     t4.innerHTML ='恭喜你获得球爷<p>奖品最终解释权归cc哥所有</p>';
     break; 
 case 5:
   t8.innerHTML='很遗憾未抽中，再试试吧o(╥﹏╥)o';
   break;   
 case 6:
    t5.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 7:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
     break;
 case 8:
    t7.innerHTML = '恭喜你获得小小蝉<p>奖品最终解释权归cc哥所有</p>';
    break;
 case 9:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 10:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 11:
     t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 12:
    t7.innerHTML = '恭喜你获得小蝉<p>奖品最终解释权归cc哥所有</p>';
    break;
 case 13:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
 case 14:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
case 15:
    t7.innerHTML = '很遗憾未抽中，再试试吧o(╥﹏╥)o';
    break;
    }
    
}

