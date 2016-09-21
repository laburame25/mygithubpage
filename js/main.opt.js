! function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, i) {
            t.fn[e] = function(o) {
                if ("string" == typeof o) {
                    for (var s = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var h = this[a],
                            c = t.data(h, e);
                        if (c)
                            if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                                var p = c[o].apply(c, s);
                                if (void 0 !== p) return p
                            } else r("no such method '" + o + "' for " + e + " instance");
                        else r("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var n = t.data(this, e);
                    n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
                })
            }
        }
        if (t) {
            var r = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), o(t, e)
            }, t.bridget
        }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
}(window),
function(t) {
    function e(t) {
        return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }

    function i(t, e) {
        var i = n(t, e) ? r : o;
        i(t, e)
    }
    var n, o, r;
    "classList" in document.documentElement ? (n = function(t, e) {
        return t.classList.contains(e)
    }, o = function(t, e) {
        t.classList.add(e)
    }, r = function(t, e) {
        t.classList.remove(e)
    }) : (n = function(t, i) {
        return e(i).test(t.className)
    }, o = function(t, e) {
        n(t, e) || (t.className = t.className + " " + e)
    }, r = function(t, i) {
        t.className = t.className.replace(e(i), " ")
    });
    var s = {
        hasClass: n,
        addClass: o,
        removeClass: r,
        toggleClass: i,
        has: n,
        add: o,
        remove: r,
        toggle: i
    };
    "function" == typeof define && define.amd ? define("classie/classie", s) : "object" == typeof exports ? module.exports = s : t.classie = s
}(window),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n = t.prototype,
        o = this,
        r = o.EventEmitter;
    n.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function(t, i) {
        var n, o = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (n in o) o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {
            listener: i,
            once: !1
        });
        return this
    }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
        return this.getListeners(t), this
    }, n.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, n.removeListener = function(t, i) {
        var n, o, r = this.getListenersAsObject(t);
        for (o in r) r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function(t, e, i) {
        var n, o, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--;) r.call(this, e, i[n]);
        else
            for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
        return this
    }, n.removeEvent = function(t) {
        var e, i = typeof t,
            n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
        var i, n, o, r, s = this.getListenersAsObject(t);
        for (o in s)
            if (s.hasOwnProperty(o))
                for (n = s[o].length; n--;) i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function() {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, n._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return o.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this),
    function(t) {
        function e(e) {
            var i = t.event;
            return i.target = i.target || i.srcElement || e, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : i.attachEvent && (n = function(t, i, n) {
            t[i + n] = n.handleEvent ? function() {
                var i = e(t);
                n.handleEvent.call(n, i)
            } : function() {
                var i = e(t);
                n.call(t, i)
            }, t.attachEvent("on" + i, t[i + n])
        });
        var o = function() {};
        i.removeEventListener ? o = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : i.detachEvent && (o = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var r = {
            bind: n,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
    }(window),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, o = 0, r = i.length; r > o; o++)
                    if (e = i[o] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t, e) {
        function i(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function n() {}

        function o() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                t[n] = 0
            }
            return t
        }

        function r(e) {
            function n() {
                if (!u) {
                    u = !0;
                    var n = t.getComputedStyle;
                    if (h = function() {
                            var t = n ? function(t) {
                                return n(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var i = t(e);
                                return i || s("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                            }
                        }(), c = e("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[c] = "border-box";
                        var r = document.body || document.documentElement;
                        r.appendChild(o);
                        var a = h(o);
                        p = 200 === i(a.width), r.removeChild(o)
                    }
                }
            }

            function r(t) {
                if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var e = h(t);
                    if ("none" === e.display) return o();
                    var r = {};
                    r.width = t.offsetWidth, r.height = t.offsetHeight;
                    for (var s = r.isBorderBox = !(!c || !e[c] || "border-box" !== e[c]), u = 0, d = a.length; d > u; u++) {
                        var f = a[u],
                            v = e[f];
                        v = l(t, v);
                        var y = parseFloat(v);
                        r[f] = isNaN(y) ? 0 : y
                    }
                    var m = r.paddingLeft + r.paddingRight,
                        g = r.paddingTop + r.paddingBottom,
                        b = r.marginLeft + r.marginRight,
                        x = r.marginTop + r.marginBottom,
                        w = r.borderLeftWidth + r.borderRightWidth,
                        S = r.borderTopWidth + r.borderBottomWidth,
                        C = s && p,
                        E = i(e.width);
                    E !== !1 && (r.width = E + (C ? 0 : m + w));
                    var _ = i(e.height);
                    return _ !== !1 && (r.height = _ + (C ? 0 : g + S)), r.innerWidth = r.width - (m + w), r.innerHeight = r.height - (g + S), r.outerWidth = r.width + b, r.outerHeight = r.height + x, r
                }
            }

            function l(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = e.style,
                    o = n.left,
                    r = e.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = o, s && (r.left = s), i
            }
            var h, c, p, u = !1;
            return r
        }
        var s = "undefined" == typeof console ? n : function(t) {
                console.error(t)
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], r) : "object" == typeof exports ? module.exports = r(require("desandro-get-style-property")) : t.getSize = r(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : s.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== r.readyState;
            e.isReady || i || n()
        }

        function n() {
            e.isReady = !0;
            for (var t = 0, i = s.length; i > t; t++) {
                var n = s[t];
                n()
            }
        }

        function o(o) {
            return "complete" === r.readyState ? n() : (o.bind(r, "DOMContentLoaded", i), o.bind(r, "readystatechange", i), o.bind(t, "load", i)), e
        }
        var r = t.document,
            s = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            return t[s](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            i(t);
            for (var n = t.parentNode.querySelectorAll(e), o = 0, r = n.length; r > o; o++)
                if (n[o] === t) return !0;
            return !1
        }

        function o(t, n) {
            return i(t), e(t, n)
        }
        var r, s = function() {
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
                var o = e[i],
                    r = o + "MatchesSelector";
                if (t[r]) return r
            }
        }();
        if (s) {
            var a = document.createElement("div"),
                l = e(a, "div");
            r = l ? e : o
        } else r = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return r
        }) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
    }(Element.prototype),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
    }(window, function(t, e, i) {
        var n = {};
        n.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, n.modulo = function(t, e) {
            return (t % e + e) % e
        };
        var o = Object.prototype.toString;
        n.isArray = function(t) {
            return "[object Array]" == o.call(t)
        }, n.makeArray = function(t) {
            var e = [];
            if (n.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0, o = t.length; o > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, n.indexOf = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        }, n.removeFrom = function(t, e) {
            var i = n.indexOf(t, e); - 1 != i && t.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
        }, n.setText = function() {
            function t(t, i) {
                e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
            }
            var e;
            return t
        }(), n.getParent = function(t, e) {
            for (; t != document.body;)
                if (t = t.parentNode, i(t, e)) return t
        }, n.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, n.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.filterFindElements = function(t, e) {
            t = n.makeArray(t);
            for (var o = [], r = 0, s = t.length; s > r; r++) {
                var a = t[r];
                if (n.isElement(a))
                    if (e) {
                        i(a, e) && o.push(a);
                        for (var l = a.querySelectorAll(e), h = 0, c = l.length; c > h; h++) o.push(l[h])
                    } else o.push(a)
            }
            return o
        }, n.debounceMethod = function(t, e, i) {
            var n = t.prototype[e],
                o = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[o];
                t && clearTimeout(t);
                var e = arguments,
                    r = this;
                this[o] = setTimeout(function() {
                    n.apply(r, e), delete r[o]
                }, i || 100)
            }
        }, n.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var r = t.console;
        return n.htmlInit = function(i, o) {
            e(function() {
                for (var e = n.toDashed(o), s = document.querySelectorAll(".js-" + e), a = "data-" + e + "-options", l = 0, h = s.length; h > l; l++) {
                    var c, p = s[l],
                        u = p.getAttribute(a);
                    try {
                        c = u && JSON.parse(u)
                    } catch (d) {
                        r && r.error("Error parsing " + a + " on " + p.nodeName.toLowerCase() + (p.id ? "#" + p.id : "") + ": " + d);
                        continue
                    }
                    var f = new i(p, c),
                        v = t.jQuery;
                    v && v.data(p, o, f)
                }
            })
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
            return e(t, i)
        }) : "object" == typeof exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
    }(window, function(t, e) {
        function i(t, e) {
            this.element = t, this.parent = e, this.create()
        }
        var n = "attachEvent" in t;
        return i.prototype.create = function() {
            this.element.style.position = "absolute", n && this.element.setAttribute("unselectable", "on"), this.x = 0, this.shift = 0
        }, i.prototype.destroy = function() {
            this.element.style.position = "";
            var t = this.parent.originSide;
            this.element.style[t] = ""
        }, i.prototype.getSize = function() {
            this.size = e(this.element)
        }, i.prototype.setPosition = function(t) {
            this.x = t, this.setDefaultTarget(), this.renderPosition(t)
        }, i.prototype.setDefaultTarget = function() {
            var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
        }, i.prototype.renderPosition = function(t) {
            var e = this.parent.originSide;
            this.element.style[e] = this.parent.getPositionValue(t)
        }, i.prototype.wrapShift = function(t) {
            this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
        }, i.prototype.remove = function() {
            this.element.parentNode.removeChild(this.element)
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/animate", ["get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.getStyleProperty, t.fizzyUIUtils))
    }(window, function(t, e, i) {
        for (var n, o = 0, r = "webkit moz ms o".split(" "), s = t.requestAnimationFrame, a = t.cancelAnimationFrame, l = 0; l < r.length && (!s || !a); l++) n = r[l], s = s || t[n + "RequestAnimationFrame"], a = a || t[n + "CancelAnimationFrame"] || t[n + "CancelRequestAnimationFrame"];
        s && a || (s = function(e) {
            var i = (new Date).getTime(),
                n = Math.max(0, 16 - (i - o)),
                r = t.setTimeout(function() {
                    e(i + n)
                }, n);
            return o = i + n, r
        }, a = function(e) {
            t.clearTimeout(e)
        });
        var h = {};
        h.startAnimation = function() {
            this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
        }, h.animate = function() {
            this.applyDragForce(), this.applySelectedAttraction();
            var t = this.x;
            if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
                var e = this;
                s(function() {
                    e.animate()
                })
            }
        };
        var c = e("transform"),
            p = !!e("perspective");
        return h.positionSlider = function() {
            var t = this.x;
            this.options.wrapAround && this.cells.length > 1 && (t = i.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && c ? -t : t;
            var e = this.getPositionValue(t);
            c ? this.slider.style[c] = p && this.isAnimating ? "translate3d(" + e + ",0,0)" : "translateX(" + e + ")" : this.slider.style[this.originSide] = e
        }, h.positionSliderAtSelected = function() {
            if (this.cells.length) {
                var t = this.cells[this.selectedIndex];
                this.x = -t.target, this.positionSlider()
            }
        }, h.getPositionValue = function(t) {
            return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
        }, h.settle = function(t) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, p && this.positionSlider(), this.dispatchEvent("settle"))
        }, h.shiftWrapCells = function(t) {
            var e = this.cursorPosition + t;
            this._shiftCells(this.beforeShiftCells, e, -1);
            var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        }, h._shiftCells = function(t, e, i) {
            for (var n = 0, o = t.length; o > n; n++) {
                var r = t[n],
                    s = e > 0 ? i : 0;
                r.wrapShift(s), e -= r.size.outerWidth
            }
        }, h._unshiftCells = function(t) {
            if (t && t.length)
                for (var e = 0, i = t.length; i > e; e++) t[e].wrapShift(0)
        }, h.integratePhysics = function() {
            this.velocity += this.accel, this.x += this.velocity, this.velocity *= this.getFrictionFactor(), this.accel = 0
        }, h.applyForce = function(t) {
            this.accel += t
        }, h.getFrictionFactor = function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        }, h.getRestingPosition = function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        }, h.applyDragForce = function() {
            if (this.isPointerDown) {
                var t = this.dragX - this.x,
                    e = t - this.velocity;
                this.applyForce(e)
            }
        }, h.applySelectedAttraction = function() {
            var t = this.cells.length;
            if (!this.isPointerDown && !this.isFreeScrolling && t) {
                var e = this.cells[this.selectedIndex],
                    i = this.options.wrapAround && t > 1 ? this.slideableWidth * Math.floor(this.selectedIndex / t) : 0,
                    n = -1 * (e.target + i) - this.x,
                    o = n * this.options.selectedAttraction;
                this.applyForce(o)
            }
        }, h
    }),
    function(t, e) {
        "use strict";
        if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["classie/classie", "eventEmitter/EventEmitter", "eventie/eventie", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./animate"], function(i, n, o, r, s, a, l) {
            return e(t, i, n, o, r, s, a, l)
        });
        else if ("object" == typeof exports) module.exports = e(t, require("desandro-classie"), require("wolfy87-eventemitter"), require("eventie"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./animate"));
        else {
            var i = t.Flickity;
            t.Flickity = e(t, t.classie, t.EventEmitter, t.eventie, t.getSize, t.fizzyUIUtils, i.Cell, i.animatePrototype)
        }
    }(window, function(t, e, i, n, o, r, s, a) {
        function l(t, e) {
            for (t = r.makeArray(t); t.length;) e.appendChild(t.shift())
        }

        function h(t, e) {
            var i = r.getQueryElement(t);
            return i ? (this.element = i, c && (this.$element = c(this.element)), this.options = r.extend({}, this.constructor.defaults), this.option(e), void this._create()) : void(u && u.error("Bad element for Flickity: " + (i || t)))
        }
        var c = t.jQuery,
            p = t.getComputedStyle,
            u = t.console,
            d = 0,
            f = {};
        h.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        }, h.createMethods = [], r.extend(h.prototype, i.prototype), h.prototype._create = function() {
            var e = this.guid = ++d;
            this.element.flickityGUID = e, f[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.accel = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", h.setUnselectable(this.viewport), this._createSlider(), (this.options.resize || this.options.watchCSS) && (n.bind(t, "resize", this), this.isResizeBound = !0);
            for (var i = 0, o = h.createMethods.length; o > i; i++) {
                var r = h.createMethods[i];
                this[r]()
            }
            this.options.watchCSS ? this.watchCSS() : this.activate()
        }, h.prototype.option = function(t) {
            r.extend(this.options, t)
        }, h.prototype.activate = function() {
            if (!this.isActive) {
                this.isActive = !0, e.add(this.element, "flickity-enabled"), this.options.rightToLeft && e.add(this.element, "flickity-rtl"), this.getSize();
                var t = this._filterFindCellElements(this.element.children);
                l(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, n.bind(this.element, "keydown", this)), this.emit("activate");
                var i, o = this.options.initialIndex;
                i = this.isInitActivated ? this.selectedIndex : void 0 !== o && this.cells[o] ? o : 0, this.select(i, !1, !0), this.isInitActivated = !0
            }
        }, h.prototype._createSlider = function() {
            var t = document.createElement("div");
            t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
        }, h.prototype._filterFindCellElements = function(t) {
            return r.filterFindElements(t, this.options.cellSelector)
        }, h.prototype.reloadCells = function() {
            this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
        }, h.prototype._makeCells = function(t) {
            for (var e = this._filterFindCellElements(t), i = [], n = 0, o = e.length; o > n; n++) {
                var r = e[n],
                    a = new s(r, this);
                i.push(a)
            }
            return i
        }, h.prototype.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }, h.prototype.positionCells = function() {
            this._sizeCells(this.cells), this._positionCells(0)
        }, h.prototype._positionCells = function(t) {
            t = t || 0, this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
            var e = 0;
            if (t > 0) {
                var i = this.cells[t - 1];
                e = i.x + i.size.outerWidth
            }
            for (var n, o = this.cells.length, r = t; o > r; r++) n = this.cells[r], n.setPosition(e), e += n.size.outerWidth, this.maxCellHeight = Math.max(n.size.outerHeight, this.maxCellHeight);
            this.slideableWidth = e, this._containCells()
        }, h.prototype._sizeCells = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                n.getSize()
            }
        }, h.prototype._init = h.prototype.reposition = function() {
            this.positionCells(), this.positionSliderAtSelected()
        }, h.prototype.getSize = function() {
            this.size = o(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
        };
        var v = {
            center: {
                left: .5,
                right: .5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        h.prototype.setCellAlign = function() {
            var t = v[this.options.cellAlign];
            this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
        }, h.prototype.setGallerySize = function() {
            this.options.setGallerySize && (this.viewport.style.height = this.maxCellHeight + "px")
        }, h.prototype._getWrapShiftCells = function() {
            if (this.options.wrapAround) {
                this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                var t = this.cursorPosition,
                    e = this.cells.length - 1;
                this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
            }
        }, h.prototype._getGapCells = function(t, e, i) {
            for (var n = []; t > 0;) {
                var o = this.cells[e];
                if (!o) break;
                n.push(o), e += i, t -= o.size.outerWidth
            }
            return n
        }, h.prototype._containCells = function() {
            if (this.options.contain && !this.options.wrapAround && this.cells.length)
                for (var t = this.options.rightToLeft ? "marginRight" : "marginLeft", e = this.options.rightToLeft ? "marginLeft" : "marginRight", i = this.cells[0].size[t], n = this.getLastCell(), o = this.slideableWidth - n.size[e], r = o - this.size.innerWidth * (1 - this.cellAlign), s = o < this.size.innerWidth, a = 0, l = this.cells.length; l > a; a++) {
                    var h = this.cells[a];
                    h.setDefaultTarget(), s ? h.target = o * this.cellAlign : (h.target = Math.max(h.target, this.cursorPosition + i), h.target = Math.min(h.target, r))
                }
        }, h.prototype.dispatchEvent = function(t, e, i) {
            var n = [e].concat(i);
            if (this.emitEvent(t, n), c && this.$element)
                if (e) {
                    var o = c.Event(e);
                    o.type = t, this.$element.trigger(o, i)
                } else this.$element.trigger(t, i)
        }, h.prototype.select = function(t, e, i) {
            if (this.isActive) {
                t = parseInt(t, 10);
                var n = this.cells.length;
                this.options.wrapAround && n > 1 && (0 > t ? this.x -= this.slideableWidth : t >= n && (this.x += this.slideableWidth)), (this.options.wrapAround || e) && (t = r.modulo(t, n)), this.cells[t] && (this.selectedIndex = t, this.setSelectedCell(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.dispatchEvent("cellSelect"))
            }
        }, h.prototype.previous = function(t) {
            this.select(this.selectedIndex - 1, t)
        }, h.prototype.next = function(t) {
            this.select(this.selectedIndex + 1, t)
        }, h.prototype.setSelectedCell = function() {
            this._removeSelectedCellClass(), this.selectedCell = this.cells[this.selectedIndex], this.selectedElement = this.selectedCell.element, e.add(this.selectedElement, "is-selected")
        }, h.prototype._removeSelectedCellClass = function() {
            this.selectedCell && e.remove(this.selectedCell.element, "is-selected")
        }, h.prototype.getCell = function(t) {
            for (var e = 0, i = this.cells.length; i > e; e++) {
                var n = this.cells[e];
                if (n.element == t) return n
            }
        }, h.prototype.getCells = function(t) {
            t = r.makeArray(t);
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                    s = this.getCell(o);
                s && e.push(s)
            }
            return e
        }, h.prototype.getCellElements = function() {
            for (var t = [], e = 0, i = this.cells.length; i > e; e++) t.push(this.cells[e].element);
            return t
        }, h.prototype.getParentCell = function(t) {
            var e = this.getCell(t);
            return e ? e : (t = r.getParent(t, ".flickity-slider > *"), this.getCell(t))
        }, h.prototype.getAdjacentCellElements = function(t, e) {
            if (!t) return [this.selectedElement];
            e = void 0 === e ? this.selectedIndex : e;
            var i = this.cells.length;
            if (1 + 2 * t >= i) return this.getCellElements();
            for (var n = [], o = e - t; e + t >= o; o++) {
                var s = this.options.wrapAround ? r.modulo(o, i) : o,
                    a = this.cells[s];
                a && n.push(a.element)
            }
            return n
        }, h.prototype.uiChange = function() {
            this.emit("uiChange")
        }, h.prototype.childUIPointerDown = function(t) {
            this.emitEvent("childUIPointerDown", [t])
        }, h.prototype.onresize = function() {
            this.watchCSS(), this.resize()
        }, r.debounceMethod(h, "onresize", 150), h.prototype.resize = function() {
            this.isActive && (this.getSize(), this.options.wrapAround && (this.x = r.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.positionSliderAtSelected())
        };
        var y = h.supportsConditionalCSS = function() {
            var t;
            return function() {
                if (void 0 !== t) return t;
                if (!p) return void(t = !1);
                var e = document.createElement("style"),
                    i = document.createTextNode('body:after { content: "foo"; display: none; }');
                e.appendChild(i), document.head.appendChild(e);
                var n = p(document.body, ":after").content;
                return t = -1 != n.indexOf("foo"), document.head.removeChild(e), t
            }
        }();
        h.prototype.watchCSS = function() {
            var t = this.options.watchCSS;
            if (t) {
                var e = y();
                if (!e) {
                    var i = "fallbackOn" == t ? "activate" : "deactivate";
                    return void this[i]()
                }
                var n = p(this.element, ":after").content; - 1 != n.indexOf("flickity") ? this.activate() : this.deactivate()
            }
        }, h.prototype.onkeydown = function(t) {
            if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
                if (37 == t.keyCode) {
                    var e = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(), this[e]()
                } else if (39 == t.keyCode) {
                var i = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(), this[i]()
            }
        }, h.prototype.deactivate = function() {
            if (this.isActive) {
                e.remove(this.element, "flickity-enabled"), e.remove(this.element, "flickity-rtl");
                for (var t = 0, i = this.cells.length; i > t; t++) {
                    var o = this.cells[t];
                    o.destroy()
                }
                this._removeSelectedCellClass(), this.element.removeChild(this.viewport), l(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), n.unbind(this.element, "keydown", this)), this.isActive = !1, this.emit("deactivate")
            }
        }, h.prototype.destroy = function() {
            this.deactivate(), this.isResizeBound && n.unbind(t, "resize", this), this.emit("destroy"), c && this.$element && c.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
        }, r.extend(h.prototype, a);
        var m = "attachEvent" in t;
        return h.setUnselectable = function(t) {
            m && t.setAttribute("unselectable", "on")
        }, h.data = function(t) {
            t = r.getQueryElement(t);
            var e = t && t.flickityGUID;
            return e && f[e]
        }, r.htmlInit(h, "flickity"), c && c.bridget && c.bridget("flickity", h), h.Cell = s, h
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("unipointer/unipointer", ["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.Unipointer = e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        function n() {}

        function o() {}
        o.prototype = new e, o.prototype.bindStartEvent = function(t) {
            this._bindStartEvent(t, !0)
        }, o.prototype.unbindStartEvent = function(t) {
            this._bindStartEvent(t, !1)
        }, o.prototype._bindStartEvent = function(e, n) {
            n = void 0 === n || !!n;
            var o = n ? "bind" : "unbind";
            t.navigator.pointerEnabled ? i[o](e, "pointerdown", this) : t.navigator.msPointerEnabled ? i[o](e, "MSPointerDown", this) : (i[o](e, "mousedown", this), i[o](e, "touchstart", this))
        }, o.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, o.prototype.getTouch = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                if (n.identifier == this.pointerIdentifier) return n
            }
        }, o.prototype.onmousedown = function(t) {
            var e = t.button;
            e && 0 !== e && 1 !== e || this._pointerDown(t, t)
        }, o.prototype.ontouchstart = function(t) {
            this._pointerDown(t, t.changedTouches[0])
        }, o.prototype.onMSPointerDown = o.prototype.onpointerdown = function(t) {
            this._pointerDown(t, t)
        }, o.prototype._pointerDown = function(t, e) {
            this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
        }, o.prototype.pointerDown = function(t, e) {
            this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
        };
        var r = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"],
            MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
        };
        return o.prototype._bindPostStartEvents = function(e) {
            if (e) {
                for (var n = r[e.type], o = e.preventDefault ? t : document, s = 0, a = n.length; a > s; s++) {
                    var l = n[s];
                    i.bind(o, l, this)
                }
                this._boundPointerEvents = {
                    events: n,
                    node: o
                }
            }
        }, o.prototype._unbindPostStartEvents = function() {
            var t = this._boundPointerEvents;
            if (t && t.events) {
                for (var e = 0, n = t.events.length; n > e; e++) {
                    var o = t.events[e];
                    i.unbind(t.node, o, this)
                }
                delete this._boundPointerEvents
            }
        }, o.prototype.onmousemove = function(t) {
            this._pointerMove(t, t)
        }, o.prototype.onMSPointerMove = o.prototype.onpointermove = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
        }, o.prototype.ontouchmove = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerMove(t, e)
        }, o.prototype._pointerMove = function(t, e) {
            this.pointerMove(t, e)
        }, o.prototype.pointerMove = function(t, e) {
            this.emitEvent("pointerMove", [t, e])
        }, o.prototype.onmouseup = function(t) {
            this._pointerUp(t, t)
        }, o.prototype.onMSPointerUp = o.prototype.onpointerup = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
        }, o.prototype.ontouchend = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerUp(t, e)
        }, o.prototype._pointerUp = function(t, e) {
            this._pointerDone(), this.pointerUp(t, e)
        }, o.prototype.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e])
        }, o.prototype._pointerDone = function() {
            this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
        }, o.prototype.pointerDone = n, o.prototype.onMSPointerCancel = o.prototype.onpointercancel = function(t) {
            t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
        }, o.prototype.ontouchcancel = function(t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerCancel(t, e)
        }, o.prototype._pointerCancel = function(t, e) {
            this._pointerDone(), this.pointerCancel(t, e)
        }, o.prototype.pointerCancel = function(t, e) {
            this.emitEvent("pointerCancel", [t, e])
        }, o.getPointerPoint = function(t) {
            return {
                x: void 0 !== t.pageX ? t.pageX : t.clientX,
                y: void 0 !== t.pageY ? t.pageY : t.clientY
            }
        }, o
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("unidragger/unidragger", ["eventie/eventie", "unipointer/unipointer"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("unipointer")) : t.Unidragger = e(t, t.eventie, t.Unipointer)
    }(window, function(t, e, i) {
        function n() {}

        function o(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }

        function r() {}

        function s() {
            return !1
        }
        r.prototype = new i, r.prototype.bindHandles = function() {
            this._bindHandles(!0)
        }, r.prototype.unbindHandles = function() {
            this._bindHandles(!1)
        };
        var a = t.navigator;
        r.prototype._bindHandles = function(t) {
            t = void 0 === t || !!t;
            var i;
            i = a.pointerEnabled ? function(e) {
                e.style.touchAction = t ? "none" : ""
            } : a.msPointerEnabled ? function(e) {
                e.style.msTouchAction = t ? "none" : ""
            } : function() {
                t && h(s)
            };
            for (var n = t ? "bind" : "unbind", o = 0, r = this.handles.length; r > o; o++) {
                var s = this.handles[o];
                this._bindStartEvent(s, t), i(s), e[n](s, "click", this)
            }
        };
        var l = "attachEvent" in document.documentElement,
            h = l ? function(t) {
                "IMG" == t.nodeName && (t.ondragstart = s);
                for (var e = t.querySelectorAll("img"), i = 0, n = e.length; n > i; i++) {
                    var o = e[i];
                    o.ondragstart = s
                }
            } : n;
        r.prototype.pointerDown = function(i, n) {
            if ("INPUT" == i.target.nodeName && "range" == i.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(i, n);
            var o = document.activeElement;
            o && o.blur && o.blur(), this._bindPostStartEvents(i), this.pointerDownScroll = r.getScrollPosition(), e.bind(t, "scroll", this), this.emitEvent("pointerDown", [i, n])
        }, r.prototype._dragPointerDown = function(t, e) {
            this.pointerDownPoint = i.getPointerPoint(e);
            var n = "touchstart" == t.type,
                r = t.target.nodeName;
            n || "SELECT" == r || o(t)
        }, r.prototype.pointerMove = function(t, e) {
            var i = this._dragPointerMove(t, e);
            this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
        }, r.prototype._dragPointerMove = function(t, e) {
            var n = i.getPointerPoint(e),
                o = {
                    x: n.x - this.pointerDownPoint.x,
                    y: n.y - this.pointerDownPoint.y
                };
            return !this.isDragging && this.hasDragStarted(o) && this._dragStart(t, e), o
        }, r.prototype.hasDragStarted = function(t) {
            return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
        }, r.prototype.pointerUp = function(t, e) {
            this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
        }, r.prototype._dragPointerUp = function(t, e) {
            this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
        }, r.prototype.pointerDone = function() {
            e.unbind(t, "scroll", this)
        }, r.prototype._dragStart = function(t, e) {
            this.isDragging = !0, this.dragStartPoint = r.getPointerPoint(e), this.isPreventingClicks = !0, this.dragStart(t, e)
        }, r.prototype.dragStart = function(t, e) {
            this.emitEvent("dragStart", [t, e])
        }, r.prototype._dragMove = function(t, e, i) {
            this.isDragging && this.dragMove(t, e, i)
        }, r.prototype.dragMove = function(t, e, i) {
            o(t), this.emitEvent("dragMove", [t, e, i])
        }, r.prototype._dragEnd = function(t, e) {
            this.isDragging = !1;
            var i = this;
            setTimeout(function() {
                delete i.isPreventingClicks
            }), this.dragEnd(t, e)
        }, r.prototype.dragEnd = function(t, e) {
            this.emitEvent("dragEnd", [t, e])
        }, r.prototype.pointerDone = function() {
            e.unbind(t, "scroll", this), delete this.pointerDownScroll
        }, r.prototype.onclick = function(t) {
            this.isPreventingClicks && o(t)
        }, r.prototype._staticClick = function(t, e) {
            if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
                var i = t.target.nodeName;
                if (("INPUT" == i || "TEXTAREA" == i) && t.target.focus(), this.staticClick(t, e), "mouseup" != t.type) {
                    this.isIgnoringMouseUp = !0;
                    var n = this;
                    setTimeout(function() {
                        delete n.isIgnoringMouseUp
                    }, 400)
                }
            }
        }, r.prototype.staticClick = function(t, e) {
            this.emitEvent("staticClick", [t, e])
        }, r.prototype.onscroll = function() {
            var t = r.getScrollPosition(),
                e = this.pointerDownScroll.x - t.x,
                i = this.pointerDownScroll.y - t.y;
            (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
        }, r.getPointerPoint = function(t) {
            return {
                x: void 0 !== t.pageX ? t.pageX : t.clientX,
                y: void 0 !== t.pageY ? t.pageY : t.clientY
            }
        };
        var c = void 0 !== t.pageYOffset;
        return r.getScrollPosition = function() {
            return {
                x: c ? t.pageXOffset : document.body.scrollLeft,
                y: c ? t.pageYOffset : document.body.scrollTop
            }
        }, r.getPointerPoint = i.getPointerPoint, r
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/drag", ["classie/classie", "eventie/eventie", "./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, o, r, s) {
            return e(t, i, n, o, r, s)
        }) : "object" == typeof exports ? module.exports = e(t, require("desandro-classie"), require("eventie"), require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.classie, t.eventie, t.Flickity, t.Unidragger, t.fizzyUIUtils)
    }(window, function(t, e, i, n, o, r) {
        function s(t) {
            t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }
        r.extend(n.defaults, {
            draggable: !0
        }), n.createMethods.push("_createDrag"), r.extend(n.prototype, o.prototype), n.prototype._createDrag = function() {
            this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag)
        }, n.prototype.bindDrag = function() {
            this.options.draggable && !this.isDragBound && (e.add(this.element, "is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
        }, n.prototype.unbindDrag = function() {
            this.isDragBound && (e.remove(this.element, "is-draggable"), this.unbindHandles(), delete this.isDragBound)
        }, n.prototype._uiChangeDrag = function() {
            delete this.isFreeScrolling
        }, n.prototype._childUIPointerDownDrag = function(t) {
            s(t), this.pointerDownFocus(t)
        }, n.prototype.pointerDown = function(n, r) {
            if ("INPUT" == n.target.nodeName && "range" == n.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(n, r);
            var s = document.activeElement;
            s && s.blur && s != this.element && s != document.body && s.blur(), this.pointerDownFocus(n), this.dragX = this.x, e.add(this.viewport, "is-pointer-down"), this._bindPostStartEvents(n), this.pointerDownScroll = o.getScrollPosition(), i.bind(t, "scroll", this), this.dispatchEvent("pointerDown", n, [r])
        };
        var a = {
                touchstart: !0,
                MSPointerDown: !0
            },
            l = {
                INPUT: !0,
                SELECT: !0
            };
        return n.prototype.pointerDownFocus = function(e) {
            if (this.options.accessibility && !a[e.type] && !l[e.target.nodeName]) {
                var i = t.pageYOffset;
                this.element.focus(), t.pageYOffset != i && t.scrollTo(t.pageXOffset, i)
            }
        }, n.prototype.hasDragStarted = function(t) {
            return Math.abs(t.x) > 3
        }, n.prototype.pointerUp = function(t, i) {
            e.remove(this.viewport, "is-pointer-down"), this.dispatchEvent("pointerUp", t, [i]), this._dragPointerUp(t, i)
        }, n.prototype.pointerDone = function() {
            i.unbind(t, "scroll", this), delete this.pointerDownScroll
        }, n.prototype.dragStart = function(t, e) {
            this.dragStartPosition = this.x, this.startAnimation(), this.dispatchEvent("dragStart", t, [e])
        }, n.prototype.dragMove = function(t, e, i) {
            s(t), this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1,
                o = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.cells.length) {
                var r = Math.max(-this.cells[0].target, this.dragStartPosition);
                o = o > r ? .5 * (o + r) : o;
                var a = Math.min(-this.getLastCell().target, this.dragStartPosition);
                o = a > o ? .5 * (o + a) : o
            }
            this.dragX = o, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
        }, n.prototype.dragEnd = function(t, e) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.cells[0].target && -n < this.getLastCell().target
            } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX, this.select(i), this.dispatchEvent("dragEnd", t, [e])
        }, n.prototype.dragEndRestingSelect = function() {
            var t = this.getRestingPosition(),
                e = Math.abs(this.getCellDistance(-t, this.selectedIndex)),
                i = this._getClosestResting(t, e, 1),
                n = this._getClosestResting(t, e, -1),
                o = i.distance < n.distance ? i.index : n.index;
            return o
        }, n.prototype._getClosestResting = function(t, e, i) {
            for (var n = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(t, e) {
                    return e >= t
                } : function(t, e) {
                    return e > t
                }; r(e, o) && (n += i, o = e, e = this.getCellDistance(-t, n), null !== e);) e = Math.abs(e);
            return {
                distance: o,
                index: n - i
            }
        }, n.prototype.getCellDistance = function(t, e) {
            var i = this.cells.length,
                n = this.options.wrapAround && i > 1,
                o = n ? r.modulo(e, i) : e,
                s = this.cells[o];
            if (!s) return null;
            var a = n ? this.slideableWidth * Math.floor(e / i) : 0;
            return t - (s.target + a)
        }, n.prototype.dragEndBoostSelect = function() {
            if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
            var t = this.getCellDistance(-this.dragX, this.selectedIndex),
                e = this.previousDragX - this.dragX;
            return t > 0 && e > 0 ? 1 : 0 > t && 0 > e ? -1 : 0
        }, n.prototype.staticClick = function(t, e) {
            var i = this.getParentCell(t.target),
                n = i && i.element,
                o = i && r.indexOf(this.cells, i);
            this.dispatchEvent("staticClick", t, [e, n, o])
        }, n
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
            return e(t, i)
        }) : "object" == typeof exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
    }(window, function(t, e) {
        function i(t) {
            this.bindTap(t)
        }
        i.prototype = new e, i.prototype.bindTap = function(t) {
            t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
        }, i.prototype.unbindTap = function() {
            this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
        };
        var n = void 0 !== t.pageYOffset;
        return i.prototype.pointerUp = function(i, o) {
            if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
                var r = e.getPointerPoint(o),
                    s = this.tapElement.getBoundingClientRect(),
                    a = n ? t.pageXOffset : document.body.scrollLeft,
                    l = n ? t.pageYOffset : document.body.scrollTop,
                    h = r.x >= s.left + a && r.x <= s.right + a && r.y >= s.top + l && r.y <= s.bottom + l;
                h && this.emitEvent("tap", [i, o]), "mouseup" != i.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                    delete this.isIgnoringMouseUp
                }.bind(this), 320))
            }
        }, i.prototype.destroy = function() {
            this.pointerDone(), this.unbindTap()
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["eventie/eventie", "./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, o, r) {
            return e(t, i, n, o, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.eventie, t.Flickity, t.TapListener, t.fizzyUIUtils)
    }(window, function(t, e, i, n, o) {
        function r(t, e) {
            this.direction = t, this.parent = e, this._create()
        }

        function s(t) {
            return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
        }
        var a = "http://www.w3.org/2000/svg",
            l = function() {
                function t() {
                    if (void 0 !== e) return e;
                    var t = document.createElement("div");
                    return t.innerHTML = "<svg/>", e = (t.firstChild && t.firstChild.namespaceURI) == a
                }
                var e;
                return t
            }();
        return r.prototype = new n, r.prototype._create = function() {
            this.isEnabled = !0, this.isPrevious = -1 == this.direction;
            var t = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == t;
            var e = this.element = document.createElement("button");
            if (e.className = "flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "previous" : "next"), i.setUnselectable(e), l()) {
                var n = this.createSVG();
                e.appendChild(n)
            } else this.setArrowText(), e.className += " no-svg";
            var o = this;
            this.onCellSelect = function() {
                o.update()
            }, this.parent.on("cellSelect", this.onCellSelect), this.on("tap", this.onTap), this.on("pointerDown", function(t, e) {
                o.parent.childUIPointerDown(e)
            })
        }, r.prototype.activate = function() {
            this.bindTap(this.element), e.bind(this.element, "click", this), this.parent.element.appendChild(this.element)
        }, r.prototype.deactivate = function() {
            this.parent.element.removeChild(this.element), n.prototype.destroy.call(this), e.unbind(this.element, "click", this)
        }, r.prototype.createSVG = function() {
            var t = document.createElementNS(a, "svg");
            t.setAttribute("viewBox", "0 0 100 100");
            var e = document.createElementNS(a, "path"),
                i = s(this.parent.options.arrowShape);
            return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
        }, r.prototype.setArrowText = function() {
            var t = this.parent.options,
                e = this.isLeft ? t.leftArrowText : t.rightArrowText;
            o.setText(this.element, e)
        }, r.prototype.onTap = function() {
            if (this.isEnabled) {
                this.parent.uiChange();
                var t = this.isPrevious ? "previous" : "next";
                this.parent[t]()
            }
        }, r.prototype.handleEvent = o.handleEvent, r.prototype.onclick = function() {
            var t = document.activeElement;
            t && t == this.element && this.onTap()
        }, r.prototype.enable = function() {
            this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
        }, r.prototype.disable = function() {
            this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
        }, r.prototype.update = function() {
            var t = this.parent.cells;
            if (this.parent.options.wrapAround && t.length > 1) return void this.enable();
            var e = t.length ? t.length - 1 : 0,
                i = this.isPrevious ? 0 : e,
                n = this.parent.selectedIndex == i ? "disable" : "enable";
            this[n]()
        }, r.prototype.destroy = function() {
            this.deactivate()
        }, o.extend(i.defaults, {
            prevNextButtons: !0,
            leftArrowText: "â€¹",
            rightArrowText: "â€º",
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
            }
        }), i.createMethods.push("_createPrevNextButtons"), i.prototype._createPrevNextButtons = function() {
            this.options.prevNextButtons && (this.prevButton = new r((-1), this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons))
        }, i.prototype.activatePrevNextButtons = function() {
            this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
        }, i.prototype.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
        }, i.PrevNextButton = r, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["eventie/eventie", "./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, o, r) {
            return e(t, i, n, o, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.eventie, t.Flickity, t.TapListener, t.fizzyUIUtils)
    }(window, function(t, e, i, n, o) {
        function r(t) {
            this.parent = t, this._create()
        }
        return r.prototype = new n, r.prototype._create = function() {
            this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", i.setUnselectable(this.holder), this.dots = [];
            var t = this;
            this.onCellSelect = function() {
                t.updateSelected()
            }, this.parent.on("cellSelect", this.onCellSelect), this.on("tap", this.onTap), this.on("pointerDown", function(e, i) {
                t.parent.childUIPointerDown(i)
            })
        }, r.prototype.activate = function() {
            this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
        }, r.prototype.deactivate = function() {
            this.parent.element.removeChild(this.holder), n.prototype.destroy.call(this)
        }, r.prototype.setDots = function() {
            var t = this.parent.cells.length - this.dots.length;
            t > 0 ? this.addDots(t) : 0 > t && this.removeDots(-t)
        }, r.prototype.addDots = function(t) {
            for (var e = document.createDocumentFragment(), i = []; t;) {
                var n = document.createElement("li");
                n.className = "dot", e.appendChild(n), i.push(n), t--
            }
            this.holder.appendChild(e), this.dots = this.dots.concat(i)
        }, r.prototype.removeDots = function(t) {
            for (var e = this.dots.splice(this.dots.length - t, t), i = 0, n = e.length; n > i; i++) {
                var o = e[i];
                this.holder.removeChild(o)
            }
        }, r.prototype.updateSelected = function() {
            this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
        }, r.prototype.onTap = function(t) {
            var e = t.target;
            if ("LI" == e.nodeName) {
                this.parent.uiChange();
                var i = o.indexOf(this.dots, e);
                this.parent.select(i)
            }
        }, r.prototype.destroy = function() {
            this.deactivate()
        }, i.PageDots = r, o.extend(i.defaults, {
            pageDots: !0
        }), i.createMethods.push("_createPageDots"), i.prototype._createPageDots = function() {
            this.options.pageDots && (this.pageDots = new r(this), this.on("activate", this.activatePageDots), this.on("cellAddedRemoved", this.onCellAddedRemovedPageDots), this.on("deactivate", this.deactivatePageDots))
        }, i.prototype.activatePageDots = function() {
            this.pageDots.activate()
        }, i.prototype.onCellAddedRemovedPageDots = function() {
            this.pageDots.setDots()
        }, i.prototype.deactivatePageDots = function() {
            this.pageDots.deactivate()
        }, i.PageDots = r, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/player", ["eventEmitter/EventEmitter", "eventie/eventie", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n, o) {
            return e(t, i, n, o)
        }) : "object" == typeof exports ? module.exports = e(require("wolfy87-eventemitter"), require("eventie"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EventEmitter, t.eventie, t.fizzyUIUtils, t.Flickity)
    }(window, function(t, e, i, n) {
        function o(t) {
            if (this.parent = t, this.state = "stopped", s) {
                var e = this;
                this.onVisibilityChange = function() {
                    e.visibilityChange()
                }
            }
        }
        var r, s;
        return "hidden" in document ? (r = "hidden", s = "visibilitychange") : "webkitHidden" in document && (r = "webkitHidden", s = "webkitvisibilitychange"), o.prototype = new t, o.prototype.play = function() {
            "playing" != this.state && (this.state = "playing", s && document.addEventListener(s, this.onVisibilityChange, !1), this.tick())
        }, o.prototype.tick = function() {
            if ("playing" == this.state) {
                var t = this.parent.options.autoPlay;
                t = "number" == typeof t ? t : 3e3;
                var e = this;
                this.clear(), this.timeout = setTimeout(function() {
                    e.parent.next(!0), e.tick()
                }, t)
            }
        }, o.prototype.stop = function() {
            this.state = "stopped", this.clear(), s && document.removeEventListener(s, this.onVisibilityChange, !1)
        }, o.prototype.clear = function() {
            clearTimeout(this.timeout)
        }, o.prototype.pause = function() {
            "playing" == this.state && (this.state = "paused", this.clear())
        }, o.prototype.unpause = function() {
            "paused" == this.state && this.play()
        }, o.prototype.visibilityChange = function() {
            var t = document[r];
            this[t ? "pause" : "unpause"]()
        }, i.extend(n.defaults, {
            pauseAutoPlayOnHover: !0
        }), n.createMethods.push("_createPlayer"), n.prototype._createPlayer = function() {
            this.player = new o(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
        }, n.prototype.activatePlayer = function() {
            this.options.autoPlay && (this.player.play(), e.bind(this.element, "mouseenter", this), this.isMouseenterBound = !0)
        }, n.prototype.playPlayer = function() {
            this.player.play()
        }, n.prototype.stopPlayer = function() {
            this.player.stop()
        }, n.prototype.pausePlayer = function() {
            this.player.pause()
        }, n.prototype.unpausePlayer = function() {
            this.player.unpause()
        }, n.prototype.deactivatePlayer = function() {
            this.player.stop(), this.isMouseenterBound && (e.unbind(this.element, "mouseenter", this), delete this.isMouseenterBound)
        }, n.prototype.onmouseenter = function() {
            this.options.pauseAutoPlayOnHover && (this.player.pause(), e.bind(this.element, "mouseleave", this))
        }, n.prototype.onmouseleave = function() {
            this.player.unpause(), e.unbind(this.element, "mouseleave", this)
        }, n.Player = o, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
    }(window, function(t, e, i) {
        function n(t) {
            for (var e = document.createDocumentFragment(), i = 0, n = t.length; n > i; i++) {
                var o = t[i];
                e.appendChild(o.element)
            }
            return e
        }
        return e.prototype.insert = function(t, e) {
            var i = this._makeCells(t);
            if (i && i.length) {
                var o = this.cells.length;
                e = void 0 === e ? o : e;
                var r = n(i),
                    s = e == o;
                if (s) this.slider.appendChild(r);
                else {
                    var a = this.cells[e].element;
                    this.slider.insertBefore(r, a)
                }
                if (0 === e) this.cells = i.concat(this.cells);
                else if (s) this.cells = this.cells.concat(i);
                else {
                    var l = this.cells.splice(e, o - e);
                    this.cells = this.cells.concat(i).concat(l)
                }
                this._sizeCells(i);
                var h = e > this.selectedIndex ? 0 : i.length;
                this._cellAddedRemoved(e, h)
            }
        }, e.prototype.append = function(t) {
            this.insert(t, this.cells.length)
        }, e.prototype.prepend = function(t) {
            this.insert(t, 0)
        }, e.prototype.remove = function(t) {
            var e, n, o, r = this.getCells(t),
                s = 0;
            for (e = 0, n = r.length; n > e; e++) {
                o = r[e];
                var a = i.indexOf(this.cells, o) < this.selectedIndex;
                s -= a ? 1 : 0
            }
            for (e = 0, n = r.length; n > e; e++) o = r[e], o.remove(), i.removeFrom(this.cells, o);
            r.length && this._cellAddedRemoved(0, s)
        }, e.prototype._cellAddedRemoved = function(t, e) {
            e = e || 0, this.selectedIndex += e, this.selectedIndex = Math.max(0, Math.min(this.cells.length - 1, this.selectedIndex)), this.emitEvent("cellAddedRemoved", [t, e]), this.cellChange(t, !0)
        }, e.prototype.cellSizeChange = function(t) {
            var e = this.getCell(t);
            if (e) {
                e.getSize();
                var n = i.indexOf(this.cells, e);
                this.cellChange(n)
            }
        }, e.prototype.cellChange = function(t, e) {
            var i = this.slideableWidth;
            if (this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize(), this.options.freeScroll) {
                var n = i - this.slideableWidth;
                this.x += n * this.cellAlign, this.positionSlider()
            } else e && this.positionSliderAtSelected(), this.select(this.selectedIndex)
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["classie/classie", "eventie/eventie", "./flickity", "fizzy-ui-utils/utils"], function(i, n, o, r) {
            return e(t, i, n, o, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("desandro-classie"), require("eventie"), require("./flickity"), require("fizzy-ui-utils")) : e(t, t.classie, t.eventie, t.Flickity, t.fizzyUIUtils)
    }(window, function(t, e, i, n, o) {
        "use strict";

        function r(t) {
            if ("IMG" == t.nodeName && t.getAttribute("data-flickity-lazyload")) return [t];
            var e = t.querySelectorAll("img[data-flickity-lazyload]");
            return o.makeArray(e)
        }

        function s(t, e) {
            this.img = t, this.flickity = e, this.load()
        }
        return n.createMethods.push("_createLazyload"), n.prototype._createLazyload = function() {
            this.on("cellSelect", this.lazyLoad)
        }, n.prototype.lazyLoad = function() {
            var t = this.options.lazyLoad;
            if (t) {
                for (var e = "number" == typeof t ? t : 0, i = this.getAdjacentCellElements(e), n = [], o = 0, a = i.length; a > o; o++) {
                    var l = i[o],
                        h = r(l);
                    n = n.concat(h)
                }
                for (o = 0, a = n.length; a > o; o++) {
                    var c = n[o];
                    new s(c, this)
                }
            }
        }, s.prototype.handleEvent = o.handleEvent, s.prototype.load = function() {
            i.bind(this.img, "load", this), i.bind(this.img, "error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
        }, s.prototype.onload = function(t) {
            this.complete(t, "flickity-lazyloaded")
        }, s.prototype.onerror = function(t) {
            this.complete(t, "flickity-lazyerror")
        }, s.prototype.complete = function(t, n) {
            i.unbind(this.img, "load", this), i.unbind(this.img, "error", this);
            var o = this.flickity.getParentCell(this.img),
                r = o && o.element;
            this.flickity.cellSizeChange(r), e.add(this.img, n), this.flickity.dispatchEvent("lazyLoad", t, r)
        }, n.LazyLoader = s, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
    }(window, function(t) {
        return t
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["classie/classie", "flickity/js/index", "fizzy-ui-utils/utils"], function(i, n, o) {
            return e(t, i, n, o)
        }) : "object" == typeof exports ? module.exports = e(t, require("desandro-classie"), require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.classie, t.Flickity, t.fizzyUIUtils)
    }(window, function(t, e, i, n) {
        return i.createMethods.push("_createAsNavFor"), i.prototype._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
            var t = this.options.asNavFor;
            if (t) {
                var e = this;
                setTimeout(function() {
                    e.setNavCompanion(t)
                })
            }
        }, i.prototype.setNavCompanion = function(t) {
            t = n.getQueryElement(t);
            var e = i.data(t);
            if (e && e != this) {
                this.navCompanion = e;
                var o = this;
                this.onNavCompanionSelect = function() {
                    o.navCompanionSelect()
                }, e.on("cellSelect", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect()
            }
        }, i.prototype.navCompanionSelect = function() {
            if (this.navCompanion) {
                var t = this.navCompanion.selectedIndex;
                this.select(t), this.removeNavSelectedElement(), this.selectedIndex == t && (this.navSelectedElement = this.cells[t].element, e.add(this.navSelectedElement, "is-nav-selected"))
            }
        }, i.prototype.activateAsNavFor = function() {
            this.navCompanionSelect()
        }, i.prototype.removeNavSelectedElement = function() {
            this.navSelectedElement && (e.remove(this.navSelectedElement, "is-nav-selected"), delete this.navSelectedElement)
        }, i.prototype.onNavStaticClick = function(t, e, i, n) {
            "number" == typeof n && this.navCompanion.select(n)
        }, i.prototype.deactivateAsNavFor = function() {
            this.removeNavSelectedElement()
        }, i.prototype.destroyAsNavFor = function() {
            this.navCompanion && (this.navCompanion.off("cellSelect", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        function n(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function o(t) {
            return "[object Array]" == p.call(t)
        }

        function r(t) {
            var e = [];
            if (o(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function s(t, e, i) {
            if (!(this instanceof s)) return new s(t, e, i);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), h && (this.jqDeferred = new h.Deferred);
            var o = this;
            setTimeout(function() {
                o.check()
            })
        }

        function a(t) {
            this.img = t
        }

        function l(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }
        var h = t.jQuery,
            c = t.console,
            p = Object.prototype.toString;
        s.prototype = new e, s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var t = 0; t < this.elements.length; t++) {
                var e = this.elements[t];
                this.addElementImages(e)
            }
        }, s.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && u[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var o = i[n];
                    this.addImage(o)
                }
                if ("string" == typeof this.options.background) {
                    var r = t.querySelectorAll(this.options.background);
                    for (n = 0; n < r.length; n++) {
                        var s = r[n];
                        this.addElementBackgroundImages(s)
                    }
                }
            }
        };
        var u = {
            1: !0,
            9: !0,
            11: !0
        };
        s.prototype.addElementBackgroundImages = function(t) {
            for (var e = d(t), i = /url\(['"]*([^'"\)]+)['"]*\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[1];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
        };
        var d = t.getComputedStyle || function(t) {
            return t.currentStyle
        };
        return s.prototype.addImage = function(t) {
            var e = new a(t);
            this.images.push(e)
        }, s.prototype.addBackground = function(t, e) {
            var i = new l(t, e);
            this.images.push(i)
        }, s.prototype.check = function() {
            function t(t, i, n) {
                setTimeout(function() {
                    e.progress(t, i, n)
                })
            }
            var e = this;
            if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
            for (var i = 0; i < this.images.length; i++) {
                var n = this.images[i];
                n.once("progress", t), n.check()
            }
        }, s.prototype.progress = function(t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emit("progress", this, t, e), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + i, t, e)
        }, s.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emit(t, this), this.emit("always", this), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, a.prototype = new e, a.prototype.check = function() {
            var t = this.getIsImageComplete();
            return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, i.bind(this.proxyImage, "load", this), i.bind(this.proxyImage, "error", this), i.bind(this.img, "load", this), i.bind(this.img, "error", this), void(this.proxyImage.src = this.img.src))
        }, a.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, a.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("progress", this, this.img, e)
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, a.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, a.prototype.unbindEvents = function() {
            i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this), i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
        }, l.prototype = new a, l.prototype.check = function() {
            i.bind(this.img, "load", this), i.bind(this.img, "error", this), this.img.src = this.url;
            var t = this.getIsImageComplete();
            t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, l.prototype.unbindEvents = function() {
            i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
        }, l.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("progress", this, this.element, e)
        }, s.makeJQueryPlugin = function(e) {
            e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
                var i = new s(this, t, e);
                return i.jqDeferred.promise(h(this))
            })
        }, s.makeJQueryPlugin(), s
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
    }(window, function(t, e, i) {
        "use strict";
        return e.createMethods.push("_createImagesLoaded"), e.prototype._createImagesLoaded = function() {
            this.on("activate", this.imagesLoaded)
        }, e.prototype.imagesLoaded = function() {
            function t(t, i) {
                var n = e.getParentCell(i.img);
                e.cellSizeChange(n && n.element), e.options.freeScroll || e.positionSliderAtSelected()
            }
            if (this.options.imagesLoaded) {
                var e = this;
                i(this.slider).on("progress", t)
            }
        }, e
    });
var elem = document.querySelector(".courses-carousel"),
    flkty = new Flickity(elem, {
        contain: !0,
        wrapAround: !0,
        prevNextButtons: !1,
        pageDots: !1
    }),
    elem = document.querySelector(".reviews-carousel"),
    flkty = new Flickity(elem, {
        contain: !0,
        wrapAround: !0,
        prevNextButtons: !1,
        pageDots: !1
    });
! function() {
    function t() {}

    function e(t) {
        return r.retinaImageSuffix + t
    }

    function i(t, i) {
        if (this.path = t || "", "undefined" != typeof i && null !== i) this.at_2x_path = i, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var n = document.createElement("a");
                n.href = this.path, n.pathname = n.pathname.replace(s, e), this.at_2x_path = n.href
            } else {
                var o = this.path.split("?");
                o[0] = o[0].replace(s, e), this.at_2x_path = o.join("?")
            }
            this.perform_check = !0
        }
    }

    function n(t) {
        this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var e = this;
        this.path.check_2x_variant(function(t) {
            t && e.swap()
        })
    }
    var o = "undefined" == typeof exports ? window : exports,
        r = {
            retinaImageSuffix: "@2x",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    o.Retina = t, t.configure = function(t) {
        null === t && (t = {});
        for (var e in t) t.hasOwnProperty(e) && (r[e] = t[e])
    }, t.init = function(t) {
        null === t && (t = o);
        var e = t.onload || function() {};
        t.onload = function() {
            var t, i, o = document.getElementsByClassName("2x"),
                r = [];
            for (t = 0; t < o.length; t += 1) i = o[t], i.getAttributeNode("data-no-retina") || r.push(new n(i));
            e()
        }
    }, t.isRetina = function() {
        var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return o.devicePixelRatio > 1 || !(!o.matchMedia || !o.matchMedia(t).matches)
    };
    var s = /\.\w+$/;
    o.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function() {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, i.prototype.check_2x_variant = function(t) {
        var e, n = this;
        return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : (e = new XMLHttpRequest, e.open("HEAD", this.at_2x_path), e.onreadystatechange = function() {
            if (4 !== e.readyState) return t(!1);
            if (e.status >= 200 && e.status <= 399) {
                if (r.check_mime_type) {
                    var o = e.getResponseHeader("Content-Type");
                    if (null === o || !o.match(/^image/i)) return t(!1)
                }
                return i.confirmed_paths.push(n.at_2x_path), t(!0)
            }
            return t(!1)
        }, e.send(), void 0) : t(!0)
    }, o.RetinaImage = n, n.prototype.swap = function(t) {
        function e() {
            i.el.complete ? (r.force_original_dimensions && (i.el.setAttribute("width", i.el.offsetWidth), i.el.setAttribute("height", i.el.offsetHeight)), i.el.setAttribute("src", t)) : setTimeout(e, 5)
        }
        "undefined" == typeof t && (t = this.path.at_2x_path);
        var i = this;
        e()
    }, t.isRetina() && t.init(o)
}();