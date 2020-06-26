var c, cParent;
var theme;
var foregroundColor, backgroundColor;
var accentColors = [];
var font;
var landmarks = [];
var landmarkVectors = [];
var barn, tree, ticketShed, milkShed, maple, watermelon;
var pond, parkingLot;
var totalVisited, pondExists, lotExists;
var mouseOrTouch;
var touchIsDown;
var fieldRecordings = [];
var ensembles = [];

function preload(){
    font = loadFont('RobotoMono-ExtraLight.ttf');
    soundFormats('mp3');
}

function setup(){
    fieldRecordings[0] = loadSound('audio/piano-A.mp3');
    fieldRecordings[0].playMode('restart');
    fieldRecordings[1] = loadSound('audio/piano-B.mp3');
    fieldRecordings[1].playMode('restart');

    ensembles = ['An-Laurence / Finley / Kim / McElwain',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
                'Name / Name / Name / Name',
    ];

    contentContainerHidden = true;
    content = document.getElementById('contentContainer');
    c = createCanvas(windowWidth, windowHeight);
    cParent = select('#canvasParent');
    c.parent(cParent);
    theme = 'night';
    touchIsDown = false;

    foregroundColor = color(255);
    accentColors[0] = color(95, 163, 50);
    accentColors[1] = color(255, 108, 108);
    accentColors[2] = color(108, 108, 255);

    landmarkVectors = [ new p5.Vector(width*0.66, height*0.4), //barn
                        new p5.Vector(width*0.2, height*0.3), //tree
                        new p5.Vector(width*0.55, height*0.45), //ticketShed
                        new p5.Vector(width*0.6, height*0.3), //milkShed
                        new p5.Vector(width*0.8, height*0.2), //maple
                        new p5.Vector(width*0.1, height*0.7), //watermelon
                        new p5.Vector(width*0.42, height*0.3), //parking lot
                        new p5.Vector(width*0.6, height*0.2)]; //pond
                        

    barn = new Landmark(landmarkVectors[0], 'barn', 'welcome.html');
    tree = new Landmark(landmarkVectors[1], 'conservancy', 'conservancy.html');
    ticketShed = new Landmark(landmarkVectors[2], 'ticket shed', 'https://www.westben.ca/donate');
    milkShed = new Landmark(landmarkVectors[3], 'milk shed', 'milkshed.html');
    maple = new Landmark(landmarkVectors[4], 'maple group', 'maple.html');
    maple.names = ensembles[0];
    watermelon = new Landmark(landmarkVectors[5], 'watermelon group', 'watermelon.html');
    watermelon.names = ensembles[1];

    landmarks.push(barn);
    landmarks.push(tree);
    landmarks.push(ticketShed);
    landmarks.push(milkShed);
    landmarks.push(maple);
    landmarks.push(watermelon);

    // landmarks.push(pond);

    mouseOrTouch = p5.Vector(0,0);
    totalVisited = 0;
    pondExists = false;
    lotExists = false;

    contentToggle();
}

function draw(){
    clear();
    roads();
    document.getElementById('caption').innerHTML = '';

    for (var i in landmarks){
        landmarks[i].show();

        // if (landmarks[i].over){
        //     if (landmarks[i].names != ''){
        //         document.getElementById('caption').innerHTML = landmarks[i].names;
        //     } else {
        //         document.getElementById('caption').innerHTML = landmarks[i].caption;
        //     }
        // }

    
    }
    

}

function mouseOverHandler(){
    for (var i in landmarks){
        if (landmarks[i].over){
            
        } else {

        }
    }
}

