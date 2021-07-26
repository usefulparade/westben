let tables = [];
let songs = [];
let texts = [];
let tableContainers = [];

function preload(){
    for (let i=0;i<12;i++){
        songs[i] = loadSound("/ensembles/2021/media/basil/songs/" + i + ".mp3");
    }
}

function setup(){
    noCanvas();
    
    tables = document.getElementsByClassName("basilTable");
    texts = document.getElementsByClassName("basilText");
    tableContainers = document.getElementsByClassName("basilTablesContainer");

    for (let i =0;i<tableContainers.length;i++){
        tableContainers[i].style.display = "inline-block";
    }

    for (let j=0;j<songs.length;j++){
        if (j == 0 || j == 3 || j == 9 || j == 11){
            songs[j].setLoop(true);
        } else {
            songs[j].setLoop(false);
            songs[j].onended(tableEnd);
        }
    }

}

function tableClick(tableImg){

    var ind;
   
    for (var i=0;i<tables.length;i++){
        if (i == int(tableImg.id)){
            ind = i;
        };
    }

    if (!songs[ind].isPlaying()){
        songs[ind].play(songs[ind].duration-1);
        tableImg.style.filter = "saturate(100%)";
        texts[ind].style.display = "inline-block"
        
    } else {
        songs[ind].pause();
        tableImg.style.filter = "saturate(0%)";
        texts[ind].style.display = "none"
       
    }
    
}

function tableEnd(){
    var ind;
    var time = this.currentTime();
    var duration = this.duration();
    ind = songs.indexOf(this);
    if (time > duration - 5){
        console.log("non-looping table " + ind + " has ended, turning off table " + ind + ".");
        // songs[ind].stop();
        tables[ind].style.filter = "saturate(0%)";
        texts[ind].style.display = "none";
    }
}

function keyPressed(){ // useful for testing the onend() callback!
    // if (key == 'a'){
    //     for (var i = 0;i < songs.length; i++){
    //         if (songs[i].isPlaying()){
    //             var len = songs[i].duration();
    //             songs[i].jump(len-10);
    //         }
    //     }
    // }
}