module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return warning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return invariant; });
var HEY_LISTEN = 'Hey, listen! ';
var warning = function () { };
var invariant = function () { };
if (process.env.NODE_ENV !== 'production') {
    warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(HEY_LISTEN + message);
        }
    };
    invariant = function (check, message) {
        if (!check) {
            throw new Error(HEY_LISTEN.toUpperCase() + message);
        }
    };
}



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percent", function() { return percent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "px", function() { return px; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vw", function() { return vw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vh", function() { return vh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgba", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbUnit", function() { return rgbUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex", function() { return hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsla", function() { return hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "complex", function() { return complex; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var clamp = function (min, max) { return function (v) {
    return Math.max(Math.min(v, max), min);
}; };
var contains = function (term) { return function (v) {
    return typeof v === 'string' && v.indexOf(term) !== -1;
}; };
var isFirstChars = function (term) { return function (v) {
    return typeof v === 'string' && v.indexOf(term) === 0;
}; };
var getValueFromFunctionString = function (value) {
    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
};
var splitCommaDelimited = function (value) {
    return typeof value === 'string' ? value.split(/,\s*/) : [value];
};

var number = {
    test: function (v) { return typeof v === 'number'; },
    parse: parseFloat,
    transform: function (v) { return v; }
};
var alpha = __assign({}, number, { transform: clamp(0, 1) });
var scale = __assign({}, number, { default: 1 });

var createUnitType = function (unit) {
    var containsUnit = contains(unit);
    return {
        test: function (v) {
            return typeof v === 'string' && containsUnit(v) && v.split(' ').length === 1;
        },
        parse: parseFloat,
        transform: function (v) { return "" + v + unit; }
    };
};
var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px = createUnitType('px');
var vh = createUnitType('vh');
var vw = createUnitType('vw');

var clampRgbUnit = clamp(0, 255);
var onlyColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i;
var isRgba = function (v) { return v.red !== undefined; };
var isHsla = function (v) { return v.hue !== undefined; };
var splitColorValues = function (terms) {
    var numTerms = terms.length;
    return function (v) {
        if (typeof v !== 'string')
            return v;
        var values = {};
        var valuesArray = splitCommaDelimited(getValueFromFunctionString(v));
        for (var i = 0; i < numTerms; i++) {
            values[terms[i]] =
                valuesArray[i] !== undefined ? parseFloat(valuesArray[i]) : 1;
        }
        return values;
    };
};
var rgbaTemplate = function (_a) {
    var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$$1 = _b === void 0 ? 1 : _b;
    return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha$$1 + ")";
};
var hslaTemplate = function (_a) {
    var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$$1 = _b === void 0 ? 1 : _b;
    return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " + alpha$$1 + ")";
};
var rgbUnit = __assign({}, number, { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
var testRgbaString = isFirstChars('rgb');
var rgba = {
    test: function (v) { return (typeof v === 'string' ? testRgbaString(v) : isRgba(v)); },
    parse: splitColorValues(['red', 'green', 'blue', 'alpha']),
    transform: function (_a) {
        var red = _a.red, green = _a.green, blue = _a.blue, alpha$$1 = _a.alpha;
        return rgbaTemplate({
            red: rgbUnit.transform(red),
            green: rgbUnit.transform(green),
            blue: rgbUnit.transform(blue),
            alpha: alpha$$1
        });
    }
};
var testHslaString = isFirstChars('hsl');
var hsla = {
    test: function (v) { return (typeof v === 'string' ? testHslaString(v) : isHsla(v)); },
    parse: splitColorValues(['hue', 'saturation', 'lightness', 'alpha']),
    transform: function (_a) {
        var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, alpha$$1 = _a.alpha;
        return hslaTemplate({
            hue: Math.round(hue),
            saturation: percent.transform(saturation),
            lightness: percent.transform(lightness),
            alpha: alpha$$1
        });
    }
};
var hex = __assign({}, rgba, { test: isFirstChars('#'), parse: function (v) {
        var r = '';
        var g = '';
        var b = '';
        if (v.length > 4) {
            r = v.substr(1, 2);
            g = v.substr(3, 2);
            b = v.substr(5, 2);
        }
        else {
            r = v.substr(1, 1);
            g = v.substr(2, 1);
            b = v.substr(3, 1);
            r += r;
            g += g;
            b += b;
        }
        return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: 1
        };
    } });
var color = {
    test: function (v) {
        return (typeof v === 'string' && onlyColorRegex.test(v)) ||
            rgba.test(v) ||
            hsla.test(v) ||
            hex.test(v);
    },
    parse: function (v) {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else if (hex.test(v)) {
            return hex.parse(v);
        }
        return v;
    },
    transform: function (v) {
        if (isRgba(v)) {
            return rgba.transform(v);
        }
        else if (isHsla(v)) {
            return hsla.transform(v);
        }
        return v;
    }
};

var floatRegex = /(-)?(\d[\d\.]*)/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
var COLOR_TOKEN = '${c}';
var NUMBER_TOKEN = '${n}';
var complex = {
    test: function (v) {
        if (typeof v !== 'string')
            return false;
        var numValues = 0;
        var foundNumbers = v.match(floatRegex);
        var foundColors = v.match(colorRegex);
        if (foundNumbers)
            numValues += foundNumbers.length;
        if (foundColors)
            numValues += foundColors.length;
        return numValues > 1;
    },
    parse: function (v) {
        var input = v;
        var parsed = [];
        var foundColors = input.match(colorRegex);
        if (foundColors) {
            input = input.replace(colorRegex, COLOR_TOKEN);
            parsed.push.apply(parsed, foundColors.map(color.parse));
        }
        var foundNumbers = input.match(floatRegex);
        if (foundNumbers) {
            parsed.push.apply(parsed, foundNumbers.map(number.parse));
        }
        return parsed;
    },
    createTransformer: function (prop) {
        var template = prop;
        var token = 0;
        var foundColors = prop.match(colorRegex);
        var numColors = foundColors ? foundColors.length : 0;
        if (foundColors) {
            for (var i = 0; i < numColors; i++) {
                template = template.replace(foundColors[i], COLOR_TOKEN);
                token++;
            }
        }
        var foundNumbers = template.match(floatRegex);
        var numNumbers = foundNumbers ? foundNumbers.length : 0;
        if (foundNumbers) {
            for (var i = 0; i < numNumbers; i++) {
                template = template.replace(foundNumbers[i], NUMBER_TOKEN);
                token++;
            }
        }
        return function (v) {
            var output = template;
            for (var i = 0; i < token; i++) {
                output = output.replace(i < numColors ? COLOR_TOKEN : NUMBER_TOKEN, i < numColors ? color.transform(v[i]) : v[i]);
            }
            return output;
        };
    }
};




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["c"] = __rest;
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return multicast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "value", function() { return value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decay", function() { return vectorDecay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "everyFrame", function() { return frame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "physics", function() { return vectorPhysics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spring", function() { return vectorSpring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeline", function() { return timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tween", function() { return tween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointer", function() { return index; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return mouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multitouch", function() { return multitouch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return chain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composite", function() { return composite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crossfade", function() { return crossfade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parallel", function() { return parallel$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedule", function() { return schedule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stagger", function() { return stagger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return calc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easing", function() { return easing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transformers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueReaction", function() { return ValueReaction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_framesync__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_style_value_types__ = __webpack_require__(3);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "valueTypes", function() { return __WEBPACK_IMPORTED_MODULE_2_style_value_types__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hey_listen__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stylefire__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "styler", function() { return __WEBPACK_IMPORTED_MODULE_4_stylefire__["a"]; });









var isNum = function (v) {
    return typeof v === 'number';
};
var isPoint = function (point) {
    return point.x !== undefined && point.y !== undefined;
};
var isPoint3D = function (point) {
    return point.z !== undefined;
};
var toDecimal = function (num, precision) {
    if (precision === void 0) {
        precision = 2;
    }
    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
};
var ZERO_POINT = {
    x: 0,
    y: 0,
    z: 0
};
var distance1D = function (a, b) {
    return Math.abs(a - b);
};
var angle = function (a, b) {
    if (b === void 0) {
        b = ZERO_POINT;
    }
    return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
};
var degreesToRadians = function (degrees$$1) {
    return degrees$$1 * Math.PI / 180;
};
var dilate = function (a, b, dilation) {
    return a + (b - a) * dilation;
};
var distance = function (a, b) {
    if (b === void 0) {
        b = ZERO_POINT;
    }
    if (isNum(a) && isNum(b)) {
        return distance1D(a, b);
    } else if (isPoint(a) && isPoint(b)) {
        var xDelta = distance1D(a.x, b.x);
        var yDelta = distance1D(a.y, b.y);
        var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
    return 0;
};
var getProgressFromValue = function (from, to, value) {
    var toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
var getValueFromProgress = function (from, to, progress) {
    return -progress * from + progress * to + from;
};
var pointFromAngleAndDistance = function (origin, angle, distance) {
    angle = degreesToRadians(angle);
    return {
        x: distance * Math.cos(angle) + origin.x,
        y: distance * Math.sin(angle) + origin.y
    };
};
var radiansToDegrees = function (radians) {
    return radians * 180 / Math.PI;
};
var smooth = function (newValue, oldValue, duration, smoothing) {
    if (smoothing === void 0) {
        smoothing = 0;
    }
    return toDecimal(oldValue + duration * (newValue - oldValue) / Math.max(smoothing, duration));
};
var speedPerFrame = function (xps, frameDuration) {
    return isNum(xps) ? xps / (1000 / frameDuration) : 0;
};
var speedPerSecond = function (velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
};
var stepProgress = function (steps, progress) {
    var segment = 1 / (steps - 1);
    var target = 1 - 1 / steps;
    var progressOfTarget = Math.min(progress / target, 1);
    return Math.floor(progressOfTarget / segment) * segment;
};

var calc = /*#__PURE__*/Object.freeze({
    isPoint: isPoint,
    isPoint3D: isPoint3D,
    angle: angle,
    degreesToRadians: degreesToRadians,
    dilate: dilate,
    distance: distance,
    getProgressFromValue: getProgressFromValue,
    getValueFromProgress: getValueFromProgress,
    pointFromAngleAndDistance: pointFromAngleAndDistance,
    radiansToDegrees: radiansToDegrees,
    smooth: smooth,
    speedPerFrame: speedPerFrame,
    speedPerSecond: speedPerSecond,
    stepProgress: stepProgress
});

var noop = function (v) {
    return v;
};
var appendUnit = function (unit) {
    return function (v) {
        return "" + v + unit;
    };
};
var applyOffset = function (from, to) {
    var hasReceivedFrom = true;
    if (to === undefined) {
        to = from;
        hasReceivedFrom = false;
    }
    var getOffset = function (v) {
        return v - from;
    };
    var applyOffsetTo = function (v) {
        return v + to;
    };
    return function (v) {
        if (hasReceivedFrom) {
            return applyOffsetTo(getOffset(v));
        } else {
            from = v;
            hasReceivedFrom = true;
            return to;
        }
    };
};
var blend = function (from, to, v) {
    var fromExpo = from * from;
    var toExpo = to * to;
    return Math.sqrt(v * (toExpo - fromExpo) + fromExpo);
};
var blendColor = function (from, to) {
    var fromColor = typeof from === 'string' ? __WEBPACK_IMPORTED_MODULE_2_style_value_types__["color"].parse(from) : from;
    var toColor = typeof to === 'string' ? __WEBPACK_IMPORTED_MODULE_2_style_value_types__["color"].parse(to) : to;
    var blended = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, fromColor);
    var blendFunc = from.hue !== undefined || typeof from === 'string' && __WEBPACK_IMPORTED_MODULE_2_style_value_types__["hsla"].test(from) ? getValueFromProgress : blend;
    return function (v) {
        blended = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, blended);
        for (var key in blended) {
            if (key !== 'alpha' && blended.hasOwnProperty(key)) {
                blended[key] = blendFunc(fromColor[key], toColor[key], v);
            }
        }
        blended.alpha = getValueFromProgress(fromColor.alpha, toColor.alpha, v);
        return blended;
    };
};
var blendArray = function (from, to) {
    var output = from.slice();
    var numValues = output.length;
    var blendValue = from.map(function (fromThis, i) {
        var toThis = to[i];
        return typeof fromThis === 'number' ? function (v) {
            return getValueFromProgress(fromThis, toThis, v);
        } : blendColor(fromThis, toThis);
    });
    return function (v) {
        for (var i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
        }
        return output;
    };
};
var clamp = function (min, max) {
    return function (v) {
        return Math.min(Math.max(v, min), max);
    };
};
var combineFunctions = function (a, b) {
    return function (v) {
        return b(a(v));
    };
};
var pipe = function () {
    var transformers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        transformers[_i] = arguments[_i];
    }
    return transformers.reduce(combineFunctions);
};
var conditional = function (check, apply) {
    return function (v) {
        return check(v) ? apply(v) : v;
    };
};
var slowInterpolate = function (input, output, rangeLength, rangeEasing) {
    var finalIndex = rangeLength - 1;
    if (input[0] > input[finalIndex]) {
        input.reverse();
        output.reverse();
    }
    return function (v) {
        if (v <= input[0]) {
            return output[0];
        }
        if (v >= input[finalIndex]) {
            return output[finalIndex];
        }
        var i = 1;
        for (; i < rangeLength; i++) {
            if (input[i] > v || i === finalIndex) {
                break;
            }
        }
        var progressInRange = getProgressFromValue(input[i - 1], input[i], v);
        var easedProgress = rangeEasing ? rangeEasing[i - 1](progressInRange) : progressInRange;
        return getValueFromProgress(output[i - 1], output[i], easedProgress);
    };
};
var fastInterpolate = function (minA, maxA, minB, maxB) {
    return function (v) {
        return (v - minA) * (maxB - minB) / (maxA - minA) + minB;
    };
};
var interpolate = function (input, output, rangeEasing) {
    var rangeLength = input.length;
    return rangeLength !== 2 ? slowInterpolate(input, output, rangeLength, rangeEasing) : fastInterpolate(input[0], input[1], output[0], output[1]);
};
var generateStaticSpring = function (alterDisplacement) {
    if (alterDisplacement === void 0) {
        alterDisplacement = noop;
    }
    return function (constant, origin) {
        return function (v) {
            var displacement = origin - v;
            var springModifiedDisplacement = -constant * (0 - alterDisplacement(Math.abs(displacement)));
            return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
        };
    };
};
var linearSpring = /*#__PURE__*/generateStaticSpring();
var nonlinearSpring = /*#__PURE__*/generateStaticSpring(Math.sqrt);
var wrap = function (min, max) {
    return function (v) {
        var rangeSize = max - min;
        return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
    };
};
var smooth$1 = function (strength) {
    if (strength === void 0) {
        strength = 50;
    }
    var previousValue = 0;
    var lastUpdated = 0;
    return function (v) {
        var currentFramestamp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["a" /* currentFrameTime */])();
        var timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
        var newValue = timeDelta ? smooth(v, previousValue, timeDelta, strength) : previousValue;
        lastUpdated = currentFramestamp;
        previousValue = newValue;
        return newValue;
    };
};
var snap = function (points) {
    if (typeof points === 'number') {
        return function (v) {
            return Math.round(v / points) * points;
        };
    } else {
        var i_1 = 0;
        var numPoints_1 = points.length;
        return function (v) {
            var lastDistance = Math.abs(points[0] - v);
            for (i_1 = 1; i_1 < numPoints_1; i_1++) {
                var point = points[i_1];
                var distance$$1 = Math.abs(point - v);
                if (distance$$1 === 0) return point;
                if (distance$$1 > lastDistance) return points[i_1 - 1];
                if (i_1 === numPoints_1 - 1) return point;
                lastDistance = distance$$1;
            }
        };
    }
};
var steps = function (st, min, max) {
    if (min === void 0) {
        min = 0;
    }
    if (max === void 0) {
        max = 1;
    }
    return function (v) {
        var progress = getProgressFromValue(min, max, v);
        return getValueFromProgress(min, max, stepProgress(st, progress));
    };
};
var transformMap = function (childTransformers) {
    return function (v) {
        var output = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, v);
        for (var key in childTransformers) {
            if (childTransformers.hasOwnProperty(key)) {
                var childTransformer = childTransformers[key];
                output[key] = childTransformer(v[key]);
            }
        }
        return output;
    };
};

var transformers = /*#__PURE__*/Object.freeze({
    appendUnit: appendUnit,
    applyOffset: applyOffset,
    blendColor: blendColor,
    blendArray: blendArray,
    clamp: clamp,
    pipe: pipe,
    conditional: conditional,
    interpolate: interpolate,
    generateStaticSpring: generateStaticSpring,
    linearSpring: linearSpring,
    nonlinearSpring: nonlinearSpring,
    wrap: wrap,
    smooth: smooth$1,
    snap: snap,
    steps: steps,
    transformMap: transformMap
});

var Chainable = /*#__PURE__*/function () {
    function Chainable(props) {
        if (props === void 0) {
            props = {};
        }
        this.props = props;
    }
    Chainable.prototype.applyMiddleware = function (middleware) {
        return this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, this.props, { middleware: this.props.middleware ? [middleware].concat(this.props.middleware) : [middleware] }));
    };
    Chainable.prototype.pipe = function () {
        var funcs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            funcs[_i] = arguments[_i];
        }
        var pipedUpdate = funcs.length === 1 ? funcs[0] : pipe.apply(void 0, funcs);
        return this.applyMiddleware(function (update) {
            return function (v) {
                return update(pipedUpdate(v));
            };
        });
    };
    Chainable.prototype.while = function (predicate) {
        return this.applyMiddleware(function (update, complete) {
            return function (v) {
                return predicate(v) ? update(v) : complete();
            };
        });
    };
    Chainable.prototype.filter = function (predicate) {
        return this.applyMiddleware(function (update, complete) {
            return function (v) {
                return predicate(v) && update(v);
            };
        });
    };
    return Chainable;
}();

var Observer = /*#__PURE__*/function () {
    function Observer(_a, observer) {
        var middleware = _a.middleware,
            onComplete = _a.onComplete;
        var _this = this;
        this.isActive = true;
        this.update = function (v) {
            if (_this.observer.update) _this.updateObserver(v);
        };
        this.complete = function () {
            if (_this.observer.complete && _this.isActive) _this.observer.complete();
            if (_this.onComplete) _this.onComplete();
            _this.isActive = false;
        };
        this.error = function (err) {
            if (_this.observer.error && _this.isActive) _this.observer.error(err);
            _this.isActive = false;
        };
        this.observer = observer;
        this.updateObserver = function (v) {
            return observer.update(v);
        };
        this.onComplete = onComplete;
        if (observer.update && middleware && middleware.length) {
            middleware.forEach(function (m) {
                return _this.updateObserver = m(_this.updateObserver, _this.complete);
            });
        }
    }
    return Observer;
}();
var createObserver = function (observerCandidate, _a, onComplete) {
    var middleware = _a.middleware;
    if (typeof observerCandidate === 'function') {
        return new Observer({ middleware: middleware, onComplete: onComplete }, { update: observerCandidate });
    } else {
        return new Observer({ middleware: middleware, onComplete: onComplete }, observerCandidate);
    }
};

var Action = /*#__PURE__*/function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Action.prototype.create = function (props) {
        return new Action(props);
    };
    Action.prototype.start = function (observerCandidate) {
        if (observerCandidate === void 0) {
            observerCandidate = {};
        }
        var isComplete = false;
        var subscription = {
            stop: function () {
                return undefined;
            }
        };
        var _a = this.props,
            init = _a.init,
            observerProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["init"]);
        var observer = createObserver(observerCandidate, observerProps, function () {
            isComplete = true;
            subscription.stop();
        });
        var api = init(observer);
        subscription = api ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, subscription, api) : subscription;
        if (observerCandidate.registerParent) {
            observerCandidate.registerParent(subscription);
        }
        if (isComplete) subscription.stop();
        return subscription;
    };
    return Action;
}(Chainable);
var action = function (init) {
    return new Action({ init: init });
};

var BaseMulticast = /*#__PURE__*/function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(BaseMulticast, _super);
    function BaseMulticast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subscribers = [];
        return _this;
    }
    BaseMulticast.prototype.complete = function () {
        this.subscribers.forEach(function (subscriber) {
            return subscriber.complete();
        });
    };
    BaseMulticast.prototype.error = function (err) {
        this.subscribers.forEach(function (subscriber) {
            return subscriber.error(err);
        });
    };
    BaseMulticast.prototype.update = function (v) {
        for (var i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i].update(v);
        }
    };
    BaseMulticast.prototype.subscribe = function (observerCandidate) {
        var _this = this;
        var observer = createObserver(observerCandidate, this.props);
        this.subscribers.push(observer);
        var subscription = {
            unsubscribe: function () {
                var index = _this.subscribers.indexOf(observer);
                if (index !== -1) _this.subscribers.splice(index, 1);
            }
        };
        return subscription;
    };
    BaseMulticast.prototype.stop = function () {
        if (this.parent) this.parent.stop();
    };
    BaseMulticast.prototype.registerParent = function (subscription) {
        this.stop();
        this.parent = subscription;
    };
    return BaseMulticast;
}(Chainable);

var Multicast = /*#__PURE__*/function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(Multicast, _super);
    function Multicast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Multicast.prototype.create = function (props) {
        return new Multicast(props);
    };
    return Multicast;
}(BaseMulticast);
var multicast = function () {
    return new Multicast();
};

var isValueList = function (v) {
    return Array.isArray(v);
};
var isSingleValue = function (v) {
    var typeOfV = typeof v;
    return typeOfV === 'string' || typeOfV === 'number';
};
var ValueReaction = /*#__PURE__*/function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(ValueReaction, _super);
    function ValueReaction(props) {
        var _this = _super.call(this, props) || this;
        _this.scheduleVelocityCheck = function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["b" /* onFrameEnd */])(_this.velocityCheck);
        };
        _this.velocityCheck = function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["a" /* currentFrameTime */])() !== _this.lastUpdated) {
                _this.prev = _this.current;
            }
        };
        _this.prev = _this.current = props.value || 0;
        if (isSingleValue(_this.current)) {
            _this.updateCurrent = function (v) {
                return _this.current = v;
            };
            _this.getVelocityOfCurrent = function () {
                return _this.getSingleVelocity(_this.current, _this.prev);
            };
        } else if (isValueList(_this.current)) {
            _this.updateCurrent = function (v) {
                return _this.current = v.slice();
            };
            _this.getVelocityOfCurrent = function () {
                return _this.getListVelocity();
            };
        } else {
            _this.updateCurrent = function (v) {
                _this.current = {};
                for (var key in v) {
                    if (v.hasOwnProperty(key)) {
                        _this.current[key] = v[key];
                    }
                }
            };
            _this.getVelocityOfCurrent = function () {
                return _this.getMapVelocity();
            };
        }
        if (props.initialSubscription) _this.subscribe(props.initialSubscription);
        return _this;
    }
    ValueReaction.prototype.create = function (props) {
        return new ValueReaction(props);
    };
    ValueReaction.prototype.get = function () {
        return this.current;
    };
    ValueReaction.prototype.getVelocity = function () {
        return this.getVelocityOfCurrent();
    };
    ValueReaction.prototype.update = function (v) {
        _super.prototype.update.call(this, v);
        this.prev = this.current;
        this.updateCurrent(v);
        this.timeDelta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["c" /* timeSinceLastFrame */])();
        this.lastUpdated = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["a" /* currentFrameTime */])();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["b" /* onFrameEnd */])(this.scheduleVelocityCheck);
    };
    ValueReaction.prototype.subscribe = function (observerCandidate) {
        var sub = _super.prototype.subscribe.call(this, observerCandidate);
        this.update(this.current);
        return sub;
    };
    ValueReaction.prototype.getSingleVelocity = function (current, prev) {
        return typeof current === 'number' && typeof prev === 'number' ? speedPerSecond(current - prev, this.timeDelta) : speedPerSecond(parseFloat(current) - parseFloat(prev), this.timeDelta) || 0;
    };
    ValueReaction.prototype.getListVelocity = function () {
        var _this = this;
        return this.current.map(function (c, i) {
            return _this.getSingleVelocity(c, _this.prev[i]);
        });
    };
    ValueReaction.prototype.getMapVelocity = function () {
        var velocity = {};
        for (var key in this.current) {
            if (this.current.hasOwnProperty(key)) {
                velocity[key] = this.getSingleVelocity(this.current[key], this.prev[key]);
            }
        }
        return velocity;
    };
    return ValueReaction;
}(BaseMulticast);
var value = function (value, initialSubscription) {
    return new ValueReaction({ value: value, initialSubscription: initialSubscription });
};

var multi = function (_a) {
    var getCount = _a.getCount,
        getFirst = _a.getFirst,
        getOutput = _a.getOutput,
        mapApi = _a.mapApi,
        setProp = _a.setProp,
        startActions = _a.startActions;
    return function (actions) {
        return action(function (_a) {
            var update = _a.update,
                complete = _a.complete,
                error = _a.error;
            var numActions = getCount(actions);
            var output = getOutput();
            var updateOutput = function () {
                return update(output);
            };
            var numCompletedActions = 0;
            var subs = startActions(actions, function (a, name) {
                var hasCompleted = false;
                return a.start({
                    complete: function () {
                        if (!hasCompleted) {
                            hasCompleted = true;
                            numCompletedActions++;
                            if (numCompletedActions === numActions) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(complete);
                        }
                    },
                    error: error,
                    update: function (v) {
                        setProp(output, name, v);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updateOutput, true);
                    }
                });
            });
            return Object.keys(getFirst(subs)).reduce(function (api, methodName) {
                api[methodName] = mapApi(subs, methodName);
                return api;
            }, {});
        });
    };
};

var composite = /*#__PURE__*/multi({
    getOutput: function () {
        return {};
    },
    getCount: function (subs) {
        return Object.keys(subs).length;
    },
    getFirst: function (subs) {
        return subs[Object.keys(subs)[0]];
    },
    mapApi: function (subs, methodName) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Object.keys(subs).reduce(function (output, propKey) {
                if (subs[propKey][methodName]) {
                    args[0] && args[0][propKey] !== undefined ? output[propKey] = subs[propKey][methodName](args[0][propKey]) : output[propKey] = (_a = subs[propKey])[methodName].apply(_a, args);
                }
                return output;
                var _a;
            }, {});
        };
    },
    setProp: function (output, name, v) {
        return output[name] = v;
    },
    startActions: function (actions, starter) {
        return Object.keys(actions).reduce(function (subs, key) {
            subs[key] = starter(actions[key], key);
            return subs;
        }, {});
    }
});

var parallel = /*#__PURE__*/multi({
    getOutput: function () {
        return [];
    },
    getCount: function (subs) {
        return subs.length;
    },
    getFirst: function (subs) {
        return subs[0];
    },
    mapApi: function (subs, methodName) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subs.map(function (sub, i) {
                if (sub[methodName]) {
                    return Array.isArray(args[0]) ? sub[methodName](args[0][i]) : sub[methodName].apply(sub, args);
                }
            });
        };
    },
    setProp: function (output, name, v) {
        return output[name] = v;
    },
    startActions: function (actions, starter) {
        return actions.map(function (action, i) {
            return starter(action, i);
        });
    }
});
var parallel$1 = function () {
    var actions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actions[_i] = arguments[_i];
    }
    return parallel(actions);
};

var createVectorTests = function (typeTests) {
    var testNames = Object.keys(typeTests);
    var isVectorProp = function (prop, key) {
        return prop !== undefined && !typeTests[key](prop);
    };
    var getVectorKeys = function (props) {
        return testNames.reduce(function (vectorKeys, key) {
            if (isVectorProp(props[key], key)) vectorKeys.push(key);
            return vectorKeys;
        }, []);
    };
    var testVectorProps = function (props) {
        return props && testNames.reduce(function (isVector, key) {
            return isVector || isVectorProp(props[key], key);
        }, false);
    };
    return { getVectorKeys: getVectorKeys, testVectorProps: testVectorProps };
};
var unitTypes = [__WEBPACK_IMPORTED_MODULE_2_style_value_types__["px"], __WEBPACK_IMPORTED_MODULE_2_style_value_types__["percent"], __WEBPACK_IMPORTED_MODULE_2_style_value_types__["degrees"], __WEBPACK_IMPORTED_MODULE_2_style_value_types__["vh"], __WEBPACK_IMPORTED_MODULE_2_style_value_types__["vw"]];
var findUnitType = function (prop) {
    return unitTypes.find(function (type) {
        return type.test(prop);
    });
};
var isUnitProp = function (prop) {
    return Boolean(findUnitType(prop));
};
var createAction = function (action, props) {
    return action(props);
};
var reduceArrayValue = function (i) {
    return function (props, key) {
        props[key] = props[key][i];
        return props;
    };
};
var createArrayAction = function (action, props, vectorKeys) {
    var firstVectorKey = vectorKeys[0];
    var actionList = props[firstVectorKey].map(function (v, i) {
        var childActionProps = vectorKeys.reduce(reduceArrayValue(i), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props));
        return getActionCreator(v)(action, childActionProps);
    });
    return parallel$1.apply(void 0, actionList);
};
var reduceObjectValue = function (key) {
    return function (props, propKey) {
        props[propKey] = props[propKey][key];
        return props;
    };
};
var createObjectAction = function (action, props, vectorKeys) {
    var firstVectorKey = vectorKeys[0];
    var actionMap = Object.keys(props[firstVectorKey]).reduce(function (map, key) {
        var childActionProps = vectorKeys.reduce(reduceObjectValue(key), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props));
        map[key] = getActionCreator(props[firstVectorKey][key])(action, childActionProps);
        return map;
    }, {});
    return composite(actionMap);
};
var createUnitAction = function (action, _a) {
    var from = _a.from,
        to = _a.to,
        props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["from", "to"]);
    var unitType = findUnitType(from) || findUnitType(to);
    var transform = unitType.transform,
        parse = unitType.parse;
    return action(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, { from: typeof from === 'string' ? parse(from) : from, to: typeof to === 'string' ? parse(to) : to })).pipe(transform);
};
var createColorAction = function (action, _a) {
    var from = _a.from,
        to = _a.to,
        props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["from", "to"]);
    return action(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, { from: 0, to: 1 })).pipe(blendColor(from, to), __WEBPACK_IMPORTED_MODULE_2_style_value_types__["color"].transform);
};
var createComplexAction = function (action, _a) {
    var from = _a.from,
        to = _a.to,
        props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["from", "to"]);
    var valueTemplate = __WEBPACK_IMPORTED_MODULE_2_style_value_types__["complex"].createTransformer(from);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(valueTemplate(from) === __WEBPACK_IMPORTED_MODULE_2_style_value_types__["complex"].createTransformer(to)(from), "Values '" + from + "' and '" + to + "' are of different format, or a value might have changed value type.");
    return action(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, { from: 0, to: 1 })).pipe(blendArray(__WEBPACK_IMPORTED_MODULE_2_style_value_types__["complex"].parse(from), __WEBPACK_IMPORTED_MODULE_2_style_value_types__["complex"].parse(to)), valueTemplate);
};
var createVectorAction = function (action, typeTests) {
    var _a = createVectorTests(typeTests),
        testVectorProps = _a.testVectorProps,
        getVectorKeys = _a.getVectorKeys;
    var vectorAction = function (props) {
        var isVector = testVectorProps(props);
        if (!isVector) return action(props);
        var vectorKeys = getVectorKeys(props);
        var testKey = vectorKeys[0];
        var testProp = props[testKey];
        return getActionCreator(testProp)(action, props, vectorKeys);
    };
    return vectorAction;
};
var getActionCreator = function (prop) {
    var actionCreator = createAction;
    if (typeof prop === 'number') {
        actionCreator = createAction;
    } else if (Array.isArray(prop)) {
        actionCreator = createArrayAction;
    } else if (isUnitProp(prop)) {
        actionCreator = createUnitAction;
    } else if (__WEBPACK_IMPORTED_MODULE_2_style_value_types__["color"].test(prop)) {
        actionCreator = createColorAction;
    } else if (__WEBPACK_IMPORTED_MODULE_2_style_value_types__["complex"].test(prop)) {
        actionCreator = createComplexAction;
    } else if (typeof prop === 'object') {
        actionCreator = createObjectAction;
    }
    return actionCreator;
};

var frame = function () {
    return action(function (_a) {
        var update = _a.update;
        var isActive = true;
        var startTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["e" /* currentTime */])();
        var nextFrame = function () {
            if (!isActive) return;
            update(Math.max(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["a" /* currentFrameTime */])() - startTime, 0));
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(nextFrame);
        };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(nextFrame);
        return {
            stop: function () {
                return isActive = false;
            }
        };
    });
};

var decay = function (props) {
    if (props === void 0) {
        props = {};
    }
    return action(function (_a) {
        var complete = _a.complete,
            update = _a.update;
        var _b = props.velocity,
            velocity = _b === void 0 ? 0 : _b,
            _c = props.from,
            from = _c === void 0 ? 0 : _c,
            _d = props.power,
            power = _d === void 0 ? 0.8 : _d,
            _e = props.timeConstant,
            timeConstant = _e === void 0 ? 350 : _e,
            _f = props.restDelta,
            restDelta = _f === void 0 ? 0.5 : _f,
            modifyTarget = props.modifyTarget;
        var elapsed = 0;
        var amplitude = power * velocity;
        var idealTarget = Math.round(from + amplitude);
        var target = typeof modifyTarget === 'undefined' ? idealTarget : modifyTarget(idealTarget);
        var timer = frame().start(function () {
            elapsed += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["c" /* timeSinceLastFrame */])();
            var delta = -amplitude * Math.exp(-elapsed / timeConstant);
            var isMoving = delta > restDelta || delta < -restDelta;
            var current = isMoving ? target + delta : target;
            update(current);
            if (!isMoving) {
                timer.stop();
                complete();
            }
        });
        return {
            stop: function () {
                return timer.stop();
            }
        };
    });
};
var vectorDecay = /*#__PURE__*/createVectorAction(decay, {
    from: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    modifyTarget: function (func) {
        return typeof func === 'function';
    },
    velocity: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test
});

