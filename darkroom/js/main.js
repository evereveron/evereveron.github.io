var offset = 0;
var chunkSize = 25;
var dataLength = 0;
var wait = false;
var msnry = null;
var darkroom = false;

var all = "scripts/all-sections.json";
var arts = "scripts/arts.json";
var opinion = "scripts/opinion.json";
var living = "scripts/living.json";
var news = "scripts/news.json";
var current = all;
var data = null

function hitTheLightSwitch () {
    if (darkroom) {
        document.body.style.backgroundColor = "white";
        $('.item').css( "border", "5px solid white");
        $('.top-bar').css( "background-color", "whitesmoke");
        document.getElementById('darkr').style.color = "black";
        document.getElementById('darkr').style.backgroundColor = "whitesmoke";
        document.getElementById('switch').style.color = "black";
        document.getElementById('switch').style.backgroundColor = "whitesmoke";
        document.getElementById('sections').style.color = "black";
        document.getElementById('sections').style.backgroundColor = "whitesmoke";

        document.getElementById('all').style.color = "black";
        document.getElementById('all').style.backgroundColor = "whitesmoke";
        document.getElementById('arts').style.color = "black";
        document.getElementById('arts').style.backgroundColor = "whitesmoke";
        document.getElementById('news').style.color = "black";
        document.getElementById('news').style.backgroundColor = "whitesmoke";
        document.getElementById('opinion').style.color = "black";
        document.getElementById('opinion').style.backgroundColor = "whitesmoke";
        document.getElementById('living').style.color = "black";
        document.getElementById('living').style.backgroundColor = "whitesmoke";

        document.getElementById('ticon').src = 'icons/favicon.ico';
    } else {
        document.body.style.backgroundColor = "#252525";
        $('.item').css( "border", "5px solid #252525");
        $('.top-bar').css( "background-color", "#333333");
        document.getElementById('darkr').style.color = "white";
        document.getElementById('darkr').style.backgroundColor = "#333333";
        document.getElementById('switch').style.color = "white";
        document.getElementById('switch').style.backgroundColor = "#333333";
        document.getElementById('sections').style.color = "white";
        document.getElementById('sections').style.backgroundColor = "#333333";

        document.getElementById('all').style.color = "white";
        document.getElementById('all').style.backgroundColor = "#333333";
        document.getElementById('arts').style.color = "white";
        document.getElementById('arts').style.backgroundColor = "#333333";
        document.getElementById('news').style.color = "white";
        document.getElementById('news').style.backgroundColor = "#333333";
        document.getElementById('opinion').style.color = "white";
        document.getElementById('opinion').style.backgroundColor = "#333333";
        document.getElementById('living').style.color = "white";
        document.getElementById('living').style.backgroundColor = "#333333";

        document.getElementById('ticon').src = 'icons/tlogo.png';
    }
}

function createHtml (superJumbo,large,article,title,abstract,author) {
    var text = '';

    /*ORIGINAL -- NO TITLES ON HOVERs*/
    /* text += '<div class="item" ><a rel="nyt_group" href="' + element.superJumbo + '" article="'+ element.article + '" abstra="' + element.abstract + '" title="';
    text += element.title + '"> <li><img class="pic" src="' + element.Large + '" /></li></a></div>';
    */   

    /* NO TITLE ON HOVER */ 
    /*text += '<div class="item" ><a rel="nyt_group" href="' + element.superJumbo + '" article="'+ element.article + '" abstra="' + element.abstract + '" title="';
    text += element.title + '"> <li><img class="pic" src="' + element.Large + '" /></li></a></div>';
    */
    /* TITLE ON HOVER */ 
    //text += '<div class="item" ><a rel="nyt_group" href="' + element.superJumbo + '" article="'+ element.article + '" abstra="' + element.abstract + '" title="';
    //text += element.title + '"> <li><img class="pic" src="' + element.Large + '" /><span class="hoverText"><p>' + element.title + '</p></span></li></a></div>';

    /* TITLE ON HOVER */ 
    //text += '<div class="item" ><a rel="nyt_group" href="' + element.superJumbo + '" article="'+ element.article + '" abstra="' + element.abstract + '" title="';
    //text += element.title + '"> <li><img class="pic" src="' + element.Large + '" /><span class="hoverText"><p>' + element.title + '</p></span></li></a></div>';
    
    /* This is the attempt with the a tag...
    text += '<div class="item" ><a rel="nyt_group" href="' + element.superJumbo + '" article="'+ element.article + '" abstra="' + element.abstract + '" title="';
    text += element.title + '"> <li><img class="pic" src="' + element.Large + '" /><span class="hoverText"><a href="'+element.article+'">' + element.title + '</a></span></li></a></div>';
    */  

    text += '<div class="item" >'+
                '<p class="hovertitle">'+
                    '<a class="text" target="_blank" href="' + article + '">' + title + '</a>'+
                '</p>'+
                '<a rel="nyt_group" href="'+superJumbo+'" article="'+article+'" auth="'+author+'" abstra="'+abstract+'" " arttitle="'+title+'">'+
                    '<img class="pic" src="' + large + '" />'+
                '</a>'+
            '</div>';     
    return text;
}

