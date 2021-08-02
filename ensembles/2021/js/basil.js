let tables = [];
let songs = [];
let texts = [];
let tableContainers = [];
let lastLoaded = [];
let loadingText;

function preload(){
    // for (let i=0;i<12;i++){
    //     songs[i] = loadSound("/ensembles/2021/media/basil/songs/" + i + ".mp3");
    // }
    songs[0] = loadSound("/ensembles/2021/media/basil/songs/0.mp3");
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

    loadingText = document.getElementById('song_loading');

}

function tableClick(tableImg){
    var ind;

    for (var i=0;i<tables.length;i++){
        if (i == int(tableImg.id)){
            ind = i;
        };
    }

    if (songs[ind] == null){
        songs[ind] = loadSound("/ensembles/2021/media/basil/songs/" + ind + ".mp3", songLoaded, songFailed, songProgress);
        lastLoaded.push(ind);
        loadingText.style.display = "inline-block";
    
    } else {

        if (!songs[ind].isPlaying()){
            songs[ind].play();
            tableImg.style.filter = "saturate(100%)";
            texts[ind].style.display = "inline-block"
            
        } else {
            songs[ind].pause();
            tableImg.style.filter = "saturate(0%)";
            texts[ind].style.display = "none"
        
        }
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

function songLoaded(){
    lastLoaded.sort(function(a,b){
        if (!songs[a].isLoaded()){
            return 1;
        } else {
            return -1;
        }
    });

    let _ind = lastLoaded[0];

    if (_ind == 0 || _ind == 3 || _ind == 9 || _ind == 11){
        songs[_ind].setLoop(true);
    } else {
        songs[_ind].setLoop(false);
        songs[_ind].onended(tableEnd);
    }

    if (!songs[_ind].isPlaying()){
        songs[_ind].play();
        tables[_ind].style.filter = "saturate(100%)";
        texts[_ind].style.display = "inline-block"
        
    } else {
        songs[_ind].pause();
        tables[_ind].style.filter = "saturate(0%)";
        texts[_ind].style.display = "none"
    
    }

    lastLoaded.shift();

    if (lastLoaded[0] == null){
        loadingText.style.display = "none";
    }

}

function songFailed(){

}

function songProgress(){
    
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