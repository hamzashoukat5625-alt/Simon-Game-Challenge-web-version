var colors=["green","red","blue","yellow"];
var move=[];
var userMove=[];
var gameRuning=false;
var check=true;
var levelCouter=0;

function patternMaker(){
    var random=Math.floor(Math.random()*4);
    var color=colors[random];
    move.push(color);
    return color;
}

function computerMoveAnimation(color){
    $("#"+color).removeClass(color);
    $("#"+color).css("border", "solid 10px #011F3F");
    setTimeout( function () {
        $("#"+color).addClass(color);
        $("#"+color).css("border", "solid 10px black");
    },100);
}

function btnPressAnimation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function (){
        $("#"+color).removeClass("pressed");
    },100);
}

function sound(color){
    var path;
    if(color==="green"){
        path="sounds/green.mp3";
    }else if(color==="red"){
        path="sounds/red.mp3";
    }else if(color==="yellow"){
        path="sounds/yellow.mp3";
    }else{
        path="sounds/blue.mp3";
    }
    var audio=new Audio(path);
    audio.play();
}

function matchPatren(){
    for(var i=0;i<userMove.length;i++){
        if(move[i]!==userMove[i]){
            check=false;
            break;
        }
    }
    return check;
}

function computerMove(){
        gameLevel();
       var color=patternMaker();
       sound(color);
       computerMoveAnimation(color);
}

function gameLevel(){
    $("h1").text("Level "+(++levelCouter));
}

function emptyUserPattern(){
    var size=userMove.length;
    for(var i=0;i<=size;i++){
        userMove.pop();
    }
    console.log(userMove.length);
}

function emptycomputerPattern(){
    var size=move.length;
    for(var i=0;i<size;i++){
        move.pop();
    }
}

function gameOver(){
    var gameOverSound=new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    $("body").css("background-color","red");
    setTimeout(function(){
        $("body").css("background-color","#011F3F");
    },100);

    $("h1").text("GAME OVER...\nPress any key to restart");

    gameRuning=false;
    check=true;
    levelCouter=0;
    emptyUserPattern();
    emptycomputerPattern();
}



$("body").keypress(function () {
    if(gameRuning===false){
        computerMove();
        gameRuning=true;
    }
}) 

$(".btn").click(function () {
    if(gameRuning===true){
        var color=$(this).attr("id");
        btnPressAnimation(color);
        sound(color);
        userMove.push(color);
        check=matchPatren()
        console.log(check);
    
        if(check===false){
            gameOver();
        }
        if(move.length===userMove.length && move.length!==0){
            setTimeout(() => {
                computerMove();
            }, 600);
            emptyUserPattern();

        }
    }
   
})


    
    
   
   