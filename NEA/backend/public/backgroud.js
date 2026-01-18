const background = document.getElementById('background');
const bg_context = background.getContext('2d');

var bg_window_height = window.innerHeight;
var bg_window_width = window.innerWidth;

background.style.zIndex = "-1";
background.style.position = "absolute";
background.style.top = '400';
background.style.left = '500';
background.style.width = '50%';
background.style.height = '50%';
background.width = window.innerWidth;
background.height = window.innerHeight;
background.style.backgroundRepeat = 'no-repeat';
background.style.backgroundSize = 'cover';
background.style.backgroundPosition = 'center';


const projectileButton = document.getElementById('WallTest');
projectileButton.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('wallTest.jpg')";
});

projectileButton.addEventListener('mouseout', () => {
    background.style.backgroundImage = "";
});

const Accel = document.getElementById('Button_accel');
Accel.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('acceleration.png')";
});

Accel.addEventListener('mouseout', () => {
    background.style.backgroundImage = "";
});

const slopeHtml = document.getElementById('Slopes');
slopeHtml.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('slopePic.png')";
});

slopeHtml.addEventListener('mouseout', () => {
    slopeHtml.style.backgroundImage = "";
});