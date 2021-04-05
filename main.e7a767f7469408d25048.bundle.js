/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + "87519fe1a2d4cbbbac08" + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "linked-list:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklinked_list"] = self["webpackChunklinked_list"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/state.ts
var algorithms;
(function (algorithms) {
    algorithms[algorithms["mergeSort"] = 0] = "mergeSort";
    algorithms[algorithms["bubbleSort"] = 1] = "bubbleSort";
})(algorithms || (algorithms = {}));
//takes an object and exposes it through get or set function
//ensures state is always up to date throughout the app
const { get, set, pause } = function loadState(state) {
    const get = (key) => state[key];
    const set = (key, value) => void (state[key] = value);
    const pause = function makePause() {
        const pauseBtn = document.querySelector('button#pause');
        pauseBtn.onclick = () => state.isPaused = true;
        return () => state.isPaused && new Promise((resolve) => {
            pauseBtn.textContent = 'START';
            pauseBtn.onclick = () => {
                state.isPaused = false;
                resolve(true);
                pauseBtn.textContent = 'PAUSE';
                console.log('unpaused');
                pauseBtn.onclick = () => state.isPaused = true;
            };
        });
    }();
    return { get, set, pause };
}(
//this object can only be accessed through get, set, pause functions
new class State {
    constructor() {
        this.domIsRunning = false;
        this.canvasIsRunning = false;
        this.speed = 700;
        this.isPaused = false;
        this.algorithm = null;
        this.numOfBars = 50;
    }
});

;// CONCATENATED MODULE: ./src/utils.ts
class HSL {
    constructor(hue, saturation, lightness = 0) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.color = '';
        this.setColor({ hue, saturation, lightness });
    }
    setColor({ hue, saturation, lightness }) {
        return this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    reset() {
        return this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
const error = (msg) => {
    throw new Error(msg);
};
//factory for manipulating element classLists
//used in index.ts
const make = (arrayAction) => (action, className, orFunc) => (...elements) => elements[arrayAction](element => element.classList[action](className) || (orFunc === null || orFunc === void 0 ? void 0 : orFunc(element)));
const addElement = (parent, tag, { textContent, className, id }) => {
    const newElement = document.createElement(tag);
    if (textContent)
        newElement.textContent = textContent;
    if (className)
        newElement.classList.add(className);
    if (id)
        newElement.id = id;
    parent.append(newElement);
    return newElement;
};
const map = (value, a, b, c, d) => {
    const temp = (value - a) / (b - a); // first map value from (a..b) to (0..1)
    return Math.round(c + temp * (d - c)); // then map it from (0..1) to (c..d) and return it
};


;// CONCATENATED MODULE: ./src/domLinkedList.ts


const cloneNode = function makeCloneNode() {
    let source;
    (function (source) {
        source[source["kanyeRest"] = 0] = "kanyeRest";
        source[source["dataJokes"] = 1] = "dataJokes";
    })(source || (source = {}));
    ;
    let content = [].values();
    let currentSource;
    const setContent = function makeSetContent() {
        const getDadJokesUrl = () => 'https://icanhazdadjoke.com/search?page=' + Math.round(Math.random() * 15);
        const kanyeRestUrl = 'https://api.kanye.rest';
        return async function setContent() {
            const url = currentSource === source.dataJokes ? getDadJokesUrl() : kanyeRestUrl;
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Linked List Visualization (https://github.com/mzamora1/repo)',
                    'Accept': 'application/json'
                },
                method: 'GET'
            });
            const json = await response.json();
            if ('results' in json) {
                return content = json.results.map(({ joke }) => joke).values();
            }
            else
                return content = [json.quote].values();
        };
    }();
    void function setDropwDownHandler() {
        const dropdown = document.querySelector('select');
        dropdown.onchange = function () {
            currentSource = +dropdown.value;
            while (content.next().value)
                ;
            setContent();
        };
    }();
    addEventListener('load', setContent, { once: true });
    const template = document.querySelector('template#node').content;
    return async function cloneNode() {
        const clone = template.firstElementChild.cloneNode(true);
        const title = clone.querySelector('span.data-title');
        const dataSpan = clone.querySelector('span.node-data');
        const { done, value } = content.next();
        if (done) {
            await setContent();
            dataSpan.textContent = content.next().value;
        }
        else
            dataSpan.textContent = value;
        title.textContent = currentSource === source.dataJokes ? 'Dad Joke: ' : 'Kanye Quote: ';
        return clone;
    };
}(); //end of makeCloneNode
const domLinkedList = function createDOMLinkedList() {
    const toggle = async (element, classes, ms) => {
        classes.forEach(c => element.classList.toggle(c));
        await pause();
        await sleep(ms);
        classes.forEach(c => element.classList.toggle(c));
    };
    return new class DOMLinkedList {
        constructor() {
            this.figure = document.querySelector('figure#linkedList');
            this.head = this.figure.querySelector('#head');
            this.end = this.figure.querySelector('.null');
            this.searchContainer = this.figure.querySelector('#searchResult');
            this.length = 0;
            this.searchContainer.onclick = e => {
                e.stopPropagation();
                this.searchContainer.classList.remove('visible');
            };
        }
        *[Symbol.iterator]() {
            for (const node of this.figure.children) {
                if (!get('domIsRunning'))
                    return console.log('not running');
                if (!node.classList.contains('node') || node === this.head)
                    continue;
                yield node;
            }
        }
        async *[Symbol.asyncIterator]() {
            for (const node of this) {
                await toggle(node, ['active'], get('speed'));
                yield node;
            }
        }
        async insert(target) {
            const clone = await cloneNode();
            switch (target) {
                case this.head:
                    this.head.after(clone);
                    await toggle(clone, ['new'], get('speed') * 0.5);
                    break;
                case this.end.previousElementSibling:
                case this.figure:
                    this.end.before(clone);
                    await toggle(clone, ['new'], get('speed') * 0.5);
                    break;
                default:
                    for await (const node of this) {
                        if (node === target) {
                            node.after(clone);
                            await toggle(clone, ['new'], get('speed') * 1.25);
                            break;
                        }
                    }
            }
            this.length++;
        }
        async delete(target) {
            if (this.head.nextElementSibling === this.end)
                return;
            if (target === this.head)
                target = this.head.nextElementSibling;
            else if (target === this.figure)
                target = this.end.previousElementSibling;
            for await (const node of this) {
                if (node === target) {
                    await toggle(node, ['remove'], get('speed') * 1.25);
                    node.remove();
                    break;
                }
            }
            this.length--;
        }
        async search(target) {
            switch (target) {
                case this.head:
                    target = this.head.nextElementSibling;
                    break;
                case this.end:
                    target = this.end.previousElementSibling;
                    break;
                case this.figure:
                    target = null;
                    break;
            }
            for await (const node of this) {
                if (node === target) {
                    this.searchContainer.classList.add('visible');
                    return this.searchContainer.firstElementChild.textContent = node.querySelector('span.node-data').textContent;
                }
            }
        }
        async sort(func) {
            for (let last = this.length - 1; last > 0; last--) {
                let i = 0;
                for (const node of this) {
                    if (i++ > last)
                        break;
                    const nextNode = node.nextElementSibling;
                    toggle(node, ['active'], get('speed'));
                    await toggle(nextNode, ['new'], get('speed'));
                    const nextSpan = nextNode.querySelector('span');
                    if (nextSpan && func(node, nextNode)) {
                        const span = node.querySelector('span');
                        const temp = span.textContent;
                        span.textContent = nextSpan.textContent;
                        nextSpan.textContent = temp;
                        toggle(node, ['new'], get('speed') * 1.25);
                        await toggle(nextNode, ['active'], get('speed') * 1.25);
                    }
                }
            }
        }
    }; //end of DOMLinkedList 
}(); // end of createDOMLinkedList
/* harmony default export */ const src_domLinkedList = (domLinkedList);

;// CONCATENATED MODULE: ./src/style.ts


//represents a bar inside the canvas element
//used in canvasLinkedList.ts
class Bar {
    constructor(canvas, color) {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.random = Math.random();
        this.resize(canvas);
        const lightness = map(this.width, 0, canvas.width, 5, 95);
        this.hsl = new HSL(color.hue, color.saturation, lightness);
    }
    resize({ width, height }) {
        this.width = this.random * width;
        this.height = height / get('numOfBars');
        this.x = (width / 2) - (this.width / 2);
    }
}
//used in canvasLinkedList.ts, curryStyle
const drawFrame = function makeDrawFrame(canvas) {
    //const canvas = document.querySelector('canvas')!
    const ctx = canvas.getContext('2d');
    return function drawFrame(list) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let index = 0;
        for (let bar = list.head; bar !== null; bar = bar.next) {
            const { hsl, x, height, width } = bar.data;
            ctx.fillStyle = hsl.color;
            ctx.fillRect(x, height * index++, width, height);
        }
    };
}(document.querySelector('canvas'));
//factory function for styling bars
//used in sort.ts
const curryStyle = function makeCurry(colors) {
    return function curryStyle(getTimeOfDelay, dontReset = false) {
        return async function style(node, next, listToDraw) {
            if (!get('canvasIsRunning'))
                return;
            node.data.hsl.setColor(colors[0]);
            next === null || next === void 0 ? void 0 : next.data.hsl.setColor(colors[1]);
            const promiseOrFalse = pause();
            if (promiseOrFalse)
                await promiseOrFalse;
            if (listToDraw) {
                //console.log(listToDraw)
                drawFrame(listToDraw);
            }
            await sleep(getTimeOfDelay());
            if (dontReset)
                return;
            node.data.hsl.reset();
            next === null || next === void 0 ? void 0 : next.data.hsl.reset();
        };
    };
    //first: purple, second: green
}([new HSL(300, 100, 50), new HSL(152, 100, 50)]);

