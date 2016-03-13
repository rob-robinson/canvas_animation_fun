window.requestAnimationFrame = function () {
    'use strict';
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (f) {
                window.setTimeout(f, 1e3 / 60);
            };
};

var Assets = {

};

var canvas;
var context;

var canvasWidth,canvasHeight;

var mouseIsDown = false;

var clickX,clickY;
var releaseX,releaseY;

// event delegates

function onMouseMove(evt) {
    'use strict';
    evt.preventDefault();

    if (mouseIsDown) {
        //console.log("mouse is down X:" + evt.changedTouches[0].pageX + " Y:" + evt.changedTouches[0].pageY);

        if (evt.changedTouches && evt.changedTouches.length > 0) {
            player.x = evt.changedTouches[0].pageX;
            player.y = evt.changedTouches[0].pageY;
        } else {
            player.x = evt.pageX;
            player.y = evt.pageY;
        }
    }
}

function onMouseStart(e) {
    'use strict';
    e.preventDefault();

    if (e.changedTouches && e.changedTouches.length > 0) {
        clickX = e.changedTouches[0].pageX;
        clickY = e.changedTouches[0].pageY;
    } else {
        clickX = e.pageX;
        clickY = e.pageY;
        player.x = e.pageX;
        player.y = e.pageY;
    }

    mouseIsDown = true;
}

function onMouseEnd(e) {
    'use strict';
    e.preventDefault();
    mouseIsDown = false;
    //releaseX;
    //releaseY;

    if (e.changedTouches && e.changedTouches.length > 0) {
        releaseX = e.changedTouches[0].pageX;
        releaseY = e.changedTouches[0].pageY;
    } else {
        releaseX = e.pageX;
        releaseY = e.pageY;
    }

    player.x = releaseX;
    player.y = releaseY;

    // velocity hack...
    player.dx = (clickX - releaseX) / 10;
    player.dy = (clickY - releaseY) / 10;
}

// end event delegates

function init() {
    'use strict';
    canvas = document.createElement('canvas');

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight-20;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.id = "gameboard";

    canvas.style.background = "url(img/gameboard.jpg)";
    canvas.style['background-size'] = "100% 100%";

    document.body.appendChild(canvas);

    // delegates
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousedown', onMouseStart, false);
    canvas.addEventListener('mouseup', onMouseEnd, false);
    canvas.addEventListener('touchmove', onMouseMove, false);
    canvas.addEventListener('touchstart', onMouseStart, false);
    canvas.addEventListener('touchend', onMouseEnd, false);

    context = canvas.getContext("2d");


    var FPS = 30;

    setInterval(function () {
        //update();
        draw();
    }, 1 / FPS);
}

// var c = [
//     {x:160,y:160},
//     {x:140,y:140},
//     {x:180,y:140},
//     {x:120,y:120},
//     {x:160,y:120},
//     {x:180,y:120},
//     {x:100,y:100},
//     {x:140,y:100},
//     {x:180,y:100},
//     {x:220,y:100}
// ];

var player = {
    color: "#00A",
    x: canvasWidth / 2, // start point ... center
    y: canvasHeight / 2, // start point ... center
    dx: 0, // amt to accelerate by -- horizontal
    dy: 0, // amt to accelerate by -- vertical
    width: 20,
    height: 10,
    draw: function () {
        'use strict';

        // only do expensive drawing when the player has x or y direction
        if(this.dx !=0 || this.dy !=0){

            var s = new Image();
            var newX = this.x += this.dx/3;
            var newY = this.y += this.dy/3;
            var tempScore, score;

            context.clearRect(0, 0, canvasWidth, canvasHeight);

            s.src = "img/home_page_squirrel2.png";
            context.drawImage(s, this.x, this.y, 80, 60);

            document.getElementById("score").innerHTML = "dx : " + this.dx.toFixed(2)+ " dy : " + this.dy.toFixed(2);



            if (newX >= canvasWidth ) {
                //newX = 0;
                this.dx = this.dx * -1;
            }  else
            if (newX < 0) {
                //newX = canvasWidth;
                this.dx = this.dx * -1;
            }
            if (newY >= canvasHeight ) {
                newY = 0;
            }
            if (newX >= canvasWidth ) {
                newX = 1;
            }


            // friction? :
            var frictionLimit = .25;
            var friction = .998;

            
            

            if( Math.abs(this.dx) < frictionLimit) { 
                this.dx=0;
            } else {
                this.dx = this.dx * friction;
            }

            if( Math.abs(this.dy) < frictionLimit) {
                this.dy=0;
            } else {
                this.dy = this.dy * friction;
            }




            // // scoring hacks...
            // if (newY < 80) {
            //     newY = 550;
            //     newX = 550;
            //     this.dy = 0;
            //     this.dx = 0;

            //     tempScore = Math.abs(432 - this.x);
            //     score = 0;

            //     if (tempScore < 2.5) {
            //         score = 10;
            //     } else if (tempScore < 15) {
            //         score = 9;
            //     } else if (tempScore < 25) {
            //         score = 8;
            //     } else if (tempScore < 35) {
            //         score = 7;
            //     } else if (tempScore < 45) {
            //         score = 6;
            //     } else if (tempScore < 55) {
            //         score = 5;
            //     }

            //     document.getElementById("score").innerHTML = "Landed on : " + parseInt(this.x) + " TempScore : " + parseInt(tempScore) + " Score : " + score;
            //     // perfect is 432:
            //     // score is Math.abs(432-this.x)
            // }

            this.x = newX;
            this.y = newY;
        }
    } // end draw
};

function draw(){
    'use strict';
    player.draw();
    // for(var i=pins.length-1;i>=0; i-=1){
    //     pins[i].draw();
    // }

}


window.addEventListener('load', function() {
    'use strict';
    init();
}, false);




