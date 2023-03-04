const buttonColors = ["red","blue","green","yellow"];

// an array for computer play pattern
var gamePattern = [];
// an array for user clicked play pattern 
var userClickedPattern = [];

// inital level is set to zero
var level = 0;


// is the game active? no so it is set to false
var gameStarted = false;

// the game should not be started if any other button is clicked other then begin / play again 
$(".btn").addClass("disable-div")

// begin is clicked 
$(".game-start").click(function () {
    // the begin / play again button is hidden while the game is running
    $(".game-start").hide();

    if(!gameStarted){
        // $("#level-title").text("Level "+level);
        
        // if the game is not started then nextButton() starts the game then set the game is started
        nextButton();
        
        gameStarted = true;

        // after the game is started then the tiles must be able to be pressed so disable-div css property must be removed
        $(".btn").removeClass("disable-div")
    }
});

// user click play pattern is recorded into userClickedPattern array
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    // according to the current button pressed its animation and sound is given 
    // playSound() plays the sound 
    playSound(userChosenColor);
    // animatePress() gives a animation on press
    animatePress(userChosenColor);

    // the last index of the userClickedPattern is given to the checkAnswer() to check
    checkAnswer(userClickedPattern.length-1);
    
});

// this checks whether user given value is equal to computer value
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextButton();
            },1000);
        } 
    }
    //if the answer given by the user is incorrect then this condition is executed
    else{
        console.log("failed");
        //wrong sound is given to playSound()
        playSound("wrong");
        
        

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        //when game is over once again add disable-div css property 
        $(".btn").addClass("disable-div")
       
        // display the begin / play again button 
        $(".game-start").show();
        $(".game-start").text("Play Again");

        //text inside h1 is changed to say that game is over
        $("#level-title").text("Game Over , Press Play Again to Restart");
        

        //reset all the values so that we can start the game again so it is given to startAgain()
        startAgain();
    }

}

//next level 
function nextButton(){
    // every time the next level begins the userClickedPattern which has the user given values is set to empty
    userClickedPattern = [];
    // every level is increased after passing the current level and change the h1 to show the current level 
    level++;
    $("#level-title").text("Level "+level) ;    

    // any random color is chosen from the given colors and pushed into the game pattern
    var randombutton = Math.floor(Math.random()*4);
    // index of the buttonColors is taken and the value is given to randomChosenColor
    var randomChosenColor = buttonColors[randombutton];
    // then randomChosenColor is pushed into gamePattern
    gamePattern.push(randomChosenColor);

    var delayEff = 100;

    for(let i = 0;i<gamePattern.length; i++){
        setTimeout(function () {
            $("#"+gamePattern[i]).fadeIn(200).fadeOut(200).fadeIn(200);
            playSound(gamePattern[i]);
        },delayEff+=700);

    }
    
    
}

//plays the corresponding sound according to the color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
      
//shows animation according to the pattern
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//reset all the values so that game start again;
function startAgain(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
