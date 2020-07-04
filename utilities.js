var contentContainerHidden;
var content;

// ☼ ☽

function contentToggle(){
    if (contentContainerHidden){
        contentExpand();
    } else {
        contentContract();
    }
}

function contentExpand(){
    var size = landmarks[0].size;
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(-180deg)');
    if (windowWidth < 720){
        content.style = 'height: calc(100% - 70px)';
    } else {
        content.style = 'height: calc(100% - 70px)';
    }
    document.getElementById('aboveContent').style = 'height: 70px';
    currentIcon.isCurrentContent = true;
    setTimeout(function(){contentContainerHidden = false;}, 400);
    resizeIframe();
    matchTheme();
}

function contentContract(){
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(0deg)');
    setTimeout(function(){contentContainerHidden = true;}, 400);
    // currentIcon.isCurrentContent = false;
    document.getElementById('aboveContent').style = 'height: 0px';
    content.style = 'height: 10%';
}

function contentContractFromInside(){
    var parentIcon = window.parent.document.getElementById('contentIcon');
    var parentContent = window.parent.document.getElementById('contentContainer');
    parentIcon.style.setProperty('transform', 'rotate(0deg)');
    parentContent.style = 'height: 10%';
    window.parent.document.getElementById('aboveContent').style = 'height: 0px';
    window.parent.currentIcon.isCurrentIcon = false;
    window.parent.contentContainerHidden = true;
    
    
}

function resizeIframe(){
    var iframe = document.getElementById('content');
    if (iframe.contentDocument != null){
        // iframe.height = iframe.contentDocument.documentElement.window.scrollHeight;
        // console.log(iframe.contentDocument);
    }
}

function themeToggle(){
    if (theme == 'night'){
        dayTheme();
    } else {
        nightTheme();
    }

    matchTheme();
}

function paletteToggle(){
    colorPalette = (colorPalette+1)%4;
    document.getElementById('paletteIcon').innerHTML = paletteIcons[colorPalette];

    matchTheme();
}

function nightTheme(){
    var iframe = document.getElementById('content');
    if (iframe.contentDocument != null){
        iframe.contentDocument.documentElement.style.setProperty('--fg-color', lightHexColors[colorPalette]);
        iframe.contentDocument.documentElement.style.setProperty('--bg-color', darkHexColors[colorPalette]);
    }
    document.documentElement.style.setProperty('--bg-color', darkHexColors[colorPalette]);
    document.documentElement.style.setProperty('--bg-color-transparent', darkHexColors[colorPalette] + 'f3');
    document.documentElement.style.setProperty('--fg-color', lightHexColors[colorPalette]);

    document.getElementById('themeIcon').innerHTML = '☽';
    foregroundColor = lightColors[colorPalette];
    backgroundColor = darkColors[colorPalette];
    theme = 'night';
}

function dayTheme(){
    var iframe = document.getElementById('content');
    if (iframe.contentDocument != null){
        iframe.contentDocument.documentElement.style.setProperty('--fg-color', darkHexColors[colorPalette]);
        iframe.contentDocument.documentElement.style.setProperty('--bg-color', lightHexColors[colorPalette]);
    }
    document.documentElement.style.setProperty('--bg-color', lightHexColors[colorPalette]);
    document.documentElement.style.setProperty('--bg-color-transparent', lightHexColors[colorPalette] + 'f3');
    document.documentElement.style.setProperty('--fg-color', darkHexColors[colorPalette]);

    document.getElementById('themeIcon').innerHTML = '☼';
    foregroundColor = darkColors[colorPalette];
    backgroundColor = lightColors[colorPalette];
    theme = 'day';
}

function loadNewIframeContent(_link){
    
    window.frames[0].location = _link;
    // console.log('changing iframe');
    // matchTheme();

}

function matchTheme(){
    if (theme == 'day'){
        dayTheme();
    } else {
        nightTheme();
    }
}

function matchThemeInner(){
    if (window.parent.theme == 'day'){
        document.documentElement.style.setProperty('--bg-color', window.parent.darkHexColors[window.parent.colorPalette]);
        document.documentElement.style.setProperty('--fg-color', window.parent.lightHexColors[window.parent.colorPalette]);
    } else {
        document.documentElement.style.setProperty('--bg-color', window.parent.lightHexColors[window.parent.colorPalette]);
        document.documentElement.style.setProperty('--fg-color', window.parent.darkHexColors[window.parent.colorPalette]);
    }
}

