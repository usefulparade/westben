var c;
var theme;
var foregroundColor, backgroundColor;
var font;

function preload(){
    font = loadFont('/RobotoMono-ExtraLight.ttf');
}

function setup(){
    contentContainerHidden = true;
    content = document.getElementById('contentContainer');
    c = createCanvas(windowWidth, windowHeight);
    theme = 'night';

    foregroundColor = color(255);
    
}

function draw(){
    clear();
    push();
        noFill();
        stroke(foregroundColor);
        ellipse(width/2, height/2, 250);
    pop();
    push();
        noStroke();
        fill(foregroundColor);
        textSize(24);
        textFont(font);
        textAlign(CENTER, CENTER);
        text('map goes here', width/2, height/2);
    pop();

}

function mouseClicked(){
    // window.frames[0].location = "sampleContent.html";
    // contentToggle();
}