function roads(){
    // highway

    push();
        noFill();
        stroke(foregroundColor);
        strokeWeight(2);
        bezier(width*0.25, 0, width*0.33, height, width*0.5, height, width, height*0.66);
        // bezier(width, height*0.66, width*0.44, height*1.1, width*0.46, height*0.605, 0, height*0.83);
        bezier(width, height*0.66, width*0.22, height*1.2, width*0.619, height*0.455, 0, height*0.83);
    pop();

    // westben roads

    push();
        noFill();
        stroke(foregroundColor);
        strokeWeight(1);
        var x1 = bezierPoint(width*0.25, width*0.33, width*0.5, width, 0.1);
        var y1 = bezierPoint(0, height, height, height*0.66, 0.1);
        // ellipse(x1, y1, 100);

        bezier(x1, y1, width*0.7, 0, width*0.3, height*0.8, landmarks[0].pos.x, landmarks[0].pos.y+landmarks[0].half);

        var x2 = bezierPoint(width*0.25, width*0.33, width*0.5, width, 0.27);
        var y2 = bezierPoint(0, height, height, height*0.66, 0.27);
        var x3 = bezierPoint(x1, width*0.7, width*0.3, landmarks[0].pos.x, 0.75);
        var y3 = bezierPoint(y1, 0, height*0.8, landmarks[0].pos.y+landmarks[0].half, 0.75);

        line(x2, y2, x3, y3);

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
    this.collide = this.size*0.7;
    this.type = _type;
    this.over = false;
    this.caption = "the " + this.type;
    this.link = _link;
    this.linkIsAudio = false;
    this.visited = false;
    this.sinCounter = 0;
    this.names = '';

    this.show = function(){
        if (this.type == 'barn'){
            this.barn();
        } else if (this.type == 'conservancy'){
            this.tree();
        } else if (this.type == 'ticket shed'){
            this.ticket();
        } else if (this.type == 'maple group'){
            this.maple();
        } else if (this.type == 'watermelon group'){
            this.watermelon();
        } else if (this.type == 'pond'){
            this.pond();
        } else if (this.type == 'milk shed'){
            this.milk();
        } else if (this.type == 'parking lot'){
            this.parking();
        }

        if (mouseX > this.pos.x-this.collide && mouseX < this.pos.x+this.collide && mouseY > this.pos.y-this.collide && mouseY < this.pos.y+this.collide){
            this.over = true;
        } else if (touchIsDown){
            if (touches[0].x > this.pos.x-this.collide && touches[0].x < this.pos.x+this.collide && touches[0].y > this.pos.y-this.collide && touches[0].y < this.pos.y+this.collide){
                this.over = true;
            } else {
                this.over = false;
            }
        } else {
            this.over = false;
        }

        if (this.over){
            if (this.names != ''){
                document.getElementById('caption').innerHTML = this.names;
            } else {
                document.getElementById('caption').innerHTML = this.caption;
            }
            this.scale = 1.5;
        } else {
            this.scale = 1;

        }   

    };

    this.clicked = function(){
        if (this.linkIsAudio){
            for (var i in fieldRecordings){
                if (fieldRecordings[i] == this.link){
                    if (fieldRecordings[i].isPlaying()){
                        fieldRecordings[i].pause();
                    } else {
                        fieldRecordings[i].play();
                    }
                    
                }
            }
        } else {
            loadNewIframeContent(this.link);
            contentExpand();
        }

        if (!this.visited){
            totalVisited++;
            this.visited = true;
            console.log(totalVisited);
        }

        if (totalVisited >= 5 && fieldRecordings[0].isLoaded()){
            if (!pondExists){
                makePond();
                pondExists = true;
            }
        }

        if (totalVisited >= 3 && fieldRecordings[1].isLoaded()){
            if (!lotExists){
                makeParkingLot();
                lotExists = true;
            }
        }
        
    };

    this.barn = function(){

        push();
            translate(this.pos.x, this.pos.y);
            scale(this.scale);
            noFill();
            stroke(foregroundColor);
            strokeWeight(2);
            // MAIN BARN
            beginShape();
                vertex(0, -this.half*0.8);
                vertex(this.half, 0);
                vertex(this.half-this.size*0.1, 0);
                vertex(this.half-this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, 0);
                vertex(-this.half, 0);
            endShape(CLOSE);

            // BIG ROOF
            beginShape();
                vertex(-this.half*1.1, 0);
                vertex(-this.half*0.8, -this.half*0.8);
                vertex(0, -this.half*1.3);
                vertex(this.half*0.8, -this.half*0.8);
                vertex(this.half*1.1, 0);
            endShape();

            // SIDE R
            beginShape();
                vertex(this.half*0.8, -this.half*0.8);
                vertex(this.half*1.3, -this.half*0.8);
                vertex(this.half*1.3, this.half*0.5);
                vertex(this.half-this.size*0.1, this.half*0.5);
            endShape();
            // SIDE L
            beginShape();
                vertex(-this.half*0.8, -this.half*0.8);
                vertex(-this.half*1.3, -this.half*0.8);
                vertex(-this.half*1.3, this.half*0.5);
                vertex(-this.half+(this.size*0.1), this.half*0.5);
            endShape();

        
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
                var spacer = i*(this.half*0.4);
                line(-this.half + spacer, -this.half*0.5, -this.half + spacer, this.half*0.5);
            }
        pop();
    };

    this.milk = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(0);
            scale(this.scale);
            noFill();
            strokeWeight(2);
            stroke(foregroundColor);

            // front face
            line(0, 0, this.half, -this.half*0.2);
            line(0, 0, 0, this.half);
            line(0, this.half, this.half, this.half-(this.half*0.2));
            line(this.half, this.half-(this.half*0.2), this.half, -this.half*0.2);

            // side face
            line(0, 0, -this.half*0.9, -this.half*0.2);
            line(-this.half*0.9, -this.half*0.2, -this.half*0.9, this.half-(this.half*0.2));
            line(-this.half*0.9, this.half-(this.half*0.2), 0, this.half);

            // triangle
            line(0, 0, -this.half*0.5, -this.half*0.8);
            line(-this.half*0.5, -this.half*0.8, -this.half*0.9, -this.half*0.2);

            // top angle
            line(this.half, -this.half*0.2, this.half*0.5, -this.half*0.9);
            line(this.half*0.5, -this.half*0.9, -this.half*0.5, -this.half*0.8);

            // top tab
            line(-this.half*0.5, -this.half*0.8, -this.half*0.5, -this.half*1.1);
            line(-this.half*0.5, -this.half*1.1, this.half*0.5, -this.half*1.2);
            line(this.half*0.5, -this.half*1.2, this.half*0.5, -this.half*0.9);

        pop();
    };

    this.maple = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation);
            scale(this.scale);
            noFill();
            stroke(accentColors[0]);
            strokeWeight(2);
            ellipse(0, 0, this.size, this.size);
            strokeWeight(5);
            point(0, 0);
            
        pop();
    };

    this.watermelon = function(){
        push();
            translate(this.pos.x, this.pos.y);
            rotate(-PI/8);
            scale(this.scale);
            noFill();
            strokeWeight(2);
            stroke(accentColors[0]);
            ellipse(0, 0, this.size, this.size);

            // strokeWeight(5);
            for (i=0;i<1;i++){
                push();
                rotate(i * PI/1);
                    line(0, -this.half, 0, this.half);
                pop();
            }
            
        pop();
    };

    this.pond = function(){
        push();

            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(-PI/12);
            scale(this.scale);
            noFill();
            strokeWeight(2);
            stroke(accentColors[2]);

            // ellipse(0, 0, this.size, this.size*0.7);
            arc(-this.half, 0, this.half, this.half, 0, HALF_PI);
            arc(0, 0, this.half, this.half, HALF_PI, PI);
            arc(0, 0, this.half, this.half, 0, HALF_PI);
            arc(this.half, 0, this.half, this.half, HALF_PI, PI);
            arc(this.half, 0, this.half, this.half, 0, HALF_PI);
            arc(this.size, 0, this.half, this.half, HALF_PI, PI);
            
            if (fieldRecordings[0].isPlaying()){
                this.sinCounter += 0.1;
            }
            
        pop();
    };

    this.parking = function(){
        push();
            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(0);
            scale(this.scale);
            noFill();
            strokeWeight(2);
            stroke(accentColors[2]);

            quad(this.collide, -this.collide, this.collide, this.collide, -this.collide, this.collide*0.9, -this.collide, -this.collide*0.9);
        
            if (fieldRecordings[1].isPlaying()){
                this.sinCounter += 0.1;
            }

        pop();
    };
};

