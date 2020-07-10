var c, cParent;
var theme;
var foregroundColor, backgroundColor;
var accentColors = [];
var font;
var landmarks = [];
var landmarkVectors = [];
var ensembles = [];
var ensembleNames = [];
var ensembleVectors = [];
var ensembleLinks = [];
var secrets = [];
var secretVectors = [];
var barn, tree, ticketShed, milkShed, maple, watermelon;
var ensembleVectors = [];
var pond, parkingLot, tractor;
var totalVisited, pondExists, lotExists, tractorExists;
var mouseOrTouch;
var touchIsDown;
var fieldRecordings = [];
var contentContainerHidden;

var currentIconTarget, currentIcon;

var lightColors = [];
var lightHexColors = [];
var darkColors = [];
var darkHexColors = [];
var colorPalette, paletteIcons;

function preload(){
    font = loadFont('RobotoMono-ExtraLight.ttf');
}

function setup(){
    fieldRecordings[0] = loadSound('audio/dove.mp3'); // parking lot
    fieldRecordings[0].playMode('sustain');
    fieldRecordings[1] = loadSound('audio/frogs.mp3'); // pond
    fieldRecordings[1].playMode('sustain');
    fieldRecordings[1].setVolume(0.5);
    fieldRecordings[2] = loadSound('audio/call-response.mp3'); // tractor

    ensembleNames = ['might not find what you saw',
                'Hello Over There',
                'In Paralysis',
                'Chirr',
                'The Evolutionary Traits of Birds',
                'Non-Equivalent Changes',
                'Cada Mañana Una Nueva Llegada',
                'Communicating Gratitude',
                'Response',
                'Lullabies for Late Capitalism',
                'Arc Diffusion',
                'Generations of Decay',
                'Iso-',
                
                
                ];

    ensembleLinks = ['ensembles/mightnotfindwhatyousaw/index.html',
                    'ensembles/turquoise.html',
                    'ensembles/lemon.html',
                    'ensembles/green.html',
                    'ensembles/watermelon.html',
                    'ensembles/purple.html',
                    'ensembles/oak.html',
                    'ensembles/yellow.html',
                    'ensembles/pink.html',
                    'ensembles/cedar.html',
                    'ensembles/maple.html',
                    'ensembles/pine.html',
                    'ensembles/banana.html',
                    
                      
                    ];

    contentContainerHidden = true;
    content = document.getElementById('contentContainer');
    c = createCanvas(windowWidth, windowHeight);
    cParent = select('#canvasParent');
    c.parent(cParent);
    theme = 'night';
    touchIsDown = false;
    currentIconTarget = new p5.Vector(width/2, 0);
    

    landmarkVectors = [ new p5.Vector(width*0.66, height*0.5), //barn
                        new p5.Vector(width*0.2, height*0.3), //tree
                        new p5.Vector(width*0.54, height*0.55), //ticketShed
                        new p5.Vector(width*0.64, height*0.37)]; //milkshed

    

    ensembleVectors = [new p5.Vector(width*0.85, height*0.6), //apple (might not find)
                        new p5.Vector(width*0.6, height*0.68), //turquoise
                        new p5.Vector(width*0.25, height*0.5), //lemon
                        new p5.Vector(width*0.4, height*0.65), //green
                        new p5.Vector(width*0.15, height*0.4), //watermelon
                        new p5.Vector(width*0.79, height*0.4), //purple
                        new p5.Vector(width*0.15, height*0.21), //oak
                        new p5.Vector(width*0.8, height*0.52), //yellow
                        new p5.Vector(width*0.35, height*0.19), //pink
                        new p5.Vector(width*0.2, height*0.6), //cedar
                        new p5.Vector(width*0.05, height*0.3), //maple
                        new p5.Vector(width*0.8, height*0.2), //pine
                        new p5.Vector(width*0.9, height*0.3)]; //banana
                        
                        

    secretVectors = [new p5.Vector(width*0.38, height*0.3), //parking lot
                    new p5.Vector(width*0.6, height*0.3),//pond;
                    new p5.Vector(landmarkVectors[2].x - map(((width+height)/2), 500, 1200, 30, 50)*1.9, landmarkVectors[2].y - 50)]; //tractor
    

    barn = new Landmark(landmarkVectors[0], 'Barn', 'welcome.html');
    barn.isCurrentContent = true;
    currentIcon = barn;
    tree = new Landmark(landmarkVectors[1], 'Conservancy', 'https://www.westben.ca/music-for-seeds');
    ticketShed = new Landmark(landmarkVectors[2], 'Ticket Shed', 'https://www.westben.ca/donate');
    milkShed = new Landmark(landmarkVectors[3], 'Milkshed', 'milkshed.html');

    
    // maple = new Landmark(ensembleVectors[0], 'maple group', 'ensembles/maple.html');
    // watermelon = new Landmark(ensembleVectors[1], 'watermelon group', 'ensembles/watermelon.html');


    landmarks.push(barn);
    landmarks.push(tree);
    landmarks.push(ticketShed);
    landmarks.push(milkShed);

    
    for (var i = 0; i<10; i++){
        ensembles[i] = new Landmark(ensembleVectors[i], 'ensemble' + i, ensembleLinks[i]);
        ensembles[i].names = ensembleNames[i];
        ensembles[i].rotation = random(0, TWO_PI);
        ensembles[i].ensembleNum = i;
    }

    // landmarks.push(pond);

    mouseOrTouch = p5.Vector(0,0);
    totalVisited = 0;
    pondExists = false;
    lotExists = false;
    tractorExists = false;

    colorPalette = 0;
    lightColors = [color(255, 174, 189), color(116, 202, 255), color(255,193, 68), color(234, 255, 255)];
    darkColors = [color(72, 0, 93), color(0, 66, 71), color(30, 45, 0), color(28, 25, 41)];
    lightHexColors = [ '#FFAEBD', '#74CAFF', '#FFC144', '#eaffff'];
    //#A77C83
    darkHexColors = ['#48005D', '#004247', '#1E2D00', '#1C1929'];
    paletteIcons = ['◐', '◓', '◑', '◒'];

    foregroundColor = lightColors[colorPalette];
    backgroundColor = darkColors[colorPalette];
    accentColors[0] = color(95, 163, 50);
    accentColors[1] = color(255, 108, 108);
    accentColors[2] = color(108, 108, 255);

    colorPalette = int(random(1, 5))-1;
    paletteToggle();
    if (random() > 0.5){
        themeToggle();
    }

    matchTheme();

    contentExpand();

}

