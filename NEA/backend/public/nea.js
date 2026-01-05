function Quit() {
   quit = confirm("Would you like to quit to the main menu?");
    if (quit){
      location.href = "index.html";
   }
}


function profile() {
  const ProfileButton = document.getElementById("Profile")
}

const QuitButton = document.getElementById("Quit_Button")
QuitButton.addEventListener("click", Quit)

const BackButton = document.getElementById("Back_Button")
BackButton.addEventListener("click", () => {
    window.history.back();
})





//let elasticity = 0.6
let start_momentum = 0
let red_vel = 10
//let mass = 5

function Movement() {
      let start_momentum = (red_vel * mass)
      console.log (start_momentum)
      console.log("Collision!")
      start_momentum = start_momentum * elasticity
      console.log(start_momentum)
      alert(start_momentum) 
}

    
 //   button_1.style.color="purple"
  //  button_1.style.textDecoration='underline'
   // }
//)
//function red_Velocity() {
 //   var r = document.getElementById("red")
  //  var text = "";

//}