function makePond(){
    pond = new Landmark(landmarkVectors[7], 'pond', fieldRecordings[0]);
    pond.linkIsAudio = true;
    landmarks.push(pond);
}
function makeParkingLot(){
    parkingLot = new Landmark(landmarkVectors[6], 'parking lot', fieldRecordings[1]);
    parkingLot.linkIsAudio = true;
    landmarks.push(parkingLot);
}

function flicker(){

}

function mouseHandler(){

}

function mouseClicked(){

    for (var i in landmarks){
        if (landmarks[i].over){
            landmarks[i].clicked();
        }
    }
}

function touchStarted(){

    touchIsDown = true;

}

function touchEnded(){
    if (touchIsDown){
        for (var i in landmarks){
            if (landmarks[i].over){
                landmarks[i].clicked();
            }
        }
        touchIsDown = false;
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

    landmarkVectors = [ new p5.Vector(width*0.66, height*0.4), //barn
                        new p5.Vector(width*0.2, height*0.3), //tree
                        new p5.Vector(width*0.55, height*0.45), //ticketShed
                        new p5.Vector(width*0.6, height*0.3), //milkShed
                        new p5.Vector(width*0.8, height*0.2), //maple
                        new p5.Vector(width*0.1, height*0.7), //watermelon
                        new p5.Vector(width*0.42, height*0.3), //parking lot
                        new p5.Vector(width*0.6, height*0.2)]; //pond


    for (var i in landmarks){
        var newSize = map(((width+height)/2), 500, 1200, 30, 50);
        landmarks[i].pos = new p5.Vector(landmarkVectors[i].x, landmarkVectors[i].y);
        landmarks[i].size = newSize;
        landmarks[i].half = newSize*0.5;
        landmarks[i].collide = newSize*0.7;
        console.log(newSize);
    }

}
