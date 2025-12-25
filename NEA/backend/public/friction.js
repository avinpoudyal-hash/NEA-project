var x_pos = 100
var y_pos = 100
var speed = 0
elasticity = 0.6
friction = 0.9





class newCircle {
    constructor(x_pos, y_pos, speed, elasticity){   //constructor function to set up the circle
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.elasticity = elasticity
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
        this.x_pos += this.speed;
        this.speed *= friction;
        this.drawNew(context);      //draws the circle at the new position
    }
}

let draw_circle = new newCircle(x_pos, y_pos, speed, elasticity)    //creates a new circle object

function moveCircle() {     //function to animate the circle
    requestAnimationFrame(moveCircle);      //calls moveCircle again for the next frame
    context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
    draw_circle.movement(context);      // calls the movement function to update position and draw the circle
}




const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (input() == true){       //Calls the input function to get speed from user
        draw_circle.speed = speed;      //updates the circle's speed with the user input
        moveCircle();       //Calls the moveCircle function to start the animation
    }
});
