<<<<<<< HEAD

var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;
var colors;
var index;

function init() {
	canvas = document.getElementById("primary");
	index = 0;
	colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

	//check to see if we are running in a browser with touch support
	stage = new createjs.Stage(canvas);
	stage.autoClear = false;
	stage.enableDOMEvents(true);

	createjs.Touch.enable(stage);
	createjs.Ticker.setFPS(24);

	drawingCanvas = new createjs.Shape();

	stage.addEventListener("stagemousedown", handleMouseDown);
	stage.addEventListener("stagemouseup", handleMouseUp);

	title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
	title.x = 300;
	title.y = 200;
	stage.addChild(title);

	stage.addChild(drawingCanvas);
	stage.update();
}

function handleMouseDown(event) {
	if (!event.primary) { return; }
	if (stage.contains(title)) {
		stage.clear();
		stage.removeChild(title);
	}
	color = colors[(index++) % colors.length];
	stroke = Math.random() * 30 + 10 | 0;
	oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
	oldMidPt = oldPt.clone();
	stage.addEventListener("stagemousemove", handleMouseMove);
}

function handleMouseMove(event) {
	if (!event.primary) { return; }
	var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

	drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

	oldPt.x = stage.mouseX;
	oldPt.y = stage.mouseY;

	oldMidPt.x = midPt.x;
	oldMidPt.y = midPt.y;

	stage.update();
}

function handleMouseUp(event) {
	if (!event.primary) { return; }
	stage.removeEventListener("stagemousemove", handleMouseMove);
}

container = $('.container');
cover = $('.cover');
play = $('#play');
pause = $('#pause');
mute = $('#mute');
muted = $('#muted');
close = $('#close');
song = new Audio('music/twinkle_short.wav');
duration = song.duration;

if (song.canPlayType('audio/mpeg;')) {
    song.type= 'audio/mpeg';
    song.src= 'music/track1.mp3';
} else {
    song.type= 'audio/ogg';
    song.src= 'music/track1.ogg';
}

play.live('click', function(e) {
  e.preventDefault();
  song.play();

  $(this).replaceWith('<a class="button gradient" id="pause" href="" title=""></a>');
  container.addClass('containerLarge');
  cover.addClass('coverLarge');
  $('#close').fadeIn(300);
  $('#seek').attr('max',song.duration);
});
 
pause.live('click', function(e) {
	e.preventDefault();
	song.pause();
	$(this).replaceWith('<a class="button gradient" id="play" href="" title=""></a>');
});

mute.live('click', function(e) {
  e.preventDefault();
  song.volume = 0;
  $(this).replaceWith('<a class="button gradient" id="muted" href="" title=""></a>');
});
 
muted.live('click', function(e) {
  e.preventDefault();
  song.volume = 1;
  $(this).replaceWith('<a class="button gradient" id="mute" href="" title=""></a>');
});

$('#close').click(function(e) {
  e.preventDefault();
  container.removeClass('containerLarge');
  cover.removeClass('coverLarge');
  song.pause();
  song.currentTime = 0;
  $('#pause').replaceWith('<a class="button gradient" id="play" href="" title=""></a>');
  $('#close').fadeOut(300);
});

$("#seek").bind("change", function() {
  song.currentTime = $(this).val();
  $("#seek").attr("max", song.duration);
});

song.addEventListener('timeupdate',function (){
  curtime = parseInt(song.currentTime, 10);
  $("#seek").attr("value", curtime);
});

init();

angular
    .module("fazer", [])
    .controller("FazerCtrl", function () {
        var canvas;
        var context;
        var stage;
        var drawing;
        var lastPoint;
        var me = this;

        this.brushes = [
            { name: 'Normal', fn: brushes.normal },
            { name: 'Fancy', fn: brushes.orange },
        ];

        this.brush = this.brushes[0];

        this.selectBrush = function (brush) {
            this.brush = brush;
        }

        this.init = function () {
            canvas = document.getElementById("primary");
            ctx = canvas.getContext('2d');

            stage = new createjs.Stage(canvas);
            stage.autoClear = false;
            stage.enableDOMEvents(true);

            createjs.Touch.enable(stage);
            createjs.Ticker.setFPS(24);

            stage.addEventListener("stagemousedown", handleMouseDown);
            stage.addEventListener("stagemouseup", handleMouseUp);
            stage.addEventListener("stagemousemove", handleMouseMove);

            stage.addChild(new createjs.Shape());
            stage.update();
        }

        this.init();

        function handleMouseDown(event) {
            if (!event.primary) { return; }
            drawing = true;
            lastPoint = { x: stage.mouseX, y: stage.mouseY };
        }

        function handleMouseMove(event) {
            if (!event.primary) { return; }
            if (!drawing) { return; }

            var currentPoint = { x: stage.mouseX, y: stage.mouseY };
            me.brush.fn(ctx, lastPoint, currentPoint);
            lastPoint = currentPoint;
        }

        function handleMouseUp(event) {
            if (!event.primary) { return; }
            drawing = false;
        }
    });



var brushes = {
    normal: function normal(ctx, lastPoint, currentPoint) {
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();
    },
    fancy: function fancy(ctx, lastPoint, currentPoint) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        ctx.beginPath();

        ctx.moveTo(lastPoint.x - getRandomInt(0, 2), lastPoint.y - getRandomInt(0, 2));
        ctx.lineTo(currentPoint.x - getRandomInt(0, 2), currentPoint.y - getRandomInt(0, 2));
        ctx.stroke();

        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        ctx.moveTo(lastPoint.x + getRandomInt(0, 2), lastPoint.y + getRandomInt(0, 2));
        ctx.lineTo(currentPoint.x + getRandomInt(0, 2), currentPoint.y + getRandomInt(0, 2));
        ctx.stroke();
    }
};
