var x_pos = 100
var y_pos = 100
var speed = 0
var mass = 10
let elasticity = 0.6
let restitution = 2
let timer = 0
let gravity = 0
let friction = 0
let CircleDrawn = false
friction = ((mass * 9.8) * restitution) / 60 //PER FRAME FRICTION DECREASING MOMENTUM   0.735
momentum = (speed * mass) * 60 //INITIAL MOMENTUM   (assume speed = 12)  3600
Momentum_decrease_via_friction = 0

var isPaused = false;
var speed_storage = 0;

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
    speed = prompt("Enter speed value:");
    if (speed == null) {    //user pressed cancel
        alert("cancelled");
        return false;
    }
    verify = Number(speed);     //converts input to number for verification
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, setting to 0");
        speed = 0;  //sets speed to 0 if invalid
        return false;
    }
    if (verify < 0) {   //checks if input is less than 0
        alert("Under 0 inputted, setting to 0");    //alerts user
        speed = 0;  //sets speed to 0
    }
    if (verify > 50){   //checks if input is greater than 15
        alert("number too high, setting to 50")     //alerts user
        speed = 50;     //sets speed to 15 (max speed)
    }
    if (verify >= 0 && verify <=50) {   //valid input range
        speed = verify;     //sets speed to inputted value
        if (verify == 0){   //checks if speed is 0
            alert("speed is 0, circle will not move");  //alerts user that the circle will not move
        }
    }
    return true;
}

//DRAWING CODE BELOW

let canvas = document.getElementById("TestScreen")
    // Makes the canvas the screen shown on the "Test.html" file
let context = canvas.getContext("2d");
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
    constructor(x_pos, y_pos, speed, elasticity, gravity, Momentum_decrease_via_friction, mass, friction, restitution){   //constructor function to set up the circle
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.elasticity = elasticity
    this.gravity = gravity
    this.Momentum_decrease_via_friction = Momentum_decrease_via_friction
    this.mass = mass
    this.friction = friction
    this.restitution = restitution
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
        if (this.y_pos + 30 >= 655) {
            this.gravity = -this.gravity * this.elasticity;
            this.y_pos = 655 - 29;
        }
        this.x_pos += this.speed;
        this.y_pos += this.gravity;
        this.gravity = this.gravity + 0.1633333
        if (this.y_pos + 30 >= 655) {
            if (this.speed < 0) {
                this.speed = Math.abs(this.speed)
                this.momentum = (this.speed * this.mass) * 6
                this.friction = ((this.mass * 9.8) * this.restitution) / 60 
                this.Momentum_decrease_via_friction = (this.momentum - this.friction) / (60 * this.mass)
                this.speed = -this.Momentum_decrease_via_friction
                //this.speed = -this.speed
            }
            else {
                this.momentum = (this.speed * this.mass) * 60. // 3600
                this.friction = ((this.mass * 9.8) * this.restitution) / 60 // 0.735
                this.Momentum_decrease_via_friction = (this.momentum - this.friction) / (60 * this.mass)
                this.speed = this.Momentum_decrease_via_friction
            }
        }


        this.drawNew(context);      //draws the circle at the new position
    }
}
let draw_circle = new newCircle(x_pos, y_pos, speed, elasticity, gravity, Momentum_decrease_via_friction, mass, friction, restitution)    //creates a new circle object

function moveCircle() {     //function to animate the circle
    if (isPaused) {
        return;
    }
    else {
        requestAnimationFrame(moveCircle);      //calls moveCircle again for the next frame
        context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
        draw_circle.movement(context, timer);      // calls the movement function to update position and draw the circle
        const speedDisplay = document.getElementById("SpeedValue");
        speedDisplay.textContent = draw_circle.speed.toFixed(2);
        const FallingSpeed = document.getElementById("YSpeedValue");
        FallingSpeed.textContent = draw_circle.gravity.toFixed(2);
    }
}

//EVENT LISTENER BELOW

const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (CircleDrawn == false){
        if (input() == true){       //Calls the input function to get speed from user
            draw_circle.speed = speed;      //updates the circle's speed with the user input
            moveCircle();       //Calls the moveCircle function to start the animation
            CircleDrawn = true;
            
        }
        }
    }
);



//NEXT JOB
// RESET BUTTON