var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var createReversedEasing = function (easing) {
    return function (p) {
        return 1 - easing(1 - p);
    };
};
var createMirroredEasing = function (easing) {
    return function (p) {
        return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    };
};
var linear = function (p) {
    return p;
};
var createExpoIn = function (power) {
    return function (p) {
        return Math.pow(p, power);
    };
};
var easeIn = /*#__PURE__*/createExpoIn(2);
var easeOut = /*#__PURE__*/createReversedEasing(easeIn);
var easeInOut = /*#__PURE__*/createMirroredEasing(easeIn);
var circIn = function (p) {
    return 1 - Math.sin(Math.acos(p));
};
var circOut = /*#__PURE__*/createReversedEasing(circIn);
var circInOut = /*#__PURE__*/createMirroredEasing(circOut);
var createBackIn = function (power) {
    return function (p) {
        return p * p * ((power + 1) * p - power);
    };
};
var backIn = /*#__PURE__*/createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = /*#__PURE__*/createReversedEasing(backIn);
var backInOut = /*#__PURE__*/createMirroredEasing(backIn);
var createAnticipateEasing = function (power) {
    var backEasing = createBackIn(power);
    return function (p) {
        return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
};
var anticipate = /*#__PURE__*/createAnticipateEasing(DEFAULT_OVERSHOOT_STRENGTH);
var NEWTON_ITERATIONS = 8;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;
var K_SPLINE_TABLE_SIZE = 11;
var K_SAMPLE_STEP_SIZE = 1.0 / (K_SPLINE_TABLE_SIZE - 1.0);
var FLOAT_32_SUPPORTED = typeof Float32Array !== 'undefined';
var a = function (a1, a2) {
    return 1.0 - 3.0 * a2 + 3.0 * a1;
};
var b = function (a1, a2) {
    return 3.0 * a2 - 6.0 * a1;
};
var c = function (a1) {
    return 3.0 * a1;
};
var getSlope = function (t, a1, a2) {
    return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
};
var calcBezier = function (t, a1, a2) {
    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};
function cubicBezier(mX1, mY1, mX2, mY2) {
    var sampleValues = FLOAT_32_SUPPORTED ? new Float32Array(K_SPLINE_TABLE_SIZE) : new Array(K_SPLINE_TABLE_SIZE);
    var _precomputed = false;
    var binarySubdivide = function (aX, aA, aB) {
        var i = 0;
        var currentX;
        var currentT;
        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            } else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
    };
    var newtonRaphsonIterate = function (aX, aGuessT) {
        var i = 0;
        var currentSlope = 0;
        var currentX;
        for (; i < NEWTON_ITERATIONS; ++i) {
            currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0) {
                return aGuessT;
            }
            currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    };
    var calcSampleValues = function () {
        for (var i = 0; i < K_SPLINE_TABLE_SIZE; ++i) {
            sampleValues[i] = calcBezier(i * K_SAMPLE_STEP_SIZE, mX1, mX2);
        }
    };
    var getTForX = function (aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = K_SPLINE_TABLE_SIZE - 1;
        var dist = 0.0;
        var guessForT = 0.0;
        var initialSlope = 0.0;
        for (; currentSample != lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += K_SAMPLE_STEP_SIZE;
        }
        --currentSample;
        dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        guessForT = intervalStart + dist * K_SAMPLE_STEP_SIZE;
        initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope === 0.0) {
            return guessForT;
        } else {
            return binarySubdivide(aX, intervalStart, intervalStart + K_SAMPLE_STEP_SIZE);
        }
    };
    var precompute = function () {
        _precomputed = true;
        if (mX1 != mY1 || mX2 != mY2) {
            calcSampleValues();
        }
    };
    var resolver = function (aX) {
        var returnValue;
        if (!_precomputed) {
            precompute();
        }
        if (mX1 === mY1 && mX2 === mY2) {
            returnValue = aX;
        } else if (aX === 0) {
            returnValue = 0;
        } else if (aX === 1) {
            returnValue = 1;
        } else {
            returnValue = calcBezier(getTForX(aX), mY1, mY2);
        }
        return returnValue;
    };
    return resolver;
}

var easing = /*#__PURE__*/Object.freeze({
    createReversedEasing: createReversedEasing,
    createMirroredEasing: createMirroredEasing,
    linear: linear,
    createExpoIn: createExpoIn,
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut,
    circIn: circIn,
    circOut: circOut,
    circInOut: circInOut,
    createBackIn: createBackIn,
    backIn: backIn,
    backOut: backOut,
    backInOut: backInOut,
    createAnticipateEasing: createAnticipateEasing,
    anticipate: anticipate,
    cubicBezier: cubicBezier
});

var scrubber = function (_a) {
    var _b = _a.from,
        from = _b === void 0 ? 0 : _b,
        _c = _a.to,
        to = _c === void 0 ? 1 : _c,
        _d = _a.ease,
        ease = _d === void 0 ? linear : _d;
    return action(function (_a) {
        var update = _a.update;
        return {
            seek: function (progress) {
                return update(progress);
            }
        };
    }).pipe(ease, function (v) {
        return getValueFromProgress(from, to, v);
    });
};
var vectorScrubber = /*#__PURE__*/createVectorAction(scrubber, {
    ease: function (func) {
        return typeof func === 'function';
    },
    from: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    to: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test
});

var clampProgress = /*#__PURE__*/clamp(0, 1);
var tween = function (props) {
    if (props === void 0) {
        props = {};
    }
    return action(function (_a) {
        var update = _a.update,
            complete = _a.complete;
        var _b = props.duration,
            duration = _b === void 0 ? 300 : _b,
            _c = props.ease,
            ease = _c === void 0 ? easeOut : _c,
            _d = props.flip,
            flip = _d === void 0 ? 0 : _d,
            _e = props.loop,
            loop = _e === void 0 ? 0 : _e,
            _f = props.yoyo,
            yoyo = _f === void 0 ? 0 : _f;
        var _g = props.from,
            from = _g === void 0 ? 0 : _g,
            _h = props.to,
            to = _h === void 0 ? 1 : _h,
            _j = props.elapsed,
            elapsed = _j === void 0 ? 0 : _j,
            _k = props.playDirection,
            playDirection = _k === void 0 ? 1 : _k,
            _l = props.flipCount,
            flipCount = _l === void 0 ? 0 : _l,
            _m = props.yoyoCount,
            yoyoCount = _m === void 0 ? 0 : _m,
            _o = props.loopCount,
            loopCount = _o === void 0 ? 0 : _o;
        var playhead = vectorScrubber({ from: from, to: to, ease: ease }).start(update);
        var progress = 0;
        var tweenTimer;
        var isActive = false;
        var reverseTween = function () {
            return playDirection *= -1;
        };
        var isTweenComplete = function () {
            var isComplete = playDirection === 1 ? isActive && elapsed >= duration : isActive && elapsed <= 0;
            if (!isComplete) return false;
            if (isComplete && !loop && !flip && !yoyo) return true;
            var isStepTaken = false;
            if (loop && loopCount < loop) {
                elapsed = 0;
                loopCount++;
                isStepTaken = true;
            } else if (flip && flipCount < flip) {
                elapsed = duration - elapsed;
                _a = [to, from], from = _a[0], to = _a[1];
                playhead = vectorScrubber({ from: from, to: to, ease: ease }).start(update);
                flipCount++;
                isStepTaken = true;
            } else if (yoyo && yoyoCount < yoyo) {
                reverseTween();
                yoyoCount++;
                isStepTaken = true;
            }
            return !isStepTaken;
            var _a;
        };
        var updateTween = function () {
            progress = clampProgress(getProgressFromValue(0, duration, elapsed));
            playhead.seek(progress);
        };
        var startTimer = function () {
            isActive = true;
            tweenTimer = frame().start(function () {
                elapsed += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["c" /* timeSinceLastFrame */])() * playDirection;
                updateTween();
                if (isTweenComplete() && complete) {
                    tweenTimer.stop();
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(complete, true);
                }
            });
        };
        var stopTimer = function () {
            isActive = false;
            if (tweenTimer) tweenTimer.stop();
        };
        startTimer();
        return {
            isActive: function () {
                return isActive;
            },
            getElapsed: function () {
                return clamp(0, duration)(elapsed);
            },
            getProgress: function () {
                return progress;
            },
            stop: function () {
                stopTimer();
            },
            pause: function () {
                stopTimer();
                return this;
            },
            resume: function () {
                startTimer();
                return this;
            },
            seek: function (newProgress) {
                elapsed = getValueFromProgress(0, duration, newProgress);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updateTween, true);
                return this;
            },
            reverse: function () {
                reverseTween();
                return this;
            }
        };
    });
};

var clampProgress$1 = /*#__PURE__*/clamp(0, 1);
var defaultEasings = function (values, easing) {
    return values.map(function () {
        return easing || easeOut;
    }).splice(0, values.length - 1);
};
var defaultTimings = function (values) {
    var numValues = values.length;
    return values.map(function (value, i) {
        return i !== 0 ? i / (numValues - 1) : 0;
    });
};
var interpolateScrubbers = function (input, scrubbers, update) {
    var rangeLength = input.length;
    var finalInputIndex = rangeLength - 1;
    var finalScrubberIndex = finalInputIndex - 1;
    var subs = scrubbers.map(function (scrub) {
        return scrub.start(update);
    });
    return function (v) {
        if (v <= input[0]) {
            subs[0].seek(0);
        }
        if (v >= input[finalInputIndex]) {
            subs[finalScrubberIndex].seek(1);
        }
        var i = 1;
        for (; i < rangeLength; i++) {
            if (input[i] > v || i === finalInputIndex) break;
        }
        var progressInRange = getProgressFromValue(input[i - 1], input[i], v);
        subs[i - 1].seek(clampProgress$1(progressInRange));
    };
};
var keyframes = function (_a) {
    var easings = _a.easings,
        _b = _a.ease,
        ease = _b === void 0 ? linear : _b,
        times = _a.times,
        values = _a.values,
        tweenProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["easings", "ease", "times", "values"]);
    easings = Array.isArray(easings) ? easings : defaultEasings(values, easings);
    times = times || defaultTimings(values);
    var scrubbers = easings.map(function (easing, i) {
        return vectorScrubber({
            from: values[i],
            to: values[i + 1],
            ease: easing
        });
    });
    return tween(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, tweenProps, { ease: ease })).applyMiddleware(function (update) {
        return interpolateScrubbers(times, scrubbers, update);
    });
};

var physics = function (props) {
    if (props === void 0) {
        props = {};
    }
    return action(function (_a) {
        var complete = _a.complete,
            update = _a.update;
        var _b = props.acceleration,
            acceleration = _b === void 0 ? 0 : _b,
            _c = props.friction,
            friction = _c === void 0 ? 0 : _c,
            _d = props.velocity,
            velocity = _d === void 0 ? 0 : _d,
            springStrength = props.springStrength,
            to = props.to;
        var _e = props.restSpeed,
            restSpeed = _e === void 0 ? 0.001 : _e,
            _f = props.from,
            from = _f === void 0 ? 0 : _f;
        var current = from;
        var timer = frame().start(function () {
            var elapsed = Math.max(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["c" /* timeSinceLastFrame */])(), 16);
            if (acceleration) velocity += speedPerFrame(acceleration, elapsed);
            if (friction) velocity *= Math.pow(1 - friction, elapsed / 100);
            if (springStrength !== undefined && to !== undefined) {
                var distanceToTarget = to - current;
                velocity += distanceToTarget * speedPerFrame(springStrength, elapsed);
            }
            current += speedPerFrame(velocity, elapsed);
            update(current);
            var isComplete = restSpeed !== false && (!velocity || Math.abs(velocity) <= restSpeed);
            if (isComplete) {
                timer.stop();
                complete();
            }
        });
        return {
            set: function (v) {
                current = v;
                return this;
            },
            setAcceleration: function (v) {
                acceleration = v;
                return this;
            },
            setFriction: function (v) {
                friction = v;
                return this;
            },
            setSpringStrength: function (v) {
                springStrength = v;
                return this;
            },
            setSpringTarget: function (v) {
                to = v;
                return this;
            },
            setVelocity: function (v) {
                velocity = v;
                return this;
            },
            stop: function () {
                return timer.stop();
            }
        };
    });
};
var vectorPhysics = /*#__PURE__*/createVectorAction(physics, {
    acceleration: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    friction: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    velocity: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    from: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    to: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    springStrength: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test
});

var spring = function (props) {
    if (props === void 0) {
        props = {};
    }
    return action(function (_a) {
        var update = _a.update,
            complete = _a.complete;
        var _b = props.velocity,
            velocity = _b === void 0 ? 0.0 : _b;
        var _c = props.from,
            from = _c === void 0 ? 0.0 : _c,
            _d = props.to,
            to = _d === void 0 ? 0.0 : _d,
            _e = props.stiffness,
            stiffness = _e === void 0 ? 100 : _e,
            _f = props.damping,
            damping = _f === void 0 ? 10 : _f,
            _g = props.mass,
            mass = _g === void 0 ? 1.0 : _g,
            _h = props.restSpeed,
            restSpeed = _h === void 0 ? 0.01 : _h,
            _j = props.restDelta,
            restDelta = _j === void 0 ? 0.01 : _j;
        var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
        var t = 0;
        var delta = to - from;
        var position = from;
        var prevPosition = position;
        var springTimer = frame().start(function () {
            var timeDelta = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["c" /* timeSinceLastFrame */])();
            t += timeDelta;
            var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
            var angularFreq = Math.sqrt(stiffness / mass) / 1000;
            prevPosition = position;
            if (dampingRatio < 1) {
                var envelope = Math.exp(-dampingRatio * angularFreq * t);
                var expoDecay = angularFreq * Math.sqrt(1.0 - dampingRatio * dampingRatio);
                position = to - envelope * ((initialVelocity + dampingRatio * angularFreq * delta) / expoDecay * Math.sin(expoDecay * t) + delta * Math.cos(expoDecay * t));
            } else {
                var envelope = Math.exp(-angularFreq * t);
                position = to - envelope * (delta + (initialVelocity + angularFreq * delta) * t);
            }
            velocity = speedPerSecond(position - prevPosition, timeDelta);
            var isBelowVelocityThreshold = Math.abs(velocity) <= restSpeed;
            var isBelowDisplacementThreshold = Math.abs(to - position) <= restDelta;
            if (isBelowVelocityThreshold && isBelowDisplacementThreshold) {
                position = to;
                update(position);
                springTimer.stop();
                complete();
            } else {
                update(position);
            }
        });
        return {
            stop: function () {
                return springTimer.stop();
            }
        };
    });
};
var vectorSpring = /*#__PURE__*/createVectorAction(spring, {
    from: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    to: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    stiffness: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    damping: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    mass: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test,
    velocity: __WEBPACK_IMPORTED_MODULE_2_style_value_types__["number"].test
});

var DEFAULT_DURATION = 300;
var flattenTimings = function (instructions) {
    var flatInstructions = [];
    var lastArg = instructions[instructions.length - 1];
    var isStaggered = typeof lastArg === 'number';
    var staggerDelay = isStaggered ? lastArg : 0;
    var segments = isStaggered ? instructions.slice(0, -1) : instructions;
    var numSegments = segments.length;
    var offset = 0;
    segments.forEach(function (item, i) {
        flatInstructions.push(item);
        if (i !== numSegments - 1) {
            var duration = item.duration || DEFAULT_DURATION;
            offset += staggerDelay;
            flatInstructions.push("-" + (duration - offset));
        }
    });
    return flatInstructions;
};
var flattenArrayInstructions = function (instructions, instruction) {
    Array.isArray(instruction) ? instructions.push.apply(instructions, flattenTimings(instruction)) : instructions.push(instruction);
    return instructions;
};
var convertDefToProps = function (props, def, i) {
    var duration = props.duration,
        easings = props.easings,
        times = props.times,
        values = props.values;
    var numValues = values.length;
    var prevTimeTo = times[numValues - 1];
    var timeFrom = def.at === 0 ? 0 : def.at / duration;
    var timeTo = (def.at + def.duration) / duration;
    if (i === 0) {
        values.push(def.from);
        times.push(timeFrom);
    } else {
        if (prevTimeTo !== timeFrom) {
            if (def.from !== undefined) {
                values.push(values[numValues - 1]);
                times.push(timeFrom);
                easings.push(linear);
            }
            var from = def.from !== undefined ? def.from : values[numValues - 1];
            values.push(from);
            times.push(timeFrom);
            easings.push(linear);
        } else if (def.from !== undefined) {
            values.push(def.from);
            times.push(timeFrom);
            easings.push(linear);
        }
    }
    values.push(def.to);
    times.push(timeTo);
    easings.push(def.ease || easeInOut);
    return props;
};
var timeline = function (instructions, _a) {
    var _b = _a === void 0 ? {} : _a,
        duration = _b.duration,
        elapsed = _b.elapsed,
        ease = _b.ease,
        loop = _b.loop,
        flip = _b.flip,
        yoyo = _b.yoyo;
    var playhead = 0;
    var calculatedDuration = 0;
    var flatInstructions = instructions.reduce(flattenArrayInstructions, []);
    var animationDefs = [];
    flatInstructions.forEach(function (instruction) {
        if (typeof instruction === 'string') {
            playhead += parseFloat(instruction);
        } else if (typeof instruction === 'number') {
            playhead = instruction;
        } else {
            var def = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, instruction, { at: playhead });
            def.duration = def.duration === undefined ? DEFAULT_DURATION : def.duration;
            animationDefs.push(def);
            playhead += def.duration;
            calculatedDuration = Math.max(calculatedDuration, def.at + def.duration);
        }
    });
    var tracks = {};
    var numDefs = animationDefs.length;
    for (var i = 0; i < numDefs; i++) {
        var def = animationDefs[i];
        var track = def.track;
        if (track === undefined) {
            throw new Error('No track defined');
        }
        if (!tracks.hasOwnProperty(track)) tracks[track] = [];
        tracks[track].push(def);
    }
    var trackKeyframes = {};
    for (var key in tracks) {
        if (tracks.hasOwnProperty(key)) {
            var keyframeProps = tracks[key].reduce(convertDefToProps, {
                duration: calculatedDuration,
                easings: [],
                times: [],
                values: []
            });
            trackKeyframes[key] = keyframes(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, keyframeProps, { duration: duration || calculatedDuration, ease: ease,
                elapsed: elapsed,
                loop: loop,
                yoyo: yoyo,
                flip: flip }));
        }
    }
    return composite(trackKeyframes);
};

var listen = function (element, events, options) {
    return action(function (_a) {
        var update = _a.update;
        var eventNames = events.split(' ').map(function (eventName) {
            element.addEventListener(eventName, update, options);
            return eventName;
        });
        return {
            stop: function () {
                return eventNames.forEach(function (eventName) {
                    return element.removeEventListener(eventName, update, options);
                });
            }
        };
    });
};

var defaultPointerPos = function () {
    return {
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        x: 0,
        y: 0
    };
};
var eventToPoint = function (e, point) {
    if (point === void 0) {
        point = defaultPointerPos();
    }
    point.clientX = point.x = e.clientX;
    point.clientY = point.y = e.clientY;
    point.pageX = e.pageX;
    point.pageY = e.pageY;
    return point;
};

var points = [/*#__PURE__*/defaultPointerPos()];
var isTouchDevice = false;
if (typeof document !== 'undefined') {
    var updatePointsLocation = function (_a) {
        var touches = _a.touches;
        isTouchDevice = true;
        var numTouches = touches.length;
        points.length = 0;
        for (var i = 0; i < numTouches; i++) {
            var thisTouch = touches[i];
            points.push(eventToPoint(thisTouch));
        }
    };
    listen(document, 'touchstart touchmove', true).start(updatePointsLocation);
}
var multitouch = function (_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.preventDefault,
        preventDefault = _c === void 0 ? true : _c,
        _d = _b.scale,
        scale = _d === void 0 ? 1.0 : _d,
        _e = _b.rotate,
        rotate = _e === void 0 ? 0.0 : _e;
    return action(function (_a) {
        var update = _a.update;
        var output = {
            touches: points,
            scale: scale,
            rotate: rotate
        };
        var initialDistance = 0.0;
        var initialRotation = 0.0;
        var isGesture = points.length > 1;
        if (isGesture) {
            var firstTouch = points[0],
                secondTouch = points[1];
            initialDistance = distance(firstTouch, secondTouch);
            initialRotation = angle(firstTouch, secondTouch);
        }
        var updatePoint = function () {
            if (isGesture) {
                var firstTouch = points[0],
                    secondTouch = points[1];
                var newDistance = distance(firstTouch, secondTouch);
                var newRotation = angle(firstTouch, secondTouch);
                output.scale = scale * (newDistance / initialDistance);
                output.rotate = rotate + (newRotation - initialRotation);
            }
            update(output);
        };
        var onMove = function (e) {
            if (preventDefault || e.touches.length > 1) e.preventDefault();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updatePoint);
        };
        var updateOnMove = listen(document, 'touchmove', { passive: !preventDefault }).start(onMove);
        if (isTouchDevice) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updatePoint);
        return {
            stop: function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["f" /* cancelOnFrameUpdate */])(updatePoint);
                updateOnMove.stop();
            }
        };
    });
};
var getIsTouchDevice = function () {
    return isTouchDevice;
};

var point = /*#__PURE__*/defaultPointerPos();
var isMouseDevice = false;
if (typeof document !== 'undefined') {
    var updatePointLocation = function (e) {
        isMouseDevice = true;
        eventToPoint(e, point);
    };
    listen(document, 'mousedown mousemove', true).start(updatePointLocation);
}
var mouse = function (_a) {
    var _b = (_a === void 0 ? {} : _a).preventDefault,
        preventDefault = _b === void 0 ? true : _b;
    return action(function (_a) {
        var update = _a.update;
        var updatePoint = function () {
            return update(point);
        };
        var onMove = function (e) {
            if (preventDefault) e.preventDefault();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updatePoint);
        };
        var updateOnMove = listen(document, 'mousemove').start(onMove);
        if (isMouseDevice) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["d" /* onFrameUpdate */])(updatePoint);
        return {
            stop: function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_framesync__["f" /* cancelOnFrameUpdate */])(updatePoint);
                updateOnMove.stop();
            }
        };
    });
};

var getFirstTouch = function (_a) {
    var firstTouch = _a[0];
    return firstTouch;
};
var pointer = function (props) {
    if (props === void 0) {
        props = {};
    }
    return getIsTouchDevice() ? multitouch(props).pipe(function (_a) {
        var touches = _a.touches;
        return touches;
    }, getFirstTouch) : mouse(props);
};
var index = function (_a) {
    if (_a === void 0) {
        _a = {};
    }
    var x = _a.x,
        y = _a.y,
        props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["x", "y"]);
    if (x !== undefined || y !== undefined) {
        var applyXOffset_1 = applyOffset(x || 0);
        var applyYOffset_1 = applyOffset(y || 0);
        var delta_1 = { x: 0, y: 0 };
        return pointer(props).pipe(function (point) {
            delta_1.x = applyXOffset_1(point.x);
            delta_1.y = applyYOffset_1(point.y);
            return delta_1;
        });
    } else {
        return pointer(props);
    }
};

var chain = function () {
    var actions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actions[_i] = arguments[_i];
    }
    return action(function (_a) {
        var update = _a.update,
            complete = _a.complete;
        var i = 0;
        var current;
        var playCurrent = function () {
            current = actions[i].start({
                complete: function () {
                    i++;
                    i >= actions.length ? complete() : playCurrent();
                },
                update: update
            });
        };
        playCurrent();
        return {
            stop: function () {
                return current && current.stop();
            }
        };
    });
};

var crossfade = function (a, b) {
    return action(function (observer) {
        var balance = 0;
        var fadable = parallel$1(a, b).start(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, observer, { update: function (_a) {
                var va = _a[0],
                    vb = _a[1];
                observer.update(getValueFromProgress(va, vb, balance));
            } }));
        return {
            setBalance: function (v) {
                return balance = v;
            },
            stop: function () {
                return fadable.stop();
            }
        };
    });
};

var delay = function (timeToDelay) {
    return action(function (_a) {
        var complete = _a.complete;
        var timeout = setTimeout(complete, timeToDelay);
        return {
            stop: function () {
                return clearTimeout(timeout);
            }
        };
    });
};

var merge = function () {
    var actions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actions[_i] = arguments[_i];
    }
    return action(function (observer) {
        var subs = actions.map(function (thisAction) {
            return thisAction.start(observer);
        });
        return {
            stop: function () {
                return subs.forEach(function (sub) {
                    return sub.stop();
                });
            }
        };
    });
};

var schedule = function (scheduler, schedulee) {
    return action(function (_a) {
        var update = _a.update,
            complete = _a.complete;
        var latest;
        var schedulerSub = scheduler.start({
            update: function () {
                return latest !== undefined && update(latest);
            },
            complete: complete
        });
        var scheduleeSub = schedulee.start({
            update: function (v) {
                return latest = v;
            },
            complete: complete
        });
        return {
            stop: function () {
                schedulerSub.stop();
                scheduleeSub.stop();
            }
        };
    });
};

var stagger = function (actions, interval) {
    var intervalIsNumber = typeof interval === 'number';
    var actionsWithDelay = actions.map(function (a, i) {
        var timeToDelay = intervalIsNumber ? interval * i : interval(i);
        return chain(delay(timeToDelay), a);
    });
    return parallel$1.apply(void 0, actionsWithDelay);
};

var css = function (element, props) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["b" /* warning */])(false, 'css() is deprecated, use styler instead');
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_stylefire__["a" /* default */])(element, props);
};
var svg = function (element, props) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["b" /* warning */])(false, 'svg() is deprecated, use styler instead');
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_stylefire__["a" /* default */])(element, props);
};




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return currentTime; });
/* unused harmony export onFrameStart */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return onFrameUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return onFrameRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return onFrameEnd; });
/* unused harmony export cancelOnFrameStart */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return cancelOnFrameUpdate; });
/* unused harmony export cancelOnFrameRender */
/* unused harmony export cancelOnFrameEnd */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return timeSinceLastFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return currentFrameTime; });
var hasRAF = typeof window !== 'undefined' && window.requestAnimationFrame !== undefined;
var prevTime = 0;
var onNextFrame = hasRAF
    ? function (callback) { return window.requestAnimationFrame(callback); }
    : function (callback) {
        var currentTime = Date.now();
        var timeToCall = Math.max(0, 16.7 - (currentTime - prevTime));
        prevTime = currentTime + timeToCall;
        setTimeout(function () { return callback(prevTime); }, timeToCall);
    };

function createRenderStep(startRenderLoop) {
    var functionsToRun = [];
    var functionsToRunNextFrame = [];
    var numThisFrame = 0;
    var isProcessing = false;
    var i = 0;
    return {
        cancel: function (callback) {
            var indexOfCallback = functionsToRunNextFrame.indexOf(callback);
            if (indexOfCallback !== -1) {
                functionsToRunNextFrame.splice(indexOfCallback, 1);
            }
        },
        process: function () {
            isProcessing = true;
            _a = [functionsToRunNextFrame, functionsToRun], functionsToRun = _a[0], functionsToRunNextFrame = _a[1];
            functionsToRunNextFrame.length = 0;
            numThisFrame = functionsToRun.length;
            for (i = 0; i < numThisFrame; i++) {
                functionsToRun[i]();
            }
            isProcessing = false;
            var _a;
        },
        schedule: function (callback, immediate) {
            if (immediate === void 0) { immediate = false; }
            startRenderLoop();
            var addToCurrentBuffer = immediate && isProcessing;
            var buffer = addToCurrentBuffer ? functionsToRun : functionsToRunNextFrame;
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentBuffer) {
                    numThisFrame = functionsToRun.length;
                }
            }
        },
    };
}

var HAS_PERFORMANCE_NOW = typeof performance !== 'undefined' && performance.now !== undefined;
var currentTime = HAS_PERFORMANCE_NOW ? function () { return performance.now(); } : function () { return Date.now(); };
var willRenderNextFrame = false;
var MAX_ELAPSED = 40;
var defaultElapsed = 16.7;
var useDefaultElapsed = true;
var currentFramestamp = 0;
var elapsed = 0;
function startRenderLoop() {
    if (willRenderNextFrame)
        return;
    willRenderNextFrame = true;
    useDefaultElapsed = true;
    onNextFrame(processFrame);
}
var frameStart = createRenderStep(startRenderLoop);
var frameUpdate = createRenderStep(startRenderLoop);
var frameRender = createRenderStep(startRenderLoop);
var frameEnd = createRenderStep(startRenderLoop);
function processFrame(framestamp) {
    willRenderNextFrame = false;
    elapsed = useDefaultElapsed
        ? defaultElapsed
        : Math.max(Math.min(framestamp - currentFramestamp, MAX_ELAPSED), 1);
    if (!useDefaultElapsed)
        defaultElapsed = elapsed;
    currentFramestamp = framestamp;
    frameStart.process();
    frameUpdate.process();
    frameRender.process();
    frameEnd.process();
    if (willRenderNextFrame)
        useDefaultElapsed = false;
}
var onFrameStart = frameStart.schedule;
var onFrameUpdate = frameUpdate.schedule;
var onFrameRender = frameRender.schedule;
var onFrameEnd = frameEnd.schedule;
var cancelOnFrameStart = frameStart.cancel;
var cancelOnFrameUpdate = frameUpdate.cancel;
var cancelOnFrameRender = frameRender.cancel;
var cancelOnFrameEnd = frameEnd.cancel;
var timeSinceLastFrame = function () { return elapsed; };
var currentFrameTime = function () { return currentFramestamp; };




/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(24)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(23)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createStylerFactory */
/* unused harmony export buildStyles */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_framesync__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_value_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hey_listen__ = __webpack_require__(1);





var createStyler = function (_a) {
    var onRead = _a.onRead,
        onRender = _a.onRender,
        _b = _a.aliasMap,
        aliasMap = _b === void 0 ? {} : _b,
        _c = _a.useCache,
        useCache = _c === void 0 ? true : _c;
    return function (props) {
        var state = {};
        var changedValues = [];
        var hasChanged = false;
        var setValue = function (unmappedKey, value) {
            var key = aliasMap[unmappedKey] || unmappedKey;
            var currentValue = state[key];
            state[key] = value;
            if (state[key] !== currentValue) {
                if (changedValues.indexOf(key) === -1) {
                    changedValues.push(key);
                }
                if (!hasChanged) {
                    hasChanged = true;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_framesync__["g" /* onFrameRender */])(render);
                }
            }
        };
        function render(forceRender) {
            if (forceRender === void 0) {
                forceRender = false;
            }
            if (forceRender || hasChanged) {
                onRender(state, props, changedValues);
                hasChanged = false;
                changedValues.length = 0;
            }
            return this;
        }
        return {
            get: function (unmappedKey) {
                var key = aliasMap[unmappedKey] || unmappedKey;
                return key ? useCache && state[key] !== undefined ? state[key] : onRead(key, props) : state;
            },
            set: function (values, value) {
                if (typeof values === 'string') {
                    if (value !== undefined) {
                        setValue(values, value);
                    } else {
                        return function (v) {
                            return setValue(values, v);
                        };
                    }
                } else {
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            setValue(key, values[key]);
                        }
                    }
                }
                return this;
            },
            render: render
        };
    };
};

var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = '$1-$2';
var camelToDash = function (str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};
var setDomAttrs = function (element, attrs) {
    for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
            element.setAttribute(key, attrs[key]);
        }
    }
};

var camelCache = /*#__PURE__*/new Map();
var dashCache = /*#__PURE__*/new Map();
var prefixes = ['Webkit', 'Moz', 'O', 'ms', ''];
var numPrefixes = prefixes.length;
var testElement;
var testPrefix = function (key) {
    if (typeof document === 'undefined') return;
    testElement = testElement || document.createElement('div');
    for (var i = 0; i < numPrefixes; i++) {
        var prefix = prefixes[i];
        var noPrefix = prefix === '';
        var prefixedPropertyName = noPrefix ? key : prefix + key.charAt(0).toUpperCase() + key.slice(1);
        if (prefixedPropertyName in testElement.style) {
            camelCache.set(key, prefixedPropertyName);
            dashCache.set(key, "" + (noPrefix ? '' : '-') + camelToDash(prefixedPropertyName));
        }
    }
};
var prefixer = function (key, asDashCase) {
    if (asDashCase === void 0) {
        asDashCase = false;
    }
    var cache = asDashCase ? dashCache : camelCache;
    if (!cache.has(key)) testPrefix(key);
    return cache.get(key) || key;
};