function changeCurrentIcon(type, num){
    console.log('hi!');
    window.parent.currentIcon.isCurrentContent = false;
    if (type == 'ensemble'){
        window.parent.currentIcon = window.parent.ensembles[num];
        window.parent.ensembles[num].isCurrentContent = true;
    } else if (type == 'landmark'){
        window.parent.currentIcon = window.parent.landmarks[num];
        window.parent.landmarks[num].isCurrentContent = true;
    }
}




/// PINK GROUP UTILITIES

var lv2;

function responseLv1Toggle(){
    var lv2Buttons = document.getElementsByClassName('lv2Button');
    
        if (lv2 == null || lv2 == false){
            for (var i in lv2Buttons){
                lv2Buttons[i].style = 'height: 100px; width: 100px';
            }
            // document.getElementById('lv2').style = 'max-height: auto';
            lv2 = true;
        } else {
            for (var i in lv2Buttons){
                lv2Buttons[i].style = 'height: 0px; width: 0px';
            }
            // document.getElementById('lv2').style = 'max-height: 300px';
            lv2 = false;
        }
}

function responseLv2Toggle(_type){
    var mainContent = [];
    var hope = document.getElementById('hopeContent');
    var guilt = document.getElementById('guiltContent');
    var changes = document.getElementById('changesContent');
    var realization = document.getElementById('realizationContent');
    var unrest = document.getElementById('unrestContent');
    var exploration = document.getElementById('explorationContent');

    mainContent.push(hope, guilt, changes, realization, unrest, exploration);
    
    for (var i in mainContent){
        mainContent[i].style = 'display: none';
    }

    mainContent[_type].style = 'display: block';
    var responses;
    if (_type == 0){
        responses = document.getElementsByClassName('hopeResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    } else if (_type == 1){
        responses = document.getElementsByClassName('guiltResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    } else if (_type == 2){
        responses = document.getElementsByClassName('changesResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    } else if (_type == 3){
        responses = document.getElementsByClassName('realizationResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    } else if (_type == 4){
        responses = document.getElementsByClassName('unrestResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    } else if (_type == 5){
        responses = document.getElementsByClassName('explorationResponseButton');
        for (var j in responses){
            responses[j].style = 'width: 30px; height: 30px;';
        }
    }


}

var coordinates = [];

function appendImage(_type, _img){
    var coordinateContent = document.getElementsByClassName('coordinate');
    coordinateContent[_type].appendChild(_img);
}


function coordinateToggle(_type){
    var coordinateContent = document.getElementsByClassName('coordinate');
    // if (coordinates[_type] == null){
    //     if (_type == 0){
    //         // console.log('hello!');
    //         for (i=1;i<4;i++){
    //             var img = new Image();
    //             img.src = "img/chirr/spencer/spen-0" + i + ".jpeg";
    //             // img.setAttribute('loading', 'lazy');
    //             img.onload = appendImage(_type, img);
    //         }
    //     } else if (_type == 1){
    //         for (i=1;i<9;i++){
    //             var img = new Image();
    //             img.src = "../img/chirr/ap/ap-0" + i + ".jpg";
    //             // img.setAttribute('loading', 'lazy');
    //             img.onload = appendImage(_type, img);
    //         }
    //     } else if (_type == 2){
    //         for (i=1;i<11;i++){
    //             var img = new Image();
    //             if (i<10){
    //                 img.src = "../img/chirr/glen/glen-0" + i + ".jpg";
    //             } else {
    //                 img.src = "../img/chirr/glen/glen-" + i + ".jpg";
    //             }
    //             // img.setAttribute('loading', 'lazy');
    //             img.onload = appendImage(_type, img);
    //         }
    //     } else if (_type == 3){
    //         for (i=5;i<9;i++){
    //             var img = new Image();
    //             img.src = "../img/chirr/gordon/gordon-0" + i + ".jpg";
    //             // img.setAttribute('loading', 'lazy');
    //             img.onload = appendImage(_type, img);
    //         }
    //     } else if (_type == 4){
    //         for (i=1;i<5;i++){
    //             var img = new Image();
    //             img.src = "../img/chirr/gordon/gordon-0" + i + ".jpg";
    //             // img.setAttribute('loading', 'lazy');
    //             img.onload = appendImage(_type, img);
    //         }
    //     }
    // }


    if (coordinates[_type] == null || coordinates[_type] == false){
        coordinateContent[_type].style = 'height: auto;';
        
        coordinates[_type] = true;
    } else {
        coordinateContent[_type].style = 'height: 0px;';
        coordinates[_type] = false;
    }

    

}