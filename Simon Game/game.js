var buttonColours=["green","red","blue","yellow"];
var gamePattern=[];         //stores the game pattern
var userClickedPattern=[];  //stores the user input pattern
var level=0;
var started=false;      // a way to keep track that the game has started or not

//On keypress listener
$("body").on("keypress",()=>{
    if(!started){
    nextSequence();
    started=true;   // No action on key press after the game has started
    }
});
    //on click listener-> User Input
$(".btn").on("click",function (e) {

    var userChosenColour=this.id; //gets the id from the HTML(this) object
    // var userChosenColour = $(this).attr("id"); //alt. method
    userClickedPattern.push(userChosenColour);

    $("#"+userChosenColour).fadeOut(100).fadeIn(100);  //click animation
    playSound(userChosenColour);    
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over!! Press any key to start again");
        startOver();
    } 
}

function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);    

    var randomNumber= Math.floor(Math.random()*4);  //generates the random number between 0-3
    var randomChosenColour =buttonColours[Math.floor(randomNumber)]; //generates random color
    gamePattern.push(randomChosenColour);  //remembers the game pattern

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100); //button animation
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setInterval(() => {
    $("#"+currentColour).removeClass("pressed");        
    }, 100);
}
