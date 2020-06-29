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
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(-180deg)');
    content.style = 'height: 95%';
    setTimeout(function(){contentContainerHidden = false;}, 1000);
    
    resizeIframe();
    matchTheme();
}

function contentContract(){
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(0deg)');
    content.style = 'height: 10%';
    contentContainerHidden = true;
}

function contentContractFromInside(){
    var parentIcon = window.parent.document.getElementById('contentIcon');
    var parentContent = window.parent.document.getElementById('contentContainer');
    parentIcon.style.setProperty('transform', 'rotate(0deg)');
    parentContent.style = 'height: 10%';
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
    document.documentElement.style.setProperty('--bg-color-transparent', darkHexColors[colorPalette] + 'd9');
    document.documentElement.style.setProperty('--fg-color', lightHexColors[colorPalette]);

    document.getElementById('themeIcon').innerHTML = '☽';
    foregroundColor = lightColors[colorPalette];
    theme = 'night';
}

function dayTheme(){
    var iframe = document.getElementById('content');
    if (iframe.contentDocument != null){
        iframe.contentDocument.documentElement.style.setProperty('--fg-color', darkHexColors[colorPalette]);
        iframe.contentDocument.documentElement.style.setProperty('--bg-color', lightHexColors[colorPalette]);
    }
    document.documentElement.style.setProperty('--bg-color', lightHexColors[colorPalette]);
    document.documentElement.style.setProperty('--bg-color-transparent', lightHexColors[colorPalette] + 'd9');
    document.documentElement.style.setProperty('--fg-color', darkHexColors[colorPalette]);

    document.getElementById('themeIcon').innerHTML = '☼';
    foregroundColor = darkColors[colorPalette];
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