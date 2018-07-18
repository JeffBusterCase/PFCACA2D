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
class Vertex {
    x: number;
    y: number;
    z: number;
    constructor(x,y,z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }
}

class Obj3D {
    vertices: Array<Vertex>;
    faces: Array<Array<Vertex>>;
    public constructor() { }
    public static translate(obj: Obj3D, to: Vertex) {
        for (var i = 0; i < obj.vertices.length; i++){
            obj.vertices[i].x += to.x;
            obj.vertices[i].y += to.y;
            obj.vertices[i].z += to.z;
        }
    }
    public static newCube(center, size) {
        // Generate the vertices
        var d = size / 2;
        let obj = new Obj3D();
        obj.vertices = [
            new Vertex(center.x - d, center.y - d, center.z + d),
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d)
        ];

        // Generate the faces
        obj.faces = [
            [obj.vertices[0], obj.vertices[1], obj.vertices[2], obj.vertices[3]],
            [obj.vertices[3], obj.vertices[2], obj.vertices[5], obj.vertices[4]],
            [obj.vertices[4], obj.vertices[5], obj.vertices[6], obj.vertices[7]],
            [obj.vertices[7], obj.vertices[6], obj.vertices[1], obj.vertices[0]],
            [obj.vertices[7], obj.vertices[0], obj.vertices[3], obj.vertices[4]],
            [obj.vertices[1], obj.vertices[6], obj.vertices[5], obj.vertices[2]]
        ];
        return obj;
    }
}

class Vertex2D {
    x: number;
    y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function project(M) {
    return new Vertex2D(M.x, M.z);
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
            canvasx.beginPath();
            canvasx.fillStyle = pixel.color;
            canvasx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            canvasx.closePath();
        }
        this.last = frame;
	    return frame;
    }
    
    draw3D(objects: Array<Obj3D>, dx, dy) {
        let ctx = this._self().getContext('2d');
        var face, P;
        // For each object
        for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
            // For each face
            for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
                // Current face
                face = objects[i].faces[j];

                // Draw the first vertex
                P = project(face[0]);
                ctx.beginPath();
                ctx.moveTo(P.x + dx, -P.y + dy);

                // Draw the other vertices
                for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                    P = project(face[k]);
                    ctx.lineTo(P.x + dx, -P.y + dy);
                }

                // Close the path and draw the face
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
        }
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
        time *= 1000;
        var self = this;
        if (self.is_playing) {
            window.cancelAnimationFrame(self._inter);
        }
        self.is_playing = true;
        var _last = self.frames[0];
        var must_pass = (1000.0 / fps);
        var delta;
        var last_time = Date.now();
        self._inter = window.requestAnimationFrame(reDraw);
        async function reDraw() {
            delta = (Date.now()) - last_time;
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
                    await sleep((must_pass - delta));
                }
                time -= must_pass;
                last_time = Date.now();
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
function  rands
