var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a;
var canvas = document.getElementById('digit-canvas');
var ctx = canvas.getContext('2d');
var drawing = false;
canvas.addEventListener('mousedown', function () { return drawing = true; });
canvas.addEventListener('mouseup', function () { return drawing = false; });
canvas.addEventListener('mousemove', draw);
function draw(event) {
    if (!drawing)
        return;
    ctx.fillStyle = 'black';
    ctx.fillRect(event.offsetX, event.offsetY, 8, 8);
}
function clearCanvas() {
    var canvas = document.getElementById('digit-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('predicted-digit').innerText = 'Predicted Digit: ';
}
function predict() {
    return __awaiter(this, void 0, void 0, function () {
        var smallCanvas, smallCtx, imageData, imageArray, i, avg, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    smallCanvas = document.createElement('canvas');
                    smallCanvas.width = 28;
                    smallCanvas.height = 28;
                    smallCtx = smallCanvas.getContext('2d');
                    smallCtx.fillStyle = 'black';
                    smallCtx.fillRect(0, 0, smallCanvas.width, smallCanvas.height);
                    document.body.appendChild(smallCanvas);
                    smallCtx === null || smallCtx === void 0 ? void 0 : smallCtx.drawImage(canvas, 0, 0, 280, 280, 0, 0, 28, 28);
                    imageData = smallCtx.getImageData(0, 0, 28, 28);
                    imageArray = [];
                    for (i = 0; i < imageData.data.length; i += 4) {
                        avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                        imageArray.push(avg / 255.0);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/predict', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ image: imageArray })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    document.getElementById('predicted-digit').innerText = "Predicted Digit: ".concat(result.prediction);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("Error cannot predict Digit");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
(_a = document.getElementById('digit-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // prevents the form's default behavior
});
