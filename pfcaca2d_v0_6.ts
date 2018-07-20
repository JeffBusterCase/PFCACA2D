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
    constructor(public x,public y,public z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }
}

function getFaceMedianPosition(face:Array<Vertex>) : Vertex {
    let x = 0,y = 0,z = 0,i = 0;
    for(var v of face){
        x += v.x;
        y += v.y;
        z += v.z;
        i++;
    }
    return new Vertex(x/i,y/i,z/i);
}

function reorderFacesByPosition(faces:Array<Face>) : Array<Face> {
    var faces = faces.slice(); // copy
    let f = new Array<Face>();
    let front : {face: Face, median: Vertex};
    let medians = new Array<{face: Face, median: Vertex}>();

    for(var face of faces){
        medians.push({face: face, median: getFaceMedianPosition(face.face)});
    }
    while(medians.length != 0){
        front = medians[0];
        for(var face_m of medians){
            if(front.median.y < face_m.median.y){
                front = face_m;
            }
        }
        f.push(medians.splice(medians.indexOf(front), 1)[0].face);
    }    
    return f.reverse();
}

class Color {
    constructor(public color: string){}
    static fromRGB(r,g,b){
        return new Color('rgb('+r+','+g+','+b+')')
    }
}
interface FaceShader {
    color: Color;
}

function faceEquals(faceA:Array<Vertex>, faceB: Array<Vertex>) : boolean {
    for(var i in faceA){
        if(faceA[i].x!=faceB[i].x && 
            faceA[i].y!=faceB[i].y && 
            faceA[i].z!=faceB[i].z){
            return false;
        }
    }
    return true;
}

interface Face {
    face: Array<Vertex>;
    shader: FaceShader
}

class Obj3D {
    vertices: Array<Vertex>;
    faces: Array<Face>;
    public constructor() {
        this.vertices = new Array<Vertex>();
        this.faces = new Array<Face>();
    }
    public static asTranslate(obj: Obj3D, to:Vertex) : Obj3D {
        // Create new obj (COPY)
        let _obj = new Obj3D();
        _obj.faces = obj.faces.slice();
        _obj.vertices = this._translate(obj, to);
        return _obj;
    }
    public static _translate(obj: Obj3D, to: Vertex) : Array<Vertex> {
        let _vertices = obj.vertices.slice(); // copy
        for (var i = 0; i < _vertices.length; i++){
            _vertices[i].x += to.x;
            _vertices[i].y += to.y;
            _vertices[i].z += to.z;
        }
        return _vertices;
    }
    public static translate(obj: Obj3D, to: Vertex) {
        obj.vertices = this._translate(obj, to);
    }
    public static rotate(obj: Obj3D, center: Vertex, theta, phi) {
        var v;
        for (var i = 0; i < obj.vertices.length; i++) {
            v = obj.vertices[i]; 
            // Rotation matrix coefficients
            var ct = Math.cos(theta);
            var st = Math.sin(theta);
            var cp = Math.cos(phi);
            var sp = Math.sin(phi);

            // Rotation
            var x = v.x - center.x;
            var y = v.y - center.y;
            var z = v.z - center.z;

            v.x = ct * x - st * cp * y + st * sp * z + center.x;
            v.y = st * x + ct * cp * y - ct * sp * z + center.y;
            v.z = sp * y + cp * z + center.z;
        }
    }
    public static getCenterByPosition(obj: Obj3D, position: Vertex) : Vertex {
        let mX,mY,mZ;
        let n = obj.vertices.length;
        for(var v of obj.vertices){
            mX+=v.x+position.x;
            mY+=v.y+position.y;
            mZ+=v.z+position.z;
        }
        
        return new Vertex(mX/n, mY/n, mZ/n);
    }
    public static newCube(center: Vertex, size:number) : Obj3D {
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
            {face: [obj.vertices[0], obj.vertices[1], obj.vertices[2], obj.vertices[3]],
             shader: {color: new Color('white')}},
            {face: [obj.vertices[3], obj.vertices[2], obj.vertices[5], obj.vertices[4]],
             shader: {color: new Color('white')}},
            {face: [obj.vertices[4], obj.vertices[5], obj.vertices[6], obj.vertices[7]],
             shader: {color: new Color('white')}},
            {face: [obj.vertices[7], obj.vertices[6], obj.vertices[1], obj.vertices[0]],
             shader: {color: new Color('white')}},
            {face: [obj.vertices[7], obj.vertices[0], obj.vertices[3], obj.vertices[4]],
             shader: {color: new Color('white')}},
            {face: [obj.vertices[1], obj.vertices[6], obj.vertices[5], obj.vertices[2]],
             shader: {color: new Color('white')}},
        ];
        return obj;
    }
}

