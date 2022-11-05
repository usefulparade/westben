track = new Array();
silent = new Audio('sound/silent.mp3','sound/silent.ogg');
	if (silent.canPlayType('audio/mpeg;')) {
		silent.type= 'audio/mpeg';                     
		silent.src= 'sound/silent.mp3';
	} else {
		silent.type= 'audio/ogg';
		silent.src= 'sound/silent.ogg';
	}
playing=0;

$(document).ready(function(){
	$('.tile').on("mouseover", function() {
		if (playing==0) { 
			playAudio();
		}
	})
	$('.tile').on("click", function(e) {
		e.preventDefault();
		
		$(this).find("div").toggleClass('tileOff');
		$(this).find("div").toggleClass('tileOn');
		
		$('#text-box').find('.textOn').addClass('textOff');
		$('#text-box').find('.textOn').removeClass('textOn');
		
		$('#text-box').find('#'+$(this).find('.tileOn').attr('id')).toggleClass('textOff');
		$('#text-box').find('#'+$(this).find('.tileOn').attr('id')).toggleClass('textOn');
		
		if (playing==0) { 
			playAudio();
		}
		
		if ($(this).find("div").attr('class')=='tileOff') {
			track[$(this).find('.tileOff').attr('id')].pause();
		} else {
			track[$(this).find('.tileOn').attr('id')].currentTime = silent.currentTime;
			track[$(this).find('.tileOn').attr('id')].play();
		}

	})
	
	$('#info').on("click", function(e) {
		e.preventDefault();
		
		if ($('#text-box').find('#credits').attr('class')=='textBlock textOn') tOn=1;
		else tOn=0;
		
		$('#text-box').find('.textOn').addClass('textOff');
		$('#text-box').find('.textOn').removeClass('textOn');
		
		if (tOn==0) {
			$('#text-box').find('#credits').toggleClass('textOff');
			$('#text-box').find('#credits').toggleClass('textOn');
		}
	})
	
	num = document.getElementsByClassName('tile').length;
	for (i=0; i<num; i++) {
		track[i] = new Audio('sound/'+i+'.mp3', 'sound/'+i+'.ogg');
		if (track[i].canPlayType('audio/mpeg;')) {
			track[i].type= 'audio/mpeg';
			track[i].src= 'sound/'+i+'.mp3';
		} else {
			track[i].type= 'audio/ogg';
			track[i].src= 'sound/'+i+'.ogg';
		}
	}
	          
	silent.addEventListener('timeupdate',function (){
		if(silent.currentTime==silent.duration) {
			for (i=0; i<num; i++) {
				track[i].currentTime = 0;
			}
			silent.play();
		}
	})
})

function makeTile(num,img) {
	document.write('<a href="#" class="tile"><div class="tileOff" style="background-color:#555555" id="'+num+'"><div class="coverImg"><img src="image/cover/sampleCover2_'+num+'.jpg"></div><img class="tileImg" src="image/'+img+'"></div></a>');
};

function makeText(num, text) {
	document.write('<div class="textBlock textOff" id="'+num+'">'+text+'</div>');
};

function playAudio() {
	num = document.getElementsByClassName('tile').length;
	for (i=0; i<num; i++) {
		track[i].play();
		track[i].pause();
	}
	silent.play();
	playing=1;
}
