let c, parentDiv;

let gWidth, gHeight, uiHeight;

let rocks = [];
let startPositions = [];
let rings = [];

let oscillators = [];
let envelopes = [];
let filters = []; 
let fenvelopes = [];
let reverb;
let fft;
let biggestSkip;

let attack, decay, sustain, release;
let fattack, fdecay, fsustain, frelease;
let voice, maxVoices;

let majorScale = [];
let minorScale = [];
let fifths = [];
let fourths = [];
let keyboard = [];
let semitones = [];
let transpose = 0;

let scales = [];
let types = [];
let roots = [];
let currentScale;

p5.disableFriendlyErrors = true; // disables FES

function setup(){

    c = createCanvas(windowWidth, windowHeight);
    parentDiv = document.getElementById("canv");
    c.parent();

    getAudioContext().suspend();

    voice = 0;
    maxVoices = 12;

    gHeight = height-50;
    gWidth = 9*(gHeight/16);
    uiHeight = gHeight/10;

    startPositions = [
        20,
        width-20
        // width/2-gWidth*0.5,
        // width/2+gWidth*0.5
    ]

    majorScale = [60, 62, 64, 65, 67, 69, 71, 
            72, 74, 76, 77, 79, 81, 83];
    minorScale = [60, 62, 63, 65, 67, 68, 70, 
        72, 74, 75, 77, 79, 80, 82];
    fourths = [60, 65, 70, 75, 80, 85, 90];
    fifths = [60, 67, 74, 81, 88];

    keyboard = [90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77, 188,
                81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73,
                57, 79, 48, 80, 219];
    semitones = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 72,
                73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
                86, 87, 88, 89, 90, 91];

    scales = [majorScale, minorScale, fourths, fifths, semitones];
    currentScale = 0;

    attack = 0.01;
    decay = 0.5;
    sustain = 0;
    release = 1;

    fattack = 0.01;
    fdecay = 0.2;
    fsustain = 0;
    frelease = 0.1;

    // filter = new p5.Filter();
    reverb = new p5.Reverb();
    reverb.drywet(1);
    reverb.amp(0.01);
    
    // filter.res(30);
    // filter.connect(reverb);

    for (i=0;i<maxVoices;i++){
        
        //make our envelopes
        envelopes[i] = new p5.Envelope();
        envelopes[i].setADSR(attack, decay, sustain, release);
        envelopes[i].setRange(0.2, 0);

        //make our amp oscillators
        oscillators[i] = new p5.Oscillator('sine');
        oscillators[i].amp(envelopes[i]);
        oscillators[i].start();

        // make filter envelopes
        fenvelopes[i] = new p5.Envelope();
        fenvelopes[i].setADSR(fattack, fdecay, fsustain, frelease);
        fenvelopes[i].setRange(600, 40);

        //make filters
        filters[i] = new p5.Filter();
        filters[i].res(30);
        filters[i].connect(reverb);
        filters[i].freq(fenvelopes[i]);


        oscillators[i].disconnect();
        oscillators[i].connect(filters[i]);

    }

    fft = new p5.FFT(1, 1024);
    biggestSkip = 0;
    transpose = -7;

    types = ['square', 'sawtooth', 'triangle', 'sine'];
    roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B','C'];

    frameRate(24);
}

function draw(){
    // console.log(frameRate());
    background(32, 123, 212);
    let gravity = new p5.Vector(0,9.8);

    for (i=0;i<rocks.length;i++){
        rocks[i].show();

        // let gravity = new p5.Vector(0, 0.1*rocks[i].mass);
        

        rocks[i].applyForce(gravity);
        rocks[i].physics();
        rocks[i].skip();
    }
    
    for (j=0;j<rings.length;j++){
        rings[j].show();
    }

    // GameFrame();
    // GameBorder();
    PondSurface();
    
}

function throwRock(note, _xPos){
    let thisRock = new Rock(note, _xPos);
    rocks.push(thisRock);
    console.log(rocks);

}


