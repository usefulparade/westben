let c, cparent;

let corpsebg, atlantisbg;
let bgSize;

let corpseImages = [];
let atlantisImages = [];
let lastImages = [];

let corpseSounds = [];
let atlantisSounds = [];
let lastSounds = [];

let corpseFlowers = [];
let atlantisFlowers = [];
let lastFlowers = [];

let allFlowers = [];

let activeScene;

let cursorPos;

let corpseVectors;
let atlantisVectors;

let rateSlider;
let sceneButtons;


function preload(){
    for (var i=0;i<3;i++){
        corpseImages[i] = loadImage("/ensembles/2021/media/kelp/img/corpse/" + i + ".png");
        corpseSounds[i] = loadSound("/ensembles/2021/media/kelp/mp3/corpse/" + i + ".mp3");
    }

    for (var i=0;i<4;i++){
        atlantisImages[i] = loadImage("/ensembles/2021/media/kelp/img/atlantis/" + i + ".png");
        atlantisSounds[i] = loadSound("/ensembles/2021/media/kelp/mp3/atlantis/" + i + ".mp3");
    }

    corpsebg = loadImage("/ensembles/2021/media/kelp/img/corpse/bg1.png");
    atlantisbg = loadImage("/ensembles/2021/media/kelp/img/atlantis/bg2.png");
    cursorPos = new p5.Vector(0,0);
}   

function setup(){
    if (windowWidth > 800){
        c = createCanvas(800, 640);
    } else {
        c = createCanvas(windowWidth, windowWidth*0.8);
    }
    cparent = document.getElementById('kelpCanvas');
    c.parent(cparent);

    activeScene = 0;

    corpseVectors = [
        createVector(width*0.45, height*0.4), //corpse reina 1
        createVector(width*0.55, height*0.45), //corpse shanika 1
        createVector(width*0.5, height*0.5), //corpse andres 1
    ];

    atlantisVectors = [
        createVector(width*0.25, height*0.2), //atlantis andres 1
        createVector(width*0.4, height*0.54), //antlantis shanika 1
        createVector(width*0.53, height*0.32), //atlantis alex 1
        createVector(width*0.85, height*0.6), //atlantis andres 2
    ];

    for (var i=0;i<corpseImages.length;i++){
        corpseFlowers[i] = new Flower(corpseVectors[i], corpseImages[i], corpseSounds[i]);
        corpseFlowers[i].scene = 0;

        corpseFlowers[i].vol = corpseFlowers[i].findVol();
        corpseFlowers[i].pan = corpseFlowers[i].findPan();
        corpseFlowers[i].sound.setVolume(corpseFlowers[i].vol);
        corpseFlowers[i].sound.pan(corpseFlowers[i].pan);

        if (activeScene == corpseFlowers[i].scene){
            corpseFlowers[i].sound.loop();
        }
        
    }
    for (var i=0;i<atlantisImages.length;i++){
        atlantisFlowers[i] = new Flower(atlantisVectors[i], atlantisImages[i], atlantisSounds[i]);
        atlantisFlowers[i].scene = 1;

        atlantisFlowers[i].vol = atlantisFlowers[i].findVol();
        atlantisFlowers[i].pan = atlantisFlowers[i].findPan();
        atlantisFlowers[i].sound.setVolume(atlantisFlowers[i].vol);
        atlantisFlowers[i].sound.pan(atlantisFlowers[i].pan);

        if (activeScene == atlantisFlowers[i].scene){
            atlantisFlowers[i].sound.loop();
        }
    }

    allFlowers = [corpseFlowers, atlantisFlowers];

    rateSlider = document.getElementById('rateSlider');
    rateSlider.oninput = changeRate;

    sceneButtons = document.getElementsByClassName('sceneSwitch');

    for (var j = 0; j < sceneButtons.length; j++){
        sceneButtons[j].onclick = function(){
            activeScene = int(this.id);
        }
    }

    var kelpUI = document.getElementById('kelpUI');
    kelpUI.style.display = "inline-block";
}

function draw(){
    background(0);
    imageMode(CENTER);

    if (activeScene == 0){
        image(corpsebg, width*0.5, width*0.3, bgSize, bgSize*0.6);
        for (var i=0;i<corpseFlowers.length;i++){
            corpseFlowers[i].show();
        }
    } else if (activeScene == 1){
        image(atlantisbg, width*0.5, width*0.3, bgSize, bgSize*0.6);
        for (var i=0;i<atlantisFlowers.length;i++){
            atlantisFlowers[i].show();
        }
    }

    cursorPos = new p5.Vector(mouseX, mouseY);
    if (touches[0] != null){
        cursorPos = new p5.Vector(touches[0].x, touches[0].y);
    }
    
}

