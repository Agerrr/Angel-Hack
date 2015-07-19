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
