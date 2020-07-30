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
    programLayerMatch();
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
        document.getElementById('themeCaption').innerHTML = 'Day';
    } else {
        nightTheme();
        document.getElementById('themeCaption').innerHTML = 'Night';
    }

    matchTheme();
}

function paletteToggle(){
    colorPalette = (colorPalette+1)%4;
    document.getElementById('paletteIcon').innerHTML = paletteIcons[colorPalette];
    if (colorPalette == 0){
        document.getElementById('paletteCaption').innerHTML = 'Palette A';
    } else if (colorPalette == 1){
        document.getElementById('paletteCaption').innerHTML = 'Palette B';
    } else if (colorPalette == 2){
        document.getElementById('paletteCaption').innerHTML = 'Palette C';
    } else if (colorPalette == 3){
        document.getElementById('paletteCaption').innerHTML = 'Palette D';
    }
    matchTheme();
}

function layerToggleFromInside(_x){

    window.parent.currentLayer = _x;
    if (_x == 0){
        window.parent.pcr2020Toggle = true;
    } else {
        window.parent.pcr2020Toggle = false;
    }
    // document.getElementById('layerIcon').innerHTML = '❏';
    // document.getElementById('layerCaption').innerHTML = 'Layer: 2020 PCR';
}

function programLayerMatch(){
    var iframe = document.getElementById('content');

    if (iframe.contentDocument.getElementById('layerSpecific') != null){
        console.log('hi');
        if (currentLayer == 0){
            iframe.contentDocument.getElementById('concerts2020').style.setProperty('display', 'inline-block');
            iframe.contentDocument.getElementById('pcr2020').style.setProperty('display', 'none');
        } else if (currentLayer == 1){
            iframe.contentDocument.getElementById('concerts2020').style.setProperty('display', 'none');
            iframe.contentDocument.getElementById('pcr2020').style.setProperty('display', 'inline-block');
        }
    }
}

function layerToggle(){
    pcr2020Toggle = !pcr2020Toggle;

    currentLayer = (currentLayer+1)%2;

    if (currentLayer == 1){
        document.getElementById('layerIcon').innerHTML = '❏';
        document.getElementById('layerCaption').innerHTML = 'Layer: 2020 PCR';
    } else if (currentLayer == 0) {
        document.getElementById('layerIcon').innerHTML = '❐';
        document.getElementById('layerCaption').innerHTML = 'Layer: 2020 Digital Concerts';
    }
}

function layerHover(_inOut){

    if (_inOut == 1){
        document.getElementById('layerCaption').style.setProperty('display', 'block');
    } else {
        document.getElementById('layerCaption').style.setProperty('display', 'none');
    }
}

function paletteHover(_inOut){

    if (_inOut == 1){
        document.getElementById('paletteCaption').style.setProperty('display', 'block');
    } else {
        document.getElementById('paletteCaption').style.setProperty('display', 'none');
    }
}

function themeHover(_inOut){

    if (_inOut == 1){
        document.getElementById('themeCaption').style.setProperty('display', 'block');
    } else {
        document.getElementById('themeCaption').style.setProperty('display', 'none');
    }
}

function closeDonateModal(){
    document.getElementById('donateModal').style.setProperty('display', 'none');
}

function openDonateModal(){
    document.getElementById('donateModal').style.setProperty('display', 'block');
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
    } else if (type == 'concert'){
        window.parent.currentIcon = window.parent.concerts[num];
        window.parent.concerts[num].isCurrentContent = true;
    }
}




/// PINK GROUP UTILITIES

var lv2;
var lv1Text;
var lv2Buttons;

function responseLv1Toggle(_id){
    // lv2Buttons = document.getElementsByClassName('lv2Button');
    lv2Buttons = document.getElementById(_id).childNodes;
    lv1Text = document.getElementById('lv1Text');
    lv1Text.innerHTML = 'Randomize';
    
        if (lv2 == null){
            for (var j in lv2Buttons){
                lv2Buttons[0].parentNode.insertBefore(lv2Buttons[0], lv2Buttons[(Math.floor(Math.random() * Math.floor(3)))+3]);
                lv2Buttons[0].parentNode.insertBefore(lv2Buttons[5], lv2Buttons[(Math.floor(Math.random() * Math.floor(3)))+3]);
                lv2Buttons = document.getElementsByClassName('lv2Button');
            }
            
            for (var i in lv2Buttons){
                // lv2Buttons[i].parentNode.insertBefore(lv2Buttons[i], lv2Buttons[Math.floor(Math.random() * Math.floor(6))]);
                lv2Buttons[i].style = 'display: inline-block';
            }
            lv2 = true;
        } else if (lv2 == false){

            for (var i in lv2Buttons){
                
                lv2Buttons[i].style = 'display: inline-block';
            }
            lv2 = true;
        } else {
            for (var j in lv2Buttons){
                lv2Buttons[0].parentNode.insertBefore(lv2Buttons[0], lv2Buttons[(Math.floor(Math.random() * Math.floor(3)))+3]);
                lv2Buttons[0].parentNode.insertBefore(lv2Buttons[5], lv2Buttons[(Math.floor(Math.random() * Math.floor(3)))+3]);
                lv2Buttons = document.getElementsByClassName('lv2Button');
            }

            var allContent = document.getElementById('responseContainer').childNodes;
            // console.log(allContent);

            var randomChoice = (Math.floor(Math.random()*(allContent.length*0.5))*2)-1;
            while (randomChoice < 0 || randomChoice > allContent.length-1){
                randomChoice = (Math.floor(Math.random()*(allContent.length*0.5))*2)-1;
            }

            console.log(randomChoice);
            for (var i in allContent){
                allContent[i].style = 'display: none';

            }
            allContent[randomChoice].style = 'display: inline-block';

            
        }
}