function PondSurface(){
    let waveform = fft.waveform();
    push();
        noFill();
        beginShape();
        stroke(255);
        for (let i = 0; i < waveform.length; i++){
            // let x = map(i, 0, waveform.length, width*0.5-gWidth*0.5, width*0.5+gWidth*0.5);
            let x = map(i, 0, waveform.length, 0, width);
            let y = map( waveform[i], -1, 1,  2*(height/3) - 2,  2*(height/3) + 2);
            vertex(x,y);
        }
        endShape();
    pop();

}


function GameBorder(){
    
    push(); 
        noFill();
        stroke(255);
        rectMode(CENTER);
        rect(width/2, height/2+37, gWidth, gHeight-75);
    pop();

    
}   

function GameFrame(){
    push();
        fill(50, 127, 75);
        noStroke();
        rectMode(CORNER);
        rect(0, 0, (width-gWidth)*0.5, height);
        rect(width*0.5 + gWidth*0.5, 0, (width-gWidth)*0.5,height);
        rect(0,0,width,100);
        rect(0,height-25,width, 25);
    pop();
}

function UI(){
    push();
        translate(width/2, gHeight-(uiHeight-35));
        fill(0);
        stroke(255);
        rectMode(CENTER);
        rect(0, 0, gWidth-50, uiHeight);
    pop();
}

function Ring(pos, max){
    this.pos = new p5.Vector(pos.x, pos.y);
    this.w = 0;
    this.h = 10;
    this.col = 255;
    this.max = max;
    this.weight = 1;

    this.show = function(){
        push();
            translate(this.pos.x, this.pos.y);
            noFill();
            strokeWeight(this.weight);
            stroke(this.col);
            ellipse(0, 0, this.w, this.w*0.2);
        pop();
        this.w+=1;
        this.col-=1;
        this.weight-=0.01;

        if (this.w > this.max){
            rings.splice(rings.indexOf(this), 1);
        }
    }
}