function draw(){

    clear();
    roads();

    document.getElementById('caption').innerHTML = '';

    for (var k in secrets){
        secrets[k].show();
    }
    for (var j in ensembles){
        ensembles[j].show();
    }
    for (var i in landmarks){
        landmarks[i].show();
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

        bezier(x1, y1, width*0.7, 0, width*0.4, height*0.7, landmarks[0].pos.x-(landmarks[0].size), landmarks[0].pos.y-landmarks[0].half);
        bezier(landmarks[0].pos.x-(landmarks[0].size), landmarks[0].pos.y-landmarks[0].half, width*0.7, height*0.4, width*0.75, height*0.45, landmarks[0].pos.x+(landmarks[0].size), landmarks[0].pos.y);

        // var x2 = bezierPoint(width*0.25, width*0.33, width*0.5, width, 0.27);
        // var y2 = bezierPoint(0, height, height, height*0.66, 0.27);
        // var x3 = bezierPoint(x1, width*0.7, width*0.3, landmarks[0].pos.x, 0.75);
        // var y3 = bezierPoint(y1, 0, height*0.8, landmarks[0].pos.y+landmarks[0].half, 0.75);

        // line(x2, y2, x3, y3);

    pop();

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
    this.caption = "The " + this.type;
    this.link = _link;
    this.linkIsAudio = false;
    this.visited = false;
    this.sinCounter = 0;
    this.names = '';
    this.ensembleNum = 0;
    this.vol = 0;
    this.isCurrentContent = false;

    this.show = function(){
        push();
            // if this is the current content, put it at the top of the screen
            if (this.isCurrentContent && !contentContainerHidden){
                this.scale = 1;
                this.sinCounter = (this.sinCounter + 0.01)%TWO_PI;
                translate(-this.pos.x + width/2, -this.pos.y + 35);
                push();
                    fill(foregroundColor);
                    noStroke();
                    strokeWeight(3);
                    // ellipse(this.pos.x, this.pos.y, this.size*1.8);
                    rectMode(CENTER);
                    rect(this.pos.x, this.pos.y, 90, 70);
                pop();

                translate(0, sin(this.sinCounter)*5);
                
                document.getElementById('caption').innerHTML = '';
            }

            if (this.type == 'Barn'){
                this.barn();
            } else if (this.type == 'Conservancy'){
                this.tree();
            } else if (this.type == 'Ticket Shed'){
                this.ticket();
            } else if (this.type == 'maple group'){
                this.maple();
            } else if (this.type == 'Milkshed'){
                this.milk();
            } else if (this.type == 'parking lot'){
                this.parking();
            } else if (this.type == 'pond'){
                this.pond();
            } else if (this.type == 'tractor'){
                this.tractor();
            } else {
                this.ensemble();
            }
        pop();

        if (!touchIsDown){
            if (mouseX > this.pos.x-this.collide && mouseX < this.pos.x+this.collide && mouseY > this.pos.y-this.collide && mouseY < this.pos.y+this.collide){
                this.over = true;
            } else {
                this.over = false;
            }
        } else if (touchIsDown){
            if (touches[0] != null){
                if (touches[0].x > this.pos.x-this.collide && touches[0].x < this.pos.x+this.collide && touches[0].y > this.pos.y-this.collide && touches[0].y < this.pos.y+this.collide){
                    this.over = true;
                } else {
                    this.over = false;
                }
            } else {
                this.over = false;
            }
        }

        if (this.over){
            if (!this.isCurrentContent && contentContainerHidden){
                if (this.names != ''){
                    document.getElementById('caption').innerHTML = this.names;
                } else {
                    document.getElementById('caption').innerHTML = this.caption;
                }

                this.scale = 1.5;
            }
            
        } else {
            if (!this.isCurrentContent){
                this.scale = 1;
            }

        }   

    };

    this.clicked = function(){

        // loadNewIframeContent(this.link);
        // contentExpand();

        if (this.linkIsAudio){
            
            userStartAudio();
            for (var i in fieldRecordings){
                if (fieldRecordings[i] == this.link){
                    if (fieldRecordings[i].isPlaying()){
                        fieldRecordings[i].stop();
                    } else {
                        fieldRecordings[i].play();
                    }
                    
                }
            }
        } else {
            currentIcon = this;
            loadNewIframeContent(this.link);
            contentExpand();
           
        }

        if (!this.linkIsAudio){
            if (!this.visited){
                totalVisited++;
                this.visited = true;
            }
        }

        if (totalVisited >= 7 && fieldRecordings[2].isLoaded() && lotExists){
            if (!tractorExists){
                makeTractor();
                tractorExists = true;
            }
        }

        if (totalVisited >= 5 && fieldRecordings[1].isLoaded() && lotExists){
            if (!pondExists){
                makePond();
                pondExists = true;
            }
        }

        if (totalVisited >= 3 && fieldRecordings[0].isLoaded()){
            if (!lotExists){
                makeParkingLot();
                lotExists = true;
            }
        }

        
        
    };

    this.barn = function(){

        push();
            translate(this.pos.x, this.pos.y + this.half*0.1);
            scale(this.scale);
            noFill();
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }
            strokeWeight(2);
            // MAIN BARN
            beginShape();
                vertex(0, -this.half*0.8);
                vertex(this.half*1.05, 0);
                vertex(this.half-this.size*0.1, 0);
                vertex(this.half-this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, this.half*0.5);
                vertex(-this.half+this.size*0.1, 0);
                vertex(-this.half*1.05, 0);
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
            
            translate(this.pos.x, this.pos.y-this.half*0.4);
            noFill();
            scale(this.scale);
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }
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
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }

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
            if (!this.isCurrentContent){
                stroke(foregroundColor);
            } else if (!contentContainerHidden){
                stroke(backgroundColor);
            } else {
                stroke(foregroundColor);
            }

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

    this.ensemble = function(){
        this.sinCounter = (this.sinCounter+random(0.001, 0.01))%TWO_PI;
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation + this.sinCounter);
            scale(this.scale);
            noFill();
            stroke(accentColors[0]);
            strokeWeight(2);
            ellipse(0, 0, this.size, this.size);
            
            if (this.ensembleNum == 0){                 // POINTS
                strokeWeight(5);
                point(this.half*0.3, 0);
            } else if (this.ensembleNum == 1){
                strokeWeight(5);
                point(-this.half*0.3, 0);
                point(this.half*0.3, 0);
            } else if (this.ensembleNum == 2){
                strokeWeight(5);
                point(-this.half*0.3, this.half*0.2);
                point(this.half*0.3, this.half*0.2);
                point(0, -this.half*0.3);
            }  else if (this.ensembleNum == 3){
                strokeWeight(5);
                point(-this.half*0.3, -this.half*0.3);
                point(-this.half*0.3, this.half*0.3);
                point(this.half*0.3, this.half*0.3);
                point(this.half*0.3, -this.half*0.3);
            } else if (this.ensembleNum == 4){          // ONE LINE
                for (i=0;i<1;i++){
                    push();
                    rotate(i * PI/1);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 5){          // CROSS LINES
                for (i=0;i<2;i++){
                    push();
                    rotate(i * PI/2);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 6){          // CROSS LINES
                for (i=0;i<3;i++){
                    push();
                    rotate(i * PI/3);
                        line(0, -this.half, 0, this.half);
                    pop();
                }
            }  else if (this.ensembleNum == 7){          // PARALLEL LINES
                    push();
                        line(-this.half*0.33, -this.half*0.9, -this.half*0.33, this.half*0.9);
                        line(this.half*0.33, -this.half*0.9, this.half*0.33, this.half*0.9);
                    pop();
            }  else if (this.ensembleNum == 8){          // PARALLEL LINES
                    push();
                        line(-this.half*0.5, -this.half*0.8, -this.half*0.5, this.half*0.8);
                        line(0, -this.half, 0, this.half);
                        line(this.half*0.5, -this.half*0.8, this.half*0.5, this.half*0.8);
                    pop();
            } else if (this.ensembleNum == 9){          // CONCENTRIC
                    push();
                        ellipse(-this.half*0.5, 0, this.size*0.5);
                    pop();
            } else if (this.ensembleNum == 10){          // CONCENTRIC
                push();
                    ellipse(-this.half*0.33, 0, this.size*0.66);
                    ellipse(-this.half*0.66, 0, this.size*0.33);
                pop();
            } else if (this.ensembleNum == 11){          // TRIANGLE
                push();
                    beginShape();
                        vertex(-this.half*0.6, this.half*0.4);
                        vertex(this.half*0.6, this.half*0.4);
                        vertex(0, -this.half*0.7);
                    endShape(CLOSE);
                pop();
            } else if (this.ensembleNum == 12){          // SQUARE
                push();
                    rectMode(CENTER);
                    rect(0, 0, this.half, this.half);
                pop();
            } else {
                strokeWeight(5);
                point(0, 0);
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
            
            if (fieldRecordings[1].isPlaying()){
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
        
            if (fieldRecordings[0].isPlaying()){
                this.sinCounter += 0.1;
            }

        pop();
    };

    this.tractor = function(){
        push();

            translate(this.pos.x, this.pos.y + sin(this.sinCounter)*5);
            rotate(-PI/12);
            scale(this.scale);

            noFill();
            strokeWeight(2);
            stroke(accentColors[2]);

            //wheels
            ellipse(-this.half, this.half, this.half*0.6, this.half*0.6);
            // ellipse(-this.half, this.half, this.half*0.4);
            ellipse(this.half, this.half*0.8, this.size*0.8);
            // ellipse(this.half, this.half*0.8, this.size*0.4);
            arc(this.half, this.half*0.8, this.size, this.size, -HALF_PI - QUARTER_PI, 0);

            //body

            beginShape();
                vertex(0, -this.half*0.3);
                vertex(-this.half, -this.half*0.3);
                vertex(-this.half, this.half);
                vertex(-this.half*0.5, this.half);
                vertex(0, 0);
            endShape(CLOSE);

            // pipes
            line(-this.half*0.7, -this.half*0.3, -this.half*0.7, -this.half*0.5);
            line(-this.half*0.6, -this.half*0.3, -this.half*0.6, -this.half*0.6);

            // vent
            line(-this.half, 0, -this.half*0.8, 0);
            line(-this.half, this.half*0.1, -this.half*0.8, this.half*0.1);
            line(-this.half, this.half*0.2, -this.half*0.8, this.half*0.2);

            
            if (fieldRecordings[2].isPlaying()){
                this.sinCounter += 0.1;
            }
            
        pop();
    };
};

function makePond(){
    pond = new Landmark(secretVectors[1], 'pond', fieldRecordings[1]);
    pond.linkIsAudio = true;
    secrets.push(pond);
}

function makeParkingLot(){
    parkingLot = new Landmark(secretVectors[0], 'parking lot', fieldRecordings[0]);
    parkingLot.linkIsAudio = true;
    secrets.push(parkingLot);
}

function makeTractor(){
    tractor = new Landmark(secretVectors[2], 'tractor', fieldRecordings[2]);
    tractor.linkIsAudio = true;
    secrets.push(tractor);
}


function mousePressed(){
    

    if (!touchIsDown){
        if (!contentContainerHidden){
            // if (mouseY < 100){
            //     contentContract();
            // }
        }
        for (var i in landmarks){
            if (landmarks[i].over && contentContainerHidden){
                landmarks[i].clicked();
                landmarks[i].isCurrentContent = true;
            } else {
                landmarks[i].isCurrentContent = false;
            }
        }
        for (var j in ensembles){
            if (ensembles[j].over && contentContainerHidden){
                ensembles[j].clicked();
                ensembles[j].isCurrentContent = true;
            } else {
                ensembles[j].isCurrentContent = false;
            }
        }
        for (var k in secrets){
            if (secrets[k].over && contentContainerHidden){
                secrets[k].clicked();
            }
        }
    }

    
    
}

function touchStarted(){
    touchIsDown = true;
}

function touchEnded(){
    // console.log(touchIsDown);
    if (touchIsDown){
        if (!contentContainerHidden){
            // if (touches[0] != null && touches[0].y < 100){
            //     contentContract();
            //     console.log('hello');
            // }
        }

        for (var i in landmarks){
            if (landmarks[i].over && contentContainerHidden){
                landmarks[i].clicked();
                landmarks[i].over = false;
                landmarks[i].isCurrentContent = true;
            } else {
                landmarks[i].isCurrentContent = false;
            }
        }
        for (var j in ensembles){
            if (ensembles[j].over && contentContainerHidden){
                ensembles[j].clicked();
                ensembles[j].over = false;
                ensembles[j].isCurrentContent = true;
            } else {
                ensembles[j].isCurrentContent = false;
            }
        }
        for (var k in secrets){
            if (secrets[k].over && contentContainerHidden){
                secrets[k].clicked();
                secrets[k].over = false;
                
            }
        }
        // touchIsDown = false;
    }
    // return false;
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

    landmarkVectors = [ new p5.Vector(width*0.66, height*0.5), //barn
                        new p5.Vector(width*0.2, height*0.3), //tree
                        new p5.Vector(width*0.54, height*0.55), //ticketShed
                        new p5.Vector(width*0.64, height*0.37)]; //milkShed

    ensembleVectors = [new p5.Vector(width*0.85, height*0.6), //apple (might not find)
                        new p5.Vector(width*0.6, height*0.68), //turquoise
                        new p5.Vector(width*0.25, height*0.5), //lemon
                        new p5.Vector(width*0.4, height*0.65), //green
                        new p5.Vector(width*0.15, height*0.4), //watermelon
                        new p5.Vector(width*0.79, height*0.4), //purple
                        new p5.Vector(width*0.15, height*0.21), //oak
                        new p5.Vector(width*0.8, height*0.52), //yellow
                        new p5.Vector(width*0.35, height*0.19), //pink
                        new p5.Vector(width*0.2, height*0.6), //cedar
                        new p5.Vector(width*0.05, height*0.3), //maple
                        new p5.Vector(width*0.8, height*0.2), //pine
                        new p5.Vector(width*0.9, height*0.3)]; //banana

    secretVectors = [new p5.Vector(width*0.38, height*0.3), //parking lot
                        new p5.Vector(width*0.6, height*0.3),//pond;
                        new p5.Vector(landmarkVectors[2].x - landmarks[2].size*1.9, landmarkVectors[2].y - 50)]; //tractor


    for (var i in landmarks){
        var landmarkSize = map(((width+height)/2), 500, 1200, 30, 50);
        landmarks[i].pos = new p5.Vector(landmarkVectors[i].x, landmarkVectors[i].y);
        landmarks[i].size = landmarkSize;
        landmarks[i].half = landmarkSize*0.5;
        landmarks[i].collide = landmarkSize*0.7;
    }
    for (var j in ensembles){
        var ensembleSize = map(((width+height)/2), 500, 1200, 30, 50);
        ensembles[j].pos = new p5.Vector(ensembleVectors[j].x, ensembleVectors[j].y);
        ensembles[j].size = ensembleSize;
        ensembles[j].half = ensembleSize*0.5;
        ensembles[j].collide = ensembleSize*0.7;
    }
    for (var k in secrets){
        var secretSize = map(((width+height)/2), 500, 1200, 30, 50);
        secrets[k].pos = new p5.Vector(secretVectors[k].x, secretVectors[k].y);
        secrets[k].size = secretSize;
        secrets[k].half = secretSize*0.5;
        secrets[k].collide = secretSize*0.7;
    }

}

function deviceTurned(){
    resizeCanvas(windowWidth, windowHeight);

    landmarkVectors = [ new p5.Vector(width*0.66, height*0.5), //barn
                        new p5.Vector(width*0.2, height*0.3), //tree
                        new p5.Vector(width*0.54, height*0.55), //ticketShed
                        new p5.Vector(width*0.64, height*0.37)]; //milkShed

    ensembleVectors = [new p5.Vector(width*0.85, height*0.6), //apple (might not find)
                        new p5.Vector(width*0.6, height*0.68), //turquoise
                        new p5.Vector(width*0.25, height*0.5), //lemon
                        new p5.Vector(width*0.4, height*0.65), //green
                        new p5.Vector(width*0.15, height*0.4), //watermelon
                        new p5.Vector(width*0.79, height*0.4), //purple
                        new p5.Vector(width*0.15, height*0.21), //oak
                        new p5.Vector(width*0.8, height*0.52), //yellow
                        new p5.Vector(width*0.35, height*0.19), //pink
                        new p5.Vector(width*0.2, height*0.6), //cedar
                        new p5.Vector(width*0.05, height*0.3), //maple
                        new p5.Vector(width*0.8, height*0.2), //pine
                        new p5.Vector(width*0.9, height*0.3)]; //banana

    secretVectors = [new p5.Vector(width*0.38, height*0.3), //parking lot
                        new p5.Vector(width*0.6, height*0.3),//pond;
                        new p5.Vector(landmarkVectors[2].x - landmarks[2].size*1.9, landmarkVectors[2].y - 50)]; //tractor


    for (var i in landmarks){
        var landmarkSize = map(((width+height)/2), 500, 1200, 30, 50);
        landmarks[i].pos = new p5.Vector(landmarkVectors[i].x, landmarkVectors[i].y);
        landmarks[i].size = landmarkSize;
        landmarks[i].half = landmarkSize*0.5;
        landmarks[i].collide = landmarkSize*0.7;
    }
    for (var j in ensembles){
        var ensembleSize = map(((width+height)/2), 500, 1200, 30, 50);
        ensembles[j].pos = new p5.Vector(ensembleVectors[j].x, ensembleVectors[j].y);
        ensembles[j].size = ensembleSize;
        ensembles[j].half = ensembleSize*0.5;
        ensembles[j].collide = ensembleSize*0.7;
    }
    for (var k in secrets){
        var secretSize = map(((width+height)/2), 500, 1200, 30, 50);
        secrets[k].pos = new p5.Vector(secretVectors[k].x, secretVectors[k].y);
        secrets[k].size = secretSize;
        secrets[k].half = secretSize*0.5;
        secrets[k].collide = secretSize*0.7;
    }
}


function keyTyped(){
    // if (key == 'b'){
    //     makeParkingLot();
    //     makePond();
    //     makeTractor();
    // }
}