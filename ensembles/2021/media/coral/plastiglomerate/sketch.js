let numColumns = 3;
let numRows = 3;
let cellWidth;
let cellHeight;

let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;
let sound9;
let img4;
let img2
let img3;
let img1;
let img5;
let img6;

function preload() {
    sound6 = loadSound('mp3-finalvocalizations1.mp3');
    sound2 = loadSound('mp3-finalvocalizations2.mp3');
    sound9 = loadSound('mp3-finalvocalizations3.mp3');
    sound7 = loadSound('Banjoguitar_Blenderator1.mp3');
  sound3 = loadSound('Zuerst_Blenderaqtor.mp3');
  sound8= loadSound('Zuerst_Blenderaqtor1(1).mp3');
  sound5 = loadSound('Plastiglomerate-Burnt-Under-The-Sea.mp3');
  sound4 = loadSound('Plastiglomerate-Of-The-Earth-Lo-Res.mp3');
  sound1 = loadSound('Plastiglomerate-Time-Sediment-One-Excerpt-LoRes.mp3')
 img2 = loadImage('4.png');
 img4 = loadImage('5.png');
 img3 = loadImage('Brush-Reef-A.png');
 img1 = loadImage('Tubipora-4.png');
 img5 = loadImage('10.png');
 img6 = loadImage('Tubipora-noback.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
 
  rectMode(CENTER);
  
  cellWidth = width/numColumns;
  cellHeight = height/numRows;
  
  
  for (let i = 0; i < numColumns; i++) {
    //nested for loop, use next letter so "j"
    for (let j = 0; j < numRows; j++) {
      
    let x = i * cellWidth + cellWidth/2; //instead of x += cellWidth at the end
    let y =j * cellHeight + cellHeight/2;//instead of y +- cellHeight
    
      //fill(250);
    //rect (x, y, cellWidth, cellHeight);
      
    //ellipse (x, y, cellWidth, cellHeight);

    textSize(60);
    text('click me', width*0.15, height*0.2);
    fill(250, 250, 250);
    }
    
  }
  
}

function mouseClicked() {
  background(250);
  image(img6, height*-0.5,width*-0.5);
  image(img5, 0, 0);
  image(img1, 0,0);
  image(img2, width/2,0);
  image(img3, 0, height/2);
  image(img4, width/2,height/2); 
}

 function mousePressed() {
  if (mouseX < cellWidth && mouseY < cellHeight) {
    sound1.play();
  } else if (mouseX < cellWidth && mouseY > cellHeight && mouseY < cellHeight*2) {
    sound2.play();
  }
   else if (mouseX > cellWidth && mouseX < cellWidth*2 && mouseY < cellHeight) {
     sound3.play();
   }
   else if (mouseX > cellWidth && mouseX < cellWidth*2 && mouseY > cellHeight && mouseY < cellHeight*2) {
     sound4.play();
   }
   else if (mouseX > cellWidth*2 && mouseX < cellWidth*3 && mouseY < cellHeight) {
     sound5.play();
   }
   else if (mouseX > cellWidth*2 && mouseX < cellWidth*3 && mouseY > cellHeight && mouseY < cellHeight*2){
     sound6.play();
   }
   else if (mouseX < cellWidth && mouseY > cellHeight*2 && mouseY < cellHeight*3 ) {
     sound7.play();
   }
   else if (mouseX > cellWidth && mouseX < cellWidth*2 && mouseY > cellHeight*2 && mouseY < cellHeight*3) {
     sound8.play();
   }
   else if (mouseX > cellWidth*2 && mouseX < cellWidth*3 && mouseY > cellHeight*2 && mouseY < cellHeight*3) {
     sound9.play();
   }
 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
 
  rectMode(CENTER);
  
  cellWidth = width/numColumns;
  cellHeight = height/numRows;
  
  
  for (let i = 0; i < numColumns; i++) {
    //nested for loop, use next letter so "j"
    for (let j = 0; j < numRows; j++) {
      
    let x = i * cellWidth + cellWidth/2; //instead of x += cellWidth at the end
    let y =j * cellHeight + cellHeight/2;//instead of y +- cellHeight
    
      //fill(250);
    //rect (x, y, cellWidth, cellHeight);
      
    //ellipse (x, y, cellWidth, cellHeight);

    textSize(60);
    text('click me', width*0.15, height*0.2);
    fill(250, 250, 250);
    }
    
  }
}