function Rock(note, _x){
    this.mass = random(5, 10);
    // this.mass = 5;
    this.surface = random(8*(height/9), 5*(height/6));
    this.pos = new p5.Vector(_x, height);
    this.velocity = new p5.Vector(random(-0.2,0.2),random(-20, -25));
    this.acceleration = new p5.Vector(0,0);
    this.size = this.mass;
    
    this.distanceFromSurface = this.pos.y - this.surface;
    this.skipped = false;
    this.sinkProb = map(this.mass, 5, 10, 0, 0.4);
    this.skips = 0;
    this.originalNote = note;
    this.midiNote = this.originalNote + int(transpose);
    this.pan = 0;
    this.res = random(0,10);

    this.show = function(){
        push();
            fill(255);
            noStroke();
            translate(this.pos.x, this.pos.y);
            ellipse(0,0, this.size);
        pop();
        this.size-=0.018;
    }

    this.applyForce = function(force){
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    this.physics = function(){
        
        // Velocity changes according to acceleration
        this.velocity.add(this.acceleration);
        
        // position changes by velocity
        this.pos.add(this.velocity);

        // clear acceleration each frame
        this.acceleration.mult(0);

    }

    this.skip = function(){

        // hit the surface!
        if (this.velocity.y > 0 && this.pos.y + this.size*0.5 > this.surface){
            //if this is the first skip, give it some height
            if (this.skips == 0){
                this.velocity.y = random(-3, -19);
            } else {
                this.velocity.y *= random(-0.2,-1.1);
            }
            if (abs(this.velocity.x) < 2){
                this.velocity.x *= random(1.1, 3);
            }
            this.pos.y = this.surface - this.size*0.5;
            this.sink();
            this.skipped = true;
            this.skips++;
            if (this.skips != 0){
                rings.push(new Ring(this.pos, map(this.skips, 0, 8, 60, 5) + random(-10, 20)));
            }
        
            this.playNote();
            
        }

        //if we're at the apex, update surface
        if (this.velocity.y > 0 && this.skipped){
            if (this.pos.y+this.size*0.5 != this.surface){
                this.surface -= (random(this.distanceFromSurface*0.5, this.distanceFromSurface*0.7));
                if (this.surface < 2.05*(height/3)){
                    this.surface = 2.05*(height/3);
                }
            }
            this.skipped = false;
        }

        //update distance
        this.distanceFromSurface = this.surface - this.pos.y
    }


    
    this.sink = function(){
        if (random() < this.sinkProb){
            if (this.skips > biggestSkip){
                biggestSkip = this.skips;
            }
            rings.push(new Ring(this.pos, random(70, 90)));
            this.res = 25;
            // this.midiNote = this.originalNote + int(transpose) - 24;
            this.midiNote -= 24;
            rocks.splice(rocks.indexOf(this),1);
            console.log(rocks);

            
        } else {
            this.sinkProb += 0.05;
        }
    }

    this.playNote = function(){
        console.log(this.midiNote);

        if (this.skips == 0){
            oscillators[voice].freq(midiToFreq(this.midiNote+12));
        } else {
            oscillators[voice].freq(midiToFreq(this.midiNote));
        }

        this.pan = map(this.pos.x, width*0.5-gWidth*0.5, width*0.5+gWidth*0.5, -1, 1);
        oscillators[voice].pan(this.pan);

        fenvelopes[voice].setRange(midiToFreq(this.midiNote)*3, midiToFreq(this.midiNote)*2);
        filters[voice].res(this.res);

        envelopes[voice].play();
        fenvelopes[voice].play();

        voice = (voice+1)%maxVoices;

        //pick a new note for the next skip
        // let interval = int(random(-2, 2));
        // let newNoteIndex = majorScale.indexOf(this.midiNote) + interval;
        // if (newNoteIndex >= 0){
        //     this.midiNote = majorScale[newNoteIndex];
        // } else {
        //     this.midiNote = majorScale[int(random(majorScale.length))];
        // }
    }
}

function controlsToggle(){
    let controls = select("#controls");
    let toggle = select("#toggle");

    if (controls.style('max-height') == "0px"){
        toggle.html("- controls");
        controls.style('max-height', '1000px');
      } else {
        toggle.html("+ controls");
        controls.style('max-height', '0px');
      }
}

function scaleSelector(scale){
    currentScale = scale.value;
}

function typeSelector(typeSelect){
    for(i=0;i<oscillators.length;i++){
        oscillators[i].setType(types[typeSelect.value]);
    }
}

function volumeSliderChange(){
    let slider = document.getElementById("volume");
    let sliderVol = slider.value;
    let vol = map(sliderVol, 0, 100, 0.01, 1);
    for (i=0;i<envelopes.length;i++){
        envelopes[i].setRange(vol, 0);
    }
}

function transposeSliderChange(){
    let transposeSlider = document.getElementById("transpose");
    transpose = transposeSlider.value;
    console.log(transpose);

    let root = document.getElementById("root");
    root.innerHTML = roots[12+int(transpose)];

}
    

function mousePressed(){
   if(touches[0] == null){
        userStartAudio();
        let rockPos;
        let rockNote;

        // if (mouseX > width/2 - gWidth/2 && mouseX < width/2 + gWidth/2){
            rockPos = mouseX;
            rockNote = constrain(int(map(mouseX, startPositions[0], startPositions[1], 0, scales[currentScale].length)), 0, scales[currentScale].length-1);
            
        // } else {
        //     rockPos = random(startPositions[0], startPositions[1]);
        //     rockNote = int(random(scales[currentScale].length));
        // }

        throwRock(scales[currentScale][rockNote], rockPos);
    }
}

function touchStarted(){
    userStartAudio();
    let rockPos;

    if (touches[0].x > width/2 - gWidth/2 && touches[0].x < width/2 + gWidth/2){
        rockPos = touches[0].x;
    } else {
        rockPos = random(startPositions[0], startPositions[1]);
    }

    throwRock(scales[currentScale][int(random(scales[currentScale].length))], rockPos);
}

function keyPressed(){
    userStartAudio();
    if (keyCode == 32){
        
        throwRock(scales[currentScale][int(random(scales[currentScale].length))], random(startPositions[0], startPositions[1]));

    }

    else {
        if (keyboard.indexOf(keyCode) != -1){
            throwRock(semitones[keyboard.indexOf(keyCode)], random(startPositions[0], startPositions[1]));
        }
    }


}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    gHeight = height-50;
    gWidth = 9*(gHeight/16);
    uiHeight = gHeight/10;

    startPositions = [
        width/2-gWidth*0.33,
        width/2+gWidth*0.33
    ]
}