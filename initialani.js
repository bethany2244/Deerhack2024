import anime from "./node_modules/animejs/lib/anime.es.js";
var initialized = false;

var blurBox = document.createElement('div');
blurBox.id = 'blurBox';

var title = document.createElement('div');
title.id = 'titleText';
title.textContent = 'Transit Idle'
blurBox.appendChild(title);

var desc = document.createElement('div');
desc.id = 'descText';
desc.textContent = 'Places to visit while you wait for your bus'
blurBox.appendChild(desc);

var arrowText = document.createElement('div');
arrowText.id = 'arrowText';
arrowText.textContent = 'Enter locations  to get started';
blurBox.appendChild(arrowText);

var arrow = document.createElement('div');
arrow.id = 'arrow';
arrow.textContent = '🡅';
desc.appendChild(arrow);

document.body.appendChild(blurBox);

var errorBox = document.createElement('div');
errorBox.id = 'errorBox';
errorBox.textContent = "Sorry, there doesn't seem to be an available transit route. Try a different location!";
document.body.appendChild(errorBox);

var arrowAni = anime({
    targets: '#arrow',
    translateY: 50,
    loop: !initialized,
    direction: "alternate",
    easing: 'easeInOutSine'
  });

export function moveOffScreen() {
    if (initialized) {
        return;
    }
    initialized = true;
    arrowAni.pause();
    var titleUp = anime({
        targets: ['#titleText', '#descText'],
        translateY: -500,
        easing: 'easeInBack'
    });
    // var descUp = anime({
    //     targets: '#descText',
    //     translateY: -500,
    //     easing: 'easeInBack'
    // });
    var arrowLeft = anime({
        targets: '#arrowText',
        translateX: -500,
        easing: 'easeInBack',
        delay: 500,
        complete: function(anim) {
            blurBox.style.zIndex = '-100';
        }
    });
    var unblur = anime({
        targets: '#blurBox',
        opacity: 0,
        duration: 15000
    })
}

export function errorAni() {
    var errorAni = anime({
        targets: '#errorBox',
        translateY: -100,
        easing: 'easeOutExpo',
        complete: function(anim) {
            var errorAni2 = anime({
                targets: '#errorBox',
                translateY: 100,
                delay: 3000,
                easing: 'easeInExpo'
            })
        }
      });
}
