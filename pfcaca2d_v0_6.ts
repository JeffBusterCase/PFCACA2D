// PFCACA2D version 0.6

// Util
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// PFCACA2D
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
	addSprite(sprite:CanvasSprite, xpos, ypos){
		var placeHolder = [];
		var spritePlaceHolder = [] as Array<Point>;
		
		for(var pixel of sprite.sprite){
			
		};
		var _sprite = new CanvasSprite(spritePlaceHolder);
		for(var _pixel of this.frame){
			for(var pixel of sprite.sprite){
				if(pixel != _pixel){
					placeHolder.push(pixel);
				};
			};
		};
		this.frame = placeHolder;
	};
}

class CanvasSprite{
	// Start Position must be x=0, y=0
	constructor(public sprite:Array<Point>){
	};
};

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
            canvasx.beginPath();
            canvasx.fillStyle = pixel.color;
            canvasx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            canvasx.closePath();
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
	    if(this.last == undefined){
	        return;
	    }
        var canvasx = this.self().getContext("2d");
        for(var pixel of this.last.frame){
            canvasx.clearRect(pixel.x, pixel.y, pixel.size, pixel.size);
        }
        return true;
    }
    clearAll() : Boolean {
        this.__self().getContext("2d").clearRect(0, 0, this.__self().width, this.__self().height);
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
    _animationTime: number;
    is_playing:boolean;
    self;
    constructor(public canvasId:string, public frames:Array<Frame>){
    };
    public play(time=this.frames.length, fps){
        this._canvas = new Canvas(this.canvasId);
        this._frameNumber = 0;
        this._play(time, fps);
    };
    private _play(time, fps) {
        var self = this;
        if (self.is_playing) {
            window.cancelAnimationFrame(self._inter);
        }
        self.is_playing = true;
        var _last = self.frames[0];
        self._animationTime = self.frames.length;
        var must_pass = 1.0 / fps;
        var delta;
        var last_time = Date.now()/1000;
        self._inter = window.requestAnimationFrame(reDraw);
        async function reDraw() {
            delta = (Date.now()/1000) - last_time;
            delta = delta >= 0 ? delta : 0;
            if (time <= 0) {
                window.cancelAnimationFrame(self._inter);
                self.is_playing = false;
            } else {
                // Draw frames
                self._canvas.clearAll();
                _last = self._canvas.draw(self.frames[self._frameNumber]);
                self._frameNumber += 1;
                // correct frames per seconds
                if (delta <= must_pass) {
                    await sleep((must_pass - delta)*1000);
                }
                time -= must_pass;
                last_time = Date.now() / 1000;
                self._inter = window.requestAnimationFrame(reDraw);
            };
        };
    };
};

function toInt(fl:number) : Number {
	return (parseInt(fl.toString()));
};
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