var axes = ['', 'X', 'Y', 'Z'];
var order = ['translate', 'scale', 'rotate', 'skew', 'transformPerspective'];
var TRANSFORM_ORIGIN_X = 'transformOriginX';
var TRANSFORM_ORIGIN_Y = 'transformOriginY';
var transformProps = /*#__PURE__*/order.reduce(function (acc, key) {
    return axes.reduce(function (axesAcc, axesKey) {
        axesAcc.push(key + axesKey);
        return axesAcc;
    }, acc);
}, ['x', 'y', 'z']);
var transformPropDictionary = /*#__PURE__*/transformProps.reduce(function (dict, key) {
    dict[key] = true;
    return dict;
}, {});
var isTransformProp = function (key) {
    return transformPropDictionary[key] === true;
};
var sortTransformProps = function (a, b) {
    return transformProps.indexOf(a) - transformProps.indexOf(b);
};
var isTransformOriginProp = function (key) {
    return key === TRANSFORM_ORIGIN_X || key === TRANSFORM_ORIGIN_Y;
};

var valueTypes = {
    color: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    backgroundColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    outlineColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    fill: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    stroke: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderTopColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderRightColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderBottomColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderLeftColor: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    borderRadius: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    width: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    maxWidth: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    height: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    maxHeight: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    top: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    left: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    bottom: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    right: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    rotate: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    rotateX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    rotateY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    rotateZ: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    scale: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    scaleX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    scaleY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    scaleZ: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    skewX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    skewY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"],
    distance: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    translateX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    translateY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    translateZ: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    perspective: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"],
    opacity: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["alpha"],
    transformOriginX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["percent"],
    transformOriginY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["percent"],
    transformOriginZ: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"]
};
var getValueType = function (key) {
    return valueTypes[key];
};

var aliasMap = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    originX: 'transformOriginX',
    originY: 'transformOriginY',
    originZ: 'transformOriginZ'
};
var NUMBER = 'number';
var OBJECT = 'object';
var COLON = ':';
var SEMI_COLON = ';';
var TRANSFORM_ORIGIN = 'transform-origin';
var TRANSFORM = 'transform';
var TRANSLATE_Z = 'translateZ';
var TRANSFORM_NONE = ';transform: none';
var styleRule = function (key, value) {
    return "" + SEMI_COLON + key + COLON + value;
};
function buildStylePropertyString(state, changedValues, enableHardwareAcceleration, blacklist) {
    if (changedValues === void 0) {
        changedValues = true;
    }
    if (enableHardwareAcceleration === void 0) {
        enableHardwareAcceleration = true;
    }
    var valuesToChange = changedValues === true ? Object.keys(state) : changedValues;
    var propertyString = '';
    var transformString = '';
    var hasTransformOrigin = false;
    var transformIsDefault = true;
    var hasTransform = false;
    var transformHasZ = false;
    var numChangedValues = valuesToChange.length;
    for (var i = 0; i < numChangedValues; i++) {
        var key = valuesToChange[i];
        if (isTransformProp(key)) {
            hasTransform = true;
            for (var stateKey in state) {
                if (isTransformProp(stateKey) && valuesToChange.indexOf(stateKey) === -1) {
                    valuesToChange.push(stateKey);
                }
            }
            break;
        }
    }
    valuesToChange.sort(sortTransformProps);
    var totalNumChangedValues = valuesToChange.length;
    for (var i = 0; i < totalNumChangedValues; i++) {
        var key = valuesToChange[i];
        if (blacklist.has(key)) continue;
        var isTransformKey = isTransformProp(key);
        var value = state[key];
        var valueType = getValueType(key);
        if (isTransformKey) {
            if (valueType.default && value !== valueType.default || !valueType.default && value !== 0) {
                transformIsDefault = false;
            }
        }
        if (valueType && (typeof value === NUMBER || typeof value === OBJECT) && valueType.transform) {
            value = valueType.transform(value);
        }
        if (isTransformKey) {
            transformString += key + '(' + value + ') ';
            transformHasZ = key === TRANSLATE_Z ? true : transformHasZ;
        } else if (isTransformOriginProp(key)) {
            state[key] = value;
            hasTransformOrigin = true;
        } else {
            propertyString += styleRule(prefixer(key, true), value);
        }
    }
    if (hasTransformOrigin) {
        propertyString += styleRule(TRANSFORM_ORIGIN, (state.transformOriginX || 0) + " " + (state.transformOriginY || 0) + " " + (state.transformOriginZ || 0));
    }
    if (hasTransform) {
        if (!transformHasZ && enableHardwareAcceleration) {
            transformString += TRANSLATE_Z + "(0)";
        }
        propertyString += styleRule(TRANSFORM, transformIsDefault ? TRANSFORM_NONE : transformString);
    }
    return propertyString;
}

var SCROLL_LEFT = 'scrollLeft';
var SCROLL_TOP = 'scrollTop';
var scrollValues = /*#__PURE__*/new Set([SCROLL_LEFT, SCROLL_TOP]);
var cssStyler = /*#__PURE__*/createStyler({
    onRead: function (key, _a) {
        var element = _a.element,
            preparseOutput = _a.preparseOutput;
        var valueType = getValueType(key);
        if (isTransformProp(key)) {
            return valueType ? valueType.default || 0 : 0;
        } else if (scrollValues.has(key)) {
            return element[key];
        } else {
            var domValue = window.getComputedStyle(element, null).getPropertyValue(prefixer(key, true)) || 0;
            return preparseOutput && valueType && valueType.parse ? valueType.parse(domValue) : domValue;
        }
    },
    onRender: function (state, _a, changedValues) {
        var element = _a.element,
            enableHardwareAcceleration = _a.enableHardwareAcceleration;
        element.style.cssText += buildStylePropertyString(state, changedValues, enableHardwareAcceleration, scrollValues);
        if (changedValues.indexOf(SCROLL_LEFT) !== -1) element.scrollLeft = state.scrollLeft;
        if (changedValues.indexOf(SCROLL_TOP) !== -1) element.scrollTop = state.scrollTop;
    },
    aliasMap: aliasMap,
    uncachedValues: scrollValues
});
var css = function (element, props) {
    return cssStyler(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_tslib__["a" /* __assign */])({ element: element, enableHardwareAcceleration: true, preparseOutput: true }, props));
};

var ZERO_NOT_ZERO = 0.0000001;
var percentToPixels = function (percent$$1, length) {
    return percent$$1 / 100 * length + 'px';
};
var build = function (state, dimensions, isPath, pathLength) {
    var hasTransform = false;
    var hasDashArray = false;
    var props = {};
    var dashArrayStyles = isPath ? {
        pathLength: '0',
        pathSpacing: "" + pathLength
    } : undefined;
    var scale$$1 = state.scale !== undefined ? state.scale || ZERO_NOT_ZERO : state.scaleX || 1;
    var scaleY = state.scaleY !== undefined ? state.scaleY || ZERO_NOT_ZERO : scale$$1 || 1;
    var transformOriginX = dimensions.width * ((state.originX || 50) / 100) + dimensions.x;
    var transformOriginY = dimensions.height * ((state.originY || 50) / 100) + dimensions.y;
    var scaleTransformX = -transformOriginX * (scale$$1 * 1);
    var scaleTransformY = -transformOriginY * (scaleY * 1);
    var scaleReplaceX = transformOriginX / scale$$1;
    var scaleReplaceY = transformOriginY / scaleY;
    var transform = {
        translate: "translate(" + state.translateX + ", " + state.translateY + ") ",
        scale: "translate(" + scaleTransformX + ", " + scaleTransformY + ") scale(" + scale$$1 + ", " + scaleY + ") translate(" + scaleReplaceX + ", " + scaleReplaceY + ") ",
        rotate: "rotate(" + state.rotate + ", " + transformOriginX + ", " + transformOriginY + ") ",
        skewX: "skewX(" + state.skewX + ") ",
        skewY: "skewY(" + state.skewY + ") "
    };
    for (var key in state) {
        if (state.hasOwnProperty(key)) {
            var value = state[key];
            if (isTransformProp(key)) {
                hasTransform = true;
            } else if (isPath && (key === 'pathLength' || key === 'pathSpacing') && typeof value === 'number') {
                hasDashArray = true;
                dashArrayStyles[key] = percentToPixels(value, pathLength);
            } else if (isPath && key === 'pathOffset') {
                props['stroke-dashoffset'] = percentToPixels(-value, pathLength);
            } else {
                props[camelToDash(key)] = value;
            }
        }
    }
    if (hasDashArray) {
        props['stroke-dasharray'] = dashArrayStyles.pathLength + ' ' + dashArrayStyles.pathSpacing;
    }
    if (hasTransform) {
        props.transform = '';
        for (var key in transform) {
            if (transform.hasOwnProperty(key)) {
                var defaultValue = key === 'scale' ? '1' : '0';
                props.transform += transform[key].replace(/undefined/g, defaultValue);
            }
        }
    }
    return props;
};

var valueTypes$1 = {
    fill: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    stroke: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["color"],
    scale: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    scaleX: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    scaleY: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["scale"],
    opacity: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["alpha"],
    fillOpacity: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["alpha"],
    strokeOpacity: __WEBPACK_IMPORTED_MODULE_1_style_value_types__["alpha"]
};
var getValueType$1 = function (key) {
    return valueTypes$1[key];
};

var svgStyler = /*#__PURE__*/createStyler({
    onRead: function (key, _a) {
        var element = _a.element;
        if (!isTransformProp(key)) {
            return element.getAttribute(key);
        } else {
            var valueType = getValueType$1(key);
            return valueType ? valueType.default : 0;
        }
    },
    onRender: function (state, _a, changedValues) {
        var dimensions = _a.dimensions,
            element = _a.element,
            isPath = _a.isPath,
            pathLength = _a.pathLength;
        setDomAttrs(element, build(state, dimensions, isPath, pathLength));
    },
    aliasMap: {
        x: 'translateX',
        y: 'translateY',
        background: 'fill'
    }
});
var svg = function (element) {
    var _a = element.getBBox(),
        x = _a.x,
        y = _a.y,
        width = _a.width,
        height = _a.height;
    var props = {
        element: element,
        dimensions: { x: x, y: y, width: width, height: height },
        isPath: false
    };
    if (element.tagName === 'path') {
        props.isPath = true;
        props.pathLength = element.getTotalLength();
    }
    return svgStyler(props);
};

var viewport = /*#__PURE__*/createStyler({
    useCache: false,
    onRead: function (key) {
        return key === 'scrollTop' ? window.pageYOffset : window.pageXOffset;
    },
    onRender: function (_a) {
        var _b = _a.scrollTop,
            scrollTop = _b === void 0 ? 0 : _b,
            _c = _a.scrollLeft,
            scrollLeft = _c === void 0 ? 0 : _c;
        return window.scrollTo(scrollLeft, scrollTop);
    }
});

