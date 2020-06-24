var c, cParent;
var theme;
var foregroundColor, backgroundColor;
var font;
var landmarks = [];
var landmarkVectors = [];
var barn, bird, ticketShed;
var mouseOrTouch;

function preload(){
    font = loadFont('RobotoMono-ExtraLight.ttf');
}

function setup(){
    contentContainerHidden = true;
    content = document.getElementById('contentContainer');
    c = createCanvas(windowWidth, windowHeight);
    cParent = select('#canvasParent');
    c.parent(cParent);
    theme = 'night';

    foregroundColor = color(255);

    barn = new Landmark(new p5.Vector(width*0.66, height*0.4), 'barn', 'welcome.html');
    bird = new Landmark(new p5.Vector(width*0.2, height*0.3), 'conservancy', 'sampleContent.html');
    ticketShed = new Landmark(new p5.Vector(width*0.55, height*0.45), 'ticket shed', 'https://www.westben.ca');
    landmarks.push(barn);
    landmarks.push(bird);
    landmarks.push(ticketShed);
    mouseOrTouch = p5.Vector(0,0);

    landmarkVectors = [new p5.Vector(width*0.66, height*0.4), new p5.Vector(width*0.2, height*0.3), new p5.Vector(width*0.55, height*0.45)];

    contentToggle();
}

function draw(){
    clear();
    roads();
    for (var i in landmarks){
        landmarks[i].show();
    }
    // clear();
    // push();
    //     noFill();
    //     stroke(foregroundColor);
    //     ellipse(width/2, height/2, 250);
    // pop();
    // push();
    //     noStroke();
    //     fill(foregroundColor);
    //     textSize(24);
    //     textFont(font);
    //     textAlign(CENTER, CENTER);
    //     text('map goes here', width/2, height/2);
    // pop();

}

function roads(){
    push();
        noFill();
        stroke(foregroundColor);
        strokeWeight(2);
        bezier(width*0.25, 0, width*0.33, height, width*0.5, height, width, height*0.66);
        // bezier(width, height*0.66, width*0.44, height*1.1, width*0.46, height*0.605, 0, height*0.83);
        bezier(width, height*0.66, width*0.22, height*1.2, width*0.619, height*0.455, 0, height*0.83);
    pop();

    // console.log(mouseX/width, mouseY/height);
}

var Landmark = function(_pos, _type, _link){
    this.pos = _pos;
    this.x = this.pos.x;
    this.y = this.pos.y;
    this.size = map(((width+height)/2), 500, 1200, 30, 50);
    this.scale = 1;
    this.rotation = random(-PI*0.05, PI*0.05);
    this.half = this.size*0.5;
    this.type = _type;
    this.over = false;
    this.caption = "the " + this.type;
    this.link = _link;

    this.show = function(){
        if (this.type == 'barn'){
            this.barn();
        } else if (this.type == 'conservancy'){
            this.tree();
        } else if (this.type == 'ticket shed'){
            this.ticket();
        }

        if (mouseX > this.pos.x-this.half && mouseX < this.pos.x+this.half && mouseY > this.pos.y-this.half && mouseY < this.pos.y+this.half){
            this.over = true;
        } else if (touches[0] != null){
            if (touches[0].x > this.pos.x-this.half && touches[0].x < this.pos.x+this.half && touches[0].y > this.pos.y-this.half && touches[0].y < this.pos.y+this.half){
                this.over = true;
            }
        } else {
            this.over = false;
        }

        if (this.over){
            document.getElementById('caption').innerHTML = this.caption;
            this.scale = 1.5;
        } else {
            // document.getElementById('caption').innerHTML = '';
            this.scale = 1;
        }

    };

    this.barn = function(){

        push();
            translate(this.pos.x, this.pos.y);
            scale(this.scale);
            noFill();
            stroke(foregroundColor);
            strokeWeight(2);
            // ellipse(0, 0, this.size);
            beginShape();
                vertex(0, -this.half);
                vertex(this.half, 0);
                vertex(this.half-this.size*0.1, 0);
                vertex(this.half-this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, 0);
                vertex(-this.half, 0);
            endShape(CLOSE);

        
        pop();
    };

    this.tree = function(){

        push();
            
            translate(this.pos.x, this.pos.y);
            noFill();
            scale(this.scale);
            stroke(foregroundColor);
            strokeWeight(2);
            // ellipse(0, 0, this.size);
            line(0, -this.half, 0, this.size*0.6);
            for (i=0;i<5;i++){
                push();
                    translate(0, i*(this.half/3));
                    line(0, -this.half, -this.half*0.6, -this.half*0.2);
                    line(0, -this.half, this.half*0.6, -this.half*0.2);
                pop();
            }

        
        pop();
    };

    this.ticket = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation);
            scale(this.scale);
            noFill();
            strokeWeight(2);
            stroke(foregroundColor);

            // textFont(font);
            for (i=0;i<5;i++){
                var spacer = i*10;
                line(-this.half + spacer, -this.half*0.5, -this.half + spacer, this.half*0.5);
            }
        pop();
    }

};

function flicker(){

}

function mouseHandler(){

}

function mouseClicked(){
    // window.frames[0].location = "sampleContent.html";
    // contentToggle();
    for (var i in landmarks){
        if (landmarks[i].over){
            loadNewIframeContent(landmarks[i].link);
            contentExpand();
        }
    }
}

function touchStarted(){
    for (var i in landmarks){
        if (landmarks[i].over){
            loadNewIframeContent(landmarks[i].link);
            contentExpand();
        }
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

    landmarkVectors = [new p5.Vector(width*0.66, height*0.4), new p5.Vector(width*0.2, height*0.3), new p5.Vector(width*0.55, height*0.45)];

    for (var i in landmarks){
        var newSize = map(((width+height)/2), 500, 1200, 30, 50);
        landmarks[i].pos = new p5.Vector(landmarkVectors[i].x, landmarkVectors[i].y);
        landmarks[i].size = newSize;
        landmarks[i].half = newSize*0.5;
        console.log(newSize);
    }

    
}
