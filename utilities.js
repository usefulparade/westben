var contentContainerHidden;
var content;
var paletteParam, themeParam;

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
    // var contentIcon = document.getElementById('contentIcon');
    // contentIcon.style.setProperty('transform', 'rotate(-180deg)');
    var mapIcon = document.getElementById('mapIcon');
    var pinIcon = document.getElementById('pinIcon');
    mapIcon.style.setProperty('display', 'block');
    pinIcon.style.setProperty('display', 'none');
    if (windowWidth < 720){
        content.style = 'height: calc(100% - 70px)';
    } else {
        content.style = 'height: calc(100% - 70px)';
    }
    document.getElementById('aboveContent').style = 'height: 70px';
    currentIcon.isCurrentContent = true;
    setTimeout(function(){contentContainerHidden = false;updateURL();}, 400);
    resizeIframe();
    matchTheme();

    // programLayerMatch();
}

function showCurrentIcon(){
    currentIcon.isCurrentContent = true;
}

function contentContract(){
    // var contentIcon = document.getElementById('contentIcon');
    // contentIcon.style.setProperty('transform', 'rotate(0deg)');
    var mapIcon = document.getElementById('mapIcon');
    var pinIcon = document.getElementById('pinIcon');
    mapIcon.style.setProperty('display', 'none');
    pinIcon.style.setProperty('display', 'block');

    setTimeout(function(){contentContainerHidden = true;updateURL();}, 400);
    // currentIcon.isCurrentContent = false;
    document.getElementById('aboveContent').style = 'height: 0px';
    content.style = 'height: 10%';
}

function contentContractFromInside(){
    // var parentIcon = window.parent.document.getElementById('contentIcon');
    var parentContent = window.parent.document.getElementById('contentContainer');
    // parentIcon.style.setProperty('transform', 'rotate(0deg)');
    parentContent.style = 'height: 10%';
    window.parent.document.getElementById('aboveContent').style = 'height: 0px';
    window.parent.currentIcon.isCurrentIcon = false;
    window.parent.currentIcon.isCurrentContent = false;
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
    // document.getElementById('paletteIcon').innerHTML = paletteIcons[colorPalette];
    document.getElementById('paletteSvg').style.setProperty('transform', 'rotate(' + paletteIcons[colorPalette] + 'deg)');
    if (colorPalette == 0){
        document.getElementById('paletteCaption').innerHTML = 'Palette: Blossom';
    } else if (colorPalette == 1){
        document.getElementById('paletteCaption').innerHTML = 'Palette: Sky';
    } else if (colorPalette == 2){
        document.getElementById('paletteCaption').innerHTML = 'Palette: Leaf';
    } else if (colorPalette == 3){
        document.getElementById('paletteCaption').innerHTML = 'Palette: Snow';
    }
    matchTheme();

    paletteParam = colorPalette;
}


function layerToggle(_layer){
    pcr2020Toggle = !pcr2020Toggle;
    
    if (_layer != null){
        currentLayer = _layer;
    } else {
        currentLayer = (currentLayer+1)%2;
    }

    document.getElementById('layerNumber').innerHTML = currentLayer+1;

    if (currentLayer == 0){
        // document.getElementById('layerIcon').innerHTML = '❏';
        document.getElementById('layerCaption').innerHTML = 'Concert Series: 2020 Performer-Composer Residency';
    } else if (currentLayer == 1) {
        // document.getElementById('layerIcon').innerHTML = '❏';
        document.getElementById('layerCaption').innerHTML = 'Concert Series: 2020-21 Digital Concerts';
    }

    updateURL();
}

