var x_pos = 100
var y_pos = 100
var speed = 0
elasticity = 0.6
var Array_for_speed = []
index = 0

var isPaused = false;
var acceleration = 0;

function PauseCheck() {
    if (isPaused == false) {
        cancelAnimationFrame(moveCircle);
        isPaused = true;
        return;
    }
    else if (isPaused == true) {
        isPaused = false;
        moveCircle();
        return;
    }
}

const PauseButton = document.getElementById("Pause");
PauseButton.addEventListener("click", PauseCheck);


//INPUT FUNCTION BELOW

function input(){
    acceleration = prompt("Enter speed value:");
    if (acceleration == null) {    //user pressed cancel
        alert("cancelled");
        return false;
    }
    verify = Number(acceleration);     //converts input to number for verification
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, setting to 0");
        acceleration = 0;  //sets speed to 0 if invalid
        return false;
    }
    if (verify < 0) {   //checks if input is less than 0
        acceleration = 0;  //sets speed to 0
    }
    if (verify > 50){   //checks if input is greater than 15
        acceleration = 50;     //sets speed to 15 (max speed)
    }
    if (verify >= 0 && verify <=50) {   //valid input range
        acceleration = verify;     //sets speed to inputted value
        if (verify == 0){   //checks if speed is 0
            alert("speed is 0, circle will not move");  //alerts user that the circle will not move
        }
    }
    return true;
}

//DRAWING CODE BELOW

var canvas = document.getElementById("TestScreen")
    // Makes the canvas the screen shown on the "Test.html" file
var context = canvas.getContext("2d");
    // This makes it so that the object can be drawn, as it is a 2d surface

var window_height = window.innerHeight;
var window_width = window.innerWidth;
    // This sets the width and height of the window

canvas.width = window_width;
canvas.height = window_height;
    // This code makes the size of the canvas equal to the size of the window 

canvas.style.background = "rgba(255, 255, 255, 1)"
    // Sets the colout of the canvas

context.strokeStyle = "red";


class newCircle {
    constructor(x_pos, y_pos, speed, elasticity, acceleration){   //constructor function to set up the circle
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.elasticity = elasticity
    this.acceleration = acceleration
    }
    drawNew(context){   //function to draw the circle

        context.beginPath();    //begin drawing
        context.arc(this.x_pos, this.y_pos, 30, 0, Math.PI * 2, false)  //draws circle at x_pos, y_pos with radius 50
        context.stroke();   //draws the outline of the circle
        context.closePath();    //ends drawing
    }
    movement(context){  //function to move the circle
        if (this.x_pos + 30 >= canvas.width) { 
            this.speed = -this.speed * this.elasticity;
            this.x_pos = canvas.width - 31;
        }
        if (this.x_pos - 30 <= 0) { 
            this.speed = -this.speed * this.elasticity;
            this.x_pos = 31;
        }
        this.speed.toFixed(2);
        Array_for_speed[index] = this.speed;
        index += 1;
        this.x_pos += this.speed;
        this.speed += this.acceleration / 60

        this.drawNew(context);      //draws the circle at the new position
    }
}
let draw_circle = new newCircle(x_pos, y_pos, speed, elasticity, acceleration)    //creates a new circle object

function moveCircle() {     //function to animate the circle
    if (isPaused) {
        return;
    }
    if (context == undefined){
        return;
    }
    else {
        requestAnimationFrame(moveCircle);      //calls moveCircle again for the next frame
        context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
        draw_circle.movement(context);      // calls the movement function to update position and draw the circle
        const speedDisplay = document.getElementById("SpeedValue");
        speedDisplay.textContent = draw_circle.speed.toFixed(2);
    }
}

//EVENT LISTENER BELOW

const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (input() == true){       //Calls the input function to get speed from user
        draw_circle.acceleration = acceleration;  //updates the circle's acceleration with the user input
        moveCircle();       //Calls the moveCircle function to start the animation
    }
});

const ArrayButton = document.getElementById("ArrayButton");     //Gets the Array button from the HTML
ArrayButton.addEventListener("click", () => {  //Checks when the button is clicked
    alert(Array_for_speed);
});
//NEXT JOB
// RESET BUTTON

const GraphButton = document.getElementById("GraphButton");
GraphButton.addEventListener("click", () => {
    localStorage.setItem("SpeedArray", JSON.stringify(Array_for_speed));
});


