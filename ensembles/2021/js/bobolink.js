
let outputVals = document.getElementsByClassName('bobolinkOutputVal');
let sliders = document.getElementsByClassName('bobolinkSlider');
let tracks = [];

function preload(){
    for (let i = 0;i<20;i++){
        tracks[i] = loadSound('/ensembles/2021/media/bobolink/loop' + i + '.mp3');
    }
}

function setup(){
    noCanvas();
    for (let i = 0;i<20;i++){
        tracks[i].setVolume(0);
        tracks[i].loop();
    }
    var bobolinkTable = document.getElementsByClassName("bobolinkTable");
    bobolinkTable[0].style.display = "block";

    var offButton = document.getElementById("offButton");
    offButton.style.display = "block";
}

function slidersInit(){
   
    console.log("initialized " + sliders.length + " sliders!");

    for(let i = 0;i<sliders.length;i++){
        sliders[i].oninput = function(){
            outputVals[i].innerHTML = sliders[i].value;
            tracks[i].setVolume(map(sliders[i].value, 0, 100, 0, 1));
        }
    }
}

function bobolinkAllOff(){
    for(let i = 0;i<sliders.length;i++){
        sliders[i].value = 0;
        outputVals[i].innerHTML = 0;
        tracks[i].setVolume(0);
    }
}