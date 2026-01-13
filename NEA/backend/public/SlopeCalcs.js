var x_pos = 1
var y_pos = 200
var speed = 0
var mass = 50
let restitution = 0.6
let timer = 0
let gravity = 0
let friction = 0
let SquareDrawn = false
friction = ((mass * 9.8) * restitution) / 60 //PER FRAME FRICTION DECREASING MOMENTUM   0.735
momentum = (speed * mass) * 60 //INITIAL MOMENTUM   (assume speed = 12)  3600
Momentum_decrease_via_friction = 0
let index = 0
var Array_of_y_speed = []
var Array_of_x_speed = []
var theta = 60
var radians = 0
var initial_x_speed = 0;
var initial_y_speed = 0;
var gravityAdditionX = 0
var LineC = 0
var LineX = 0
var LineM = 0
let gravityStorage = 0


var isPaused = false;

function PauseCheck() {
    if (isPaused == false) {
        cancelAnimationFrame(drawObjects);
        isPaused = true;
        return;
    }
    else if (isPaused == true) {
        isPaused = false;
        drawObjects();
        return;
    }
}


const PauseButton = document.getElementById("Pause");
PauseButton.addEventListener("click", PauseCheck);



//INPUT FUNCTION BELOW

function input(){
    theta = prompt("Enter angle value (in degrees):");
    if (theta == null) { 
        alert("cancelled");
        return false;
    }
    verify = Number(theta);    
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, setting to 0");
        theta = 0;  //sets theta to 0 if invalid
        return false;
    }
    if (verify < 0) {   
        alert("Under 0 inputted, setting to 0");    //alerts user
        theta = 0;  //sets theta to 0
    }
    if (verify > 90){   
        alert("number too high, setting to 90")     //alerts user
        theta = 90;     
    }
    if (verify >= 0 && verify <=90) {   
        theta = verify;     
        radians = theta * (Math.PI / 180);
    }

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
    if (verify < -15) {   //checks if input is less than 0
        alert("Under -15 inputted, setting to -15");    //alerts user
        speed = -15;  //sets speed to -10
        radians = theta * (Math.PI / 180);
        initial_x_speed = speed * Math.cos(radians);
    }
    if (verify > 15){   //checks if input is greater than 15
       alert("number too high, setting to 15")     //alerts user
       speed = 15;     //sets speed to 15 (max speed)
       radians = theta * (Math.PI / 180);
       initial_x_speed = speed * Math.cos(radians)
       initial_y_speed = speed * Math.sin(radians)
    }
    if (verify >= -15 && verify <=15) {   //valid input range
        speed = verify;     //sets speed to inputted value
        initial_x_speed = speed * Math.cos(radians);
        initial_y_speed = speed * Math.sin(radians);
        if (verify == 0){   //checks if speed is 0
            alert("speed is 0, Square will not move");  //alerts user that the Square will not move
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
context.fillStyle = "red";
context.fillRect(0, 655, canvas.width, canvas.height - 655); // Draws the ground

function LineEquation(){
    let LineX1 = drawTriangle.point1_x;
    let LineY1 = drawTriangle.point1_y;
    let LineX2 = drawTriangle.point2_x;
    let LineY2 = drawTriangle.point2_y;
    console.log("line x1", LineX1, "line x2:", LineX2, "line y1:", LineY1, "line y2:", LineY2)
    LineM = -((LineY2 - LineY1) / (LineX2 - LineX1)) // (655 - 200) / (735 - 0) = (455 / 735) (?????)
    return LineM
}

class newSquare {
    constructor(x_pos, y_pos, speed, gravity, Momentum_decrease_via_friction, mass, friction, restitution, radians, LineC, LineM, LineX, gravityStorage){   //constructor function to set up the Square
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.gravity = gravity
    this.Momentum_decrease_via_friction = Momentum_decrease_via_friction
    this.mass = mass
    this.friction = friction
    this.restitution = restitution
    this.radians = radians
    this.LineC = LineC
    this.LineX = LineX
    this.LineM = LineM
    this.gravityStorage = gravityStorage
    //}
    //updateGravity() {
        //this.gravityAdditionX = this.mass * 0.16333333333 * (Math.sin(this.radians));
    }
    drawNew(context){   //function to draw the Square
        context.save()
        context.translate(this.x_pos + 30, this.y_pos + 30)
        context.rotate(this.radians)
        context.translate(-(this.x_pos + 30), -(this.y_pos + 30))
        context.beginPath();    //begin drawing
        context.rect(this.x_pos, this.y_pos, 60, 60)  //draws Square at x_pos, y_pos with width 60
        context.fillStyle = 'red';
        context.fill();
        context.stroke();   //draws the outline of the Square
        context.closePath();    //ends drawing 
        context.restore()
    }
    movement(context){  //function to move the Square

        //if (this.x_pos + 30 >= canvas.width) { 
    //        this.speed = -this.speed
  //          this.x_pos = canvas.width - 31;
//        }
        //if (this.x_pos - 30 <= 0) { 
        //    this.speed = -this.speed
        //    this.x_pos = 31;
        //}
       // if (this.y_pos + 31 >= 655) {
       //     this.gravity = 0
            //this.y_pos = 655 - 29;
        //}
        //LineEquation();
        let mu = this.restitution
        let LineX1 = drawTriangle.point1_x;
        let LineY1 = drawTriangle.point1_y;
        let LineX2 = drawTriangle.point2_x;
        let LineY2 = drawTriangle.point2_y;
        this.LineC = 655 - (LineX2 * (Math.tan(this.radians)))
        this.LineM = LineM = -((LineY2 - LineY1) / (LineX2 - LineX1))
        let SlopeYValue = (-this.LineM * this.x_pos) +this.LineC
        this.x_pos += this.speed;
        this.y_pos += this.gravity;

        let nextX = this.x_pos + this.speed;
        let nextSlopeY = (-this.LineM * nextX) + this.LineC;

        if (SlopeYValue > this.y_pos + 60) {
            this.gravity += 0.1633333333;
            Array_of_y_speed[index] = this.gravity;
            index += 1;
        }
        if (SlopeYValue <= this.y_pos + 60) {
            this.y_pos = nextSlopeY - 60;
            this.gravityStorage -= Math.sin(this.radians) * 0.1633333333;
            this.speed += (-9.8 * (Math.sin(radians) + mu * Math.cos(radians))) / 60;
            //this.y_pos -= Math.sin(this.radians) * this.gravityStorage; 
            this.gravity = 0;
            Array_of_y_speed[index] = this.gravityStorage;
            index += 1;
        }
        //if (this.y_pos + 60 >= 655) {
        //    if (this.speed < 0) {
        //        this.speed = Math.abs(this.speed)
        //        this.momentum = (this.speed * this.mass) * 60. 
        //        this.friction = ((this.mass * 9.8) * this.restitution) / 60 
        //        this.Momentum_decrease_via_friction = (this.momentum - this.friction) / (60 * this.mass)
        //        this.speed = -this.Momentum_decrease_via_friction
        //        this,gravityStorage = 0
                //this.speed = -this.speed
        //    }
            //else {
            //    this.momentum = (this.speed * this.mass) * 60. // 3600
            //    this.friction = ((this.mass * 9.8) * this.restitution) / 60 // 0.735
            //    this.Momentum_decrease_via_friction = (this.momentum - this.friction) / (60 * this.mass)
            //    this.speed = this.Momentum_decrease_via_friction
            //}
        //}
        Array_of_x_speed[index] = this.speed;
        this.drawNew(context);      //draws the Square at the new position
        context.fillStyle = 'red'
        context.fillRect(0, 655, canvas.width, canvas.height - 655); // Draws the ground
    }
}
    
class newTriangle {
    constructor(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y, point4_x, point4_y, radians){
        this.point1_x = point1_x
        this.point1_y = point1_y
        this.point2_x = point2_x
        this.point2_y = point2_y
        this.point3_x = point3_x
        this.point3_y = point3_y
        this.point4_x = point4_x
        this.point4_y = point4_y
        this.radians = radians
        //this.point1_y = 655 - (this.point2_x * (Math.tan(this.radians)))

    }
    updatePoints() {
        this.point1_y = 655 - (this.point2_x * (Math.tan(this.radians)))
    }

    drawNewTriangle(context){ //POINT 2 X AND Y ARE CONSTANT NEVER CHANGE THEM!!!!
        this.updatePoints();
        context.beginPath()
        context.strokeStyle = "black"
        context.moveTo(this.point1_x, this.point1_y)
        context.lineTo(this.point2_x, this.point2_y)
        context.lineTo(this.point3_x, this.point3_y)
        context.lineTo(this.point4_x, this.point4_y)
        context.lineTo(this.point1_x, this.point1_y)
        context.stroke()
        context.fillStyle = "yellow"
        context.fill()
        context.closePath()
    }
    drawNewBounds(context){
        context.beginPath()
        context.strokeStyle = "black"
        context.moveTo(this.point1_x, this.point1_y)
        context.lineTo(this.point2_x, this.point2_y)
        context.lineTo(this.point3_x, this.point3_y)
        context.lineTo(this.point4_x, this.point4_y)
        context.lineTo(this.point1_x, this.point1_y)
        context.stroke()
        context.closePath()
    }
}

let draw_square = new newSquare(x_pos, y_pos, speed, gravity, Momentum_decrease_via_friction, mass, friction, restitution, radians, LineC, LineX, LineM, gravityStorage)    //creates a new Square object
let drawTriangle = new newTriangle(0, 200, 2 * canvas.width/3, 655, 0, 655, 0, 0, radians)
let drawBounds = new newTriangle(0,0, canvas.width, 0, canvas.width, 655, 0, 655)

function drawObjects() {     //function to animate the Square
    if (isPaused) {
        return;
    }
    else {
        requestAnimationFrame(drawObjects);      //calls drawObjects again for the next frame
        context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
        draw_square.movement(context);      // calls the movement function to update position and draw the square
        drawTriangle.drawNewTriangle(context);
        drawBounds.drawNewBounds(context)
        const speedDisplay = document.getElementById("SpeedValue");
        speedDisplay.textContent = draw_square.speed.toFixed(2);
        const FallingSpeed = document.getElementById("YSpeedValue");
        FallingSpeed.textContent = draw_square.gravityStorage.toFixed(2);
    }
}

const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (SquareDrawn == false){
        if (input() == true){       //Calls the input function to get speed from user
            let startX = canvas.width / 3;
            draw_square.speed = initial_x_speed; 
            draw_square.gravity = initial_y_speed;
            drawTriangle.radians = radians
            draw_square.radians = radians
            drawTriangle.updatePoints();
            let LineX1 = drawTriangle.point1_x;
            let LineY1 = drawTriangle.point1_y;
            let LineX2 = drawTriangle.point2_x;
            let LineY2 = drawTriangle.point2_y;

            let LineM = (LineY2 - LineY1) / (LineX2 - LineX1);
            let LineC = LineY1 - (LineM * LineX1);
            //y_pos = startSlopeY - 55;
            draw_square.y_pos = (LineM * startX + LineC) - 60;
            draw_square.x_pos = startX;
            draw_square.gravity = 0;
            draw_square.gravityStorage = initial_y_speed
            alert("Initial X Speed: " + initial_x_speed.toFixed(2) + "Initial Y Speed: " + (-initial_y_speed).toFixed(2));
            drawObjects();       //Calls the drawObjects function to start the animation
            SquareDrawn = true;
        }
        }
    }
);

const GraphButton = document.getElementById("GraphButton");
GraphButton.addEventListener("click", () => {
    localStorage.setItem("SpeedArray", JSON.stringify(Array_of_x_speed));
    localStorage.setItem("y_SpeedArray", JSON.stringify(Array_of_y_speed));
});

drawTriangle.drawNewTriangle(context);
drawBounds.drawNewBounds(context)
draw_square.drawNew(context)