function layerToggleFromInside(_x){

    window.parent.currentLayer = _x.value;
    var currentLayerNum = (parseInt(_x.value, 10)+1);
    window.parent.document.getElementById('layerNumber').innerHTML = currentLayerNum;

    if (_x.value == 0){
        window.parent.pcr2020Toggle = true;
        // window.parent.document.getElementById('layerIcon').innerHTML = '❏';
        window.parent.document.getElementById('layerCaption').innerHTML = 'Concert Series: 2020 Performer-Composer Residency';
        document.getElementById('concerts2020').style.setProperty('display', 'none');
        document.getElementById('pcr2020').style.setProperty('display', 'inline-block');
    } else if (_x.value == 1) {
        window.parent.pcr2020Toggle = false;
        // window.parent.document.getElementById('layerIcon').innerHTML = '❏';
        window.parent.document.getElementById('layerCaption').innerHTML = 'Concert Series: 2020-21 Digital Concerts';
        document.getElementById('concerts2020').style.setProperty('display', 'inline-block');
        document.getElementById('pcr2020').style.setProperty('display', 'none');
    }

    updateURLFromInside();

}

function programLayerMatch(){
    var iframe = document.getElementById('content');
    if (iframe.contentDocument.getElementById('layerSpecific') != null){
        var layerSelect = iframe.contentDocument.getElementById('layers');
        layerSelect.value = currentLayer;
    
        // console.log('hi');
        if (currentLayer == 0){
            iframe.contentDocument.getElementById('concerts2020').style.setProperty('display', 'none');
            iframe.contentDocument.getElementById('pcr2020').style.setProperty('display', 'inline-block');
        } else if (currentLayer == 1){
            iframe.contentDocument.getElementById('concerts2020').style.setProperty('display', 'inline-block');
            iframe.contentDocument.getElementById('pcr2020').style.setProperty('display', 'none');
        }
    }
}

function navHover(_nav){
    var navCaption = document.getElementById('navCaption');

    if (_nav == 'barn'){
        if (currentIcon.type == "Barn"){
            navCaption.innerHTML = "The Barn (you're already here!)";
        } else {
            navCaption.innerHTML = "Go back to The Barn";
        }
        
    } else if (_nav == 'map'){
        if (!contentContainerHidden){
            navCaption.innerHTML = "Explore the map";
        } else {
            navCaption.innerHTML = "See current content";
        }
    } else if (_nav == 'westben'){
        navCaption.innerHTML = "Head to <u>westben.ca</u>";
    } else if (_nav == 'latest'){
        navCaption.innerHTML = "Watch the latest concert";
    }

    if (contentContainerHidden){
        navCaption.style.setProperty('animation', 'fadeIn 0.5s ease forwards');
    } else {
        navCaption.style.setProperty('animation', 'fadeIn 0.01s ease forwards');
    }
}

function navType(_nav){
    var navCaption = document.getElementById('navCaption');

    if (_nav == 'barn'){
        navCaption.innerHTML = "Go back to The Barn";
        
    } else if (_nav == 'map'){
        if (!contentContainerHidden){
            navCaption.innerHTML = "Explore the map";
        } else {
            navCaption.innerHTML = "See current content";
        }
    } else if (_nav == 'westben'){
        navCaption.innerHTML = "Head to <u>westben.ca</u>";
    } else if (_nav == 'latest'){
        navCaption.innerHTML = "Watch the latest concert";
    }
}

function navTouch(_nav){
    document.getElementById('navCaption').style.setProperty('display', 'none');
    // var type = _nav;
    // navHover(type);
    // setTimeout(navHide, 2000);
    // navHide();

}

function navHide(){
    if (contentContainerHidden){
        document.getElementById('navCaption').style.setProperty('animation', 'fadeOut 0.5s ease forwards');
    } else {
        document.getElementById('navCaption').style.setProperty('animation', 'fadeOut 0.01s ease forwards');
    }
}

