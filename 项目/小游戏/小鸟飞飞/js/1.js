var myCanvas=document.getElementById('canvas');
var ctx=myCanvas.getContext('2d');
var bg=1000,y=180,i=0,q = 180,ss=0,random,timer1;

var sky = new Image(),
    birds = new Image(),
    pipe1 = new Image(),
    pipe2 = new Image(),
    land = new Image();
sky.src='./img/sky.png';
land.src='./img/land.png';
birds.src='./img/birds1.png';
pipe1.src='./img/pipe1.png';
pipe2.src='./img/pipe2.png';

pipe2.onload=function(){
    ctx.drawImage(sky,0,0,1000,500);
    ctx.drawImage(land,0,500,1000,700);
    ctx.drawImage(birds,150,y,100,100);
    ctx.drawImage(pipe1,600,200+150,100,600);
    ctx.drawImage(pipe2,600,-550+150,100,600);

    ctx.font="30px Verdana";
    // 创建渐变 
    var gradient=ctx.createLinearGradient(0,0,1000,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
    // 用渐变填色
    ctx.fillStyle=gradient;
    ctx.fillText("请按Enter开始游戏",300,300);
    ctx.fillText("空格飞的更高",300,350);
}

document.onkeydown=function(e){
    if(e.keyCode = 13){
        init();
    }
}


function init(){
    cancelAnimationFrame(timer1);
    random = Math.random();
    bg=1000,y=180,i=0,q = 180,ss=0;
    start();
}

function start(){
    timer1=requestAnimationFrame(start);
    ctx.clearRect(0,0,1000,700);
    bgChange();
    birdChange();
    pipeChange();
    if(y < -20||y > 450){
        gameOver();
    }
}

function bgChange(){
    ctx.beginPath();
    ctx.drawImage(sky,bg,0,1000,500);
    ctx.drawImage(sky,bg-1000,0,1000,500);
    ctx.drawImage(land,bg,500,1000,700);
    ctx.drawImage(land,bg-1000,500,1000,700);
    if(bg<=0){
        bg=1000;
        ss+=1;
        random = Math.random();
    }else{
        bg -= 8;
    }
}

function birdChange(){
    i++;
    y = -6*i + 0.1*i*i + q;
    document.onkeydown = function(){
        i = 0;
        q = y;
    }
    ctx.drawImage(birds,150,y,100,100);
}

function pipeChange(){
    ctx.drawImage(pipe1,bg,200+random*250,100,600);
    ctx.drawImage(pipe2,bg,-550+random*250,100,600);
    ctx.fillStyle='red';
    ctx.fillText("当前得分"+ss,300,100);
    if(bg < 230&&bg > 50){
        // console.log("y:"+y+"   bgy:" + (100+random*250));
        if(y > 140+random*250||y < 20+random*250){
            gameOver();
        }
    }
}

function gameOver(){
    alert('你的鸟死了 你得了'+ss+'分');
    init();
}