var cache = /*#__PURE__*/new WeakMap();
var createDOMStyler = function (node, props) {
    var styler;
    if (node instanceof HTMLElement) {
        styler = css(node, props);
    } else if (node instanceof SVGElement) {
        styler = svg(node);
    } else if (typeof window !== 'undefined' && node === window) {
        styler = viewport(node);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(styler !== undefined, 'No valid node provided. Node must be HTMLElement, SVGElement or window.');
    cache.set(node, styler);
    return styler;
};
var getStyler = function (node, props) {
    return cache.has(node) ? cache.get(node) : createDOMStyler(node, props);
};
function index(nodeOrSelector, props) {
    var node = typeof nodeOrSelector === 'string' ? document.querySelector(nodeOrSelector) : nodeOrSelector;
    return getStyler(node, props);
}

/* harmony default export */ __webpack_exports__["a"] = (index);



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/*!\r\n * Hover.css (http://ianlunn.github.io/Hover/)\r\n * Version: 2.3.2\r\n * Author: Ian Lunn @IanLunn\r\n * Author URL: http://ianlunn.co.uk/\r\n * Github: https://github.com/IanLunn/Hover\r\n\r\n * Hover.css Copyright Ian Lunn 2017. Generated with Sass.\r\n */\r\n/* 2D TRANSITIONS */\r\n/* Grow */\r\n.hvr-grow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {\r\n  -webkit-transform: scale(1.1);\r\n  transform: scale(1.1);\r\n}\r\n\r\n/* Shrink */\r\n.hvr-shrink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-shrink:hover, .hvr-shrink:focus, .hvr-shrink:active {\r\n  -webkit-transform: scale(0.9);\r\n  transform: scale(0.9);\r\n}\r\n\r\n/* Pulse */\r\n@-webkit-keyframes hvr-pulse {\r\n  25% {\r\n    -webkit-transform: scale(1.1);\r\n    transform: scale(1.1);\r\n  }\r\n  75% {\r\n    -webkit-transform: scale(0.9);\r\n    transform: scale(0.9);\r\n  }\r\n}\r\n@keyframes hvr-pulse {\r\n  25% {\r\n    -webkit-transform: scale(1.1);\r\n    transform: scale(1.1);\r\n  }\r\n  75% {\r\n    -webkit-transform: scale(0.9);\r\n    transform: scale(0.9);\r\n  }\r\n}\r\n.hvr-pulse {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-pulse:hover, .hvr-pulse:focus, .hvr-pulse:active {\r\n  -webkit-animation-name: hvr-pulse;\r\n  animation-name: hvr-pulse;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n/* Pulse Grow */\r\n@-webkit-keyframes hvr-pulse-grow {\r\n  to {\r\n    -webkit-transform: scale(1.1);\r\n    transform: scale(1.1);\r\n  }\r\n}\r\n@keyframes hvr-pulse-grow {\r\n  to {\r\n    -webkit-transform: scale(1.1);\r\n    transform: scale(1.1);\r\n  }\r\n}\r\n.hvr-pulse-grow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-pulse-grow:hover, .hvr-pulse-grow:focus, .hvr-pulse-grow:active {\r\n  -webkit-animation-name: hvr-pulse-grow;\r\n  animation-name: hvr-pulse-grow;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\r\n  animation-direction: alternate;\r\n}\r\n\r\n/* Pulse Shrink */\r\n@-webkit-keyframes hvr-pulse-shrink {\r\n  to {\r\n    -webkit-transform: scale(0.9);\r\n    transform: scale(0.9);\r\n  }\r\n}\r\n@keyframes hvr-pulse-shrink {\r\n  to {\r\n    -webkit-transform: scale(0.9);\r\n    transform: scale(0.9);\r\n  }\r\n}\r\n.hvr-pulse-shrink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-pulse-shrink:hover, .hvr-pulse-shrink:focus, .hvr-pulse-shrink:active {\r\n  -webkit-animation-name: hvr-pulse-shrink;\r\n  animation-name: hvr-pulse-shrink;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\r\n  animation-direction: alternate;\r\n}\r\n\r\n/* Push */\r\n@-webkit-keyframes hvr-push {\r\n  50% {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n  100% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n@keyframes hvr-push {\r\n  50% {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n  100% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n.hvr-push {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-push:hover, .hvr-push:focus, .hvr-push:active {\r\n  -webkit-animation-name: hvr-push;\r\n  animation-name: hvr-push;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Pop */\r\n@-webkit-keyframes hvr-pop {\r\n  50% {\r\n    -webkit-transform: scale(1.2);\r\n    transform: scale(1.2);\r\n  }\r\n}\r\n@keyframes hvr-pop {\r\n  50% {\r\n    -webkit-transform: scale(1.2);\r\n    transform: scale(1.2);\r\n  }\r\n}\r\n.hvr-pop {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-pop:hover, .hvr-pop:focus, .hvr-pop:active {\r\n  -webkit-animation-name: hvr-pop;\r\n  animation-name: hvr-pop;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Bounce In */\r\n.hvr-bounce-in {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-in:hover, .hvr-bounce-in:focus, .hvr-bounce-in:active {\r\n  -webkit-transform: scale(1.2);\r\n  transform: scale(1.2);\r\n  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n}\r\n\r\n/* Bounce Out */\r\n.hvr-bounce-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-out:hover, .hvr-bounce-out:focus, .hvr-bounce-out:active {\r\n  -webkit-transform: scale(0.8);\r\n  transform: scale(0.8);\r\n  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n}\r\n\r\n/* Rotate */\r\n.hvr-rotate {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-rotate:hover, .hvr-rotate:focus, .hvr-rotate:active {\r\n  -webkit-transform: rotate(4deg);\r\n  transform: rotate(4deg);\r\n}\r\n\r\n/* Grow Rotate */\r\n.hvr-grow-rotate {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-grow-rotate:hover, .hvr-grow-rotate:focus, .hvr-grow-rotate:active {\r\n  -webkit-transform: scale(1.1) rotate(4deg);\r\n  transform: scale(1.1) rotate(4deg);\r\n}\r\n\r\n/* Float */\r\n.hvr-float {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-float:hover, .hvr-float:focus, .hvr-float:active {\r\n  -webkit-transform: translateY(-8px);\r\n  transform: translateY(-8px);\r\n}\r\n\r\n/* Sink */\r\n.hvr-sink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-sink:hover, .hvr-sink:focus, .hvr-sink:active {\r\n  -webkit-transform: translateY(8px);\r\n  transform: translateY(8px);\r\n}\r\n\r\n/* Bob */\r\n@-webkit-keyframes hvr-bob {\r\n  0% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(-4px);\r\n    transform: translateY(-4px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n}\r\n@keyframes hvr-bob {\r\n  0% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(-4px);\r\n    transform: translateY(-4px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n}\r\n@-webkit-keyframes hvr-bob-float {\r\n  100% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n}\r\n@keyframes hvr-bob-float {\r\n  100% {\r\n    -webkit-transform: translateY(-8px);\r\n    transform: translateY(-8px);\r\n  }\r\n}\r\n.hvr-bob {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-bob:hover, .hvr-bob:focus, .hvr-bob:active {\r\n  -webkit-animation-name: hvr-bob-float, hvr-bob;\r\n  animation-name: hvr-bob-float, hvr-bob;\r\n  -webkit-animation-duration: .3s, 1.5s;\r\n  animation-duration: .3s, 1.5s;\r\n  -webkit-animation-delay: 0s, .3s;\r\n  animation-delay: 0s, .3s;\r\n  -webkit-animation-timing-function: ease-out, ease-in-out;\r\n  animation-timing-function: ease-out, ease-in-out;\r\n  -webkit-animation-iteration-count: 1, infinite;\r\n  animation-iteration-count: 1, infinite;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n  -webkit-animation-direction: normal, alternate;\r\n  animation-direction: normal, alternate;\r\n}\r\n\r\n/* Hang */\r\n@-webkit-keyframes hvr-hang {\r\n  0% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n}\r\n@keyframes hvr-hang {\r\n  0% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n}\r\n@-webkit-keyframes hvr-hang-sink {\r\n  100% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n}\r\n@keyframes hvr-hang-sink {\r\n  100% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n}\r\n.hvr-hang {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-hang:hover, .hvr-hang:focus, .hvr-hang:active {\r\n  -webkit-animation-name: hvr-hang-sink, hvr-hang;\r\n  animation-name: hvr-hang-sink, hvr-hang;\r\n  -webkit-animation-duration: .3s, 1.5s;\r\n  animation-duration: .3s, 1.5s;\r\n  -webkit-animation-delay: 0s, .3s;\r\n  animation-delay: 0s, .3s;\r\n  -webkit-animation-timing-function: ease-out, ease-in-out;\r\n  animation-timing-function: ease-out, ease-in-out;\r\n  -webkit-animation-iteration-count: 1, infinite;\r\n  animation-iteration-count: 1, infinite;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n  -webkit-animation-direction: normal, alternate;\r\n  animation-direction: normal, alternate;\r\n}\r\n\r\n/* Skew */\r\n.hvr-skew {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-skew:hover, .hvr-skew:focus, .hvr-skew:active {\r\n  -webkit-transform: skew(-10deg);\r\n  transform: skew(-10deg);\r\n}\r\n\r\n/* Skew Forward */\r\n.hvr-skew-forward {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transform-origin: 0 100%;\r\n  transform-origin: 0 100%;\r\n}\r\n.hvr-skew-forward:hover, .hvr-skew-forward:focus, .hvr-skew-forward:active {\r\n  -webkit-transform: skew(-10deg);\r\n  transform: skew(-10deg);\r\n}\r\n\r\n/* Skew Backward */\r\n.hvr-skew-backward {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transform-origin: 0 100%;\r\n  transform-origin: 0 100%;\r\n}\r\n.hvr-skew-backward:hover, .hvr-skew-backward:focus, .hvr-skew-backward:active {\r\n  -webkit-transform: skew(10deg);\r\n  transform: skew(10deg);\r\n}\r\n\r\n/* Wobble Vertical */\r\n@-webkit-keyframes hvr-wobble-vertical {\r\n  16.65% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateY(1px);\r\n    transform: translateY(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-vertical {\r\n  16.65% {\r\n    -webkit-transform: translateY(8px);\r\n    transform: translateY(8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateY(1px);\r\n    transform: translateY(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n}\r\n.hvr-wobble-vertical {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-wobble-vertical:hover, .hvr-wobble-vertical:focus, .hvr-wobble-vertical:active {\r\n  -webkit-animation-name: hvr-wobble-vertical;\r\n  animation-name: hvr-wobble-vertical;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble Horizontal */\r\n@-webkit-keyframes hvr-wobble-horizontal {\r\n  16.65% {\r\n    -webkit-transform: translateX(8px);\r\n    transform: translateX(8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateX(-6px);\r\n    transform: translateX(-6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateX(4px);\r\n    transform: translateX(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateX(-2px);\r\n    transform: translateX(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateX(1px);\r\n    transform: translateX(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-horizontal {\r\n  16.65% {\r\n    -webkit-transform: translateX(8px);\r\n    transform: translateX(8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateX(-6px);\r\n    transform: translateX(-6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateX(4px);\r\n    transform: translateX(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateX(-2px);\r\n    transform: translateX(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateX(1px);\r\n    transform: translateX(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n.hvr-wobble-horizontal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-wobble-horizontal:hover, .hvr-wobble-horizontal:focus, .hvr-wobble-horizontal:active {\r\n  -webkit-animation-name: hvr-wobble-horizontal;\r\n  animation-name: hvr-wobble-horizontal;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble To Bottom Right */\r\n@-webkit-keyframes hvr-wobble-to-bottom-right {\r\n  16.65% {\r\n    -webkit-transform: translate(8px, 8px);\r\n    transform: translate(8px, 8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translate(-6px, -6px);\r\n    transform: translate(-6px, -6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translate(4px, 4px);\r\n    transform: translate(4px, 4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translate(-2px, -2px);\r\n    transform: translate(-2px, -2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translate(1px, 1px);\r\n    transform: translate(1px, 1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translate(0, 0);\r\n    transform: translate(0, 0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-to-bottom-right {\r\n  16.65% {\r\n    -webkit-transform: translate(8px, 8px);\r\n    transform: translate(8px, 8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translate(-6px, -6px);\r\n    transform: translate(-6px, -6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translate(4px, 4px);\r\n    transform: translate(4px, 4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translate(-2px, -2px);\r\n    transform: translate(-2px, -2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translate(1px, 1px);\r\n    transform: translate(1px, 1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translate(0, 0);\r\n    transform: translate(0, 0);\r\n  }\r\n}\r\n.hvr-wobble-to-bottom-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-wobble-to-bottom-right:hover, .hvr-wobble-to-bottom-right:focus, .hvr-wobble-to-bottom-right:active {\r\n  -webkit-animation-name: hvr-wobble-to-bottom-right;\r\n  animation-name: hvr-wobble-to-bottom-right;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble To Top Right */\r\n@-webkit-keyframes hvr-wobble-to-top-right {\r\n  16.65% {\r\n    -webkit-transform: translate(8px, -8px);\r\n    transform: translate(8px, -8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translate(-6px, 6px);\r\n    transform: translate(-6px, 6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translate(4px, -4px);\r\n    transform: translate(4px, -4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translate(-2px, 2px);\r\n    transform: translate(-2px, 2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translate(1px, -1px);\r\n    transform: translate(1px, -1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translate(0, 0);\r\n    transform: translate(0, 0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-to-top-right {\r\n  16.65% {\r\n    -webkit-transform: translate(8px, -8px);\r\n    transform: translate(8px, -8px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translate(-6px, 6px);\r\n    transform: translate(-6px, 6px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translate(4px, -4px);\r\n    transform: translate(4px, -4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translate(-2px, 2px);\r\n    transform: translate(-2px, 2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translate(1px, -1px);\r\n    transform: translate(1px, -1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translate(0, 0);\r\n    transform: translate(0, 0);\r\n  }\r\n}\r\n.hvr-wobble-to-top-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-wobble-to-top-right:hover, .hvr-wobble-to-top-right:focus, .hvr-wobble-to-top-right:active {\r\n  -webkit-animation-name: hvr-wobble-to-top-right;\r\n  animation-name: hvr-wobble-to-top-right;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble Top */\r\n@-webkit-keyframes hvr-wobble-top {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-top {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n.hvr-wobble-top {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transform-origin: 0 100%;\r\n  transform-origin: 0 100%;\r\n}\r\n.hvr-wobble-top:hover, .hvr-wobble-top:focus, .hvr-wobble-top:active {\r\n  -webkit-animation-name: hvr-wobble-top;\r\n  animation-name: hvr-wobble-top;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble Bottom */\r\n@-webkit-keyframes hvr-wobble-bottom {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-bottom {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n.hvr-wobble-bottom {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transform-origin: 100% 0;\r\n  transform-origin: 100% 0;\r\n}\r\n.hvr-wobble-bottom:hover, .hvr-wobble-bottom:focus, .hvr-wobble-bottom:active {\r\n  -webkit-animation-name: hvr-wobble-bottom;\r\n  animation-name: hvr-wobble-bottom;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Wobble Skew */\r\n@-webkit-keyframes hvr-wobble-skew {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n@keyframes hvr-wobble-skew {\r\n  16.65% {\r\n    -webkit-transform: skew(-12deg);\r\n    transform: skew(-12deg);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: skew(10deg);\r\n    transform: skew(10deg);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: skew(-6deg);\r\n    transform: skew(-6deg);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: skew(4deg);\r\n    transform: skew(4deg);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: skew(-2deg);\r\n    transform: skew(-2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: skew(0);\r\n    transform: skew(0);\r\n  }\r\n}\r\n.hvr-wobble-skew {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-wobble-skew:hover, .hvr-wobble-skew:focus, .hvr-wobble-skew:active {\r\n  -webkit-animation-name: hvr-wobble-skew;\r\n  animation-name: hvr-wobble-skew;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Buzz */\r\n@-webkit-keyframes hvr-buzz {\r\n  50% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n}\r\n@keyframes hvr-buzz {\r\n  50% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n}\r\n.hvr-buzz {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-buzz:hover, .hvr-buzz:focus, .hvr-buzz:active {\r\n  -webkit-animation-name: hvr-buzz;\r\n  animation-name: hvr-buzz;\r\n  -webkit-animation-duration: 0.15s;\r\n  animation-duration: 0.15s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n/* Buzz Out */\r\n@-webkit-keyframes hvr-buzz-out {\r\n  10% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  20% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  30% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  40% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  60% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  70% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  80% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  90% {\r\n    -webkit-transform: translateX(1px) rotate(0);\r\n    transform: translateX(1px) rotate(0);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-1px) rotate(0);\r\n    transform: translateX(-1px) rotate(0);\r\n  }\r\n}\r\n@keyframes hvr-buzz-out {\r\n  10% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  20% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  30% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  40% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  60% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  70% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  80% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  90% {\r\n    -webkit-transform: translateX(1px) rotate(0);\r\n    transform: translateX(1px) rotate(0);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-1px) rotate(0);\r\n    transform: translateX(-1px) rotate(0);\r\n  }\r\n}\r\n.hvr-buzz-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-buzz-out:hover, .hvr-buzz-out:focus, .hvr-buzz-out:active {\r\n  -webkit-animation-name: hvr-buzz-out;\r\n  animation-name: hvr-buzz-out;\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Forward */\r\n.hvr-forward {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-forward:hover, .hvr-forward:focus, .hvr-forward:active {\r\n  -webkit-transform: translateX(8px);\r\n  transform: translateX(8px);\r\n}\r\n\r\n/* Backward */\r\n.hvr-backward {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-backward:hover, .hvr-backward:focus, .hvr-backward:active {\r\n  -webkit-transform: translateX(-8px);\r\n  transform: translateX(-8px);\r\n}\r\n\r\n/* BACKGROUND TRANSITIONS */\r\n/* Fade */\r\n.hvr-fade {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  overflow: hidden;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: color, background-color;\r\n  transition-property: color, background-color;\r\n}\r\n.hvr-fade:hover, .hvr-fade:focus, .hvr-fade:active {\r\n  background-color: #2098D1;\r\n  color: white;\r\n}\r\n\r\n/* Back Pulse */\r\n@-webkit-keyframes hvr-back-pulse {\r\n  50% {\r\n    background-color: rgba(32, 152, 209, 0.75);\r\n  }\r\n}\r\n@keyframes hvr-back-pulse {\r\n  50% {\r\n    background-color: rgba(32, 152, 209, 0.75);\r\n  }\r\n}\r\n.hvr-back-pulse {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  overflow: hidden;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-property: color, background-color;\r\n  transition-property: color, background-color;\r\n}\r\n.hvr-back-pulse:hover, .hvr-back-pulse:focus, .hvr-back-pulse:active {\r\n  -webkit-animation-name: hvr-back-pulse;\r\n  animation-name: hvr-back-pulse;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-delay: 0.5s;\r\n  animation-delay: 0.5s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n  background-color: #2098D1;\r\n  background-color: #2098d1;\r\n  color: white;\r\n}\r\n\r\n/* Sweep To Right */\r\n.hvr-sweep-to-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-sweep-to-right:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n  -webkit-transform-origin: 0 50%;\r\n  transform-origin: 0 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-sweep-to-right:hover, .hvr-sweep-to-right:focus, .hvr-sweep-to-right:active {\r\n  color: white;\r\n}\r\n.hvr-sweep-to-right:hover:before, .hvr-sweep-to-right:focus:before, .hvr-sweep-to-right:active:before {\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n}\r\n\r\n/* Sweep To Left */\r\n.hvr-sweep-to-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-sweep-to-left:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n  -webkit-transform-origin: 100% 50%;\r\n  transform-origin: 100% 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-sweep-to-left:hover, .hvr-sweep-to-left:focus, .hvr-sweep-to-left:active {\r\n  color: white;\r\n}\r\n.hvr-sweep-to-left:hover:before, .hvr-sweep-to-left:focus:before, .hvr-sweep-to-left:active:before {\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n}\r\n\r\n/* Sweep To Bottom */\r\n.hvr-sweep-to-bottom {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-sweep-to-bottom:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n  -webkit-transform-origin: 50% 0;\r\n  transform-origin: 50% 0;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-sweep-to-bottom:hover, .hvr-sweep-to-bottom:focus, .hvr-sweep-to-bottom:active {\r\n  color: white;\r\n}\r\n.hvr-sweep-to-bottom:hover:before, .hvr-sweep-to-bottom:focus:before, .hvr-sweep-to-bottom:active:before {\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n}\r\n\r\n/* Sweep To Top */\r\n.hvr-sweep-to-top {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-sweep-to-top:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n  -webkit-transform-origin: 50% 100%;\r\n  transform-origin: 50% 100%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-sweep-to-top:hover, .hvr-sweep-to-top:focus, .hvr-sweep-to-top:active {\r\n  color: white;\r\n}\r\n.hvr-sweep-to-top:hover:before, .hvr-sweep-to-top:focus:before, .hvr-sweep-to-top:active:before {\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n}\r\n\r\n/* Bounce To Right */\r\n.hvr-bounce-to-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-to-right:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n  -webkit-transform-origin: 0 50%;\r\n  transform-origin: 0 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-bounce-to-right:hover, .hvr-bounce-to-right:focus, .hvr-bounce-to-right:active {\r\n  color: white;\r\n}\r\n.hvr-bounce-to-right:hover:before, .hvr-bounce-to-right:focus:before, .hvr-bounce-to-right:active:before {\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n}\r\n\r\n/* Bounce To Left */\r\n.hvr-bounce-to-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-to-left:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n  -webkit-transform-origin: 100% 50%;\r\n  transform-origin: 100% 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-bounce-to-left:hover, .hvr-bounce-to-left:focus, .hvr-bounce-to-left:active {\r\n  color: white;\r\n}\r\n.hvr-bounce-to-left:hover:before, .hvr-bounce-to-left:focus:before, .hvr-bounce-to-left:active:before {\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n}\r\n\r\n/* Bounce To Bottom */\r\n.hvr-bounce-to-bottom {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-to-bottom:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n  -webkit-transform-origin: 50% 0;\r\n  transform-origin: 50% 0;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-bounce-to-bottom:hover, .hvr-bounce-to-bottom:focus, .hvr-bounce-to-bottom:active {\r\n  color: white;\r\n}\r\n.hvr-bounce-to-bottom:hover:before, .hvr-bounce-to-bottom:focus:before, .hvr-bounce-to-bottom:active:before {\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n}\r\n\r\n/* Bounce To Top */\r\n.hvr-bounce-to-top {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n}\r\n.hvr-bounce-to-top:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n  -webkit-transform-origin: 50% 100%;\r\n  transform-origin: 50% 100%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-bounce-to-top:hover, .hvr-bounce-to-top:focus, .hvr-bounce-to-top:active {\r\n  color: white;\r\n}\r\n.hvr-bounce-to-top:hover:before, .hvr-bounce-to-top:focus:before, .hvr-bounce-to-top:active:before {\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n  -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n  transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n}\r\n\r\n/* Radial Out */\r\n.hvr-radial-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n  background: #e1e1e1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-radial-out:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  border-radius: 100%;\r\n  -webkit-transform: scale(0);\r\n  transform: scale(0);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-radial-out:hover, .hvr-radial-out:focus, .hvr-radial-out:active {\r\n  color: white;\r\n}\r\n.hvr-radial-out:hover:before, .hvr-radial-out:focus:before, .hvr-radial-out:active:before {\r\n  -webkit-transform: scale(2);\r\n  transform: scale(2);\r\n}\r\n\r\n/* Radial In */\r\n.hvr-radial-in {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n  background: #2098D1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-radial-in:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #e1e1e1;\r\n  border-radius: 100%;\r\n  -webkit-transform: scale(2);\r\n  transform: scale(2);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-radial-in:hover, .hvr-radial-in:focus, .hvr-radial-in:active {\r\n  color: white;\r\n}\r\n.hvr-radial-in:hover:before, .hvr-radial-in:focus:before, .hvr-radial-in:active:before {\r\n  -webkit-transform: scale(0);\r\n  transform: scale(0);\r\n}\r\n\r\n/* Rectangle In */\r\n.hvr-rectangle-in {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #2098D1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-rectangle-in:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #e1e1e1;\r\n  -webkit-transform: scale(1);\r\n  transform: scale(1);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-rectangle-in:hover, .hvr-rectangle-in:focus, .hvr-rectangle-in:active {\r\n  color: white;\r\n}\r\n.hvr-rectangle-in:hover:before, .hvr-rectangle-in:focus:before, .hvr-rectangle-in:active:before {\r\n  -webkit-transform: scale(0);\r\n  transform: scale(0);\r\n}\r\n\r\n/* Rectangle Out */\r\n.hvr-rectangle-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #e1e1e1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-rectangle-out:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scale(0);\r\n  transform: scale(0);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-rectangle-out:hover, .hvr-rectangle-out:focus, .hvr-rectangle-out:active {\r\n  color: white;\r\n}\r\n.hvr-rectangle-out:hover:before, .hvr-rectangle-out:focus:before, .hvr-rectangle-out:active:before {\r\n  -webkit-transform: scale(1);\r\n  transform: scale(1);\r\n}\r\n\r\n/* Shutter In Horizontal */\r\n.hvr-shutter-in-horizontal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #2098D1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-shutter-in-horizontal:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background: #e1e1e1;\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n  -webkit-transform-origin: 50%;\r\n  transform-origin: 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-shutter-in-horizontal:hover, .hvr-shutter-in-horizontal:focus, .hvr-shutter-in-horizontal:active {\r\n  color: white;\r\n}\r\n.hvr-shutter-in-horizontal:hover:before, .hvr-shutter-in-horizontal:focus:before, .hvr-shutter-in-horizontal:active:before {\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n}\r\n\r\n/* Shutter Out Horizontal */\r\n.hvr-shutter-out-horizontal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #e1e1e1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-shutter-out-horizontal:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleX(0);\r\n  transform: scaleX(0);\r\n  -webkit-transform-origin: 50%;\r\n  transform-origin: 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-shutter-out-horizontal:hover, .hvr-shutter-out-horizontal:focus, .hvr-shutter-out-horizontal:active {\r\n  color: white;\r\n}\r\n.hvr-shutter-out-horizontal:hover:before, .hvr-shutter-out-horizontal:focus:before, .hvr-shutter-out-horizontal:active:before {\r\n  -webkit-transform: scaleX(1);\r\n  transform: scaleX(1);\r\n}\r\n\r\n/* Shutter In Vertical */\r\n.hvr-shutter-in-vertical {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #2098D1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-shutter-in-vertical:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background: #e1e1e1;\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n  -webkit-transform-origin: 50%;\r\n  transform-origin: 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-shutter-in-vertical:hover, .hvr-shutter-in-vertical:focus, .hvr-shutter-in-vertical:active {\r\n  color: white;\r\n}\r\n.hvr-shutter-in-vertical:hover:before, .hvr-shutter-in-vertical:focus:before, .hvr-shutter-in-vertical:active:before {\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n}\r\n\r\n/* Shutter Out Vertical */\r\n.hvr-shutter-out-vertical {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  background: #e1e1e1;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-shutter-out-vertical:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  background: #2098D1;\r\n  -webkit-transform: scaleY(0);\r\n  transform: scaleY(0);\r\n  -webkit-transform-origin: 50%;\r\n  transform-origin: 50%;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-shutter-out-vertical:hover, .hvr-shutter-out-vertical:focus, .hvr-shutter-out-vertical:active {\r\n  color: white;\r\n}\r\n.hvr-shutter-out-vertical:hover:before, .hvr-shutter-out-vertical:focus:before, .hvr-shutter-out-vertical:active:before {\r\n  -webkit-transform: scaleY(1);\r\n  transform: scaleY(1);\r\n}\r\n\r\n/* BORDER TRANSITIONS */\r\n/* Border Fade */\r\n.hvr-border-fade {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow;\r\n  transition-property: box-shadow;\r\n  box-shadow: inset 0 0 0 4px #e1e1e1, 0 0 1px rgba(0, 0, 0, 0);\r\n  /* Hack to improve aliasing on mobile/tablet devices */\r\n}\r\n.hvr-border-fade:hover, .hvr-border-fade:focus, .hvr-border-fade:active {\r\n  box-shadow: inset 0 0 0 4px #2098D1, 0 0 1px rgba(0, 0, 0, 0);\r\n  /* Hack to improve aliasing on mobile/tablet devices */\r\n}\r\n\r\n/* Hollow */\r\n.hvr-hollow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: background;\r\n  transition-property: background;\r\n  box-shadow: inset 0 0 0 4px #e1e1e1, 0 0 1px rgba(0, 0, 0, 0);\r\n  /* Hack to improve aliasing on mobile/tablet devices */\r\n}\r\n.hvr-hollow:hover, .hvr-hollow:focus, .hvr-hollow:active {\r\n  background: none;\r\n}\r\n\r\n/* Trim */\r\n.hvr-trim {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-trim:before {\r\n  content: '';\r\n  position: absolute;\r\n  border: white solid 4px;\r\n  top: 4px;\r\n  left: 4px;\r\n  right: 4px;\r\n  bottom: 4px;\r\n  opacity: 0;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: opacity;\r\n  transition-property: opacity;\r\n}\r\n.hvr-trim:hover:before, .hvr-trim:focus:before, .hvr-trim:active:before {\r\n  opacity: 1;\r\n}\r\n\r\n/* Ripple Out */\r\n@-webkit-keyframes hvr-ripple-out {\r\n  100% {\r\n    top: -12px;\r\n    right: -12px;\r\n    bottom: -12px;\r\n    left: -12px;\r\n    opacity: 0;\r\n  }\r\n}\r\n@keyframes hvr-ripple-out {\r\n  100% {\r\n    top: -12px;\r\n    right: -12px;\r\n    bottom: -12px;\r\n    left: -12px;\r\n    opacity: 0;\r\n  }\r\n}\r\n.hvr-ripple-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-ripple-out:before {\r\n  content: '';\r\n  position: absolute;\r\n  border: #e1e1e1 solid 6px;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n}\r\n.hvr-ripple-out:hover:before, .hvr-ripple-out:focus:before, .hvr-ripple-out:active:before {\r\n  -webkit-animation-name: hvr-ripple-out;\r\n  animation-name: hvr-ripple-out;\r\n}\r\n\r\n/* Ripple In */\r\n@-webkit-keyframes hvr-ripple-in {\r\n  100% {\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes hvr-ripple-in {\r\n  100% {\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    opacity: 1;\r\n  }\r\n}\r\n.hvr-ripple-in {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-ripple-in:before {\r\n  content: '';\r\n  position: absolute;\r\n  border: #e1e1e1 solid 4px;\r\n  top: -12px;\r\n  right: -12px;\r\n  bottom: -12px;\r\n  left: -12px;\r\n  opacity: 0;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n}\r\n.hvr-ripple-in:hover:before, .hvr-ripple-in:focus:before, .hvr-ripple-in:active:before {\r\n  -webkit-animation-name: hvr-ripple-in;\r\n  animation-name: hvr-ripple-in;\r\n}\r\n\r\n/* Outline Out */\r\n.hvr-outline-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-outline-out:before {\r\n  content: '';\r\n  position: absolute;\r\n  border: #e1e1e1 solid 4px;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: top, right, bottom, left;\r\n  transition-property: top, right, bottom, left;\r\n}\r\n.hvr-outline-out:hover:before, .hvr-outline-out:focus:before, .hvr-outline-out:active:before {\r\n  top: -8px;\r\n  right: -8px;\r\n  bottom: -8px;\r\n  left: -8px;\r\n}\r\n\r\n/* Outline In */\r\n.hvr-outline-in {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-outline-in:before {\r\n  pointer-events: none;\r\n  content: '';\r\n  position: absolute;\r\n  border: #e1e1e1 solid 4px;\r\n  top: -16px;\r\n  right: -16px;\r\n  bottom: -16px;\r\n  left: -16px;\r\n  opacity: 0;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: top, right, bottom, left;\r\n  transition-property: top, right, bottom, left;\r\n}\r\n.hvr-outline-in:hover:before, .hvr-outline-in:focus:before, .hvr-outline-in:active:before {\r\n  top: -8px;\r\n  right: -8px;\r\n  bottom: -8px;\r\n  left: -8px;\r\n  opacity: 1;\r\n}\r\n\r\n/* Round Corners */\r\n.hvr-round-corners {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: border-radius;\r\n  transition-property: border-radius;\r\n}\r\n.hvr-round-corners:hover, .hvr-round-corners:focus, .hvr-round-corners:active {\r\n  border-radius: 1em;\r\n}\r\n\r\n/* Underline From Left */\r\n.hvr-underline-from-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-underline-from-left:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 0;\r\n  right: 100%;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: right;\r\n  transition-property: right;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-underline-from-left:hover:before, .hvr-underline-from-left:focus:before, .hvr-underline-from-left:active:before {\r\n  right: 0;\r\n}\r\n\r\n/* Underline From Center */\r\n.hvr-underline-from-center {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-underline-from-center:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 51%;\r\n  right: 51%;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: left, right;\r\n  transition-property: left, right;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-underline-from-center:hover:before, .hvr-underline-from-center:focus:before, .hvr-underline-from-center:active:before {\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n/* Underline From Right */\r\n.hvr-underline-from-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-underline-from-right:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 100%;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: left;\r\n  transition-property: left;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-underline-from-right:hover:before, .hvr-underline-from-right:focus:before, .hvr-underline-from-right:active:before {\r\n  left: 0;\r\n}\r\n\r\n/* Overline From Left */\r\n.hvr-overline-from-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-overline-from-left:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 0;\r\n  right: 100%;\r\n  top: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: right;\r\n  transition-property: right;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-overline-from-left:hover:before, .hvr-overline-from-left:focus:before, .hvr-overline-from-left:active:before {\r\n  right: 0;\r\n}\r\n\r\n/* Overline From Center */\r\n.hvr-overline-from-center {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-overline-from-center:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 51%;\r\n  right: 51%;\r\n  top: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: left, right;\r\n  transition-property: left, right;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-overline-from-center:hover:before, .hvr-overline-from-center:focus:before, .hvr-overline-from-center:active:before {\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n/* Overline From Right */\r\n.hvr-overline-from-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-overline-from-right:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 100%;\r\n  right: 0;\r\n  top: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transition-property: left;\r\n  transition-property: left;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-overline-from-right:hover:before, .hvr-overline-from-right:focus:before, .hvr-overline-from-right:active:before {\r\n  left: 0;\r\n}\r\n\r\n/* Reveal */\r\n.hvr-reveal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-reveal:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  border-color: #2098D1;\r\n  border-style: solid;\r\n  border-width: 0;\r\n  -webkit-transition-property: border-width;\r\n  transition-property: border-width;\r\n  -webkit-transition-duration: 0.1s;\r\n  transition-duration: 0.1s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-reveal:hover:before, .hvr-reveal:focus:before, .hvr-reveal:active:before {\r\n  -webkit-transform: translateY(0);\r\n  transform: translateY(0);\r\n  border-width: 4px;\r\n}\r\n\r\n/* Underline Reveal */\r\n.hvr-underline-reveal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-underline-reveal:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transform: translateY(4px);\r\n  transform: translateY(4px);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-underline-reveal:hover:before, .hvr-underline-reveal:focus:before, .hvr-underline-reveal:active:before {\r\n  -webkit-transform: translateY(0);\r\n  transform: translateY(0);\r\n}\r\n\r\n/* Overline Reveal */\r\n.hvr-overline-reveal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.hvr-overline-reveal:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: -1;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  background: #2098D1;\r\n  height: 4px;\r\n  -webkit-transform: translateY(-4px);\r\n  transform: translateY(-4px);\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-overline-reveal:hover:before, .hvr-overline-reveal:focus:before, .hvr-overline-reveal:active:before {\r\n  -webkit-transform: translateY(0);\r\n  transform: translateY(0);\r\n}\r\n\r\n/* SHADOW/GLOW TRANSITIONS */\r\n/* Glow */\r\n.hvr-glow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow;\r\n  transition-property: box-shadow;\r\n}\r\n.hvr-glow:hover, .hvr-glow:focus, .hvr-glow:active {\r\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);\r\n}\r\n\r\n/* Shadow */\r\n.hvr-shadow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow;\r\n  transition-property: box-shadow;\r\n}\r\n.hvr-shadow:hover, .hvr-shadow:focus, .hvr-shadow:active {\r\n  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n/* Grow Shadow */\r\n.hvr-grow-shadow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow, transform;\r\n  transition-property: box-shadow, transform;\r\n}\r\n.hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {\r\n  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);\r\n  -webkit-transform: scale(1.1);\r\n  transform: scale(1.1);\r\n}\r\n\r\n/* Box Shadow Outset */\r\n.hvr-box-shadow-outset {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow;\r\n  transition-property: box-shadow;\r\n}\r\n.hvr-box-shadow-outset:hover, .hvr-box-shadow-outset:focus, .hvr-box-shadow-outset:active {\r\n  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);\r\n}\r\n\r\n/* Box Shadow Inset */\r\n.hvr-box-shadow-inset {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: box-shadow;\r\n  transition-property: box-shadow;\r\n  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0);\r\n  /* Hack to improve aliasing on mobile/tablet devices */\r\n}\r\n.hvr-box-shadow-inset:hover, .hvr-box-shadow-inset:focus, .hvr-box-shadow-inset:active {\r\n  box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0);\r\n  /* Hack to improve aliasing on mobile/tablet devices */\r\n}\r\n\r\n/* Float Shadow */\r\n.hvr-float-shadow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-float-shadow:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  top: 100%;\r\n  left: 5%;\r\n  height: 10px;\r\n  width: 90%;\r\n  opacity: 0;\r\n  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);\r\n  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);\r\n  /* W3C */\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform, opacity;\r\n  transition-property: transform, opacity;\r\n}\r\n.hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {\r\n  -webkit-transform: translateY(-5px);\r\n  transform: translateY(-5px);\r\n  /* move the element up by 5px */\r\n}\r\n.hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {\r\n  opacity: 1;\r\n  -webkit-transform: translateY(5px);\r\n  transform: translateY(5px);\r\n  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */\r\n}\r\n\r\n/* Shadow Radial */\r\n.hvr-shadow-radial {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-shadow-radial:before, .hvr-shadow-radial:after {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  content: '';\r\n  left: 0;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  background-repeat: no-repeat;\r\n  height: 5px;\r\n  opacity: 0;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: opacity;\r\n  transition-property: opacity;\r\n}\r\n.hvr-shadow-radial:before {\r\n  bottom: 100%;\r\n  background: -webkit-radial-gradient(50% 150%, ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\r\n  background: radial-gradient(ellipse at 50% 150%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\r\n}\r\n.hvr-shadow-radial:after {\r\n  top: 100%;\r\n  background: -webkit-radial-gradient(50% -50%, ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\r\n  background: radial-gradient(ellipse at 50% -50%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\r\n}\r\n.hvr-shadow-radial:hover:before, .hvr-shadow-radial:focus:before, .hvr-shadow-radial:active:before, .hvr-shadow-radial:hover:after, .hvr-shadow-radial:focus:after, .hvr-shadow-radial:active:after {\r\n  opacity: 1;\r\n}\r\n\r\n/* SPEECH BUBBLES */\r\n/* Bubble Top */\r\n.hvr-bubble-top {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-bubble-top:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  border-style: solid;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  left: calc(50% - 10px);\r\n  top: 0;\r\n  border-width: 0 10px 10px 10px;\r\n  border-color: transparent transparent #e1e1e1 transparent;\r\n}\r\n.hvr-bubble-top:hover:before, .hvr-bubble-top:focus:before, .hvr-bubble-top:active:before {\r\n  -webkit-transform: translateY(-10px);\r\n  transform: translateY(-10px);\r\n}\r\n\r\n/* Bubble Right */\r\n.hvr-bubble-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-bubble-right:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  border-style: solid;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  top: calc(50% - 10px);\r\n  right: 0;\r\n  border-width: 10px 0 10px 10px;\r\n  border-color: transparent transparent transparent #e1e1e1;\r\n}\r\n.hvr-bubble-right:hover:before, .hvr-bubble-right:focus:before, .hvr-bubble-right:active:before {\r\n  -webkit-transform: translateX(10px);\r\n  transform: translateX(10px);\r\n}\r\n\r\n/* Bubble Bottom */\r\n.hvr-bubble-bottom {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-bubble-bottom:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  border-style: solid;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  left: calc(50% - 10px);\r\n  bottom: 0;\r\n  border-width: 10px 10px 0 10px;\r\n  border-color: #e1e1e1 transparent transparent transparent;\r\n}\r\n.hvr-bubble-bottom:hover:before, .hvr-bubble-bottom:focus:before, .hvr-bubble-bottom:active:before {\r\n  -webkit-transform: translateY(10px);\r\n  transform: translateY(10px);\r\n}\r\n\r\n/* Bubble Left */\r\n.hvr-bubble-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-bubble-left:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  border-style: solid;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  top: calc(50% - 10px);\r\n  left: 0;\r\n  border-width: 10px 10px 10px 0;\r\n  border-color: transparent #e1e1e1 transparent transparent;\r\n}\r\n.hvr-bubble-left:hover:before, .hvr-bubble-left:focus:before, .hvr-bubble-left:active:before {\r\n  -webkit-transform: translateX(-10px);\r\n  transform: translateX(-10px);\r\n}\r\n\r\n/* Bubble Float Top */\r\n.hvr-bubble-float-top {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-top:before {\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  left: calc(50% - 10px);\r\n  top: 0;\r\n  border-style: solid;\r\n  border-width: 0 10px 10px 10px;\r\n  border-color: transparent transparent #e1e1e1 transparent;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-top:hover, .hvr-bubble-float-top:focus, .hvr-bubble-float-top:active {\r\n  -webkit-transform: translateY(10px);\r\n  transform: translateY(10px);\r\n}\r\n.hvr-bubble-float-top:hover:before, .hvr-bubble-float-top:focus:before, .hvr-bubble-float-top:active:before {\r\n  -webkit-transform: translateY(-10px);\r\n  transform: translateY(-10px);\r\n}\r\n\r\n/* Bubble Float Right */\r\n.hvr-bubble-float-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-right:before {\r\n  position: absolute;\r\n  z-index: -1;\r\n  top: calc(50% - 10px);\r\n  right: 0;\r\n  content: '';\r\n  border-style: solid;\r\n  border-width: 10px 0 10px 10px;\r\n  border-color: transparent transparent transparent #e1e1e1;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-right:hover, .hvr-bubble-float-right:focus, .hvr-bubble-float-right:active {\r\n  -webkit-transform: translateX(-10px);\r\n  transform: translateX(-10px);\r\n}\r\n.hvr-bubble-float-right:hover:before, .hvr-bubble-float-right:focus:before, .hvr-bubble-float-right:active:before {\r\n  -webkit-transform: translateX(10px);\r\n  transform: translateX(10px);\r\n}\r\n\r\n/* Bubble Float Bottom */\r\n.hvr-bubble-float-bottom {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-bottom:before {\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  left: calc(50% - 10px);\r\n  bottom: 0;\r\n  border-style: solid;\r\n  border-width: 10px 10px 0 10px;\r\n  border-color: #e1e1e1 transparent transparent transparent;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-bottom:hover, .hvr-bubble-float-bottom:focus, .hvr-bubble-float-bottom:active {\r\n  -webkit-transform: translateY(-10px);\r\n  transform: translateY(-10px);\r\n}\r\n.hvr-bubble-float-bottom:hover:before, .hvr-bubble-float-bottom:focus:before, .hvr-bubble-float-bottom:active:before {\r\n  -webkit-transform: translateY(10px);\r\n  transform: translateY(10px);\r\n}\r\n\r\n/* Bubble Float Left */\r\n.hvr-bubble-float-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-left:before {\r\n  position: absolute;\r\n  z-index: -1;\r\n  content: '';\r\n  top: calc(50% - 10px);\r\n  left: 0;\r\n  border-style: solid;\r\n  border-width: 10px 10px 10px 0;\r\n  border-color: transparent #e1e1e1 transparent transparent;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n}\r\n.hvr-bubble-float-left:hover, .hvr-bubble-float-left:focus, .hvr-bubble-float-left:active {\r\n  -webkit-transform: translateX(10px);\r\n  transform: translateX(10px);\r\n}\r\n.hvr-bubble-float-left:hover:before, .hvr-bubble-float-left:focus:before, .hvr-bubble-float-left:active:before {\r\n  -webkit-transform: translateX(-10px);\r\n  transform: translateX(-10px);\r\n}\r\n\r\n/* ICONS */\r\n/* Icon Back */\r\n.hvr-icon-back {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.1s;\r\n  transition-duration: 0.1s;\r\n}\r\n.hvr-icon-back .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.1s;\r\n  transition-duration: 0.1s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-back:hover .hvr-icon, .hvr-icon-back:focus .hvr-icon, .hvr-icon-back:active .hvr-icon {\r\n  -webkit-transform: translateX(-4px);\r\n  transform: translateX(-4px);\r\n}\r\n\r\n/* Icon Forward */\r\n.hvr-icon-forward {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.1s;\r\n  transition-duration: 0.1s;\r\n}\r\n.hvr-icon-forward .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.1s;\r\n  transition-duration: 0.1s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-forward:hover .hvr-icon, .hvr-icon-forward:focus .hvr-icon, .hvr-icon-forward:active .hvr-icon {\r\n  -webkit-transform: translateX(4px);\r\n  transform: translateX(4px);\r\n}\r\n\r\n/* Icon Down */\r\n@-webkit-keyframes hvr-icon-down {\r\n  0%,\r\n\t50%,\r\n\t100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n  25%,\r\n\t75% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-down {\r\n  0%,\r\n\t50%,\r\n\t100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n  25%,\r\n\t75% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n/* Icon Down */\r\n.hvr-icon-down {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-down .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-down:hover .hvr-icon, .hvr-icon-down:focus .hvr-icon, .hvr-icon-down:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-down;\r\n  animation-name: hvr-icon-down;\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-timing-function: ease-out;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n/* Icon Up */\r\n@-webkit-keyframes hvr-icon-up {\r\n  0%,\r\n\t50%,\r\n\t100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n  25%,\r\n\t75% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-up {\r\n  0%,\r\n\t50%,\r\n\t100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n  25%,\r\n\t75% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n/* Icon Up */\r\n.hvr-icon-up {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-up .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-up:hover .hvr-icon, .hvr-icon-up:focus .hvr-icon, .hvr-icon-up:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-up;\r\n  animation-name: hvr-icon-up;\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-timing-function: ease-out;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n/* Icon Spin */\r\n.hvr-icon-spin {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-spin .hvr-icon {\r\n  -webkit-transition-duration: 1s;\r\n  transition-duration: 1s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-in-out;\r\n  transition-timing-function: ease-in-out;\r\n}\r\n.hvr-icon-spin:hover .hvr-icon, .hvr-icon-spin:focus .hvr-icon, .hvr-icon-spin:active .hvr-icon {\r\n  -webkit-transform: rotate(360deg);\r\n  transform: rotate(360deg);\r\n}\r\n\r\n/* Icon Drop */\r\n@-webkit-keyframes hvr-icon-drop {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  50% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(-100%);\r\n    transform: translateY(-100%);\r\n  }\r\n  51%,\r\n\t100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes hvr-icon-drop {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  50% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(-100%);\r\n    transform: translateY(-100%);\r\n  }\r\n  51%,\r\n\t100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n/* Icon Drop */\r\n.hvr-icon-drop {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-drop .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-drop:hover .hvr-icon, .hvr-icon-drop:focus .hvr-icon, .hvr-icon-drop:active .hvr-icon {\r\n  opacity: 0;\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-animation-name: hvr-icon-drop;\r\n  animation-name: hvr-icon-drop;\r\n  -webkit-animation-duration: 0.5s;\r\n  animation-duration: 0.5s;\r\n  -webkit-animation-delay: 0.3s;\r\n  animation-delay: 0.3s;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n  animation-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\r\n}\r\n\r\n/* Icon Fade */\r\n.hvr-icon-fade {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-fade .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.5s;\r\n  transition-duration: 0.5s;\r\n  -webkit-transition-property: color;\r\n  transition-property: color;\r\n}\r\n.hvr-icon-fade:hover .hvr-icon, .hvr-icon-fade:focus .hvr-icon, .hvr-icon-fade:active .hvr-icon {\r\n  color: #0F9E5E;\r\n}\r\n\r\n/* Icon Float Away */\r\n@-webkit-keyframes hvr-icon-float-away {\r\n  0% {\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(-1em);\r\n    transform: translateY(-1em);\r\n  }\r\n}\r\n@keyframes hvr-icon-float-away {\r\n  0% {\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(-1em);\r\n    transform: translateY(-1em);\r\n  }\r\n}\r\n/* Icon Float Away */\r\n.hvr-icon-float-away {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-float-away .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-animation-duration: 0.5s;\r\n  animation-duration: 0.5s;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n}\r\n.hvr-icon-float-away:hover .hvr-icon, .hvr-icon-float-away:focus .hvr-icon, .hvr-icon-float-away:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-float-away;\r\n  animation-name: hvr-icon-float-away;\r\n  -webkit-animation-timing-function: ease-out;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n/* Icon Sink Away */\r\n@-webkit-keyframes hvr-icon-sink-away {\r\n  0% {\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(1em);\r\n    transform: translateY(1em);\r\n  }\r\n}\r\n@keyframes hvr-icon-sink-away {\r\n  0% {\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(1em);\r\n    transform: translateY(1em);\r\n  }\r\n}\r\n/* Icon Sink Away */\r\n.hvr-icon-sink-away {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-sink-away .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-animation-duration: 0.5s;\r\n  animation-duration: 0.5s;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n}\r\n.hvr-icon-sink-away:hover .hvr-icon, .hvr-icon-sink-away:focus .hvr-icon, .hvr-icon-sink-away:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-sink-away;\r\n  animation-name: hvr-icon-sink-away;\r\n  -webkit-animation-timing-function: ease-out;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n/* Icon Grow */\r\n.hvr-icon-grow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-grow .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-grow:hover .hvr-icon, .hvr-icon-grow:focus .hvr-icon, .hvr-icon-grow:active .hvr-icon {\r\n  -webkit-transform: scale(1.3) translateZ(0);\r\n  transform: scale(1.3) translateZ(0);\r\n}\r\n\r\n/* Icon Shrink */\r\n.hvr-icon-shrink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-shrink .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-shrink:hover .hvr-icon, .hvr-icon-shrink:focus .hvr-icon, .hvr-icon-shrink:active .hvr-icon {\r\n  -webkit-transform: scale(0.8);\r\n  transform: scale(0.8);\r\n}\r\n\r\n/* Icon Pulse */\r\n@-webkit-keyframes hvr-icon-pulse {\r\n  25% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n  75% {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n}\r\n@keyframes hvr-icon-pulse {\r\n  25% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n  75% {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n}\r\n.hvr-icon-pulse {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-pulse .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-pulse:hover .hvr-icon, .hvr-icon-pulse:focus .hvr-icon, .hvr-icon-pulse:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-pulse;\r\n  animation-name: hvr-icon-pulse;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n/* Icon Pulse Grow */\r\n@-webkit-keyframes hvr-icon-pulse-grow {\r\n  to {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n}\r\n@keyframes hvr-icon-pulse-grow {\r\n  to {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n}\r\n.hvr-icon-pulse-grow {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-pulse-grow .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-pulse-grow:hover .hvr-icon, .hvr-icon-pulse-grow:focus .hvr-icon, .hvr-icon-pulse-grow:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-pulse-grow;\r\n  animation-name: hvr-icon-pulse-grow;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\r\n  animation-direction: alternate;\r\n}\r\n\r\n/* Icon Pulse Shrink */\r\n@-webkit-keyframes hvr-icon-pulse-shrink {\r\n  to {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n}\r\n@keyframes hvr-icon-pulse-shrink {\r\n  to {\r\n    -webkit-transform: scale(0.8);\r\n    transform: scale(0.8);\r\n  }\r\n}\r\n.hvr-icon-pulse-shrink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n}\r\n.hvr-icon-pulse-shrink .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-pulse-shrink:hover .hvr-icon, .hvr-icon-pulse-shrink:focus .hvr-icon, .hvr-icon-pulse-shrink:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-pulse-shrink;\r\n  animation-name: hvr-icon-pulse-shrink;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n  -webkit-animation-direction: alternate;\r\n  animation-direction: alternate;\r\n}\r\n\r\n/* Icon Push */\r\n@-webkit-keyframes hvr-icon-push {\r\n  50% {\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n@keyframes hvr-icon-push {\r\n  50% {\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n.hvr-icon-push {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-push .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-push:hover .hvr-icon, .hvr-icon-push:focus .hvr-icon, .hvr-icon-push:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-push;\r\n  animation-name: hvr-icon-push;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Icon Pop */\r\n@-webkit-keyframes hvr-icon-pop {\r\n  50% {\r\n    -webkit-transform: scale(1.5);\r\n    transform: scale(1.5);\r\n  }\r\n}\r\n@keyframes hvr-icon-pop {\r\n  50% {\r\n    -webkit-transform: scale(1.5);\r\n    transform: scale(1.5);\r\n  }\r\n}\r\n.hvr-icon-pop {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-pop .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-pop:hover .hvr-icon, .hvr-icon-pop:focus .hvr-icon, .hvr-icon-pop:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-pop;\r\n  animation-name: hvr-icon-pop;\r\n  -webkit-animation-duration: 0.3s;\r\n  animation-duration: 0.3s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Icon Bounce */\r\n.hvr-icon-bounce {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-bounce .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-bounce:hover .hvr-icon, .hvr-icon-bounce:focus .hvr-icon, .hvr-icon-bounce:active .hvr-icon {\r\n  -webkit-transform: scale(1.5);\r\n  transform: scale(1.5);\r\n  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\r\n}\r\n\r\n/* Icon Rotate */\r\n.hvr-icon-rotate {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-rotate .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-rotate:hover .hvr-icon, .hvr-icon-rotate:focus .hvr-icon, .hvr-icon-rotate:active .hvr-icon {\r\n  -webkit-transform: rotate(20deg);\r\n  transform: rotate(20deg);\r\n}\r\n\r\n/* Icon Grow Rotate */\r\n.hvr-icon-grow-rotate {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-grow-rotate .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-grow-rotate:hover .hvr-icon, .hvr-icon-grow-rotate:focus .hvr-icon, .hvr-icon-grow-rotate:active .hvr-icon {\r\n  -webkit-transform: scale(1.5) rotate(12deg);\r\n  transform: scale(1.5) rotate(12deg);\r\n}\r\n\r\n/* Icon Float */\r\n.hvr-icon-float {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-float .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-float:hover .hvr-icon, .hvr-icon-float:focus .hvr-icon, .hvr-icon-float:active .hvr-icon {\r\n  -webkit-transform: translateY(-4px);\r\n  transform: translateY(-4px);\r\n}\r\n\r\n/* Icon Sink */\r\n.hvr-icon-sink {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-sink .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: transform;\r\n  transition-property: transform;\r\n  -webkit-transition-timing-function: ease-out;\r\n  transition-timing-function: ease-out;\r\n}\r\n.hvr-icon-sink:hover .hvr-icon, .hvr-icon-sink:focus .hvr-icon, .hvr-icon-sink:active .hvr-icon {\r\n  -webkit-transform: translateY(4px);\r\n  transform: translateY(4px);\r\n}\r\n\r\n/* Icon Bob */\r\n@-webkit-keyframes hvr-icon-bob {\r\n  0% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-bob {\r\n  0% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n@-webkit-keyframes hvr-icon-bob-float {\r\n  100% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-bob-float {\r\n  100% {\r\n    -webkit-transform: translateY(-6px);\r\n    transform: translateY(-6px);\r\n  }\r\n}\r\n.hvr-icon-bob {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-bob .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-bob:hover .hvr-icon, .hvr-icon-bob:focus .hvr-icon, .hvr-icon-bob:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-bob-float, hvr-icon-bob;\r\n  animation-name: hvr-icon-bob-float, hvr-icon-bob;\r\n  -webkit-animation-duration: .3s, 1.5s;\r\n  animation-duration: .3s, 1.5s;\r\n  -webkit-animation-delay: 0s, .3s;\r\n  animation-delay: 0s, .3s;\r\n  -webkit-animation-timing-function: ease-out, ease-in-out;\r\n  animation-timing-function: ease-out, ease-in-out;\r\n  -webkit-animation-iteration-count: 1, infinite;\r\n  animation-iteration-count: 1, infinite;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n  -webkit-animation-direction: normal, alternate;\r\n  animation-direction: normal, alternate;\r\n}\r\n\r\n/* Icon Hang */\r\n@-webkit-keyframes hvr-icon-hang {\r\n  0% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(2px);\r\n    transform: translateY(2px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-hang {\r\n  0% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateY(2px);\r\n    transform: translateY(2px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n@-webkit-keyframes hvr-icon-hang-sink {\r\n  100% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n@keyframes hvr-icon-hang-sink {\r\n  100% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n}\r\n.hvr-icon-hang {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-hang .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-hang:hover .hvr-icon, .hvr-icon-hang:focus .hvr-icon, .hvr-icon-hang:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-hang-sink, hvr-icon-hang;\r\n  animation-name: hvr-icon-hang-sink, hvr-icon-hang;\r\n  -webkit-animation-duration: .3s, 1.5s;\r\n  animation-duration: .3s, 1.5s;\r\n  -webkit-animation-delay: 0s, .3s;\r\n  animation-delay: 0s, .3s;\r\n  -webkit-animation-timing-function: ease-out, ease-in-out;\r\n  animation-timing-function: ease-out, ease-in-out;\r\n  -webkit-animation-iteration-count: 1, infinite;\r\n  animation-iteration-count: 1, infinite;\r\n  -webkit-animation-fill-mode: forwards;\r\n  animation-fill-mode: forwards;\r\n  -webkit-animation-direction: normal, alternate;\r\n  animation-direction: normal, alternate;\r\n}\r\n\r\n/* Icon Wobble Horizontal */\r\n@-webkit-keyframes hvr-icon-wobble-horizontal {\r\n  16.65% {\r\n    -webkit-transform: translateX(6px);\r\n    transform: translateX(6px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateX(-5px);\r\n    transform: translateX(-5px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateX(4px);\r\n    transform: translateX(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateX(-2px);\r\n    transform: translateX(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateX(1px);\r\n    transform: translateX(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n@keyframes hvr-icon-wobble-horizontal {\r\n  16.65% {\r\n    -webkit-transform: translateX(6px);\r\n    transform: translateX(6px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateX(-5px);\r\n    transform: translateX(-5px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateX(4px);\r\n    transform: translateX(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateX(-2px);\r\n    transform: translateX(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateX(1px);\r\n    transform: translateX(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n.hvr-icon-wobble-horizontal {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-wobble-horizontal .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-wobble-horizontal:hover .hvr-icon, .hvr-icon-wobble-horizontal:focus .hvr-icon, .hvr-icon-wobble-horizontal:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-wobble-horizontal;\r\n  animation-name: hvr-icon-wobble-horizontal;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Icon Wobble Vertical */\r\n@-webkit-keyframes hvr-icon-wobble-vertical {\r\n  16.65% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateY(-5px);\r\n    transform: translateY(-5px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateY(1px);\r\n    transform: translateY(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n}\r\n@keyframes hvr-icon-wobble-vertical {\r\n  16.65% {\r\n    -webkit-transform: translateY(6px);\r\n    transform: translateY(6px);\r\n  }\r\n  33.3% {\r\n    -webkit-transform: translateY(-5px);\r\n    transform: translateY(-5px);\r\n  }\r\n  49.95% {\r\n    -webkit-transform: translateY(4px);\r\n    transform: translateY(4px);\r\n  }\r\n  66.6% {\r\n    -webkit-transform: translateY(-2px);\r\n    transform: translateY(-2px);\r\n  }\r\n  83.25% {\r\n    -webkit-transform: translateY(1px);\r\n    transform: translateY(1px);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateY(0);\r\n    transform: translateY(0);\r\n  }\r\n}\r\n.hvr-icon-wobble-vertical {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-wobble-vertical .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-wobble-vertical:hover .hvr-icon, .hvr-icon-wobble-vertical:focus .hvr-icon, .hvr-icon-wobble-vertical:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-wobble-vertical;\r\n  animation-name: hvr-icon-wobble-vertical;\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* Icon Buzz */\r\n@-webkit-keyframes hvr-icon-buzz {\r\n  50% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n}\r\n@keyframes hvr-icon-buzz {\r\n  50% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n}\r\n.hvr-icon-buzz {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-buzz .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-buzz:hover .hvr-icon, .hvr-icon-buzz:focus .hvr-icon, .hvr-icon-buzz:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-buzz;\r\n  animation-name: hvr-icon-buzz;\r\n  -webkit-animation-duration: 0.15s;\r\n  animation-duration: 0.15s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n/* Icon Buzz Out */\r\n@-webkit-keyframes hvr-icon-buzz-out {\r\n  10% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  20% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  30% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  40% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  60% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  70% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  80% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  90% {\r\n    -webkit-transform: translateX(1px) rotate(0);\r\n    transform: translateX(1px) rotate(0);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-1px) rotate(0);\r\n    transform: translateX(-1px) rotate(0);\r\n  }\r\n}\r\n@keyframes hvr-icon-buzz-out {\r\n  10% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  20% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  30% {\r\n    -webkit-transform: translateX(3px) rotate(2deg);\r\n    transform: translateX(3px) rotate(2deg);\r\n  }\r\n  40% {\r\n    -webkit-transform: translateX(-3px) rotate(-2deg);\r\n    transform: translateX(-3px) rotate(-2deg);\r\n  }\r\n  50% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  60% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  70% {\r\n    -webkit-transform: translateX(2px) rotate(1deg);\r\n    transform: translateX(2px) rotate(1deg);\r\n  }\r\n  80% {\r\n    -webkit-transform: translateX(-2px) rotate(-1deg);\r\n    transform: translateX(-2px) rotate(-1deg);\r\n  }\r\n  90% {\r\n    -webkit-transform: translateX(1px) rotate(0);\r\n    transform: translateX(1px) rotate(0);\r\n  }\r\n  100% {\r\n    -webkit-transform: translateX(-1px) rotate(0);\r\n    transform: translateX(-1px) rotate(0);\r\n  }\r\n}\r\n.hvr-icon-buzz-out {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n}\r\n.hvr-icon-buzz-out .hvr-icon {\r\n  -webkit-transform: translateZ(0);\r\n  transform: translateZ(0);\r\n}\r\n.hvr-icon-buzz-out:hover .hvr-icon, .hvr-icon-buzz-out:focus .hvr-icon, .hvr-icon-buzz-out:active .hvr-icon {\r\n  -webkit-animation-name: hvr-icon-buzz-out;\r\n  animation-name: hvr-icon-buzz-out;\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-timing-function: linear;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-iteration-count: 1;\r\n  animation-iteration-count: 1;\r\n}\r\n\r\n/* CURLS */\r\n/* Curl Top Left */\r\n.hvr-curl-top-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-curl-top-left:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  content: '';\r\n  height: 0;\r\n  width: 0;\r\n  top: 0;\r\n  left: 0;\r\n  background: white;\r\n  /* IE9 */\r\n  background: linear-gradient(135deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\r\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#ffffff', endColorstr='#000000');\r\n  /*For IE7-8-9*/\r\n  z-index: 1000;\r\n  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: width, height;\r\n  transition-property: width, height;\r\n}\r\n.hvr-curl-top-left:hover:before, .hvr-curl-top-left:focus:before, .hvr-curl-top-left:active:before {\r\n  width: 25px;\r\n  height: 25px;\r\n}\r\n\r\n/* Curl Top Right */\r\n.hvr-curl-top-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-curl-top-right:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  content: '';\r\n  height: 0;\r\n  width: 0;\r\n  top: 0;\r\n  right: 0;\r\n  background: white;\r\n  /* IE9 */\r\n  background: linear-gradient(225deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\r\n  box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: width, height;\r\n  transition-property: width, height;\r\n}\r\n.hvr-curl-top-right:hover:before, .hvr-curl-top-right:focus:before, .hvr-curl-top-right:active:before {\r\n  width: 25px;\r\n  height: 25px;\r\n}\r\n\r\n/* Curl Bottom Right */\r\n.hvr-curl-bottom-right {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-curl-bottom-right:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  content: '';\r\n  height: 0;\r\n  width: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  background: white;\r\n  /* IE9 */\r\n  background: linear-gradient(315deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\r\n  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: width, height;\r\n  transition-property: width, height;\r\n}\r\n.hvr-curl-bottom-right:hover:before, .hvr-curl-bottom-right:focus:before, .hvr-curl-bottom-right:active:before {\r\n  width: 25px;\r\n  height: 25px;\r\n}\r\n\r\n/* Curl Bottom Left */\r\n.hvr-curl-bottom-left {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-transform: perspective(1px) translateZ(0);\r\n  transform: perspective(1px) translateZ(0);\r\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.hvr-curl-bottom-left:before {\r\n  pointer-events: none;\r\n  position: absolute;\r\n  content: '';\r\n  height: 0;\r\n  width: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background: white;\r\n  /* IE9 */\r\n  background: linear-gradient(45deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\r\n  box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition-duration: 0.3s;\r\n  transition-duration: 0.3s;\r\n  -webkit-transition-property: width, height;\r\n  transition-property: width, height;\r\n}\r\n.hvr-curl-bottom-left:hover:before, .hvr-curl-bottom-left:focus:before, .hvr-curl-bottom-left:active:before {\r\n  width: 25px;\r\n  height: 25px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(8), __webpack_require__(2));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["Delay"] = factory(require("prop-types"), require("react"));
	else
		root["Delay"] = factory(root["prop-types"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Delay = function (_Component) {
  _inherits(Delay, _Component);

  function Delay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Delay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Delay.__proto__ || Object.getPrototypeOf(Delay)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      waiting: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Delay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = setTimeout(function () {
        _this2.setState({
          waiting: false
        });
      }, this.props.wait);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.waiting) {
        return this.props.children;
      }

      return null;
    }
  }]);

  return Delay;
}(_react.Component);

Delay.propTypes = {
  children: _propTypes2.default.node,
  wait: _propTypes2.default.number
};
Delay.defaultProps = {
  wait: 250
};
exports.default = Delay;

/***/ })
/******/ ]);
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoseGroup", function() { return PoseGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_popmotion_pose__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hey_listen__ = __webpack_require__(1);





var hasChanged = function (prev, next) {
    if (prev === next)
        return false;
    var prevIsArray = Array.isArray(prev);
    var nextIsArray = Array.isArray(next);
    if (prevIsArray !== nextIsArray || (!prevIsArray && !nextIsArray)) {
        return true;
    }
    else if (prevIsArray && nextIsArray) {
        var numPrev = prev.length;
        var numNext = next.length;
        if (numPrev !== numNext)
            return true;
        for (var i = numPrev; i < numPrev; i++) {
            if (prev[i] !== next[i])
                return true;
        }
    }
    return false;
};

var PoseParentContext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createContext"])({});
var calcPopFromFlowStyle = function (el) {
    var offsetTop = el.offsetTop, offsetLeft = el.offsetLeft, offsetWidth = el.offsetWidth, offsetHeight = el.offsetHeight;
    return {
        position: 'absolute',
        top: offsetTop,
        left: offsetLeft,
        width: offsetWidth,
        height: offsetHeight
    };
};
var hasPose = function (pose, key) {
    return Array.isArray(pose) ? pose.indexOf(key) !== -1 : pose === key;
};
var objectToMap = function (obj) {
    return Object.keys(obj).reduce(function (map, key) {
        map.set(key, { raw: obj[key] });
        return map;
    }, new Map());
};
var PoseElement = (function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(PoseElement, _super);
    function PoseElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new Set();
        _this.childrenHandlers = {
            registerChild: function (props) {
                _this.children.add(props);
                if (_this.poser)
                    _this.flushChildren();
            },
            onUnmount: function (child) { return _this.poser.removeChild(child); },
            getParentPoseConfig: function () { return _this.props.poseConfig; },
            getInitialPoseFromParent: function () { return _this.getInitialPose(); }
        };
        _this.getRefs = function () {
            var refs = {};
            var elementType = _this.props.elementType;
            if (typeof elementType === 'string') {
                refs.ref = _this.setRef;
            }
            else {
                refs.innerRef = _this.setRef;
                refs.hostRef = _this.setRef;
            }
            return refs;
        };
        _this.setRef = function (ref) {
            if (ref instanceof Element || (_this.ref && ref === null)) {
                var innerRef = _this.props.innerRef;
                if (innerRef)
                    innerRef(ref);
                _this.ref = ref;
            }
        };
        return _this;
    }
    PoseElement.prototype.getInitialPose = function () {
        var _a = this.props, getInitialPoseFromParent = _a.getInitialPoseFromParent, pose = _a.pose, _pose = _a._pose, initialPose = _a.initialPose;
        if (initialPose) {
            return initialPose;
        }
        else {
            var parentPose = getInitialPoseFromParent && getInitialPoseFromParent();
            var thisPose = Array.isArray(pose) ? pose : [pose];
            var thisInternalPose = Array.isArray(_pose) ? _pose : [_pose];
            return Array.isArray(parentPose)
                ? parentPose.concat(thisPose, thisInternalPose) : [parentPose].concat(thisPose, thisInternalPose);
        }
    };
    PoseElement.prototype.getFirstPose = function () {
        var _a = this.props, initialPose = _a.initialPose, pose = _a.pose, _pose = _a._pose;
        if (!initialPose)
            return;
        var thisPose = Array.isArray(pose) ? pose : [pose];
        var thisInternalPose = Array.isArray(_pose) ? _pose : [_pose];
        return thisPose.concat(thisInternalPose);
    };
    PoseElement.prototype.getSetProps = function () {
        var _a = this.props, children = _a.children, elementType = _a.elementType, poseConfig = _a.poseConfig, onValueChange = _a.onValueChange, innerRef = _a.innerRef, _pose = _a._pose, pose = _a.pose, initialPose = _a.initialPose, poseKey = _a.poseKey, onPoseComplete = _a.onPoseComplete, getParentPoseConfig = _a.getParentPoseConfig, registerChild = _a.registerChild, onUnmount = _a.onUnmount, getInitialPoseFromParent = _a.getInitialPoseFromParent, popFromFlow = _a.popFromFlow, values = _a.values, parentValues = _a.parentValues, onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["children", "elementType", "poseConfig", "onValueChange", "innerRef", "_pose", "pose", "initialPose", "poseKey", "onPoseComplete", "getParentPoseConfig", "registerChild", "onUnmount", "getInitialPoseFromParent", "popFromFlow", "values", "parentValues", "onDragStart", "onDragEnd"]);
        if (popFromFlow && this.ref && this.ref instanceof HTMLElement) {
            if (!this.popStyle) {
                props.style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props.style, calcPopFromFlowStyle(this.ref));
                this.popStyle = props.style;
            }
            else {
                props.style = this.popStyle;
            }
        }
        else {
            this.popStyle = null;
        }
        return props;
    };
    PoseElement.prototype.componentDidMount = function () {
        var _this = this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(typeof this.ref !== 'undefined', "No DOM ref found. If you're converting an existing component via posed(Component), you must ensure you're passing the hostRef prop to your underlying DOM element.");
        var _a = this.props, poseConfig = _a.poseConfig, onValueChange = _a.onValueChange, registerChild = _a.registerChild, values = _a.values, parentValues = _a.parentValues, onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd;
        var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, poseConfig, { initialPose: this.getInitialPose(), values: values || poseConfig.values, parentValues: parentValues ? objectToMap(parentValues) : undefined, props: this.getSetProps(), onDragStart: onDragStart,
            onDragEnd: onDragEnd, onChange: onValueChange });
        if (!registerChild) {
            this.initPoser(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_popmotion_pose__["a" /* default */])(this.ref, config));
        }
        else {
            registerChild({
                element: this.ref,
                poseConfig: config,
                onRegistered: function (poser) { return _this.initPoser(poser); }
            });
        }
    };
    PoseElement.prototype.UNSAFE_componentWillUpdate = function (_a) {
        var pose = _a.pose, _pose = _a._pose;
        if (hasPose(pose, 'flip') || hasPose(_pose, 'flip'))
            this.poser.measure();
    };
    PoseElement.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, pose = _a.pose, _pose = _a._pose, poseKey = _a.poseKey;
        this.poser.setProps(this.getSetProps());
        if (poseKey !== prevProps.key ||
            hasChanged(prevProps.pose, pose) ||
            pose === 'flip') {
            this.setPose(pose);
        }
        if (_pose !== prevProps._pose || _pose === 'flip')
            this.setPose(_pose);
    };
    PoseElement.prototype.componentWillUnmount = function () {
        if (!this.poser)
            return;
        var onUnmount = this.props.onUnmount;
        if (onUnmount)
            onUnmount(this.poser);
        this.poser.destroy();
    };
    PoseElement.prototype.initPoser = function (poser) {
        this.poser = poser;
        this.flushChildren();
        var firstPose = this.getFirstPose();
        if (firstPose)
            this.setPose(firstPose);
    };
    PoseElement.prototype.setPose = function (pose) {
        var _this = this;
        var onPoseComplete = this.props.onPoseComplete;
        var poseList = Array.isArray(pose) ? pose : [pose];
        Promise.all(poseList.map(function (key) { return key && _this.poser.set(key); })).then(function () { return onPoseComplete && onPoseComplete(); });
    };
    PoseElement.prototype.flushChildren = function () {
        var _this = this;
        this.children.forEach(function (_a) {
            var element = _a.element, poseConfig = _a.poseConfig, onRegistered = _a.onRegistered;
            return onRegistered(_this.poser.addChild(element, poseConfig));
        });
        this.children.clear();
    };
    PoseElement.prototype.render = function () {
        var _a = this.props, elementType = _a.elementType, children = _a.children;
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(PoseParentContext.Provider, { value: this.childrenHandlers }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(elementType, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, this.getSetProps(), this.getRefs()), children)));
    };
    return PoseElement;
}(__WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"]));

var supportedElements = [
    'a',
    'article',
    'aside',
    'audio',
    'b',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dialog',
    'div',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'i',
    'iframe',
    'img',
    'input',
    'label',
    'legend',
    'li',
    'nav',
    'object',
    'ol',
    'option',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'section',
    'select',
    'span',
    'strong',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'ul',
    'video',
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'g',
    'image',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan'
];

var componentCache = new Map();
var createComponentFactory = function (key) {
    var componentFactory = function (poseConfig) {
        if (poseConfig === void 0) { poseConfig = {}; }
        return function (_a) {
            var _b = _a.withParent, withParent = _b === void 0 ? true : _b, props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["withParent"]);
            return !withParent || props.parentValues ? (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(PoseElement, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({ poseConfig: poseConfig, elementType: key }, props))) : (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(PoseParentContext.Consumer, null, function (parentCtx) { return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(PoseElement, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({ poseConfig: poseConfig, elementType: key }, props, parentCtx))); }));
        };
    };
    componentCache.set(key, componentFactory);
    return componentFactory;
};
var getComponentFactory = function (key) {
    return componentCache.has(key)
        ? componentCache.get(key)
        : createComponentFactory(key);
};
var posed = (function (component) {
    return getComponentFactory(component);
});
supportedElements.reduce(function (acc, key) {
    acc[key] = getComponentFactory(key);
    return acc;
}, posed);

var Children$1 = __WEBPACK_IMPORTED_MODULE_1_react__["Children"], cloneElement$1 = __WEBPACK_IMPORTED_MODULE_1_react__["cloneElement"];
var getKey = function (child) { return child.key; };
var animateChildrenList = function (incomingChildren, pose, initialPose) {
    var children = [];
    Children$1.forEach(incomingChildren, function (child) {
        return children.push(cloneElement$1(child, { pose: pose, initialPose: initialPose }));
    });
    return children;
};
var mergeChildren = function (_a) {
    var incomingChildren = _a.incomingChildren, displayedChildren = _a.displayedChildren, isLeaving = _a.isLeaving, removeFromTree = _a.removeFromTree, preEnterPose = _a.preEnterPose, enterPose = _a.enterPose, exitPose = _a.exitPose, flipMove = _a.flipMove;
    var children = [];
    var prevKeys = displayedChildren.map(getKey);
    var nextKeys = incomingChildren.map(getKey);
    var entering = new Set(nextKeys.filter(function (key) { return isLeaving.has(key) || prevKeys.indexOf(key) === -1; }));
    entering.forEach(function (key) { return isLeaving.delete(key); });
    var leaving = prevKeys.filter(function (key) {
        return !entering.has(key) && (isLeaving.has(key) || nextKeys.indexOf(key) === -1);
    });
    leaving.forEach(function (key) { return isLeaving.add(key); });
    var moving = new Set(prevKeys.filter(function (key, i) {
        var nextIndex = nextKeys.indexOf(key);
        return !entering.has(key) && nextIndex !== -1 && i !== nextIndex;
    }));
    incomingChildren.forEach(function (child) {
        var newChildProps = entering.has(child.key)
            ? { initialPose: preEnterPose, _pose: enterPose }
            : moving.has(child.key) && flipMove
                ? { _pose: [enterPose, 'flip'] }
                : { _pose: enterPose };
        children.push(cloneElement$1(child, newChildProps));
    });
    leaving.forEach(function (key) {
        var child = displayedChildren.find(function (c) { return c.key === key; });
        var newChild = cloneElement$1(child, {
            _pose: exitPose,
            onPoseComplete: removeFromTree(key),
            popFromFlow: flipMove
        });
        var insertionIndex = prevKeys.indexOf(key);
        children.splice(insertionIndex, 0, newChild);
    });
    return children;
};
var handleIncomingChildren = function (props) {
    var displayedChildren = props.displayedChildren, incomingChildren = props.incomingChildren, animateOnMount = props.animateOnMount, preEnterPose = props.preEnterPose, enterPose = props.enterPose;
    if (!displayedChildren && animateOnMount) {
        return animateChildrenList(incomingChildren, enterPose, preEnterPose);
    }
    else if (displayedChildren) {
        return mergeChildren(props);
    }
    else {
        return animateChildrenList(incomingChildren, enterPose);
    }
};
var makeChildList = function (children) {
    var list = [];
    Children$1.forEach(children, function (child) { return child && list.push(child); });
    return list;
};
var removeFromChildren = function (children, key) { return children.filter(function (child) { return child.key !== key; }); };

var Fragment$1 = __WEBPACK_IMPORTED_MODULE_1_react__["Fragment"];
var PoseGroup = (function (_super) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(PoseGroup, _super);
    function PoseGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            incomingChildren: [],
            isLeaving: new Set(),
            removeFromTree: function (key) { return function () {
                var isLeaving = _this.state.isLeaving;
                isLeaving.delete(key);
                _this.removeFromChildren(key);
            }; }
        };
        return _this;
    }
    PoseGroup.prototype.removeFromChildren = function (key) {
        var children = this.state.children;
        this.setState({
            children: removeFromChildren(children, key)
        });
    };
    PoseGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return this.state !== nextState;
    };
    PoseGroup.prototype.render = function () {
        var children = this.state.children;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react__["createElement"])(Fragment$1, null, children);
    };
    PoseGroup.defaultProps = {
        flipMove: true,
        preEnterPose: 'exit',
        enterPose: 'enter',
        exitPose: 'exit',
        singleChildOnly: false
    };
    PoseGroup.getDerivedStateFromProps = function (props, _a) {
        var isLeaving = _a.isLeaving, removeFromTree = _a.removeFromTree, children = _a.children;
        var incomingChildren = makeChildList(props.children);
        return {
            incomingChildren: incomingChildren,
            children: handleIncomingChildren({
                incomingChildren: incomingChildren,
                displayedChildren: children,
                isLeaving: isLeaving,
                removeFromTree: removeFromTree,
                enterPose: props.enterPose,
                exitPose: props.exitPose,
                flipMove: props.flipMove,
                animateOnMount: props.animateOnMount,
                preEnterPose: props.preEnterPose
            })
        };
    };
    return PoseGroup;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (posed);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStyledComponent", function() { return isStyledComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consolidateStreamedStyles", function() { return consolidateStreamedStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return wrapWithTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return ServerStyleSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return StyleSheetManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS", function() { return __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stylis_rule_sheet__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stylis_rule_sheet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_stylis_rule_sheet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_is__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_is___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_is__);








/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$2;

var hyphenate = hyphenate_1;

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

// 
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      return [].concat(ruleSet, flatten(chunk, executionContext));
    }

    /* Handle other components */
    if (chunk.hasOwnProperty('styledComponentId')) {
      // $FlowFixMe not sure how to make this pass
      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
    }

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    return ruleSet.concat(
    // $FlowFixMe have to add %checks somehow to isPlainObject
    __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

// 
// NOTE: This stylis instance is only used to split rules from SSR'd style tags
var stylisSplitter = new __WEBPACK_IMPORTED_MODULE_1_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: false,
  compress: false,
  semicolon: true
});

var stylis = new __WEBPACK_IMPORTED_MODULE_1_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: false // NOTE: This means "autocomplete missing semicolons"
});

// Wrap `insertRulePlugin to build a list of rules,
// and then make our own plugin to return the rules. This
// makes it easier to hook into the existing SSR architecture

var parsingRules = [];
// eslint-disable-next-line consistent-return
var returnRulesPlugin = function returnRulesPlugin(context) {
  if (context === -2) {
    var parsedRules = parsingRules;
    parsingRules = [];
    return parsedRules;
  }
};

var parseRulesPlugin = __WEBPACK_IMPORTED_MODULE_2_stylis_rule_sheet___default()(function (rule) {
  parsingRules.push(rule);
});

stylis.use([parseRulesPlugin, returnRulesPlugin]);
stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

var splitByRules = function splitByRules(css) {
  return stylisSplitter('', css);
};

// 

function isStyledComponent(target) /* : %checks */{
  return (
    // $FlowFixMe TODO: flow for styledComponentId
    typeof target === 'function' && typeof target.styledComponentId === 'string'
  );
}

// 

/* This function is DEPRECATED and will be removed on the next major version release.
 * It was needed to rehydrate all style blocks prepended to chunks before React
 * tries to rehydrate its HTML stream. Since the master StyleSheet will now detect
 * the use of streamed style tags and will perform the rehydration earlier when needed
 * this function will not be needed anymore */
function consolidateStreamedStyles() {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('styled-components automatically does streaming SSR rehydration now.\n' + 'Calling consolidateStreamedStyles manually is no longer necessary and a noop now.\n' + '- Please remove the consolidateStreamedStyles call from your client.');
  }
}

// 
/* eslint-disable no-bitwise */

/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
var charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
var getAlphabeticChar = function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};

/* input a number, usually a hash and convert it to base-52 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  /* get a char and divide by alphabet-length */
  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
};

// 

var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// 
var css = (function (styles) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (!Array.isArray(styles) && (typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
    return flatten(interleave([], [styles].concat(interpolations)));
  }
  return flatten(interleave(styles, interpolations));
});

var stream = {}

// 


var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled-components';
var SC_STREAM_ATTR = 'data-styled-streamed';
var CONTEXT_KEY = '__styled-components-stylesheet__';

var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

var DISABLE_SPEEDY = typeof false === 'boolean' && false || process.env.NODE_ENV !== 'production';

// 
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

var extractComps = (function (maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
});

// 
/* eslint-disable camelcase, no-undef */

var getNonce = (function () {
  return  true ? __webpack_require__.nc : null;
});

// 
// Helper to call a given function, only once
var once = (function (cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb();
    }
  };
});

// 
/* These are helpers for the StyleTags to keep track of the injected
 * rule names for each (component) ID that they're keeping track of.
 * They're crucial for detecting whether a name has already been
 * injected.
 * (This excludes rehydrated names) */

/* adds a new ID:name pairing to a names dictionary */
var addNameForId = function addNameForId(names, id, name) {
  if (name) {
    // eslint-disable-next-line no-param-reassign
    var namesForId = names[id] || (names[id] = Object.create(null));
    namesForId[name] = true;
  }
};

/* resets an ID entirely by overwriting it in the dictionary */
var resetIdNames = function resetIdNames(names, id) {
  // eslint-disable-next-line no-param-reassign
  names[id] = Object.create(null);
};

/* factory for a names dictionary checking the existance of an ID:name pairing */
var hasNameForId = function hasNameForId(names) {
  return function (id, name) {
    return names[id] !== undefined && names[id][name];
  };
};

/* stringifies names for the html/element output */
var stringifyNames = function stringifyNames(names) {
  var str = '';
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    str += Object.keys(names[id]).join(' ') + ' ';
  }
  return str.trim();
};

/* clones the nested names dictionary */
var cloneNames = function cloneNames(names) {
  var clone = Object.create(null);
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    clone[id] = _extends({}, names[id]);
  }
  return clone;
};

// 
/* These are helpers that deal with the insertRule (aka speedy) API
 * They are used in the StyleTags and specifically the speedy tag
 */

/* retrieve a sheet for a given style tag */
var sheetForTag = function sheetForTag(tag) {
  // $FlowFixMe
  if (tag.sheet) return tag.sheet;

  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */
  var size = document.styleSheets.length;
  for (var i = 0; i < size; i += 1) {
    var sheet = document.styleSheets[i];
    // $FlowFixMe
    if (sheet.ownerNode === tag) return sheet;
  }

  /* we should always be able to find a tag */
  throw new Error();
};

/* insert a rule safely and return whether it was actually injected */
var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
  /* abort early if cssRule string is falsy */
  if (!cssRule) return false;

  var maxIndex = sheet.cssRules.length;

  try {
    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
  } catch (err) {
    /* any error indicates an invalid rule */
    return false;
  }

  return true;
};

/* deletes `size` rules starting from `removalIndex` */
var deleteRules = function deleteRules(sheet, removalIndex, size) {
  var lowerBound = removalIndex - size;
  for (var i = removalIndex; i > lowerBound; i -= 1) {
    sheet.deleteRule(i);
  }
};

// 
/* eslint-disable flowtype/object-type-delimiter */
/* eslint-disable react/prop-types */

/* this error is used for makeStyleTag */
var parentNodeUnmountedErr = process.env.NODE_ENV !== 'production' ? '\nTrying to insert a new style tag, but the given Node is unmounted!\n- Are you using a custom target that isn\'t mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n'.trim() : '';

/* this error is used for tags */
var throwCloneTagErr = function throwCloneTagErr() {
  throw new Error(process.env.NODE_ENV !== 'production' ? '\nThe clone method cannot be used on the client!\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n'.trim() : '');
};

/* this marker separates component styles and is important for rehydration */
var makeTextMarker = function makeTextMarker(id) {
  return '\n/* sc-component-id: ' + id + ' */\n';
};

/* add up all numbers in array up until and including the index */
var addUpUntilIndex = function addUpUntilIndex(sizes, index) {
  var totalUpToIndex = 0;
  for (var i = 0; i <= index; i += 1) {
    totalUpToIndex += sizes[i];
  }

  return totalUpToIndex;
};

/* create a new style tag after lastEl */
var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
  var el = document.createElement('style');
  el.setAttribute(SC_ATTR, '');

  var nonce = getNonce();
  if (nonce) {
    el.setAttribute('nonce', nonce);
  }

  /* Work around insertRule quirk in EdgeHTML */
  el.appendChild(document.createTextNode(''));

  if (target && !tagEl) {
    /* Append to target when no previous element was passed */
    target.appendChild(el);
  } else {
    if (!tagEl || !target || !tagEl.parentNode) {
      throw new Error(parentNodeUnmountedErr);
    }

    /* Insert new style tag after the previous one */
    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
  }

  return el;
};

/* takes a css factory function and outputs an html styled tag factory */
var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
  return function (additionalAttrs) {
    var nonce = getNonce();
    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', additionalAttrs];

    var htmlAttr = attrs.filter(Boolean).join(' ');
    return '<style ' + htmlAttr + '>' + css() + '</style>';
  };
};

/* takes a css factory function and outputs an element factory */
var wrapAsElement = function wrapAsElement(css, names) {
  return function () {
    var _props;

    var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props);

    var nonce = getNonce();
    if (nonce) {
      // $FlowFixMe
      props.nonce = nonce;
    }

    // eslint-disable-next-line react/no-danger
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
  };
};

var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
  return function () {
    return Object.keys(markers);
  };
};

/* speedy tags utilise insertRule */
var makeSpeedyTag = function makeSpeedyTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);
  var sizes = [];

  var extractImport = getImportRuleTag !== undefined;
  /* indicates whther getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = sizes.length;
    sizes.push(0);
    resetIdNames(names, id);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var sheet = sheetForTag(el);
    var insertIndex = addUpUntilIndex(sizes, marker);

    var injectedRules = 0;
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var cssRule = cssRules[i];
      var mayHaveImport = extractImport; /* @import rules are reordered to appear first */
      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
        importRules.push(cssRule);
      } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
        mayHaveImport = false;
        injectedRules += 1;
      }
    }

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }

    sizes[marker] += injectedRules; /* add up no of injected rules */
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;

    var size = sizes[marker];
    var sheet = sheetForTag(el);
    var removalIndex = addUpUntilIndex(sizes, marker);
    deleteRules(sheet, removalIndex, size);
    sizes[marker] = 0;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var _sheetForTag = sheetForTag(el),
        cssRules = _sheetForTag.cssRules;

    var str = '';

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += makeTextMarker(id);
      var marker = markers[id];
      var end = addUpUntilIndex(sizes, marker);
      var size = sizes[marker];
      for (var i = end - size; i < end; i += 1) {
        var rule = cssRules[i];
        if (rule !== undefined) {
          str += rule.cssText;
        }
      }
    }

    return str;
  };

  return {
    styleTag: el,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    css: css,
    toHTML: wrapAsHtmlTag(css, names),
    toElement: wrapAsElement(css, names),
    clone: throwCloneTagErr
  };
};

var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);

  var extractImport = getImportRuleTag !== undefined;
  var makeTextNode = function makeTextNode(id) {
    return document.createTextNode(makeTextMarker(id));
  };

  /* indicates whther getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = makeTextNode(id);
    el.appendChild(markers[id]);
    names[id] = Object.create(null);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var rule = cssRules[i];
      var mayHaveImport = extractImport;
      if (mayHaveImport && rule.indexOf('@import') !== -1) {
        importRules.push(rule);
      } else {
        mayHaveImport = false;
        var separator = i === cssRulesSize - 1 ? '' : ' ';
        marker.appendData('' + rule + separator);
      }
    }

    addNameForId(names, id, name);

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;

    /* create new empty text node and replace the current one */
    var newMarker = makeTextNode(id);
    el.replaceChild(newMarker, marker);
    markers[id] = newMarker;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += markers[id].data;
    }
    return str;
  };

  return {
    styleTag: el,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    css: css,
    toHTML: wrapAsHtmlTag(css, names),
    toElement: wrapAsElement(css, names),
    clone: throwCloneTagErr
  };
};

var makeServerTagInternal = function makeServerTagInternal(namesArg, markersArg) {
  var names = namesArg === undefined ? Object.create(null) : namesArg;
  var markers = markersArg === undefined ? Object.create(null) : markersArg;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    return markers[id] = [''];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    marker[0] += cssRules.join(' ');
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    marker[0] = '';
    resetIdNames(names, id);
  };

  var css = function css() {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      var cssForId = markers[id][0];
      if (cssForId) {
        str += makeTextMarker(id) + cssForId;
      }
    }
    return str;
  };

  var clone = function clone() {
    var namesClone = cloneNames(names);
    var markersClone = Object.create(null);

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      markersClone[id] = [markers[id][0]];
    }

    return makeServerTagInternal(namesClone, markersClone);
  };

  var tag = {
    styleTag: null,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    css: css,
    toHTML: wrapAsHtmlTag(css, names),
    toElement: wrapAsElement(css, names),
    clone: clone
  };

  return tag;
};

var makeServerTag = function makeServerTag() {
  return makeServerTagInternal();
};

var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
  if (IS_BROWSER && !forceServer) {
    var el = makeStyleTag(target, tagEl, insertBefore);
    if (DISABLE_SPEEDY) {
      return makeBrowserTag(el, getImportRuleTag);
    } else {
      return makeSpeedyTag(el, getImportRuleTag);
    }
  }

  return makeServerTag();
};

/* wraps a given tag so that rehydration is performed once when necessary */
var makeRehydrationTag = function makeRehydrationTag(tag, els, extracted, names, immediateRehydration) {
  /* rehydration function that adds all rules to the new tag */
  var rehydrate = once(function () {
    /* add all extracted components to the new tag */
    for (var i = 0; i < extracted.length; i += 1) {
      var _extracted$i = extracted[i],
          componentId = _extracted$i.componentId,
          cssFromDOM = _extracted$i.cssFromDOM;

      var cssRules = splitByRules(cssFromDOM);
      tag.insertRules(componentId, cssRules);
    }

    /* remove old HTMLStyleElements, since they have been rehydrated */
    for (var _i = 0; _i < els.length; _i += 1) {
      var el = els[_i];
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  });

  if (immediateRehydration) rehydrate();

  return _extends({}, tag, {
    /* add rehydration hook to insertion methods */
    insertMarker: function insertMarker(id) {
      rehydrate();
      return tag.insertMarker(id);
    },
    insertRules: function insertRules(id, cssRules, name) {
      rehydrate();
      return tag.insertRules(id, cssRules, name);
    }
  });
};

// 

/* determine the maximum number of components before tags are sharded */
var MAX_SIZE = void 0;
if (IS_BROWSER) {
  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
  MAX_SIZE = DISABLE_SPEEDY ? 40 : 1000;
} else {
  /* for servers we do not need to shard at all */
  MAX_SIZE = -1;
}

var sheetRunningId = 0;
var master = void 0;

var StyleSheet = function () {
  /* a map from ids to tags */
  /* deferred rules for a given id */
  /* this is used for not reinjecting rules via hasNameForId() */
  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */
  /* a list of tags belonging to this StyleSheet */
  /* a tag for import rules */
  /* current capacity until a new tag must be created */
  /* children (aka clones) of this StyleSheet inheriting all and future injections */

  function StyleSheet() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    classCallCheck(this, StyleSheet);

    this.getImportRuleTag = function () {
      var importRuleTag = _this.importRuleTag;

      if (importRuleTag !== undefined) {
        return importRuleTag;
      }

      var firstTag = _this.tags[0];
      var insertBefore = true;

      return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
    };

    sheetRunningId += 1;
    this.id = sheetRunningId;
    this.sealed = false;
    this.forceServer = forceServer;
    this.target = forceServer ? null : target;
    this.tagMap = {};
    this.deferred = {};
    this.rehydratedNames = {};
    this.ignoreRehydratedNames = {};
    this.tags = [];
    this.capacity = 1;
    this.clones = [];
  }

  /* rehydrate all SSR'd style tags */


  StyleSheet.prototype.rehydrate = function rehydrate() {
    if (!IS_BROWSER || this.forceServer) {
      return this;
    }

    var els = [];
    var names = [];
    var extracted = [];
    var isStreamed = false;

    /* retrieve all of our SSR style elements from the DOM */
    var nodes = document.querySelectorAll('style[' + SC_ATTR + ']');
    var nodesSize = nodes.length;

    /* abort rehydration if no previous style tags were found */
    if (nodesSize === 0) {
      return this;
    }

    for (var i = 0; i < nodesSize; i += 1) {
      // $FlowFixMe: We can trust that all elements in this query are style elements
      var el = nodes[i];

      /* check if style tag is a streamed tag */
      isStreamed = !!el.getAttribute(SC_STREAM_ATTR) || isStreamed;

      /* retrieve all component names */
      var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(/\s+/);
      var elNamesSize = elNames.length;
      for (var j = 0; j < elNamesSize; j += 1) {
        var name = elNames[j];
        /* add rehydrated name to sheet to avoid readding styles */
        this.rehydratedNames[name] = true;
        names.push(name);
      }

      /* extract all components and their CSS */
      extracted = extracted.concat(extractComps(el.textContent));
      /* store original HTMLStyleElement */
      els.push(el);
    }

    /* abort rehydration if nothing was extracted */
    var extractedSize = extracted.length;
    if (extractedSize === 0) {
      return this;
    }

    /* create a tag to be used for rehydration */
    var tag = this.makeTag(null);
    var rehydrationTag = makeRehydrationTag(tag, els, extracted, names, isStreamed);

    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
    this.capacity = Math.max(1, MAX_SIZE - extractedSize);
    this.tags.push(rehydrationTag);

    /* retrieve all component ids */
    for (var _j = 0; _j < extractedSize; _j += 1) {
      this.tagMap[extracted[_j].componentId] = rehydrationTag;
    }

    return this;
  };

  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
   * The master StyleSheet is targeted by injectGlobal, keyframes, and components outside of any
    * StyleSheetManager's context */


  /* reset the internal "master" instance */
  StyleSheet.reset = function reset() {
    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    master = new StyleSheet(undefined, forceServer).rehydrate();
  };

  /* adds "children" to the StyleSheet that inherit all of the parents' rules
   * while their own rules do not affect the parent */


  StyleSheet.prototype.clone = function clone() {
    var sheet = new StyleSheet(this.target, this.forceServer);
    /* add to clone array */
    this.clones.push(sheet);

    /* clone all tags */
    sheet.tags = this.tags.map(function (tag) {
      var ids = tag.getIds();
      var newTag = tag.clone();

      /* reconstruct tagMap */
      for (var i = 0; i < ids.length; i += 1) {
        sheet.tagMap[ids[i]] = newTag;
      }

      return newTag;
    });

    /* clone other maps */
    sheet.rehydratedNames = _extends({}, this.rehydratedNames);
    sheet.deferred = _extends({}, this.deferred);

    return sheet;
  };

  /* force StyleSheet to create a new tag on the next injection */


  StyleSheet.prototype.sealAllTags = function sealAllTags() {
    this.capacity = 1;
    this.sealed = true;
  };

  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
    var lastEl = tag ? tag.styleTag : null;
    var insertBefore = false;

    return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
  };

  /* get a tag for a given componentId, assign the componentId to one, or shard */
  StyleSheet.prototype.getTagForId = function getTagForId(id) {
    /* simply return a tag, when the componentId was already assigned one */
    var prev = this.tagMap[id];
    if (prev !== undefined && !this.sealed) {
      return prev;
    }

    var tag = this.tags[this.tags.length - 1];

    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
    this.capacity -= 1;
    if (this.capacity === 0) {
      this.capacity = MAX_SIZE;
      this.sealed = false;
      tag = this.makeTag(tag);
      this.tags.push(tag);
    }

    return this.tagMap[id] = tag;
  };

  /* mainly for injectGlobal to check for its id */


  StyleSheet.prototype.hasId = function hasId(id) {
    return this.tagMap[id] !== undefined;
  };

  /* caching layer checking id+name to already have a corresponding tag and injected rules */


  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
    /* exception for rehydrated names which are checked separately */
    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
      return true;
    }

    var tag = this.tagMap[id];
    return tag !== undefined && tag.hasNameForId(id, name);
  };

  /* registers a componentId and registers it on its tag */


  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
    /* don't inject when the id is already registered */
    if (this.tagMap[id] !== undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].deferredInject(id, cssRules);
    }

    this.getTagForId(id).insertMarker(id);
    this.deferred[id] = cssRules;
  };

  /* injects rules for a given id with a name that will need to be cached */


  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].inject(id, cssRules, name);
    }

    /* add deferred rules for component */
    var injectRules = cssRules;
    var deferredRules = this.deferred[id];
    if (deferredRules !== undefined) {
      injectRules = deferredRules.concat(injectRules);
      delete this.deferred[id];
    }

    var tag = this.getTagForId(id);
    tag.insertRules(id, injectRules, name);
  };

  /* removes all rules for a given id, which doesn't remove its marker but resets it */


  StyleSheet.prototype.remove = function remove(id) {
    var tag = this.tagMap[id];
    if (tag === undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].remove(id);
    }

    /* remove all rules from the tag */
    tag.removeRules(id);
    /* ignore possible rehydrated names */
    this.ignoreRehydratedNames[id] = true;
    /* delete possible deferred rules */
    delete this.deferred[id];
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    var id = this.id;


    return this.tags.map(function (tag, i) {
      var key = 'sc-' + id + '-' + i;
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react__["cloneElement"])(tag.toElement(), { key: key });
    });
  };

  createClass(StyleSheet, null, [{
    key: 'master',
    get: function get$$1() {
      return master || (master = new StyleSheet().rehydrate());
    }

    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

  }, {
    key: 'instance',
    get: function get$$1() {
      return StyleSheet.master;
    }
  }]);
  return StyleSheet;
}();

var _StyleSheetManager$ch;

// 
/* this error is used for makeStyleTag */
var targetPropErr = process.env.NODE_ENV !== 'production' ? '\nThe StyleSheetManager expects a valid target or sheet prop!\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n'.trim() : '';

var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.sheetInstance, _ref;
  };

  StyleSheetManager.prototype.componentWillMount = function componentWillMount() {
    if (this.props.sheet) {
      this.sheetInstance = this.props.sheet;
    } else if (this.props.target) {
      this.sheetInstance = new StyleSheet(this.props.target);
    } else {
      throw new Error(targetPropErr);
    }
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.Children.only(this.props.children);
  };

  return StyleSheetManager;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);

process.env.NODE_ENV !== "production" ? StyleSheetManager.propTypes = {
  sheet: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(ServerStyleSheet)]),
  target: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.shape({
    appendChild: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func.isRequired
  })
} : void 0;

// 
/* eslint-disable no-underscore-dangle */
/* this error is used for makeStyleTag */
var sheetClosedErr = process.env.NODE_ENV !== 'production' ? '\nCan\'t collect styles once you\'ve consumed a ServerStyleSheet\'s styles!\nServerStyleSheet is a one off instance for each server-side render cycle.\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n'.trim() : '';

var streamBrowserErr = process.env.NODE_ENV !== 'production' ? 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.' : '';

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    /* The master sheet might be reset, so keep a reference here */
    this.masterSheet = StyleSheet.master;
    this.instance = this.masterSheet.clone();
    this.closed = false;
  }

  ServerStyleSheet.prototype.complete = function complete() {
    if (!this.closed) {
      /* Remove closed StyleSheets from the master sheet */
      var index = this.masterSheet.clones.indexOf(this.instance);
      this.masterSheet.clones.splice(index, 1);
      this.closed = true;
    }
  };

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) {
      throw new Error(sheetClosedErr);
    }

    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    this.complete();
    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    this.complete();
    return this.instance.toReactElements();
  };

  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
    var _this = this;

    {
      throw new Error(streamBrowserErr);
    }

    /* the tag index keeps track of which tags have already been emitted */
    var instance = this.instance;

    var instanceTagIndex = 0;

    var streamAttr = SC_STREAM_ATTR + '="true"';

    var transformer = new stream.Transform({
      transform: function appendStyleChunks(chunk, /* encoding */_, callback) {
        var tags = instance.tags;

        var html = '';

        /* retrieve html for each new style tag */
        for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
          var tag = tags[instanceTagIndex];
          html += tag.toHTML(streamAttr);
        }

        /* force our StyleSheets to emit entirely new tags */
        instance.sealAllTags();

        /* prepend style html to chunk */
        this.push(html + chunk);
        callback();
      }
    });

    readableStream.on('end', function () {
      return _this.complete();
    });
    readableStream.on('error', function (err) {
      _this.complete();

      // forward the error to the transform stream
      transformer.emit('error', err);
    });

    return readableStream.pipe(transformer);
  };

  return ServerStyleSheet;
}();

// 

var LIMIT = 200;

var createWarnTooManyClasses = (function (displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

// 

var determineTheme = (function (props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
  /* eslint-enable */

  return theme;
});

// 
var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
var dashesAtEnds = /(^-|-$)/g;

/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */
function escape(str) {
  return str
  // Replace all possible CSS selectors
  .replace(escapeRegex, '-')

  // Remove extraneous hyphens at the start and end
  .replace(dashesAtEnds, '');
}

// 

function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

// 

function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

// 
function generateDisplayName(target) {
  return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
}

// 
/* eslint-disable max-len */
/**
 * Trying to avoid the unknown-prop errors on styled components by filtering by
 * React's attribute whitelist.
 *
 * To regenerate this regex:
 *
 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
 * 2. Run `regexgen` with the list of space-separated words below as input
 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
 *    and no false positives from partials
 * */
/*
children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onInvalid onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controlsList controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
*/
/* eslint-enable max-len */

var ATTRIBUTE_REGEX = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:Animation|Touch|Load|Drag)Start|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|Lo(?:stPointer|ad)|TimeUpdate|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|GotPointer|MouseDown|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|KeyPress|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|P(?:rogress|laying)|DragEnd|Key(?:Down|Up)|(?:MouseU|Dro)p|(?:Wait|Seek)ing|Scroll|Focus|Paste|Abort|Drag|Play|Blur)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|onPointerLeav|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|onPointerMov|(?:attribute|glyph)Nam|playsInlin|(?:writing|input|edge)Mod|(?:formE|e)ncTyp|(?:amplitu|mo)d|(?:xlinkTy|itemSco|keyTy|slo)p|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ord)s|o(?:lor(?:Interpolation)?|nt(?:rols|ent))|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|(?:ontrolsLis|apHeigh)t|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|o(?:ntextMenu|ls)|(?:rossOrigi|olSpa)n|lip(?:Path)?|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|autoFocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|on(?:PointerDow|FocusI)|formActio|zoomAndPa|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)|rient)|p(?:reserveA(?:spectRatio|lpha)|ointsAt[X-Z]|anose1)|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:gradientT|patternT|t)ransform|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:strokeMiterlimi|(?:specularConsta|repeatCou|fontVaria)n|(?:(?:specularE|e)xpon|renderingInt|asc)en|d(?:iffuseConsta|esce)n|(?:fontSizeAdju|lengthAdju|manife)s|baselineShif|onPointerOu|vectorEffec|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|markerStar|a(?:utoCorrec|bou)|onFocusOu|intercep|restar|forma|inlis|heigh|lis)t|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|k(?:ernel(?:UnitLength|Matrix)|[1-4])|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|(?:markerM|onInval)i|preloa|metho|kin)d|strokeDasharray|(?:onPointerCanc|lab)el|(?:allowFullScre|hidd)en|systemLanguage|(?:(?:o(?:nPointer(?:Ent|Ov)|rd)|allowReord|placehold|frameBord|paintOrd|post)e|repeatDu|d(?:efe|u))r|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|(?:pointerEve|keyPoi)nts|(?:strokeLineca|onPointerU|itemPro|useMa|wra|loo)p|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|(?:vI|i)deographic|unicodeRange|mathematical|vAlphabetic|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|(?:xmlnsXl|valueL)ink|mediaGroup|spellCheck|(?:text|m(?:in|ax))Length|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|a(?:rabicForm|l(?:phabetic|t)|sync)|pathLength|innerHTML|xlinkShow|(?:xlinkHr|glyphR)ef|(?:tabInde|(?:sand|b)bo|viewBo)x|(?:(?:href|xml|src)La|kerni)ng|autoPlay|o(?:verflow|pen)|f(?:o(?:ntSize|rm)|il(?:ter|l))|r(?:e(?:quired|sult|f))?|divisor|p(?:attern|oints)|unicode|d(?:efault|ata|ir)?|i(?:temRef|n2|s)|t(?:arget[XY]|o)|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|(?:width|size)s|prefix|typeof|itemID|s(?:t(?:roke|art)|hape|cope|rc)|t(?:arget|ype)|(?:stri|la)ng|a(?:ccept|s)|m(?:edia|a(?:sk|x)|in)|x(?:mlns)?|width|value|size|href|k(?:ey)?|end|low|by|i[dn]|y[12]|g[12]|x[12]|f[xy]|[yz])$/;

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(x|data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var validAttr = (function (name) {
  return ATTRIBUTE_REGEX.test(name) || isCustomAttribute(name.toLowerCase());
});

// 

function hasInInheritanceChain(child, parent) {
  var target = child;

  while (target) {
    target = Object.getPrototypeOf(target);

    if (target && target === parent) {
      return true;
    }
  }

  return false;
}

// 
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var listener = listeners[key];
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

var _ThemeProvider$childC;
var _ThemeProvider$contex;

// 
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';
var CHANNEL_NEXT = CHANNEL + 'next__';

var CONTEXT_CHANNEL_SHAPE = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.shape({
  getTheme: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  subscribe: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func,
  unsubscribe: __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func
});

var warnChannelDeprecated = void 0;
if (process.env.NODE_ENV !== 'production') {
  warnChannelDeprecated = once(function () {
    // eslint-disable-next-line no-console
    console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
  });
}

var isFunction = function isFunction(test) {
  return typeof test === 'function';
};

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.unsubscribeToOuterId = -1;

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    var outerContext = this.context[CHANNEL_NEXT];
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
        _this2.outerTheme = theme;

        if (_this2.broadcast !== undefined) {
          _this2.publish(_this2.props.theme);
        }
      });
    }

    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _this3 = this,
        _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      if (process.env.NODE_ENV !== 'production') {
        warnChannelDeprecated();
      }

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId);
      };
    }, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.publish(nextProps.theme);
    }
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;
    if (isFunction(theme)) {
      var mergedTheme = theme(this.outerTheme);
      if (process.env.NODE_ENV !== 'production' && (mergedTheme === null || Array.isArray(mergedTheme) || (typeof mergedTheme === 'undefined' ? 'undefined' : _typeof(mergedTheme)) !== 'object')) {
        throw new Error(process.env.NODE_ENV !== 'production' ? '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!' : '');
      }
      return mergedTheme;
    }
    if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
      throw new Error(process.env.NODE_ENV !== 'production' ? '[ThemeProvider] Please make your theme prop an object' : '');
    }
    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.publish = function publish(theme) {
    this.broadcast.publish(this.getTheme(theme));
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.Children.only(this.props.children);
  };

  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC);
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

