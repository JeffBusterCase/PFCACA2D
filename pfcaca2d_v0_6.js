// PFCACA2D version 0.6
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
    ;
    return CanvasSprite;
}());
;
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
var Animation = /** @class */ (function () {
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
        var self = this;
        if (self.is_playing) {
            window.cancelAnimationFrame(self._inter);
        }
        self.is_playing = true;
        var _last = self.frames[0];
        self._animationTime = self.frames.length;
        var must_pass = 1.0 / fps;
        var delta;
        var last_time = Date.now() / 1000;
        self._inter = window.requestAnimationFrame(reDraw);
        function reDraw() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            delta = (Date.now() / 1000) - last_time;
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
                            return [4 /*yield*/, sleep((must_pass - delta) * 1000)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            time -= must_pass;
                            last_time = Date.now() / 1000;
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
