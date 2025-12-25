var graph_y_pos = 100;
let graph_index = 0;
var graph_x_pos = 100;
let graph_Array_for_speed = JSON.parse(localStorage.getItem("SpeedArray"))


let graph_canvas = document.getElementById("GraphCanvas")

let graph_context = graph_canvas.getContext("2d");

var graph_window_height = window.innerHeight;
var graph_window_width = window.innerWidth;

graph_canvas.width = graph_window_width;
graph_canvas.height = graph_window_height;

graph_canvas.style.background = "rgba(255, 255, 255, 1)"

graph_context.strokeStyle = "red";


class graph_newCircle {
    constructor(graph_x_pos, graph_y_pos){   //constructor function to set up the circle
    this.graph_y_pos = graph_y_pos
    this.graph_x_pos = graph_x_pos
    }
    drawNew(graph_context){   //function to draw the circle
        graph_context.beginPath();    //begin drawing
        graph_context.arc(this.graph_x_pos, this.graph_y_pos, 4, 0, Math.PI * 2, false)
        graph_context.fillStyle = 'blue';
        graph_context.fill();
        graph_context.strokeStyle = 'blue';
        graph_context.stroke();   //draws the outline of the circle
        graph_context.closePath();    //ends drawing
    }
    drawing(graph_context){
        while (graph_index < graph_Array_for_speed.length) {
            this.graph_y_pos = 400 - (graph_Array_for_speed[graph_index] * 10);
            graph_index += 1;
            this.graph_x_pos += 4;
        this.drawNew(graph_context);
    }
}
}

class newWall {
    constructor(x_pos, y_pos, width, height){
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.width = width
    this.height = height
    }
    drawNewWall(context){

        context.beginPath();    
        context.rect(this.x_pos, this.y_pos, this.width, this.height);
        context.strokeStyle = "black";
        context.stroke();   
        context.closePath();    
    }
}

let drawWall = new newWall(100, 400, 1300, 1);
let graph_draw_circle = new graph_newCircle(graph_x_pos, graph_y_pos)    //creates a new circle object

function moveCircle() {     //function to animate the circle
        requestAnimationFrame(moveCircle);      //calls moveCircle again for the next frame
        graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height);   //clears the canvas for the next frame
        graph_draw_circle.drawing(graph_context);      // calls the movement function to update position and draw the circle
        drawWall.drawNewWall(graph_context);
}

const StartGraphButton = document.getElementById("ShowGraph")
StartGraphButton.addEventListener("click", moveCircle)
drawWall.drawNewWall(graph_context);