// 

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
var STATIC_EXECUTION_CONTEXT = {};

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  var identifiers = {};

  /* We depend on components having unique IDs */
  var generateId = function generateId(_displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

    /**
     * This ensures uniqueness if two components happen to share
     * the same displayName.
     */
    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;

    var componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);

    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
  };

  // $FlowFixMe

  var BaseStyledComponent = function (_Component) {
    inherits(BaseStyledComponent, _Component);

    function BaseStyledComponent() {
      var _temp, _this, _ret;

      classCallCheck(this, BaseStyledComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: ''
      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      var attrs = this.constructor.attrs;

      var context = _extends({}, props, { theme: theme });
      if (attrs === undefined) {
        return context;
      }

      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
        var attr = attrs[key];
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' && !hasInInheritanceChain(attr, __WEBPACK_IMPORTED_MODULE_3_react__["Component"]) ? attr(context) : attr;
        return acc;
      }, {});

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var _constructor = this.constructor,
          attrs = _constructor.attrs,
          componentStyle = _constructor.componentStyle,
          warnTooManyClasses = _constructor.warnTooManyClasses;

      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.master;

      // staticaly styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names
      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
      } else {
        var executionContext = this.buildExecutionContext(theme, props);
        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

        if (process.env.NODE_ENV !== 'production' && warnTooManyClasses !== undefined) {
          warnTooManyClasses(className);
        }

        return className;
      }
    };

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var componentStyle = this.constructor.componentStyle;

      var styledContext = this.context[CHANNEL_NEXT];

      // If this is a staticaly-styled component, we don't need to the theme
      // to generate or build styles.
      if (componentStyle.isStatic) {
        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
        this.setState({ generatedClassName: generatedClassName });
        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
      } else if (styledContext !== undefined) {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          // This will be called once immediately
          var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);
          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
        });
      } else {
        // eslint-disable-next-line react/prop-types
        var theme = this.props.theme || {};
        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme: theme, generatedClassName: _generatedClassName });
      }
    };

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // If this is a statically-styled component, we don't need to listen to
      // props changes to update styles
      var componentStyle = this.constructor.componentStyle;

      if (componentStyle.isStatic) {
        return;
      }

      this.setState(function (prevState) {
        var theme = determineTheme(nextProps, prevState.theme, _this3.constructor.defaultProps);
        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

        return { theme: theme, generatedClassName: generatedClassName };
      });
    };

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribeFromContext();
    };

    BaseStyledComponent.prototype.render = function render() {
      var _this4 = this;

      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var generatedClassName = this.state.generatedClassName;
      var _constructor2 = this.constructor,
          styledComponentId = _constructor2.styledComponentId,
          target = _constructor2.target;


      var isTargetTag = isTag(target);

      var className = [
      // eslint-disable-next-line react/prop-types
      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      var baseProps = _extends({}, this.attrs, {
        className: className
      });

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef;
      } else {
        baseProps.ref = innerRef;
      }

      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName];
        }

        return acc;
      }, baseProps);

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react__["createElement"])(target, propsForElement);
    };

    return BaseStyledComponent;
  }(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _StyledComponent$cont;

    var _options$isClass = options.isClass,
        isClass = _options$isClass === undefined ? !isTag(target) : _options$isClass,
        _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId;

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.target = target;
    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.instanceOf(ServerStyleSheet)]), _StyledComponent$cont);


    if (process.env.NODE_ENV !== 'production') {
      StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    if (isClass) {
      __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default()(StyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        extend: true,
        styledComponentId: true,
        target: true,
        warnTooManyClasses: true,
        withComponent: true
      });
    }

    return StyledComponent;
  };

  return createStyledComponent;
});

// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash(str) {
  var l = str.length | 0,
      h = l | 0,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;

  return h >>> 0;
}

// 
var areStylesCacheable = IS_BROWSER;

var isStaticRules = function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false;
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled component
      return false;
    }
  }

  if (attrs !== undefined) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in attrs) {
      var value = attrs[key];
      if (typeof value === 'function') {
        return false;
      }
    }
  }

  return true;
};

var isHMREnabled = typeof module !== 'undefined' && module.hot && process.env.NODE_ENV !== 'production';

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  /* combines hashStr (murmurhash) and nameGenerator for convenience */
  var generateRuleHash = function generateRuleHash(str) {
    return nameGenerator(murmurhash(str));
  };

  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHMREnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;

      if (!StyleSheet.master.hasId(componentId)) {
        var placeholder = process.env.NODE_ENV !== 'production' ? ['.' + componentId + ' {}'] : [];

        StyleSheet.master.deferredInject(componentId, placeholder);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          componentId = this.componentId,
          lastClassName = this.lastClassName;

      if (areStylesCacheable && isStatic && lastClassName !== undefined && styleSheet.hasNameForId(componentId, lastClassName)) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext);
      var name = generateRuleHash(this.componentId + flatCSS.join(''));

      if (!styleSheet.hasNameForId(componentId, name)) {
        var css = stringifyRules(flatCSS, '.' + name);
        styleSheet.inject(this.componentId, css, name);
      }

      this.lastClassName = name;
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return generateRuleHash(str);
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
});

// 
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

// 
var _styled = (function (styledComponent, constructWithOptions) {
  var styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
});

// 
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function () {
    var styleSheet = StyleSheet.master;
    var rules = css.apply(undefined, arguments);
    var name = nameGenerator(murmurhash(replaceWhitespace(JSON.stringify(rules))));
    var id = 'sc-keyframes-' + name;

    if (!styleSheet.hasNameForId(id, name)) {
      styleSheet.inject(id, stringifyRules(rules, name, '@keyframes'), name);
    }

    return name;
  };
});

// 
var _injectGlobal = (function (stringifyRules, css) {
  var injectGlobal = function injectGlobal() {
    var styleSheet = StyleSheet.master;
    var rules = css.apply(undefined, arguments);
    var hash = murmurhash(JSON.stringify(rules));
    var id = 'sc-global-' + hash;

    if (!styleSheet.hasId(id)) {
      styleSheet.inject(id, stringifyRules(rules));
    }
  };

  return injectGlobal;
});

// 
var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_is__["isValidElementType"])(tag)) {
      throw new Error(process.env.NODE_ENV !== 'production' ? 'Cannot create styled-component for component: ' + String(tag) : '');
    }

    /* This is callable directly as a template function */
    // $FlowFixMe: Not typed to avoid destructuring arguments
    var templateFunction = function templateFunction() {
      return componentConstructor(tag, options, css.apply(undefined, arguments));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs)
      }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

// 
var wrapWithTheme = function wrapWithTheme(Component$$1) {
  var _WithTheme$contextTyp;

  var componentName = Component$$1.displayName || Component$$1.name || 'Component';
  var isStatelessFunctionalComponent = typeof Component$$1 === 'function' &&
  // $FlowFixMe TODO: flow for prototype
  !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

  // NOTE: We can't pass a ref to a stateless functional component
  var shouldSetInnerRef = isStyledComponent(Component$$1) || isStatelessFunctionalComponent;

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var defaultProps = this.constructor.defaultProps;

      var styledContext = this.context[CHANNEL_NEXT];
      var themeProp = determineTheme(this.props, undefined, defaultProps);
      if (styledContext === undefined && themeProp === undefined && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp });
      } else {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
          _this2.setState({ theme: theme });
        });
      }
    };

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var defaultProps = this.constructor.defaultProps;

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

        return { theme: theme };
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    WithTheme.prototype.render = function render() {
      var props = _extends({
        theme: this.state.theme
      }, this.props);

      if (!shouldSetInnerRef) {
        props.ref = props.innerRef;
        delete props.innerRef;
      }

      return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Component$$1, props);
    };

    return WithTheme;
  }(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

  WithTheme.displayName = 'WithTheme(' + componentName + ')';
  WithTheme.styledComponentId = 'withTheme';
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = __WEBPACK_IMPORTED_MODULE_4_prop_types___default.a.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp);


  return __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default()(WithTheme, Component$$1);
};

// 

/* eslint-disable */
var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
  StyleSheet: StyleSheet
};

// 

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Warning if you've imported this file on React Native */
if (process.env.NODE_ENV !== 'production' && typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
  // eslint-disable-next-line no-console
  console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
}

/* Warning if there are several instances of styled-components */
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Node.js') === -1 && navigator.userAgent.indexOf('jsdom') === -1) {
  window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

  if (window['__styled-components-init__'] === 1) {
    // eslint-disable-next-line no-console
    console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
  }

  window['__styled-components-init__'] += 1;
}

/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);


/* harmony default export */ __webpack_exports__["default"] = (styled);
//# sourceMappingURL=styled-components.browser.es.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(30)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    width: 35px;\n    height: 4px;\n    background-color: white;\n    margin: 6px 0;\n    transition: 0.4s;\n'], ['\n    width: 35px;\n    height: 4px;\n    background-color: white;\n    margin: 6px 0;\n    transition: 0.4s;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    width: 35px;\n    height: 4px;\n    background-color: black;\n    margin: 6px 0;\n    transition: 0.4s;\n'], ['\n    width: 35px;\n    height: 4px;\n    background-color: black;\n    margin: 6px 0;\n    transition: 0.4s;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    padding: 1em;\n    position: relative;\n    overflow: hidden;\n    height: 100vh;\n    &:before {\n        filter: blur(10px);\n        content: "";\n        position: absolute;\n        left: -10px;\n        top: -10px;\n        width: calc(100% + 20px);\n        height: calc(100% + 20px);\n        z-index: -1;\n        background: url(', ') center/cover;\n        background-attachment: fixed;\n    }\n    &:after {\n        content: "";\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        z-index: -1;\n        opacity: 0.35;\n        border: 1px solid ', ';\n        background: ', ';\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==);\n    }\n    border-radius: 1px;\n    box-shadow: 0 10px 30px rgba(121, 121, 121, 0.1), 0 1px 8px rgba(128, 128, 128, 0.2);\n'], ['\n    padding: 1em;\n    position: relative;\n    overflow: hidden;\n    height: 100vh;\n    &:before {\n        filter: blur(10px);\n        content: "";\n        position: absolute;\n        left: -10px;\n        top: -10px;\n        width: calc(100% + 20px);\n        height: calc(100% + 20px);\n        z-index: -1;\n        background: url(', ') center/cover;\n        background-attachment: fixed;\n    }\n    &:after {\n        content: "";\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        z-index: -1;\n        opacity: 0.35;\n        border: 1px solid ', ';\n        background: ', ';\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==);\n    }\n    border-radius: 1px;\n    box-shadow: 0 10px 30px rgba(121, 121, 121, 0.1), 0 1px 8px rgba(128, 128, 128, 0.2);\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    height:30px;\n    width:30px;\n    margin:10px 35px 10px 0px;\n    float:left;\n'], ['\n    height:30px;\n    width:30px;\n    margin:10px 35px 10px 0px;\n    float:left;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n    display:table;\n'], ['\n    display:table;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n    padding-top:15px;\n    padding-right:20px;\n    position:relative;\n    float:left;\n    color:white;\n    -webkit-user-select: none; /* Safari */        \n    -moz-user-select: none; /* Firefox */\n    -ms-user-select: none; /* IE10+/Edge */\n    user-select: none; /* Standard */\n'], ['\n    padding-top:15px;\n    padding-right:20px;\n    position:relative;\n    float:left;\n    color:white;\n    -webkit-user-select: none; /* Safari */        \n    -moz-user-select: none; /* Firefox */\n    -ms-user-select: none; /* IE10+/Edge */\n    user-select: none; /* Standard */\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n    padding-top:15px;\n    padding-right:20px;\n    position:relative;\n    float:left;\n    color:black;\n    -webkit-user-select: none; /* Safari */        \n    -moz-user-select: none; /* Firefox */\n    -ms-user-select: none; /* IE10+/Edge */\n    user-select: none; /* Standard */\n'], ['\n    padding-top:15px;\n    padding-right:20px;\n    position:relative;\n    float:left;\n    color:black;\n    -webkit-user-select: none; /* Safari */        \n    -moz-user-select: none; /* Firefox */\n    -ms-user-select: none; /* IE10+/Edge */\n    user-select: none; /* Standard */\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n    margin-top:40px;\n    display:table;\n    float:clear;\n    cursor:pointer;\n'], ['\n    margin-top:40px;\n    display:table;\n    float:clear;\n    cursor:pointer;\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPose = __webpack_require__(12);

var _reactPose2 = _interopRequireDefault(_reactPose);

var _reactDelay = __webpack_require__(11);

var _reactDelay2 = _interopRequireDefault(_reactDelay);

var _styledComponents = __webpack_require__(13);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _popmotion = __webpack_require__(6);

var _hover = __webpack_require__(10);

var _hover2 = _interopRequireDefault(_hover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//HamBtn
var Bar1 = _reactPose2.default.div({
    normal: { rotate: 0, y: 0, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } },
    expand: { rotate: 45, y: 10, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } }
});

var Bar2 = _reactPose2.default.div({
    normal: { opacity: 1, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } },
    expand: { opacity: 0, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } }
});

