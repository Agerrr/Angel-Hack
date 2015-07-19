angular
    .module("fazer", [])
    .controller("FazerCtrl", function () {
        this.brushes = [];
    });


var canvas, stage;
var drawingCanvas;
var drawing;

function init() {
    canvas = document.getElementById("primary");

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.addEventListener("stagemousemove", handleMouseMove);

    stage.addChild(drawingCanvas);
    stage.update();
}

function handleMouseDown(event) {
    if (!event.primary) {
        return;
    }
    drawing = true;

    lastPoint = {
        x: stage.mouseX,
        y: stage.mouseY
    };
}

var normalBrush = false;
var lastPoint = {};

function handleMouseMove(event) {
    if (!event.primary) {
        return;
    }
    if (!drawing) {
        return;
    }

    var currentPoint = {
        x: stage.mouseX,
        y: stage.mouseY
    };
    var ctx = drawingCanvas.stage.canvas.getContext('2d');
    if (normalBrush) {
        regularBrush(ctx, currentPoint)
    } else {
        orange(ctx, currentPoint);
    }
    lastPoint = currentPoint;
}

function handleMouseUp(event) {
    if (!event.primary) {
        return;
    }
    drawing = false;
}

function regularBrush(ctx, currentPoint) {
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
}

function orange(ctx, currentPoint) {
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

init();
