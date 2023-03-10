var DragDropTouch;
!function (t) {
    "use strict";
    var e = function () {
        function t() {
            this._dropEffect = "move",
                this._effectAllowed = "all",
                this._data = {}
        }
        return Object.defineProperty(t.prototype, "dropEffect", {
            get: function () {
                return this._dropEffect
            },
            set: function (t) {
                this._dropEffect = t
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "effectAllowed", {
                get: function () {
                    return this._effectAllowed
                },
                set: function (t) {
                    this._effectAllowed = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "types", {
                get: function () {
                    return Object.keys(this._data)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.clearData = function (t) {
                null != t ? delete this._data[t] : this._data = null
            }
            ,
            t.prototype.getData = function (t) {
                return this._data[t] || ""
            }
            ,
            t.prototype.setData = function (t, e) {
                this._data[t] = e
            }
            ,
            t.prototype.setDragImage = function (t, e, n) {
                var o = i._instance;
                o._imgCustom = t,
                    o._imgOffset = {
                        x: e,
                        y: n
                    }
            }
            ,
            t
    }();
    t.DataTransfer = e;
    var i = function () {
        function t() {
            if (this._lastClick = 0,
                t._instance)
                throw "DragDropTouch instance already created.";
            if ("ontouchstart" in document) {
                var e = document
                    , i = this._touchstart.bind(this)
                    , n = this._touchmove.bind(this)
                    , o = this._touchend.bind(this);
                e.addEventListener("touchstart", i),
                    e.addEventListener("touchmove", n),
                    e.addEventListener("touchend", o),
                    e.addEventListener("touchcancel", o)
            }
        }
        return t.getInstance = function () {
            return t._instance
        }
            ,
            t.prototype._touchstart = function (e) {
                var i = this;
                if (this._shouldHandle(e)) {
                    if (Date.now() - this._lastClick < t._DBLCLICK && this._dispatchEvent(e, "dblclick", e.target))
                        return e.preventDefault(),
                            void this._reset();
                    this._reset();
                    var n = this._closestDraggable(e.target);
                    n && (this._dispatchEvent(e, "mousemove", e.target) || this._dispatchEvent(e, "mousedown", e.target) || (this._dragSource = n,
                        this._ptDown = this._getPoint(e),
                        this._lastTouch = e,
                        setTimeout(function () {
                            i._dragSource == n && null == i._img && i._dispatchEvent(e, "contextmenu", n) && i._reset()
                        }, t._CTXMENU)))
                }
            }
            ,
            t.prototype._touchmove = function (e) {
            
                if (this._shouldHandle(e)) {
                    var i = this._getTarget(e);
                    if (this._dispatchEvent(e, "mousemove", i))
                        return this._lastTouch = e,
                            void e.preventDefault();
                    !this._dragSource || this._img || this._scrolling || (this._getDeltaX(e) > t._THRESHOLD && (this._dispatchEvent(e, "dragstart", this._dragSource),
                        this._createImage(e),
                        this._dispatchEvent(e, "dragenter", i)),
                        this._getDeltaY(e) > t._THRESHOLD && (this._scrolling = !0)),
                        this._img && (this._lastTouch = e,
                            e.preventDefault(),
                            i != this._lastTarget && (this._dispatchEvent(this._lastTouch, "dragleave", this._lastTarget),
                                this._dispatchEvent(e, "dragenter", i),
                                this._lastTarget = i),
                            this._moveImage(e),
                            this._dispatchEvent(e, "dragover", i))
                }
            }
            ,
            t.prototype._touchend = function (t) {
                if (this._shouldHandle(t)) {
                    if (this._dispatchEvent(this._lastTouch, "mouseup", t.target))
                        return void t.preventDefault();
                    this._img || (this._dragSource = null,
                        this._dispatchEvent(this._lastTouch, "click", t.target),
                        this._lastClick = Date.now()),
                        this._destroyImage(),
                        this._dragSource && (t.type.indexOf("cancel") < 0 && this._dispatchEvent(this._lastTouch, "drop", this._lastTarget),
                            this._dispatchEvent(this._lastTouch, "dragend", this._dragSource),
                            this._reset())
                }
            }
            ,
            t.prototype._shouldHandle = function (t) {
            //console.log(t.touches.length);
                return t && !t.defaultPrevented && t.touches && t.touches.length < 2
            }
            ,
            t.prototype._reset = function () {
                this._destroyImage(),
                    this._dragSource = null,
                    this._lastTouch = null,
                    this._lastTarget = null,
                    this._ptDown = null,
                    this._scrolling = !1,
                    this._dataTransfer = new e
            }
            ,
            t.prototype._getPoint = function (t, e) {
                return t && t.touches && (t = t.touches[0]),
                {
                    x: e ? t.pageX : t.clientX,
                    y: e ? t.pageY : t.clientY
                }
            }
            ,
            t.prototype._getDelta = function (t) {
                var e = this._getPoint(t);
                return Math.abs(e.x - this._ptDown.x) + Math.abs(e.y - this._ptDown.y)
            }
            ,
            t.prototype._getDeltaX = function (t) {
                var e = this._getPoint(t);
                return Math.abs(e.x - this._ptDown.x)
            }
            ,
            t.prototype._getDeltaY = function (t) {
                var e = this._getPoint(t);
                return Math.abs(e.y - this._ptDown.y)
            }
            ,
            t.prototype._getTarget = function (t) {
                for (var e = this._getPoint(t), i = document.elementFromPoint(e.x, e.y); i && "none" == getComputedStyle(i).pointerEvents;)
                    i = i.parentElement;
                return i
            }
            ,
            t.prototype._createImage = function (e) {
                this._img && this._destroyImage();
                var i = this._imgCustom || this._dragSource;
                if (this._img = i.cloneNode(!0),
                    this._copyStyle(i, this._img),
                    this._img.style.top = this._img.style.left = "-9999px",
                    !this._imgCustom) {
                    var n = i.getBoundingClientRect()
                        , o = this._getPoint(e);
                    this._imgOffset = {
                        x: o.x - n.left,
                        y: o.y - n.top
                    },
                        this._img.style.opacity = t._OPACITY.toString()
                }
                this._moveImage(e),
                    document.body.appendChild(this._img)
            }
            ,
            t.prototype._destroyImage = function () {
                this._img && this._img.parentElement && this._img.parentElement.removeChild(this._img),
                    this._img = null,
                    this._imgCustom = null
            }
            ,
            t.prototype._moveImage = function (t) {
                var e = this;
                this._img && requestAnimationFrame(function () {
                    if (e._img) {
                        var i = e._getPoint(t, !0)
                            , n = e._img.style;
                        n.position = "absolute",
                            n.pointerEvents = "none",
                            n.zIndex = "999999",
                            n.left = Math.round(i.x - e._imgOffset.x) + "px",
                            n.top = Math.round(i.y - e._imgOffset.y) + "px"
                    }
                })
            }
            ,
            t.prototype._copyProps = function (t, e, i) {
                for (var n = 0; n < i.length; n++) {
                    var o = i[n];
                    t[o] = e[o]
                }
            }
            ,
            t.prototype._copyStyle = function (e, i) {
                if (t._rmvAtts.forEach(function (t) {
                    i.removeAttribute(t)
                }),
                    e instanceof HTMLCanvasElement) {
                    var n = e
                        , o = i;
                    o.width = n.width,
                        o.height = n.height,
                        o.getContext("2d").drawImage(n, 0, 0)
                }
                for (var s = getComputedStyle(e), r = 0; r < s.length; r++) {
                    var a = s[r];
                    i.style[a] = s[a]
                }
                i.style.pointerEvents = "none";
                for (var r = 0; r < e.children.length; r++)
                    this._copyStyle(e.children[r], i.children[r])
            }
            ,
            t.prototype._dispatchEvent = function (e, i, n) {
                if (e && n) {
                    var o = document.createEvent("Event")
                        , s = e.touches ? e.touches[0] : e;
                    return o.initEvent(i, !0, !0),
                        o.button = 0,
                        o.which = o.buttons = 1,
                        this._copyProps(o, e, t._kbdProps),
                        this._copyProps(o, s, t._ptProps),
                        o.dataTransfer = this._dataTransfer,
                        n.dispatchEvent(o),
                        o.defaultPrevented
                }
                return !1
            }
            ,
            t.prototype._closestDraggable = function (t) {
                for (; t; t = t.parentElement)
                    if (t.hasAttribute("draggable") && t.draggable)
                        return t;
                return null
            }
            ,
            t._instance = new t,
            t._THRESHOLD = 10,
            t._OPACITY = .5,
            t._DBLCLICK = 500,
            t._CTXMENU = 900,
            t._rmvAtts = "id,class,style,draggable".split(","),
            t._kbdProps = "altKey,ctrlKey,metaKey,shiftKey".split(","),
            t._ptProps = "pageX,pageY,clientX,clientY,screenX,screenY".split(","),
            t
    }();
    t.DragDropTouch = i ;
    window.DragDropTouch=i;
}(DragDropTouch || (DragDropTouch = {}));