var lv2ButtonToggles = {
    hopeContent: false,
    guiltContent: false,
    changesContent: false,
    realizationContent: false,
    unrestContent: false,
    explorationContent: false
};
var currentToggle;

function responseToggle(_contentID, _buttonsID){
    // console.log(lv2ButtonToggles._contentID);

    if (_contentID == 'hopeContent'){
        currentToggle = lv2ButtonToggles.hopeContent;
    } else if (_contentID == 'guiltContent'){
        currentToggle = lv2ButtonToggles.guiltContent;
    } else if (_contentID == 'changesContent'){
        currentToggle = lv2ButtonToggles.changesContent;
    } else if (_contentID == 'realizationContent'){
        currentToggle = lv2ButtonToggles.realizationContent;
    } else if (_contentID == 'unrestContent'){
        currentToggle = lv2ButtonToggles.unrestContent;
    } else if (_contentID == 'explorationContent'){
        currentToggle = lv2ButtonToggles.explorationContent;
    }

    var content = document.getElementById(_contentID);
    var buttons = document.getElementsByClassName(_buttonsID);

    var allContent = document.getElementById('responseContainer').childNodes;

    for (var i in allContent){
        allContent[i].style = 'display: none';
    }
    if (content != null){
        content.style = 'display: inline-block';
    }

    if (buttons != null){
        for (var j in buttons){
            if (currentToggle == false){
                buttons[j].style = 'display: inline-block';
            } else {
                buttons[j].style = 'display: none';
            }
        }
    }

    currentToggle = !currentToggle;

    if (_contentID == 'hopeContent'){
        lv2ButtonToggles.hopeContent = currentToggle;
    } else if (_contentID == 'guiltContent'){
        lv2ButtonToggles.guiltContent = currentToggle;
    } else if (_contentID == 'changesContent'){
        lv2ButtonToggles.changesContent = currentToggle;
    } else if (_contentID == 'realizationContent'){
        lv2ButtonToggles.realizationContent = currentToggle;
    } else if (_contentID == 'unrestContent'){
        lv2ButtonToggles.unrestContent = currentToggle;
    } else if (_contentID == 'explorationContent'){
        lv2ButtonToggles.explorationContent = currentToggle;
    }

    // lv2ButtonToggles._contentID = !lv2ButtonToggles._contentID;
    // console.log(lv2ButtonToggles._contentID);

    // if (_contentID == 'hopeContent'){
    //     lv2ButtonToggles.hope = !lv2ButtonToggles.hope;
    // } else if (_contentID == 'guiltContent'){
    //     lv2ButtonToggles.guilt = !lv2ButtonToggles.guilt;
    // } else if (_contentID == 'changesContent'){
    //     lv2ButtonToggles.changes = !lv2ButtonToggles.changes;
    // } else if (_contentID == 'realizationContent'){
    //     lv2ButtonToggles.realization = !lv2ButtonToggles.realization;
    // } else if (_contentID == 'unrestContent'){
    //     lv2ButtonToggles.unrest = !lv2ButtonToggles.unrest;
    // } else if (_contentID == 'explorationContent'){
    //     lv2ButtonToggles.exploration = !lv2ButtonToggles.exploration;
    // }
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
            responses[j].style = 'display: inline-block';
        }
    } else if (_type == 1){
        responses = document.getElementsByClassName('guiltResponseButton');
        for (var j in responses){
            responses[j].style = 'display: inline-block';
        }
    } else if (_type == 2){
        responses = document.getElementsByClassName('changesResponseButton');
        for (var j in responses){
            responses[j].style = 'display: inline-block';
        }
    } else if (_type == 3){
        responses = document.getElementsByClassName('realizationResponseButton');
        for (var j in responses){
            responses[j].style = 'display: inline-block';
        }
    } else if (_type == 4){
        responses = document.getElementsByClassName('unrestResponseButton');
        for (var j in responses){
            responses[j].style = 'display: inline-block';
        }
    } else if (_type == 5){
        responses = document.getElementsByClassName('explorationResponseButton');
        for (var j in responses){
            responses[j].style = 'display: inline-block';
        }
    }


}


// GREEN GROUP UTILITIES

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