function fancybox () {
    //fancybox code to create image gallery

    $("a[rel=nyt_group]").fancybox({
        padding: false,
        // openEffect : 'none',
        closeBtn: false,
        afterShow: function() {
            $(".fancybox-title").wrapInner('<div />').hide();
    
            $(".fancybox-wrap").hover(function() {
                $(".fancybox-title").fadeIn(400);
            }, function() {
                $(".fancybox-title").fadeOut(400);
            });
        },  

        afterLoad: function() {
            this.title = '<a id="title" href="' + this.element[0].attributes[2].value + '" target="_blank">' + this.title +' </a><span id="authinfo">' + this.element[0].attributes[3].value + '</span></br><p id="abstract">' + this.element[0].attributes[4].value + '<a id="readmore" href="' + this.element[0].attributes[2].value + '" target="_blank"> (Read more)</a></p>';
        },
        helpers : {
            title : 'over',
            overlay : {
                locked : false // try changing to true and scrolling around the page
            }                 
        }   
    });
}

function afterEach (textToInsert, waitFalse) {
    var $container = $('#container');
    $container.append(textToInsert);

    fancybox();

    //masonry code to create masonry instance
    imagesLoaded($container, function() {
        msnry = new Masonry(container, {
            itemSelector: '.item',
            isFitWidth: true,
            gutter: 5
        });
        //msnry.appended();
        hitTheLightSwitch();
        if (waitFalse) wait = false;
    });  
}

function theEach () {
    var textToInsert = '';
    //offset 50, dataLength could be either 61 or 37 or 50, chunkSize is 50 
    $.each(data, function (index, element) {
        if (index >= offset+chunkSize) {
            offset = index;
            return false;
        } else if (index < offset) {
            console.log("these items have already been added");
        } else {
            console.log("moving along");
            //get and format images
            textToInsert += createHtml(element.superJumbo,element.Large,element.article,element.title,element.abstract,element.author);
            if (index === dataLength-1) offset = 0;
        }
    });
    return textToInsert;
}

function infiniteScroll () {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 700) {
        if (!wait) {
            console.log("setting wait to true to stop other calls");
            wait = true;

            afterEach(theEach(), true);
        } else {
            console.log("too late, wait is false");
        }
    }
}

function getData (section, notFirstTime, infinite) {
    if (notFirstTime) {
        if (current === section) return;
        current = section;

        $('.item').remove();

        var container = document.getElementById('container');
        msnry.remove(container.children);
    }

    offset = 0;
    $.get(section, function (d) {
        data = null;
        if (typeof d === 'string') data = JSON.parse(d);
        else data = d;
        dataLength = d.length;

        afterEach(theEach(), false);

        if (infinite) {
            $(window).scroll(infiniteScroll);
            $( "#arts" ).click(function() {
                $(window).off("scroll", infiniteScroll);
            });
            $( "#opinion" ).click(function() {
                $(window).off("scroll", infiniteScroll);
            });
            $( "#news" ).click(function() {
                $(window).off("scroll", infiniteScroll);
            });
            $( "#living" ).click(function() {
                $(window).off("scroll", infiniteScroll);
            });
        }
    });
}

$( "#text" ).bind( "click", function() {
    console.log("clciked");
    alert("going to a page");
});

$( "#all" ).bind( "click", function() {
    getData(all, true, true);
});

$( "#darkr" ).bind( "click", function() {
    getData(all, true, true);
});

$( "#switch" ).bind( "click", function() {
    darkroom = !darkroom;
    hitTheLightSwitch();
});

$( "#arts" ).bind( "click", function() {
    getData(arts, true, true);
});

$( "#opinion" ).click(function() {
    getData(opinion, true, true);
});

$( "#living" ).bind( "click", function() {
    getData(living, true, true);
});

$( "#news" ).bind( "click", function() {
    getData(news, true, true);
});

$(document).ready(function(){
    getData(all, false, true);
});