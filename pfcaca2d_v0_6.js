// PFCACA2D version 0.7
var Point = (function () {
    function Point(x, y, color, size) {
        if (size === void 0) { size = 1; }
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    }
    return Point;
}());
var Frame = (function () {
    function Frame(frame) {
        this.frame = frame;
    }
    Frame.prototype.append = function (point) {
        this.frame.push(point);
    };
    return Frame;
}());
var Canvas = (function () {
    function Canvas(id, w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.id = id;
        this.w = w;
        this.h = h;
    }
    Canvas.prototype.create = function () {
        var canvas = document.createElement("canvas");
        canvas.id = this.id;
        canvas.setAttribute("height", this.h.toString());
        canvas.setAttribute("width", this.w.toString());
        canvas.style.border = "solid 2px black";
        document.body.appendChild(canvas);
        return document.getElementById(canvas.id);
    };
    Canvas.prototype.self = function () {
        return document.querySelector("#" + this.id);
    };
    Canvas.prototype._self = function () {
        return document.getElementById(this.id);
    };
    Canvas.prototype.__self = function () {
        return document.getElementById(this.id);
    };
    Canvas.prototype.draw = function (frame) {
        var canvasx = this._self().getContext('2d');
        for (var _a = 0, _b = frame.frame; _a < _b.length; _a++) {
            var pixel = _b[_a];
            canvasx.beginPath();
            canvasx.fillStyle = pixel.color;
            canvasx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            canvasx.closePath();
        }
        this.last = frame;
        return frame;
    };
    Canvas.prototype.clear = function (frame) {
        var canvasx = this.self().getContext("2d");
        for (var _a = 0, _b = frame.frame; _a < _b.length; _a++) {
            var pixel = _b[_a];
            canvasx.clearRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        return true;
    };
    Canvas.prototype.clearLast = function () {
        if (this.last == undefined) {
            return;
        }
        var canvasx = this.self().getContext("2d");
        for (var _a = 0, _b = this.last.frame; _a < _b.length; _a++) {
            var pixel = _b[_a];
            canvasx.clearRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        return true;
    };
    Canvas.prototype.clearAll = function () {
        this.__self().getContext("2d").clearRect(0, 0, this.__self().width, this.__self().height);
        return true;
    };
    return Canvas;
}());
var Animation = (function () {
    function Animation(animationTime, _function) {
        this.animationTime = animationTime;
        this._function = _function;
    }
    ;
    Animation.prototype.play = function () {
        var self = this;
        self._animationTime = self.animationTime;
        self._inter = setInterval(loop_function, self._animationTime);
        function loop_function() {
            if (self._animationTime == 0) {
                clearInterval(self._inter);
            }
            else {
                self._function();
                self._animationTime -= 1;
            }
            ;
        }
        ;
    };
    ;
    return Animation;
}());
;
var CanvasAnimation2D = (function () {
    function CanvasAnimation2D(canvasId, frames) {
        this.canvasId = canvasId;
        this.frames = frames;
    }
    ;
    CanvasAnimation2D.prototype.play = function (time) {
        if (time === void 0) { time = this.frames.length; }
        this._canvas = new Canvas(this.canvasId);
        this._frameNumber = 0;
        this._play(time);
    };
    ;
    CanvasAnimation2D.prototype._play = function (time) {
        var self = this;
        var _last = self.frames[0];
        self._animationTime = self.frames.length;
        self._inter = setInterval(reDraw, time);
        function reDraw() {
            if (self._animationTime == 0) {
                clearInterval(self._inter);
            }
            else {
                // Draw frames
                self._canvas.clearAll();
                _last = self._canvas.draw(self.frames[self._frameNumber]);
                self._frameNumber += 1;
                self._animationTime -= 1;
            }
            ;
        }
        ;
    };
    ;
    return CanvasAnimation2D;
}());
;
function toInt(fl) {
    return (parseInt(fl.toString()));
}
;
function calculate(_i, _act) {
    if (_act === void 0) { _act = Math.PI; }
    var frame = new Frame([]);
    var i = 0;
    while (i < 100) {
        var _point = new Point(i, i * _act, "black");
        _point.size = 4;
        frame.append(_point);
        i += 1;
    }
    return frame;
}
function rand(x) {
    return Math.floor(Math.random() * x);
}
function rands(x) { return rand(x).toString(); }
;
// 
// main
//
/*
 * Example how to use it *
 *
function main(){
    // Create Button to start the animation
    let button = document.createElement("button");
    button.textContent = "animate";
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    button.style.borderRadius = "3px";
    button.style.border = "solid white 1px";
    
    //initialize a frame Array to get all of then
    var frames = [];
    
    // 60 frames per 5 seconds = 5*60
    for(var i=1;i<(60*5);i++){
        
        // Append a new Point(x,y, color, size) per frame
        var _point = new Point(i, 50, "black", 22);
        frames.push(new Frame([_point]));
    }
    // Create a new Canvas intance
    let canvas = new Canvas('area', 500, 500);
    
    // Create a new Canvas Animation 2D, for the animation
    let animationCanvas = new CanvasAnimation2D('area', frames); //CanvasAnimation2D(canvasId, frames)
    
    // Button on click, do function =>
    button.onclick = function(){
            // for every frame, give 5 milliseconds
            animationCanvas.play(5);
    };
    
    // Create the canvas on the DOM(HTML page ative)
    canvas.create();
    
    // Create the button on the DOM(HTML page ative(again...))
    document.body.appendChild(button);
}


//=>
main();
*/ 