var Bar3 = _reactPose2.default.div({
    normal: { rotate: 0, y: 0, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } },
    expand: { rotate: -45, y: -10, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 50 }));
        } }
});

var StyledBar1 = (0, _styledComponents2.default)(Bar1)(_templateObject);

var LightStyledBar1 = (0, _styledComponents2.default)(Bar1)(_templateObject2);

var StyledBar2 = (0, _styledComponents2.default)(Bar2)(_templateObject);

var LightStyledBar2 = (0, _styledComponents2.default)(Bar2)(_templateObject2);

var StyledBar3 = (0, _styledComponents2.default)(Bar3)(_templateObject);

var LightStyledBar3 = (0, _styledComponents2.default)(Bar3)(_templateObject2);

//HamBtn End

//Pane
var Acrylic = (0, _styledComponents2.default)(_reactPose2.default.div({
    normal: { width: 35, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 200 }));
        } },
    expand: { width: 250, transition: function transition(props) {
            return (0, _popmotion.tween)(_extends({}, props, { duration: 200 }));
        } }
}))(_templateObject3, function (props) {
    return props.theme.background;
}, function (props) {
    return props.theme.main;
}, function (props) {
    return props.theme.main;
});

//Pane End

//Navi Item
var Image = _styledComponents2.default.img(_templateObject4);
var Item = _styledComponents2.default.div(_templateObject5);

var Text = _styledComponents2.default.div(_templateObject6);

var LightText = _styledComponents2.default.div(_templateObject7);

var ItemsContainer = _styledComponents2.default.div(_templateObject8);
//Navi Item End


var NavigationView = function (_Component) {
    _inherits(NavigationView, _Component);

    function NavigationView(props) {
        _classCallCheck(this, NavigationView);

        var _this = _possibleConstructorReturn(this, (NavigationView.__proto__ || Object.getPrototypeOf(NavigationView)).call(this, props));

        _this.state = {
            expanded: false,
            theme: "dark"
        };
        return _this;
    }

    _createClass(NavigationView, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.theme === "dark") {
                this.setState({ theme: "dark" });
            } else if (this.props.theme === "light") {
                StyledBar1 = LightStyledBar1;
                StyledBar2 = LightStyledBar2;
                StyledBar3 = LightStyledBar3;
                Text = LightText;
                this.setState({ theme: "light" });
            }
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _this2 = this;

            return this.props.items.map(function (item) {
                return _react2.default.createElement(
                    Item,
                    { className: 'hvr-glow', key: item.text, onClick: item.handler },
                    _react2.default.createElement(Image, { src: _this2.state.theme === "light" ? item.lighticon : item.darkicon }),
                    _this2.state.expanded ? _react2.default.createElement(
                        _reactDelay2.default,
                        { wait: 50 },
                        _react2.default.createElement(
                            Text,
                            null,
                            item.text
                        )
                    ) : _react2.default.createElement('div', null)
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var theme = {
                main: this.state.theme === "dark" ? "#000" : "#fff",
                background: this.props.background == null ? "" : this.props.background
            };
            return _react2.default.createElement(
                Acrylic,
                { theme: theme, pose: this.state.expanded ? "expand" : "normal" },
                _react2.default.createElement('link', { rel: 'stylesheet', type: 'text/css', href: this.state.stylePath }),
                _react2.default.createElement(
                    'div',
                    { className: 'hvr-grow', onClick: function onClick() {
                            return _this3.setState({ expanded: !_this3.state.expanded });
                        } },
                    _react2.default.createElement(StyledBar1, { pose: this.state.expanded ? "expand" : "normal" }),
                    _react2.default.createElement(StyledBar2, { pose: this.state.expanded ? "expand" : "normal" }),
                    _react2.default.createElement(StyledBar3, { pose: this.state.expanded ? "expand" : "normal" })
                ),
                _react2.default.createElement(
                    ItemsContainer,
                    null,
                    this.renderList()
                )
            );
        }
    }]);

    return NavigationView;
}(_react.Component);

exports.default = NavigationView;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(18);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_popmotion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_value_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pose_core__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_hey_listen__ = __webpack_require__(1);





/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
}

var createTransitionMap = function (key) {
    return function (map) {
        return function (props) {
            var switchKey = props[key];
            var transition = map[switchKey] || map.default;
            return transition ? transition(props) : false;
        };
    };
};
var eachValue = /*#__PURE__*/createTransitionMap('key');

var BoundingBoxDimension;
(function (BoundingBoxDimension) {
    BoundingBoxDimension["width"] = "width";
    BoundingBoxDimension["height"] = "height";
    BoundingBoxDimension["left"] = "left";
    BoundingBoxDimension["right"] = "right";
    BoundingBoxDimension["top"] = "top";
    BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));

var linear = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].linear;
var interpolate = __WEBPACK_IMPORTED_MODULE_0_popmotion__["transform"].interpolate;
var singleAxisPointer = function (axis) {
    return function (from) {
        var _a;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["pointer"])((_a = {}, _a[axis] = typeof from === 'string' ? parseFloat(from) : from, _a)).pipe(function (v) {
            return v[axis];
        });
    };
};
var pointerX = /*#__PURE__*/singleAxisPointer('x');
var pointerY = /*#__PURE__*/singleAxisPointer('y');
var createPointer = function (axisPointerCreator, min, max, measurement) {
    return function (_a) {
        var from = _a.from,
            type = _a.type,
            dimensions = _a.dimensions,
            dragBounds = _a.dragBounds;
        var axisPointer = axisPointerCreator(dimensions.measurementAsPixels(measurement, from, type));
        var transformQueue = [];
        if (dragBounds) {
            if (dragBounds[min] !== undefined) {
                transformQueue.push(function (v) {
                    return Math.max(v, dimensions.measurementAsPixels(measurement, dragBounds[min], type));
                });
            }
            if (dragBounds[max] !== undefined) {
                transformQueue.push(function (v) {
                    return Math.min(v, dimensions.measurementAsPixels(measurement, dragBounds[max], type));
                });
            }
        }
        if (type === __WEBPACK_IMPORTED_MODULE_1_style_value_types__["percent"]) {
            transformQueue.push(interpolate([0, dimensions.get(measurement)], [0, 100]), function (v) {
                return v + '%';
            });
        }
        return transformQueue.length ? axisPointer.pipe.apply(axisPointer, transformQueue) : axisPointer;
    };
};
var just = function (from) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["action"])(function (_a) {
        var update = _a.update,
            complete = _a.complete;
        update(from);
        complete();
    });
};
var underDampedSpring = function (_a) {
    var from = _a.from,
        velocity = _a.velocity,
        to = _a.to;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["spring"])({
        from: from,
        to: to,
        velocity: velocity,
        stiffness: 500,
        damping: 25,
        restDelta: 0.5,
        restSpeed: 10
    });
};
var overDampedSpring = function (_a) {
    var from = _a.from,
        velocity = _a.velocity,
        to = _a.to;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["spring"])({ from: from, to: to, velocity: velocity, stiffness: 700, damping: to === 0 ? 100 : 35 });
};
var linearTween = function (_a) {
    var from = _a.from,
        to = _a.to;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["tween"])({ from: from, to: to, ease: linear });
};
var intelligentTransition = /*#__PURE__*/eachValue({
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: overDampedSpring,
    scaleY: overDampedSpring,
    scale: overDampedSpring,
    opacity: linearTween,
    default: __WEBPACK_IMPORTED_MODULE_0_popmotion__["tween"]
});
var dragAction = /*#__PURE__*/eachValue({
    x: /*#__PURE__*/createPointer(pointerX, 'left', 'right', BoundingBoxDimension.width),
    y: /*#__PURE__*/createPointer(pointerY, 'top', 'bottom', BoundingBoxDimension.height)
});
var intelligentDragEnd = function (_a) {
    var from = _a.from;
    return just(from);
};
var defaultTransitions = /*#__PURE__*/new Map([['default', intelligentTransition], ['dragging', dragAction], ['dragEnd', intelligentDragEnd]]);

var valueTypeTests = [__WEBPACK_IMPORTED_MODULE_1_style_value_types__["number"], __WEBPACK_IMPORTED_MODULE_1_style_value_types__["degrees"], __WEBPACK_IMPORTED_MODULE_1_style_value_types__["percent"], __WEBPACK_IMPORTED_MODULE_1_style_value_types__["px"]];
var testValueType = function (v) {
    return function (type) {
        return type.test(v);
    };
};
var createPassiveValue = function (init, parent, transform$$1) {
    var raw = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["value"])(init).pipe(transform$$1);
    parent.raw.subscribe(raw);
    return { raw: raw };
};
var createValue = function (init) {
    var type = valueTypeTests.find(testValueType(init));
    var raw = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["value"])(init);
    return { raw: raw, type: type };
};
var addActionDelay = function (delay$$1, transition) {
    if (delay$$1 === void 0) {
        delay$$1 = 0;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["chain"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["delay"])(delay$$1), transition);
};
var animationLookup = {
    tween: __WEBPACK_IMPORTED_MODULE_0_popmotion__["tween"],
    spring: __WEBPACK_IMPORTED_MODULE_0_popmotion__["spring"],
    decay: __WEBPACK_IMPORTED_MODULE_0_popmotion__["decay"],
    keyframes: __WEBPACK_IMPORTED_MODULE_0_popmotion__["keyframes"],
    physics: __WEBPACK_IMPORTED_MODULE_0_popmotion__["physics"]
};
var easeIn = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].easeIn,
    easeOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].easeOut,
    easeInOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].easeInOut,
    circIn = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].circIn,
    circOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].circOut,
    circInOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].circInOut,
    backIn = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].backIn,
    backOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].backOut,
    backInOut = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].backInOut,
    anticipate = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].anticipate;
var easingLookup = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut,
    circIn: circIn,
    circOut: circOut,
    circInOut: circInOut,
    backIn: backIn,
    backOut: backOut,
    backInOut: backInOut,
    anticipate: anticipate
};
var getAction = function (v, _a, _b) {
    var from = _b.from,
        to = _b.to,
        velocity = _b.velocity;
    var _c = _a.type,
        type = _c === void 0 ? 'tween' : _c,
        ease = _a.ease,
        def = __rest(_a, ["type", "ease"]);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(animationLookup[type] !== undefined, "Invalid transition type '" + type + "'. Valid transition types are: tween, spring, decay, physics and keyframes.");
    if (type === 'tween') {
        var typeOfEase = typeof ease;
        if (typeOfEase !== 'function') {
            if (typeOfEase === 'string') {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(easingLookup[ease] !== undefined, "Invalid easing type '" + ease + "'. popmotion.io/pose/api/config");
                ease = easingLookup[ease];
            } else if (Array.isArray(ease)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_hey_listen__["a" /* invariant */])(ease.length === 4, "Cubic bezier arrays must contain four numerical values.");
                var x1 = ease[0],
                    y1 = ease[1],
                    x2 = ease[2],
                    y2 = ease[3];
                ease = __WEBPACK_IMPORTED_MODULE_0_popmotion__["easing"].cubicBezier(x1, y1, x2, y2);
            }
        }
    }
    return animationLookup[type](__assign({ from: from,
        to: to,
        velocity: velocity,
        ease: ease }, def));
};
var isAction = function (action$$1) {
    return typeof action$$1.start !== 'undefined';
};
var pose = function (_a) {
    var transformPose = _a.transformPose,
        addListenerToValue = _a.addListenerToValue,
        extendAPI = _a.extendAPI,
        readValueFromSource = _a.readValueFromSource;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_pose_core__["a" /* default */])({
        bindOnChange: function (values, onChange) {
            return function (key) {
                if (!values.has(key)) return;
                var raw = values.get(key).raw;
                raw.subscribe(onChange[key]);
            };
        },
        readValue: function (_a) {
            var raw = _a.raw;
            return raw.get();
        },
        createValue: function (init, key, _a, _b) {
            var elementStyler = _a.elementStyler;
            var _c = _b === void 0 ? {} : _b,
                passiveParent = _c.passiveParent,
                passiveProps = _c.passiveProps;
            var val = passiveParent ? createPassiveValue(init, passiveParent, passiveProps) : createValue(init);
            if (addListenerToValue) {
                val.raw.subscribe(addListenerToValue(key, elementStyler));
            }
            return val;
        },
        convertValue: function (raw, key, _a) {
            var elementStyler = _a.elementStyler;
            if (addListenerToValue) {
                raw.subscribe(addListenerToValue(key, elementStyler));
            }
            return {
                raw: raw,
                type: valueTypeTests.find(testValueType(raw.get()))
            };
        },
        getTransitionProps: function (_a, to) {
            var raw = _a.raw,
                type = _a.type;
            return {
                from: raw.get(),
                velocity: raw.getVelocity(),
                to: to,
                type: type
            };
        },
        resolveTarget: function (_, to) {
            return to;
        },
        selectValueToRead: function (_a) {
            var raw = _a.raw;
            return raw;
        },
        startAction: function (_a, action$$1, complete) {
            var raw = _a.raw;
            var reaction = {
                update: function (v) {
                    return raw.update(v);
                },
                complete: complete
            };
            return action$$1.start(reaction);
        },
        stopAction: function (action$$1) {
            return action$$1.stop();
        },
        getInstantTransition: function (_, _a) {
            var to = _a.to;
            return just(to);
        },
        convertTransitionDefinition: function (val, def, props) {
            if (isAction(def)) return def;
            var delay$$1 = def.delay,
                min = def.min,
                max = def.max,
                round = def.round,
                remainingDef = __rest(def, ["delay", "min", "max", "round"]);
            var action$$1 = getAction(val, remainingDef, props);
            var outputPipe = [];
            if (delay$$1) action$$1 = addActionDelay(delay$$1, action$$1);
            if (min !== undefined) outputPipe.push(function (v) {
                return Math.max(v, min);
            });
            if (max !== undefined) outputPipe.push(function (v) {
                return Math.min(v, max);
            });
            if (round) outputPipe.push(Math.round);
            return outputPipe.length ? action$$1.pipe.apply(action$$1, outputPipe) : action$$1;
        },
        addActionDelay: addActionDelay,
        defaultTransitions: defaultTransitions,
        transformPose: transformPose,
        readValueFromSource: readValueFromSource,
        extendAPI: extendAPI
    });
};

var createDimensions = function (element) {
    var hasMeasured = false;
    var current = {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    return {
        get: function (measurement) {
            return measurement ? current[measurement] : current;
        },
        measure: function () {
            current = element.getBoundingClientRect();
            hasMeasured = true;
            return current;
        },
        measurementAsPixels: function (measurement, value$$1, type) {
            return type === __WEBPACK_IMPORTED_MODULE_1_style_value_types__["percent"] ? (typeof value$$1 === 'string' ? parseFloat(value$$1) : value$$1) / 100 * current[measurement] : value$$1;
        },
        has: function () {
            return hasMeasured;
        }
    };
};

var makeDraggable = function (element, activeActions, setPose, _a) {
    var onDragStart = _a.onDragStart,
        onDragEnd = _a.onDragEnd;
    var dragStartListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["listen"])(element, 'mousedown touchstart').start(function (startEvent) {
        startEvent.preventDefault();
        setPose('dragging');
        if (onDragStart) onDragStart(startEvent);
        var dragEndListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["listen"])(document, 'mouseup touchend').start(function (endEvent) {
            activeActions.get('dragEndListener').stop();
            setPose('dragEnd');
            if (onDragEnd) onDragEnd(endEvent);
        });
        activeActions.set('dragEndListener', dragEndListener);
    });
    activeActions.set('dragStartListener', dragStartListener);
};
var appendEventListeners = function (element, activeActions, setPose, _a) {
    var props = _a.props;
    if (props.draggable) makeDraggable(element, activeActions, setPose, props);
};

var ORIGIN_START = 0;
var ORIGIN_CENTER = '50%';
var ORIGIN_END = '100%';
var findCenter = function (_a) {
    var top = _a.top,
        right = _a.right,
        bottom = _a.bottom,
        left = _a.left;
    return {
        x: (left + right) / 2,
        y: (top + bottom) / 2
    };
};
var positionalProps = ['width', 'height', 'top', 'left', 'bottom', 'right'];
var positionalPropsDict = /*#__PURE__*/new Set(positionalProps);
var checkPositionalProp = function (key) {
    return positionalPropsDict.has(key);
};
var hasPositionalProps = function (pose) {
    return Object.keys(pose).some(checkPositionalProp);
};
var isFlipPose = function (flip, key, state) {
    return state.props.element instanceof HTMLElement && (flip === true || key === 'flip');
};
var resolveProp = function (target, props) {
    return typeof target === 'function' ? target(props) : target;
};
var setValue = function (_a, key, to) {
    var values = _a.values,
        props = _a.props;
    if (values.has(key)) {
        var raw = values.get(key).raw;
        raw.update(to);
        raw.update(to);
    } else {
        values.set(key, {
            raw: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["value"])(to, function (v) {
                return props.elementStyler.set(key, v);
            })
        });
    }
};
var explicitlyFlipPose = function (state, nextPose) {
    var _a = state.props,
        dimensions = _a.dimensions,
        elementStyler = _a.elementStyler;
    dimensions.measure();
    var width = nextPose.width,
        height = nextPose.height,
        top = nextPose.top,
        left = nextPose.left,
        bottom = nextPose.bottom,
        right = nextPose.right,
        remainingPose = __rest(nextPose, ["width", "height", "top", "left", "bottom", "right"]);
    elementStyler.set(positionalProps.reduce(function (acc, key) {
        if (nextPose[key] !== undefined) {
            acc[key] = resolveProp(nextPose[key], state.props);
        }
        return acc;
    }, {})).render();
    return implicitlyFlipPose(state, remainingPose);
};
var implicitlyFlipPose = function (state, nextPose) {
    var _a = state.props,
        dimensions = _a.dimensions,
        element = _a.element,
        elementStyler = _a.elementStyler;
    if (!dimensions.has()) return {};
    var prev = dimensions.get();
    var transform$$1 = element.style.transform;
    element.style.transform = '';
    var next = element.getBoundingClientRect();
    element.style.transform = transform$$1;
    var originX = prev.left === next.left ? ORIGIN_START : prev.right === next.right ? ORIGIN_END : ORIGIN_CENTER;
    var originY = prev.top === next.top ? ORIGIN_START : prev.bottom === next.bottom ? ORIGIN_END : ORIGIN_CENTER;
    elementStyler.set({ originX: originX, originY: originY });
    var flipPoseProps = {};
    if (prev.width !== next.width) {
        setValue(state, 'scaleX', prev.width / next.width);
        flipPoseProps.scaleX = 1;
    }
    if (prev.height !== next.height) {
        setValue(state, 'scaleY', prev.height / next.height);
        flipPoseProps.scaleY = 1;
    }
    var prevCenter = findCenter(prev);
    var nextCenter = findCenter(next);
    if (originX === ORIGIN_CENTER) {
        setValue(state, 'x', prevCenter.x - nextCenter.x);
        flipPoseProps.x = 0;
    }
    if (originY === ORIGIN_CENTER) {
        setValue(state, 'y', prevCenter.y - nextCenter.y);
        flipPoseProps.y = 0;
    }
    elementStyler.render();
    return __assign({}, nextPose, flipPoseProps);
};
var flipPose = function (props, nextPose) {
    return hasPositionalProps(nextPose) ? explicitlyFlipPose(props, nextPose) : implicitlyFlipPose(props, nextPose);
};

var dragPoses = function (draggable) {
    var dragging = {
        preTransition: function (_a) {
            var dimensions = _a.dimensions;
            return dimensions.measure();
        }
    };
    var dragEnd = {};
    if (draggable === true || draggable === 'x') dragging.x = dragEnd.x = 0;
    if (draggable === true || draggable === 'y') dragging.y = dragEnd.y = 0;
    return { dragging: dragging, dragEnd: dragEnd };
};
var createPoseConfig = function (element, _a) {
    var onDragStart = _a.onDragStart,
        onDragEnd = _a.onDragEnd,
        draggable = _a.draggable,
        dragBounds = _a.dragBounds,
        config = __rest(_a, ["onDragStart", "onDragEnd", "draggable", "dragBounds"]);
    var poseConfig = __assign({ flip: {} }, config, { props: __assign({}, config.props, { draggable: draggable,
            onDragStart: onDragStart,
            onDragEnd: onDragEnd,
            dragBounds: dragBounds,
            element: element, elementStyler: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_popmotion__["styler"])(element, { preparseOutput: false }), dimensions: createDimensions(element) }) });
    if (draggable) {
        var _b = dragPoses(draggable),
            dragging = _b.dragging,
            dragEnd = _b.dragEnd;
        poseConfig.dragging = __assign({}, poseConfig.dragging, dragging);
        poseConfig.dragEnd = __assign({}, poseConfig.dragEnd, dragEnd);
    }
    return poseConfig;
};
var domPose = /*#__PURE__*/pose({
    transformPose: function (_a, name, state) {
        var flip = _a.flip,
            pose$$1 = __rest(_a, ["flip"]);
        return isFlipPose(flip, name, state) ? flipPose(state, pose$$1) : pose$$1;
    },
    addListenerToValue: function (key, elementStyler) {
        return function (v) {
            return elementStyler.set(key, v);
        };
    },
    readValueFromSource: function (key, _a) {
        var elementStyler = _a.elementStyler;
        var value$$1 = elementStyler.get(key);
        return isNaN(value$$1) ? value$$1 : parseFloat(value$$1);
    },
    extendAPI: function (api, _a, config) {
        var props = _a.props,
            activeActions = _a.activeActions;
        var measure = props.dimensions.measure;
        var poserApi = __assign({}, api, { addChild: function (element, childConfig) {
                return api._addChild(createPoseConfig(element, childConfig), domPose);
            }, measure: measure, flip: function (op) {
                if (op) {
                    measure();
                    op();
                }
                return api.set('flip');
            } });
        appendEventListeners(props.element, activeActions, api.set, config);
        return poserApi;
    }
});
var domPose$1 = function (element, config) {
    return domPose(createPoseConfig(element, config));
};

/* harmony default export */ __webpack_exports__["a"] = (domPose$1);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export eachValue */
/* unused harmony export fromPose */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hey_listen__ = __webpack_require__(1);



var getPoseValues = function (_a) {
    var transition = _a.transition,
        delay = _a.delay,
        delayChildren = _a.delayChildren,
        staggerChildren = _a.staggerChildren,
        staggerDirection = _a.staggerDirection,
        afterChildren = _a.afterChildren,
        beforeChildren = _a.beforeChildren,
        preTransition = _a.preTransition,
        props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["transition", "delay", "delayChildren", "staggerChildren", "staggerDirection", "afterChildren", "beforeChildren", "preTransition"]);
    return props;
};
var selectPoses = function (_a) {
    var label = _a.label,
        props = _a.props,
        values = _a.values,
        parentValues = _a.parentValues,
        ancestorValues = _a.ancestorValues,
        onChange = _a.onChange,
        passive = _a.passive,
        initialPose = _a.initialPose,
        poses = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __rest */])(_a, ["label", "props", "values", "parentValues", "ancestorValues", "onChange", "passive", "initialPose"]);
    return poses;
};
var selectAllValues = function (values, selectValue) {
    var allValues = {};
    values.forEach(function (value, key) {
        return allValues[key] = selectValue(value);
    });
    return allValues;
};

var resolveProp = function (target, props) {
    return typeof target === 'function' ? target(props) : target;
};
var poseDefault = function (pose, prop, defaultValue, resolveProps) {
    return pose && pose[prop] !== undefined ? resolveProp(pose[prop], resolveProps) : defaultValue;
};
var startChildAnimations = function (children, next, pose, props) {
    var animations = [];
    var delay = poseDefault(pose, 'delayChildren', 0, props);
    var stagger = poseDefault(pose, 'staggerChildren', 0, props);
    var staggerDirection = poseDefault(pose, 'staggerDirection', 1, props);
    var maxStaggerDuration = (children.size - 1) * stagger;
    var generateStaggerDuration = staggerDirection === 1 ? function (i) {
        return i * stagger;
    } : function (i) {
        return maxStaggerDuration - i * stagger;
    };
    Array.from(children).forEach(function (child, i) {
        animations.push(child.set(next, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, { delay: delay + generateStaggerDuration(i) })));
    });
    return animations;
};
var resolveTransition = function (transition, key, value, props, convertTransitionDefinition, getInstantTransition) {
    var resolvedTransition;
    if (typeof transition === 'function') {
        resolvedTransition = transition(props);
    } else if (transition[key] || transition.default) {
        var keyTransition = transition[key] || transition.default;
        if (typeof keyTransition === 'function') {
            resolvedTransition = keyTransition(props);
        } else {
            resolvedTransition = keyTransition;
        }
    } else {
        resolvedTransition = transition;
    }
    return resolvedTransition === false ? getInstantTransition(value, props) : convertTransitionDefinition(value, resolvedTransition, props);
};
var createPoseSetter = function (setterProps) {
    return function (next, nextProps) {
        if (nextProps === void 0) {
            nextProps = {};
        }
        var state = setterProps.state,
            poses = setterProps.poses,
            startAction = setterProps.startAction,
            stopAction = setterProps.stopAction,
            getInstantTransition = setterProps.getInstantTransition,
            addActionDelay = setterProps.addActionDelay,
            getTransitionProps = setterProps.getTransitionProps,
            resolveTarget = setterProps.resolveTarget,
            transformPose = setterProps.transformPose,
            convertTransitionDefinition = setterProps.convertTransitionDefinition;
        var children = state.children,
            values = state.values,
            props = state.props,
            activeActions = state.activeActions,
            activePoses = state.activePoses;
        var _a = nextProps.delay,
            delay = _a === void 0 ? 0 : _a;
        var hasChildren = children.size;
        var nextPose = poses[next];
        var baseTransitionProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, nextProps);
        var getChildAnimations = function () {
            return hasChildren ? startChildAnimations(children, next, nextPose, baseTransitionProps) : [];
        };
        var getParentAnimations = function () {
            if (!nextPose) return [];
            if (transformPose) nextPose = transformPose(nextPose, next, state);
            var preTransition = nextPose.preTransition,
                getTransition = nextPose.transition;
            if (preTransition) nextPose.preTransition(baseTransitionProps);
            return Object.keys(getPoseValues(nextPose)).map(function (key) {
                return new Promise(function (complete) {
                    var value = values.get(key);
                    var transitionProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, baseTransitionProps, { key: key,
                        value: value });
                    var target = resolveTarget(value, resolveProp(nextPose[key], transitionProps));
                    if (activeActions.has(key)) stopAction(activeActions.get(key));
                    var resolveTransitionProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({ to: target }, transitionProps, getTransitionProps(value, target, transitionProps));
                    var transition = resolveTransition(getTransition, key, value, resolveTransitionProps, convertTransitionDefinition, getInstantTransition);
                    var poseDelay = resolveProp(nextPose.delay, transitionProps);
                    if (delay || poseDelay) {
                        transition = addActionDelay(delay || poseDelay, transition);
                    }
                    activeActions.set(key, startAction(value, transition, complete));
                    activePoses.set(key, next);
                });
            });
        };
        if (nextPose && hasChildren) {
            if (resolveProp(nextPose.beforeChildren, baseTransitionProps)) {
                return Promise.all(getParentAnimations()).then(function () {
                    return Promise.all(getChildAnimations());
                });
            } else if (resolveProp(nextPose.afterChildren, baseTransitionProps)) {
                return Promise.all(getChildAnimations()).then(function () {
                    return Promise.all(getParentAnimations());
                });
            }
        }
        return Promise.all(getParentAnimations().concat(getChildAnimations()));
    };
};

var isScale = function (key) {
    return key.includes('scale');
};
var defaultReadValueFromSource = function (key) {
    return isScale(key) ? 1 : 0;
};
var getInitialValue = function (poses, key, initialPose, props, readValueFromSource) {
    if (readValueFromSource === void 0) {
        readValueFromSource = defaultReadValueFromSource;
    }
    var posesToSearch = Array.isArray(initialPose) ? initialPose : [initialPose];
    var pose = posesToSearch.find(function (name) {
        return poses[name] && poses[name][key] !== undefined;
    });
    return pose ? resolveProp(poses[pose][key], props) : readValueFromSource(key, props);
};
var createValues = function (values, _a, pose) {
    var userSetValues = _a.userSetValues,
        createValue = _a.createValue,
        convertValue = _a.convertValue,
        readValueFromSource = _a.readValueFromSource,
        initialPose = _a.initialPose,
        poses = _a.poses,
        props = _a.props;
    return function (key) {
        if (values.has(key)) return;
        var value;
        if (userSetValues && userSetValues[key] !== undefined) {
            value = convertValue(userSetValues[key], key, props);
        } else {
            var initValue = getInitialValue(poses, key, initialPose, props, readValueFromSource);
            value = createValue(initValue, key, props);
        }
        values.set(key, value);
    };
};
var scrapeValuesFromPose = function (values, props) {
    return function (key) {
        var pose = props.poses[key];
        Object.keys(getPoseValues(pose)).forEach(createValues(values, props, pose));
    };
};
var getAncestorValue = function (key, fromParent, ancestors) {
    if (fromParent === true) {
        return ancestors[0] && ancestors[0].values.get(key);
    } else {
        var foundAncestor = ancestors.find(function (_a) {
            var label = _a.label;
            return label === fromParent;
        });
        return foundAncestor && foundAncestor.values.get(key);
    }
};
var bindPassiveValues = function (values, _a) {
    var passive = _a.passive,
        ancestorValues = _a.ancestorValues,
        createValue = _a.createValue,
        readValue = _a.readValue,
        props = _a.props;
    return function (key) {
        var _a = passive[key],
            valueKey = _a[0],
            passiveProps = _a[1],
            fromParent = _a[2];
        var valueToBind = fromParent && ancestorValues.length ? getAncestorValue(valueKey, fromParent, ancestorValues) : values.has(valueKey) ? values.get(valueKey) : false;
        if (!valueToBind) return;
        var newValue = createValue(readValue(valueToBind), key, props, {
            passiveParent: valueToBind,
            passiveProps: passiveProps,
            props: props
        });
        values.set(key, newValue);
    };
};
var createValueMap = function (props) {
    var poses = props.poses,
        passive = props.passive;
    var values = new Map();
    Object.keys(poses).forEach(scrapeValuesFromPose(values, props));
    if (passive) Object.keys(passive).forEach(bindPassiveValues(values, props));
    return values;
};

var applyDefaultTransition = function (pose, key, defaultTransitions) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, pose, { transition: defaultTransitions.has(key) ? defaultTransitions.get(key) : defaultTransitions.get('default') });
};
var generateTransitions = function (poses, defaultTransitions) {
    Object.keys(poses).forEach(function (key) {
        var pose = poses[key];
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_hey_listen__["a" /* invariant */])(typeof pose === 'object', "Pose '" + key + "' is of invalid type. All poses should be objects.");
        poses[key] = pose.transition !== undefined ? pose : applyDefaultTransition(pose, key, defaultTransitions);
    });
    return poses;
};

var createTransitionMap = function (key) {
    return function (map) {
        return function (props) {
            var switchKey = props[key];
            var transition = map[switchKey] || map.default;
            return transition ? transition(props) : false;
        };
    };
};
var eachValue = /*#__PURE__*/createTransitionMap('key');
var fromPose = /*#__PURE__*/createTransitionMap('prevPoseKey');

var poseFactory = function (_a) {
    var getDefaultProps = _a.getDefaultProps,
        defaultTransitions = _a.defaultTransitions,
        bindOnChange = _a.bindOnChange,
        startAction = _a.startAction,
        stopAction = _a.stopAction,
        readValue = _a.readValue,
        readValueFromSource = _a.readValueFromSource,
        resolveTarget = _a.resolveTarget,
        createValue = _a.createValue,
        convertValue = _a.convertValue,
        getInstantTransition = _a.getInstantTransition,
        getTransitionProps = _a.getTransitionProps,
        addActionDelay = _a.addActionDelay,
        selectValueToRead = _a.selectValueToRead,
        convertTransitionDefinition = _a.convertTransitionDefinition,
        transformPose = _a.transformPose,
        extendAPI = _a.extendAPI;
    return function (config) {
        var parentValues = config.parentValues,
            _a = config.ancestorValues,
            ancestorValues = _a === void 0 ? [] : _a;
        if (parentValues) ancestorValues.unshift({ values: parentValues });
        var activeActions = new Map();
        var activePoses = new Map();
        var children = new Set();
        var poses = generateTransitions(selectPoses(config), defaultTransitions);
        var props = config.props || {};
        if (getDefaultProps) props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, props, getDefaultProps(config));
        var passive = config.passive,
            userSetValues = config.values,
            initialPose = config.initialPose;
        var values = createValueMap({
            poses: poses,
            passive: passive,
            ancestorValues: ancestorValues,
            readValue: readValue,
            createValue: createValue,
            convertValue: convertValue,
            readValueFromSource: readValueFromSource,
            userSetValues: userSetValues,
            initialPose: initialPose,
            props: props
        });
        var state = {
            activeActions: activeActions,
            activePoses: activePoses,
            children: children,
            props: props,
            values: values
        };
        var onChange = config.onChange;
        if (onChange) Object.keys(onChange).forEach(bindOnChange(values, onChange));
        var set = createPoseSetter({
            state: state,
            poses: poses,
            getInstantTransition: getInstantTransition,
            getTransitionProps: getTransitionProps,
            convertTransitionDefinition: convertTransitionDefinition,
            startAction: startAction,
            stopAction: stopAction,
            resolveTarget: resolveTarget,
            addActionDelay: addActionDelay,
            transformPose: transformPose
        });
        var api = {
            set: set,
            get: function (valueName) {
                return valueName ? selectValueToRead(values.get(valueName)) : selectAllValues(values, selectValueToRead);
            },
            has: function (poseName) {
                return !!poses[poseName];
            },
            setProps: function (newProps) {
                return state.props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, state.props, newProps);
            },
            _addChild: function (childConfig, factory) {
                var child = factory(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({ initialPose: initialPose }, childConfig, { ancestorValues: [{ label: config.label, values: values }].concat(ancestorValues) }));
                children.add(child);
                return child;
            },
            removeChild: function (child) {
                return children.delete(child);
            },
            clearChildren: function () {
                children.forEach(function (child) {
                    return child.destroy();
                });
                children.clear();
            },
            destroy: function () {
                activeActions.forEach(stopAction);
                children.forEach(function (child) {
                    return child.destroy();
                });
            }
        };
        return extendAPI(api, state, config);
    };
};

