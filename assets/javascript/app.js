//Declare game variables
var characterBank = [];
var appState;

//Question class - holds answers and a picture
class Character {
    constructor(name, exercises) {
        this.name = name;
        this.exercises = exercises;
    }
}


//Creates an element using 'tag' to add to the app-field div - can give it a custom class
function addToField(tag, divClass, text){
    var questionFieldElement = $("<" + tag + ">");
    questionFieldElement.addClass(divClass);
    questionFieldElement.text(text);
    return (questionFieldElement);
}

//Takes an array of answers for a question (first answer is correct)
function makeCharacter(name, exercises){
    var exercisesPush = [];
    
    for(var i = 0; i < exercises.length; i++){
        var newExercise = new Exercise(i, exercises[i]);
        exercisesPush.push(newExercise);
    }
    
    var character = new Character(name, exercisesPush);
    return(character);
}

//Initialize app
function resetApp(){
    //Empty the game field
    $("#app-field").empty();
    $("#timer").text("");


    //Tell user to click in the game field to start game
    var clickHere = $("<h2>");
    clickHere.text("Choose a character for an exercise!")
    clickHere.addClass("starter");
    $("#app-field").append(clickHere);

    //Initialize the character bank
    characterBank = [];
    characterBank.push(new Character("General", ["IAD jH", "crossup jM"]));
    characterBank.push(new Character("Bardock", ["j214M oki from j2H", "j214M > assist conversion", "jH slide oki", "j236M corner combo"]));
    characterBank.push(new Character("Goku (SSJ)", ["j236L oki from j2H", "j214M > assist conversion", "jH slide oki", "j236M corner combo"]));
    characterBank.push(new Character("Goku (SSGSS)", ["j214M oki from j2H", "241M corner loops", "jH slide oki"]));

    //Display Characters
    $.each(characterBank, function(i, character){
        $("#app-field").append(addToField("div", "char-select", character.name));
    });

    //Game initialized state
    appState = 1;
    $("#app-state").text("App state: " + appState);
}

//Resets game after Game Over
$("#start-button").on("click", function(){
    if(appState == 99){
        $("#start-button").css("display", "none");
        resetApp();
    }
});


function chooseCharacter(){
    //When an answer is clicked
    if(appState == 1){
        var result;

        //Store the clicked character in 'chosen'
        var clickedName = $(this).text();
        console.log(clickedName);

        var chosenCharacter;

        $.each(characterBank, function(i, character){
            if(clickedName === character.name){
                chosenCharacter = character;
            }
        });

        console.log(chosenCharacter);
        
        //Show answer state
        appState = 2;
        
        $("#app-state").text("App state: " + appState);
        showExercise(chosenCharacter);
    }
}

function showExercise(character){
    $("#app-field").empty();

    //Choose random exercise
    var exerciseNum = Math.floor(Math.random() * character.exercises.length);

    // $("#app-field").append(addToField("div", "exercise", character.exercises[exerciseNum]));
    console.log("Display Exercise");

    var exerciseDiv = $("<div>");
    exerciseDiv.addClass("exercise-board");

    //Add final game values to Game Over screen
    exerciseDiv.append(addToField("p", "", "Exercise"));
    
    exerciseDiv.append(addToField("p", "exercise", character.exercises[exerciseNum]));

    exerciseDiv.append(addToField("p", "restart-message", "Click the Restart button for a new exercise!"));

    $("#app-field").append(exerciseDiv);

    //Show answer state
    appState = 99;
    $("#app-state").text("App state: " + appState);

    
    $("#start-button").css("display", "inline-block");
    // $("#app-state").text("App state: " + appState);
}

//When user answers the question
$("#app-field").on("click", ".char-select", chooseCharacter);

$(document).ready(function(){
    resetApp();
});