function layerHover(_inOut){

    if (_inOut == 1){
        if (contentContainerHidden){
            document.getElementById('layerCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
        } else {
            document.getElementById('layerCaption').style.setProperty('animation', 'fadeIn 0.01s ease forwards');
        }
        
    } else {
        if (contentContainerHidden){
            document.getElementById('layerCaption').style.setProperty('animation', 'fadeOut 0.5s ease forwards');
        } else {
            document.getElementById('layerCaption').style.setProperty('animation', 'fadeOut 0.01s ease forwards');
        }
    }
}

function layerTouch(){
    document.getElementById('layerCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
    setTimeout(layerHover, 1000);
}

function paletteHover(_inOut){

    if (_inOut == 1){
        if (contentContainerHidden){
            document.getElementById('paletteCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
        } else {
            document.getElementById('paletteCaption').style.setProperty('animation', 'fadeIn 0.01s ease forwards');
        }
        
    } else {
        if (contentContainerHidden){
            document.getElementById('paletteCaption').style.setProperty('animation', 'fadeOut 0.5s ease forwards');
        } else {
            document.getElementById('paletteCaption').style.setProperty('animation', 'fadeOut 0.01s ease forwards');
        }
    }
}

function paletteTouch(){
    document.getElementById('paletteCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
    setTimeout(paletteHover, 1000);
}

function themeHover(_inOut){

    if (_inOut == 1){
        if (contentContainerHidden){
            document.getElementById('themeCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
        } else {
            document.getElementById('themeCaption').style.setProperty('animation', 'fadeIn 0.01s ease forwards');
        }
        
    } else {
        if (contentContainerHidden){
            document.getElementById('themeCaption').style.setProperty('animation', 'fadeOut 0.5s ease forwards');
        } else {
            document.getElementById('themeCaption').style.setProperty('animation', 'fadeOut 0.01s ease forwards');
        }
    }
}

function themeTouch(){
    document.getElementById('themeCaption').style.setProperty('animation', 'fadeIn 0.5s ease forwards');
    setTimeout(themeHover, 1000);
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

    document.getElementById('sunSvg').style.setProperty('display', 'none');
    document.getElementById('moonSvg').style.setProperty('display', 'block');
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

    document.getElementById('sunSvg').style.setProperty('display', 'block');
    document.getElementById('moonSvg').style.setProperty('display', 'none');
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

function iframeLoaded(){
    matchTheme();
    var iframe = document.getElementById('content');
    var endMatter = iframe.contentDocument.getElementById('endMatter');
    if (endMatter != null){
        endMatter.innerHTML = "<p>Westben Digital Venue is run by <a href='http://www.westben.ca' target='_blank'>Westben</a></p>" + 
        '<p>A <a href="http://www.usefulparade.com" target="_blank">Useful Parade</a> site</p>';
    }
    programLayerMatch();
    // startFromHash();
    updateURL(); 
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
    // console.log('hi!');
    //if it's not null
    if (window.parent.currentIcon){
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
}

function startFromHash(){
    var url = new URL(window.location);
    var params = new URLSearchParams(document.location.search.substring(1));
    var page = params.get("page");
    var layer = params.get("layer");
    var state = params.get("state");

    var mapIcon = document.getElementById('mapIcon');
    var pinIcon = document.getElementById('pinIcon');
    

    if (url.hash == ""){
        document.getElementById('content').src = 'welcome.html';
    } else if (url.hash == "#milkshed"){
        document.getElementById('content').src = 'milkshed.html';
    }

    if (url.hash == "#pcr2020"){
        layerToggle(0);
    } else {
        layerToggle(1);
    }

    if (url.hash == "#map"){
        contentContract();
    }

    if (layer != null){
        if (layer == "1"){
            layerToggle(0);
        } else if (layer == "2"){
            layerToggle(1);
        } else {
            layerToggle(0);
        }
    }

    if (page != null){
        document.getElementById('content').src = page + '.html';
        if (page == "apple" || page == "banana" || page == "cedar" || page == "green" || page == "lemon" || page == "maple" || page == "oak" || page == "pine" || page == "pink" || page == "purple" || page == "turquoise" || page == "watermelon" || page == "yellow"){
            document.getElementById('content').src = 'ensembles/' + page + '.html';
            if (currentLayer != 0){
                layerToggle();
            }
            // change icon
            currentIcon.isCurrentContent = false;
            var lookup = "ensembles/" + page + ".html";
            currentIcon = ensembles[ensembleLinks.indexOf(lookup)];
            ensembles[ensembleLinks.indexOf(lookup)].isCurrentContent = true;


        } else if (page == "whatyousaw"){
            document.getElementById('content').src = 'ensembles/mightnotfindwhatyousaw/index' + page + '.html';
            if (currentLayer != 0){
                layerToggle();
                
            }
            // change icon
            currentIcon.isCurrentContent = false;
            currentIcon = ensembles[0];
            ensembles[0].isCurrentContent = true;
        } else if (page == "brianmanker" || page == "copresence" || page == "forthebirds" || page == "jordanmowat" || page == "mountcarmel" || page == "valeriemilot" || page == "treeoflight"){
            document.getElementById('content').src = 'concerts/2020/' + page + '.html';
            if (currentLayer != 1){
                layerToggle();
            }
            // change icon
            currentIcon.isCurrentContent = false;
            var lookup = "concerts/2020/" + page + ".html";
            currentIcon = concerts[concertLinks.indexOf(lookup)];
            concerts[concertLinks.indexOf(lookup)].isCurrentContent = true;

        } else {
            document.getElementById('content').src = '' + page + '.html';
        }
        contentExpand();
        
    } else {
        mapIcon.style.setProperty('display', 'none');
        pinIcon.style.setProperty('display', 'block');
    }

    if (state != null){
        if (barndoor == "content"){
            contentExpand();
        } else if (barndoor == "map"){
            contentContract();
        } else {
            contentContract();
        }
    }

    hashAnalyzed = true;
    programLayerMatch();

}

function updateURL(){
    
    var page = "" + window.frames[0].location;
    page.slice(0, page.indexOf('.'));
    var currentLocation = "" + window.location;
    var cleanPage = page.slice(page.lastIndexOf("/") + 1, page.lastIndexOf("."));
    if (cleanPage == "index"){
        cleanPage = "whatyousaw";
    }
    

    var paramStart = "/?";
    var newPage;
    if (contentContainerHidden){
        newPage = "";
    } else {
        newPage = "page=" + cleanPage + "&";
    }
    var newLayer = "layer=" + (parseInt(currentLayer) + 1);
    var newTitle = "";

    var baseURL = currentLocation.slice(0, currentLocation.lastIndexOf('/'));

    var newURL = baseURL + paramStart + newPage + newLayer;
    var newState = { additionalInformation: 'Updated the URL with JS' };
    console.log(newURL);

    if (hashAnalyzed){
        window.history.replaceState(newState, newTitle, newURL);
    }
}

function updateURLFromInside(){
    
    var page = "" + window.parent.window.frames[0].location;
    page.slice(0, page.indexOf('.'));
    var currentLocation = "" + window.parent.window.location;
    var cleanPage = page.slice(page.lastIndexOf("/") + 1, page.lastIndexOf("."));
    if (cleanPage == "index"){
        cleanPage = "whatyousaw";
    }
    // console.log(cleanPage);
    var paramStart = "/?";
    var newPage = "page=" + cleanPage + "&";
    // var thisLayer = window.parent.currentLayer;
    var newLayer = "layer=" + (parseInt(window.parent.currentLayer) + 1);
    var newTitle = "";
    var baseURL = currentLocation.slice(0, currentLocation.lastIndexOf('/'));
    var newURL = baseURL + paramStart + newPage + newLayer;
    var newState = { additionalInformation: 'Updated the URL with JS' };
    console.log(newURL);

    if (window.parent.hashAnalyzed){
        window.parent.window.history.replaceState(newState, newTitle, newURL);
    }
}








/// PCR 2020 SPECIFIC STUFF



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

    if (coordinates[_type] == null || coordinates[_type] == false){
        coordinateContent[_type].style = 'height: auto;';
        coordinates[_type] = true;
    } else {
        coordinateContent[_type].style = 'height: 0px;';
        coordinates[_type] = false;
    }

}

var sections = [];

function sectionToggle(_num){

    var sectionContent = document.getElementsByClassName('toggleSection');

    if (sections[_num] == null || sections[_num] == false){
        sectionContent[_num].style = 'height: auto;';
        sections[_num] = true;
    } else {
        sectionContent[_num].style = 'height: 0px;';
        sections[_num] = false;
    }

}