class Vertex2D {
    public constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }
}

class Camera {
    constructor(public position: Vertex){
    }
}

function project(M, camera: Camera, size: {w:number, h:number}) {
   
    var x, y, r, d;

    x = M.x-camera.position.x + size.w/2;
    y = M.z-camera.position.z + size.h/2;

    return new Vertex2D(x-camera.position.x, y-camera.position.y);
}

class Canvas {
    last:Frame;
    private mouse : {x:number, y:number};
    private raf;
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
    draw(frame:Frame) : Frame {
        var canvasx = this.self().getContext('2d');
        
        for(var pixel of frame.frame){
            canvasx.beginPath();
            canvasx.fillStyle = pixel.color;
            canvasx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            canvasx.closePath();
        }
        this.last = frame;
        return frame;
    }
    getMousePos() : {x:number, y:number} {
        return this.mouse;
    }
    draw3D(objects: Array<Obj3D>, pos: Vertex, camera: Camera) {
        let ctx = this.self().getContext('2d');
        ctx.fillStyle = 'white';
        let size = {w: this.w, h: this.h};
        
        var face, P, hasShader;

        // For each object
        for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
            
            // Don't render objects that aren't in front of the camera
            // if(Obj3D.getCenterByPosition(objects[i], pos).y < camera.position.y){
            //     continue;
            // }

            objects[i].faces = reorderFacesByPosition(objects[i].faces);

            // For each face
            for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
                // Current face
                face = objects[i].faces[j].face;

                // Draw the first vertex
                P = project(face[0], camera, size);
                ctx.beginPath();
                ctx.moveTo(P.x + pos.x, P.y + pos.z);

                // Draw the other vertices
                for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                    P = project(face[k], camera, size);
                    ctx.lineTo(P.x + pos.x, P.y + pos.z);
                }

                // Close the path and draw the face
                ctx.closePath();
                
                ctx.fillStyle = objects[i].faces[j].shader.color.color;

                // ctx.stroke();

                ctx.fill();
            }
        }
    }
    render(func, fps) {
        var delta;
        var must_pass = 1000 / fps;
        var last_time = Date.now();
        let _this = this;

        // MOUSE OPERATIONS
        this.mouse = {x: 0,y:0};
        window.addEventListener('mousemove', (evt)=>{
            let rect = _this.self().getBoundingClientRect();
            _this.mouse = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            _this.mouse.x = _this.mouse.x>_this.w ? _this.w : _this.mouse.x;
            _this.mouse.y = _this.mouse.y>_this.h ? _this.h : _this.mouse.y;
            _this.mouse.x = _this.mouse.x<0 ? 0 : _this.mouse.x;
            _this.mouse.y = _this.mouse.y<0 ? 0 : _this.mouse.y;
        }, false);
        

        async function rerender() {
            _this.clearAll();
            delta = Date.now() - last_time;
            last_time = Date.now();
            func(delta/1000);// delta is passed in 1.0 scale
            if (delta < must_pass) {
                await sleep((must_pass-delta));
            }
            _this.raf = window.requestAnimationFrame(rerender);
        }
        _this.raf = window.requestAnimationFrame(rerender);
    }
    stopRender(){
        try { window.cancelAnimationFrame(this.raf); } catch (Exception) {
            return false;
        }
        window.removeEventListener('mousemove');
        return true;
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
        this.self().getContext("2d").clearRect(0, 0, this.self().width, this.self().height);
        return true;
    }
}


class PFAnimation {
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
function  rands(x:number) {return rand(x).toString();};

function toRad(g) {
    return (g * Math.PI) / 180;
}
