//Declare game variables
var characterBank = [];
var appState;

var defaultCharVal = "default";

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


//Initialize app
function resetApp(){
    //Empty the app field
    $("#app-field").empty();
    $("#timer").text("");


    //Tell user to select a character
    var clickHere = $("<h2>");
    clickHere.text("Choose a character for an exercise!")
    clickHere.addClass("starter");
    $("#app-field").append(clickHere);

    //Initialize the character bank
    characterBank = [];
    characterBank.push(new Character("General", ["IAD jH", "crossup jM"]));
    characterBank.push(new Character("Bardock", ["j214M oki from j2H", "j214M > assist > 5LL2M5H > 236L > 236HS", "jH slide oki (midscreen)", "j236M corner combo", "corner 236S starter", "236L > vanish conversion"]));
    characterBank.push(new Character("Goku (SSJ)", ["j236L oki from j2H (corner)", "j236L oki from j2H (midscreen)", "jH slide oki (corner)", "jH slide oki (midscreen)", "j236M corner combo", "236S > vanish conversion"]));
    characterBank.push(new Character("Goku (SSGSS)", ["j214M oki from j2H", "214M corner loops", "jH slide oki"]));
    characterBank.push(new Character("Match Goals", ["2H all super dashes", "Tech all dragon rush attempts", "No panic reversals"]));

    //Adds Character dropdown
    var charDropDown = $("<select>");
    charDropDown.addClass("form-control");
    charDropDown.addClass("char-drop");

    //Add first DDL default option
    var defaultOption = $("<option>");
    defaultOption.attr("value", defaultCharVal);
    defaultOption.text("--Select a character--");
    charDropDown.append(defaultOption);

    $.each(characterBank, function(i, character){
        var charOption = $("<option>");
        charOption.attr("value", character.name);
        charOption.text(character.name);
        charDropDown.append(charOption);
    });
    $("#app-field").append(charDropDown);

    console.log(charDropDown);

    //Game initialized state
    appState = 1;
    $("#app-state").text("App state: " + appState);
}

// $("#app-field").on("change", ".char-drop", function(){
//     console.log("hi!");
// });


//Resets game after Game Over
$("#start-button").on("click", function(){
    if(appState == 99){
        $("#start-button").css("display", "none");
        resetApp();
    }
});


function chooseCharacter(name){
    console.log(name);

    
    //When an answer is clicked
    if(appState == 1 && name !== defaultCharVal){
        var chosenCharacter;

        $.each(characterBank, function(i, character){
            if(name === character.name){
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
    exerciseDiv.addClass("col-md-8");
    exerciseDiv.addClass("col-xs-4");
    exerciseDiv.addClass("exercise-board");

    //Add final game values to Game Over screen
    exerciseDiv.append(addToField("p", "", character.name + " Exercise:"));
    
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
$("#app-field").on("change", ".char-drop", function(){
    console.log($(this).val());
    chooseCharacter($(this).val());
});

$(document).ready(function(){
    resetApp();
});
