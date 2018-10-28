// PFCACA2D version 0.65
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Util
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
// PFCACA2D
var Point = /** @class */ (function () {
    function Point(x, y, color, size) {
        if (size === void 0) { size = 1; }
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
    }
    return Point;
}());
var Frame = /** @class */ (function () {
    function Frame(frame) {
        this.frame = frame;
    }
    Frame.prototype.append = function (point) {
        this.frame.push(point);
    };
    Frame.prototype.addSprite = function (sprite, xpos, ypos) {
        var placeHolder = [];
        var spritePlaceHolder = [];
        for (var _a = 0, _b = sprite.sprite; _a < _b.length; _a++) {
            var pixel = _b[_a];
        }
        ;
        var _sprite = new CanvasSprite(spritePlaceHolder);
        for (var _c = 0, _d = this.frame; _c < _d.length; _c++) {
            var _pixel = _d[_c];
            for (var _e = 0, _f = sprite.sprite; _e < _f.length; _e++) {
                var pixel = _f[_e];
                if (pixel != _pixel) {
                    placeHolder.push(pixel);
                }
                ;
            }
            ;
        }
        ;
        this.frame = placeHolder;
    };
    ;
    return Frame;
}());
var CanvasSprite = /** @class */ (function () {
    // Start Position must be x=0, y=0
    function CanvasSprite(sprite) {
        this.sprite = sprite;
    }
    return CanvasSprite;
}());
;
var Vertex = /** @class */ (function () {
    function Vertex(x, y, z) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }
    return Vertex;
}());
function getFaceMedianPosition(face) {
    var x = 0, y = 0, z = 0, i = 0;
    for (var _a = 0, face_1 = face; _a < face_1.length; _a++) {
        var v = face_1[_a];
        x += v.x;
        y += v.y;
        z += v.z;
        i++;
    }
    return new Vertex(x / i, y / i, z / i);
}
function reorderFacesByPosition(faces) {
    var faces = faces.slice(); // copy
    var f = new Array();
    var front;
    var medians = new Array();
    for (var _a = 0, faces_1 = faces; _a < faces_1.length; _a++) {
        var face = faces_1[_a];
        medians.push({ face: face, median: getFaceMedianPosition(face.face) });
    }
    while (medians.length != 0) {
        front = medians[0];
        for (var _b = 0, medians_1 = medians; _b < medians_1.length; _b++) {
            var face_m = medians_1[_b];
            if (front.median.y < face_m.median.y) {
                front = face_m;
            }
        }
        f.push(medians.splice(medians.indexOf(front), 1)[0].face);
    }
    return f.reverse();
}
var Color = /** @class */ (function () {
    function Color(color) {
        this.color = color;
    }
    Color.fromRGB = function (r, g, b) {
        return new Color('rgb(' + r + ',' + g + ',' + b + ')');
    };
    return Color;
}());
function faceEquals(faceA, faceB) {
    for (var i in faceA) {
        if (faceA[i].x != faceB[i].x &&
            faceA[i].y != faceB[i].y &&
            faceA[i].z != faceB[i].z) {
            return false;
        }
    }
    return true;
}
var Obj3D = /** @class */ (function () {
    function Obj3D() {
        this.vertices = new Array();
        this.faces = new Array();
    }
    Obj3D.asTranslate = function (obj, to) {
        // Create new obj (COPY)
        var _obj = new Obj3D();
        _obj.faces = obj.faces.slice();
        _obj.vertices = this._translate(obj, to);
        return _obj;
    };
    Obj3D._translate = function (obj, to) {
        var _vertices = obj.vertices.slice(); // copy
        for (var i = 0; i < _vertices.length; i++) {
            _vertices[i].x += to.x;
            _vertices[i].y += to.y;
            _vertices[i].z += to.z;
        }
        return _vertices;
    };
    Obj3D.translate = function (obj, to) {
        obj.vertices = this._translate(obj, to);
    };
    Obj3D.rotate = function (obj, center, theta, phi) {
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
    };
    Obj3D.getCenterByPosition = function (obj, position) {
        var mX, mY, mZ;
        var n = obj.vertices.length;
        for (var _a = 0, _b = obj.vertices; _a < _b.length; _a++) {
            var v = _b[_a];
            mX += v.x + position.x;
            mY += v.y + position.y;
            mZ += v.z + position.z;
        }
        return new Vertex(mX / n, mY / n, mZ / n);
    };
    Obj3D.newCube = function (center, size) {
        // Generate the vertices
        var d = size / 2;
        var obj = new Obj3D();
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
            { face: [obj.vertices[0], obj.vertices[1], obj.vertices[2], obj.vertices[3]],
                shader: { color: new Color('white') } },
            { face: [obj.vertices[3], obj.vertices[2], obj.vertices[5], obj.vertices[4]],
                shader: { color: new Color('white') } },
            { face: [obj.vertices[4], obj.vertices[5], obj.vertices[6], obj.vertices[7]],
                shader: { color: new Color('white') } },
            { face: [obj.vertices[7], obj.vertices[6], obj.vertices[1], obj.vertices[0]],
                shader: { color: new Color('white') } },
            { face: [obj.vertices[7], obj.vertices[0], obj.vertices[3], obj.vertices[4]],
                shader: { color: new Color('white') } },
            { face: [obj.vertices[1], obj.vertices[6], obj.vertices[5], obj.vertices[2]],
                shader: { color: new Color('white') } },
        ];
        return obj;
    };
    return Obj3D;
}());
var Vertex2D = /** @class */ (function () {
    function Vertex2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vertex2D;
}());
var Camera = /** @class */ (function () {
    function Camera(position) {
        this.position = position;
    }
    return Camera;
}());
function project(M, camera, size) {
    var x, y, r, d;
    x = M.x - camera.position.x + size.w / 2;
    y = M.z - camera.position.z + size.h / 2;
    return new Vertex2D(x - camera.position.x, y - camera.position.y);
}
var Canvas = /** @class */ (function () {
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
    Canvas.prototype.draw = function (frame) {
        var canvasx = this.self().getContext('2d');
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
    Canvas.prototype.getMousePos = function () {
        return this.mouse;
    };
    Canvas.prototype.draw3D = function (objects, pos, camera) {
        var ctx = this.self().getContext('2d');
        ctx.fillStyle = 'white';
        var size = { w: this.w, h: this.h };
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
    };
    Canvas.prototype.render = function (func, fps) {
        var delta;
        var must_pass = 1000 / fps;
        var last_time = Date.now();
        var _this = this;
        // MOUSE OPERATIONS
        this.mouse = { x: 0, y: 0 };
        // The function 'removeEventListener requires the function.
        // so cannot pass it inline to addEventListener
        this.handleMouse = function (evt) {
            var rect = _this.self().getBoundingClientRect();
            _this.mouse = {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
            _this.mouse.x = _this.mouse.x > _this.w ? _this.w : _this.mouse.x;
            _this.mouse.y = _this.mouse.y > _this.h ? _this.h : _this.mouse.y;
            _this.mouse.x = _this.mouse.x < 0 ? 0 : _this.mouse.x;
            _this.mouse.y = _this.mouse.y < 0 ? 0 : _this.mouse.y;
        };
        window.addEventListener('mousemove', this.handleMouse, false);
        function rerender() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _this.clearAll();
                            delta = Date.now() - last_time;
                            last_time = Date.now();
                            func(delta / 1000); // delta is passed in 1.0 scale
                            if (!(delta < must_pass)) return [3 /*break*/, 2];
                            return [4 /*yield*/, sleep((must_pass - delta))];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _this.raf = window.requestAnimationFrame(rerender);
                            return [2 /*return*/];
                    }
                });
            });
        }
        _this.isRendering = true;
        _this.raf = window.requestAnimationFrame(rerender);
    };
    Canvas.prototype.stopRender = function () {
        if (this.isRendering) {
            try {
                window.cancelAnimationFrame(this.raf);
            }
            catch (Exception) {
                return false;
            }
            this.isRendering = false;
            window.removeEventListener('mousemove', this.handleMouse);
            return true;
        }
        return false;
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
        this.self().getContext("2d").clearRect(0, 0, this.self().width, this.self().height);
        return true;
    };
    return Canvas;
}());
var PFAnimation = /** @class */ (function () {
    function PFAnimation(animationTime, _function) {
        this.animationTime = animationTime;
        this._function = _function;
    }
    ;
    PFAnimation.prototype.play = function () {
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
    return PFAnimation;
}());
;
var CanvasAnimation2D = /** @class */ (function () {
    function CanvasAnimation2D(canvasId, frames) {
        this.canvasId = canvasId;
        this.frames = frames;
    }
    ;
    CanvasAnimation2D.prototype.play = function (time, fps) {
        if (time === void 0) { time = this.frames.length; }
        this._canvas = new Canvas(this.canvasId);
        this._frameNumber = 0;
        this._play(time, fps);
    };
    ;
    CanvasAnimation2D.prototype._play = function (time, fps) {
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
        function reDraw() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            delta = (Date.now()) - last_time;
                            delta = delta >= 0 ? delta : 0;
                            if (!(time <= 0)) return [3 /*break*/, 1];
                            window.cancelAnimationFrame(self._inter);
                            self.is_playing = false;
                            return [3 /*break*/, 4];
                        case 1:
                            // Draw frames
                            self._canvas.clearAll();
                            _last = self._canvas.draw(self.frames[self._frameNumber]);
                            self._frameNumber += 1;
                            if (!(delta <= must_pass)) return [3 /*break*/, 3];
                            return [4 /*yield*/, sleep((must_pass - delta))];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            time -= must_pass;
                            last_time = Date.now();
                            self._inter = window.requestAnimationFrame(reDraw);
                            _a.label = 4;
                        case 4:
                            ;
                            return [2 /*return*/];
                    }
                });
            });
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
function toRad(g) {
    return (g * Math.PI) / 180;
}
