let tables = [];
let songs = [];
let texts = [];

function preload(){
    for (let i=0;i<12;i++){
        songs[i] = loadSound("/ensembles/2021/media/basil/songs/" + i + ".mp3");
    }
}

function setup(){
    noCanvas();
    
    tables = document.getElementsByClassName("basilTable");
    texts = document.getElementsByClassName("basilText");
    console.log(tables);
}

function tableClick(tableImg){
    var ind;

    for (var i=0;i<tables.length;i++){
        if (tables[i] = tableImg){
            ind = i;
            break;
        };
    }
    tableImg.style.filter = "saturate(100%)";
    console.log("clicked on table " + ind);
    
}



