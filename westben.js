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

var roadPoints = [];

var slideIn;
var overSomething;

var concerts = [];
var concertVectors = [];
var concertLinks = [];

var currentIconTarget, currentIcon;

var lightColors = [];
var lightHexColors = [];
var darkColors = [];
var darkHexColors = [];
var colorPalette, paletteIcons;

var pcr2020Toggle;
var currentLayer;

var hashAnalyzed;


function preload(){
    font = loadFont('RobotoMono-ExtraLight.ttf');
}

function setup(){
    document.getElementById('body').style.setProperty('display', 'block');
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
                'The Evolutionary Traits...',
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

    concertNames = ['Co-Presence',
                    'Mount Carmel',
                    'Valérie Milot',
                    'For the Birds',
                    'Brian Manker',
                    'Jordan Mowat',
                    'Tree of Light',
                    'Barbra Lica',
                    'Fitzgeralds'];

    concertLinks = ['concerts/2020/copresence.html',
                    'concerts/2020/mountcarmel.html',
                    'concerts/2020/valeriemilot.html',
                    'concerts/2020/forthebirds.html',
                    'concerts/2020/brianmanker.html',
                    'concerts/2020/jordanmowat.html',
                    'concerts/2020/treeoflight.html',
                    'concerts/2020/barbralica.html',
                    'concerts/2020/fitzgeralds.html'
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
    

    concertVectors = [
                    new p5.Vector(width*0.8, height*0.55), //Co-presence
                    new p5.Vector(width*0.4, height*0.15), //Mt Carmel
                    new p5.Vector(width*0.75, height*0.4), //Valérie Milot
                    new p5.Vector(width*0.15, height*0.6), //For the Birds
                    new p5.Vector(width*0.65, height*0.7), //Brian Manker
                    new p5.Vector(width*0.45, height*0.65), //Jordan Mowat
                    new p5.Vector(width*0.55, height*0.2), //Christmas
                    new p5.Vector(width*0.1, height*0.4), //Barbra Lica
                    new p5.Vector(width*0.85, height*0.25), //Fitzgeralds
    ];


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

    
    for (var i = 0; i<13; i++){
        ensembles[i] = new Landmark(ensembleVectors[i], 'ensemble', ensembleLinks[i]);
        ensembles[i].names = ensembleNames[i];
        ensembles[i].rotation = random(0, TWO_PI);
        ensembles[i].ensembleNum = i;
    }

    for (j=0;j<concertLinks.length;j++){
        concerts[j] = new Landmark(concertVectors[j], 'concert', concertLinks[j]);
        concerts[j].names = concertNames[j];
        concerts[j].rotation = random(0, TWO_PI);
        concerts[j].ensembleNum = j;
    }
    concerts[concerts.length-1].newest = true;


    mouseOrTouch = p5.Vector(0,0);
    totalVisited = 0;
    pondExists = false;
    lotExists = false;
    tractorExists = false;

    colorPalette = 0;
    lightColors = [color(237, 180, 161), color(196, 240, 194), color(240, 204, 105), color(234, 255, 255)];
    darkColors = [color(44, 33, 55), color(81, 82, 98), color(9, 77, 24), color(28, 25, 41)];

    lightHexColors = [ '#edb4a1', '#c4f0c2', '#f0cc69', '#eaffff'];
    //#A77C83
    darkHexColors = ['#2c2137', '#515262', '#094d18', '#1C1929'];
    paletteIcons = ['0', '90', '180', '270'];

    foregroundColor = lightColors[colorPalette];
    backgroundColor = darkColors[colorPalette];
    accentColors[0] = color(95, 163, 50);
    accentColors[1] = color(255, 108, 108);
    accentColors[2] = color(108, 108, 255);

    colorPalette = int(random(1, 5))-1;
    paletteToggle();
    if (random() > 0.5){
        themeToggle();
    } else {
        themeToggle();
        themeToggle();
    }

    pcr2020Toggle = true;
    currentLayer = 1;
    slideIn = -35;

    matchTheme();
    // contentExpand();
    hashAnalyzed = false;
    startFromHash();


    // layerToggle();
    // layerToggle();

    
}

function draw(){

    clear();
    roads();

    document.getElementById('caption').innerHTML = '';
    document.getElementById('caption').style.setProperty('display', 'none');
    // cursor('wait');

    
    overSomething = 0;

    for (var k in secrets){
        secrets[k].show();
        if (secrets[k].over){
            overSomething++;
        }
        
    }

    if (currentLayer == 0){
        for (var j in ensembles){
            ensembles[j].show();
            if (ensembles[j].over){
                overSomething++;
            }
        }
        
    } else if (currentLayer == 1){
        for (var l in concerts){
            concerts[l].show();
            if (concerts[l].over){
                overSomething++;
            }
        }
    }
    for (var i in landmarks){
        landmarks[i].show();
        if (landmarks[i].over){
            overSomething++;
        }
    }

    youAreHerePanel();
    if (!contentContainerHidden){
        currentIcon.show();
    }

    
}

function youAreHerePanel(){
    if (contentContainerHidden){
        if (overSomething > 0){
            if (!touchIsDown){
                if (slideIn < 35){
                    slideIn+=5;
                } else {
                    slideIn = 35;
                }
            }
        } else {
            if (slideIn > -35){
                slideIn-=5;
            } else {
                slideIn = -35;
            }
        }
    } else {
        if (slideIn < 35){
            slideIn+=5;
        } else {
            slideIn = 35;
        }
    }

    push();
        fill(foregroundColor);
        noStroke();
        // strokeWeight(3);
        // ellipse(this.pos.x, this.pos.y, this.size*1.8);
        rectMode(CENTER);
        if (width < 720){
            rect((2*width/3), slideIn, 2*width/3, 70);
        } else {
            rect(width/2, slideIn, width/2, 70);
        }

    pop();
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
        strokeWeight(2);

        var x1 = bezierPoint(width*0.25, width*0.33, width*0.5, width, 0.1);
        var y1 = bezierPoint(0, height, height, height*0.66, 0.1);
        roadPoints[0] = createVector(x1, y1);
        roadPoints[1] = createVector(width*0.56, height*0.1);
        roadPoints[2] = createVector(width*0.51, height*0.38);
        roadPoints[3] = createVector(width*0.48, height*0.51);
        // roadPoints[4] = createVector(landmarks[0].pos.x-(landmarks[0].size), landmarks[0].pos.y-landmarks[0].half);
        roadPoints[4] = createVector(width*0.56, height*0.47);
        roadPoints[5] = createVector(width*0.71, height*0.38);
        // roadPoints[6] = createVector(width*0.75, height*0.45);
        roadPoints[6] = createVector(landmarks[0].pos.x+(landmarks[0].size), landmarks[0].pos.y);


        // bezier(x1, y1, width*0.7, 0, width*0.4, height*0.7, landmarks[0].pos.x-(landmarks[0].size), landmarks[0].pos.y-landmarks[0].half);
        // bezier(landmarks[0].pos.x-(landmarks[0].size), landmarks[0].pos.y-landmarks[0].half, width*0.7, height*0.4, width*0.75, height*0.45, landmarks[0].pos.x+(landmarks[0].size), landmarks[0].pos.y);

        stroke(foregroundColor);
        beginShape();
            vertex(roadPoints[0].x, roadPoints[0].y);
            quadraticVertex(roadPoints[1].x, roadPoints[1].y, roadPoints[2].x, roadPoints[2].y);
            quadraticVertex(roadPoints[3].x, roadPoints[3].y, roadPoints[4].x, roadPoints[4].y);
            quadraticVertex(roadPoints[5].x, roadPoints[5].y, roadPoints[6].x, roadPoints[6].y);
        endShape();

        // for(var i=0;i<roadPoints.length;i++){
        //     ellipse(roadPoints[i].x, roadPoints[i].y, 10,10);
        // }
        // var x2 = bezierPoint(width*0.25, width*0.33, width*0.5, width, 0.27);
        // var y2 = bezierPoint(0, height, height, height*0.66, 0.27);
        // var x3 = bezierPoint(x1, width*0.7, width*0.3, landmarks[0].pos.x, 0.75);
        // var y3 = bezierPoint(y1, 0, height*0.8, landmarks[0].pos.y+landmarks[0].half, 0.75);

        // line(x2, y2, x3, y3);

    pop();

}

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
                if (contentContainerHidden){
                    landmarks[i].isCurrentContent = false;
                }
            }
        }
        for (var j in ensembles){
            if (ensembles[j].over && contentContainerHidden){
                ensembles[j].clicked();
                ensembles[j].isCurrentContent = true;
            } else {
                if (contentContainerHidden){
                    ensembles[j].isCurrentContent = false;
                }
            }
        }
        
        for (var k in secrets){
            if (secrets[k].over && contentContainerHidden){
                secrets[k].clicked();
            }
        }

        for (var l in concerts){
            if (concerts[l].over && contentContainerHidden){
                concerts[l].clicked();
                concerts[l].isCurrentContent = true;
            } else {
                if (contentContainerHidden){
                    concerts[l].isCurrentContent = false;
                }
            }
        }
    }

    // updateURL();
    
    
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
                // currentIcon.isCurrentContent = false;
                currentIcon = landmarks[i];
                landmarks[i].isCurrentContent = true;
            } else {
                if (!contentContainerHidden){
                    landmarks[i].isCurrentContent = false;
                }
            }
        }
        for (var j in ensembles){
            if (ensembles[j].over && contentContainerHidden){
                ensembles[j].clicked();
                ensembles[j].over = false;
                // currentIcon.isCurrentContent = false;
                ensembles[j].isCurrentContent = true;
            } else {
                if (!contentContainerHidden){
                    ensembles[j].isCurrentContent = false;
                }
            }
        }
        for (var k in secrets){
            if (secrets[k].over && contentContainerHidden){
                secrets[k].clicked();
                secrets[k].over = false;
                
            }
        }

        for (var l in concerts){
            if (concerts[l].over && contentContainerHidden){
                concerts[l].clicked();
                // currentIcon.isCurrentContent = false;
                concerts[l].isCurrentContent = true;
            } else {
                if (!contentContainerHidden){
                    concerts[l].isCurrentContent = false;
                }
            }
        }

        navHide();
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

    concertVectors = [
                        new p5.Vector(width*0.8, height*0.55), //Co-presence
                        new p5.Vector(width*0.4, height*0.15), //Mt Carmel
                        new p5.Vector(width*0.75, height*0.4), //Valérie Milot
                        new p5.Vector(width*0.15, height*0.6), //For the Birds
                        new p5.Vector(width*0.65, height*0.7), //Brian Manker
                        new p5.Vector(width*0.45, height*0.65), //Jordan Mowat
                        new p5.Vector(width*0.55, height*0.2), //Christmas
                        new p5.Vector(width*0.1, height*0.4), //Barbra Lica
                        new p5.Vector(width*0.7, height*0.25), //Fitzgeralds
    ];

    for (var i in landmarks){
        var landmarkSize = 0;
        if (landmarks[i].type == 'Barn'){
            landmarkSize = map(((width+height)/2), 500, 1200, 50, 70);
        } else {
            landmarkSize = map(((width+height)/2), 500, 1200, 30, 50);
        }
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

    for (var l in concerts){
        var concertSize = map(((width+height)/2), 500, 1200, 30, 50);
        concerts[l].pos = new p5.Vector(concertVectors[l].x, concertVectors[l].y);
        concerts[l].size = concertSize;
        concerts[l].half = concertSize*0.5;
        concerts[l].collide = concertSize*0.7;
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

    concertVectors = [
                        new p5.Vector(width*0.8, height*0.55), //Co-presence
                        new p5.Vector(width*0.4, height*0.15), //Mt Carmel
                        new p5.Vector(width*0.75, height*0.4), //Valérie Milot
                        new p5.Vector(width*0.15, height*0.6), //For the Birds
                        new p5.Vector(width*0.65, height*0.7), //Brian Manker
                        new p5.Vector(width*0.45, height*0.65), //Jordan Mowat
                        new p5.Vector(width*0.55, height*0.2), //Christmas
                        new p5.Vector(width*0.1, height*0.4), //Barbra Lica
                        new p5.Vector(width*0.7, height*0.25), //Fitzgeralds
                    ];

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
    if (key == 'b'){
        // makeParkingLot();
        // makePond();
        // makeTractor();

        currentLayer = (currentLayer + 1)%2;
        pcr2020Toggle = !pcr2020Toggle;
    }

}