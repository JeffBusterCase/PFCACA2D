// PFCACA2D version 0.6
// animate code by Jefferson Bomfim AKA jeffbustercase

class Point {
    constructor(public x:number, public y:number, public color:string,  public size=1){
    }
}

class Frame {
	constructor(public frame:Array<Point>){
	}
	append(point:Point){
		this.frame.push(point);
	}
}
 
class Canvas {
    last:Frame;
    constructor(public id:string, public w=0, public h=0) {
    }
    create(){
        var canvas = document.createElement("canvas");
        canvas.id = this.id;
        canvas.setAttribute("height", this.h.toString() );
        canvas.setAttribute("width",  this.w.toString() );
        canvas.style.border = "solid 2px black";
        document.body.appendChild(canvas);
        return document.getElementById(canvas.id);
    }
    self(){
        return document.querySelector("#"+this.id) as HTMLCanvasElement;
    }
    _self(){
	return document.getElementById(this.id) as HTMLCanvasElement;
    }
     __self(){
	return document.getElementById(this.id);	
    }
    draw(frame:Frame) : Frame {
        var canvasx = this._self().getContext('2d');
        for(var pixel of frame.frame){
            canvasx.fillStyle = pixel.color;
            canvasx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        this.last = frame;
	return frame;
    }
    clear(frame:Frame) : Boolean {
        var canvasx = this.self().getContext("2d");
        for(var pixel of frame.frame){
           canvasx.clearRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        return true;
    }
    clearLast() : Boolean {
	if(this.last == null){
	    return;
	}
        var canvasx = this.self().getContext("2d");
        for(var pixel of this.last.frame){
            canvasx.clearRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        return true;
    }
}


class Animation {
    _inter:any;
    _animationTime:number;
    constructor(public animationTime:number, public _function:Function){
	};
    play(){
        var self = this;
        self._animationTime = self.animationTime;
        self._inter = setInterval(loop_function, self._animationTime);
        function loop_function(){
            if(self._animationTime == 0){
                clearInterval(self._inter);
            } else {
			    self._function();
                self._animationTime -= 1;
            };
        };
    };
};

class CanvasAnimation2D {
    _frameNumber:number;
    _canvas:Canvas;
    _inter;    
    _animationTime:number;
    self;
    constructor(public canvasId:string, public frames:Array<Frame>){
    };
    public play(time=this.frames.length){
        this._canvas = new Canvas(this.canvasId);
        this._frameNumber = 0;
        this._play(time);
    };
    private _play(time){
        var self = this;
        self._animationTime = self.frames.length;
        self._inter = setInterval(reDraw, time);
        function reDraw(){
            if(self._animationTime == 0){
                clearInterval(self._inter);
            } else {
                // Draw frames
                self._canvas.clearLast();
                self._canvas.draw(self.frames[self._frameNumber]);
                self._frameNumber += 1;
                self._animationTime -= 1;
            };
        };
    };
};

function toInt(fl:number) : Number {
	return (parseInt(fl.toString()));
}
function calculate(_i:number, _act=Math.PI) : Frame {
	var frame = new Frame([]);
	var i = 0;
	while(i < 100){
		var _point = new Point(i, i*_act, "black");
		_point.size = 4;
		frame.append(_point);
		i += 1; 
	}
	return frame;
}
function rand(x:number){
	return Math.floor(Math.random() * x);
}
function  rands(x:number) {return rand(x).toString();};

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
