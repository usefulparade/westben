var contentContainerHidden;
var content;


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
    contentContainerHidden = false;
    resizeIframe();
}

function contentContract(){
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(0deg)');
    content.style = 'height: 10%';
    contentContainerHidden = true;
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

function nightTheme(){
    var iframe = document.getElementById('content');
    document.documentElement.style.setProperty('--background-color', 'black');
    document.documentElement.style.setProperty('--background-color-transparent', '#000000d9');
    document.documentElement.style.setProperty('--foreground-color', 'white');
    if (iframe.contentDocument != null){
        // iframe.contentDocument.documentElement.style.setProperty('--background-color', 'black');
        iframe.contentDocument.documentElement.style.setProperty('--foreground-color', 'white');
    }
    document.documentElement.style.setProperty('--foreground-color', 'white');
    document.getElementById('themeIcon').innerHTML = '☼';
    foregroundColor = color(255);
    theme = 'night';
}

function dayTheme(){
    var iframe = document.getElementById('content');
    document.documentElement.style.setProperty('--background-color', 'white');
    document.documentElement.style.setProperty('--background-color-transparent', '#ffffffd9');
    document.documentElement.style.setProperty('--foreground-color', 'black');
    if (iframe.contentDocument != null){
        // iframe.contentDocument.documentElement.style.setProperty('--background-color', 'white');
        iframe.contentDocument.documentElement.style.setProperty('--foreground-color', 'black');
    }
    document.getElementById('themeIcon').innerHTML = '☽';
    foregroundColor = color(0);
    theme = 'day';
}

function loadNewIframeContent(_link){
    
    window.frames[0].location = _link;
    console.log('changing iframe');

}

function matchTheme(){
    if (theme == 'day'){
        dayTheme();
    } else {
        nightTheme();
    }
}