function windowResized(){
    if (windowWidth > 800){
        resizeCanvas(800, 640);
    } else {
        resizeCanvas(windowWidth, windowWidth*0.8);
    }

    for (var i = 0; i < corpseFlowers.length;i++){
        if (windowWidth > 800){
            corpseFlowers[i].size = 140;
        } else {
            corpseFlowers[i].size = constrain(map(windowWidth, 300, 800, 70, 120), 70, 120);
            corpseFlowers[i].pos = new p5.Vector(corpseFlowers[i].posRel.x * width, corpseFlowers[i].posRel.y * height);
        }
        
    }

    

    bgSize = width;
}

function Flower(pos, img, sound){
    this.pos = pos;
    this.posRel = createVector(this.pos.x / width, this.pos.y / height);
    this.img = img;
    this.sound = sound;
    this.size = constrain(map(windowWidth, 300, 800, 70, 120), 70, 120);
    this.offset = new p5.Vector(0,0);
    this.selected = false;
    this.pan = 0
    this.vol = 0
    this.rate = 1;
    this.rateVal = 750;
    this.scene = 0;

    this.show = function(){

        push();
            translate(this.pos.x, this.pos.y);
            if (this.overCheck() || this.selected){
                rotate(radians(5));
            }
            shearX(radians((this.rate-1)*-10));
            image(this.img, 0, 0, this.size, this.size);
        pop();

        if (this.overCheck() && !this.selected){
            this.offset = p5.Vector.sub(this.pos, cursorPos);
        }

        this.move();

    }

    this.move = function(){
        if (this.selected){
            this.pos = p5.Vector.add(cursorPos, this.offset);
            this.pan = this.findPan();
            this.vol = this.findVol();
            this.sound.setVolume(this.vol);
            this.sound.pan(this.pan);
            this.posRel = createVector(this.pos.x / width, this.pos.y / height);
        }
    }

    this.overCheck = function(){
        // for (var i=0;i<allFlowers[activeScene].length;i++){
        //     if (allFlowers[activeScene][i].selected){
        //         if (allFlowers[activeScene].indexOf(this) != i && allFlowers[activeScene].indexOf(this) != null){
        //             return false;
        //             break;
        //         }
        //     }
        // }

        var distance = this.pos.dist(cursorPos);
        if (distance < this.size*0.5){
            return true;
        } else {
            return false;
        }
    }

    this.findVol = function(){
        if (this.pos.y < 0 || this.pos.y > width*0.6){
            return 0;
        } else if (this.pos.y <= width*0.3){
            return map(this.pos.y, 0, width*0.3, 0, 1);
        } else {
            return map(this.pos.y, width*0.3, width*0.6, 1, 0);
        }
    }

    this.findPan = function(){
        return map(this.pos.x, 0, width, -1, 1);
    }
}

function mousePressed(){

        for (i=0;i<allFlowers[activeScene].length;i++){
            if (allFlowers[activeScene][i].overCheck()){
                allFlowers[activeScene][i].selected = true;
                rateSlider.value = allFlowers[activeScene][i].rateVal;

                allFlowers[activeScene].sort((a,b) => a.selected);
                break;
            }
        }
}

function mouseReleased(){
    for(i=0;i<allFlowers[activeScene].length;i++){
        allFlowers[activeScene][i].selected = false;
    }
}

function changeRate(){
    var newRate;

    if (rateSlider.value < 750){
        newRate = map(rateSlider.value, 0, 750, -2, 1);
    } else {
        newRate = map(rateSlider.value, 750, 1000, 1, 2);
    }


    if (newRate > 0.05 || newRate < -0.05){
        allFlowers[activeScene][allFlowers[activeScene].length-1].sound.rate(newRate);
        allFlowers[activeScene][allFlowers[activeScene].length-1].rate = newRate;
        allFlowers[activeScene][allFlowers[activeScene].length-1].rateVal = rateSlider.value;
    }
}

function changeScene(_newScene){

    for (var i = 0; i < allFlowers[activeScene].length;i++){
        allFlowers[activeScene][i].sound.pause();
    }
    if (_newScene == null){
        activeScene = (activeScene + 1) % 2;
    } else {
        activeScene = _newScene;
    }
    for (var i = 0; i < allFlowers[activeScene].length;i++){
        allFlowers[activeScene][i].sound.loop();
    }
    rateSlider.value = allFlowers[activeScene][allFlowers[activeScene].length-1].rateVal;
}

function keyTyped(){
    if (key == "a"){
        changeScene();
    }
}