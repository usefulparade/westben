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
}

function contentContract(){
    var contentIcon = document.getElementById('contentIcon');
    contentIcon.style.setProperty('transform', 'rotate(0deg)');
    content.style = 'height: 10%';
    contentContainerHidden = true;
}

function themeToggle(){
    if (theme == 'night'){
        dayTheme();
    } else {
        nightTheme();
    }
}

function nightTheme(){
    var iframe = document.getElementById('content');
    document.documentElement.style.setProperty('--background-color', 'black');
    document.documentElement.style.setProperty('--foreground-color', 'white');
    if (iframe.contentDocument != null){
        iframe.contentDocument.documentElement.style.setProperty('--background-color', 'black');
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
    document.documentElement.style.setProperty('--foreground-color', 'black');
    if (iframe.contentDocument != null){
        iframe.contentDocument.documentElement.style.setProperty('--background-color', 'white');
        iframe.contentDocument.documentElement.style.setProperty('--foreground-color', 'black');
    }
    document.getElementById('themeIcon').innerHTML = '☽';
    foregroundColor = color(0);
    theme = 'day';
}

function javascriptLinkTest(){
    window.frames[1].location = "https://www.westben.ca/";
    console.log('changing iframe');
}