;// CONCATENATED MODULE: ./src/linkedList.ts
const isInBounds = function (self, ...indexes) {
    const { length } = self;
    for (const index of indexes) {
        if (index < 0 || index >= length) {
            throw new RangeError(`Index: ${index} is out of bounds Length: ${length}`);
        }
    }
    return true;
};
class Base {
}
class LinkedListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
    *[Symbol.iterator]() {
        for (let current = this; current !== null; current = current.next) {
            yield current;
        }
    }
    get length() {
        let length = 0;
        for (const _ of this)
            length++;
        return length;
    }
    copy(end = Infinity) {
        if (end === 0)
            return new LinkedListNode(undefined);
        let index = 0;
        const clone = (node) => {
            return node === null || index++ >= end ? null : new LinkedListNode(node.data, clone(node.next));
        };
        return clone(this);
    }
    toString() {
        return `Data: ${this.data}`;
    }
} // end of LinkedListNode
class LinkedList {
    constructor(...args) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (args.length)
            this.add(...args);
    }
    *[Symbol.iterator]() {
        for (let current = this.head; current !== null; current = current.next) {
            yield current;
        }
    }
    copy(start = 0, end = Infinity) {
        if (end < start)
            throw new RangeError(`start must be less than end\n\t\tStart: ${start}\tEnd: ${end}`);
        if (end <= start || !this.head)
            return new LinkedList();
        return new LinkedList(...this.get(start).copy(end));
    }
    join(...iterables) {
        for (const iterable of iterables) {
            if (Symbol.iterator in Object(iterable)) {
                this.add(...iterable);
            }
            else
                this.add(iterable);
        }
        return this;
    }
    addFirst(...args) {
        var _a;
        for (const data of args) {
            if (data instanceof LinkedListNode)
                this.head = new LinkedListNode(data.data, this.head);
            else
                this.head = new LinkedListNode(data, this.head);
            (_a = this.tail) !== null && _a !== void 0 ? _a : (this.tail = this.head);
            this.length++;
        }
        return this;
    }
    add(...args) {
        for (const data of args) {
            if (this.tail) {
                if (data instanceof LinkedListNode)
                    this.tail.next = new LinkedListNode(data.data);
                else
                    this.tail.next = new LinkedListNode(data);
                this.tail = this.tail.next;
                this.length++;
            }
            else
                this.addFirst(data);
        }
        return this;
    }
    forEach(func) {
        let index = 0;
        for (const node of this) {
            func(node, index++);
        }
    }
    find(func) {
        let index = 0;
        for (const node of this) {
            const response = func(node, index++);
            if (response !== undefined && response !== false) {
                return response;
            }
        }
    }
    indexOf(node) {
        const index = this.find((n, index) => n === node && index);
        return index === undefined ? -1 : index;
    }
    get(index) {
        isInBounds(this, index);
        return this.find((node, i) => i === index && node);
    }
    insert(index, data) {
        isInBounds(this, index);
        switch (index) {
            case 0: return this.addFirst(data);
            case this.length - 1: return this.add(data);
            default: {
                const node = this.get(index);
                node.next = new LinkedListNode(data, node.next);
                return this;
            }
        }
    }
    removeHead() {
        if (!this.head)
            throw new ReferenceError('cannot remove from empty list');
        const removed = this.head;
        this.head = this.head.next;
        this.length--;
        return removed;
    }
    clear() {
        while (this.head)
            this.head = this.head.next;
        this.tail = null;
        this.length = 0;
        return this;
    }
    remove(indexOrNode) {
        if (indexOrNode instanceof LinkedListNode) {
            const index = this.indexOf(indexOrNode);
            return this.remove(index);
        }
        isInBounds(this, indexOrNode);
        if (indexOrNode === 0)
            return this.removeHead();
        else {
            const node = this.get(indexOrNode - 1);
            const removed = node.next;
            node.next = removed.next;
            this.length--;
            return removed;
        }
    }
    filter(func) {
        let index = 0;
        let previous;
        for (let current = this.head; current !== null; current = current.next, index++) {
            if (func(current, index)) {
                if (index === 0)
                    this.head = current.next;
                else {
                    previous.next = current.next;
                    if (current === this.tail)
                        this.tail = previous;
                    current = previous;
                }
                this.length--, index--;
            }
            previous = current;
        }
        return this;
    }
    map(func) {
        const newList = new LinkedList();
        this.forEach((node, index) => {
            var _a, _b;
            const response = func(node, index);
            if (response !== undefined) {
                newList.add((_b = (_a = response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response);
            }
        });
        return newList;
    }
    toString() {
        let string = '', count = 1;
        for (const node of this) {
            string += `${node.data} ${count++ === this.length ? '\n' : '==>'} `;
        }
        string += `\n%cLength: ${this.length}\n`;
        console.log(string, 'font-weight: bold;');
        return string;
    }
    swap(a, b) {
        const temp = a.data;
        a.data = b.data;
        b.data = temp;
        return this;
    }
} // end of LinkedList
const empty = new LinkedList();
const balls = { balls: 0 };
empty.add('im a string', 4, balls);
console.log(empty);
const arr = Array(20).fill(1).map(v => v = Math.round(Math.random() * 20));
const obj = {};
const list = new LinkedList(...arr);
console.log(list.tail);
console.log(list.remove(list.tail));
console.log(list.length, list.copy(0));
const clone = list.copy(1);
const linkedList_map = list.map(node => node);
console.log(clone, linkedList_map);
list.toString();
list.filter(node => node.data === 6);
//list.toString();
list.join(list).toString();

;// CONCATENATED MODULE: ./src/sort.ts



const fastStyle = curryStyle(() => get('speed') * 0.25);
const bubbleSort = async (list) => {
    const slowStyle = curryStyle(() => get('speed') * 0.35);
    for (let i = list.length; i > 1; i--) {
        let j = 0;
        for (const node of list) {
            if (!get('canvasIsRunning'))
                return console.log('stopped early');
            if (++j >= i)
                break;
            await fastStyle(node, node.next);
            if (node.data.width > node.next.data.width) {
                list.swap(node, node.next);
                await slowStyle(node.next, node);
            }
        }
    }
};
const mergeSort = async (list) => {
    const reallyFastStyle = curryStyle(() => get('speed') * 0.15);
    const reallySlowStyle = curryStyle(() => get('speed') * 0.5);
    const getMiddle = (node) => {
        var _a;
        if (!node)
            return null;
        let slow = node, fast = node;
        while ((_a = fast.next) === null || _a === void 0 ? void 0 : _a.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    };
    const merge = async (a, b) => {
        if (!a)
            return b;
        if (!b)
            return a;
        let result = null;
        if (a.data.width <= b.data.width) {
            result = a;
            await fastStyle(result, b, new LinkedList(...a).join(b));
            result.next = await merge(a.next, b);
        }
        else {
            result = b;
            await fastStyle(result, a, new LinkedList(...a).join(b));
            result.next = await merge(a, b.next);
        }
        await reallyFastStyle(result, undefined, new LinkedList(...result));
        return result;
    };
    const mergeSort = async (node) => {
        if (!(node === null || node === void 0 ? void 0 : node.next))
            return node;
        const left = node;
        const middle = getMiddle(node);
        const right = middle.next;
        middle.next = null;
        await reallySlowStyle(middle, left, new LinkedList(...node));
        return await merge(await mergeSort(left), await mergeSort(right));
    };
    const head = await mergeSort(list.head);
    if (get('canvasIsRunning')) {
        list.head = head;
        console.log('done!', list);
    }
    else
        console.log('stopped early');
};

;// CONCATENATED MODULE: ./src/canvasLinkedList.ts





const figure = document.querySelector('figure.canvasContainer');
const linkedList = new LinkedList();
const refresh = function makeRefresh(canvas, figure) {
    return function refresh() {
        set('canvasIsRunning', false);
        linkedList.clear();
        const { width, height } = figure.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        for (let i = 0; i < get('numOfBars'); i++) {
            linkedList.add(new Bar(canvas, new HSL(183, 76.5)));
        }
    };
}(figure.querySelector('canvas'), figure);
const startCanvas = function makeStartCanvas() {
    const sortInstructions = document.querySelector('#sortInstructions');
    const startDelay = 1500;
    let timeOfLastStart = 0;
    return async function startCanvas() {
        if (Date.now() - timeOfLastStart <= startDelay)
            return;
        timeOfLastStart = Date.now();
        sortInstructions.classList.remove('visible');
        refresh();
        drawFrame(linkedList);
        await sleep(startDelay);
        await pause();
        set('canvasIsRunning', true);
        const sortFunc = get('algorithm') === algorithms.mergeSort ? mergeSort : bubbleSort;
        if (sortFunc.name !== 'mergeSort') {
            const draw = () => {
                if (!get('canvasIsRunning'))
                    return console.log('stopped early');
                drawFrame(linkedList);
                requestAnimationFrame(draw);
            };
            draw();
        }
        await sortFunc(linkedList);
        if (!get('canvasIsRunning'))
            return;
        set('canvasIsRunning', false);
        drawFrame(linkedList);
    };
}();
/* harmony default export */ const canvasLinkedList = (startCanvas);

;// CONCATENATED MODULE: ./src/index.ts





__webpack_require__.e(/* import() */ 388).then(__webpack_require__.t.bind(__webpack_require__, 388, 23)).then((particles) => {
    const global = window;
    global.particlesJS.load('particles', 'particles.json');
    const observer = new IntersectionObserver(entries => {
        var _a;
        if (!((_a = global.pJSDom[0]) === null || _a === void 0 ? void 0 : _a.pJS))
            return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                global.pJSDom[0].pJS.particles.move.enable = false;
                console.count('paused');
            }
            else {
                global.pJSDom[0].pJS.particles.move.enable = true;
                global.pJSDom[0].pJS.fn.particlesRefresh();
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.75 });
    observer.observe(src_domLinkedList.figure);
});
void function setGlobalHandlers() {
    void function setSpeedInputHandler() {
        const speedSlider = document.querySelector('#speed');
        speedSlider.onchange = () => set('speed', +speedSlider.value);
    }();
    void function setBarInputHandler() {
        const barInput = document.querySelector('#bar-input');
        barInput.onchange = function () {
            set('numOfBars', +barInput.value);
            if (get('algorithm') !== null)
                canvasLinkedList();
        };
    }();
    const makeForEach = make('forEach');
    const show = makeForEach('add', 'visible'), hide = makeForEach('remove', 'visible'), activate = makeForEach('add', 'active'), deactivate = makeForEach('remove', 'active'), findActiveIndex = make('findIndex')('contains', 'active');
    const sortInput = document.querySelector('#algorithms');
    const sortInstructions = document.querySelector('#sortInstructions');
    void function setAlgorithmInputHandler() {
        const sortButtons = sortInput.querySelector('#sortContainer');
        sortButtons.onclick = ({ target }) => {
            if (target === sortButtons)
                return;
            hide(sortInstructions);
            const indexOfOldActive = findActiveIndex(...sortButtons.children);
            if (indexOfOldActive !== -1)
                deactivate(sortButtons.children[indexOfOldActive]);
            const newActiveBtn = target;
            activate(newActiveBtn);
            set('algorithm', findActiveIndex(...sortButtons.children));
            canvasLinkedList();
        };
    }();
    void function setMainHandlers() {
        const apiInput = document.querySelector('#api');
        const barInput = document.querySelector('#bars');
        const insturctions = src_domLinkedList.figure.querySelector('#mainInstructions');
        const nav = document.querySelector('nav');
        void function setNavHandler() {
            const isClicked = [];
            const sortButton = nav.children[3];
            sortButton.onclick = () => {
                hide(src_domLinkedList.figure);
                show(figure, sortInput, sortInstructions, barInput);
            };
            activate(nav.children[0]);
            show(insturctions, insturctions.children[0]);
            nav.onclick = ({ target }) => {
                if (target === nav)
                    return;
                set('isPaused', false);
                if (target !== sortButton) {
                    show(src_domLinkedList.figure);
                    hide(figure, sortInput, barInput);
                }
                const oldActiveIndex = findActiveIndex(...nav.children);
                //if list is empty and insert btn was active then dont change active btn except if user clicked on sort btn
                if (src_domLinkedList.length === 0 && oldActiveIndex === 0 && target !== sortButton)
                    return;
                hide(src_domLinkedList.searchContainer, insturctions, insturctions.children[oldActiveIndex], apiInput);
                deactivate(nav.children[oldActiveIndex]);
                set('domIsRunning', false);
                set('canvasIsRunning', false);
                const activeBtn = target;
                activate(activeBtn);
                if (activeBtn === nav.children[0]) {
                    show(apiInput);
                }
                const newIndex = findActiveIndex(...nav.children);
                if (target === sortButton || isClicked.includes(newIndex))
                    return;
                isClicked.push(newIndex);
                show(insturctions, insturctions.children[newIndex]);
            };
        }(); //end of setNavHandler
        void function setLinkedListHandler() {
            const findTarget = make('find')('contains', 'node', element => element === src_domLinkedList.figure);
            src_domLinkedList.figure.onclick = async (e) => {
                if (get('domIsRunning'))
                    return;
                if (insturctions.classList.contains('visible'))
                    return hide(insturctions);
                const target = findTarget(...e.composedPath());
                set('domIsRunning', true);
                switch (findActiveIndex(...nav.children)) {
                    case 0:
                        await src_domLinkedList.insert(target);
                        break;
                    case 1:
                        await src_domLinkedList.delete(target);
                        break;
                    case 2:
                        await src_domLinkedList.search(target);
                        break;
                    case 3: await src_domLinkedList.sort((node, next) => {
                        if (document.body.clientWidth > 800) {
                            return node.clientWidth > next.clientWidth;
                        }
                        else {
                            const firstData = node.querySelector('.node-data').textContent, secondData = next.querySelector('.node-data').textContent;
                            return firstData.split(' ').length > secondData.split(' ').length;
                        }
                    });
                }
                set('domIsRunning', false);
            };
        }(); //end of setLinkedListHandler
    }(); //end of setMainHandlers
}(); //end of setGlobalHandlers

/******/ })()
;