/* harmony default export */ __webpack_exports__["a"] = (poseFactory);



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(5);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(19);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(22);

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.4.1
 * react-is.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var Portal = REACT_PORTAL_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;

function isAsyncMode(object) {
  return typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Profiler = Profiler;
exports.Portal = Portal;
exports.StrictMode = StrictMode;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isProfiler = isProfiler;
exports.isPortal = isPortal;
exports.isStrictMode = isStrictMode;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.1
 * react-is.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.timeout"):60113;
function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type,a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof,a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&(a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return q(a)===m};
exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(26);
} else {
  module.exports = __webpack_require__(25);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
	 true ? (module['exports'] = factory()) :
		typeof define === 'function' && define['amd'] ? define(factory()) :
			(window['stylisRuleSheet'] = factory())
}(function () {

	'use strict'

	return function (insertRule) {
		var delimiter = '/*|*/'
		var needle = delimiter+'}'

		function toSheet (block) {
			if (block)
				try {
					insertRule(block + '}')
				} catch (e) {}
		}

		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
			switch (context) {
				// property
				case 1:
					// @import
					if (depth === 0 && content.charCodeAt(0) === 64)
						return insertRule(content+';'), ''
					break
				// selector
				case 2:
					if (ns === 0)
						return content + delimiter
					break
				// at-rule
				case 3:
					switch (ns) {
						// @font-face, @page
						case 102:
						case 112:
							return insertRule(selectors[0]+content), ''
						default:
							return content + (at === 0 ? delimiter : '')
					}
				case -2:
					content.split(needle).forEach(toSheet)
			}
		}
	}
}))


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {/* eslint-disable */
	 true ? (module['exports'] = factory(null)) :
		typeof define === 'function' && define['amd'] ? define(factory(null)) :
			(window['stylis'] = factory(null))
}(/** @param {*=} options */function factory (options) {/* eslint-disable */

	'use strict'

	/**
	 * Notes
	 *
	 * The ['<method name>'] pattern is used to support closure compiler
	 * the jsdoc signatures are also used to the same effect
	 *
	 * ----
	 *
	 * int + int + int === n4 [faster]
	 *
	 * vs
	 *
	 * int === n1 && int === n2 && int === n3
	 *
	 * ----
	 *
	 * switch (int) { case ints...} [faster]
	 *
	 * vs
	 *
	 * if (int == 1 && int === 2 ...)
	 *
	 * ----
	 *
	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
	 * is a simple way to hash the sequence of characters
	 * taking into account the index they occur in
	 * since any number of 3 character sequences could produce duplicates.
	 *
	 * On the other hand sequences that are directly tied to the index of the character
	 * resolve a far more accurate measure, it's also faster
	 * to evaluate one condition in a switch statement
	 * than three in an if statement regardless of the added math.
	 *
	 * This allows the vendor prefixer to be both small and fast.
	 */

	var nullptn = /^\0+/g /* matches leading null characters */
	var formatptn = /[\0\r\f]/g /* matches new line, null and formfeed characters */
	var colonptn = /: */g /* splits animation rules */
	var cursorptn = /zoo|gra/ /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g /* animation properties */
	var elementptn = / *[\0] */g /* selector elements */
	var selectorptn = /,\r+?/g /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g /* matches :global(.*) */
	var invalidptn = /\W+/g /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/ /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/ /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g /* match *gradient property */
	var supportsptn = /\(\s*(.*)\s*\)/g /* match supports (groups) */
	var propertyptn = /([\s\S]*?);/g /* match properties leading semicolon */
	var selfptn = /-self|flex-/g /* match flex- and -self in align-self: flex-*; */
	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/ /* extrats :readonly or :placholder from selector */
	var trimptn = /[ \t]+$/ /* match tail whitspace */
	var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/ /* match max/min/fit-content, fill-available */
	var imgsrcptn = /([^-])(image-set\()/

	/* vendors */
	var webkit = '-webkit-'
	var moz = '-moz-'
	var ms = '-ms-'

	/* character codes */
	var SEMICOLON = 59 /* ; */
	var CLOSEBRACES = 125 /* } */
	var OPENBRACES = 123 /* { */
	var OPENPARENTHESES = 40 /* ( */
	var CLOSEPARENTHESES = 41 /* ) */
	var OPENBRACKET = 91 /* [ */
	var CLOSEBRACKET = 93 /* ] */
	var NEWLINE = 10 /* \n */
	var CARRIAGE = 13 /* \r */
	var TAB = 9 /* \t */
	var AT = 64 /* @ */
	var SPACE = 32 /*   */
	var AND = 38 /* & */
	var DASH = 45 /* - */
	var UNDERSCORE = 95 /* _ */
	var STAR = 42 /* * */
	var COMMA = 44 /* , */
	var COLON = 58 /* : */
	var SINGLEQUOTE = 39 /* ' */
	var DOUBLEQUOTE = 34 /* " */
	var FOWARDSLASH = 47 /* / */
	var GREATERTHAN = 62 /* > */
	var PLUS = 43 /* + */
	var TILDE = 126 /* ~ */
	var NULL = 0 /* \0 */
	var FORMFEED = 12 /* \f */
	var VERTICALTAB = 11 /* \v */

	/* special identifiers */
	var KEYFRAME = 107 /* k */
	var MEDIA = 109 /* m */
	var SUPPORTS = 115 /* s */
	var PLACEHOLDER = 112 /* p */
	var READONLY = 111 /* o */
	var IMPORT = 105 /* <at>i */
	var CHARSET = 99 /* <at>c */
	var DOCUMENT = 100 /* <at>d */
	var PAGE = 112 /* <at>p */

	var column = 1 /* current column */
	var line = 1 /* current line numebr */
	var pattern = 0 /* :pattern */

	var cascade = 1 /* #id h1 h2 vs h1#id h2#id  */
	var prefix = 1 /* vendor prefix */
	var escape = 1 /* escape :global() pattern */
	var compress = 0 /* compress output */
	var semicolon = 0 /* no/semicolon option */
	var preserve = 0 /* preserve empty selectors */

	/* empty reference */
	var array = []

	/* plugins */
	var plugins = []
	var plugged = 0
	var should = null

	/* plugin context */
	var POSTS = -2
	var PREPS = -1
	var UNKWN = 0
	var PROPS = 1
	var BLCKS = 2
	var ATRUL = 3

	/* plugin newline context */
	var unkwn = 0

	/* keyframe animation */
	var keyed = 1
	var key = ''

	/* selector namespace */
	var nscopealt = ''
	var nscope = ''

	/**
	 * Compile
	 *
	 * @param {Array<string>} parent
	 * @param {Array<string>} current
	 * @param {string} body
	 * @param {number} id
	 * @param {number} depth
	 * @return {string}
	 */
	function compile (parent, current, body, id, depth) {
		var bracket = 0 /* brackets [] */
		var comment = 0 /* comments /* // or /* */
		var parentheses = 0 /* functions () */
		var quote = 0 /* quotes '', "" */

		var first = 0 /* first character code */
		var second = 0 /* second character code */
		var code = 0 /* current character code */
		var tail = 0 /* previous character code */
		var trail = 0 /* character before previous code */
		var peak = 0 /* previous non-whitespace code */

		var counter = 0 /* count sequence termination */
		var context = 0 /* track current context */
		var atrule = 0 /* track @at-rule context */
		var pseudo = 0 /* track pseudo token index */
		var caret = 0 /* current character index */
		var format = 0 /* control character formating context */
		var insert = 0 /* auto semicolon insertion */
		var invert = 0 /* inverted selector pattern */
		var length = 0 /* generic length address */
		var eof = body.length /* end of file(length) */
		var eol = eof - 1 /* end of file(characters) */

		var char = '' /* current character */
		var chars = '' /* current buffer of characters */
		var child = '' /* next buffer of characters */
		var out = '' /* compiled body */
		var children = '' /* compiled children */
		var flat = '' /* compiled leafs */
		var selector /* generic selector address */
		var result /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret)

			// eof varient
			if (caret === eol) {
				// last character + noop context, add synthetic padding for noop context to terminate
				if (comment + quote + parentheses + bracket !== 0) {
					if (comment !== 0) {
						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH
					}

					quote = parentheses = bracket = 0
					eof++
					eol++
				}
			}

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '')
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE: {
								break
							}
							default: {
								chars += body.charAt(caret)
							}
						}

						code = SEMICOLON
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case CLOSEBRACES:
						case SEMICOLON:
						case DOUBLEQUOTE:
						case SINGLEQUOTE:
						case OPENPARENTHESES:
						case CLOSEPARENTHESES:
						case COMMA: {
							insert = 0
						}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE: {
							break
						}
						// valid
						default: {
							insert = 0
							length = caret
							first = code
							caret--
							code = SEMICOLON

							while (length < eof) {
								switch (body.charCodeAt(length++)) {
									case NEWLINE:
									case CARRIAGE:
									case SEMICOLON: {
										++caret
										code = first
										length = eof
										break
									}
									case COLON: {
										if (format > 0) {
											++caret
											code = first
										}
									}
									case OPENBRACES: {
										length = eof
									}
								}
							}
						}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES: {
						chars = chars.trim()
						first = chars.charCodeAt(0)
						counter = 1
						length = ++caret

						while (caret < eof) {
							switch (code = body.charCodeAt(caret)) {
								case OPENBRACES: {
									counter++
									break
								}
								case CLOSEBRACES: {
									counter--
									break
								}
								case FOWARDSLASH: {
									switch (second = body.charCodeAt(caret + 1)) {
										// /*, //
										case STAR:
										case FOWARDSLASH: {
											caret = delimited(second, caret, eol, body)
										}
									}
									break
								}
								// given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93
								case OPENBRACKET: {
									code++
								}
								// given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41
								case OPENPARENTHESES: {
									code++
								}
								// quote tail delimiter is identical to the head delimiter hence noop,
								// fallthrough clauses have been shited to the correct tail delimiter
								case DOUBLEQUOTE:
								case SINGLEQUOTE: {
									while (caret++ < eol) {
										if (body.charCodeAt(caret) === code) {
											break
										}
									}
								}
							}

							if (counter === 0) {
								break
							}

							caret++
						}

						child = body.substring(length, caret)

						if (first === NULL) {
							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0)
						}

						switch (first) {
							// @at-rule
							case AT: {
								if (format > 0) {
									chars = chars.replace(formatptn, '')
								}

								second = chars.charCodeAt(1)

								switch (second) {
									case DOCUMENT:
									case MEDIA:
									case SUPPORTS:
									case DASH: {
										selector = current
										break
									}
									default: {
										selector = array
									}
								}

								child = compile(current, selector, child, second, depth+1)
								length = child.length

								// preserve empty @at-rule
								if (preserve > 0 && length === 0) {
									length = chars.length
								}

								// execute plugins, @at-rule context
								if (plugged > 0) {
									selector = select(array, chars, invert)
									result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id)
									chars = selector.join('')

									if (result !== void 0) {
										if ((length = (child = result.trim()).length) === 0) {
											second = 0
											child = ''
										}
									}
								}

								if (length > 0) {
									switch (second) {
										case SUPPORTS: {
											chars = chars.replace(supportsptn, supports)
										}
										case DOCUMENT:
										case MEDIA:
										case DASH: {
											child = chars + '{' + child + '}'
											break
										}
										case KEYFRAME: {
											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''))
											child = chars + '{' + child + '}'

											if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
												child = '@' + webkit + child + '@' + child
											} else {
												child = '@' + child
											}
											break
										}
										default: {
											child = chars + child

											if (id === PAGE) {
												child = (out += child, '')
											}
										}
									}
								} else {
									child = ''
								}

								break
							}
							// selector
							default: {
								child = compile(current, select(current, chars, invert), child, id, depth+1)
							}
						}

						children += child

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						atrule = 0
						chars = ''
						child = ''
						code = body.charCodeAt(++caret)
						break
					}
					case CLOSEBRACES:
					case SEMICOLON: {
						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim()

						if ((length = chars.length) > 1) {
							// monkey-patch missing colon
							if (pseudo === 0) {
								first = chars.charCodeAt(0)

								// first character is a letter or dash, buffer has a space character
								if ((first === DASH || first > 96 && first < 123)) {
									length = (chars = chars.replace(' ', ':')).length
								}
							}

							// execute plugins, property context
							if (plugged > 0) {
								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
									if ((length = (chars = result.trim()).length) === 0) {
										chars = '\0\0'
									}
								}
							}

							first = chars.charCodeAt(0)
							second = chars.charCodeAt(1)

							switch (first) {
								case NULL: {
									break
								}
								case AT: {
									if (second === IMPORT || second === CHARSET) {
										flat += chars + body.charAt(caret)
										break
									}
								}
								default: {
									if (chars.charCodeAt(length-1) === COLON) {
										break
									}

									out += property(chars, first, second, chars.charCodeAt(2))
								}
							}
						}

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						chars = ''
						code = body.charCodeAt(++caret)
						break
					}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE: {
					// auto insert semicolon
					if (comment + quote + parentheses + bracket + semicolon === 0) {
						// valid non-whitespace characters that
						// may precede a newline
						switch (peak) {
							case CLOSEPARENTHESES:
							case SINGLEQUOTE:
							case DOUBLEQUOTE:
							case AT:
							case TILDE:
							case GREATERTHAN:
							case STAR:
							case PLUS:
							case FOWARDSLASH:
							case DASH:
							case COLON:
							case COMMA:
							case SEMICOLON:
							case OPENBRACES:
							case CLOSEBRACES: {
								break
							}
							default: {
								// current buffer has a colon
								if (pseudo > 0) {
									insert = 1
								}
							}
						}
					}

					// terminate line comment
					if (comment === FOWARDSLASH) {
						comment = 0
					} else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
						format = 1
						chars += '\0'
					}

					// execute plugins, newline context
					if (plugged * unkwn > 0) {
						proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id)
					}

					// next line, reset column position
					column = 1
					line++
					break
				}
				case SEMICOLON:
				case CLOSEBRACES: {
					if (comment + quote + parentheses + bracket === 0) {
						column++
						break
					}
				}
				default: {
					// increment column position
					column++

					// current character
					char = body.charAt(caret)

					// remove comments, escape functions, strings, attributes and prepare selectors
					switch (code) {
						case TAB:
						case SPACE: {
							if (quote + bracket + comment === 0) {
								switch (tail) {
									case COMMA:
									case COLON:
									case TAB:
									case SPACE: {
										char = ''
										break
									}
									default: {
										if (code !== SPACE) {
											char = ' '
										}
									}
								}
							}
							break
						}
						// escape breaking control characters
						case NULL: {
							char = '\\0'
							break
						}
						case FORMFEED: {
							char = '\\f'
							break
						}
						case VERTICALTAB: {
							char = '\\v'
							break
						}
						// &
						case AND: {
							// inverted selector pattern i.e html &
							if (quote + comment + bracket === 0 && cascade > 0) {
								invert = 1
								format = 1
								char = '\f' + char
							}
							break
						}
						// ::p<l>aceholder, l
						// :read-on<l>y, l
						case 108: {
							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
								switch (caret - pseudo) {
									// ::placeholder
									case 2: {
										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
											pattern = tail
										}
									}
									// :read-only
									case 8: {
										if (trail === READONLY) {
											pattern = trail
										}
									}
								}
							}
							break
						}
						// :<pattern>
						case COLON: {
							if (quote + comment + bracket === 0) {
								pseudo = caret
							}
							break
						}
						// selectors
						case COMMA: {
							if (comment + parentheses + quote + bracket === 0) {
								format = 1
								char += '\r'
							}
							break
						}
						// quotes
						case DOUBLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						case SINGLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						// attributes
						case OPENBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket++
							}
							break
						}
						case CLOSEBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket--
							}
							break
						}
						// functions
						case CLOSEPARENTHESES: {
							if (quote + comment + bracket === 0) {
								parentheses--
							}
							break
						}
						case OPENPARENTHESES: {
							if (quote + comment + bracket === 0) {
								if (context === 0) {
									switch (tail*2 + trail*3) {
										// :matches
										case 533: {
											break
										}
										// :global, :not, :nth-child etc...
										default: {
											counter = 0
											context = 1
										}
									}
								}

								parentheses++
							}
							break
						}
						case AT: {
							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
								atrule = 1
							}
							break
						}
						// block/line comments
						case STAR:
						case FOWARDSLASH: {
							if (quote + bracket + parentheses > 0) {
								break
							}

							switch (comment) {
								// initialize line/block comment context
								case 0: {
									switch (code*2 + body.charCodeAt(caret+1)*3) {
										// //
										case 235: {
											comment = FOWARDSLASH
											break
										}
										// /*
										case 220: {
											length = caret
											comment = STAR
											break
										}
									}
									break
								}
								// end block comment context
								case STAR: {
									if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
										// /*<!> ... */, !
										if (body.charCodeAt(length+2) === 33) {
											out += body.substring(length, caret+1)
										}
										char = ''
										comment = 0
									}
								}
							}
						}
					}

					// ignore comment blocks
					if (comment === 0) {
						// aggressive isolation mode, divide each individual selector
						// including selectors in :not function but excluding selectors in :global function
						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
							switch (code) {
								case COMMA:
								case TILDE:
								case GREATERTHAN:
								case PLUS:
								case CLOSEPARENTHESES:
								case OPENPARENTHESES: {
									if (context === 0) {
										// outside of an isolated context i.e nth-child(<...>)
										switch (tail) {
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												char = char + '\0'
												break
											}
											default: {
												char = '\0' + char + (code === COMMA ? '' : '\0')
											}
										}
										format = 1
									} else {
										// within an isolated context, sleep untill it's terminated
										switch (code) {
											case OPENPARENTHESES: {
												// :globa<l>(
												if (pseudo + 7 === caret && tail === 108) {
													pseudo = 0
												}
												context = ++counter
												break
											}
											case CLOSEPARENTHESES: {
												if ((context = --counter) === 0) {
													format = 1
													char += '\0'
												}
												break
											}
										}
									}
									break
								}
								case TAB:
								case SPACE: {
									switch (tail) {
										case NULL:
										case OPENBRACES:
										case CLOSEBRACES:
										case SEMICOLON:
										case COMMA:
										case FORMFEED:
										case TAB:
										case SPACE:
										case NEWLINE:
										case CARRIAGE: {
											break
										}
										default: {
											// ignore in isolated contexts
											if (context === 0) {
												format = 1
												char += '\0'
											}
										}
									}
								}
							}
						}

						// concat buffer of characters
						chars += char

						// previous non-whitespace character code
						if (code !== SPACE && code !== TAB) {
							peak = code
						}
					}
				}
			}

			// tail character codes
			trail = tail
			tail = code

			// visit every character
			caret++
		}

		length = out.length

		// preserve empty selector
 		if (preserve > 0) {
 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
					length = current.join(',').length + 2
 				}
 			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id)

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children
				}
			}

			out = selector.join(',') + '{' + out + '}'

			if (prefix*pattern !== 0) {
				if (prefix === 2 && !vendor(out, 2))
					pattern = 0

				switch (pattern) {
					// ::read-only
					case READONLY: {
						out = out.replace(readonlyptn, ':'+moz+'$1')+out
						break
					}
					// ::placeholder
					case PLACEHOLDER: {
						out = (
							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
							out.replace(plcholdrptn, '::' + moz + '$1') +
							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
						)
						break
					}
				}

				pattern = 0
			}
		}

		return flat + out + children
	}

	/**
	 * Select
	 *
	 * @param {Array<string>} parent
	 * @param {string} current
	 * @param {number} invert
	 * @return {Array<string>}
	 */
	function select (parent, current, invert) {
		var selectors = current.trim().split(selectorptn)
		var out = selectors

		var length = selectors.length
		var l = parent.length

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1: {
				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
					out[i] = scope(selector, out[i], invert, l).trim()
				}
				break
			}
			// >2 parent selectors, nested
			default: {
				for (var i = 0, j = 0, out = []; i < length; ++i) {
					for (var k = 0; k < l; ++k) {
						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim()
					}
				}
			}
		}

		return out
	}

	/**
	 * Scope
	 *
	 * @param {string} parent
	 * @param {string} current
	 * @param {number} invert
	 * @param {number} level
	 * @return {string}
	 */
	function scope (parent, current, invert, level) {
		var selector = current
		var code = selector.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0)
		}

		switch (code) {
			// &
			case AND: {
				switch (cascade + level) {
					case 0:
					case 1: {
						if (parent.trim().length === 0) {
							break
						}
					}
					default: {
						return selector.replace(andptn, '$1'+parent.trim())
					}
				}
				break
			}
			// :
			case COLON: {
				switch (selector.charCodeAt(1)) {
					// g in :global
					case 103: {
						if (escape > 0 && cascade > 0) {
							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
						}
						break
					}
					default: {
						// :hover
						return parent.trim() + selector.replace(andptn, '$1'+parent.trim())
					}
				}
			}
			default: {
				// html &
				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
				}
			}
		}

		return parent + selector
	}

	/**
	 * Property
	 *
	 * @param {string} input
	 * @param {number} first
	 * @param {number} second
	 * @param {number} third
	 * @return {string}
	 */
	function property (input, first, second, third) {
		var index = 0
		var out = input + ';'
		var hash = (first*2) + (second*3) + (third*4)
		var cache

		// animation: a, n, i characters
		if (hash === 944) {
			return animation(out)
		} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
			return out
		}

		// vendor prefix
		switch (hash) {
			// text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
			case 1015: {
				// text-shadow/text-align/text-transform, a
				return out.charCodeAt(10) === 97 ? webkit + out + out : out
			}
			// filter/fill f, i, l
			case 951: {
				// filter, t
				return out.charCodeAt(3) === 116 ? webkit + out + out : out
			}
			// color/column, c, o, l
			case 963: {
				// column, n
				return out.charCodeAt(5) === 110 ? webkit + out + out : out
			}
			// box-decoration-break, b, o, x
			case 1009: {
				if (out.charCodeAt(4) !== 100) {
					break
				}
			}
			// mask, m, a, s
			// clip-path, c, l, i
			case 969:
			case 942: {
				return webkit + out + out
			}
			// appearance: a, p, p
			case 978: {
				return webkit + out + moz + out + out
			}
			// hyphens: h, y, p
			// user-select: u, s, e
			case 1019:
			case 983: {
				return webkit + out + moz + out + ms + out + out
			}
			// background/backface-visibility, b, a, c
			case 883: {
				// backface-visibility, -
				if (out.charCodeAt(8) === DASH) {
					return webkit + out + out
				}

				// image-set(...)
				if (out.indexOf('image-set(', 11) > 0) {
					return out.replace(imgsrcptn, '$1'+webkit+'$2') + out
				}

				return out
			}
			// flex: f, l, e
			case 932: {
				if (out.charCodeAt(4) === DASH) {
					switch (out.charCodeAt(5)) {
						// flex-grow, g
						case 103: {
							return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
						}
						// flex-shrink, s
						case 115: {
							return webkit + out + ms + out.replace('shrink', 'negative') + out
						}
						// flex-basis, b
						case 98: {
							return webkit + out + ms + out.replace('basis', 'preferred-size') + out
						}
					}
				}

				return webkit + out + ms + out + out
			}
			// order: o, r, d
			case 964: {
				return webkit + out + ms + 'flex' + '-' + out + out
			}
			// justify-items/justify-content, j, u, s
			case 1023: {
				// justify-content, c
				if (out.charCodeAt(8) !== 99) {
					break
				}

				cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')
				return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
			}
			// cursor, c, u, r
			case 1005: {
				return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
			}
			// writing-mode, w, r, i
			case 1000: {
				cache = out.substring(13).trim()
				index = cache.indexOf('-') + 1

				switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
					// vertical-lr
					case 226: {
						cache = out.replace(writingptn, 'tb')
						break
					}
					// vertical-rl
					case 232: {
						cache = out.replace(writingptn, 'tb-rl')
						break
					}
					// horizontal-tb
					case 220: {
						cache = out.replace(writingptn, 'lr')
						break
					}
					default: {
						return out
					}
				}

				return webkit + out + ms + cache + out
			}
			// position: sticky
			case 1017: {
				if (out.indexOf('sticky', 9) === -1) {
					return out
				}
			}
			// display(flex/inline-flex/inline-box): d, i, s
			case 975: {
				index = (out = input).length - 10
				cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim()

				switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
					// inline-
					case 203: {
						// inline-box
						if (cache.charCodeAt(8) < 111) {
							break
						}
					}
					// inline-box/sticky
					case 115: {
						out = out.replace(cache, webkit+cache)+';'+out
						break
					}
					// inline-flex
					// flex
					case 207:
					case 102: {
						out = (
							out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
							out.replace(cache, webkit+cache)+';'+
							out.replace(cache, ms+cache+'box')+';'+
							out
						)
					}
				}

				return out + ';'
			}
			// align-items, align-center, align-self: a, l, i, -
			case 938: {
				if (out.charCodeAt(5) === DASH) {
					switch (out.charCodeAt(6)) {
						// align-items, i
						case 105: {
							cache = out.replace('-items', '')
							return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
						}
						// align-self, s
						case 115: {
							return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
						}
						// align-content
						default: {
							return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out
						}
					}
				}
				break
			}
			// min/max
			case 973:
			case 989: {
				// min-/max- height/width/block-size/inline-size
				if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
					break
				}
			}
			// height/width: min-content / width: max-content
			case 931:
			case 953: {
				if (dimensionptn.test(input) === true) {
					// stretch
					if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115)
						return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch')
					else
						return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out
				}
				break
			}
			// transform, transition: t, r, a
			case 962: {
				out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out

				// transitions
				if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
					return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
				}

				break
			}
		}

		return out
	}

	/**
	 * Vendor
	 *
	 * @param {string} content
	 * @param {number} context
	 * @return {boolean}
	 */
	function vendor (content, context) {
		var index = content.indexOf(context === 1 ? ':' : '{')
		var key = content.substring(0, context !== 3 ? index : 10)
		var value = content.substring(index + 1, content.length - 1)

		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
	}

	/**
	 * Supports
	 *
	 * @param {string} match
	 * @param {string} group
	 * @return {string}
	 */
	function supports (match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2))

		return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
	}

	/**
	 * Animation
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function animation (input) {
		var length = input.length
		var index = input.indexOf(':', 9) + 1
		var declare = input.substring(0, index).trim()
		var out = input.substring(index, length-1).trim()

		switch (input.charCodeAt(9)*keyed) {
			case 0: {
				break
			}
			// animation-*, -
			case DASH: {
				// animation-name, n
				if (input.charCodeAt(10) !== 110) {
					break
				}
			}
			// animation/animation-name
			default: {
				// split in case of multiple animations
				var list = out.split((out = '', animationptn))

				for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
					var value = list[i]
					var items = value.split(propertiesptn)

					while (value = items[index]) {
						var peak = value.charCodeAt(0)

						if (keyed === 1 && (
							// letters
							(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
							// dash but not in sequence i.e --
							(peak === DASH && value.charCodeAt(1) !== DASH)
						)) {
							// not a number/function
							switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
								case 1: {
									switch (value) {
										// not a valid reserved keyword
										case 'infinite': case 'alternate': case 'backwards': case 'running':
										case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
										case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
										case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
										case 'initial': case 'unset': case 'step-start': case 'step-end': {
											break
										}
										default: {
											value += key
										}
									}
								}
							}
						}

						items[index++] = value
					}

					out += (i === 0 ? '' : ',') + items.join(' ')
				}
			}
		}

		out = declare + out + ';'

		if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
			return webkit + out + out

		return out
	}

	/**
	 * Isolate
	 *
	 * @param {Array<string>} current
	 */
	function isolate (current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn)
			var out = ''

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue
				}

				tail = out.charCodeAt(out.length-1)
				code = element.charCodeAt(0)
				padding = ''

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:  {
							break
						}
						default: {
							padding = ' '
						}
					}
				}

				switch (code) {
					case AND: {
						element = padding + nscopealt
					}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES: {
						break
					}
					case OPENBRACKET: {
						element = padding + element + nscopealt
						break
					}
					case COLON: {
						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
							// :global
							case 530: {
								if (escape > 0) {
									element = padding + element.substring(8, size - 1)
									break
								}
							}
							// :hover, :nth-child(), ...
							default: {
								if (j < 1 || elements[j-1].length < 1) {
									element = padding + nscopealt + element
								}
							}
						}
						break
					}
					case COMMA: {
						padding = ''
					}
					default: {
						if (size > 1 && element.indexOf(':') > 0) {
							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2')
						} else {
							element = padding + element + nscopealt
						}
					}
				}

				out += element
			}

			selector[i] = out.replace(formatptn, '').trim()
		}

		return selector
	}

	/**
	 * Proxy
	 *
	 * @param {number} context
	 * @param {string} content
	 * @param {Array<string>} selectors
	 * @param {Array<string>} parents
	 * @param {number} line
	 * @param {number} column
	 * @param {number} length
	 * @param {number} id
	 * @param {number} depth
	 * @param {number} at
	 * @return {(string|void|*)}
	 */
	function proxy (context, content, selectors, parents, line, column, length, id, depth, at) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
				case void 0:
				case false:
				case true:
				case null: {
					break
				}
				default: {
					out = next
				}
			}
		}

		switch (out) {
			case void 0:
			case false:
			case true:
			case null:
			case content: {
				break
			}
			default: {
				return out
			}
		}
	}

	/**
	 * @param {number} code
	 * @param {number} index
	 * @param {number} length
	 * @param {string} body
	 * @return {number}
	 */
	function delimited (code, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				// /*
				case FOWARDSLASH: {
					if (code === STAR) {
						if (body.charCodeAt(i - 1) === STAR &&  index + 2 !== i) {
							return i + 1
						}
					}
					break
				}
				// //
				case NEWLINE: {
					if (code === FOWARDSLASH) {
						return i + 1
					}
				}
			}
		}

		return i
	}

	/**
	 * @param {number} type
	 * @param {number} index
	 * @param {number} length
	 * @param {number} find
	 * @param {string} body
	 * @return {number}
	 */
	function match (type, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				case type: {
					return i
				}
			}
		}

		return i
	}

	/**
	 * Minify
	 *
	 * @param {(string|*)} output
	 * @return {string}
	 */
	function minify (output) {
		return output
			.replace(formatptn, '')
			.replace(beforeptn, '')
			.replace(afterptn, '$1')
			.replace(tailptn, '$1')
			.replace(whiteptn, ' ')
	}

	/**
	 * Use
	 *
	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
	 */
	function use (plugin) {
		switch (plugin) {
			case void 0:
			case null: {
				plugged = plugins.length = 0
				break
			}
			default: {
				switch (plugin.constructor) {
					case Array: {
						for (var i = 0, length = plugin.length; i < length; ++i) {
							use(plugin[i])
						}
						break
					}
					case Function: {
						plugins[plugged++] = plugin
						break
					}
					case Boolean: {
						unkwn = !!plugin|0
					}
				}
			}
 		}

 		return use
	}

	/**
	 * Set
	 *
	 * @param {*} options
	 */
	function set (options) {
		for (var name in options) {
			var value = options[name]
			switch (name) {
				case 'keyframe': keyed = value|0; break
				case 'global': escape = value|0; break
				case 'cascade': cascade = value|0; break
				case 'compress': compress = value|0; break
				case 'semicolon': semicolon = value|0; break
				case 'preserve': preserve = value|0; break
				case 'prefix':
					should = null

					if (!value) {
						prefix = 0
					} else if (typeof value !== 'function') {
						prefix = 1
					} else {
						prefix = 2
						should = value
					}
			}
		}

		return set
	}

	/**
	 * Stylis
	 *
	 * @param {string} selector
	 * @param {string} input
	 * @return {*}
	 */
	function stylis (selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector)
		}

		// setup
		var ns = selector
		var code = ns.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0)
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-')
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns
		} else {
			nscopealt = ns
		}

		var selectors = [nscope]
		var result

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0)

			if (result !== void 0 && typeof result === 'string') {
				input = result
			}
		}

		// build
		var output = compile(array, selectors, input, 0, 0)

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0)

			// bypass minification
			if (result !== void 0 && typeof(output = result) !== 'string') {
				code = 0
			}
		}

		// reset
		key = ''
		nscope = ''
		nscopealt = ''
		pattern = 0
		line = 1
		column = 1

		return compress*code === 0 ? output : minify(output)
	}

	stylis['use'] = use
	stylis['set'] = set

	if (options !== void 0) {
		set(options)
	}

	return stylis
}));


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);