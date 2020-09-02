//TODO REMEMBER ME TO COMMENT THIS CODE PLEASE

var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = []
//way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//Created a new variable called level and start at level 0.
var level = 0;
//Uses jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
    
});


$(".btn").click(function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
    }
}


function nextSequence(){
    
    userClickedPattern = []
    
    level++;
    $("#level-title").text("Level "+level);
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

