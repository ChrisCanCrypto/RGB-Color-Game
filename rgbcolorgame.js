// Buttons
var selectedDif = 9;
var tryAgain = document.getElementById("tryAgain");
var difButtons = document.querySelectorAll(".dif");

// Gameplay
var boxColors = setBoxColorArray(selectedDif);
var randomColor = getRandomColor();
var rgbDisplay = document.getElementById("rgbColor");
rgbDisplay.textContent = randomColor;
var colorBoxes = document.querySelectorAll(".colorBox");

// Aesthetics
var pageBackgroundColor = "#232323";
var jumbo = document.getElementsByClassName("jumbotron");
var indicatorText = document.getElementById("indicator");

init();

function init(){
    // Dificulty buttons
    for(var i = 0; i < difButtons.length; i++){

        difButtons[i].addEventListener("click", function(){
            for(var i = 0; i < difButtons.length; i++){
                difButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            resetBoxes(this.value);
            indicatorText.textContent = "";
        })
    }

    //Initial boxes
    for(var i = 0; i < colorBoxes.length; i++){

        // add initial colors to colorBoxes
        colorBoxes[i].style.backgroundColor = boxColors[i];
    
        // add click listener to the colorBoxes
        colorBoxes[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
                if(clickedColor === randomColor){
                    indicatorText.textContent = "Correct!";
                    changeAllColors(randomColor);
                    jumbo[0].style.backgroundColor = randomColor;
                    tryAgain.textContent = "Play Again"
                }else{
                    changeBoxColor(this, pageBackgroundColor);
                    indicatorText.textContent = "Guess Again";
                }
        })
    
    }


}



function setBoxColorArray(num){

    var arr =[];
    boxColors = [];
    for(var i = 0; i < num; i++){
        arr.push(getRandomRGB());
        
    }

    return arr;
}

function changeBoxColor(colorBox, color){
    colorBox.style.backgroundColor = color;

}

function changeAllColors(color){
    for(i = 0; i < colorBoxes.length; i++){
        changeBoxColor(colorBoxes[i], color);
    }
}

function resetBoxes(difNum){

    selectedDif = difNum;

    // Select new random color
    boxColors = setBoxColorArray(selectedDif);
    randomColor = getRandomColor();
    rgbDisplay.textContent = randomColor;

    // Display the new boxes
    displayNewBoxes();
    
}

function displayNewBoxes(){
    for(var i = 0; i < colorBoxes.length; i++){
        if(boxColors[i]){
            colorBoxes[i].style.backgroundColor = boxColors[i];
            colorBoxes[i].style.display = "block";
        }else{
            colorBoxes[i].style.display = "none";
        }
    }
    jumbo[0].style.backgroundColor = "steelblue";
}

function getRandomInt(maxInt){
    return Math.floor(Math.random() * Math.floor(maxInt));

}

function getRandomRGB(){
    var r = getRandomInt(255);
    var g = getRandomInt(255);
    var b = getRandomInt(255);

    return "rgb(" + r + ", " + g + ", " + b + ")";

}

function getRandomColor(){
    var random = getRandomInt(boxColors.length);
    return boxColors[random];

}

// Try again button
tryAgain.addEventListener("click", function(){
    boxColors = setBoxColorArray(selectedDif);
    randomColor = getRandomColor();
    rgbDisplay.textContent = randomColor;
    indicatorText.textContent = "";
    tryAgain.textContent = "New Colors"
    for(var i = 0; i < selectedDif; i++){
        changeBoxColor(colorBoxes[i], boxColors[i])
    }
    jumbo[0].style.backgroundColor = "steelblue";

})


