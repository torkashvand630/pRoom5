//const { time } = require("console");

this.Fonts = function() {
    function t() {}
    var e, u, i, o, r, n, s, a, h, c;
    for (o = ["Open Sans", "Quando", "Handlee", "Julee", "Lemon", "Inconsolata", "Alegreya SC"],
    n = {},
    r = function(t, e) {
        null == n[t] && (n[t] = {
            loaded: !1,
            listeners: []
        })
    }
    ,
    i = function(t, e) {
        var u, i, o, r;
        for (n[t].loaded = !0,
        r = n[t].listeners,
        u = 0,
        i = r.length; i > u; u++)
            (o = r[u])()
    }
    ,
    c = function(t) {
        return WebFont.load({
            google: {
                families: [t]
            },
            fontloading: r,
            fontactive: i
        })
    }
    ,
    WebFont.load({
        google: {
            families: o
        },
        custom: {
            families: ["IDroo Math"]
        },
        fontloading: r,
        fontactive: i
    }),
    s = $("#fonts-list"),
    a = 0,
    h = o.length; h > a; a++)
        u = o[a],
        s.append($("<div>", {
            "class": "button",
            css: {
                fontFamily: u
            },
            text: u,
            data: {
                value: u
            }
        }));
    return t.afterLoaded = e = function(t, e) {
        var u;
        return n[t] || r(t),
        u = n[t],
        u.loaded ? e() : void u.listeners.push(e)
    }
    ,
    t.unlessLoaded = function(t, u) {
        var i;
        if (null != (i = n[t]) ? !i.loaded : !0)
            return e(t, u)
    }
    ,
    t
}(),
function() {
    function t(t) {
        "use strict";
        var u = {
            fill: 0
        }
          , i = function(t) {
            return t + 1 + (56 > t % 64 ? 56 : 120) - t % 64 + 8
        }
          , o = function(t, e) {
            for (var u = e >> 2; u < t.length; u++)
                t[u] = 0
        }
          , r = function(t, e) {
            t[e >> 2] |= 128 << 24 - (e % 4 << 3),
            t[((e >> 2) + 2 & -16) + 15] = e << 3
        }
          , n = function(t, e, u) {
            var i;
            for (i = 0; u > i; i = i + 4 | 0)
                e[i >> 2] = t.charCodeAt(i) << 24 | t.charCodeAt(i + 1) << 16 | t.charCodeAt(i + 2) << 8 | t.charCodeAt(i + 3)
        }
          , s = function(t, e, u) {
            var i, o = u % 4, r = u - o;
            for (i = 0; r > i; i = i + 4 | 0)
                e[i >> 2] = t[i] << 24 | t[i + 1] << 16 | t[i + 2] << 8 | t[i + 3];
            switch (o) {
            case 0:
                e[r >> 2] |= t[r + 3];
            case 3:
                e[r >> 2] |= t[r + 2] << 8;
            case 2:
                e[r >> 2] |= t[r + 1] << 16;
            case 1:
                e[r >> 2] |= t[r] << 24
            }
        }
          , a = function(t, e, u) {
            if ("string" == typeof t)
                return n(t, e, u);
            if (t instanceof Array || "undefined" != typeof global && "undefined" != typeof global.Buffer && t instanceof global.Buffer)
                return s(t, e, u);
            if (t instanceof ArrayBuffer)
                return s(new Uint8Array(t), e, u);
            if (t.buffer instanceof ArrayBuffer)
                return s(new Uint8Array(t.buffer), e, u);
            throw new Error("Unsupported data type.")
        }
          , h = function(t) {
            var e, u, i = "0123456789abcdef", o = [];
            for (e = 0; e < t.length; e++)
                u = t[e],
                o[e] = i.charAt(u >> 28 & 15) + i.charAt(u >> 24 & 15) + i.charAt(u >> 20 & 15) + i.charAt(u >> 16 & 15) + i.charAt(u >> 12 & 15) + i.charAt(u >> 8 & 15) + i.charAt(u >> 4 & 15) + i.charAt(u >> 0 & 15);
            return o.join("")
        }
          , c = function(t) {
            for (var e = 1; t > e; )
                e <<= 1;
            return e
        }
          , l = function(t) {
            u.sizeHint = t,
            u.heap = new ArrayBuffer(c(i(t) + 320)),
            u.core = e({
                Int32Array: Int32Array
            }, {}, u.heap)
        };
        l(t || 0);
        var d = function(t) {
            var e = new Int32Array(u.heap,t << 2,5);
            e[0] = 1732584193,
            e[1] = -271733879,
            e[2] = -1732584194,
            e[3] = 271733878,
            e[4] = -1009589776,
            u.core.hash(t)
        }
          , p = this.rawDigest = function(t) {
            var e = t.byteLength || t.length;
            e > u.sizeHint && l(e);
            var n = new Int32Array(u.heap,0,i(e) >> 2);
            return o(n, e),
            a(t, n, e),
            r(n, e),
            d(n.length),
            new Int32Array(u.heap,0,5)
        }
        ;
        this.digest = this.digestFromString = this.digestFromBuffer = this.digestFromArrayBuffer = function(t) {
            return h(p(t))
        }
    }
    function e(t, e, u) {
        "use asm";
        var i = new t.Int32Array(u);
        function o(t) {
            t = t | 0;
            var e = 0
              , u = 0
              , o = 0
              , r = 0
              , n = 0
              , s = 0
              , a = 0
              , h = 0
              , c = 0
              , l = 0
              , d = 0
              , p = 0
              , f = 0
              , C = 0;
            o = i[t + 0 << 2 >> 2] | 0;
            n = i[t + 1 << 2 >> 2] | 0;
            a = i[t + 2 << 2 >> 2] | 0;
            c = i[t + 3 << 2 >> 2] | 0;
            d = i[t + 4 << 2 >> 2] | 0;
            for (e = 0; (e | 0) < (t | 0); e = e + 16 | 0) {
                r = o;
                s = n;
                h = a;
                l = c;
                p = d;
                for (u = 0; (u | 0) < 16; u = u + 1 | 0) {
                    C = i[e + u << 2 >> 2] | 0;
                    f = ((o << 5 | o >>> 27) + (n & a | ~n & c) | 0) + ((C + d | 0) + 1518500249 | 0) | 0;
                    d = c;
                    c = a;
                    a = n << 30 | n >>> 2;
                    n = o;
                    o = f;
                    i[t + u << 2 >> 2] = C
                }
                for (u = t + 16 | 0; (u | 0) < (t + 20 | 0); u = u + 1 | 0) {
                    C = (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) << 1 | (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) >>> 31;
                    f = ((o << 5 | o >>> 27) + (n & a | ~n & c) | 0) + ((C + d | 0) + 1518500249 | 0) | 0;
                    d = c;
                    c = a;
                    a = n << 30 | n >>> 2;
                    n = o;
                    o = f;
                    i[u << 2 >> 2] = C
                }
                for (u = t + 20 | 0; (u | 0) < (t + 40 | 0); u = u + 1 | 0) {
                    C = (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) << 1 | (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) >>> 31;
                    f = ((o << 5 | o >>> 27) + (n ^ a ^ c) | 0) + ((C + d | 0) + 1859775393 | 0) | 0;
                    d = c;
                    c = a;
                    a = n << 30 | n >>> 2;
                    n = o;
                    o = f;
                    i[u << 2 >> 2] = C
                }
                for (u = t + 40 | 0; (u | 0) < (t + 60 | 0); u = u + 1 | 0) {
                    C = (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) << 1 | (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) >>> 31;
                    f = ((o << 5 | o >>> 27) + (n & a | n & c | a & c) | 0) + ((C + d | 0) - 1894007588 | 0) | 0;
                    d = c;
                    c = a;
                    a = n << 30 | n >>> 2;
                    n = o;
                    o = f;
                    i[u << 2 >> 2] = C
                }
                for (u = t + 60 | 0; (u | 0) < (t + 80 | 0); u = u + 1 | 0) {
                    C = (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) << 1 | (i[u - 3 << 2 >> 2] ^ i[u - 8 << 2 >> 2] ^ i[u - 14 << 2 >> 2] ^ i[u - 16 << 2 >> 2]) >>> 31;
                    f = ((o << 5 | o >>> 27) + (n ^ a ^ c) | 0) + ((C + d | 0) - 899497514 | 0) | 0;
                    d = c;
                    c = a;
                    a = n << 30 | n >>> 2;
                    n = o;
                    o = f;
                    i[u << 2 >> 2] = C
                }
                o = o + r | 0;
                n = n + s | 0;
                a = a + h | 0;
                c = c + l | 0;
                d = d + p | 0
            }
            i[0] = o;
            i[1] = n;
            i[2] = a;
            i[3] = c;
            i[4] = d
        }
        return {
            hash: o
        }
    }
    if ("undefined" != typeof module && (module.exports = t),
    "undefined" != typeof window && (window.Rusha = t),
    "undefined" != typeof FileReaderSync) {
        var u = new FileReaderSync
          , i = new t(4194304);
        self.onmessage = function(t) {
            var e, o = t.data.data;
            if (o instanceof Blob)
                try {
                    o = u.readAsBinaryString(o)
                } catch (r) {
                    return void self.postMessage({
                        id: t.data.id,
                        error: r.name
                    })
                }
            e = i.digest(o),
            self.postMessage({
                id: t.data.id,
                hash: e
            })
        }
    }
}(),
Array.prototype.filter || (Array.prototype.filter = function(t) {
    var e, u, i, o, r, n;
    for (r = this,
    n = [],
    u = i = 0,
    o = r.length; o > i; u = ++i)
        e = r[u],
        t(e, u, this) && n.push(e);
    return n
}
),
Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
    var u, i, o, r;
    for (null == e && (e = 0),
    u = i = o = 0 > e ? this.length + e : e,
    r = this.length; r >= i; u = i += 1)
        if (this[u] === t)
            return u;
    return -1
}
),
Array.prototype.remove = function(t, e) {
    var u;
    return u = this.slice((e || t) + 1 || this.length),
    this.length = 0 > t ? this.length + t : t,
    this.push.apply(this, u)
}
,
Array.prototype.removeItem = function(t) {
    var e;
    for (e = 0; (e = this.indexOf(t, e)) >= 0; )
        this.remove(e);
    return this
}
,
Array.prototype.removeItems = function(t) {
    var e, u, i;
    for (u = 0,
    i = t.length; i > u; u++)
        e = t[u],
        this.removeItem(e);
    return this
}
,
function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p;
    for (r = "native",
    n = Date.now || function() {
        return (new Date).getTime()
    }
    ,
    l = window.requestAnimationFrame,
    h = ["webkit", "moz", "o", "ms"],
    u = 0,
    o = h.length; o > u; u++)
        p = h[u],
        null == l && (l = window[p + "RequestAnimationFrame"]);
    return null == l && (r = "timer",
    i = 0,
    a = 0,
    s = d = null,
    l = function(t) {
        var u, o;
        return null != s ? (s[++a] = t,
        a) : (o = n(),
        u = Math.max(0, 16.66 - (o - i)),
        s = {},
        s[++a] = t,
        i = o + u,
        d = setTimeout(e, u),
        a)
    }
    ,
    t = function(t) {
        delete s[t]
    }
    ,
    e = function() {
        var t, e, u;
        u = s,
        s = null;
        for (e in u)
            (t = u[e])(i)
    }
    ),
    l(function(t) {
        var e, u;
        1e12 > t ? null != (null != (u = window.performance) ? u.now : void 0) ? (l.now = function() {
            return window.performance.now()
        }
        ,
        l.method = "native-highres") : (e = n() - t,
        l.now = function() {
            return n() - e
        }
        ,
        l.method = "native-highres-noperf") : l.now = n
    }),
    l.now = null != (null != (c = window.performance) ? c.now : void 0) ? function() {
        return window.performance.now()
    }
    : n,
    l.method = r,
    window.requestAnimationFrame = l
}();
var MyMath;
("undefined" != typeof window && null !== window ? window : module.exports).MyMath = MyMath = {
    POW10: [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10],
    limit: function(t, e, u) {
        return t > u ? t : u > e ? e : u
    },
    minmax: function(t, e) {
        return t > e ? [e, t] : [t, e]
    },
    round: function(t) {
        return Math.round(t)
    },
    round1: function(t) {
        return Math.round(10 * t) / 10
    },
    round2: function(t) {
        return Math.round(100 * t) / 100
    },
    roundN: function(t, e) {
        var u;
        return u = MyMath.POW10[e],
        Math.round(t * u) / u
    }
};
var AJson, MyMath, hasProp = {}.hasOwnProperty;
"undefined" != typeof MyMath && null !== MyMath || (MyMath = require("./mymath").MyMath),
("undefined" != typeof window && null !== window ? window : module.exports).AJson = AJson = function() {
    function t() {}
    var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m;
    return n = "",
    f = 0,
    F = {},
    g = 0,
    e = {},
    u = 0,
    C = function() {
        return n = "",
        f = 0,
        F = {},
        g = 0,
        e = {},
        u = 0
    }
    ,
    d = Object.prototype.toString,
    a = function(t) {
        return "[object Array]" === d.apply(t)
    }
    ,
    h = function(t) {
        return f += t,
        n.substr(f - t, t)
    }
    ,
    c = function() {
        return B(n[f++])
    }
    ,
    l = function(t) {
        var e, u, i, o;
        for (o = [],
        e = u = 1,
        i = t; i >= u; e = u += 1)
            o.push(B(n[f++]));
        return o
    }
    ,
    i = function(t) {
        return 12 === t ? t = 99 : 57 === t ? t = 100 : t += 35,
        String.fromCharCode(t)
    }
    ,
    o = function(t) {
        var e, u, o, r;
        for (r = [],
        u = 0,
        o = t.length; o > u; u++)
            e = t[u],
            r.push(i(e));
        return r.join("")
    }
    ,
    B = function(t) {
        var e;
        return e = t.charCodeAt(0),
        99 > e ? e - 35 : 99 === e ? 12 : 57
    }
    ,
    s = function(t) {
        var e, u, o, r;
        if (~~(e = t) === e) {
            if (e >= 0 && 9 >= e)
                return e.toString();
            e > 0 && (e -= 10),
            u = 0
        } else
            ~~(e *= 10) === e ? u = 6 : (e *= 10,
            u = 12);
        for (0 > e && (e = -e,
        u += 32),
        e = ~~(e + .5),
        o = 0,
        r = [i(63 & e)]; 0 < (e >>= 6); )
            o++,
            r.unshift(i(63 & e));
        return r.unshift(String.fromCharCode(o + 65 + u)),
        r.join("")
    }
    ,
    A = function(t) {
        var e, u, i, o, r, n, s;
        for (e = -65 + t.charCodeAt(0),
        (r = e > 31) && (e -= 32),
        o = 1,
        e > 11 ? o = 100 : e > 5 && (o = 10),
        e %= 6,
        s = 0,
        u = i = 0,
        n = e; n >= i; u = i += 1)
            s <<= 6,
            s += c();
        return r || 1 !== o || (s += 10),
        s /= o,
        r ? -s : s
    }
    ,
    r = function(t, e, u) {
        var i, r, n, s, a, h, c, l, d, p, f;
        for (i = [],
        h = 6 * u - e - 1,
        c = (1 << h) - 1,
        a = c >> 1,
        p = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        l = 0,
        n = 1,
        f = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0,
        t = Math.abs(t),
        isNaN(t) || Infinity === t ? (d = isNaN(t) ? 1 : 0,
        s = c) : (s = Math.floor(Math.log(t) / Math.LN2),
        t * (r = Math.pow(2, -s)) < 1 && (s--,
        r *= 2),
        t += s + a >= 1 ? p / r : p * Math.pow(2, 1 - a),
        t * r >= 2 && (s++,
        r /= 2),
        s + a >= c ? (d = 0,
        s = c) : s + a >= 1 ? (d = (t * r - 1) * Math.pow(2, e),
        s += a) : (d = t * Math.pow(2, a - 1) * Math.pow(2, e),
        s = 0)); e >= 6; )
            i[l] = 63 & d,
            l += n,
            d /= 64,
            e -= 6;
        for (s = s << e | d,
        h += e; h > 0; )
            i[l] = 63 & s,
            l += n,
            s /= 64,
            h -= 6;
        return i[l - n] |= 32 * f,
        o(i)
    }
    ,
    D = function(t, e) {
        var u, i, o, r, n, s, a, h, c, d;
        for (u = l(e),
        n = 6 * e - t - 1,
        s = (1 << n) - 1,
        r = s >> 1,
        c = -5,
        a = e - 1,
        i = -1,
        d = u[a],
        a += i,
        o = d & (1 << -c) - 1,
        d >>= -c,
        c += n; c > 0; )
            o = 64 * o + u[a],
            a += i,
            c -= 6;
        for (h = o & (1 << -c) - 1,
        o >>= -c,
        c += t; c > 0; )
            h = 64 * h + u[a],
            a += i,
            c -= 6;
        if (0 === o)
            o = 1 - r;
        else {
            if (o === s)
                return h ? NaN : Infinity * (d ? -1 : 1);
            h += Math.pow(2, t),
            o -= r
        }
        return (d ? -1 : 1) * h * Math.pow(2, o - t)
    }
    ,
    t.stringify = function(t) {
        var e;
        return e = m(t),
        C(),
        e
    }
    ,
    m = function(t) {
        var i, o, n, h, c, l, d, p, f, C, B, D, A, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I;
        switch (typeof t) {
        case "string":
            return t in F ? "@" + s(F[t]) : (C = t.length,
            C > 3 && (F[t] = g++),
            C ? 1 === C ? "=" + t : "$" + s(t.length) + t : "_");
        case "number":
            return (0 | t) === t || MyMath.round2(t) === t ? s(t) : t.toExponential().replace(/^[0.]+|\.|e.*$/g, "").length < 6 && !isNaN(t) ? ":" + r(t, 23, 5) : ";" + r(t, 52, 11);
        case "boolean":
            return t ? "+" : "-";
        case "undefined":
            return "?";
        case "null":
            return "!";
        case "object":
            if (!t)
                return "!";
            if (T = [],
            a(t)) {
                if (0 === t.length)
                    return "[" + s(0);
                if (2 === t.length) {
                    if ("number" == typeof t[0] && "number" == typeof t[1]) {
                        if (~~t[0] === t[0] && ~~t[1] === t[1] || MyMath.round2(t[0]) === t[0] && MyMath.round2(t[1]) === t[1])
                            return "." + s(t[0]) + s(t[1]);
                        if (~~(i = 100 * t[0]) === i && ~~(o = 100 * t[1]) === o)
                            return "," + s(100 * t[0]) + s(100 * t[1])
                    }
                } else if (t.length > 2) {
                    for (c = !0,
                    h = !0,
                    l = !0,
                    d = 0,
                    B = t.length; B > d && (w = t[d],
                    c && (a(w) && 2 === w.length && "number" == typeof w[0] && "number" == typeof w[1] ? ~~w[0] === w[0] && ~~w[1] === w[1] || MyMath.round2(w[0]) === w[0] && MyMath.round2(w[1]) === w[1] || (c = !1) : c = !1),
                    h && ("number" == typeof w && MyMath.round2(w) === w || (h = !1)),
                    l && "number" != (S = typeof w) && "string" !== S && "boolean" !== S && "undefined" !== S && "null" !== S && (l = !1),
                    h || c || l); d++)
                        ;
                    if (h) {
                        for (x = 0,
                        f = 0,
                        D = t.length; D > f; f++)
                            E = t[f],
                            T.push(s(E - x + 5)),
                            x = E;
                        return T = "#" + s(t.length) + T.join(""),
                        T in e ? "]" + s(e[T]) : (e[T] = u++,
                        T)
                    }
                    if (c) {
                        for (j = L = 0,
                        T.push("*"),
                        T.push(s(t.length)),
                        _ = 0,
                        A = t.length; A > _; _++)
                            w = t[_],
                            P = w[0],
                            I = w[1],
                            T.push(s(P - j)),
                            T.push(s(I - L)),
                            j = P,
                            L = I;
                        return T.join("")
                    }
                    if (l) {
                        for (k = 0,
                        y = t.length; y > k; k++)
                            n = t[k],
                            T.push(m(n));
                        return T = "[" + s(t.length) + T.join(""),
                        T in e ? "]" + s(e[T]) : (e[T] = u++,
                        T)
                    }
                }
                for (M = 0,
                v = t.length; v > M; M++)
                    n = t[M],
                    T.push(m(n));
                return "[" + s(t.length) + T.join("")
            }
            b = 0;
            for (p in t)
                hasProp.call(t, p) && (O = t[p],
                T.push(m(p)),
                T.push(m(O)),
                b++);
            return T.unshift(s(b)),
            T.unshift("{"),
            T.join("")
        }
    }
    ,
    t.parse = function(t) {
        var e;
        return n = t,
        e = p(),
        C(),
        e
    }
    ,
    p = function() {
        var t, i, o, r, n, s, a, c, l, d, f, C, B, m, y, v, b, E, w, x;
        if (b = h(1),
        isNaN(t = b.charCodeAt(0)))
            return null;
        if (t >= 48 && 57 >= t)
            return t - 48;
        if (t >= 65 && 83 > t || t >= 97 && 115 > t)
            return A(b);
        switch (b) {
        case "?":
            return;
        case "!":
            return null;
        case "+":
            return !0;
        case "-":
            return !1;
        case ":":
            return E = D(23, 5),
            MyMath.roundN(E, 6 - (~~Math.abs(E)).toString().length);
        case ";":
            return D(52, 11);
        case "[":
            for (y = [],
            v = !0,
            i = o = 1,
            d = p(); d >= o; i = o += 1)
                y.push(E = p()),
                v && "number" != (f = typeof E) && "string" !== f && "boolean" !== f && "undefined" !== f && "null" !== f && (v = !1);
            return v && y.length > 2 && (e[u++] = y.slice()),
            y;
        case "#":
            for (a = 0,
            y = [],
            i = r = 1,
            C = p(); C >= r; i = r += 1)
                y.push(MyMath.round2(a += p() - 5));
            return e[u++] = y.slice(),
            y;
        case "*":
            for (s = [0, 0],
            y = [],
            i = c = 1,
            B = p(); B >= c; i = c += 1)
                w = s[0] + p(),
                x = s[1] + p(),
                s = [MyMath.round2(w), MyMath.round2(x)],
                y.push(s);
            return y;
        case "]":
            return e[p()].slice();
        case ".":
            return [p(), p()];
        case ",":
            return [p() / 100, p() / 100];
        case "{":
            for (y = {},
            i = l = 1,
            m = p(); m >= l; i = l += 1)
                y[p()] = p();
            return y;
        case "_":
            return "";
        case "=":
            return h(1);
        case "$":
            return n = p(),
            E = h(n),
            n > 3 && (F[g++] = E),
            E;
        case "@":
            return F[p()];
        default:
            throw "Unknown type: " + b
        }
    }
    ,
    t
}();
var Geometry, MyMath, classes, slice = [].slice;
MyMath = (classes = "undefined" != typeof window && null !== window ? window : require("./classes/classes")).MyMath,
("undefined" != typeof window && null !== window ? window : module.exports).Geometry = Geometry = function() {
    function t() {}
    var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I, $, R, z, G, H, q, U, W, N, V, J, X, K, Y, Z, Q, tt, et, ut, it, ot, rt, nt, st, at, ht, ct, lt, dt, pt, ft, Ct, Bt;
    return n = function(t) {
        var e;
        return (e = 1 - t) * e * e
    }
    ,
    s = function(t) {
        var e;
        return 3 * t * (e = 1 - t) * e
    }
    ,
    a = function(t) {
        return 3 * t * t * (1 - t)
    }
    ,
    h = function(t) {
        return t * t * t
    }
    ,
    B = function(t, e, u, i) {
        var o, r;
        return o = u - t,
        r = i - e,
        o * o + r * r
    }
    ,
    t.v2Negate = lt = function(t) {
        return [-t[0], -t[1]]
    }
    ,
    t.v2Add = at = function(t, e) {
        return [t[0] + e[0], t[1] + e[1]]
    }
    ,
    t.v2Sub = Bt = function(t, e) {
        return [t[0] - e[0], t[1] - e[1]]
    }
    ,
    t.v2Dot = ht = function(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }
    ,
    t.v2ScaleII = ft = function(t, e) {
        return [t[0] * e, t[1] * e]
    }
    ,
    t.v2SquaredLength = Ct = function(t) {
        return t[0] * t[0] + t[1] * t[1]
    }
    ,
    t.v2Length = ct = function(t) {
        return Math.sqrt(Ct(t))
    }
    ,
    t.v2Scale = pt = function(t, e) {
        var u, i;
        return i = ct(t),
        u = i ? e / i : 1,
        [t[0] * u, t[1] * u]
    }
    ,
    t.v2Normalize = dt = function(t) {
        var e;
        return (e = ct(t)) ? [t[0] / e, t[1] / e] : [1, 0]
    }
    ,
    t.isLeft = L = function(t, e, u) {
        return (e[0] - t[0]) * (u[1] - t[1]) - (e[1] - t[1]) * (u[0] - t[0]) > 0
    }
    ,
    t.translateMatrix = st = function(t, e) {
        return [1, 0, 0, 1, t, e]
    }
    ,
    t.scaleMatrix = tt = function(t, e) {
        return [t, 0, 0, e, 0, 0]
    }
    ,
    t.rotateMatrix = Z = function(t) {
        var e, u;
        return [e = Math.cos(t), u = Math.sin(t), -u, e, 0, 0]
    }
    ,
    t.skewXMatrix = et = function(t) {
        return [1, 0, Math.tan(t), 1, 0, 0]
    }
    ,
    t.skewYMatrix = ut = function(t) {
        return [1, Math.tan(t), 0, 1, 0, 0]
    }
    ,
    t.transform = it = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B;
        for (p = arguments[0],
        B = 2 <= arguments.length ? slice.call(arguments, 1) : [],
        f = 0,
        d = B.length; d > f; f++)
            C = B[f],
            n = C[0],
            h = C[1],
            s = C[2],
            c = C[3],
            a = C[4],
            l = C[5],
            t = p[0],
            i = p[1],
            e = p[2],
            o = p[3],
            u = p[4],
            r = p[5],
            p = [t * n + e * h, i * n + o * h, t * s + e * c, i * s + o * c, a * t + u + e * l, a * i + r + o * l];
        return p
    }
    ,
    t.inverseMatrix = P = function(t) {
        var e, u, i, o, r, n, s;
        return e = t[0],
        o = t[1],
        u = t[2],
        r = t[3],
        i = t[4],
        n = t[5],
        s = 1 / (e * r - u * o),
        [s * r, s * -o, s * -u, s * e, s * (u * n - i * r), s * (i * o - e * n)]
    }
    ,
    t.scaleFromToMatrix = Q = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, C;
        return o = t[0],
        n = t[1],
        r = t[2],
        s = t[3],
        d = e[0],
        f = e[1],
        p = e[2],
        C = e[3],
        u = MyMath.round2(r - o),
        i = MyMath.round2(s - n),
        c = MyMath.round2(p - d),
        l = MyMath.round2(C - f),
        .01 > Math.abs(u) && (u = 1),
        .01 > Math.abs(i) && (i = 1),
        .01 > Math.abs(c) && (c = 1),
        .01 > Math.abs(l) && (l = 1),
        a = c / u,
        h = l / i,
        it(st(d, f), tt(a, h), st(-o, -n))
    }
    ,
    t.rotateFromToMatrix = Y = function(t, e, u) {
        var i, o;
        return i = t[0],
        o = t[1],
        it(st(i, o), Z(c(t, e, u)), st(-i, -o))
    }
    ,
    t.transformFromToMatrix = ot = function(t, e, u, i, o, r) {
        var n, s, a, h, c, l, d, p, f, C, B, D, A, F;
        return f = t[0],
        D = t[1],
        C = e[0],
        A = e[1],
        B = u[0],
        F = u[1],
        a = i[0],
        l = i[1],
        h = o[0],
        d = o[1],
        c = r[0],
        p = r[1],
        n = [a - c, l - p, h - c, d - p, c, p],
        s = [f - B, D - F, C - B, A - F, B, F],
        it(n, P(s))
    }
    ,
    t.transformPoints = nt = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p;
        for (u = e[0],
        r = e[1],
        i = e[2],
        n = e[3],
        o = e[4],
        s = e[5],
        l = [],
        h = 0,
        a = t.length; a > h; h++)
            c = t[h],
            d = c[0],
            p = c[1],
            l.push([MyMath.roundN(o + u * d + i * p, 5), MyMath.roundN(s + r * d + n * p, 5)]);
        return l
    }
    ,
    t.transformPoint = rt = function(t, e) {
        var u, i, o, r, n, s, a, h;
        return a = t[0],
        h = t[1],
        u = e[0],
        r = e[1],
        i = e[2],
        n = e[3],
        o = e[4],
        s = e[5],
        [MyMath.roundN(o + u * a + i * h, 5), MyMath.roundN(s + r * a + n * h, 5)]
    }
    ,
    t.distanceFromPoint = T = function(t, e) {
        var u, i;
        return u = e[0] - t[0],
        i = e[1] - t[1],
        Math.sqrt(u * u + i * i)
    }
    ,
    t.distanceFromLine = S = function(t, e, u, i) {
        var o, r, n, s;
        if (o = u[0] - e[0],
        r = u[1] - e[1],
        n = o * o + r * r,
        !n)
            return T(t, e);
        if (s = ((t[0] - e[0]) * o + (t[1] - e[1]) * r) / n,
        !i) {
            if (0 > s)
                return T(t, e);
            if (s > 1)
                return T(t, u)
        }
        return T(t, [e[0] + s * o, e[1] + s * r])
    }
    ,
    t.nearestPointOnLine = U = function(t, e, u) {
        var i, o, r, n;
        return i = u[0] - e[0],
        o = u[1] - e[1],
        (r = i * i + o * o) ? (n = ((t[0] - e[0]) * i + (t[1] - e[1]) * o) / r,
        [e[0] + n * i, e[1] + n * o]) : e
    }
    ,
    t.directionalDistance = x = function(t, e, u) {
        var i, o, r, n, s, a;
        return r = u[0] - e[0],
        n = u[1] - e[1],
        s = r * r + n * n,
        i = t[0] - e[0],
        o = t[1] - e[1],
        s ? (a = (i * r + o * n) / s - 1,
        [a * r, a * n]) : [i, o]
    }
    ,
    t.distanceFromEllipse = k = function(t, e, u) {
        var i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I, $, R, z, G, H, q, U, W, N, V, J, X, K, Y, Z, Q, tt, et, ut;
        if (L = 1 / 3,
        E = .01,
        Q = t[0],
        tt = t[1],
        R = Math.abs(Q - (e[0] + u[0]) / 2),
        et = Math.abs(tt - (e[1] + u[1]) / 2),
        b = Math.abs(e[0] - u[0]),
        v = Math.abs(e[1] - u[1]),
        s = b / 2,
        l = v / 2 + 1e-4,
        w = 1 - l / s,
        y = w * (2 - w),
        Math.max(R, et) < 2 && Math.min(s, l) > 3)
            return -Math.min(s, l);
        if (ut = et * et,
        z = R * R,
        x = 1 - w,
        _ = x * x,
        a = s * s,
        k = _ * (z - a),
        S = k - ut,
        T = k + ut,
        m = Math.sqrt(z + ut),
        O = 0 >= T,
        C = R / m,
        W = et / m,
        V = et / (R + m),
        B = C * C,
        N = W * W,
        n = _ * B + N,
        h = _ * R * C + et * W,
        d = _ * (z - a) + ut,
        c = h * h,
        j = d / (h + Math.sqrt(c - n * d)),
        I = Math.atan2(et - j * W, _ * (R - j * C)),
        E > m)
            return Math.min(n, h);
        if (E * m > Math.abs(j))
            return j;
        for (M = P = 0; 50 >= P; M = ++P) {
            if (n = T + _ * (2 * R + j) * j,
            h = -4 * j * et / n,
            d = 2 * (T + (1 + y) * j * j) / n,
            D = h,
            h += V,
            d += V,
            D += V,
            c = h * h,
            o = (3 * d - c) / 9,
            r = (h * (9 * d - 2 * c) - 27 * D) / 54,
            i = o * o * o + r * r,
            i >= 0 ? (q = Math.sqrt(i),
            G = r - q,
            H = r + q,
            K = (H > 0 ? Math.pow(H, L) : -Math.pow(-H, L)) + (G > 0 ? Math.pow(G, L) : -Math.pow(-G, L)) - h * L,
            Y = K * K,
            Z = 3 + Y,
            X = Math.atan2(et * Z - 2 * j * K, _ * (R * Z - j * (1 - Y)))) : (o = -o,
            $ = Math.sqrt(o),
            J = Math.acos(r / (o * $)),
            K = 2 * $ * Math.cos(J * L) - h * L,
            Y = K * K,
            Z = 3 + Y,
            X = Math.atan2(et * Z - 2 * j * K, _ * (R * Z - j * (1 - Y))),
            0 > X * I && (K = 2 * $ * Math.cos((J + 2 * Math.PI) * L) - h * L,
            Y = K * K,
            Z = 3 + Y,
            X = Math.atan2(et * Z - 2 * j * K, _ * (R * Z - j * (1 - Y))),
            0 > X * I && (K = 2 * $ * Math.cos((J + 4 * Math.PI) * L) - h * L,
            Y = K * K,
            Z = 3 + Y,
            X = Math.atan2(et * Z - 2 * j * K, _ * (R * Z - j * (1 - Y)))))),
            A = Math.abs(.5 * (X - I)),
            I = .5 * (I + X),
            p = Math.cos(I),
            U = Math.sin(I),
            f = Math.sqrt(1 - y * U * U),
            E > A)
                return R * p + et * U - s * f;
            h = s / f,
            F = R - p * h,
            g = et - U * h * _,
            j = Math.sqrt(F * F + g * g),
            O && (j = -j),
            V = g / (j + F)
        }
        return O ? -m : m
    }
    ,
    t.distanceFromBezier = _ = function(t, e) {
        return T(t, q(t, e))
    }
    ,
    q = function(t, e) {
        var u, i, o, r, n, s, a, h, c;
        for (c = E(t, e),
        u = e[0],
        i = T(t, u),
        h = M(c, 0),
        n = 0,
        o = h.length; o > n; n++)
            a = h[n],
            s = l(e, a),
            r = T(t, s),
            i > r && (i = r,
            u = s);
        return i > T(t, e[3]) && (u = e[3]),
        u
    }
    ,
    E = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m;
        for (u = [],
        r = [[], [], []],
        i = [[], [], []],
        m = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]],
        g = [[0, 0], [.2, 0], [.4, 0], [.6, 0], [.8, 0], [1, 0]],
        n = C = 0; 3 >= C; n = ++C)
            u[n] = Bt(e[n], t);
        for (n = s = 0; 2 >= s; n = ++s)
            r[n] = ft(Bt(e[n + 1], e[n]), 3);
        for (A = h = 0; 2 >= h; A = ++h)
            for (o = l = 0; 3 >= l; o = ++l)
                i[A][o] = ht(r[A], u[o]);
        for (c = d = 0; 5 >= d; c = ++d)
            for (p = Math.max(0, c - 2),
            F = Math.min(c, 3),
            n = f = B = p,
            D = F; D >= f; n = f += 1)
                a = c - n,
                g[n + a][1] += i[a][n] * m[a][n];
        return g
    }
    ,
    M = function(t, e) {
        var u, i, o;
        switch (w(t)) {
        case 0:
            return [];
        case 1:
            if (e > 15)
                return [(t[0][0] + t[5][0]) / 2];
            if (b(t))
                return [v(t)]
        }
        return i = p(t, .5),
        u = i[0],
        o = i[1],
        u = M(u, e + 1),
        o = M(o, e + 1),
        u.concat(o)
    }
    ,
    l = function(t, e) {
        var u, i, o, r, n, s;
        for (s = [t, [[], [], []], [[], []], [[]]],
        u = r = 1; 3 >= r; u = ++r)
            for (o = i = 0,
            n = 3 - u; n >= i; o = i += 1)
                s[u][o][0] = (1 - e) * s[u - 1][o][0] + e * s[u - 1][o + 1][0],
                s[u][o][1] = (1 - e) * s[u - 1][o][1] + e * s[u - 1][o + 1][1];
        return s[3][0]
    }
    ,
    p = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l;
        for (l = [t, [[], [], [], [], []], [[], [], [], []], [[], [], []], [[], []], [[]]],
        u = a = 1; 5 >= a; u = ++a)
            for (o = i = 0,
            h = 5 - u; h >= i; o = i += 1)
                l[u][o][0] = (1 - e) * l[u - 1][o][0] + e * l[u - 1][o + 1][0],
                l[u][o][1] = (1 - e) * l[u - 1][o][1] + e * l[u - 1][o + 1][1];
        for (s = [],
        u = r = 0; 5 >= r; u = ++r)
            s[u] = l[u][0];
        for (c = [],
        u = n = 0; 5 >= n; u = ++n)
            c[u] = l[5 - u][u];
        return [s, c]
    }
    ,
    w = function(t) {
        var e, u, i, o, r;
        for (u = 0,
        o = t[0][1] > 0,
        e = i = 1; 5 >= i; e = ++i)
            r = t[e][1] > 0,
            r !== o && (u++,
            o = r);
        return u
    }
    ,
    b = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D;
        for (e = t[0][1] - t[5][1],
        r = t[5][0] - t[0][0],
        a = t[0][0] * t[5][1] - t[5][0] * t[0][1],
        o = e * e + r * r,
        f = 0,
        C = 0,
        p = B = 1; 5 >= B; p = ++B)
            c = e * t[p][0] + r * t[p][1] + a,
            D = c > 0,
            c = c * c / o,
            D ? c > f && (f = c) : (c = -c,
            C > c && (C = c));
        return u = h = 0,
        n = 1,
        i = e,
        s = r,
        d = u * s - i * n,
        l = 1 / d,
        .5 * Math.abs((n * (a + f) - s * h) * l - (n * (a + C) - s * h) * l) < 1e-15
    }
    ,
    v = function(t) {
        var e;
        return e = t[5][1] - t[0][1],
        ((t[5][0] - t[0][0]) * t[0][1] - e * t[0][0]) / -e
    }
    ,
    t.lineOverLine = $ = function(t, e, u, i, o, r, n, s) {
        var a, h, c, l, d, p, f, C;
        return a = u !== t,
        l = n !== o,
        a || l ? (c = a ? (i - e) / (u - t) : 0,
        p = l ? (s - r) / (n - o) : 0,
        a && l && c === p ? !1 : a && l ? (h = e - c * t,
        d = r - p * o,
        f = (d - h) / (c - p),
        f > t == u > f && f > o == n > f) : a ? t > o == u > o ? !1 : (C = e + c * (o - t),
        C > r == s > C) : o > t == n > t ? !1 : (C = r + p * (t - o),
        C > e == i > C)) : !1
    }
    ,
    t.lineOverRectangle = R = function(t, e, u) {
        var i, o, r, n, s, a, h, c;
        return i = t[0],
        o = t[1],
        r = e[0],
        n = e[1],
        s = u[0],
        h = u[1],
        a = u[2],
        c = u[3],
        $(i, o, r, n, s, h, a, h) || $(i, o, r, n, s, h, s, c) || $(i, o, r, n, s, c, a, c) || $(i, o, r, n, a, h, a, c)
    }
    ,
    t.lineOverEllipse = I = function(t, e, u, i) {
        var o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y;
        return A = (i[0] - u[0]) / 2,
        f = (i[1] - u[1]) / 2,
        d = u[0] + A,
        p = u[1] + f,
        F = t[0] - d,
        m = t[1] - p,
        g = e[0] - d,
        y = e[1] - p,
        F === g && (g += 1e-4),
        m === y && (y += 1e-4),
        C = g - F,
        B = y - m,
        l = f * f,
        c = A * A * B * B,
        D = F * B - m * C,
        o = C * C * l + c,
        r = 2 * C * l * D,
        n = l * (D * D - c),
        s = r * r - 4 * o * n,
        0 > s ? !1 : (a = (-r - Math.sqrt(s)) / 2 / o,
        h = (-r + Math.sqrt(s)) / 2 / o,
        a > m == y > a || h > m == y > h)
    }
    ,
    t.rectangleOverRectangle = J = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p;
        return u = t[0],
        o = t[1],
        i = t[2],
        r = t[3],
        n = e[0],
        a = e[1],
        s = e[2],
        h = e[3],
        n > u == (l = s > u) && l === (c = n > i) && c === s > i ? !1 : a > o != (p = h > o) || p !== (d = a > r) || d !== h > r
    }
    ,
    t.pointInRectangle = N = function(t, e) {
        var u, i, o, r, n, s;
        return u = t[0],
        r = t[1],
        i = e[0],
        n = e[1],
        o = e[2],
        s = e[3],
        u > i == o > u && r > n == s > r
    }
    ,
    t.pointInSquare = V = function(t, e, u, i, o) {
        return t > u - o == u + o > t && e > i - o == i + o > e
    }
    ,
    t.bounding = C = function() {
        var t, e, u, i, o, r, n, s, a, h, c;
        for (t = arguments[0],
        o = 2 <= arguments.length ? slice.call(arguments, 1) : [],
        null == t && (t = [0, 0]),
        s = n = t[0],
        c = h = t[1],
        u = 0,
        e = o.length; e > u; u++)
            i = o[u],
            r = i[0],
            a = i[1],
            s > r ? s = r : r > n && (n = r),
            c > a ? c = a : a > h && (h = a);
        return [s, c, n, h]
    }
    ,
    t.linesToBezier = z = function(t, e) {
        var u, i;
        return t.length ? 1 === t.length ? [t[0], t[0], t[0], t[0]] : (u = 0 === e[0] && 0 === e[1] ? g(t, 0) : lt(e),
        i = y(t, t.length - 1),
        O(t, 0, t.length - 1, u, i)) : [[0, 0], [0, 0], [0, 0], [0, 0]]
    }
    ,
    O = function(t, e, u, i, o) {
        var r, n, s, a, h, c, l, d, p, f, C, B, D, g, y, v, b, E, w, x, _, k, S, M;
        if (x = 0,
        g = 8,
        y = u - e + 1,
        2 === y)
            return l = T(t[u], t[e]) / 3,
            c = [0, 0, 0, 0],
            c[0] = t[e],
            c[3] = t[u],
            c[1] = at(c[0], pt(i, l)),
            c[2] = at(c[3], pt(o, l)),
            c;
        for (r = 0,
        f = v = b = e,
        E = u - 1; E >= v; f = v += 1)
            r += T(t[f], t[f + 1]);
        if (p = y > 4 ? r / y : r / 2,
        B = Math.pow(p, 1.3),
        S = A(t, e, u),
        c = j(t, e, u, S, i, o),
        k = m(t, e, u, c, S),
        D = k[0],
        x = k[1],
        d = .8 * T(c[0], c[3]),
        p > D && T(c[0], c[1]) < d && T(c[3], c[2]) < d)
            return c;
        if (B > D) {
            for (s = p,
            f = C = 1,
            w = g; w >= C; f = C += 1)
                M = K(t, e, u, S, c),
                c = j(t, e, u, M, i, o),
                k = m(t, e, u, c, M),
                D = k[0],
                x = k[1],
                d = .8 * T(c[0], c[3]),
                s > D && T(c[0], c[1]) < d && T(c[3], c[2]) < d && (n = c,
                s = D),
                S = M;
            if (null != n)
                return n
        }
        return _ = F(t, x),
        a = [],
        x > e && (a = O(t, e, x, i, _)),
        _ = lt(_),
        h = [[0, 0]],
        u > x && (h = O(t, x, u, _, o)),
        a.concat(h.slice(1))
    }
    ,
    K = function(t, e, u, i, o) {
        var r, n, s, a, h;
        for (h = [],
        r = n = s = e,
        a = u; a >= n; r = n += 1)
            h.push(W(o, t[r], i[r - e]));
        return h
    }
    ,
    W = function(t, e, u) {
        var i, o, r, n, s, a, h, c, l, p;
        for (a = [[0, 0], [0, 0], [0, 0]],
        c = [[0, 0], [0, 0]],
        p = d(3, t, u),
        o = s = 0; 2 >= s; o = ++s)
            a[o][0] = 3 * (t[o + 1][0] - t[o][0]),
            a[o][1] = 3 * (t[o + 1][1] - t[o][1]);
        for (o = r = 0; 1 >= r; o = ++r)
            c[o][0] = 2 * (a[o + 1][0] - a[o][0]),
            c[o][1] = 2 * (a[o + 1][1] - a[o][1]);
        return h = d(2, a, u),
        l = d(1, c, u),
        n = (p[0] - e[0]) * h[0] + (p[1] - e[1]) * h[1],
        i = h[0] * h[0] + h[1] * h[1] + (p[0] - e[0]) * l[0] + (p[1] - e[1]) * l[1],
        i ? u - n / i : u
    }
    ,
    d = function(t, e, u) {
        var i, o, r, n, s, a, h, c, l, d;
        for (d = [],
        a = 0,
        s = e.length; s > a; a++)
            h = e[a],
            d.push([h[0], h[1]]);
        for (i = o = 1,
        c = t; c >= o; i = o += 1)
            for (r = n = 0,
            l = t - i; l >= n; r = n += 1)
                d[r][0] = (1 - u) * d[r][0] + u * d[r + 1][0],
                d[r][1] = (1 - u) * d[r][1] + u * d[r + 1][1];
        return d[0]
    }
    ,
    j = function(t, e, u, i, o, r) {
        var c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k;
        for (f = [[0, 0], [0, 0]],
        k = [0, 0],
        p = [[0, 0], [0, 0], [0, 0], [0, 0]],
        m = Math.abs(u - e + 1),
        c = [],
        A = y = 1,
        v = m; v >= y; A = y += 1)
            c.push([[0, 0], [0, 0]]);
        for (A = F = 0,
        b = m - 1; b >= F; A = F += 1)
            x = o,
            _ = r,
            x = pt(x, s(i[A])),
            _ = pt(_, a(i[A])),
            c[A][0] = x,
            c[A][1] = _;
        for (A = g = 0,
        E = m - 1; E >= g; A = g += 1)
            f[0][0] += ht(c[A][0], c[A][0]),
            f[0][1] += ht(c[A][0], c[A][1]),
            f[1][0] = f[0][1],
            f[1][1] += ht(c[A][1], c[A][1]),
            w = Bt(t[e + A], at(ft(t[e], n(i[A])), at(ft(t[e], s(i[A])), at(ft(t[u], a(i[A])), ft(t[u], h(i[A])))))),
            k[0] += ht(c[A][0], w),
            k[1] += ht(c[A][1], w);
        return C = f[0][0] * f[1][1] - f[1][0] * f[0][1],
        B = f[0][0] * k[1] - f[0][1] * k[0],
        D = k[0] * f[1][1] - k[1] * f[0][1],
        C || (C = f[0][0] * f[1][1] * 1e-11),
        l = D / C,
        d = B / C,
        (0 > l || 0 > d) && (l = d = T(t[u], t[e]) / 3),
        p[0] = t[e],
        p[3] = t[u],
        p[1] = at(p[0], pt(o, l)),
        p[2] = at(p[3], pt(r, d)),
        p
    }
    ,
    m = function(t, e, u, i, o) {
        var r, n, s, a, h, c, l, p;
        for (s = 0,
        p = Math.floor((u + e + 1) / 2),
        n = a = c = e + 1,
        l = u - 1; l >= a; n = a += 1)
            h = d(3, i, o[n - e]),
            r = Ct([h[0] - t[n][0], h[1] - t[n][1]]),
            r >= s && (s = r,
            p = n);
        return [s, p]
    }
    ,
    A = function(t, e, u) {
        var i, o, r, n, s, a, h, c;
        for (c = [0],
        i = r = n = e + 1,
        s = u; s >= r; i = r += 1)
            c.push(c[i - e - 1] + T(t[i], t[i - 1]));
        for (i = o = a = e + 1,
        h = u; h >= o; i = o += 1)
            c[i - e] = c[i - e] / c[u - e];
        return c
    }
    ,
    g = function(t, e) {
        return dt(Bt(t[e + 1], t[e]))
    }
    ,
    y = function(t, e) {
        var u, i, o, r, n, s, a;
        return u = t[e - 1],
        i = e > 1 ? t[e - 2] : u,
        o = e > 2 ? t[e - 3] : i,
        r = .5,
        n = 1 / 3,
        s = 1 / 6,
        a = [u[0] * r + i[0] * n + o[0] * s, u[1] * r + i[1] * n + o[1] * s],
        dt(Bt(a, t[e]))
    }
    ,
    F = function(t, e) {
        var u, i;
        return u = e > 0 ? Bt(t[e - 1], t[e]) : [.01, 0],
        i = e < t.length - 1 ? Bt(t[e], t[e + 1]) : [.01, 0],
        dt([u[0] + i[0], u[1] + i[1]])
    }
    ,
    t.bezierPoints = f = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p;
        return u = t[0],
        n = u[0],
        c = u[1],
        i = t[1],
        s = i[0],
        l = i[1],
        o = t[2],
        a = o[0],
        d = o[1],
        r = t[3],
        h = r[0],
        p = r[1],
        e = [],
        e.push([n, c]),
        X(e, n, c, s, l, a, d, h, p, 0),
        e.push([h, p]),
        e
    }
    ,
    i = 8,
    r = .25,
    u = 1e-8,
    e = .09,
    o = .5,
    X = function(t, n, s, a, h, c, l, d, p, f) {
        var C, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j;
        if (f > i)
            return void t.push([a, h]);
        switch (w = (a + c) / 2,
        M = (h + l) / 2,
        g = d - n,
        m = p - s,
        C = Math.abs((a - d) * m - (h - p) * g),
        D = Math.abs((c - d) * m - (l - p) * g),
        ((C > u) << 1) + (D > u)) {
        case 0:
            if (y = g * g + m * m,
            0 === y)
                C = B(n, s, a, h),
                D = B(d, p, c, l);
            else {
                if (y = 1 / y,
                A = a - n,
                F = h - s,
                C = y * (A * g + F * m),
                A = c - n,
                F = l - s,
                D = y * (A * g + F * m),
                C > 0 && 1 > C && D > 0 && 1 > D)
                    return;
                C = 0 >= C ? B(a, h, n, s) : C >= 1 ? B(a, h, d, p) : B(a, h, n + C * g, s + C * m),
                D = 0 >= D ? B(c, l, n, s) : D >= 1 ? B(c, l, d, p) : B(c, l, n + D * g, s + D * m)
            }
            if (C > D) {
                if (r > C)
                    return void t.push([a, h])
            } else if (r > D)
                return void t.push([c, l]);
            break;
        case 1:
            if (r * (g * g + m * m) >= D * D) {
                if (A = Math.abs(Math.atan2(p - l, d - c) - Math.atan2(l - h, c - a)),
                A >= Math.PI && (A = 2 * Math.PI - A),
                e > A)
                    return t.push([a, h]),
                    void t.push([c, l]);
                if (A > o)
                    return void t.push([c, l])
            }
            break;
        case 2:
            if (r * (g * g + m * m) >= C * C) {
                if (A = Math.abs(Math.atan2(l - h, c - a) - Math.atan2(h - s, a - n)),
                A >= Math.PI && (A = 2 * Math.PI - A),
                e > A)
                    return t.push([a, h]),
                    void t.push([c, l]);
                if (A > o)
                    return void t.push([a, h])
            }
            break;
        case 3:
            if (r * (g * g + m * m) >= (C + D) * (C + D)) {
                if (y = Math.atan2(l - h, c - a),
                A = Math.abs(y - Math.atan2(h - s, a - n)),
                F = Math.abs(Math.atan2(p - l, d - c) - y),
                A >= Math.PI && (A = 2 * Math.PI - A),
                F >= Math.PI && (F = 2 * Math.PI - F),
                e > A + F)
                    return void t.push([w, M]);
                if (A > o)
                    return void t.push([a, h]);
                if (F > o)
                    return void t.push([c, l])
            }
        }
        v = (n + a) / 2,
        k = (s + h) / 2,
        _ = (c + d) / 2,
        j = (l + p) / 2,
        b = (v + w) / 2,
        S = (k + M) / 2,
        x = (w + _) / 2,
        O = (M + j) / 2,
        E = (b + x) / 2,
        T = (S + O) / 2,
        X(t, n, s, v, k, b, S, E, T, f + 1),
        X(t, E, T, x, O, _, j, d, p, f + 1)
    }
    ,
    t.angleBetweenVectors = c = function(t, e, u) {
        var i, o, r, n, s, a, h;
        return n = e[0] - t[0],
        s = e[1] - t[1],
        a = u[0] - t[0],
        h = u[1] - t[1],
        i = Math.sqrt(n * n + s * s) * Math.sqrt(a * a + h * h),
        o = 0,
        i > 1e-10 && (r = (n * a + s * h) / i,
        r >= -1 && 1 >= r && (o = Math.acos(r))),
        n * h - s * a > 0 ? o : -o
    }
    ,
    t.makeCurvesPath = H = function(t, e) {
        var u, i, o, r, n, s, a;
        if (r = (o = e)[0],
        s = r[0],
        a = r[1],
        "number" == typeof s) {
            if (t.beginPath(),
            t.moveTo(s, a),
            4 === o.length && s === o[3][0] && a === o[3][1])
                return void t.lineTo(s + .01, a + .01);
            for (u = i = 1,
            n = o.length - 1; n >= i; u = i += 3)
                t.bezierCurveTo(o[u][0], o[u][1], o[u + 1][0], o[u + 1][1], o[u + 2][0], o[u + 2][1])
        }
    }
    ,
    t.calculateCurvesBounds = D = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, B, D, A, F, g, m, y;
        for (e = u = t[0][0],
        i = o = t[0][1],
        r = s = 3,
        h = t.length; h > s; r = s += 3)
            c = t[r],
            D = c[0],
            g = c[1],
            e > D ? e = D : D > u && (u = D),
            i > g ? i = g : g > o && (o = g);
        for (r = n = 0,
        l = t.length - 2; l >= n; r = n += 3)
            d = t[r + 1],
            A = d[0],
            m = d[1],
            p = t[r + 2],
            F = p[0],
            y = p[1],
            (e > A || A > u || i > m || m > o || e > F || F > u || i > y || y > o) && (a = f(t.slice(r, r + 4)),
            B = C.apply(null, a),
            A = B[0],
            m = B[1],
            F = B[2],
            y = B[3],
            e > A && (e = A),
            i > m && (i = m),
            F > u && (u = F),
            y > o && (o = y));
        return [e, i, u, o]
    }
    ,
    t.makeBracketPath = G = function(t, e, u, i, o, r) {
        var n, s, a, h, c, l, d, p, f, C, B, D, A, F, g;
        switch (p = u[0],
        A = u[1],
        n = 1,
        s = .05 * r,
        l = i,
        i -= s,
        ")" !== e && "}" !== e && "]" !== e && "⌉" !== e && "⌋" !== e && "⟩" !== e || (p += l,
        i *= -1,
        n = -1),
        a = s * n,
        e) {
        case "(":
        case ")":
            t.moveTo(p, A + o / 2),
            t.quadraticCurveTo(p, A + o / 6, p + i - a / 2, A),
            t.lineTo(p + i, A),
            t.quadraticCurveTo(p + a, A + o / 6, p + a, A + o / 2),
            t.quadraticCurveTo(p + a, A + 5 * o / 6, p + i, A + o),
            t.lineTo(p + i - a / 2, A + o),
            t.quadraticCurveTo(p, A + 5 * o / 6, p, A + o / 2),
            t.closePath();
            break;
        case "|":
            D = p + i / 2,
            c = a / 2,
            f = D - c,
            C = D + c,
            t.moveTo(f, A),
            t.lineTo(C, A),
            t.lineTo(C, A + o),
            t.lineTo(f, A + o),
            t.closePath();
            break;
        case "[":
        case "]":
        case "⌈":
        case "⌉":
        case "⌊":
        case "⌋":
            t.moveTo(p, A),
            t.lineTo(p, A + o),
            "⌈" === e || "⌉" === e ? t.lineTo(p + a, A + o) : (t.lineTo(p + i, A + o),
            t.lineTo(p + i, A + o - s / 2),
            t.lineTo(p + a, A + o - s / 2)),
            "⌊" === e || "⌋" === e ? t.lineTo(p + a, A) : (t.lineTo(p + a, A + s / 2),
            t.lineTo(p + i, A + s / 2),
            t.lineTo(p + i, A)),
            t.closePath();
            break;
        case "{":
        case "}":
            F = A + o,
            B = p + i,
            g = A + o / 2,
            D = p + i / 2,
            c = a / 2,
            f = D - c,
            C = D + c,
            d = Math.abs(i / 2),
            h = s / 4,
            t.moveTo(p, g - h),
            t.quadraticCurveTo(f, g - h, f, g - d),
            t.lineTo(f, A + d),
            t.quadraticCurveTo(f, A, B, A),
            t.lineTo(B, A + h),
            t.quadraticCurveTo(C, A + h, C, A + d),
            t.lineTo(C, g - d),
            t.quadraticCurveTo(C, g, p + c, g),
            t.quadraticCurveTo(C, g, C, g + d),
            t.lineTo(C, F - d),
            t.quadraticCurveTo(C, F - h, B, F - h),
            t.lineTo(B, F),
            t.quadraticCurveTo(f, F, f, F - d),
            t.lineTo(f, g + d),
            t.quadraticCurveTo(f, g + h, p, g + h),
            t.closePath();
            break;
        case "⟨":
        case "⟩":
            t.moveTo(p, A + o / 2),
            t.lineTo(p + i - a, A),
            t.lineTo(p + i, A),
            t.lineTo(p + a, A + o / 2),
            t.lineTo(p + i, A + o),
            t.lineTo(p + i - a, A + o),
            t.closePath()
        }
    }
    ,
    t
}(),
this.Graphics = function() {
    function t() {}
    return t.drawRotationHelper = function(t, e, u, i) {
        t.setLineDash && t.setLineDash([4]),
        t.lineDashOffset = .5,
        t.beginPath(),
        t.moveTo(u[0], u[1]),
        t.lineTo(e[0], e[1]),
        t.lineTo(i[0], i[1]),
        t.strokeStyle = "rgba(0,0,0,.4)",
        t.setLineDash && t.setLineDash([]),
        t.stroke()
    }
    ,
    t.drawActiveBounds = function(t, e) {
        var u, i, o, r;
        u = e[0],
        o = e[1],
        i = e[2],
        r = e[3],
        t.lineJoin = "miter",
        t.lineCap = "butt",
        t.strokeStyle = "rgba(0,0,0,.4)",
        t.setLineDash && t.setLineDash([4]),
        t.lineDashOffset = .5,
        t.strokeRect(u - .5, o - .5, i - u + 1, r - o + 1),
        t.setLineDash && t.setLineDash([]),
        t.lineDashOffset = 0
    }
    ,
    t.drawHandlePoint = function(t, e, u) {
        var i, o, r, n, s, a, h, c, l;
        c = e[0],
        l = e[1],
        t.beginPath(),
        n = Math.PI,
        a = 3,
        o = u - a,
        r = c - o,
        s = c + o,
        h = l - o,
        i = l + o,
        t.moveTo(c - u, i),
        t.arc(r, h, a, n, 1.5 * n),
        t.arc(s, h, a, 1.5 * n, 0),
        t.arc(s, i, a, 0, .5 * n),
        t.arc(r, i, a, .5 * n, n),
        t.fillStyle = "hsla(90,60%,50%,.8)",
        t.strokeStyle = "hsla(90,60%,30%,.9)",
        t.lineWidth = 1,
        t.fill(),
        t.stroke()
    }
    ,
    t.drawSelectionRectangle = function(t, e) {
        var u, i, o, r, n, s;
        o = e[0],
        n = e[1],
        r = e[2],
        s = e[3],
        i = r - o,
        u = s - n,
        t.save(),
        t.translate(.5, .5),
        t.strokeStyle = "rgba(0,0,200,.3)",
        t.lineWidth = 1,
        t.fillStyle = "rgba(0,0,200,.05)",
        t.fillRect(o, n, i, u),
        t.strokeRect(o, n, i, u),
        t.restore()
    }
    ,
    t.drawEditorCursor = function(t, e, u, i, o, r) {
        var n, s;
        n = e[0],
        s = e[1],
        null == o && (o = 0),
        null == r && (r = 1),
        t.save(),
        t.translate(n, s),
        t.globalAlpha = r,
        t.lineJoin = "round",
        t.beginPath(),
        t.moveTo(0, 0),
        t.rotate(o),
        t.quadraticCurveTo(2, -4, 4, -12),
        t.quadraticCurveTo(12, -16, 18, -24),
        t.quadraticCurveTo(22, -22, 24, -18),
        t.quadraticCurveTo(16, -12, 12, -4),
        t.quadraticCurveTo(4, -2, 0, 0),
        t.closePath(),
        t.strokeStyle = "rgba(255,255,255,.7)",
        t.lineWidth = 3,
        t.stroke(),
        t.strokeStyle = "rgba(0,0,0,.8)",
        t.lineWidth = .8,
        t.stroke(),
        t.fillStyle = u,
        t.fill(),
        t.beginPath(),
        t.moveTo(12, -4),
        t.quadraticCurveTo(6, -6, 4, -12),
        t.lineWidth = .5,
        t.stroke(),
        t.beginPath(),
        t.moveTo(0, 0),
        t.lineTo(2, -5),
        t.quadraticCurveTo(3, -3, 5, -2),
        t.lineTo(0, 0),
        t.fillStyle = "#000",
        t.fill(),
        null != i && (t.font = "14px Open Sans",
        t.fillStyle = "#000",
        t.fillText(i, 20, 0)),
        t.restore()
    }
    ,
    t
}();
var Unicode;
("undefined" != typeof window && null !== window ? window : module.exports).Unicode = Unicode = function() {
    function t() {}
    var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I, $, R, z, G, H, q, U, W, N, V, J, X, K, Y, Z, Q, tt, et, ut, it, ot, rt, nt, st, at, ht, ct, lt, dt;
    return ht = function() {
        for (lt = [],
        at = 0; 39 >= at; at++)
            lt.push(at);
        return lt
    }
    .apply(this),
    z = ht[0],
    c = ht[1],
    f = ht[2],
    U = ht[3],
    y = ht[4],
    $ = ht[5],
    A = ht[6],
    J = ht[7],
    S = ht[8],
    H = ht[9],
    G = ht[10],
    R = ht[11],
    u = ht[12],
    E = ht[13],
    x = ht[14],
    _ = ht[15],
    w = ht[16],
    o = ht[17],
    r = ht[18],
    i = ht[19],
    ut = ht[20],
    l = ht[21],
    tt = ht[22],
    v = ht[23],
    b = ht[24],
    T = ht[25],
    O = ht[26],
    M = ht[27],
    D = ht[28],
    W = ht[29],
    V = ht[30],
    n = ht[31],
    C = ht[32],
    L = ht[33],
    I = ht[34],
    a = ht[35],
    N = ht[36],
    e = ht[37],
    et = ht[38],
    h = ht[39],
    j = [/[\u0028\u005B\u007B\u00A1\u00BF\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E18\u2E22\u2E24\u2E26\u2E28\u2E42\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62]/, /[\u007D\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3001-\u3002\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E-\u301F\uFD3E\uFE11-\uFE12\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE50\uFE52\uFE5A\uFE5C\uFE5E\uFF09\uFF0C\uFF0E\uFF3D\uFF5D\uFF60-\uFF61\uFF63-\uFF64]/, /[\u0029\u005D]/, /[\u0022\u0027\u00AB\u00BB\u2018-\u2019\u201B-\u201D\u201F\u2039-\u203A\u275B-\u2760\u2E00-\u2E0D\u2E1C-\u2E1D\u2E20-\u2E21]/, /[\u00A0\u034F\u035C-\u0362\u0F08\u0F0C\u0F12\u0FD9-\u0FDA\u180E\u2007\u2011\u202F]/, /[\u17D6\u203C-\u203D\u2047-\u2049\u3005\u301C\u303B-\u303C\u309B-\u309E\u30A0\u30FB\u30FD-\u30FE\uA015\uFE54-\uFE55\uFF1A-\uFF1B\uFF65\uFF9E-\uFF9F]/, /[\u0021\u003F\u05C6\u061B\u061E-\u061F\u06D4\u07F9\u0F0D-\u0F11\u0F14\u1802-\u1803\u1808-\u1809\u1944-\u1945\u2762-\u2763\u2CF9\u2CFE\u2E2E\uA60E\uA876-\uA877\uFE15-\uFE16\uFE56-\uFE57\uFF01\uFF1F]/, /[\u002F]/, /[\u002C\u002E\u003A-\u003B\u037E\u0589\u060C-\u060D\u07F8\u2044\uFE10\uFE13-\uFE14]/, /[\u0024\u002B\u005C\u00A3-\u00A5\u00B1\u058F\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20A6\u20A8-\u20B5\u20B7-\u20BA\u20BC-\u20BD\u20BF-\u20CF\u2116\u2212-\u2213\uFE69\uFF04\uFFE1\uFFE5-\uFFE6]/, /[\u0025\u00A2\u00B0\u0609-\u060B\u066A\u09F2-\u09F3\u09F9\u0D79\u2030-\u2037\u20A7\u20B6\u20BB\u20BE\u2103\u2109\uA838\uFDFC\uFE6A\uFF05\uFFE0]/, /[\u0030-\u0039\u0660-\u0669\u066B-\u066C\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9]/, /[\u0023\u0026\u002A\u003C-\u003E\u0040-\u005A\u005E-\u007A\u007E\u00A6\u00A9\u00AC\u00AE-\u00AF\u00B5\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C6\u02CE-\u02CF\u02D1-\u02D7\u02DC\u02DE\u02E0-\u02FF\u0370-\u0377\u037A-\u037D\u037F\u0384-\u038A\u038C\u038E-\u03A1\u03A3-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058D-\u058E\u05C0\u05C3\u05F3-\u05F4\u0600-\u0608\u060E-\u060F\u0620-\u064A\u066D-\u066F\u0671-\u06D3\u06D5\u06DD-\u06DE\u06E5-\u06E6\u06E9\u06EE-\u06EF\u06FA-\u070D\u070F-\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F7\u07FA\u0800-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u08A0-\u08B4\u08B6-\u08BD\u08E2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0970-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u09F4-\u09F8\u09FA\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF0\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B70-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BF0-\u0BF8\u0BFA\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C78-\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E-\u0D4F\u0D54-\u0D56\u0D58-\u0D61\u0D70-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DF4\u0E4F\u0F00\u0F05\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F33\u0F36\u0F38\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u0FC0-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FCF\u0FD4-\u0FD8\u104C-\u104F\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FF\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360\u1362-\u137C\u1380-\u1399\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u17D9\u17F0-\u17F9\u1800-\u1801\u1807\u180A\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1940\u19E0-\u1A16\u1A1E-\u1A1F\u1B05-\u1B33\u1B45-\u1B4B\u1B5C\u1B61-\u1B6A\u1B74-\u1B7C\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1BFC-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CC0-\u1CC7\u1CD3\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFC\u1FFE\u2017\u2022-\u2023\u2038\u203E-\u2043\u204A-\u2055\u2057\u205C\u2061-\u2064\u2070-\u2071\u2075-\u207C\u2080\u2085-\u208C\u2090-\u209C\u2100-\u2102\u2104\u2106-\u2108\u210A-\u2112\u2114-\u2115\u2117-\u2120\u2123-\u212A\u212C-\u2153\u2156-\u215A\u215C-\u215D\u215F\u216C-\u216F\u217A-\u2188\u218A-\u218B\u219A-\u21D1\u21D3\u21D5-\u21FF\u2201\u2204-\u2206\u2209-\u220A\u220C-\u220E\u2210\u2214\u2216-\u2219\u221B-\u221C\u2221-\u2222\u2224\u2226\u222D\u222F-\u2233\u2238-\u223B\u223E-\u2247\u2249-\u224B\u224D-\u2251\u2253-\u225F\u2262-\u2263\u2268-\u2269\u226C-\u226D\u2270-\u2281\u2284-\u2285\u2288-\u2294\u2296-\u2298\u229A-\u22A4\u22A6-\u22BE\u22C0-\u22EE\u22F0-\u2307\u230C-\u2311\u2313-\u2319\u231C-\u2328\u232B-\u23EF\u23F4-\u23FE\u2400-\u2426\u2440-\u244A\u24FF\u254C-\u254F\u2575-\u257F\u2590-\u2591\u2596-\u259F\u25A2\u25AA-\u25B1\u25B4-\u25B5\u25B8-\u25BB\u25BE-\u25BF\u25C2-\u25C5\u25C9-\u25CA\u25CC-\u25CD\u25D2-\u25E1\u25E6-\u25EE\u25F0-\u25FF\u2604\u2607-\u2608\u260A-\u260D\u2610-\u2613\u2619\u2620-\u2638\u263C-\u263F\u2641\u2643-\u265F\u2662\u2666\u266B\u266E\u2670-\u267E\u2680-\u269D\u26A0-\u26BC\u26CE\u26E2\u26E4-\u26E7\u2705-\u2707\u270E-\u2756\u2758-\u275A\u2761\u2765-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B54\u2B5A-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CEE\u2CF2-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E16\u2E1A-\u2E1B\u2E1E-\u2E1F\u2E2F\u2E32\u2E35-\u2E39\u2E3F\u4DC0-\u4DFF\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA673\uA67E-\uA69D\uA6A0-\uA6EF\uA6F2\uA700-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA828-\uA82B\uA830-\uA837\uA839\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA95F\uA984-\uA9B2\uA9C1-\uA9C6\uA9CA-\uA9CD\uA9CF\uA9DE-\uA9DF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA5C\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB65\uAB70-\uABE2\uFB00-\uFB06\uFB13-\uFB17\uFB29\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFDFD\uFE70-\uFE74\uFE76-\uFEFC\uFFE8-\uFFEE]/, /[\u05D0-\u05EA\u05F0-\u05F2\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFB4F]/, /[\u231A-\u231B\u23F0-\u23F3\u2600-\u2603\u2614-\u2615\u2618\u261A-\u261C\u261E-\u261F\u2639-\u263B\u2668\u267F\u26BD-\u26C8\u26CD\u26CF-\u26D1\u26D3-\u26D4\u26D8-\u26D9\u26DC\u26DF-\u26E1\u26EA\u26F1-\u26F5\u26F7-\u26F8\u26FA\u26FD-\u2704\u2708-\u2709\u2764\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3003-\u3004\u3006-\u3007\u3012-\u3013\u3020-\u3029\u3030-\u3034\u3036-\u303A\u303D-\u303F\u3042\u3044\u3046\u3048\u304A-\u3062\u3064-\u3082\u3084\u3086\u3088-\u308D\u308F-\u3094\u309F\u30A2\u30A4\u30A6\u30A8\u30AA-\u30C2\u30C4-\u30E2\u30E4\u30E6\u30E8-\u30ED\u30EF-\u30F4\u30F7-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u3200-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA014\uA016-\uA48C\uA490-\uA4C6\uF900-\uFAFF\uFE30-\uFE34\uFE45-\uFE46\uFE49-\uFE4F\uFE51\uFE58\uFE5F-\uFE66\uFE68\uFE6B\uFF02-\uFF03\uFF06-\uFF07\uFF0A-\uFF0B\uFF0D\uFF0F-\uFF19\uFF1C-\uFF1E\uFF20-\uFF3A\uFF3C\uFF3E-\uFF5A\uFF5C\uFF5E\uFF66\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\uFFE2-\uFFE4]/, /[\u2024-\u2026\u22EF\uFE19]/, /[\u002D]/, /[\u0009\u007C\u00AD\u058A\u05BE\u0964-\u0965\u0E5A-\u0E5B\u0F0B\u0F34\u0F7F\u0F85\u0FBE-\u0FBF\u0FD2\u104A-\u104B\u1361\u1400\u1680\u16EB-\u16ED\u1735-\u1736\u17D4-\u17D5\u17D8\u17DA\u1804-\u1805\u1B5A-\u1B5B\u1B5D-\u1B60\u1C3B-\u1C3F\u1C7E-\u1C7F\u2000-\u2006\u2008-\u200A\u2010\u2012-\u2013\u2027\u2056\u2058-\u205B\u205D-\u205F\u2CFA-\u2CFC\u2CFF\u2D70\u2E0E-\u2E15\u2E17\u2E19\u2E2A-\u2E2D\u2E30-\u2E31\u2E33-\u2E34\u2E3C-\u2E3E\u2E40-\u2E41\u2E43-\u2E44\u3000\uA4FE-\uA4FF\uA60D\uA60F\uA6F3-\uA6F7\uA8CE-\uA8CF\uA92E-\uA92F\uA9C7-\uA9C9\uAA5D-\uAA5F\uAAF0-\uAAF1\uABEB]/, /[\u00B4\u02C8\u02CC\u02DF\u0F01-\u0F04\u0F06-\u0F07\u0F09-\u0F0A\u0FD0-\u0FD1\u0FD3\u1806\u1FFD\uA874-\uA875\uA8FC]/, /[\u2014\u2E3A-\u2E3B]/, /[\u200B]/, /[\u0000-\u0008\u000E-\u001F\u007F-\u0084\u0086-\u009F\u0300-\u034E\u0350-\u035B\u0363-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u061C\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7-\u09C8\u09CB-\u09CD\u09D7\u09E2-\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47-\u0B48\u0B4B-\u0B4D\u0B56-\u0B57\u0B62-\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5-\u0CD6\u0CE2-\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62-\u0D63\u0D82-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2-\u0DF3\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F3E-\u0F3F\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u180B-\u180D\u1885-\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u200C\u200E-\u200F\u202A-\u202E\u2066-\u206F\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3035\u3099-\u309A\uA66F-\uA672\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uAA29-\uAA36\uAA43\uAA4C-\uAA4D\uAAEB-\uAAEF\uAAF5-\uAAF6\uABE3-\uABEA\uABEC-\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFFF9-\uFFFB]/, /[\u2060\uFEFF]/, /[\uAC00\uAC1C\uAC38\uAC54\uAC70\uAC8C\uACA8\uACC4\uACE0\uACFC\uAD18\uAD34\uAD50\uAD6C\uAD88\uADA4\uADC0\uADDC\uADF8\uAE14\uAE30\uAE4C\uAE68\uAE84\uAEA0\uAEBC\uAED8\uAEF4\uAF10\uAF2C\uAF48\uAF64\uAF80\uAF9C\uAFB8\uAFD4\uAFF0\uB00C\uB028\uB044\uB060\uB07C\uB098\uB0B4\uB0D0\uB0EC\uB108\uB124\uB140\uB15C\uB178\uB194\uB1B0\uB1CC\uB1E8\uB204\uB220\uB23C\uB258\uB274\uB290\uB2AC\uB2C8\uB2E4\uB300\uB31C\uB338\uB354\uB370\uB38C\uB3A8\uB3C4\uB3E0\uB3FC\uB418\uB434\uB450\uB46C\uB488\uB4A4\uB4C0\uB4DC\uB4F8\uB514\uB530\uB54C\uB568\uB584\uB5A0\uB5BC\uB5D8\uB5F4\uB610\uB62C\uB648\uB664\uB680\uB69C\uB6B8\uB6D4\uB6F0\uB70C\uB728\uB744\uB760\uB77C\uB798\uB7B4\uB7D0\uB7EC\uB808\uB824\uB840\uB85C\uB878\uB894\uB8B0\uB8CC\uB8E8\uB904\uB920\uB93C\uB958\uB974\uB990\uB9AC\uB9C8\uB9E4\uBA00\uBA1C\uBA38\uBA54\uBA70\uBA8C\uBAA8\uBAC4\uBAE0\uBAFC\uBB18\uBB34\uBB50\uBB6C\uBB88\uBBA4\uBBC0\uBBDC\uBBF8\uBC14\uBC30\uBC4C\uBC68\uBC84\uBCA0\uBCBC\uBCD8\uBCF4\uBD10\uBD2C\uBD48\uBD64\uBD80\uBD9C\uBDB8\uBDD4\uBDF0\uBE0C\uBE28\uBE44\uBE60\uBE7C\uBE98\uBEB4\uBED0\uBEEC\uBF08\uBF24\uBF40\uBF5C\uBF78\uBF94\uBFB0\uBFCC\uBFE8\uC004\uC020\uC03C\uC058\uC074\uC090\uC0AC\uC0C8\uC0E4\uC100\uC11C\uC138\uC154\uC170\uC18C\uC1A8\uC1C4\uC1E0\uC1FC\uC218\uC234\uC250\uC26C\uC288\uC2A4\uC2C0\uC2DC\uC2F8\uC314\uC330\uC34C\uC368\uC384\uC3A0\uC3BC\uC3D8\uC3F4\uC410\uC42C\uC448\uC464\uC480\uC49C\uC4B8\uC4D4\uC4F0\uC50C\uC528\uC544\uC560\uC57C\uC598\uC5B4\uC5D0\uC5EC\uC608\uC624\uC640\uC65C\uC678\uC694\uC6B0\uC6CC\uC6E8\uC704\uC720\uC73C\uC758\uC774\uC790\uC7AC\uC7C8\uC7E4\uC800\uC81C\uC838\uC854\uC870\uC88C\uC8A8\uC8C4\uC8E0\uC8FC\uC918\uC934\uC950\uC96C\uC988\uC9A4\uC9C0\uC9DC\uC9F8\uCA14\uCA30\uCA4C\uCA68\uCA84\uCAA0\uCABC\uCAD8\uCAF4\uCB10\uCB2C\uCB48\uCB64\uCB80\uCB9C\uCBB8\uCBD4\uCBF0\uCC0C\uCC28\uCC44\uCC60\uCC7C\uCC98\uCCB4\uCCD0\uCCEC\uCD08\uCD24\uCD40\uCD5C\uCD78\uCD94\uCDB0\uCDCC\uCDE8\uCE04\uCE20\uCE3C\uCE58\uCE74\uCE90\uCEAC\uCEC8\uCEE4\uCF00\uCF1C\uCF38\uCF54\uCF70\uCF8C\uCFA8\uCFC4\uCFE0\uCFFC\uD018\uD034\uD050\uD06C\uD088\uD0A4\uD0C0\uD0DC\uD0F8\uD114\uD130\uD14C\uD168\uD184\uD1A0\uD1BC\uD1D8\uD1F4\uD210\uD22C\uD248\uD264\uD280\uD29C\uD2B8\uD2D4\uD2F0\uD30C\uD328\uD344\uD360\uD37C\uD398\uD3B4\uD3D0\uD3EC\uD408\uD424\uD440\uD45C\uD478\uD494\uD4B0\uD4CC\uD4E8\uD504\uD520\uD53C\uD558\uD574\uD590\uD5AC\uD5C8\uD5E4\uD600\uD61C\uD638\uD654\uD670\uD68C\uD6A8\uD6C4\uD6E0\uD6FC\uD718\uD734\uD750\uD76C\uD788]/, /[\uAC01-\uAC1B\uAC1D-\uAC37\uAC39-\uAC53\uAC55-\uAC6F\uAC71-\uAC8B\uAC8D-\uACA7\uACA9-\uACC3\uACC5-\uACDF\uACE1-\uACFB\uACFD-\uAD17\uAD19-\uAD33\uAD35-\uAD4F\uAD51-\uAD6B\uAD6D-\uAD87\uAD89-\uADA3\uADA5-\uADBF\uADC1-\uADDB\uADDD-\uADF7\uADF9-\uAE13\uAE15-\uAE2F\uAE31-\uAE4B\uAE4D-\uAE67\uAE69-\uAE83\uAE85-\uAE9F\uAEA1-\uAEBB\uAEBD-\uAED7\uAED9-\uAEF3\uAEF5-\uAF0F\uAF11-\uAF2B\uAF2D-\uAF47\uAF49-\uAF63\uAF65-\uAF7F\uAF81-\uAF9B\uAF9D-\uAFB7\uAFB9-\uAFD3\uAFD5-\uAFEF\uAFF1-\uB00B\uB00D-\uB027\uB029-\uB043\uB045-\uB05F\uB061-\uB07B\uB07D-\uB097\uB099-\uB0B3\uB0B5-\uB0CF\uB0D1-\uB0EB\uB0ED-\uB107\uB109-\uB123\uB125-\uB13F\uB141-\uB15B\uB15D-\uB177\uB179-\uB193\uB195-\uB1AF\uB1B1-\uB1CB\uB1CD-\uB1E7\uB1E9-\uB203\uB205-\uB21F\uB221-\uB23B\uB23D-\uB257\uB259-\uB273\uB275-\uB28F\uB291-\uB2AB\uB2AD-\uB2C7\uB2C9-\uB2E3\uB2E5-\uB2FF\uB301-\uB31B\uB31D-\uB337\uB339-\uB353\uB355-\uB36F\uB371-\uB38B\uB38D-\uB3A7\uB3A9-\uB3C3\uB3C5-\uB3DF\uB3E1-\uB3FB\uB3FD-\uB417\uB419-\uB433\uB435-\uB44F\uB451-\uB46B\uB46D-\uB487\uB489-\uB4A3\uB4A5-\uB4BF\uB4C1-\uB4DB\uB4DD-\uB4F7\uB4F9-\uB513\uB515-\uB52F\uB531-\uB54B\uB54D-\uB567\uB569-\uB583\uB585-\uB59F\uB5A1-\uB5BB\uB5BD-\uB5D7\uB5D9-\uB5F3\uB5F5-\uB60F\uB611-\uB62B\uB62D-\uB647\uB649-\uB663\uB665-\uB67F\uB681-\uB69B\uB69D-\uB6B7\uB6B9-\uB6D3\uB6D5-\uB6EF\uB6F1-\uB70B\uB70D-\uB727\uB729-\uB743\uB745-\uB75F\uB761-\uB77B\uB77D-\uB797\uB799-\uB7B3\uB7B5-\uB7CF\uB7D1-\uB7EB\uB7ED-\uB807\uB809-\uB823\uB825-\uB83F\uB841-\uB85B\uB85D-\uB877\uB879-\uB893\uB895-\uB8AF\uB8B1-\uB8CB\uB8CD-\uB8E7\uB8E9-\uB903\uB905-\uB91F\uB921-\uB93B\uB93D-\uB957\uB959-\uB973\uB975-\uB98F\uB991-\uB9AB\uB9AD-\uB9C7\uB9C9-\uB9E3\uB9E5-\uB9FF\uBA01-\uBA1B\uBA1D-\uBA37\uBA39-\uBA53\uBA55-\uBA6F\uBA71-\uBA8B\uBA8D-\uBAA7\uBAA9-\uBAC3\uBAC5-\uBADF\uBAE1-\uBAFB\uBAFD-\uBB17\uBB19-\uBB33\uBB35-\uBB4F\uBB51-\uBB6B\uBB6D-\uBB87\uBB89-\uBBA3\uBBA5-\uBBBF\uBBC1-\uBBDB\uBBDD-\uBBF7\uBBF9-\uBC13\uBC15-\uBC2F\uBC31-\uBC4B\uBC4D-\uBC67\uBC69-\uBC83\uBC85-\uBC9F\uBCA1-\uBCBB\uBCBD-\uBCD7\uBCD9-\uBCF3\uBCF5-\uBD0F\uBD11-\uBD2B\uBD2D-\uBD47\uBD49-\uBD63\uBD65-\uBD7F\uBD81-\uBD9B\uBD9D-\uBDB7\uBDB9-\uBDD3\uBDD5-\uBDEF\uBDF1-\uBE0B\uBE0D-\uBE27\uBE29-\uBE43\uBE45-\uBE5F\uBE61-\uBE7B\uBE7D-\uBE97\uBE99-\uBEB3\uBEB5-\uBECF\uBED1-\uBEEB\uBEED-\uBF07\uBF09-\uBF23\uBF25-\uBF3F\uBF41-\uBF5B\uBF5D-\uBF77\uBF79-\uBF93\uBF95-\uBFAF\uBFB1-\uBFCB\uBFCD-\uBFE7\uBFE9-\uC003\uC005-\uC01F\uC021-\uC03B\uC03D-\uC057\uC059-\uC073\uC075-\uC08F\uC091-\uC0AB\uC0AD-\uC0C7\uC0C9-\uC0E3\uC0E5-\uC0FF\uC101-\uC11B\uC11D-\uC137\uC139-\uC153\uC155-\uC16F\uC171-\uC18B\uC18D-\uC1A7\uC1A9-\uC1C3\uC1C5-\uC1DF\uC1E1-\uC1FB\uC1FD-\uC217\uC219-\uC233\uC235-\uC24F\uC251-\uC26B\uC26D-\uC287\uC289-\uC2A3\uC2A5-\uC2BF\uC2C1-\uC2DB\uC2DD-\uC2F7\uC2F9-\uC313\uC315-\uC32F\uC331-\uC34B\uC34D-\uC367\uC369-\uC383\uC385-\uC39F\uC3A1-\uC3BB\uC3BD-\uC3D7\uC3D9-\uC3F3\uC3F5-\uC40F\uC411-\uC42B\uC42D-\uC447\uC449-\uC463\uC465-\uC47F\uC481-\uC49B\uC49D-\uC4B7\uC4B9-\uC4D3\uC4D5-\uC4EF\uC4F1-\uC50B\uC50D-\uC527\uC529-\uC543\uC545-\uC55F\uC561-\uC57B\uC57D-\uC597\uC599-\uC5B3\uC5B5-\uC5CF\uC5D1-\uC5EB\uC5ED-\uC607\uC609-\uC623\uC625-\uC63F\uC641-\uC65B\uC65D-\uC677\uC679-\uC693\uC695-\uC6AF\uC6B1-\uC6CB\uC6CD-\uC6E7\uC6E9-\uC703\uC705-\uC71F\uC721-\uC73B\uC73D-\uC757\uC759-\uC773\uC775-\uC78F\uC791-\uC7AB\uC7AD-\uC7C7\uC7C9-\uC7E3\uC7E5-\uC7FF\uC801-\uC81B\uC81D-\uC837\uC839-\uC853\uC855-\uC86F\uC871-\uC88B\uC88D-\uC8A7\uC8A9-\uC8C3\uC8C5-\uC8DF\uC8E1-\uC8FB\uC8FD-\uC917\uC919-\uC933\uC935-\uC94F\uC951-\uC96B\uC96D-\uC987\uC989-\uC9A3\uC9A5-\uC9BF\uC9C1-\uC9DB\uC9DD-\uC9F7\uC9F9-\uCA13\uCA15-\uCA2F\uCA31-\uCA4B\uCA4D-\uCA67\uCA69-\uCA83\uCA85-\uCA9F\uCAA1-\uCABB\uCABD-\uCAD7\uCAD9-\uCAF3\uCAF5-\uCB0F\uCB11-\uCB2B\uCB2D-\uCB47\uCB49-\uCB63\uCB65-\uCB7F\uCB81-\uCB9B\uCB9D-\uCBB7\uCBB9-\uCBD3\uCBD5-\uCBEF\uCBF1-\uCC0B\uCC0D-\uCC27\uCC29-\uCC43\uCC45-\uCC5F\uCC61-\uCC7B\uCC7D-\uCC97\uCC99-\uCCB3\uCCB5-\uCCCF\uCCD1-\uCCEB\uCCED-\uCD07\uCD09-\uCD23\uCD25-\uCD3F\uCD41-\uCD5B\uCD5D-\uCD77\uCD79-\uCD93\uCD95-\uCDAF\uCDB1-\uCDCB\uCDCD-\uCDE7\uCDE9-\uCE03\uCE05-\uCE1F\uCE21-\uCE3B\uCE3D-\uCE57\uCE59-\uCE73\uCE75-\uCE8F\uCE91-\uCEAB\uCEAD-\uCEC7\uCEC9-\uCEE3\uCEE5-\uCEFF\uCF01-\uCF1B\uCF1D-\uCF37\uCF39-\uCF53\uCF55-\uCF6F\uCF71-\uCF8B\uCF8D-\uCFA7\uCFA9-\uCFC3\uCFC5-\uCFDF\uCFE1-\uCFFB\uCFFD-\uD017\uD019-\uD033\uD035-\uD04F\uD051-\uD06B\uD06D-\uD087\uD089-\uD0A3\uD0A5-\uD0BF\uD0C1-\uD0DB\uD0DD-\uD0F7\uD0F9-\uD113\uD115-\uD12F\uD131-\uD14B\uD14D-\uD167\uD169-\uD183\uD185-\uD19F\uD1A1-\uD1BB\uD1BD-\uD1D7\uD1D9-\uD1F3\uD1F5-\uD20F\uD211-\uD22B\uD22D-\uD247\uD249-\uD263\uD265-\uD27F\uD281-\uD29B\uD29D-\uD2B7\uD2B9-\uD2D3\uD2D5-\uD2EF\uD2F1-\uD30B\uD30D-\uD327\uD329-\uD343\uD345-\uD35F\uD361-\uD37B\uD37D-\uD397\uD399-\uD3B3\uD3B5-\uD3CF\uD3D1-\uD3EB\uD3ED-\uD407\uD409-\uD423\uD425-\uD43F\uD441-\uD45B\uD45D-\uD477\uD479-\uD493\uD495-\uD4AF\uD4B1-\uD4CB\uD4CD-\uD4E7\uD4E9-\uD503\uD505-\uD51F\uD521-\uD53B\uD53D-\uD557\uD559-\uD573\uD575-\uD58F\uD591-\uD5AB\uD5AD-\uD5C7\uD5C9-\uD5E3\uD5E5-\uD5FF\uD601-\uD61B\uD61D-\uD637\uD639-\uD653\uD655-\uD66F\uD671-\uD68B\uD68D-\uD6A7\uD6A9-\uD6C3\uD6C5-\uD6DF\uD6E1-\uD6FB\uD6FD-\uD717\uD719-\uD733\uD735-\uD74F\uD751-\uD76B\uD76D-\uD787\uD789-\uD7A3]/, /[\u1100-\u115F\uA960-\uA97C]/, /[\u1160-\u11A7\uD7B0-\uD7C6]/, /[\u11A8-\u11FF\uD7CB-\uD7FB]/, /[\u261D\u26F9\u270A-\u270D]/, /[\u0E01-\u0E3A\u0E40-\u0E4E\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0EDC-\u0EDF\u1000-\u103F\u1050-\u108F\u109A-\u109F\u1780-\u17D3\u17D7\u17DC-\u17DD\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19DA\u19DE-\u19DF\u1A20-\u1A5E\u1A60-\u1A7C\u1AA0-\u1AAD\uA9E0-\uA9EF\uA9FA-\uA9FE\uAA60-\uAAC2\uAADB-\uAADF]/, /[\u0020]/, /[\u000B-\u000C\u2028-\u2029]/, /[\u000D]/, /[\u000A]/, /[\u0085]/, /[\uFFFC]/, /[\uD800-\uDFFF]/, /[\u00A7-\u00A8\u00AA\u00B2-\u00B3\u00B6-\u00BA\u00BC-\u00BE\u00D7\u00F7\u02C7\u02C9-\u02CB\u02CD\u02D0\u02D8-\u02DB\u02DD\u2015-\u2016\u2020-\u2021\u203B\u2074\u207F\u2081-\u2084\u2105\u2113\u2121-\u2122\u212B\u2154-\u2155\u215B\u215E\u2160-\u216B\u2170-\u2179\u2189\u2190-\u2199\u21D2\u21D4\u2200\u2202-\u2203\u2207-\u2208\u220B\u220F\u2211\u2215\u221A\u221D-\u2220\u2223\u2225\u2227-\u222C\u222E\u2234-\u2237\u223C-\u223D\u2248\u224C\u2252\u2260-\u2261\u2264-\u2267\u226A-\u226B\u226E-\u226F\u2282-\u2283\u2286-\u2287\u2295\u2299\u22A5\u22BF\u2312\u2460-\u24FE\u2500-\u254B\u2550-\u2574\u2580-\u258F\u2592-\u2595\u25A0-\u25A1\u25A3-\u25A9\u25B2-\u25B3\u25B6-\u25B7\u25BC-\u25BD\u25C0-\u25C1\u25C6-\u25C8\u25CB\u25CE-\u25D1\u25E2-\u25E5\u25EF\u2605-\u2606\u2609\u260E-\u260F\u2616-\u2617\u2640\u2642\u2660-\u2661\u2663-\u2665\u2667\u2669-\u266A\u266C-\u266D\u266F\u269E-\u269F\u26C9-\u26CC\u26D2\u26D5-\u26D7\u26DA-\u26DB\u26DD-\u26DE\u26E3\u26E8-\u26E9\u26EB-\u26F0\u26F6\u26FB-\u26FC\u2757\u2776-\u2793\u2B55-\u2B59\u3248-\u324F\uFFFD]/, /[\uE000-\uF8FF]/, /[\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u3095-\u3096\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5-\u30F6\u30FC\u31F0-\u31FF\uFF67-\uFF70]/],
    P = ["^^^^^^^^^^^^^^^^^^^^^@^^^^^^^", "_^^%%^^^^%%_____%%__^#^______", "_^^%%^^^^%%%%%__%%__^#^______", "^^^%%%^^^%%%%%%%%%%%^#^%%%%%%", "%^^%%%^^^%%%%%%%%%%%^#^%%%%%%", "_^^%%%^^^_______%%__^#^______", "_^^%%%^^^______%%%__^#^______", "_^^%%%^^^__%_%__%%__^#^______", "_^^%%%^^^__%%%__%%__^#^______", "%^^%%%^^^__%%%%_%%__^#^%%%%%%", "%^^%%%^^^__%%%__%%__^#^______", "%^^%%%^^^%%%%%_%%%__^#^______", "%^^%%%^^^%%%%%_%%%__^#^______", "%^^%%%^^^%%%%%_%%%__^#^______", "_^^%%%^^^_%____%%%__^#^______", "_^^%%%^^^______%%%__^#^______", "_^^%_%^^^__%____%%__^#^______", "_^^%_%^^^_______%%__^#^______", "%^^%%%^^^%%%%%%%%%%%^#^%%%%%%", "_^^%%%^^^_______%%_^^#^______", "____________________^________", "%^^%%%^^^%%%%%_%%%__^#^______", "%^^%%%^^^%%%%%%%%%%%^#^%%%%%%", "_^^%%%^^^_%____%%%__^#^___%%_", "_^^%%%^^^_%____%%%__^#^____%_", "_^^%%%^^^_%____%%%__^#^%%%%__", "_^^%%%^^^_%____%%%__^#^___%%_", "_^^%%%^^^_%____%%%__^#^____%_", "_^^%%%^^^_%____%%%__^#^______"],
    s = {
        _: B = 0,
        "%": k = 1,
        "#": d = 2,
        "@": p = 3,
        "^": q = 4,
        "!": F = 5
    },
    ot = function(t) {
        var e, u, i, o;
        for (u = i = 0,
        o = j.length; o > i; u = ++i)
            if (e = j[u],
            e.test(t))
                return u;
        return et
    }
    ,
    ct = function(t) {
        switch (t) {
        case et:
        case e:
        case W:
        case N:
            return u;
        case a:
            return i;
        case I:
            return n;
        case h:
            return x;
        default:
            return t
        }
    }
    ,
    dt = function(t) {
        var e, u, i, o;
        for (o = [],
        u = 0,
        i = t.length; i > u; u++)
            e = t[u],
            o.push(ct(ot(e)));
        return o
    }
    ,
    g = [/[\u000D]/, /[\u000A]/, /[\u0000-\u0009\u000B-\u000C\u000E-\u001F\u007F-\u009F\u00AD\u061C\u180E\u200B\u200E-\u200F\u2028-\u202E\u2060-\u206F\uD800-\uDFFF\uFEFF\uFFF0-\uFFFB]/, /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2-\u09E3\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0B01\u0B3C\u0B3E-\u0B3F\u0B41-\u0B44\u0B4D\u0B56-\u0B57\u0B62-\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC-\u0CCD\u0CD5-\u0CD6\u0CE2-\u0CE3\u0D01\u0D3E\u0D41-\u0D44\u0D4D\u0D57\u0D62-\u0D63\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885-\u1886\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099-\u309A\uA66F-\uA672\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA825-\uA826\uA8C4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E-\uFF9F]/, /[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0982-\u0983\u09BF-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0B02-\u0B03\u0B40\u0B47-\u0B48\u0B4B-\u0B4C\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0C01-\u0C03\u0C41-\u0C44\u0C82-\u0C83\u0CBE\u0CC0-\u0CC1\u0CC3-\u0CC4\u0CC7-\u0CC8\u0CCA-\u0CCB\u0D02-\u0D03\u0D3F-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D82-\u0D83\u0DD0-\u0DD1\u0DD8-\u0DDE\u0DF2-\u0DF3\u0E33\u0EB3\u0F3E-\u0F3F\u0F7F\u1031\u103B-\u103C\u1056-\u1057\u1084\u17B6\u17BE-\u17C5\u17C7-\u17C8\u1923-\u1926\u1929-\u192B\u1930-\u1931\u1933-\u1938\u1A19-\u1A1A\u1A55\u1A57\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B82\u1BA1\u1BA6-\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1C24-\u1C2B\u1C34-\u1C35\u1CE1\u1CF2-\u1CF3\uA823-\uA824\uA827\uA880-\uA881\uA8B4-\uA8C3\uA952-\uA953\uA983\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uAA2F-\uAA30\uAA33-\uAA34\uAA4D\uAAEB\uAAEE-\uAAEF\uAAF5\uABE3-\uABE4\uABE6-\uABE7\uABE9-\uABEA\uABEC]/, /[\u1100-\u115F\uA960-\uA97C]/, /[\u1160-\u11A7\uD7B0-\uD7C6]/, /[\u11A8-\u11FF\uD7CB-\uD7FB]/, /[\uAC00\uAC1C\uAC38\uAC54\uAC70\uAC8C\uACA8\uACC4\uACE0\uACFC\uAD18\uAD34\uAD50\uAD6C\uAD88\uADA4\uADC0\uADDC\uADF8\uAE14\uAE30\uAE4C\uAE68\uAE84\uAEA0\uAEBC\uAED8\uAEF4\uAF10\uAF2C\uAF48\uAF64\uAF80\uAF9C\uAFB8\uAFD4\uAFF0\uB00C\uB028\uB044\uB060\uB07C\uB098\uB0B4\uB0D0\uB0EC\uB108\uB124\uB140\uB15C\uB178\uB194\uB1B0\uB1CC\uB1E8\uB204\uB220\uB23C\uB258\uB274\uB290\uB2AC\uB2C8\uB2E4\uB300\uB31C\uB338\uB354\uB370\uB38C\uB3A8\uB3C4\uB3E0\uB3FC\uB418\uB434\uB450\uB46C\uB488\uB4A4\uB4C0\uB4DC\uB4F8\uB514\uB530\uB54C\uB568\uB584\uB5A0\uB5BC\uB5D8\uB5F4\uB610\uB62C\uB648\uB664\uB680\uB69C\uB6B8\uB6D4\uB6F0\uB70C\uB728\uB744\uB760\uB77C\uB798\uB7B4\uB7D0\uB7EC\uB808\uB824\uB840\uB85C\uB878\uB894\uB8B0\uB8CC\uB8E8\uB904\uB920\uB93C\uB958\uB974\uB990\uB9AC\uB9C8\uB9E4\uBA00\uBA1C\uBA38\uBA54\uBA70\uBA8C\uBAA8\uBAC4\uBAE0\uBAFC\uBB18\uBB34\uBB50\uBB6C\uBB88\uBBA4\uBBC0\uBBDC\uBBF8\uBC14\uBC30\uBC4C\uBC68\uBC84\uBCA0\uBCBC\uBCD8\uBCF4\uBD10\uBD2C\uBD48\uBD64\uBD80\uBD9C\uBDB8\uBDD4\uBDF0\uBE0C\uBE28\uBE44\uBE60\uBE7C\uBE98\uBEB4\uBED0\uBEEC\uBF08\uBF24\uBF40\uBF5C\uBF78\uBF94\uBFB0\uBFCC\uBFE8\uC004\uC020\uC03C\uC058\uC074\uC090\uC0AC\uC0C8\uC0E4\uC100\uC11C\uC138\uC154\uC170\uC18C\uC1A8\uC1C4\uC1E0\uC1FC\uC218\uC234\uC250\uC26C\uC288\uC2A4\uC2C0\uC2DC\uC2F8\uC314\uC330\uC34C\uC368\uC384\uC3A0\uC3BC\uC3D8\uC3F4\uC410\uC42C\uC448\uC464\uC480\uC49C\uC4B8\uC4D4\uC4F0\uC50C\uC528\uC544\uC560\uC57C\uC598\uC5B4\uC5D0\uC5EC\uC608\uC624\uC640\uC65C\uC678\uC694\uC6B0\uC6CC\uC6E8\uC704\uC720\uC73C\uC758\uC774\uC790\uC7AC\uC7C8\uC7E4\uC800\uC81C\uC838\uC854\uC870\uC88C\uC8A8\uC8C4\uC8E0\uC8FC\uC918\uC934\uC950\uC96C\uC988\uC9A4\uC9C0\uC9DC\uC9F8\uCA14\uCA30\uCA4C\uCA68\uCA84\uCAA0\uCABC\uCAD8\uCAF4\uCB10\uCB2C\uCB48\uCB64\uCB80\uCB9C\uCBB8\uCBD4\uCBF0\uCC0C\uCC28\uCC44\uCC60\uCC7C\uCC98\uCCB4\uCCD0\uCCEC\uCD08\uCD24\uCD40\uCD5C\uCD78\uCD94\uCDB0\uCDCC\uCDE8\uCE04\uCE20\uCE3C\uCE58\uCE74\uCE90\uCEAC\uCEC8\uCEE4\uCF00\uCF1C\uCF38\uCF54\uCF70\uCF8C\uCFA8\uCFC4\uCFE0\uCFFC\uD018\uD034\uD050\uD06C\uD088\uD0A4\uD0C0\uD0DC\uD0F8\uD114\uD130\uD14C\uD168\uD184\uD1A0\uD1BC\uD1D8\uD1F4\uD210\uD22C\uD248\uD264\uD280\uD29C\uD2B8\uD2D4\uD2F0\uD30C\uD328\uD344\uD360\uD37C\uD398\uD3B4\uD3D0\uD3EC\uD408\uD424\uD440\uD45C\uD478\uD494\uD4B0\uD4CC\uD4E8\uD504\uD520\uD53C\uD558\uD574\uD590\uD5AC\uD5C8\uD5E4\uD600\uD61C\uD638\uD654\uD670\uD68C\uD6A8\uD6C4\uD6E0\uD6FC\uD718\uD734\uD750\uD76C\uD788]/, /[\uAC01-\uAC1B\uAC1D-\uAC37\uAC39-\uAC53\uAC55-\uAC6F\uAC71-\uAC8B\uAC8D-\uACA7\uACA9-\uACC3\uACC5-\uACDF\uACE1-\uACFB\uACFD-\uAD17\uAD19-\uAD33\uAD35-\uAD4F\uAD51-\uAD6B\uAD6D-\uAD87\uAD89-\uADA3\uADA5-\uADBF\uADC1-\uADDB\uADDD-\uADF7\uADF9-\uAE13\uAE15-\uAE2F\uAE31-\uAE4B\uAE4D-\uAE67\uAE69-\uAE83\uAE85-\uAE9F\uAEA1-\uAEBB\uAEBD-\uAED7\uAED9-\uAEF3\uAEF5-\uAF0F\uAF11-\uAF2B\uAF2D-\uAF47\uAF49-\uAF63\uAF65-\uAF7F\uAF81-\uAF9B\uAF9D-\uAFB7\uAFB9-\uAFD3\uAFD5-\uAFEF\uAFF1-\uB00B\uB00D-\uB027\uB029-\uB043\uB045-\uB05F\uB061-\uB07B\uB07D-\uB097\uB099-\uB0B3\uB0B5-\uB0CF\uB0D1-\uB0EB\uB0ED-\uB107\uB109-\uB123\uB125-\uB13F\uB141-\uB15B\uB15D-\uB177\uB179-\uB193\uB195-\uB1AF\uB1B1-\uB1CB\uB1CD-\uB1E7\uB1E9-\uB203\uB205-\uB21F\uB221-\uB23B\uB23D-\uB257\uB259-\uB273\uB275-\uB28F\uB291-\uB2AB\uB2AD-\uB2C7\uB2C9-\uB2E3\uB2E5-\uB2FF\uB301-\uB31B\uB31D-\uB337\uB339-\uB353\uB355-\uB36F\uB371-\uB38B\uB38D-\uB3A7\uB3A9-\uB3C3\uB3C5-\uB3DF\uB3E1-\uB3FB\uB3FD-\uB417\uB419-\uB433\uB435-\uB44F\uB451-\uB46B\uB46D-\uB487\uB489-\uB4A3\uB4A5-\uB4BF\uB4C1-\uB4DB\uB4DD-\uB4F7\uB4F9-\uB513\uB515-\uB52F\uB531-\uB54B\uB54D-\uB567\uB569-\uB583\uB585-\uB59F\uB5A1-\uB5BB\uB5BD-\uB5D7\uB5D9-\uB5F3\uB5F5-\uB60F\uB611-\uB62B\uB62D-\uB647\uB649-\uB663\uB665-\uB67F\uB681-\uB69B\uB69D-\uB6B7\uB6B9-\uB6D3\uB6D5-\uB6EF\uB6F1-\uB70B\uB70D-\uB727\uB729-\uB743\uB745-\uB75F\uB761-\uB77B\uB77D-\uB797\uB799-\uB7B3\uB7B5-\uB7CF\uB7D1-\uB7EB\uB7ED-\uB807\uB809-\uB823\uB825-\uB83F\uB841-\uB85B\uB85D-\uB877\uB879-\uB893\uB895-\uB8AF\uB8B1-\uB8CB\uB8CD-\uB8E7\uB8E9-\uB903\uB905-\uB91F\uB921-\uB93B\uB93D-\uB957\uB959-\uB973\uB975-\uB98F\uB991-\uB9AB\uB9AD-\uB9C7\uB9C9-\uB9E3\uB9E5-\uB9FF\uBA01-\uBA1B\uBA1D-\uBA37\uBA39-\uBA53\uBA55-\uBA6F\uBA71-\uBA8B\uBA8D-\uBAA7\uBAA9-\uBAC3\uBAC5-\uBADF\uBAE1-\uBAFB\uBAFD-\uBB17\uBB19-\uBB33\uBB35-\uBB4F\uBB51-\uBB6B\uBB6D-\uBB87\uBB89-\uBBA3\uBBA5-\uBBBF\uBBC1-\uBBDB\uBBDD-\uBBF7\uBBF9-\uBC13\uBC15-\uBC2F\uBC31-\uBC4B\uBC4D-\uBC67\uBC69-\uBC83\uBC85-\uBC9F\uBCA1-\uBCBB\uBCBD-\uBCD7\uBCD9-\uBCF3\uBCF5-\uBD0F\uBD11-\uBD2B\uBD2D-\uBD47\uBD49-\uBD63\uBD65-\uBD7F\uBD81-\uBD9B\uBD9D-\uBDB7\uBDB9-\uBDD3\uBDD5-\uBDEF\uBDF1-\uBE0B\uBE0D-\uBE27\uBE29-\uBE43\uBE45-\uBE5F\uBE61-\uBE7B\uBE7D-\uBE97\uBE99-\uBEB3\uBEB5-\uBECF\uBED1-\uBEEB\uBEED-\uBF07\uBF09-\uBF23\uBF25-\uBF3F\uBF41-\uBF5B\uBF5D-\uBF77\uBF79-\uBF93\uBF95-\uBFAF\uBFB1-\uBFCB\uBFCD-\uBFE7\uBFE9-\uC003\uC005-\uC01F\uC021-\uC03B\uC03D-\uC057\uC059-\uC073\uC075-\uC08F\uC091-\uC0AB\uC0AD-\uC0C7\uC0C9-\uC0E3\uC0E5-\uC0FF\uC101-\uC11B\uC11D-\uC137\uC139-\uC153\uC155-\uC16F\uC171-\uC18B\uC18D-\uC1A7\uC1A9-\uC1C3\uC1C5-\uC1DF\uC1E1-\uC1FB\uC1FD-\uC217\uC219-\uC233\uC235-\uC24F\uC251-\uC26B\uC26D-\uC287\uC289-\uC2A3\uC2A5-\uC2BF\uC2C1-\uC2DB\uC2DD-\uC2F7\uC2F9-\uC313\uC315-\uC32F\uC331-\uC34B\uC34D-\uC367\uC369-\uC383\uC385-\uC39F\uC3A1-\uC3BB\uC3BD-\uC3D7\uC3D9-\uC3F3\uC3F5-\uC40F\uC411-\uC42B\uC42D-\uC447\uC449-\uC463\uC465-\uC47F\uC481-\uC49B\uC49D-\uC4B7\uC4B9-\uC4D3\uC4D5-\uC4EF\uC4F1-\uC50B\uC50D-\uC527\uC529-\uC543\uC545-\uC55F\uC561-\uC57B\uC57D-\uC597\uC599-\uC5B3\uC5B5-\uC5CF\uC5D1-\uC5EB\uC5ED-\uC607\uC609-\uC623\uC625-\uC63F\uC641-\uC65B\uC65D-\uC677\uC679-\uC693\uC695-\uC6AF\uC6B1-\uC6CB\uC6CD-\uC6E7\uC6E9-\uC703\uC705-\uC71F\uC721-\uC73B\uC73D-\uC757\uC759-\uC773\uC775-\uC78F\uC791-\uC7AB\uC7AD-\uC7C7\uC7C9-\uC7E3\uC7E5-\uC7FF\uC801-\uC81B\uC81D-\uC837\uC839-\uC853\uC855-\uC86F\uC871-\uC88B\uC88D-\uC8A7\uC8A9-\uC8C3\uC8C5-\uC8DF\uC8E1-\uC8FB\uC8FD-\uC917\uC919-\uC933\uC935-\uC94F\uC951-\uC96B\uC96D-\uC987\uC989-\uC9A3\uC9A5-\uC9BF\uC9C1-\uC9DB\uC9DD-\uC9F7\uC9F9-\uCA13\uCA15-\uCA2F\uCA31-\uCA4B\uCA4D-\uCA67\uCA69-\uCA83\uCA85-\uCA9F\uCAA1-\uCABB\uCABD-\uCAD7\uCAD9-\uCAF3\uCAF5-\uCB0F\uCB11-\uCB2B\uCB2D-\uCB47\uCB49-\uCB63\uCB65-\uCB7F\uCB81-\uCB9B\uCB9D-\uCBB7\uCBB9-\uCBD3\uCBD5-\uCBEF\uCBF1-\uCC0B\uCC0D-\uCC27\uCC29-\uCC43\uCC45-\uCC5F\uCC61-\uCC7B\uCC7D-\uCC97\uCC99-\uCCB3\uCCB5-\uCCCF\uCCD1-\uCCEB\uCCED-\uCD07\uCD09-\uCD23\uCD25-\uCD3F\uCD41-\uCD5B\uCD5D-\uCD77\uCD79-\uCD93\uCD95-\uCDAF\uCDB1-\uCDCB\uCDCD-\uCDE7\uCDE9-\uCE03\uCE05-\uCE1F\uCE21-\uCE3B\uCE3D-\uCE57\uCE59-\uCE73\uCE75-\uCE8F\uCE91-\uCEAB\uCEAD-\uCEC7\uCEC9-\uCEE3\uCEE5-\uCEFF\uCF01-\uCF1B\uCF1D-\uCF37\uCF39-\uCF53\uCF55-\uCF6F\uCF71-\uCF8B\uCF8D-\uCFA7\uCFA9-\uCFC3\uCFC5-\uCFDF\uCFE1-\uCFFB\uCFFD-\uD017\uD019-\uD033\uD035-\uD04F\uD051-\uD06B\uD06D-\uD087\uD089-\uD0A3\uD0A5-\uD0BF\uD0C1-\uD0DB\uD0DD-\uD0F7\uD0F9-\uD113\uD115-\uD12F\uD131-\uD14B\uD14D-\uD167\uD169-\uD183\uD185-\uD19F\uD1A1-\uD1BB\uD1BD-\uD1D7\uD1D9-\uD1F3\uD1F5-\uD20F\uD211-\uD22B\uD22D-\uD247\uD249-\uD263\uD265-\uD27F\uD281-\uD29B\uD29D-\uD2B7\uD2B9-\uD2D3\uD2D5-\uD2EF\uD2F1-\uD30B\uD30D-\uD327\uD329-\uD343\uD345-\uD35F\uD361-\uD37B\uD37D-\uD397\uD399-\uD3B3\uD3B5-\uD3CF\uD3D1-\uD3EB\uD3ED-\uD407\uD409-\uD423\uD425-\uD43F\uD441-\uD45B\uD45D-\uD477\uD479-\uD493\uD495-\uD4AF\uD4B1-\uD4CB\uD4CD-\uD4E7\uD4E9-\uD503\uD505-\uD51F\uD521-\uD53B\uD53D-\uD557\uD559-\uD573\uD575-\uD58F\uD591-\uD5AB\uD5AD-\uD5C7\uD5C9-\uD5E3\uD5E5-\uD5FF\uD601-\uD61B\uD61D-\uD637\uD639-\uD653\uD655-\uD66F\uD671-\uD68B\uD68D-\uD6A7\uD6A9-\uD6C3\uD6C5-\uD6DF\uD6E1-\uD6FB\uD6FD-\uD717\uD719-\uD733\uD735-\uD74F\uD751-\uD76B\uD76D-\uD787\uD789-\uD7A3]/],
    m = ["_x_________", "___________", "___xx______", "___xx______", "___xx______", "___xxxxxxx_", "___xx_xx___", "___xx__x___", "___xx_xx___", "___xx__x___", "___xx______"],
    it = function(t) {
        var e, u, i, o;
        for (u = i = 0,
        o = g.length; o > i; u = ++i)
            if (e = g[u],
            e.test(t))
                return u;
        return g.length
    }
    ,
    nt = function(t, e) {
        return "_" === m[it(t[e - 1])][it(t[e])]
    }
    ,
    K = [/[\u000D]/, /[\u000A]/, /[\u000B-\u000C\u0085\u2028-\u2029]/, /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7-\u09C8\u09CB-\u09CD\u09D7\u09E2-\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47-\u0B48\u0B4B-\u0B4D\u0B56-\u0B57\u0B62-\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5-\u0CD6\u0CE2-\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62-\u0D63\u0D82-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2-\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F3E-\u0F3F\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885-\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u200C\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099-\u309A\uA66F-\uA672\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C-\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5-\uAAF6\uABE3-\uABEA\uABEC-\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E-\uFF9F]/, /[\u00AD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200E-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]/, /[\u3031-\u3035\u309B-\u309C\u30A0-\u30FA\u30FC-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF9D]/, /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05F3\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1A00-\u1A16\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u303B-\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFB00-\uFB06\uFB13-\uFB17\uFB50-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, /[\u003A\u00B7\u02D7\u0387\u05F4\u2027\uFE13\uFE55\uFF1A]/, /[\u002C\u003B\u037E\u0589\u060C-\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]/, /[\u002E\u2018-\u2019\u2024\uFE52\uFF07\uFF0E]/, /[\u0030-\u0039\u0660-\u0669\u066B\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9]/, /[\u005F\u202F\u203F-\u2040\u2054\uFE33-\uFE34\uFE4D-\uFE4F\uFF3F]/],
    Y = 5,
    X = 6,
    Z = 10,
    Q = ["_x___________", "_____________", "_____________", "___xx________", "___xx________", "___xxx_____x_", "___xx_x>_>xx_", "___xx_<______", "___xx_____<__", "___xx_<___<__", "___xx_x_>>xx_", "___xxxx___xx_", "___xx________"],
    rt = function(t) {
        var e, u, i, o;
        for (u = i = 0,
        o = K.length; o > i; u = ++i)
            if (e = K[u],
            e.test(t))
                return u;
        return K.length
    }
    ,
    st = function(t, e) {
        var u, i, o;
        switch (o = Q[u = rt(t[e - 1])][i = rt(t[e])]) {
        case "_":
            return [!0, u, i];
        case "x":
            return [!1, u, i];
        case "<":
            return [2 > e || i !== (u = rt(t[e - 2], u, i))];
        case ">":
            return [e > t.length - 2 || u !== (i = rt(t[e + 1], u, i))]
        }
    }
    ,
    t.findLBRPoints = function(t) {
        var e, u, i, o, r, n;
        for (r = this.findLBR(t),
        n = [],
        u = i = 0,
        o = r.length; o > i; u = ++i)
            e = r[u],
            e !== q && e !== p && n.push([u, e === F]);
        return n
    }
    ,
    t.findLBR = function(t) {
        var e, u, i, o, r;
        if (!t.length)
            return [];
        for (r = dt(t),
        i = 0,
        o = [q]; i < r.length; ) {
            for (u = r[i],
            u === V ? u = tt : u === L && (u = n); ++i < r.length && u !== n && (u !== C || r[i] === L); )
                if (r[i] !== n && r[i] !== L)
                    if (r[i] !== C)
                        if (r[i] !== V) {
                            if (e = s[P[u][r[i]]],
                            o[i] = e,
                            e === k)
                                r[i - 1] === V ? o[i] = k : o[i] = q;
                            else if (e === d) {
                                if (o[i] = q,
                                r[i - 1] !== V)
                                    continue;
                                o[i] = d
                            } else if (e === p && (o[i] = p,
                            r[i - 1] !== V))
                                continue;
                            u = r[i]
                        } else
                            o[i] = q;
                    else
                        o[i] = q,
                        u = C;
                else
                    o[i] = q,
                    u = n;
            o[i] = F
        }
        return o
    }
    ,
    t.isGCB = function(t, e) {
        return nt(t, e)
    }
    ,
    t.findGCBLeft = function(t, e) {
        if (2 > e)
            return 0;
        if (e > t.length)
            return t.length;
        for (; !nt(t, --e); )
            ;
        return e
    }
    ,
    t.findGCBRight = function(t, e) {
        if (e > t.length - 2)
            return t.length;
        if (0 > e)
            return 0;
        for (; !nt(t, ++e); )
            ;
        return e
    }
    ,
    t.findWBLeft = function(t, e) {
        var u, i, o, r, n;
        if (2 > e)
            return 0;
        if (e > t.length)
            return t.length;
        for (i = !1; --e > 0 && (r = st(t, e),
        o = r[0],
        u = r[1],
        n = r[2],
        i || (i = n === Y || n === X || n === Z),
        !o || !i); )
            ;
        return e
    }
    ,
    t.findWBRight = function(t, e) {
        var u, i, o, r;
        if (e > t.length - 2)
            return t.length;
        if (0 > e)
            return 0;
        for (u = !1; ++e < t.length && (r = st(t, e),
        i = r[0],
        o = r[1],
        u || (u = o === Y || o === X || o === Z),
        !i || !u); )
            ;
        return e
    }
    ,
    t.isHighSurrogate = function(t) {
        var e;
        return 55296 <= (e = t.charCodeAt(0)) && 56319 >= e
    }
    ,
    t.isLowSurrogate = function(t) {
        var e;
        return 56320 <= (e = t.charCodeAt(0)) && 57343 >= e
    }
    ,
    t
}(),
function() {
    var t, e;
    return e = function(t, e, u) {
        return 0 > u && (u += 1),
        u > 1 && (u -= 1),
        1 / 6 > u ? t + 6 * (e - t) * u : .5 > u ? e : 2 / 3 > u ? t + (e - t) * (2 / 3 - u) * 6 : t
    }
    ,
    ("undefined" != typeof window && null !== window ? window : module.exports).Color = t = {
        hsl2rgb: function(t, u) {
            var i, o, r, n, s, a, h, c;
            return r = t[0],
            c = t[1],
            n = t[2],
            r /= 360,
            c /= 100,
            n /= 100,
            0 === c ? h = o = i = n : (a = .5 > n ? n * (1 + c) : n + c - n * c,
            s = 2 * n - a,
            h = e(s, a, r + 1 / 3),
            o = e(s, a, r),
            i = e(s, a, r - 1 / 3)),
            [Math.round(255 * h), Math.round(255 * o), Math.round(255 * i)]
        },
        rgba: function(t, e) {
            var u, i, o;
            return o = t[0],
            i = t[1],
            u = t[2],
            "rgba(" + o + "," + i + "," + u + "," + e + ")"
        }
    }
}(),
function(t) {
    return function() {
        var t;
        return t = function(t, e) {
            var u, i;
            u = "/vies",
            i = ['<?xml version="1.0" encoding="UTF-8"?>', '<SOAP-ENV:Envelope xmlns:ns0="urn:ec.europa.eu:taxud:vies:services:checkVat:types" ', 'xmlns:ns1="http://schemas.xmlsoap.org/soap/envelope/" ', 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ', 'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">', "<SOAP-ENV:Header/><ns1:Body><ns0:checkVat>", "<ns0:countryCode>", t.slice(0, 2).toUpperCase(), "</ns0:countryCode><ns0:vatNumber>", t.slice(2), "</ns0:vatNumber></ns0:checkVat></ns1:Body></SOAP-ENV:Envelope>"].join(""),
            $.ajax({
                url: u,
                data: i,
                method: "POST",
                dataType: "xml",
                success: function(t) {
                    var u, i, o, r, n, s, a;
                    if (a = $(t),
                    0 === a.find("checkVatResponse").length)
                        return void e("invalid");
                    for (n = {},
                    r = ["countryCode", "vatNumber", "requestDate", "valid", "name", "address"],
                    i = 0,
                    o = r.length; o > i; i++)
                        s = r[i],
                        u = a.find(s),
                        "requestDate" === s ? n[s] = u.text().slice(0, 10) : "valid" === s ? n[s] = "true" === u.text() : n[s] = u.text();
                    e(null, n)
                },
                error: function(t, u, i) {
                    e(u)
                }
            })
        }
        ,
        window.checkVat = function(e, u) {
            return e ? e.length < 7 || e.length > 20 ? u("This is not a VAT number.") : void t(e, function(t, e) {
                return t ? u("Sorry, but VIES appears to be down. (The error code is " + t + ".)") : u(null, e)
            }) : u("No VAT number specified.")
        }
    }
}(this)();
var idroo;
idroo = this.idroo = {
    window: $(window),
    plan: idrooPlan || {},
    action: "point",
    objectType: null,
    style: {}
};
var Color, DrawObject, Geometry, classes, ref, slice = [].slice;
ref = classes = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
Color = ref.Color,
("undefined" != typeof window && null !== window ? window : module.exports).DrawObject = DrawObject = function() {
    function t(u) {
        this.locked = !1,
        this.rawPoints = this.points || (this.points = []),
        this.transform = !1,
        this.style = e(!0, {}, t.defaultStyle, u || {}),
        this.changed = {},
        this.rebound()
    }
    var e, u, i;
    return u = 2,
    i = 5,
    e = ("undefined" != typeof $ && null !== $ ? $.extend : void 0) || require("extend"),
    t.defaultStyle = {
        stroke: !0,
        strokeColor: [0, 0, 0],
        strokeAlpha: 100,
        strokeWidth: 3,
        fill: !1,
        fillColor: [0, 100, 90],
        fillAlpha: 100,
        font: "Open Sans",
        textSize: 16,
        textColor: [0, 0, 0],
        textAlpha: 100,
        formulaColor: [0, 0, 0],
        formulaAlpha: 100
    },
    t.byType = function(t) {
        return classes["Draw" + t]
    }
    ,
    t.restore = function(e) {
        var u;
        return u = new (t.byType(e.T)),
        u.restoreChange(e),
        u
    }
    ,
    t.makeColor = function(t, e) {
        return null == e && (e = 100),
        Color.rgba(Color.hsl2rgb(t), e / 100)
    }
    ,
    t.prototype.type = "",
    t.prototype.lineJoin = "miter",
    t.prototype.update = function(t, e) {}
    ,
    t.prototype.repair = function() {}
    ,
    t.prototype.setPointChanged = function() {
        var t, e, u, i, o;
        for (u = 1 <= arguments.length ? slice.call(arguments, 0) : [],
        (t = this.changed).points || (t.points = {}),
        i = 0,
        o = u.length; o > i; i++)
            e = u[i],
            this.changed.points[e] = this.rawPoints[e]
    }
    ,
    t.prototype.rebound = function() {
        this.calculateBounds(),
        this.calculateOuterBounds()
    }
    ,
    t.prototype.calculateBounds = function() {
        this.bounds = Geometry.bounding.apply(Geometry, this.points)
    }
    ,
    t.prototype.calculateOuterBounds = function() {
        var t, e, u, o, r, n;
        this.style.stroke ? (t = this.style.strokeWidth / 2 + i,
        e = this.bounds,
        u = e[0],
        r = e[1],
        o = e[2],
        n = e[3],
        this.outerBounds = [u - t, r - t, o + t, n + t]) : this.outerBounds = this.bounds
    }
    ,
    t.prototype.setLocked = function(t) {
        this.locked = t,
        this.changed.locked = t
    }
    ,
    t.prototype.move = function(t, e) {
        this.addChangeTransform(Geometry.translateMatrix(t, e))
    }
    ,
    t.prototype.scale = function(t, e) {
        this.addChangeTransform(Geometry.scaleFromToMatrix(t, e))
    }
    ,
    t.prototype.rotate = function(t, e, u) {
        this.addChangeTransform(Geometry.rotateFromToMatrix(t, e, u))
    }
    ,
    t.prototype.addChangeTransform = function(t) {
        this.applyTransform(t),
        null != this.changed.transform ? this.changed.transform = Geometry.transform(t, this.changed.transform) : this.changed.transform = t
    }
    ,
    t.prototype.applyTransform = function(t) {
        this.transform ? this.transform = Geometry.transform(t, this.transform) : this.transform = t,
        this.refreshPoints()
    }
    ,
    t.prototype.refreshPoints = function() {
        this.transform ? this.points = Geometry.transformPoints(this.rawPoints, this.transform) : this.points = this.rawPoints.slice(0),
        this.rebound()
    }
    ,
    t.prototype.trySetStyle = function(t, e) {
        var u;
        if (null == e[t])
            return !1;
        if (this.style[t] === (u = e[t]))
            return !1;
        switch (t) {
        case "fillColor":
        case "fillAlpha":
            this.fillStyle = null;
            break;
        case "strokeColor":
        case "strokeAlpha":
            this.strokeStyle = null;
            break;
        case "textColor":
        case "textAlpha":
            this.textStyle = null;
            break;
        case "formulaColor":
        case "formulaAlpha":
            this.formulaStyle = null
        }
        return this.style[t] = u,
        null == this.changed.style && (this.changed.style = {}),
        this.changed.style[t] = !0,
        !0
    }
    ,
    t.prototype.setStyle = function(t) {
        var e, u, i, o;
        for (i = ["stroke", "strokeColor", "strokeAlpha", "strokeWidth", "fill", "fillColor", "fillAlpha"],
        e = 0,
        u = i.length; u > e; e++)
            o = i[e],
            this.trySetStyle(o, t);
        null == t.stroke && null == t.strokeWidth || this.calculateOuterBounds()
    }
    ,
    t.prototype.toDataURL = function() {
        var t, e, u, i, o, r, n, s, a;
        if (i = this.outerBounds,
        r = i[0],
        s = i[1],
        n = i[2],
        a = i[3],
        o = n - r,
        u = a - s,
        "undefined" == typeof document || null === document)
            throw new Error("Dont have canvas");
        return e = document.createElement("canvas"),
        e.width = o,
        e.height = u,
        t = e.getContext("2d"),
        t.translate(-r, -s),
        this.draw(t, {
            fill: !0,
            stroke: !0,
            extra: !0
        }),
        e.toDataURL()
    }
    ,
    t.prototype.draw = function(t, e) {
        null == e && (e = {}),
        this.prepareDraw(t),
        e.highlight && this.drawHighlight(t, e.highlight),
        e.fill && this.style.fill !== !1 && this.drawFill(t),
        e.stroke && this.style.stroke !== !1 && this.drawStroke(t),
        e.extra && this.drawExtra(t, e)
    }
    ,
    t.prototype.prepareDraw = function(t) {
        this.makePath(t)
    }
    ,
    t.prototype.drawFill = function(e) {
        e.fillStyle = null != this.fillStyle ? this.fillStyle : this.fillStyle = t.makeColor(this.style.fillColor, this.style.fillAlpha),
        e.fill()
    }
    ,
    t.prototype.drawStroke = function(e) {
        e.strokeStyle = null != this.strokeStyle ? this.strokeStyle : this.strokeStyle = t.makeColor(this.style.strokeColor, this.style.strokeAlpha),
        e.lineWidth = this.style.strokeWidth,
        e.lineJoin = this.lineJoin,
        e.lineCap = "round",
        e.stroke()
    }
    ,
    t.prototype.drawExtra = function(t) {}
    ,
    t.prototype.drawHighlight = function(t, e) {
        t.strokeStyle = e,
        t.lineWidth = u + (this.style.stroke ? this.style.strokeWidth : 0),
        t.lineJoin = this.lineJoin,
        t.lineCap = "round",
        t.stroke()
    }
    ,
    t.prototype.makePath = function(t) {
        t.beginPath()
    }
    ,
    t.prototype.pickUp = function(t, e) {
        return Geometry.pointInRectangle([t, e], this.outerBounds) ? this.canPickFill() && this.pickFillLocal(t, e) ? !0 : !(!this.style.stroke || !this.pickStrokeLocal(t, e)) : !1
    }
    ,
    t.prototype.pickStrokeLocal = function(t, e) {
        return !1
    }
    ,
    t.prototype.pickFillLocal = function(t, e) {
        return !1
    }
    ,
    t.prototype.canPickFill = function() {
        return this.style.fill !== !1
    }
    ,
    t.prototype.isOver = function(t) {
        return t < this.style.strokeWidth / 2 + i
    }
    ,
    t.prototype.isOverLine = function(t, e, u) {
        return this.isOver(Geometry.distanceFromLine(t, e, u))
    }
    ,
    t.prototype.rectangleOver = function(t) {
        var e, u, i, o;
        return Geometry.rectangleOverRectangle(t, this.outerBounds) ? this.rectangleContains(t) ? !0 : (e = t[0],
        i = t[1],
        u = t[2],
        o = t[3],
        this.canPickFill() && (this.pickFillLocal(e, i) || this.pickFillLocal(u, o) || this.pickFillLocal(e, o) || this.pickFillLocal(u, i)) ? !0 : !!this.rectangleOverLine(t)) : !1
    }
    ,
    t.prototype.rectangleContains = function(t) {
        return !1
    }
    ,
    t.prototype.rectangleOverLine = function(t) {
        return !1
    }
    ,
    t.prototype.serialize = function() {
        var e;
        return e = {
            T: this.type,
            P: this.rawPoints.slice(0),
            S: {}
        },
        this.style.stroke !== t.defaultStyle.stroke && (e.S.L = this.style.stroke),
        idroo.utils.colorsEqual(this.style.strokeColor, t.defaultStyle.strokeColor) || (e.S.S = this.style.strokeColor),
        this.style.strokeAlpha !== t.defaultStyle.strokeAlpha && (e.S.O = this.style.strokeAlpha),
        this.style.strokeWidth !== t.defaultStyle.strokeWidth && (e.S.W = this.style.strokeWidth),
        this.style.fill !== t.defaultStyle.fill && (e.S.B = this.style.fill),
        idroo.utils.colorsEqual(this.style.fillColor, t.defaultStyle.fillColor) || (e.S.F = this.style.fillColor),
        this.style.fillAlpha !== t.defaultStyle.fillAlpha && (e.S.A = this.style.fillAlpha),
        this.transform && (e.M = this.transform),
        this.locked && (e.L = !0),
        e
    }
    ,
    t.prototype.serializeChange = function() {
        var t;
        return t = this.changes(),
        this.changed = {},
        t
    }
    ,
    t.prototype.changes = function() {
        var t;
        return t = {},
        null != this.changed.style && (t.S = {},
        null != this.changed.style.stroke && (t.S.L = this.style.stroke),
        null != this.changed.style.strokeColor && (t.S.S = this.style.strokeColor),
        null != this.changed.style.strokeAlpha && (t.S.O = this.style.strokeAlpha),
        null != this.changed.style.strokeWidth && (t.S.W = this.style.strokeWidth),
        null != this.changed.style.fill && (t.S.B = this.style.fill),
        null != this.changed.style.fillColor && (t.S.F = this.style.fillColor),
        null != this.changed.style.fillAlpha && (t.S.A = this.style.fillAlpha)),
        null != this.changed.transform && (t.N = this.changed.transform),
        null != this.changed.points && (t.E = this.changed.points),
        null != this.changed.locked && (t.L = this.changed.locked),
        t
    }
    ,
    t.prototype.restoreChange = function(t) {
        var e, u, i;
        if (null != t.L && (this.locked = t.L),
        null != t.S && (null != t.S.L && (this.style.stroke = t.S.L),
        null == t.S.S && null == t.S.O || (null != t.S.S && (this.style.strokeColor = t.S.S),
        null != t.S.O && (this.style.strokeAlpha = t.S.O),
        this.strokeStyle = null),
        null != t.S.W && (this.style.strokeWidth = t.S.W),
        null != t.S.B && (this.style.fill = t.S.B),
        null == t.S.F && null == t.S.A || (null != t.S.F && (this.style.fillColor = t.S.F),
        null != t.S.A && (this.style.fillAlpha = t.S.A),
        this.fillStyle = null)),
        null != t.P && (this.rawPoints = t.P.slice(0)),
        null != t.E) {
            i = t.E;
            for (e in i)
                u = i[e],
                this.rawPoints[e] = u
        }
        null != t.M && (this.transform = t.M),
        null != t.N && this.applyTransform(t.N),
        null == t.P && null == t.E && null == t.M || null != t.N ? null == t.S || null == t.S.L && null == t.S.W || this.calculateOuterBounds() : this.refreshPoints()
    }
    ,
    t
}();
var DrawGroup, DrawObject, Geometry, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty, slice = [].slice;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawObject = ref.DrawObject,
("undefined" != typeof window && null !== window ? window : module.exports).DrawGroup = DrawGroup = function(t) {
    function e() {
        var t;
        t = 1 <= arguments.length ? slice.call(arguments, 0) : [],
        this.objects = t,
        this.updateChangeCaller(),
        e.__super__.constructor.call(this, {
            stroke: !1
        }),
        this.objects && this.rebound()
    }
    return extend(e, t),
    e.prototype.type = "Group",
    e.prototype.changeCaller = !1,
    e.prototype.objects = null,
    e.prototype.updateChangeCaller = function() {
        var t, e, u, i;
        for (i = this.objects,
        t = 0,
        e = i.length; e > t; t++)
            u = i[t],
            u.changeCaller && (this.changeCaller = !0,
            u.callChange = function(t) {
                return function() {
                    return t.callChange()
                }
            }(this))
    }
    ,
    e.prototype.callChange = function() {}
    ,
    e.prototype.calculateBounds = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f;
        for (a = this.objects,
        o = r = 0,
        n = a.length; n > r; o = ++r)
            s = a[o],
            o ? (h = s.bounds,
            t = h[0],
            u = h[1],
            e = h[2],
            i = h[3],
            l > t && (l = t),
            p > u && (p = u),
            e > d && (d = e),
            i > f && (f = i)) : (c = s.bounds,
            l = c[0],
            p = c[1],
            d = c[2],
            f = c[3]);
        this.bounds = [l, p, d, f]
    }
    ,
    e.prototype.calculateOuterBounds = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f;
        for (a = this.objects,
        o = r = 0,
        n = a.length; n > r; o = ++r)
            s = a[o],
            o ? (h = s.outerBounds,
            t = h[0],
            u = h[1],
            e = h[2],
            i = h[3],
            l > t && (l = t),
            p > u && (p = u),
            e > d && (d = e),
            i > f && (f = i)) : (c = s.outerBounds,
            l = c[0],
            p = c[1],
            d = c[2],
            f = c[3]);
        this.outerBounds = [l, p, d, f]
    }
    ,
    e.prototype.applyTransform = function(t) {
        var e, u, i, o;
        for (o = this.objects,
        e = 0,
        u = o.length; u > e; e++)
            i = o[e],
            i.applyTransform(t);
        this.rebound()
    }
    ,
    e.prototype.setStyle = function() {}
    ,
    e.prototype.draw = function(t, e) {
        var u, i, o, r;
        for (null == e && (e = {}),
        r = this.objects,
        u = 0,
        i = r.length; i > u; u++)
            o = r[u],
            o.draw(t, e)
    }
    ,
    e.prototype.canPickFill = function() {
        return !0
    }
    ,
    e.prototype.pickFillLocal = function(t, e) {
        var u, i, o, r;
        for (r = this.objects,
        u = 0,
        i = r.length; i > u; u++)
            if (o = r[u],
            o.pickUp(t, e))
                return !0;
        return !1
    }
    ,
    e.prototype.rectangleOver = function(t) {
        var e, u, i, o;
        if (!Geometry.rectangleOverRectangle(t, this.outerBounds))
            return !1;
        for (o = this.objects,
        e = 0,
        u = o.length; u > e; e++)
            if (i = o[e],
            i.rectangleOver(t))
                return !0;
        return !1
    }
    ,
    e.prototype.serialize = function() {
        var t, e;
        return e = {
            T: this.type
        },
        e.o = function() {
            var e, u, i, o;
            for (i = this.objects,
            o = [],
            e = 0,
            u = i.length; u > e; e++)
                t = i[e],
                o.push(t.serialize());
            return o
        }
        .call(this),
        e
    }
    ,
    e.prototype.restoreChange = function(t) {
        var u;
        e.__super__.restoreChange.call(this, t),
        null != t.o && (this.objects = function() {
            var e, i, o, r;
            for (o = t.o,
            r = [],
            e = 0,
            i = o.length; i > e; e++)
                u = o[e],
                r.push(DrawObject.restore(u));
            return r
        }(),
        this.updateChangeCaller(),
        this.rebound())
    }
    ,
    e
}(DrawObject);
var DrawLine, DrawObject, Geometry, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawObject = ref.DrawObject,
("undefined" != typeof window && null !== window ? window : module.exports).DrawLine = DrawLine = function(t) {
    function e(t, u, i) {
        null == t && (t = 0),
        null == u && (u = 0),
        this.points = [[t, u], [t + .5, u + .5]],
        e.__super__.constructor.call(this, i)
    }
    return extend(e, t),
    e.prototype.type = "Line",
    e.prototype.update = function(t, e) {
        this.points[1] = [t, e],
        this.setPointChanged(1),
        this.rebound()
    }
    ,
    e.prototype.makePath = function(t) {
        var e, u, i, o, r, n, s;
        t.beginPath(),
        e = this.points,
        u = e[0],
        o = u[0],
        n = u[1],
        i = e[1],
        r = i[0],
        s = i[1],
        t.moveTo(o, n),
        t.lineTo(r, s === n && r === o ? s + .01 : s)
    }
    ,
    e.prototype.pickStrokeLocal = function(t, e) {
        return this.isOverLine([t, e], this.points[0], this.points[1])
    }
    ,
    e.prototype.rectangleContains = function(t) {
        return Geometry.pointInRectangle(this.points[0], t) || Geometry.pointInRectangle(this.points[1], t)
    }
    ,
    e.prototype.rectangleOverLine = function(t) {
        return Geometry.lineOverRectangle(this.points[0], this.points[1], t)
    }
    ,
    e
}(DrawObject);
var DrawLine, DrawRectangle, Geometry, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawLine = ref.DrawLine,
("undefined" != typeof window && null !== window ? window : module.exports).DrawRectangle = DrawRectangle = function(t) {
    function e() {
        var t, u, i, o, r, n, s;
        e.__super__.constructor.apply(this, arguments),
        t = this.points,
        u = t[0],
        o = u[0],
        n = u[1],
        i = t[1],
        r = i[0],
        s = i[1],
        this.points.push([r, n], [o, s])
    }
    return extend(e, t),
    e.prototype.type = "Rectangle",
    e.prototype.update = function(t, u) {
        var i, o, r;
        i = this.points[0],
        o = i[0],
        r = i[1],
        this.points[2] = [t, r],
        this.points[3] = [o, u],
        this.setPointChanged(2, 3),
        e.__super__.update.apply(this, arguments)
    }
    ,
    e.prototype.makePath = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p;
        t.beginPath(),
        e = this.points,
        u = e[0],
        n = u[0],
        c = u[1],
        i = e[1],
        s = i[0],
        l = i[1],
        o = e[2],
        a = o[0],
        d = o[1],
        r = e[3],
        h = r[0],
        p = r[1],
        t.moveTo(n, c),
        t.lineTo(a, d),
        t.lineTo(s, l),
        t.lineTo(h, p),
        t.lineTo(n, c),
        t.closePath()
    }
    ,
    e.prototype.pickStrokeLocal = function(t, e) {
        var u, i, o, r, n, s;
        return u = [t, e],
        s = this.points,
        i = s[0],
        o = s[1],
        r = s[2],
        n = s[3],
        this.isOverLine(u, i, r) || this.isOverLine(u, r, o) || this.isOverLine(u, o, n) || this.isOverLine(u, n, i)
    }
    ,
    e.prototype.pickFillLocal = function(t, e) {
        var u, i, o, r, n, s;
        for (n = [this.points[0], this.points[2], this.points[1], this.points[3]],
        i = n[n.length - 1],
        s = 0,
        e += 1e-5,
        u = 0,
        o = n.length; o > u; u++)
            r = n[u],
            i[1] <= e ? r[1] > e && Geometry.isLeft(i, r, [t, e]) && s++ : r[1] <= e && Geometry.isLeft(r, i, [t, e]) && s--,
            i = r;
        return 0 !== s
    }
    ,
    e.prototype.rectangleContains = function(t) {
        return e.__super__.rectangleContains.apply(this, arguments) || Geometry.pointInRectangle(this.points[2], t) || Geometry.pointInRectangle(this.points[3], t)
    }
    ,
    e.prototype.rectangleOverLine = function(t) {
        var e, u, i, o, r;
        return r = this.points,
        e = r[0],
        u = r[1],
        i = r[2],
        o = r[3],
        Geometry.lineOverRectangle(e, i, t) || Geometry.lineOverRectangle(i, u, t) || Geometry.lineOverRectangle(u, o, t) || Geometry.lineOverRectangle(o, e, t)
    }
    ,
    e
}(DrawLine);
var DrawEllipse, DrawRectangle, Geometry, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty, slice = [].slice;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawRectangle = ref.DrawRectangle,
("undefined" != typeof window && null !== window ? window : module.exports).DrawEllipse = DrawEllipse = function(t) {
    function e() {
        return e.__super__.constructor.apply(this, arguments)
    }
    var u, i, o;
    return extend(e, t),
    e.prototype.type = "Ellipse",
    e.prototype.curves = [],
    u = .2238576,
    i = .7761424,
    o = function(t, e, o) {
        var r, n, s, a, h, c, l, d;
        return s = t[0],
        c = t[1],
        a = e[0],
        l = e[1],
        h = o[0],
        d = o[1],
        [[(r = i * s) + u * a, (n = i * c) + u * l], [r + u * h, n + u * d], [(s + h) / 2, (c + d) / 2]]
    }
    ,
    e.prototype.makeCurves = function() {
        var t, e, u, i, r;
        4 === this.points.length && (r = this.points,
        t = r[0],
        e = r[1],
        u = r[2],
        i = r[3],
        this.curves = [[(t[0] + i[0]) / 2, (t[1] + i[1]) / 2]].concat(slice.call(o(t, i, u)), slice.call(o(u, t, e)), slice.call(o(e, u, i)), slice.call(o(i, e, t))))
    }
    ,
    e.prototype.makePath = function(t) {
        this.makeCurves(),
        Geometry.makeCurvesPath(t, this.curves)
    }
    ,
    e.prototype.rebound = function() {
        return this.makeCurves(),
        e.__super__.rebound.apply(this, arguments)
    }
    ,
    e.prototype.calculateBounds = function() {
        return this.curves.length ? void (this.bounds = Geometry.calculateCurvesBounds(this.curves)) : e.__super__.calculateBounds.apply(this, arguments)
    }
    ,
    e.prototype.pickStrokeLocal = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B;
        for (f = C = 0,
        B = this.curves.length - 4; B >= C; f = C += 3)
            if (u = this.curves[f],
            i = u[0],
            o = u[1],
            r = this.curves[f + 1],
            n = r[0],
            s = r[1],
            a = this.curves[f + 2],
            h = a[0],
            c = a[1],
            l = this.curves[f + 3],
            d = l[0],
            p = l[1],
            this.isOver(Math.min(i, n, h, d) - t) && this.isOver(Math.min(o, s, c, p) - e) && this.isOver(t - Math.max(i, n, h, d)) && this.isOver(e - Math.max(o, s, c, p)) && this.isOver(Geometry.distanceFromBezier([t, e], [u, r, a, l])))
                return !0;
        return !1
    }
    ,
    e.prototype.pickFillLocal = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f;
        for (a = this.curves,
        r = a[a.length - 1],
        f = 0,
        e += 1e-5,
        u = i = 0,
        c = a.length - 2; c >= i; u = i += 3)
            if (r[0] < t && a[u][0] < t && a[u + 1][0] < t && a[u + 2][0] < t && a[u + 3][0] < t || r[1] < e == (p = a[u][1] < e) && p === (d = a[u + 1][1] < e) && d === (l = a[u + 2][1] < e) && l === a[u + 3][1] < e)
                r = a[u + 3];
            else
                for (h = Geometry.bezierPoints([a[u], a[u + 1], a[u + 2], a[u + 3]]),
                o = 0,
                n = h.length; n > o; o++)
                    s = h[o],
                    r[1] <= e ? s[1] > e && Geometry.isLeft(r, s, [t, e]) && f++ : s[1] <= e && Geometry.isLeft(s, r, [t, e]) && f--,
                    r = s;
        return 0 !== f
    }
    ,
    e.prototype.rectangleContains = function(t) {
        var e, u, i;
        for (e = u = 0,
        i = this.curves.length; i >= u; e = u += 3)
            if (Geometry.pointInRectangle(this.curves[e], t))
                return !0;
        return !1
    }
    ,
    e.prototype.rectangleOverLine = function(t) {
        var e, u, i, o, r, n, s, a, h;
        for (n = this.curves,
        u = o = 0,
        a = n.length - 2; a >= o; u = o += 3)
            if (e = Geometry.bounding(n[u], n[u + 1], n[u + 2], n[u + 3]),
            Geometry.rectangleOverRectangle(t, e))
                for (s = Geometry.bezierPoints([n[u], n[u + 1], n[u + 2], n[u + 3]]),
                i = r = 1,
                h = s.length - 1; h >= r; i = r += 1)
                    if (Geometry.lineOverRectangle(s[i - 1], s[i], t))
                        return !0;
        return !1
    }
    ,
    e
}(DrawRectangle);
var DrawFreehand, DrawObject, Geometry, MyMath, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawObject = ref.DrawObject,
MyMath = ref.MyMath,
("undefined" != typeof window && null !== window ? window : module.exports).DrawFreehand = DrawFreehand = function(t) {
    function e(t, u, i) {
        this.raw = [],
        this.points = [],
        this.lastRawLength = 0,
        this.fixedLength = 1,
        this.lastSerialized = 0,
        this.minStep = 1e20,
        this.lastHat = [0, 0],
        this.lastPointTime = new Date / 1,
        this.pathCache = null,
        null != t && null != u && (this.raw.push([t, u]),
        this.points.push([t, u], [t, u], [t, u], [t, u])),
        e.__super__.constructor.call(this, i)
    }
    return extend(e, t),
    e.prototype.type = "Freehand",
    e.prototype.lineJoin = "round",
    e.prototype.calculateBounds = function() {
        var t;
        if (this.points.length < 4)
            return e.__super__.calculateBounds.call(this);
        try {
            this.bounds = Geometry.calculateCurvesBounds(this.points)
        } catch (u) {
            t = u,
            console.log(t)
        }
    }
    ,
    e.prototype.setStyle = function(t) {
        return null != t.strokeWidth && (this.pathCache = null),
        e.__super__.setStyle.apply(this, arguments)
    }
    ,
    e.prototype.update = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l;
        r = this.raw,
        i = r.length,
        o = new Date / 1,
        i > 1 ? (s = r[i - 1][0] - r[i - 2][0],
        a = r[i - 1][1] - r[i - 2][1],
        c = t - r[i - 1][0],
        l = e - r[i - 1][1],
        n = Math.sqrt(s * s + a * a),
        h = Math.sqrt(c * c + l * l),
        this.minStep = Math.min(this.minStep, h),
        n > 0 && h > 0 ? (u = Math.acos((s * c + a * l) / (n * h)),
        u > .1 * Math.PI && o - this.lastPointTime > 50 && (r.push(r[i - 1]),
        r.push([t, e]),
        i += 2),
        n > 1.5 * this.minStep ? r.push([t, e]) : r[i - 1] = [t, e]) : r[i - 1] = [t, e]) : r.push([t, e]),
        this.lastPointTime = o,
        this.raw = r,
        this.updateBezier()
    }
    ,
    e.prototype.applyTransform = function() {
        e.__super__.applyTransform.apply(this, arguments),
        this.pathCache = null
    }
    ,
    e.prototype.updateBezier = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l;
        for (n = this.raw,
        r = this.rawPoints,
        u = n.length,
        t = e = 1,
        s = u - 1; s >= e; t = e += 1)
            if (n[t][0] === n[t - 1][0] && n[t][1] === n[t - 1][0]) {
                c = n.splice(0, t),
                l = Geometry.linesToBezier(c, this.lastHat),
                r = r.slice(0, this.fixedLength - 1).concat(l),
                this.fixedLength = r.length,
                this.lastSerialized > this.fixedLength && (this.lastSerialized = this.fixedLength),
                this.lastRawLength = n.length,
                this.lastHat = [0, 0];
                break
            }
        for (i = Geometry.linesToBezier(n, this.lastHat),
        r.length < 4 ? (r = i,
        this.lastSerialized = 0) : (this.lastSerialized > this.fixedLength && (this.lastSerialized = this.fixedLength),
        i.length > 4 && n.length > 3 && (this.fixedLength += 3,
        n.splice(0, this.lastRawLength - 1),
        this.lastHat = Geometry.v2Normalize(Geometry.v2Sub(r[this.fixedLength - 2], r[this.fixedLength - 1])),
        i = Geometry.linesToBezier(n, this.lastHat)),
        r = r.slice(0, this.fixedLength - 1).concat(i)),
        t = o = a = this.lastSerialized,
        h = r.length - 1; h >= a ? h >= o : o >= h; t = h >= a ? ++o : --o)
            r[t] = [MyMath.round2(r[t][0]), MyMath.round2(r[t][1])];
        this.lastRawLength = n.length,
        this.raw = n,
        this.points = this.rawPoints = r,
        this.pathCache = null,
        this.rebound()
    }
    ,
    e.prototype.makePath = function(t) {
        Geometry.makeCurvesPath(t, this.points)
    }
    ,
    e.prototype.makePath2 = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j;
        if (d = this.points,
        i = .5 * this.style.strokeWidth,
        !this.pathCache) {
            for (D = [],
            u = [],
            A = [],
            o = h = 1,
            m = d.length - 1; m >= h; o = h += 3)
                A = A.concat(Geometry.bezierPoints(d.slice(o - 1, o + 3)));
            if (A.length) {
                for (x = [A[0]],
                s = A[1],
                c = 0,
                o = l = 2,
                y = A.length - 1; y >= l; o = l += 1)
                    S = A[o][0] - s[0],
                    T = A[o][1] - s[1],
                    O = s[0] - x[c][0],
                    j = s[1] - x[c][1],
                    k = Math.sqrt(S * S + T * T),
                    M = Math.sqrt(O * O + j * j),
                    k > 0 && M > 0 && (e = Math.acos((S * O + T * j) / (k * M))),
                    (e > .05 && M > 2 || M > 10) && (x.push(s),
                    c++),
                    s = A[o];
                for (1 === x.length && x.push([(x[0][0] + s[0]) / 2, (x[0][1] + s[1]) / 2]),
                x.push(s),
                n = x.length,
                o = F = 0,
                v = n - 1; v >= F; o = F += 1)
                    B = p = x[o],
                    0 === o ? (f = x[o + 1],
                    C = p,
                    r = .3) : o === n - 1 ? (C = x[o - 1],
                    f = p,
                    r = .3) : (f = x[o + 1],
                    C = x[o - 1],
                    r = 7 > n || o > 2 && n - 3 > o ? 1 : Math.min(o + 1, n - o) / 4),
                    _ = Geometry.v2Normalize([C[1] - f[1], f[0] - C[0]]),
                    D.push([B[0] + r * i * _[0], B[1] + r * i * _[1]]),
                    u.push([B[0] - r * i * _[0], B[1] - r * i * _[1]]);
                for (o = g = b = u.length - 1; g >= 0; o = g += -1)
                    D.push(u[o])
            }
            this.pathCache = D
        }
        for (t.beginPath(),
        t.moveTo(this.pathCache[0][0], this.pathCache[0][1]),
        E = this.pathCache,
        w = 0,
        a = E.length; a > w; w++)
            d = E[w],
            t.lineTo(d[0], d[1])
    }
    ,
    e.prototype.prepareDraw = function() {}
    ,
    e.prototype.drawFill = function(t) {
        return this.makePath(t),
        e.__super__.drawFill.apply(this, arguments)
    }
    ,
    e.prototype.drawStroke = function(t) {
        this.style.strokeWidth > 3 || 4 === this.points.length && this.points[0][0] === this.points[3][0] && this.points[0][1] === this.points[3][1] ? (this.makePath(t),
        e.__super__.drawStroke.apply(this, arguments)) : (this.makePath2(t),
        t.fillStyle = null != this.strokeStyle ? this.strokeStyle : this.strokeStyle = DrawObject.makeColor(this.style.strokeColor, this.style.strokeAlpha),
        t.fill())
    }
    ,
    e.prototype.drawHighlight = function(t) {
        return this.makePath(t),
        e.__super__.drawHighlight.apply(this, arguments)
    }
    ,
    e.prototype.pickStrokeLocal = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B;
        for (f = C = 0,
        B = this.points.length - 4; B >= C; f = C += 3)
            if (u = this.points[f],
            i = u[0],
            o = u[1],
            r = this.points[f + 1],
            n = r[0],
            s = r[1],
            a = this.points[f + 2],
            h = a[0],
            c = a[1],
            l = this.points[f + 3],
            d = l[0],
            p = l[1],
            this.isOver(Math.min(i, n, h, d) - t) && this.isOver(Math.min(o, s, c, p) - e) && this.isOver(t - Math.max(i, n, h, d)) && this.isOver(e - Math.max(o, s, c, p)) && this.isOver(Geometry.distanceFromBezier([t, e], [u, r, a, l])))
                return !0;
        return !1
    }
    ,
    e.prototype.pickFillLocal = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f;
        for (a = this.points,
        i = a[a.length - 1],
        f = 0,
        e += 1e-5,
        u = r = 0,
        c = a.length - 2; c >= r; u = r += 3)
            if (i[0] < t && a[u][0] < t && a[u + 1][0] < t && a[u + 2][0] < t && a[u + 3][0] < t || i[1] < e == (p = a[u][1] < e) && p === (d = a[u + 1][1] < e) && d === (l = a[u + 2][1] < e) && l === a[u + 3][1] < e)
                i = a[u + 3];
            else
                for (h = Geometry.bezierPoints([a[u], a[u + 1], a[u + 2], a[u + 3]]),
                s = 0,
                o = h.length; o > s; s++)
                    n = h[s],
                    i[1] <= e ? n[1] > e && Geometry.isLeft(i, n, [t, e]) && f++ : n[1] <= e && Geometry.isLeft(n, i, [t, e]) && f--,
                    i = n;
        return 0 !== f
    }
    ,
    e.prototype.rectangleContains = function(t) {
        var e, u, i;
        for (e = u = 0,
        i = this.points.length; i >= u; e = u += 3)
            if (Geometry.pointInRectangle(this.points[e], t))
                return !0;
        return !1
    }
    ,
    e.prototype.rectangleOverLine = function(t) {
        var e, u, i, o, r, n, s, a, h;
        for (n = this.points,
        u = o = 0,
        a = n.length - 2; a >= o; u = o += 3)
            if (e = Geometry.bounding(n[u], n[u + 1], n[u + 2], n[u + 3]),
            Geometry.rectangleOverRectangle(t, e))
                for (s = Geometry.bezierPoints([n[u], n[u + 1], n[u + 2], n[u + 3]]),
                i = r = 1,
                h = s.length - 1; h >= r; i = r += 1)
                    if (Geometry.lineOverRectangle(s[i - 1], s[i], t))
                        return !0;
        return !1
    }
    ,
    e.prototype.changes = function() {
        var t;
        return t = e.__super__.changes.apply(this, arguments),
        this.lastSerialized !== this.rawPoints.length && (t._ = {
            p0: this.lastSerialized,
            p: this.rawPoints.slice(this.lastSerialized)
        },
        this.lastSerialized = this.rawPoints.length),
        t
    }
    ,
    e.prototype.restoreChange = function(t) {
        e.__super__.restoreChange.apply(this, arguments),
        null != t._ && (this.points = this.rawPoints = this.rawPoints.slice(0, t._.p0).concat(t._.p)),
        null == t._ && null == t.P && null == t.M || (this.lastSerialized = this.rawPoints.length,
        this.pathCache = null),
        null != t._ && this.rebound()
    }
    ,
    e
}(DrawObject);
var DrawObject, DrawRectangle, DrawText, Geometry, MyMath, Unicode, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawObject = ref.DrawObject,
DrawRectangle = ref.DrawRectangle,
Unicode = ref.Unicode,
MyMath = ref.MyMath,
("undefined" != typeof window && null !== window ? window : module.exports).DrawText = DrawText = function(t) {
    function e() {
        this.setState(),
        e.__super__.constructor.apply(this, arguments)
    }
    var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F;
    return extend(e, t),
    u = "#000",
    i = 1,
    C = "rgba(0,0,255,.2)",
    f = 1.3,
    F = {
        "true": Unicode.findWBRight,
        "false": Unicode.findGCBRight
    },
    A = {
        "true": Unicode.findWBLeft,
        "false": Unicode.findGCBLeft
    },
    D = null,
    "undefined" != typeof document && null !== document && (B = document.createElement("canvas"),
    D = B.getContext("2d")),
    e.KB = [o = 8, l = 33, c = 34, s = 35, a = 36, h = 37, p = 38, d = 39, n = 40, r = 46],
    e.prototype.type = "Text",
    e.prototype.changeCaller = !0,
    e.prototype.canDelete = !0,
    e.prototype.fixOrientation = function() {
        var t, e, u, i, o, r, n;
        n = this.rawPoints,
        u = n[0],
        i = n[1],
        o = n[2],
        r = n[3],
        t = u[0] > i[0],
        e = u[1] > i[1],
        t && e ? this.rawPoints = [i, u, r, o] : t ? this.rawPoints = [o, r, u, i] : e && (this.rawPoints = [r, o, i, u]),
        (t || e) && this.setPointChanged(0, 1, 2, 3),
        this.points = this.rawPoints.slice(0)
    }
    ,
    e.prototype.repair = function() {
        return this.allowAutosize = !0,
        this.reMeasure = !0,
        this.autosize = this.isAutosizeAllowed(),
        e.__super__.repair.apply(this, arguments)
    }
    ,
    e.prototype.getState = function() {
        return this.reMeasure && this.measure(),
        {
            text: this.text,
            points: this.rawPoints.slice(0),
            minHeight: this.minHeight,
            caretFrom: this.caret.from,
            caretTo: this.caret.to
        }
    }
    ,
    e.prototype.setState = function(t) {
        this.lines = [],
        this.lastLines = [],
        this.reLines = !1,
        this.reMeasure = !0,
        this.autosize = !1,
        this.updateMinHeight = !1,
        null != t ? (this.rawPoints = t.points.slice(0),
        this.setPointChanged(0, 1, 2, 3),
        this.text = t.text,
        this.minHeight = t.minHeight,
        this.resetCaret(t.caretFrom, t.caretTo),
        this.reMeasureCaret = !0,
        this.changed.text = !0,
        this.changed.minHeight = !0,
        this.refreshPoints(),
        this.allowAutosize = !0) : (this.text = "",
        this.lastText = "",
        this.minHeight = 0,
        this.resetCaret(0, 0))
    }
    ,
    e.prototype.resetCaret = function(t, e) {
        return null == t && (t = 0),
        null == e && (e = 0),
        this.caret = {
            from: t,
            to: e,
            start: {
                line: 0,
                pos: 0
            },
            end: {
                line: 0,
                pos: 0
            }
        }
    }
    ,
    e.prototype.update = function() {
        e.__super__.update.apply(this, arguments),
        this.autosize = this.isAutosizeAllowed(),
        this.updateMinHeight = !0,
        this.reMeasure = !0,
        this.changed.minHeight = !0,
        this.autosize || (this.canDelete = !1)
    }
    ,
    e.prototype.scale = function(t, u) {
        var i;
        e.__super__.scale.apply(this, arguments),
        this.reMeasure = !0,
        this.updateMinHeight = !0,
        i = Geometry.distanceFromPoint(this.points[0], this.points[3])
    }
    ,
    e.prototype.applyTransform = function() {
        e.__super__.applyTransform.apply(this, arguments),
        this.reMeasure || this.updateTextLocation()
    }
    ,
    e.prototype.isAutosizeAllowed = function() {
        return "" === this.text && Geometry.distanceFromPoint(this.points[0], this.points[2]) < 3 * this.style.textSize
    }
    ,
    e.prototype.callChange = function() {}
    ,
    e.prototype.insertText = function(t) {
        var e, u, i;
        this.autosize && (t.length > 1 && -1 !== t.indexOf("\n") || t.length > 20) && (this.pasteEndAutosize = !0),
        u = MyMath.minmax(this.caret.from, this.caret.to),
        e = u[0],
        i = u[1],
        this.text = this.text.substr(0, e) + t + this.text.substr(i),
        this.caret.to = this.caret.from = e + t.length,
        this.reMeasure = !0,
        this.changed.text = !0,
        this.allowAutosize = !0,
        this.canDelete = !1
    }
    ,
    e.prototype.setStyle = function(t) {
        var u, i, o, r, n;
        for (u = !1,
        r = ["font", "textSize", "textColor", "textAlpha"],
        i = 0,
        o = r.length; o > i; i++)
            n = r[i],
            u |= this.trySetStyle(n, t);
        return (u || null != t.strokeWidth) && (this.reMeasure = this.allowAutosize = !0),
        e.__super__.setStyle.apply(this, arguments)
    }
    ,
    e.prototype.selectedText = function() {
        return this.text.substring(this.caret.from, this.caret.to)
    }
    ,
    e.prototype.selectAll = function() {
        this.caret.from = 0,
        this.caret.to = this.text.length,
        this.reMeasureCaret = !0
    }
    ,
    e.prototype.handleKeyDown = function(t, e) {
        var u, i, f, C, B, D, g, m, y, v, b;
        switch (u = e.ctrl,
        m = e.shift,
        g = MyMath.minmax(this.caret.from, this.caret.to),
        f = g[0],
        y = g[1],
        t) {
        case o:
            return f === y && (f = A[u](this.text, f)),
            this.text = this.text.substr(0, f) + this.text.substr(y),
            this.caret.from = this.caret.to = f,
            this.reMeasure = !0,
            this.changed.text = !0,
            this.allowAutosize = !0,
            !0;
        case r:
            return f === y && (y = F[u](this.text, y)),
            this.text = this.text.substr(0, f) + this.text.substr(y),
            this.caret.from = this.caret.to = f,
            this.reMeasure = !0,
            this.changed.text = !0,
            this.allowAutosize = !0,
            !0;
        case l:
            return this.caret.to = 0,
            m || (this.caret.from = 0),
            void (this.reMeasureCaret = !0);
        case c:
            return this.caret.to = this.text.length,
            m || (this.caret.from = this.caret.to),
            void (this.reMeasureCaret = !0);
        case s:
            return u ? (this.caret.to = this.text.length,
            m || (this.caret.from = this.caret.to)) : (m || this.caret.from <= this.caret.to ? (B = this.caret.end,
            D = this.caret.to) : (B = this.caret.start,
            D = this.caret.from),
            C = B.line,
            this.caret.to = D + this.lines[C].text.length - B.pos - (this.lines[C].forced || C > this.lines.length - 2 ? 0 : 1),
            m || (this.caret.from = this.caret.to)),
            void (this.reMeasureCaret = !0);
        case a:
            return u ? (this.caret.to = 0,
            m || (this.caret.from = 0)) : (m || this.caret.from > this.caret.to ? (B = this.caret.end,
            D = this.caret.to) : (B = this.caret.start,
            D = this.caret.from),
            C = B.line,
            this.caret.to = D - B.pos,
            m || (this.caret.from = this.caret.to)),
            void (this.reMeasureCaret = !0);
        case h:
            return m ? f = A[u](this.text, this.caret.to) : f === y && (f = A[u](this.text, f)),
            this.caret.to = f,
            m || (this.caret.from = f),
            void (this.reMeasureCaret = !0);
        case p:
            if (this.caret.end.line < 1)
                return;
            return i = this.caret.end,
            v = i.pos ? this.lines[i.line].chars[i.pos - 1] : 0,
            b = (i.line - .5) * this.lineHeight,
            this.caret.to = this.coordsToCaret(v, b),
            m || (this.caret.from = this.caret.to),
            void (this.reMeasureCaret = !0);
        case d:
            return m ? y = F[u](this.text, this.caret.to) : f === y && (y = F[u](this.text, y)),
            this.caret.to = y,
            m || (this.caret.from = y),
            void (this.reMeasureCaret = !0);
        case n:
            if (this.caret.end.line > this.lines.length - 2)
                return;
            return i = this.caret.end,
            v = i.pos ? this.lines[i.line].chars[i.pos - 1] : 0,
            b = (i.line + 1.5) * this.lineHeight,
            this.caret.to = this.coordsToCaret(v, b),
            m || (this.caret.from = this.caret.to),
            void (this.reMeasureCaret = !0)
        }
    }
    ,
    e.prototype.coordsToCaret = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f;
        if (c = Math.floor(e / this.lineHeight),
        0 > c)
            return 0;
        if (c > this.lines.length - 1)
            return this.text.length;
        for (a = 0,
        p = this.lines,
        u = o = 0,
        n = p.length; n > o; u = ++o) {
            if (h = p[u],
            u === c) {
                for (d = 0,
                f = h.chars,
                i = r = 0,
                s = f.length; s > r; i = ++r) {
                    if (l = f[i],
                    (l + d) / 2 - 1 > t)
                        return Unicode.findGCBRight(this.text, a + i - 1);
                    d = l
                }
                return a + i - (h.forced ? 0 : 1)
            }
            a += h.text.length
        }
        return this.text.length
    }
    ,
    e.prototype.mouseFix = function(t, e) {
        var u;
        return u = Geometry.transformPoint([t - this.x0, e - this.y0], this.contentTransformInverse),
        t = u[0],
        e = u[1],
        [t - this.paddingLR, e - this.paddingTB]
    }
    ,
    e.prototype.mousedown = function(t, e, u) {
        var i;
        null == u && (u = {}),
        i = this.mouseFix(t, e),
        t = i[0],
        e = i[1],
        this.caret.to = this.coordsToCaret(t, e),
        u.shift || (this.caret.from = this.caret.to),
        this.reMeasureCaret = !0
    }
    ,
    e.prototype.mousemove = function(t, e) {
        var u;
        u = this.mouseFix(t, e),
        t = u[0],
        e = u[1],
        this.caret.to = this.coordsToCaret(t, e),
        this.reMeasureCaret = !0
    }
    ,
    e.prototype.mouseup = function(t, e) {
        var u;
        u = this.mouseFix(t, e),
        t = u[0],
        e = u[1]
    }
    ,
    e.prototype.doubleClick = function(t, e) {
        var u, i;
        i = this.mouseFix(t, e),
        t = i[0],
        e = i[1],
        u = this.coordsToCaret(t, e),
        this.caret.from = Unicode.findWBLeft(this.text, u),
        this.caret.to = Unicode.findWBRight(this.text, u),
        this.reMeasureCaret = !0
    }
    ,
    e.prototype.canPickFill = function() {
        return !0
    }
    ,
    e.prototype.prepareDraw = function() {
        return this.reMeasure && this.measure(),
        e.__super__.prepareDraw.apply(this, arguments)
    }
    ,
    e.prototype.drawExtra = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, B, D, A;
        for (this.reMeasure && this.measure(),
        this.reMeasureCaret && this.measureCaret(),
        h = this.lineHeight,
        t.save(),
        t.translate(this.x0, this.y0),
        t.transform.apply(t, this.contentTransform),
        t.translate(this.paddingLR, this.paddingTB),
        e.highlight && (u = this.caret,
        u.from !== u.to && (p = u.start,
        i = u.end,
        D = this.width - 2 * this.paddingLR,
        t.beginPath(),
        f = p.pos ? this.lines[p.line].chars[p.pos - 1] : 0,
        B = p.line * h,
        o = i.pos ? this.lines[i.line].chars[i.pos - 1] : 0,
        r = (i.line + 1) * h,
        l = B + h,
        c = r - h,
        t.moveTo(f, B),
        i.line === p.line ? (t.lineTo(o, B),
        t.lineTo(o, r),
        t.lineTo(f, r)) : (t.lineTo(D, B),
        t.lineTo(D, c),
        t.lineTo(o, c),
        t.lineTo(o, r),
        t.lineTo(0, r),
        t.lineTo(0, l),
        t.lineTo(f, l)),
        t.closePath(),
        t.fillStyle = C,
        t.fill())),
        A = this.style.textSize,
        t.font = this.style.textSize + 'px "' + this.style.font + '"',
        t.fillStyle = null != this.textStyle ? this.textStyle : this.textStyle = DrawObject.makeColor(this.style.textColor, this.style.textAlpha),
        d = this.lines,
        n = 0,
        s = d.length; s > n; n++)
            a = d[n],
            t.fillText(a.text, 0, A),
            A += h;
        t.restore()
    }
    ,
    e.prototype.drawCaret = function(t) {
        var e, o;
        this.reMeasure && this.measure(),
        this.reMeasureCaret && this.measureCaret(),
        t.save(),
        t.translate(this.x0, this.y0),
        t.transform.apply(t, this.contentTransform),
        t.translate(this.paddingLR, this.paddingTB),
        e = (this.caret.end.pos ? this.lines[this.caret.end.line].chars[this.caret.end.pos - 1] : 0) + i / 2,
        o = this.lineHeight * this.caret.end.line,
        t.beginPath(),
        t.moveTo(e, o),
        t.lineTo(e, o + this.lineHeight),
        t.lineWidth = i,
        t.lineCap = "butt",
        t.strokeStyle = u,
        t.stroke(),
        t.restore()
    }
    ,
    e.prototype.updateTextLocation = function() {
        var t, e, u, i, o, r, n, s;
        n = this.points,
        i = n[0],
        t = n[1],
        o = n[2],
        r = n[3],
        this.x0 = i[0],
        this.y0 = i[1],
        this.width = Geometry.distanceFromPoint(i, o),
        this.height = Geometry.distanceFromPoint(i, r),
        this.width && this.height ? (e = Geometry.angleBetweenVectors(i, [this.x0 + 1, this.y0], o),
        u = Math.PI / 2 - Geometry.angleBetweenVectors(i, o, r)) : (e = 0,
        u = 0),
        s = Geometry.angleBetweenVectors(i, o, r) < 0 ? [1, 0, 0, -1, 0, 0] : [1, 0, 0, 1, 0, 0],
        this.contentTransform = Geometry.transform(Geometry.rotateMatrix(e), Geometry.skewXMatrix(u), s),
        this.contentTransformInverse = Geometry.inverseMatrix(this.contentTransform)
    }
    ,
    e.prototype.measure = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, C, B, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I, $, R, z, G, H, q, U, W, N, V;
        if (this.reMeasure = !1,
        this.reMeasureCaret = !0,
        D) {
            if (o = D,
            o.font = this.style.textSize + 'px "' + this.style.font + '"',
            this.lineHeight = Math.round(this.style.textSize * f),
            this.paddingTB = Math.ceil(this.style.strokeWidth / 2 + this.style.textSize / 8),
            this.paddingLR = Math.ceil(this.style.strokeWidth / 2 + this.style.textSize / 4),
            this.updateTextLocation(),
            g = this.autosize ? 99999 : this.width - 2 * this.paddingLR,
            _ = 0,
            this.lines = [],
            A = {},
            c = function(t) {
                return function() {
                    return A = {
                        text: "",
                        chars: []
                    }
                }
            }(this),
            y = function(t) {
                return function() {
                    return t.lines.push(A),
                    c()
                }
            }(this),
            c(),
            t = !1,
            e = 0,
            this.allowAutosize && this.autosize && (G = this.text.length - 1,
            "\n" === this.text[G] && (t = !0),
            this.pasteEndAutosize && (g = 400,
            t = !0)),
            this.reLines) {
                for (this.reLines = !1,
                k = this.lastLines,
                d = 0,
                C = k.length; C > d; d++) {
                    for (s = k[d],
                    (A.forced = 0 > s) && (s = -s),
                    h = p = M = _,
                    O = _ + s; O > p; h = p += 1)
                        A.chars.push(o.measureText(A.text += this.text[h]).width);
                    _ += s,
                    y()
                }
                for (h = F = j = _,
                P = this.text.length; P > F; h = F += 1)
                    A.chars.push(o.measureText(A.text += this.text[h]).width);
                A.forced = !0,
                y()
            } else
                for (L = Unicode.findLBRPoints(this.text + "\n"),
                m = 0,
                B = L.length; B > m; m++) {
                    for (I = L[m],
                    s = I[0],
                    a = I[1],
                    b = this.text.slice(_, s),
                    q = o.measureText(A.text + b).width,
                    A.text && q > g && y(),
                    v = 0,
                    h = w = 1,
                    $ = s - _; $ >= w; h = w += 1)
                        l = h - v,
                        q = o.measureText(A.text + b.substr(0, l)).width,
                        l > 1 && q > g && (A.text += b.substr(0, l - 1),
                        A.forced = !0,
                        y(),
                        b = b.substr(l - 1),
                        v = h - 1,
                        q = o.measureText(b.substr(0, 1)).width),
                        A.chars.push(q);
                    A.text += b,
                    _ = s,
                    e = Math.max(e, q),
                    a && y()
                }
            if (R = H = Geometry.transformPoints(this.points, this.contentTransformInverse),
            S = R[0],
            U = S[0],
            N = S[1],
            T = R[1],
            W = T[0],
            V = T[1],
            this.updateMinHeight && (this.minHeight = Geometry.distanceFromPoint(H[0], H[3]),
            this.changed.minHeight = !0,
            this.updateMinHeight = !1),
            this.allowAutosize && (i = !1,
            u = {},
            z = !1,
            this.autosize && (n = e + 2 * this.paddingLR,
            n !== this.width && (this.width = n,
            u[1] = H[1] = [W = U + n, V],
            u[2] = H[2] = [W, N],
            z = !0),
            t && (this.autosize = !1),
            i = !0),
            r = Math.ceil(this.lines.length * this.lineHeight + 2 * this.paddingTB),
            r !== this.height && (this.height = Math.max(this.minHeight, r),
            u[1] = H[1] = [W, V = N + this.height],
            u[3] = H[3] = [U, V],
            z = i = !0),
            this.allowAutosize = !1,
            i)) {
                if (z) {
                    this.transform && (H = Geometry.transformPoints(H, this.contentTransform),
                    H = Geometry.transformPoints(H, Geometry.inverseMatrix(this.transform)));
                    for (E in u)
                        x = u[E],
                        this.rawPoints[E] = H[E],
                        this.setPointChanged(E);
                    this.refreshPoints()
                }
                this.callChange(!0)
            }
        }
    }
    ,
    e.prototype.measureCaret = function() {
        var t, e, u, i, o, r, n, s, a, h, c;
        for (this.reMeasureCaret = !1,
        n = a = 0,
        u = e = !1,
        c = this.lines,
        i = o = 0,
        r = c.length; r > o; i = ++o) {
            if (s = c[i],
            a = s.text.length,
            t = s.forced ? 1 : 0,
            h = n + a,
            !u && (u = h + t > this.caret.from) && (this.caret.start.line = i,
            this.caret.start.pos = this.caret.from - n),
            !e && (e = h + t > this.caret.to) && (this.caret.end.line = i,
            this.caret.end.pos = this.caret.to - n),
            u && e)
                return;
            n = h
        }
        u || (this.caret.start.line = i - 1,
        this.caret.start.pos = a),
        e || (this.caret.end.line = i - 1,
        this.caret.end.pos = a)
    }
    ,
    e.prototype.serialize = function() {
        var t;
        return this.reMeasure && this.measure(),
        t = e.__super__.serialize.apply(this, arguments),
        t.t = this.text,
        t.l = this.lineLengths(),
        this.minHeight > 0 && (t.h = this.minHeight),
        null == t.S && (t.S = {}),
        this.style.font !== DrawObject.defaultStyle.font && (t.S.f = this.style.font),
        this.style.textSize !== DrawObject.defaultStyle.textSize && (t.S.s = this.style.textSize),
        idroo.utils.colorsEqual(this.style.textColor, DrawObject.defaultStyle.textColor) || (t.S.c = this.style.textColor),
        this.style.textAlpha !== DrawObject.defaultStyle.textAlpha && (t.S.a = this.style.textAlpha),
        t
    }
    ,
    e.prototype.lineLengths = function() {
        var t, e, u, i, o;
        for (i = [],
        o = this.lines,
        t = 0,
        e = o.length; e > t; t++)
            u = o[t],
            i.push(u.chars.length * (u.forced ? -1 : 1));
        return i.pop(),
        i
    }
    ,
    e.prototype.changes = function() {
        var t, u, i, o, r, n, s, a;
        if (this.reMeasure && this.measure(),
        s = e.__super__.changes.apply(this, arguments),
        null != this.changed.style && (null == s.S && (s.S = {}),
        null != this.changed.style.font && (s.S.f = this.style.font),
        null != this.changed.style.textSize && (s.S.s = this.style.textSize),
        null != this.changed.style.textColor && (s.S.c = this.style.textColor),
        null != this.changed.style.textAlpha && (s.S.a = this.style.textAlpha)),
        null != this.changed.minHeight && (s.h = this.minHeight),
        null != this.changed.text && this.text !== this.lastText) {
            for (a = 0,
            r = this.lastText.length - 1,
            o = this.text.length - 1; r >= a && o >= a && this.lastText[a] === this.text[a]; )
                a++;
            for (; r >= a && o >= a && this.lastText[r] === this.text[o]; )
                r--,
                o--;
            r++,
            o++,
            this.lastText = this.text,
            s._ = {
                p: a,
                l: r - a,
                s: this.text.substr(a, o - a)
            }
        }
        if (this.lines.length !== this.lastLines.length + 1)
            s.l = this.lastLines = this.lineLengths();
        else
            for (t = u = 0,
            n = this.lines.length; n > u; t = u += 1)
                if (i = this.lines[t].chars.length,
                i !== this.lastLines[t] && -i !== this.lastLines[t]) {
                    s.l = this.lastLines = this.lineLengths();
                    break
                }
        return s
    }
    ,
    e.prototype.restoreChange = function(t) {
        var u;
        e.__super__.restoreChange.call(this, t),
        null != t.S && (null != t.S.f && (this.style.font = t.S.f),
        null != t.S.s && (this.style.textSize = t.S.s),
        null == t.S.c && null == t.S.a || (null != t.S.c && (this.style.textColor = t.S.c),
        null != t.S.a && (this.style.textAlpha = t.S.a),
        this.textStyle = null)),
        null != t.t && (this.lastText = this.text = t.t),
        null != t._ && (this.lastText = this.text = this.text.substr(0, t._.p) + t._.s + this.text.substr(t._.p + t._.l)),
        null != t.l && (this.lastLines = t.l),
        null != t.h && (this.minHeight = t.h,
        this.updateMinHeight = !1),
        this.reLines = !0,
        this.reMeasure = !0,
        null == t.t && null == t._ || (this.autosize = this.isAutosizeAllowed()),
        null != (null != (u = t.S) ? u.f : void 0) && "undefined" != typeof Fonts && null !== Fonts && Fonts.unlessLoaded(this.style.font, function(t) {
            return function() {
                return t.measure(),
                t.callChange()
            }
        }(this)),
        this.canDelete = !1
    }
    ,
    e
}(DrawRectangle);
var DrawImage, DrawRectangle, Geometry, ImageLoader, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawRectangle = ref.DrawRectangle,
ImageLoader = ref.ImageLoader,
("undefined" != typeof window && null !== window ? window : module.exports).DrawImage = DrawImage = function(t) {
    function e() {
        e.__super__.constructor.apply(this, arguments),
        "undefined" != typeof document && null !== document ? this.img = document.createElement("img") : this.img = {}
    }
    return extend(e, t),
    e.prototype.type = "Image",
    e.prototype.changeCaller = !0,
    e.prototype.source = "",
    e.prototype.setSource = function(t, e) {
        null == e && (e = !0),
        this.img.src = this.source = t,
        e && (this.changed.source = !0),
        this.img.onload = function(t) {
            return function() {
                t.callChange()
            }
        }(this)
    }
    ,
    e.prototype.callChange = function() {}
    ,
    e.prototype.canPickFill = function() {
        return !0
    }
    ,
    e.prototype.refreshPoints = function() {
        e.__super__.refreshPoints.apply(this, arguments),
        this.calculateTransform()
    }
    ,
    e.prototype.calculateTransform = function() {
        var t, e, u, i, o, r, n, s;
        n = this.points,
        u = n[0],
        i = n[1],
        o = n[2],
        r = n[3],
        this.imageWidth = Geometry.distanceFromPoint(u, o),
        this.imageHeight = Geometry.distanceFromLine(u, r, i, !0),
        this.imageWidth && this.imageHeight ? (t = Geometry.angleBetweenVectors(u, [u[0] + 1, u[1]], o),
        e = Math.PI / 2 - Geometry.angleBetweenVectors(u, o, r)) : (t = 0,
        e = 0),
        s = Geometry.angleBetweenVectors(u, o, r) < 0 ? [1, 0, 0, -1, 0, 0] : [1, 0, 0, 1, 0, 0],
        this.imageTransform = Geometry.transform(Geometry.rotateMatrix(t), Geometry.skewXMatrix(e), s)
    }
    ,
    e.prototype.drawExtra = function(t, e) {
        var u, i;
        if (null == e && (e = {}),
        this.source) {
            t.save(),
            t.translate.apply(t, this.points[0]),
            this.imageTransform || this.refreshPoints(),
            t.transform.apply(t, this.imageTransform);
            try {
                if ("undefined" != typeof window && null !== window) {
                    try {
                        t.drawImage(this.img, 0, 0, this.imageWidth, this.imageHeight)
                    } catch (o) {
                        i = o
                    }
                    t.restore()
                } else
                    u = function(t) {
                        return function() {}
                    }(this),
                    this.waitDraw = function(t) {
                        return function(t) {
                            u = t
                        }
                    }(this),
                    ImageLoader.load(this.source, function(e) {
                        return function(i, o) {
                            i ? console.log(i) : o && t.drawImage(o, 0, 0, e.imageWidth, e.imageHeight),
                            delete e.waitDraw,
                            t.restore(),
                            u()
                        }
                    }(this))
            } catch (o) {
                i = o,
                console.log(i)
            }
        }
    }
    ,
    e.prototype.serialize = function() {
        var t;
        return t = e.__super__.serialize.apply(this, arguments),
        t.s = this.source,
        t
    }
    ,
    e.prototype.changes = function() {
        var t;
        return t = e.__super__.changes.apply(this, arguments),
        null != this.changed.source && (t.s = this.source,
        t._ = !0),
        t
    }
    ,
    e.prototype.restoreChange = function(t) {
        e.__super__.restoreChange.apply(this, arguments),
        null != t.s && this.setSource(t.s, !1)
    }
    ,
    e
}(DrawRectangle);
var AJson, DrawFormula, DrawObject, DrawRectangle, Geometry, MyMath, Unicode, ref, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty, slice = [].slice;
ref = "undefined" != typeof window && null !== window ? window : require("./classes"),
Geometry = ref.Geometry,
DrawObject = ref.DrawObject,
DrawRectangle = ref.DrawRectangle,
MyMath = ref.MyMath,
AJson = ref.AJson,
Unicode = ref.Unicode,
("undefined" != typeof window && null !== window ? window : module.exports).DrawFormula = DrawFormula = function(t) {
    function e() {
        this.setState(),
        e.__super__.constructor.apply(this, arguments)
    }
    var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M, O, j, P, L, I, $, R, z, G, H, q, U, W, N, V, J, X, K, Y, Z, Q, tt, et, ut, it, ot, rt, nt, st, at, ht, ct, lt, dt, pt, ft, Ct, Bt, Dt, At, Ft, gt;
    return extend(e, t),
    s = "#000",
    c = 1,
    a = 1.1,
    h = -.6,
    Z = "rgba(0,0,255,.2)",
    E = "rgba(0,0,0,.08)",
    l = "rgba(200,0,0,.1)",
    at = -.1,
    z = 1.3,
    st = 1,
    Y = "⬚",
    X = .1,
    K = .2,
    n = .75,
    ct = 20,
    ht = .71,
    w = 1.6,
    x = .2,
    _ = .5,
    Q = .5,
    g = 0,
    b = 1,
    A = 2,
    C = 3,
    f = 4,
    m = 5,
    y = 6,
    v = 7,
    F = 8,
    B = 9,
    D = 10,
    p = 11,
    d = 12,
    ot = 0,
    nt = 1,
    et = 2,
    rt = 3,
    it = 4,
    ut = 5,
    Bt = 1 / 18,
    Dt = 2 / 18,
    At = 4 / 18,
    Ft = 5 / 18,
    tt = [[Bt, 0, At, Ft, Dt, 0], [0, 0, At, 0, 0, 0], [At, At, 0, 0, At, 0], [Ft, Ft, 0, 0, Ft, 0], [0, 0, 0, 0, 0, 0], [Dt, Bt, At, Ft, Bt, 0]],
    i = {
        "*": "∗",
        "-": "−",
        "...": "…",
        ":": "∶",
        "'": "′",
        "!!": "‼"
    },
    o = {
        "∶∶": "∷",
        "∶=": "≔",
        "<=": "≤",
        ">=": "≥",
        "<<": "≪",
        ">>": "≫",
        "−>": "→",
        "+−": "±",
        "−+": "∓"
    },
    r = {
        "∶": 1,
        "=": 1,
        "<": 1,
        ">": 1,
        "−": 1,
        "+": 1
    },
    lt = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
        F: "",
        G: "",
        H: "",
        I: "",
        J: "",
        K: "",
        L: "",
        M: "",
        N: "",
        O: "",
        P: "",
        Q: "",
        R: "",
        S: "",
        T: "",
        U: "",
        V: "",
        W: "",
        X: "",
        Y: "",
        Z: "",
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "ℎ",
        i: "",
        j: "",
        k: "",
        l: "",
        m: "",
        n: "",
        o: "",
        p: "",
        q: "",
        r: "",
        s: "",
        t: "",
        u: "",
        v: "",
        w: "",
        x: "",
        y: "",
        z: ""
    },
    gt = function(t) {
        var e, u, i, o, r;
        for (r = "",
        u = 0,
        i = t.length; i > u; u++)
            e = t[u],
            r += null != (o = lt[e]) ? o : e;
        return r
    }
    ,
    u = {},
    pt = function(t) {
        var e, i;
        for (e in t)
            i = t[e],
            u[e] = i;
        return t
    }
    ,
    ft = function(t, e) {
        var u, i;
        for (u in e)
            i = e[u],
            t[i] = 1;
        return e
    }
    ,
    J = {
        "+": 1,
        "−": 1,
        "∓": 1,
        "±": 1
    },
    H = {
        "<": 1,
        "=": 1,
        ">": 1
    },
    ft(H, pt({
        ast: "∗",
        bullet: "∙",
        cap: "∩",
        cdot: "⋅",
        circ: "∘",
        cup: "∪",
        diamond: "⋄",
        div: "÷",
        mp: "∓",
        pm: "±",
        odot: "⊙",
        ominus: "⊖",
        oplus: "⊕",
        oslash: "⊘",
        otimes: "⊗",
        sdivide: "⁄",
        setminus: "∖",
        sqcap: "⊓",
        sqcup: "⊔",
        star: "⋆",
        times: "×",
        uplus: "⊎",
        vee: "∨",
        wedge: "∧",
        wr: "≀"
    })),
    N = {
        "∷": 1,
        "≔": 1
    },
    ft(N, pt({
        angle: "∠",
        approx: "≈",
        asymp: "≍",
        because: "∵",
        bot: "⊥",
        bowtie: "⋈",
        cong: "≅",
        dashv: "⊣",
        ddots: "⋱",
        doteq: "≐",
        downarrow: "↓",
        Downarrow: "⇓",
        equiv: "≡",
        ge: "≥",
        geq: "≥",
        gets: "←",
        gg: "≫",
        hookleftarrow: "↩",
        hookrightarrow: "↪",
        "in": "∈",
        le: "≤",
        leftarrow: "←",
        Leftarrow: "⇐",
        leftharpoondown: "↽",
        leftharpoonup: "↼",
        leftrightarrow: "↔",
        Leftrightarrow: "⇔",
        leq: "≤",
        ll: "≪",
        mapsto: "↦",
        mid: "∣",
        models: "⊨",
        ne: "≠",
        nearrow: "↗",
        ni: "∋",
        nwarrow: "↖",
        parallel: "∥",
        ratio: "∶",
        prec: "≺",
        preceq: "≼",
        propto: "∝",
        rddots: "⋰",
        rightarrow: "→",
        Rightarrow: "⇒",
        rightharpoondown: "⇁",
        rightharpoonup: "⇀",
        searrow: "↘",
        sim: "∼",
        simeq: "≃",
        sqsubseteq: "⊑",
        sqsuperseteq: "⊒",
        subset: "⊂",
        subseteq: "⊆",
        succ: "≻",
        succeq: "≽",
        superset: "⊃",
        superseteq: "⊇",
        swarrow: "↙",
        therefore: "∴",
        to: "→",
        top: "⊤",
        uparrow: "↑",
        Uparrow: "⇑",
        updownarrow: "↕",
        Updownarrow: "⇕",
        vdash: "⊢",
        vdots: "⋮",
        cdots: "⋯"
    })),
    W = {},
    ft(W, pt({
        "int": "∫",
        iint: "∬",
        iiint: "∭",
        iiiint: "⨌",
        oint: "∮",
        oiint: "∯",
        oiiint: "∰",
        amalg: "∐",
        prod: "∏",
        sum: "∑"
    })),
    V = {},
    ft(V, pt({
        emptyset: "∅",
        exists: "∃",
        forall: "∀",
        inc: "∆",
        nabla: "∇",
        partial: "∂",
        neg: "¬"
    })),
    G = {},
    ft(G, pt({
        acute: "́",
        bar: "̅",
        Bar: "̿",
        breve: "̆",
        check: "̌",
        ddddot: "⃜",
        dddot: "⃛",
        ddot: "̈",
        dot: "̇",
        grave: "̀",
        hat: "̂",
        hvec: "⃑",
        tvec: "⃡",
        vec: "⃗",
        tilde: "̃"
    })),
    U = {
        "|": 1
    },
    ft(U, pt({
        open: "├",
        lopen: "(",
        lbrace: "{",
        lbrack: "[",
        lceil: "⌈",
        lfloor: "⌊",
        bra: "⟨"
    })),
    q = {
        "|": 1
    },
    ft(q, pt({
        close: "┤",
        rclose: ")",
        rbrace: "}",
        rbrack: "]",
        rceil: "⌉",
        rfloor: "⌋",
        ket: "⟩"
    })),
    pt({
        zwsp: "​",
        hairsp: " ",
        thinsp: " ",
        medsp: " ",
        thicksp: " ",
        vthicksp: " ",
        ensp: " ",
        emsp: " ",
        nbsp: " ",
        zwnj: "‌"
    }),
    pt({
        Alpha: "",
        alpha: "",
        Beta: "",
        beta: "",
        Gamma: "",
        gamma: "",
        Delta: "",
        delta: "",
        Epsilon: "",
        epsilon: "",
        Zeta: "",
        zeta: "",
        Eta: "",
        eta: "",
        Theta: "",
        theta: "",
        Iota: "",
        iota: "",
        Kappa: "",
        kappa: "",
        Lambda: "",
        lambda: "",
        Mu: "",
        mu: "",
        Nu: "",
        nu: "",
        Xi: "",
        xi: "",
        Omicron: "",
        omicron: "",
        Pi: "",
        pi: "",
        Rho: "",
        rho: "",
        Sigma: "",
        sigma: "",
        Tau: "",
        tau: "",
        Upsilon: "",
        upsilon: "",
        Phi: "",
        phi: "",
        Chi: "",
        chi: "",
        Psi: "",
        psi: "",
        Omega: "",
        omega: ""
    }),
    pt({
        A: "",
        B: "",
        C: "ℂ",
        D: "",
        E: "",
        F: "",
        G: "",
        H: "ℍ",
        I: "",
        J: "",
        K: "",
        L: "",
        M: "",
        N: "ℕ",
        O: "",
        P: "ℙ",
        Q: "ℚ",
        R: "ℝ",
        S: "",
        T: "",
        U: "",
        V: "",
        W: "",
        X: "",
        Y: "",
        Z: "ℤ"
    }),
    pt({
        euler: "ℇ",
        ohm: "Ω",
        aleph: "ℵ",
        beth: "ℶ",
        daleth: "ℸ",
        ell: "ℓ",
        gimel: "ℷ",
        hbar: "ℏ",
        Im: "ℑ",
        imath: "ı",
        jmath: "ȷ",
        Re: "ℜ",
        wp: "℘"
    }),
    pt({
        sqrt: "√",
        above: "┴",
        below: "┬",
        box: "□",
        matrix: "■"
    }),
    pt({
        atop: "¦",
        degree: "°",
        infty: "∞",
        overbar: "¯",
        ppprime: "‴",
        pprime: "″",
        prime: "′",
        rect: "▭",
        underbar: "▁",
        vbar: "│",
        Vert: "‖"
    }),
    R = {
        sin: 1,
        cos: 1,
        tan: 1,
        csc: 1,
        sec: 1,
        cot: 1,
        arcsin: 1,
        arccos: 1,
        arctan: 1,
        sinh: 1,
        cosh: 1,
        tanh: 1,
        csch: 1,
        sech: 1,
        coth: 1,
        lim: 1,
        liminf: 1,
        limsup: 1,
        log: 1,
        ln: 1,
        min: 1,
        max: 1,
        deg: 1,
        dim: 1,
        gcd: 1,
        inf: 1,
        sup: 1,
        ker: 1,
        Pr: 1
    },
    Ct = null,
    "undefined" != typeof document && null !== document && (dt = document.createElement("canvas"),
    Ct = dt.getContext("2d")),
    e.KB = [k = 8, L = 33, P = 34, M = 35, O = 36, j = 37, $ = 38, I = 39, T = 40, S = 46],
    e.prototype.type = "Formula",
    e.prototype.changeCaller = !0,
    e.prototype.canDelete = !0,
    e.prototype.formula = null,
    e.prototype.measured = null,
    e.prototype.caret = null,
    e.prototype.fixOrientation = function() {
        var t, e, u, i, o, r, n;
        n = this.rawPoints,
        u = n[0],
        i = n[1],
        o = n[2],
        r = n[3],
        t = u[0] > i[0],
        e = u[1] > i[1],
        t && e ? this.rawPoints = [i, u, r, o] : t ? this.rawPoints = [o, r, u, i] : e && (this.rawPoints = [r, o, i, u]),
        (t || e) && this.setPointChanged(0, 1, 2, 3),
        this.points = this.rawPoints.slice(0)
    }
    ,
    e.prototype.repair = function() {
        return this.reMeasure = !0,
        e.__super__.repair.apply(this, arguments)
    }
    ,
    e.prototype.getState = function() {
        return this.reMeasure && this.measure(),
        {
            text: this.text,
            points: this.rawPoints.slice(0),
            caret: {
                path: this.caret.path.slice(0),
                from: this.caret.from,
                to: this.caret.to
            }
        }
    }
    ,
    e.prototype.setState = function(t) {
        this.reMeasure = !0,
        null != t ? (this.rawPoints = t.points.slice(0),
        this.setPointChanged(0, 1, 2, 3),
        this.text = t.text,
        this.formula = AJson.parse(this.text),
        this.setCaret(t.caret),
        this.changed.text = !0,
        this.refreshPoints()) : (this.text = "",
        this.formula = [g, []],
        this.lastText = "",
        this.setCaret())
    }
    ,
    e.prototype.resetCaret = function() {
        return this.setCaret()
    }
    ,
    e.prototype.setCaret = function(t) {
        null == t && (t = {
            path: [],
            from: 0,
            to: 0
        }),
        this.caret = {
            path: t.path.slice(0),
            from: t.from,
            to: t.to
        }
    }
    ,
    e.prototype.getFormula = function(t) {
        var e, u, i, o;
        for (e = this.formula,
        u = 0,
        i = t.length; i > u; u++)
            o = t[u],
            e = e[1][o];
        return e
    }
    ,
    e.prototype.getCaretFormula = function() {
        return this.getFormula(this.caret.path)
    }
    ,
    e.prototype.moveToStart = function() {
        this.caret.from = this.caret.to = 0,
        this.caret.path.length = 0,
        this.fixCaret()
    }
    ,
    e.prototype.moveToEnd = function() {
        this.caret.from = this.caret.to = this.formula[1].length,
        this.caret.path.length = 0,
        this.fixCaret()
    }
    ,
    e.prototype.moveBy = function(t) {
        var e, u, i, o;
        if (0 > t)
            for (e = i = t; 0 > e; e += 1)
                this.moveLeft();
        else
            for (u = o = t; u > 0; u += -1)
                this.moveRight()
    }
    ,
    e.prototype.moveLeft = function() {
        var t, e, u, i, o, r, n, s;
        if (i = function(e) {
            return function() {
                e.caret.path.push(u - 1),
                e.caret.from = e.caret.to = t[u - 1][1].length
            }
        }(this),
        o = e = this.getCaretFormula(),
        s = o[0],
        t = o[1],
        r = this.caret,
        u = r.from,
        n = r.to,
        u === n) {
            if (u > 0)
                switch (s) {
                case b:
                    this.caret.from = this.caret.to -= 1 + (u > 1 && Unicode.isLowSurrogate(t[u - 1]));
                    break;
                case g:
                    switch (t[u - 1][0]) {
                    case A:
                        this.caret.from = this.caret.to = u - 1;
                        break;
                    case b:
                        i();
                        break;
                    default:
                        return i(),
                        this.moveLeft()
                    }
                    break;
                default:
                    i()
                }
            else if (this.caret.path.length && (this.caret.from = this.caret.to = this.caret.path.pop(),
            s === b || s === g))
                return this.moveLeft()
        } else
            this.caret.to = u;
        this.fixCaret()
    }
    ,
    e.prototype.moveRight = function() {
        var t, e, u, i, o, r, n, s;
        if (i = function(t) {
            return function() {
                t.caret.path.push(u),
                t.caret.from = t.caret.to = 0
            }
        }(this),
        o = e = this.getCaretFormula(),
        s = o[0],
        t = o[1],
        r = this.caret,
        u = r.from,
        n = r.to,
        u === n) {
            if (u < t.length)
                switch (s) {
                case b:
                    this.caret.from = this.caret.to += 1 + (u < t.length - 1 && Unicode.isHighSurrogate(t[u]));
                    break;
                case g:
                    switch (t[u][0]) {
                    case A:
                        this.caret.from = this.caret.to = u + 1;
                        break;
                    case b:
                        i();
                        break;
                    default:
                        return i(),
                        this.moveRight()
                    }
                    break;
                default:
                    i()
                }
            else if (this.caret.path.length && (this.caret.from = this.caret.to = this.caret.path.pop() + 1,
            s === b || s === g))
                return this.moveRight()
        } else
            this.caret.from = n;
        this.fixCaret()
    }
    ,
    e.prototype.updateSelection = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, m, y, v, E;
        for (h = this.selectionStartCaret,
        y = h[0],
        m = h[1],
        o = t[0],
        r = t[1],
        s = m,
        E = r,
        a = 0; y[a] === (c = o[a]) && void 0 !== c; )
            a++;
        (l = this.getFormula(o.slice(0, a))[0]) !== g && l !== b && a--,
        a === (d = y.length) && d === o.length ? (p = MyMath.minmax(s, E),
        s = p[0],
        E = p[1]) : (f = this.getFormula(y),
        v = f[0],
        F = f[1],
        C = this.getFormula(o),
        n = C[0],
        i = C[1],
        y.length > a && (s = y[a],
        y.length !== a + 1 || v !== g && v !== b || (D = m === F.length,
        A = 0 === m,
        D && s++)),
        o.length > a && (E = o[a],
        o.length !== a + 1 || n !== g && n !== b || (e = r === i.length,
        u = 0 === r,
        e && E++)),
        s > E ? (B = [E, s],
        s = B[0],
        E = B[1],
        y.length > a && !D && !A && E++) : E > s ? o.length > a && !e && !u && E++ : E++),
        this.caret.path = o.slice(0, a),
        this.caret.from = s,
        this.caret.to = E
    }
    ,
    e.prototype.selectedFormula = function() {
        var t, e, u, i, o, r, n;
        return i = this.caret,
        u = i.path,
        e = i.from,
        r = i.to,
        e === r ? null : (o = this.getFormula(u),
        n = o[0],
        t = o[1],
        n === b ? [g, [[b, t.slice(e, r)]]] : [g, t.slice(e, r)])
    }
    ,
    e.prototype.selectedText = function() {
        return ""
    }
    ,
    e.prototype.callChange = function() {}
    ,
    e.prototype.insertChar = function(t) {
        var e, n, s, a, h, c, l, E, w, x, _, k, S, T, M, O, j, P, L, I, $, z, G, X, K, Y, Z, Q, tt, et, ut, it, ot, rt, nt, st, at, ht, ct, lt, dt, pt, ft, Ct, Bt, Dt, At, Ft, gt, mt, yt, vt, bt, Et, wt, xt, _t, kt, St, Tt, Mt, Ot;
        switch (delete this.caret.confirmRemove,
        nt = c = this.getCaretFormula(),
        kt = nt[0],
        a = nt[1],
        pt = this.caret,
        l = pt.from,
        _t = pt.to,
        kt) {
        case g:
            return l !== _t && (a.splice(l, _t - l),
            _t = l),
            l > 0 && a[l - 1][0] === b ? (this.caret.path.push(l - 1),
            this.caret.from = this.caret.to = a[l - 1][1].length,
            this.insertChar(t)) : l < a.length && a[l][0] === b ? (this.caret.path.push(l),
            this.caret.from = this.caret.to = 0,
            this.insertChar(t)) : (a.splice(l, 0, [b, ""]),
            this.caret.path.push(l),
            this.caret.from = this.caret.to = 0,
            this.insertChar(t));
        case b:
            a = a.slice(0, l) + t + a.slice(_t),
            l += t.length;
            for (mt in i)
                yt = i[mt],
                mt === a.substr(l - mt.length, mt.length) && (a = a.slice(0, l - mt.length) + yt + a.slice(l),
                l += yt.length - mt.length);
            if ((" " === t || "\n" === t) && (P = /\\([^ \n]*)[ \n]?$/.exec(a.substr(0, l))) && (vt = P[0],
            mt = P[1],
            mt in u && (yt = u[mt],
            a = a.slice(0, l - vt.length) + yt + a.slice(l),
            l += yt.length - vt.length),
            mt in R))
                return ft = this.caret.path,
                tt = 2 <= ft.length ? slice.call(ft, 0, O = ft.length - 1) : (O = 0,
                []),
                et = ft[O++],
                this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                this.addSub(tt, et, [B, [[g, [[b, mt]]], [g, []]]]),
                l > 1 && this.addSub(tt, et, [b, a.slice(0, l - vt.length)]),
                this.caret.path = slice.call(tt).concat([et + (l > 1)], [1]),
                void (this.caret.from = this.caret.to = 0);
            if (Ct = this.caret.path,
            tt = 2 <= Ct.length ? slice.call(Ct, 0, j = Ct.length - 1) : (j = 0,
            []),
            et = Ct[j++],
            K = this.getFormula(tt),
            h = a.slice(0, l),
            h in r && 1 === l && et > 0 && (ut = K[1][et - 1],
            ut[0] === A && (xt = ut[1] + h,
            xt in o)))
                return ut[1] = o[xt],
                l === a.length ? (this.removeSub(tt, et),
                this.caret.path = tt,
                this.caret.from = this.caret.to = et) : (c[1] = a.slice(l),
                this.caret.from = this.caret.to = 0),
                void this.fixCaret();
            switch (t = a[l - 1],
            !0) {
            case t in V:
            case t in H:
            case t in J:
            case t in N:
                return this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                this.addSub(tt, et, [A, t]),
                l > 1 && this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                this.caret.path = tt,
                this.caret.from = this.caret.to = et + 1 + (l > 1),
                void this.fixCaret();
            case "/" === t:
                return Bt = this.getFormula(tt),
                X = Bt[0],
                G = Bt[1],
                x = !0,
                l > 1 ? bt = [g, [[b, a.slice(0, l - 1)]]] : et > 0 && G[et - 1][0] !== A ? (bt = [g, [G[et - 1]]],
                this.removeSub(tt, --et)) : (bt = [g, []],
                x = !1),
                Et = l < a.length ? [b, a.slice(l)] : [g, []],
                I = [C, [bt, Et]],
                this.removeSub(tt, et),
                this.addSub(tt, et, I),
                this.caret.path = slice.call(tt).concat([et], [+x]),
                this.caret.from = this.caret.to = 0,
                void this.fixCaret();
            case "√" === t:
                return this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                this.addSub(tt, et, [F, [[g, []], [g, []]]]),
                l > 1 && this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                this.caret.path = slice.call(tt).concat([et + (l > 1)], [1]),
                void (this.caret.from = this.caret.to = 0);
            case "\n" === t:
                return K = this.getFormula(tt),
                w = 2 <= tt.length ? slice.call(tt, 0, L = tt.length - 1) : (L = 0,
                []),
                Y = tt[L++],
                E = this.getFormula(w),
                ut = K[1].slice(0, et),
                l > 1 && ut.push([b, a.slice(0, l - 1)]),
                $ = K[1].slice(et + 1),
                l < a.length && $.unshift([b, a.slice(l)]),
                E[0] === p ? (E[1].splice(Y, 1, [g, ut], [g, $]),
                this.caret.path = slice.call(w).concat([Y + 1])) : (K[1] = [[p, [[g, ut], [g, $]]]],
                this.caret.path = slice.call(tt).concat([0], [1])),
                this.caret.from = this.caret.to = 0,
                void this.fixCaret();
            case "^" === t:
                if (K = this.getFormula(tt),
                w = 2 <= tt.length ? slice.call(tt, 0, z = tt.length - 1) : (z = 0,
                []),
                Y = tt[z++],
                E = this.getFormula(w),
                this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                1 === l) {
                    if (et > 0)
                        switch (ut = K[1][et - 1],
                        it = ut[0]) {
                        case m:
                            return ut[0] = v,
                            ut[1].push([g, []]),
                            this.caret.path = slice.call(tt).concat([et - 1], [2]),
                            void (this.caret.from = this.caret.to = 0);
                        case f:
                            return this.removeSub(tt, et - 1),
                            this.addSub(tt, et - 1, [y, [[g, [ut]], [g, []]]]),
                            void (this.caret.path = slice.call(tt).concat([et - 1], [1]))
                        }
                    this.addSub(tt, et, [y, [[g, []], [g, []]]]),
                    this.caret.path = slice.call(tt).concat([et], [1]),
                    this.caret.from = this.caret.to = 0
                } else {
                    if (E[0] === m && et === K[1].length && l === a.length)
                        return this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                        E[0] = v,
                        E[1].push([g, []]),
                        this.caret.path = slice.call(w).concat([2]),
                        void (this.caret.from = this.caret.to = 0);
                    this.addSub(tt, et, [y, [[g, [[b, a.slice(0, l - 1)]]], [g, []]]]),
                    this.caret.path = slice.call(tt).concat([et], [1]),
                    this.caret.from = this.caret.to = 0
                }
                return;
            case "_" === t:
                if (K = this.getFormula(tt),
                w = 2 <= tt.length ? slice.call(tt, 0, ot = tt.length - 1) : (ot = 0,
                []),
                Y = tt[ot++],
                E = this.getFormula(w),
                this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                1 === l) {
                    if (et > 0)
                        switch (ut = K[1][et - 1],
                        it = ut[0]) {
                        case y:
                            return ut[0] = v,
                            ut[1].splice(1, 0, [g, []]),
                            this.caret.path = slice.call(tt).concat([et - 1], [1]),
                            void (this.caret.from = this.caret.to = 0);
                        case f:
                            return this.removeSub(tt, et - 1),
                            this.addSub(tt, et - 1, [m, [[g, [ut]], [g, []]]]),
                            void (this.caret.path = slice.call(tt).concat([et - 1], [1]))
                        }
                    this.addSub(tt, et, [m, [[g, []], [g, []]]]),
                    this.caret.path = slice.call(tt).concat([et], [1]),
                    this.caret.from = this.caret.to = 0
                } else {
                    if (E[0] === y && et === K[1].length && l === a.length)
                        return this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                        E[0] = v,
                        E[1].splice(1, 0, [g, []]),
                        this.caret.path = slice.call(w).concat([1]),
                        void (this.caret.from = this.caret.to = 0);
                    this.addSub(tt, et, [m, [[g, [[b, a.slice(0, l - 1)]]], [g, []]]]),
                    this.caret.path = slice.call(tt).concat([et], [1]),
                    this.caret.from = this.caret.to = 0
                }
                return;
            case "┬" === t:
                return this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                l > 1 ? e = [[b, a.slice(0, l - 1)]] : et > 0 ? (e = [this.getFormula(slice.call(tt).concat([et - 1]))],
                this.removeSub(tt, --et)) : e = [],
                this.addSub(tt, et, [d, [[g, e], [g, []], [g, []]]]),
                this.caret.path = slice.call(tt).concat([et], [2]),
                void (this.caret.from = this.caret.to = 0);
            case "┴" === t:
                return this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                l > 1 ? e = [[b, a.slice(0, l - 1)]] : et > 0 ? (e = [this.getFormula(slice.call(tt).concat([et - 1]))],
                this.removeSub(tt, --et)) : e = [],
                this.addSub(tt, et, [d, [[g, e], [g, []], [g, []]]]),
                this.caret.path = slice.call(tt).concat([et], [1]),
                void (this.caret.from = this.caret.to = 0);
            case t in W:
                if (w = 2 <= tt.length ? slice.call(tt, 0, rt = tt.length - 1) : (rt = 0,
                []),
                Y = tt[rt++],
                E = this.getFormula(w),
                E[0] === D && 0 === Y)
                    break;
                return this.removeSub(tt, et),
                l < a.length && this.addSub(tt, et, [b, a.slice(l)]),
                this.addSub(tt, et, [D, [[g, [[b, t]]], [g, []], [g, []], [g, []]]]),
                l > 1 && this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                this.caret.path = slice.call(tt).concat([et + (l > 1)], [3]),
                void (this.caret.from = this.caret.to = 0);
            case t in q:
                if (K = this.getFormula(tt),
                K[0] === g)
                    for (_ = wt = Dt = et; wt >= 0; _ = wt += -1)
                        if (Z = K[1][_],
                        Z[0] === b)
                            for (_ === et ? (n = l - 2,
                            Q = a) : (Q = Z[1],
                            n = Q.length - 1),
                            T = St = At = n; St >= 0; T = St += -1)
                                if (Q[T]in U) {
                                    if (this.removeSub(tt, _),
                                    S = [],
                                    _ === et)
                                        l - T > 2 && S.push([b, a.slice(T + 1, l - 1)]);
                                    else {
                                        for (T < Q.length - 1 && S.push([b, Q.slice(T + 1)]),
                                        M = Tt = Ft = _ + 1,
                                        gt = et; gt > Tt; M = Tt += 1)
                                            S.push(K[1][_]),
                                            this.removeSub(tt, _);
                                        l > 1 && S.push([b, a.slice(0, l - 1)]),
                                        this.removeSub(tt, _)
                                    }
                                    return l < a.length && this.addSub(tt, _, [b, a.slice(l)]),
                                    this.addSub(tt, _, [f, [[g, S]], [Q[T], t]]),
                                    T > 0 && this.addSub(tt, _, [b, Q.slice(0, T)]),
                                    this.caret.path = tt,
                                    this.caret.from = this.caret.to = _ + (T > 0) + 1,
                                    void this.fixCaret()
                                }
                break;
            case t in U:
                if (K = this.getFormula(tt),
                K[0] === g)
                    for (_ = Mt = st = et,
                    at = K[1].length; at > Mt; _ = Mt += 1)
                        if (Z = K[1][_],
                        Z[0] === b)
                            for (_ === et ? (s = l,
                            Q = a) : (s = 0,
                            Q = Z[1]),
                            T = Ot = ht = s,
                            ct = Q.length; ct > Ot; T = Ot += 1)
                                if (Q[T]in q) {
                                    if (this.removeSub(tt, _),
                                    S = [],
                                    _ === et)
                                        T - l > 0 && S.push([b, a.slice(l, T)]);
                                    else {
                                        for (T > 0 && S.push([b, Q.slice(0, T)]),
                                        M = k = lt = _ - 1,
                                        dt = et; k > dt; M = k += -1)
                                            S.unshift(K[1][M]),
                                            this.removeSub(tt, M);
                                        l < a.length && S.unshift([b, a.slice(l)]),
                                        this.removeSub(tt, et)
                                    }
                                    return T < Q.length - 1 && this.addSub(tt, et, [b, Q.slice(T + 1)]),
                                    this.addSub(tt, et, [f, [[g, S]], [t, Q[T]]]),
                                    l > 1 && this.addSub(tt, et, [b, a.slice(0, l - 1)]),
                                    this.caret.path = slice.call(tt).concat([et + (l > 1)], [0]),
                                    this.caret.from = this.caret.to = 0,
                                    void this.fixCaret()
                                }
            }
            return this.caret.from = this.caret.to = l,
            void (c[1] = a);
        default:
            console.log("insertChar missing for ", kt)
        }
    }
    ,
    e.prototype.insertText = function(t) {
        var e, u, i;
        if (0 === t.length)
            this.insertFormula([g, []]);
        else
            for (u = 0,
            i = t.length; i > u; u++)
                e = t[u],
                this.insertChar(e);
        this.reMeasure = !0,
        this.canDelete = !1
    }
    ,
    e.prototype.insertFromToolbar = function(t, u, i) {
        var o, r, n, s, a;
        if (null != u && this.caret.from !== this.caret.to && (s = this.selectedFormula()),
        s && s.length)
            a = new e,
            a.insertText(t),
            a.selectAll(),
            this.insertFormula(a.selectedFormula()),
            this.moveBy(u),
            this.insertFormula(s),
            this.moveBy(i);
        else
            for (r = 0,
            n = t.length; n > r; r++)
                o = t[r],
                this.insertChar(o);
        this.reMeasure = !0,
        this.canDelete = !1
    }
    ,
    e.prototype.insertFormula = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D;
        if ("string" == typeof t && (t = AJson.parse(t)),
        n = t[0],
        r = t[1],
        n === g) {
            switch (l = this.caret,
            h = l.path,
            o = l.from,
            B = l.to,
            d = i = this.getFormula(h),
            D = d[0],
            u = d[1],
            D) {
            case b:
                a = u.slice(0, o),
                C = u.slice(B),
                p = h,
                h = 2 <= p.length ? slice.call(p, 0, s = p.length - 1) : (s = 0,
                []),
                c = p[s++],
                f = i = this.getFormula(h),
                e = f[0],
                u = f[1],
                u.splice(c, 1),
                a && u.splice(c++, 0, [b, a]),
                C && u.splice(c, 0, [b, C]),
                o = c;
                break;
            case g:
                u.splice(o, B - o)
            }
            r.length && (o > 0 && u[o - 1][0] === b && r[0][0] === b && (u[o - 1][1] = u[o - 1][1] + r[0][1],
            r.splice(0, 1)),
            u.splice.apply(u, [o, 0].concat(slice.call(r))),
            o += r.length,
            o < u.length && u[o - 1][0] === b && u[o][0] === b && (c = u[o - 1][1].length,
            u[o - 1][1] = u[o - 1][1] + u[o][1],
            u.splice(o, 1),
            h.push(o - 1),
            o = B = c)),
            i[1] = u,
            this.caret.path = h,
            this.caret.from = this.caret.to = o,
            this.fixCaret(),
            this.reMeasure = !0,
            this.canDelete = !1
        }
    }
    ,
    e.prototype.removeByPath = function(t) {
        var e, u, i;
        t.length && (u = 2 <= t.length ? slice.call(t, 0, e = t.length - 1) : (e = 0,
        []),
        i = t[e++],
        this.caret.path = u,
        this.caret.from = this.caret.to = i,
        this.removeSub(u, i),
        this.fixCaret(),
        this.joinStrings())
    }
    ,
    e.prototype.removeSub = function(t, e) {
        var u, i, o;
        o = this.getFormula(t),
        u = o[0],
        i = o[1],
        i.splice(e, 1)
    }
    ,
    e.prototype.addSub = function(t, e, u) {
        var i, o, r;
        r = this.getFormula(t),
        i = r[0],
        o = r[1],
        o.splice(e, 0, u)
    }
    ,
    e.prototype.fixCaret = function() {
        var t, e, u, i, o, r;
        if (u = this.getCaretFormula(),
        r = u[0],
        t = u[1],
        i = this.caret,
        e = i.from,
        o = i.to,
        e === o)
            switch (r) {
            case g:
                if (e > 0 && t[e - 1][0] === b)
                    return this.caret.path.push(e - 1),
                    void (this.caret.from = this.caret.to = t[e - 1][1].length);
                if (e < t.length && t[e][0] === b)
                    return this.caret.path.push(e),
                    void (this.caret.from = this.caret.to = 0);
                break;
            case b:
                return e < t.length && Unicode.isLowSurrogate(t[e]) && this.caret.from++,
                void (o < t.length && Unicode.isLowSurrogate(t[o]) && this.caret.to++)
            }
    }
    ,
    e.prototype.joinStrings = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p;
        return a = e = this.getCaretFormula(),
        p = a[0],
        t = a[1],
        h = this.caret.path,
        r = 2 <= h.length ? slice.call(h, 0, i = h.length - 1) : (i = 0,
        []),
        s = h[i++],
        c = this.getFormula(r),
        n = c[0],
        o = c[1],
        l = this.caret,
        u = l.from,
        d = l.to,
        p === b && n === g && u === d ? 0 === u && s > 0 && o[s - 1][0] === b ? (this.caret.path[this.caret.path.length - 1]--,
        this.caret.from = this.caret.to = o[s - 1][1].length,
        o[s - 1][1] += t,
        this.removeSub(r, s),
        void (this.reMeasure = !0)) : u === t.length && s < o.length - 1 && o[s + 1][0] === b ? (e[1] += o[s + 1][1],
        this.removeSub(r, s + 1),
        void (this.reMeasure = !0)) : void 0 : void 0
    }
    ,
    e.prototype.setStyle = function(t) {
        var u, i, o, r;
        for (o = ["formulaColor", "formulaAlpha"],
        u = 0,
        i = o.length; i > u; u++)
            r = o[u],
            this.trySetStyle(r, t);
        return null != t.strokeWidth && (this.reMeasure = this.allowAutosize = !0),
        e.__super__.setStyle.apply(this, arguments)
    }
    ,
    e.prototype.applyTransform = function() {
        e.__super__.applyTransform.apply(this, arguments),
        this.reMeasure || this.updateTextLocation()
    }
    ,
    e.prototype.selectAll = function() {
        this.caret.path = [],
        this.caret.from = 0,
        this.caret.to = this.formula[1].length
    }
    ,
    e.prototype.confirmRemovePath = function(t, e) {
        null != t && null != e ? this.caret.confirmRemove = {
            path: e,
            button: t
        } : null != this.caret.confirmRemove && (this.removeByPath(this.caret.confirmRemove.path),
        delete this.caret.confirmRemove)
    }
    ,
    e.prototype.joinArrayAt = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l;
        return r = 2 <= t.length ? slice.call(t, 0, u = t.length - 1) : (u = 0,
        []),
        s = t[u++],
        c = this.getFormula(r),
        e = c[0],
        o = c[1],
        this.caret.path = t,
        this.caret.from = this.caret.to = o[s][1].length,
        Array.prototype.push.apply(o[s][1], o[s + 1][1]),
        o.splice(s + 1, 1),
        1 === o.length && (h = 2 <= r.length ? slice.call(r, 0, i = r.length - 1) : (i = 0,
        []),
        n = r[i++],
        l = this.getFormula(h),
        e = l[0],
        a = l[1],
        1 === a.length && (a.splice.apply(a, [0, 1].concat(slice.call(o[0][1]))),
        this.caret.path = h)),
        this.fixCaret(),
        this.joinStrings()
    }
    ,
    e.prototype.deleteAtBeginning = function(t) {
        var e, u, i, o, r, n;
        i = 2 <= t.length ? slice.call(t, 0, e = t.length - 1) : (e = 0,
        []),
        r = t[e++],
        n = this.getFormula(i),
        o = n[0],
        u = n[1],
        o === p && r > 0 ? this.joinArrayAt(slice.call(i).concat([r - 1])) : this.confirmRemovePath(k, i)
    }
    ,
    e.prototype.deleteAtEnd = function(t) {
        var e, u, i, o, r, n;
        i = 2 <= t.length ? slice.call(t, 0, e = t.length - 1) : (e = 0,
        []),
        r = t[e++],
        n = this.getFormula(i),
        o = n[0],
        u = n[1],
        o === p && r < u.length ? this.joinArrayAt(t) : this.confirmRemovePath(S, i)
    }
    ,
    e.prototype.tryRemovePath = function(t, e) {
        var u;
        u = this.getFormula(e)[0],
        u === A ? this.removeByPath(e) : this.confirmRemovePath(t, e)
    }
    ,
    e.prototype.handleKeyDown = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, m;
        if (r = e.ctrl,
        A = e.shift,
        p = n = this.getCaretFormula(),
        m = p[0],
        o = p[1],
        f = this.caret,
        s = f.from,
        F = f.to,
        null != this.caret.confirmRemove) {
            if (this.caret.confirmRemove.button === t)
                return this.confirmRemovePath(),
                this.reMeasure = !0,
                !0;
            delete this.caret.confirmRemove
        }
        switch (t) {
        case O:
            this.moveToStart();
            break;
        case M:
            this.moveToEnd();
            break;
        case j:
            this.moveLeft();
            break;
        case I:
            this.moveRight();
            break;
        case k:
            switch (m) {
            case g:
                s === F ? 0 === s ? this.deleteAtBeginning(this.caret.path) : this.tryRemovePath(t, slice.call(this.caret.path).concat([s - 1])) : (n[1].splice(s, F - s),
                this.caret.to = s,
                this.fixCaret(),
                this.joinStrings()),
                this.reMeasure = !0;
                break;
            case b:
                s === F ? 0 === s ? (C = this.caret.path,
                l = 2 <= C.length ? slice.call(C, 0, a = C.length - 1) : (a = 0,
                []),
                d = C[a++],
                0 === d ? this.deleteAtBeginning(l) : this.tryRemovePath(t, slice.call(l).concat([d - 1]))) : (i = 1 + (s > 1 && Unicode.isLowSurrogate(o[s - 1])),
                n[1] = o.slice(0, s - i) + o.slice(F),
                this.caret.from = this.caret.to -= i) : (n[1] = o.slice(0, s) + o.slice(F),
                this.caret.to = s),
                0 === n[1].length && (this.caret.from = this.caret.to = this.caret.path.pop(),
                this.removeSub(this.caret.path, this.caret.from)),
                this.reMeasure = !0;
                break;
            default:
                console.log("handleKeyDown BACKSPACE missing for ", m)
            }
            return !0;
        case S:
            switch (m) {
            case g:
                s === F ? s === o.length ? this.deleteAtEnd(this.caret.path) : this.tryRemovePath(t, slice.call(this.caret.path).concat([s])) : (n[1].splice(s, F - s),
                this.caret.to = s,
                this.fixCaret(),
                this.joinStrings()),
                this.reMeasure = !0;
                break;
            case b:
                s === F ? s === o.length ? (B = this.caret.path,
                l = 2 <= B.length ? slice.call(B, 0, h = B.length - 1) : (h = 0,
                []),
                d = B[h++],
                D = this.getFormula(l),
                u = D[0],
                c = D[1],
                d === c.length - 1 ? this.deleteAtEnd(l) : this.tryRemovePath(t, slice.call(l).concat([d + 1]))) : (i = 1 + (s < o.length - 1 && Unicode.isHighSurrogate(o[s])),
                n[1] = o.slice(0, s) + o.slice(F + i)) : (n[1] = o.slice(0, s) + o.slice(F),
                this.caret.to = s),
                0 === n[1].length && (this.caret.from = this.caret.to = this.caret.path.pop(),
                this.removeSub(this.caret.path, this.caret.from)),
                this.reMeasure = !0;
                break;
            default:
                console.log("handleKeyDown DEL missing for ", m)
            }
            return !0;
        case L:
            return;
        case P:
            return;
        case $:
            return;
        case T:
            return
        }
    }
    ,
    e.prototype.inverseTransformCoords = function(t, e) {
        var u;
        return u = Geometry.transformPoint([t, e], this.contentTransformInverse),
        t = u[0],
        e = u[1],
        [t - this.paddingLR - this.x0, e - this.paddingTB - this.y0]
    }
    ,
    e.prototype.coordsToCaret = function(t, e, u, i) {
        var o, r, n, s, a, h, c, l, E, w, x, _, k, S, T, M, O;
        switch (null == i && (i = []),
        M = u.type,
        n = u.content,
        _ = u.positions,
        O = u.width,
        s = function(u) {
            return function(o) {
                var r, s, a;
                return i.push(o),
                r = _[o],
                s = r[0],
                a = r[1],
                u.coordsToCaret(t - s, e - a, n[o], i)
            }
        }(this),
        M) {
        case b:
            for (c = t,
            x = h = 0,
            l = _.length; l > h; x = ++h) {
                if (r = _[x],
                (r + c) / 2 >= t && !(x < n.length && Unicode.isHighSurrogate(n[x])))
                    return [i, Math.max(0, x - 1)];
                c = r
            }
            return [i, n.length];
        case g:
            if (t > O)
                return [i, n.length];
            for (a = E = _.length - 1; E >= 0; a = E += -1)
                if (S = _[a][0],
                t >= S)
                    return s(a);
            return [i, 0];
        case f:
            return s(0);
        case A:
            return [i, i.pop() + (t > O / 2)];
        case C:
            return s(+(e > u.baseline));
        case B:
            return s(+(t > _[1][0]));
        case F:
            return s(+(t > O - n[1].width));
        case p:
            for (a = w = _.length - 1; w >= 0; a = w += -1)
                if (k = _[a],
                o = k[0],
                T = k[1],
                e >= T)
                    return s(a);
            return s(0);
        case y:
            return s(+(t > _[1][0]));
        case m:
            return s(+(t > _[1][0]));
        case v:
            return s(+(t > _[1][0]) * (1 + (e < _[1][1])));
        case d:
            return s(+(e < _[0][1]) + 2 * (e > _[2][1]));
        case D:
            return s(t > Math.max(n[0].width, n[1].width, n[2].width) ? 3 : e > _[1][1] ? 1 : e > _[0][1] ? 0 : 2);
        default:
            return console.log("coordsToCaret missing for ", M),
            [i, 0]
        }
    }
    ,
    e.prototype.mousedown = function(t, e, u) {
        var i, o, r, n;
        null == u && (u = {}),
        r = this.inverseTransformCoords(t, e),
        t = r[0],
        e = r[1],
        n = this.selectionStartCaret = this.coordsToCaret(t, e, this.measured),
        i = n[0],
        o = n[1],
        this.caret.path = i,
        this.caret.from = this.caret.to = o,
        delete this.caret.confirmRemove
    }
    ,
    e.prototype.mousemove = function(t, e) {
        var u;
        u = this.inverseTransformCoords(t, e),
        t = u[0],
        e = u[1],
        this.updateSelection(this.coordsToCaret(t, e, this.measured))
    }
    ,
    e.prototype.mouseup = function(t, e) {
        this.mousemove(t, e),
        delete this.selectionStartCaret,
        this.fixCaret(),
        delete this.caret.confirmRemove
    }
    ,
    e.prototype.doubleClick = function(t, e) {
        var u;
        u = this.inverseTransformCoords(t, e),
        t = u[0],
        e = u[1]
    }
    ,
    e.prototype.canPickFill = function() {
        return !0
    }
    ,
    e.prototype.prepareDraw = function() {
        return this.reMeasure && this.measure(),
        e.__super__.prepareDraw.apply(this, arguments)
    }
    ,
    e.prototype.drawExtra = function(t, e) {
        this.reMeasure && this.measure(),
        t.save(),
        t.transform.apply(t, this.contentTransform),
        t.translate(this.x0, this.y0),
        t.translate(this.paddingLR, this.paddingTB),
        e.highlight && this.drawCaretDeep(t, 0, this.measured, 0, 0, ct, !0),
        t.strokeStyle = t.fillStyle = null != this.formulaStyle ? this.formulaStyle : this.formulaStyle = DrawObject.makeColor(this.style.formulaColor, this.style.formulaAlpha),
        this.drawDeep(t, e.active, this.measured, 0, 0, ct),
        t.restore()
    }
    ,
    e.prototype.drawDeep = function(t, e, u, i, o, r, n) {
        var s, a, h, c, l, E, x, _, k, S, T, M, O, j, P, L, I, $, R, G, H, q, U;
        switch (q = u.type,
        c = u.content,
        l = u.extra,
        a = u.baseline,
        L = u.positions,
        U = u.width,
        x = u.height,
        E = function(u) {
            return function(i, o, s) {
                var a, h, l;
                return null == o && (o = r),
                null == s && (s = n),
                a = L[i],
                h = a[0],
                l = a[1],
                u.drawDeep(t, e, c[i], h, l, o, s)
            }
        }(this),
        t.save(),
        t.translate(i, o),
        t.font = r + 'px "IDroo Math"',
        q) {
        case b:
            n || (c = gt(c)),
            t.fillText(c, 0, r * (1 + at));
            break;
        case g:
            if (c.length)
                for (_ = S = 0,
                M = c.length; M > S; _ = ++S)
                    s = c[_],
                    E(_);
            else
                e && (H = t.globalAlpha,
                t.globalAlpha = .5,
                t.fillText(Y, l, r * (1 + at)),
                t.globalAlpha = H);
            break;
        case A:
            t.fillText(c, 0, r * (1 + at));
            break;
        case C:
            E(0),
            E(1),
            t.beginPath(),
            t.moveTo(0, a),
            t.lineTo(U, a),
            t.lineWidth = .05 * r,
            t.lineCap = "butt",
            t.stroke();
            break;
        case B:
            E(0, null, !0),
            E(1);
            break;
        case F:
            t.beginPath(),
            $ = c[0],
            R = c[1],
            P = r * X,
            k = .05 * r,
            i = U - R.width - P,
            o = x - R.height - 2 * k,
            t.moveTo(i - 12 * k, a + 2 * k),
            t.lineTo(i - 12.5 * k, a + k),
            t.lineTo(i - 8.5 * k, a),
            t.lineTo(i - 5.5 * k, x - 2 * k - .01 * x),
            t.lineTo(i - k, o),
            t.lineTo(U, o),
            t.lineTo(U, o + 4 * k),
            t.lineTo(U - k, o + 4 * k),
            t.lineTo(U - k, o + k),
            t.lineTo(i, o + k),
            t.lineTo(i - 5 * k, x),
            t.lineTo(i - 6 * k, x),
            t.lineTo(i - 9.4 * k, a + 1.5 * k),
            t.fill(),
            ($.content.length > 0 || e) && E(0, r * ht),
            E(1);
            break;
        case p:
            for (_ = j = 0,
            O = c.length; O > j; _ = ++j)
                s = c[_],
                E(_);
            break;
        case y:
        case m:
            E(0),
            E(1, r * ht);
            break;
        case v:
            E(0),
            E(1, r * ht),
            E(2, r * ht);
            break;
        case d:
            s = c[0],
            R = c[1],
            G = c[2],
            E(0),
            (R.content.length > 0 || e) && E(1, r * ht),
            (G.content.length > 0 || e) && E(2, r * ht);
            break;
        case D:
            s = c[0],
            R = c[1],
            G = c[2],
            E(0, r * w),
            (R.content.length > 0 || e) && E(1, r * ht),
            (G.content.length > 0 || e) && E(2, r * ht),
            E(3);
            break;
        case f:
            E(0),
            T = l[0],
            I = l[1],
            x > r * (z + at) ? (h = .3 * r,
            t.beginPath(),
            "├" !== T && "┤" !== T && Geometry.makeBracketPath(t, T, [0, 0], h, x, r),
            "├" !== I && "┤" !== I && Geometry.makeBracketPath(t, I, [U - h, 0], h, x, r),
            t.fill()) : ("├" !== T && "┤" !== T && t.fillText(T, 0, r * (1 + at)),
            "├" !== T && "┤" !== T && t.fillText(I, L[0][0] + c[0].width, r * (1 + at)));
            break;
        default:
            console.log("drawDeep missing for ", q)
        }
        t.restore()
    }
    ,
    e.prototype.drawCaret = function(t) {
        this.reMeasure && this.measure(),
        t.save(),
        t.transform.apply(t, this.contentTransform),
        t.translate(this.x0, this.y0),
        t.translate(this.paddingLR, this.paddingTB),
        this.drawCaretDeep(t, 0, this.measured, 0, 0, this.style.textSize),
        t.restore()
    }
    ,
    e.prototype.drawCaretDeep = function(t, e, u, i, o, r, n) {
        var p, f, C, B, A, x, _, k, S, T, M, O, j;
        if (null == n && (n = !1),
        T = u.type,
        p = u.content,
        x = u.positions,
        A = function(t) {
            var e;
            return e = t < x.length ? T === b ? x[t] : t > 0 ? (x[t - 1][0] + p[t - 1].width + x[t][0]) / 2 : x[t][0] : T === g && 0 === p.length ? u.width / 2 : u.width
        }
        ,
        t.save(),
        t.translate(i, o),
        n && this.caret.confirmRemove && e === this.caret.confirmRemove.path.length - 1 && (B = this.caret.confirmRemove.path[e],
        M = A(B),
        O = A(B + 1),
        t.fillStyle = l,
        t.fillRect(M, 0, O - M, u.height)),
        _ = this.caret,
        S = _.to,
        f = _.from,
        C = e === this.caret.path.length - 1 && T === g && n && S === f,
        e === this.caret.path.length || C)
            M = A(S),
            n ? S > f ? (O = A(f),
            t.fillStyle = Z,
            t.fillRect(M, 0, O - M, u.height)) : !this.caret.path.length || this.selectionStartCaret || this.caret.confirmRemove || (t.fillStyle = E,
            t.fillRect(0, 0, u.width, u.height)) : S === f && (j = u.baseline + h * r,
            t.beginPath(),
            t.moveTo(M, j),
            t.lineTo(M, j + a * r),
            t.lineWidth = c,
            t.lineCap = "butt",
            t.strokeStyle = s,
            t.stroke());
        else {
            switch (B = this.caret.path[e],
            k = x[B],
            M = k[0],
            j = k[1],
            T) {
            case F:
                0 === B && (r *= ht);
                break;
            case y:
            case m:
                1 === B && (r *= ht);
                break;
            case v:
            case d:
                1 !== B && 2 !== B || (r *= ht);
                break;
            case D:
                0 === B && (r *= w),
                1 !== B && 2 !== B || (r *= ht)
            }
            this.drawCaretDeep(t, e + 1, p[B], M, j, r, n)
        }
        t.restore()
    }
    ,
    e.prototype.updateTextLocation = function() {
        var t, e, u, i, o, r, n, s;
        i = this.rawPoints,
        r = i[0],
        n = i[1],
        s = i[2],
        o = this.points,
        t = o[0],
        e = o[1],
        u = o[2],
        this.x0 = r[0],
        this.y0 = r[1],
        this.contentTransform = Geometry.transformFromToMatrix(r, n, s, t, e, u),
        this.contentTransformInverse = Geometry.inverseMatrix(this.contentTransform)
    }
    ,
    e.prototype.measure = function() {
        var t, e, u, i, o, r, n, s, a;
        this.reMeasure = !1,
        this.updateTextLocation(),
        this.lineHeight = Math.round(ct * z),
        this.paddingTB = Math.ceil(this.style.strokeWidth / 2 + ct / 8),
        this.paddingLR = Math.ceil(this.style.strokeWidth / 2 + ct / 4),
        this.measured = this.measureDeep(this.formula, ct),
        this.text = AJson.stringify(this.formula),
        this.changed.text = !0,
        u = this.rawPoints,
        i = u[0],
        r = i[0],
        s = i[1],
        o = u[1],
        n = o[0],
        a = o[1],
        t = n > r ? 1 : -1,
        e = a > s ? 1 : -1,
        n = r + t * (this.measured.width + 2 * this.paddingLR),
        a = s + e * (this.measured.height + 2 * this.paddingTB),
        this.rawPoints[1] = [n, a],
        this.rawPoints[2] = [n, s],
        this.rawPoints[3] = [r, a],
        this.setPointChanged(1, 2, 3),
        this.refreshPoints(),
        this.callChange()
    }
    ,
    e.prototype.measureDeep = function(t, e, u, i, o) {
        var r, s, a, h, c, l, E, k, S, T, M, O, j, P, L, I, $, R, G, H, q, U, W, N, V, J, Z, et, ut, it, ot, rt, nt, st, ct, lt, dt, pt, ft, Bt, Dt, At, Ft, mt, yt, vt;
        if (At = t[0],
        h = t[1],
        c = t[2],
        null == u && (u = []),
        yt = 0,
        k = 0,
        s = e * (n + at),
        q = [],
        J = [],
        Ct) {
            switch (Ct.font = e + 'px "IDroo Math"',
            At) {
            case g:
            case C:
            case f:
            case p:
                if (h.length)
                    for (T = O = 0,
                    P = h.length; P > O; T = ++O)
                        Dt = h[T],
                        q.push(this.measureDeep(Dt, e, slice.call(u).concat([T]), i, o))
            }
            switch (At) {
            case b:
                for (nt = "",
                J.push(0),
                H = 0,
                L = h.length; L > H; H++)
                    a = h[H],
                    i || (a = gt(a)),
                    J.push(yt = Ct.measureText(nt += a).width);
                k = e * (z + at),
                q = h;
                break;
            case g:
                if (S = 0,
                h.length || At === f) {
                    for (U = 0,
                    I = q.length; I > U; U++)
                        lt = q[U],
                        s = Math.max(s, lt.baseline),
                        S = Math.max(S, lt.height - lt.baseline);
                    for (T = W = 0,
                    $ = q.length; $ > W; T = ++W)
                        lt = q[T],
                        J.push([yt, s - lt.baseline]),
                        yt += lt.width,
                        T < q.length - 1 && (mt = this.formulaTypeRight(h[T], slice.call(u).concat([T])),
                        Ft = this.formulaTypeLeft(h[T + 1], slice.call(u).concat([T + 1])),
                        yt += o ? e * tt[mt][Ft] * Q : e * tt[mt][Ft]);
                    k = s + S
                } else
                    c = Ct.measureText(Y).width / -2,
                    yt = 0,
                    k = e * (z + at);
                break;
            case A:
                yt = Ct.measureText(h).width,
                k = e * (z + at),
                q = h;
                break;
            case C:
                N = e * X,
                dt = q[0],
                pt = q[1],
                yt = 2 * N + Math.max(dt.width, pt.width),
                k = 2 * N + dt.height + pt.height,
                s = dt.height + N,
                J.push([(yt - dt.width) / 2, 0]),
                J.push([(yt - pt.width) / 2, dt.height + 2 * N]);
                break;
            case B:
                N = e * K,
                q.push(this.measureDeep(h[0], e, slice.call(u).concat([0]), !0, o)),
                q.push(this.measureDeep(h[1], e, slice.call(u).concat([1]), i, o)),
                dt = q[0],
                pt = q[1],
                yt = dt.width + N + pt.width,
                s = Math.max(dt.baseline, pt.baseline),
                S = Math.max(dt.height - dt.baseline, pt.height - pt.baseline),
                k = s + S,
                J.push([0, s - dt.baseline]),
                J.push([dt.width + N, s - pt.baseline]);
                break;
            case F:
                q.push(this.measureDeep(h[0], e * ht, slice.call(u).concat([0]), i, !0)),
                q.push(this.measureDeep(h[1], e, slice.call(u).concat([1]), i, o)),
                dt = q[0],
                pt = q[1],
                M = .05 * e,
                l = dt.content.length > 0,
                s = pt.height - pt.baseline,
                N = e * X,
                yt = N + Math.max(10 * M + pt.width, 5 * M + dt.width * l + pt.width),
                k = Math.max(dt.height * l + s, pt.height + 2 * M),
                s = k - s,
                J.push([dt.width * !l / -2, s - dt.height]),
                J.push([yt - pt.width - N, k - pt.height]);
                break;
            case p:
                for (yt = 0,
                N = e * X,
                Z = 0,
                R = q.length; R > Z; Z++)
                    lt = q[Z],
                    yt = Math.max(yt, lt.width);
                for (k = 0,
                et = 0,
                G = q.length; G > et; et++)
                    lt = q[et],
                    J.push([(yt - lt.width) / 2, k]),
                    k += lt.height + N;
                k -= N,
                s = 1 === h.length ? q[0].baseline : k / 2;
                break;
            case y:
                q.push(this.measureDeep(h[0], e, slice.call(u).concat([0]), i, o)),
                q.push(this.measureDeep(h[1], e * ht, slice.call(u).concat([1]), i, !0)),
                dt = q[0],
                pt = q[1],
                M = .05 * e,
                E = pt.content.length > 0,
                yt = dt.width + pt.width + M,
                k = dt.height + pt.height - e * z / 2,
                s = dt.baseline + pt.height - e * z / 2,
                J.push([0, k - dt.height]),
                J.push([dt.width + M, 0]);
                break;
            case m:
                q.push(this.measureDeep(h[0], e, slice.call(u).concat([0]), i, o)),
                q.push(this.measureDeep(h[1], e * ht, slice.call(u).concat([1]), i, !0)),
                dt = q[0],
                pt = q[1],
                M = .05 * e,
                yt = dt.width + pt.width + M,
                k = dt.height + pt.height - e * z / 2,
                s = dt.baseline,
                J.push([0, 0]),
                J.push([dt.width + M, k - pt.height]);
                break;
            case v:
                q.push(this.measureDeep(h[0], e, slice.call(u).concat([0]), i, o)),
                q.push(this.measureDeep(h[1], e * ht, slice.call(u).concat([1]), i, !0)),
                q.push(this.measureDeep(h[2], e * ht, slice.call(u).concat([2]), i, !0)),
                dt = q[0],
                pt = q[1],
                ft = q[2],
                M = .05 * e,
                yt = dt.width + M + Math.max(pt.width, ft.width),
                k = dt.height + pt.height + ft.height - e * z,
                s = dt.baseline + ft.height - e * z / 2,
                J.push([0, pt.height - e * z / 2]),
                J.push([dt.width + M, k - ft.height]),
                J.push([dt.width + M, 0]);
                break;
            case d:
                q.push(this.measureDeep(h[0], e, slice.call(u).concat([0]), i, o)),
                q.push(this.measureDeep(h[1], e * ht, slice.call(u).concat([1]), i, !0)),
                q.push(this.measureDeep(h[2], e * ht, slice.call(u).concat([2]), i, !0)),
                dt = q[0],
                pt = q[1],
                ft = q[2],
                k = dt.height,
                s = dt.baseline,
                r = 0,
                pt.content.length && (k += pt.height,
                s += pt.height,
                r = pt.height),
                ft.content.length && (k += ft.height),
                yt = Math.max(dt.width, pt.width, ft.width),
                J.push([(yt - dt.width) / 2, r]),
                J.push([(yt - pt.width) / 2, r - pt.height]),
                J.push([(yt - ft.width) / 2, r + dt.height]);
                break;
            case D:
                q.push(this.measureDeep(h[0], e * w, slice.call(u).concat([0]), i, !0)),
                q.push(this.measureDeep(h[1], e * ht, slice.call(u).concat([1]), i, !0)),
                q.push(this.measureDeep(h[2], e * ht, slice.call(u).concat([2]), i, !0)),
                q.push(this.measureDeep(h[3], e, slice.call(u).concat([3]), i, o)),
                st = ct = 0,
                "∫" !== (ut = null != (it = h[0][1][0]) ? it[1] : void 0) && "∬" !== ut && "∭" !== ut && "⨌" !== ut && "∮" !== ut && "∯" !== ut && "∰" !== ut || (st = e * x,
                ct = e * _),
                dt = q[0],
                pt = q[1],
                ft = q[2],
                Bt = q[3],
                vt = 2 * Math.max(dt.width / 2, pt.width / 2 + st, ft.width / 2 + ct),
                yt = vt + Bt.width + e * K,
                s = Math.max(dt.baseline + ft.height, Bt.baseline),
                k = s + Math.max(dt.height - dt.baseline + pt.height, Bt.height - Bt.baseline),
                J.push([(vt - dt.width) / 2, s - dt.baseline - .05 * e]),
                J.push([(vt - pt.width) / 2 - st, s + dt.height - dt.baseline]),
                J.push([(vt - ft.width) / 2 + ct, s - dt.baseline - ft.height]),
                J.push([yt - Bt.width, s - Bt.baseline]);
                break;
            case f:
                ot = q[0],
                yt = ot.width,
                k = ot.height,
                s = ot.baseline,
                j = c[0],
                rt = c[1],
                V = 0,
                k > e * (z + at) ? ("├" !== j && "┤" !== j && (yt += V = .3 * e),
                "├" !== rt && "┤" !== rt && (yt += .3 * e)) : ("├" !== j && "┤" !== j && (yt += V = Ct.measureText(j).width),
                "├" !== rt && "┤" !== rt && (yt += Ct.measureText(rt).width)),
                J.push([V, 0]);
                break;
            default:
                console.log("measureDeep missing for ", At)
            }
            return {
                type: At,
                content: q,
                extra: c,
                positions: J,
                width: yt,
                height: k,
                baseline: s
            }
        }
    }
    ,
    e.prototype.formulaTypeLeft = function(t, e) {
        var u, i, o, r, n, s, a, h, c, l, d;
        switch (d = t[0],
        u = t[1],
        d) {
        case f:
            return it;
        case A:
            if (u in J)
                return e.length && (a = e,
                e = 2 <= a.length ? slice.call(a, 0, i = a.length - 1) : (i = 0,
                []),
                s = a[i++],
                h = this.getFormula(e),
                n = h[0],
                o = h[1],
                r = s > o.length - 2 ? null : o[s + 1],
                (1 > s || (c = this.formulaTypeRight(o[s - 1], slice.call(e).concat([s - 1]))) === et || c === rt) && (null === r || r[0] !== A && ((l = this.formulaTypeLeft(r, slice.call(e).concat([s + 1]))) === ot || l === it))) ? nt : et;
            if (u in H)
                return et;
            if (u in N)
                return rt;
            if (u in V)
                return nt
        }
        return ot
    }
    ,
    e.prototype.formulaTypeRight = function(t, e) {
        var u, i;
        switch (i = t[0],
        u = t[1],
        i) {
        case f:
            return ut
        }
        return this.formulaTypeLeft(t, e)
    }
    ,
    e.prototype.serialize = function() {
        var t;
        return this.reMeasure && this.measure(),
        t = e.__super__.serialize.apply(this, arguments),
        t.t = this.text,
        null == t.S && (t.S = {}),
        idroo.utils.colorsEqual(this.style.formulaColor, DrawObject.defaultStyle.formulaColor) || (t.S.c = this.style.formulaColor),
        this.style.formulaAlpha !== DrawObject.defaultStyle.formulaAlpha && (t.S.a = this.style.formulaAlpha),
        t
    }
    ,
    e.prototype.changes = function() {
        var t, u, i, o;
        if (this.reMeasure && this.measure(),
        i = e.__super__.changes.apply(this, arguments),
        null != this.changed.style && (null == i.S && (i.S = {}),
        null != this.changed.style.formulaColor && (i.S.c = this.style.formulaColor),
        null != this.changed.style.formulaAlpha && (i.S.a = this.style.formulaAlpha)),
        null != this.changed.text && this.text !== this.lastText) {
            for (o = 0,
            u = this.lastText.length - 1,
            t = this.text.length - 1; u >= o && t >= o && this.lastText[o] === this.text[o]; )
                o++;
            for (; u >= o && t >= o && this.lastText[u] === this.text[t]; )
                u--,
                t--;
            u++,
            t++,
            this.lastText = this.text,
            i._ = {
                p: o,
                l: u - o,
                s: this.text.substr(o, t - o)
            }
        }
        return i
    }
    ,
    e.prototype.restoreChange = function(t) {
        var u;
        e.__super__.restoreChange.call(this, t),
        null != t.S && (null == t.S.c && null == t.S.a || (null != t.S.c && (this.style.formulaColor = t.S.c),
        null != t.S.a && (this.style.formulaAlpha = t.S.a),
        this.formulaStyle = null)),
        null != t.t && (this.lastText = this.text = t.t),
        null != t._ && (this.lastText = this.text = this.text.substr(0, t._.p) + t._.s + this.text.substr(t._.p + t._.l));
        try {
            this.formula = AJson.parse(this.text)
        } catch (i) {
            u = i,
            this.formula = [g, []]
        }
        try {
            "undefined" != typeof Fonts && null !== Fonts && Fonts.unlessLoaded("IDroo Math", function(t) {
                return function() {
                    return t.measure(),
                    t.callChange()
                }
            }(this))
        } catch (i) {
            u = i
           // console.log(u)
        }
        this.reMeasure = !0,
        this.canDelete = !1
    }
    ,
    e
}(DrawRectangle);
var Layer;
("undefined" != typeof exports && null !== exports ? exports : this).Layer = Layer = function() {
    function t(t) {
        this.board = t,
        this.canvas = $("<canvas>")[0],
        this.context = this.canvas.getContext("2d"),
        this.changed = !0
    }
    return t.prototype.draw = function(t) {
        var e, u;
        if (this.changed)
            return this.changed = !1,
            e = this.context,
            e.clearRect(0, 0, this.canvas.width, this.canvas.height),
            e.save(),
            u = 1 / this.board.zoom,
            e.scale(u, u),
            e.translate(this.board.x, this.board.y),
            t(e),
            e.restore(),
            this
    }
    ,
    t
}();
var BoardLayer, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
("undefined" != typeof exports && null !== exports ? exports : this).BoardLayer = BoardLayer = function(t) {
    function e(t, i) {
        this.board = t,
        this.options = $.extend(!0, {}, u, i),
        this.index = [],
        this.objects = {},
        e.__super__.constructor.apply(this, arguments)
    }
    var u;
    return extend(e, t),
    u = {
        followBoardIndex: !1,
        draw: {
            stroke: !0,
            fill: !0,
            extra: !0,
            highlight: !1,
            points: !1
        }
    },
    e.prototype.add = function(t) {
        var e, u, i;
        if ("string" == typeof t)
            this.index.push(t),
            this.objects[t] = 1;
        else
            for (this.index = this.index.concat(t),
            u = 0,
            i = t.length; i > u; u++)
                e = t[u],
                this.objects[e] = 1;
        return this.changed = !0,
        this
    }
    ,
    e.prototype.remove = function(t) {
        var e, u, i;
        if ("string" == typeof t)
            this.index.removeItem(t),
            delete this.objects[t];
        else
            for (this.index.removeItems(t),
            u = 0,
            i = t.length; i > u; u++)
                e = t[u],
                delete this.objects[e];
        return this.changed = !0,
        this
    }
    ,
    e.prototype.empty = function() {
        return this.index.length ? (this.index = [],
        this.objects = {},
        this.changed = !0,
        this) : this
    }
    ,
    e.prototype.isEmpty = function() {
        return !this.index.length
    }
    ,
    e.prototype.draw = function() {
        var t, u, i;
        return u = [t = -this.board.viewport.x, i = -this.board.viewport.y, t + this.board.viewport.width, i + this.board.viewport.height],
        e.__super__.draw.call(this, function(t) {
            return function(e) {
                t.each(function(i, o) {
                    return Geometry.rectangleOverRectangle(u, o.outerBounds) ? o.draw(e, t.options.draw) : void 0
                })
            }
        }(this)),
        this
    }
    ,
    e.prototype.each = function(t) {
        var e, u, i, o, r, n;
        for (u = "function" == typeof t,
        e = this.options.followBoardIndex ? this.board.index : this.index,
        i = 0,
        r = e.length; r > i; i++)
            o = e[i],
            this.objects[o] && (n = this.board.objects[o],
            t.call(n, o, n));
        return this
    }
    ,
    e.prototype.pickObjectPoint = function(t, e, u) {
        var i, o, r, n, s;
        for (null == u && (u = !0),
        o = this.options.followBoardIndex ? this.board.index : this.index,
        i = r = s = o.length - 1; r >= 0; i = r += -1)
            if (n = o[i],
            this.objects[n] && this.board.objects[n].pickPoint(t, e, u))
                return n;
        return !1
    }
    ,
    e.prototype.pickObject = function(t, e) {
        var u, i, o, r, n;
        for (i = this.options.followBoardIndex ? this.board.index : this.index,
        u = o = n = i.length - 1; o >= 0; u = o += -1)
            if (r = i[u],
            this.objects[r] && this.board.objects[r].pickUp(t, e))
                return r;
        return !1
    }
    ,
    e.prototype.pickObjects = function(t) {
        var e;
        return e = [],
        this.each(function(u, i) {
            return i.rectangleOver(t) ? e.push(u) : void 0
        }),
        e
    }
    ,
    e.prototype.to = function(t, e) {
        return this.splitTo(this.index, t, e),
        this.empty()
    }
    ,
    e.prototype.splitTo = function(t, e, u) {
        var i, o, r, n, s;
        if (u) {
            for (s = [],
            n = [],
            i = 0,
            r = t.length; r > i; i++)
                o = t[i],
                this.board.objects[o].locked ? n.push(o) : s.push(o);
            e.add(s),
            u.add(n)
        } else
            e.add(this.index)
    }
    ,
    e.prototype.toMap = function(t) {
        return this.each(function(e, u) {
            t[e] = u
        })
    }
    ,
    e
}(Layer);
var BoardGroupedLayer, extend = function(t, e) {
    function u() {
        this.constructor = t
    }
    for (var i in e)
        hasProp.call(e, i) && (t[i] = e[i]);
    return u.prototype = e.prototype,
    t.prototype = new u,
    t.__super__ = e.prototype,
    t
}, hasProp = {}.hasOwnProperty;
("undefined" != typeof exports && null !== exports ? exports : this).BoardGroupedLayer = BoardGroupedLayer = function(t) {
    function e(t, u) {
        e.__super__.constructor.apply(this, arguments),
        this.index = {}
    }
    return extend(e, t),
    e.prototype.add = function(t, e) {
        var u, i, o, r;
        if (null == (u = this.index)[t] && (u[t] = []),
        "string" == typeof e)
            this.index[t].push(e),
            this.objects[e] = 1;
        else
            for (this.index[t] = this.index[t].concat(e),
            i = 0,
            r = e.length; r > i; i++)
                o = e[i],
                this.objects[o] = 1;
        return this.changed = !0,
        this
    }
    ,
    e.prototype.remove = function(t, e) {
        var u, i, o, r;
        if (t in this.index) {
            if (e)
                this.index[t].remove(e),
                delete this.objects[e];
            else {
                for (r = this.index[t],
                u = 0,
                o = r.length; o > u; u++)
                    i = r[u],
                    delete this.objects[i];
                delete this.index[t]
            }
            this.changed = !0
        }
        return this
    }
    ,
    e.prototype.empty = function() {
        return this.index = {},
        this.changed = !0,
        this
    }
    ,
    e.prototype.isEmpty = function() {
        var t, e, u;
        u = this.index;
        for (e in u)
            return t = u[e],
            !1;
        return !0
    }
    ,
    e.prototype.each = function(t) {
        var e, u, i, o, r, n, s, a;
        i = "function" == typeof t,
        s = this.index;
        for (n in s)
            for (u = s[n],
            this.options.perGroup && $.extend(!0, this.options, this.options.perGroup(n)),
            e = 0,
            r = u.length; r > e; e++)
                o = u[e],
                this.objects[o] && (a = this.board.objects[o],
                t.call(a, o, a));
        return this
    }
    ,
    e.prototype.pickObject = function(t, e) {
        return !1
    }
    ,
    e.prototype.to = function(t, e, u) {
        return t in this.index && (this.splitTo(this.index[t], e, u),
        this.remove(t)),
        this
    }
    ,
    e
}(BoardLayer);
var idroo, ui, bind = function(t, e) {
    return function() {
        return t.apply(e, arguments)
    }
}, indexOf = [].indexOf || function(t) {
    for (var e = 0, u = this.length; u > e; e++)
        if (e in this && this[e] === t)
            return e;
    return -1
}
, slice = [].slice;
idroo = this.idroo,
ui = idroo.ui = idroo.ui || {},
this.Board = function() {
    function t(t, e) {
        this.name = t,
            this.deleteAll = bind(this.deleteAll, this),
            this.deleteUnderEraser = bind(this.deleteUnderEraser, this),
            this.lock("load", 2e3),
            this.userId = null,
            this.editorId = null,
            this.editors = {},
            this.index = [],
            this.objects = {},
            this.x = this.y = 0,
            this.width = this.height = 0,
            this.viewport = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            this.bounds = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            this.pointer = {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0,
                shadowX: 0,
                shadowY: 0,
                offsetX: 0,
                offsetY: 0
            },
            this.syncPointer = !1,
            this.action = "",
            this.zoomLevel = 0,
            this.zoom = 1,
            this.selection = !1,
            this.activeBounds = !1,
            this.activeBoundsOffset = !1,
            this.scaleHandles = {},
            this.scaleFrom = [],
            this.scaleTo = [],
            this.activeScaleHandle = !1,
            this.rotateCenter = [],
            this.rotateFrom = [],
            this.rotateTo = !1,
            this.background = new Layer(this),
            this.locked = new BoardLayer(this, {
                followBoardIndex: !0
            }),
            this.fixed = new BoardLayer(this, {
                followBoardIndex: !0
            }),
            this.others = new BoardGroupedLayer(this, {
                perGroup: function (t) {
                    return function (t) {
                        return {
                            draw: {
                                highlight: idroo.utils.editorColor(t, .3)
                            }
                        }
                    }
                }(this)
            }),
            this.active = new BoardLayer(this, {
                draw: {
                    highlight: i,
                    active: !0
                }
            }),
            this.highlights = new BoardLayer(this, {
                draw: {
                    highlight: i,
                    fill: !1,
                    stroke: !1,
                    extra: !1
                }
            }),
            this.overlay = new Layer(this),
            this.backgroundImage = "",
            this.overlays = {},
            this.overlayId = 0,
            this.allowSync = !1,
            this.syncNew = {},
            this.syncChanged = {},
            this.syncDelete = {},
            this.syncActive = !1,
            this.syncOrder = [],
            //this.socket=io("/",{path:"/"+"socket.io"}),//ggggg
            this.socket = {},// = io(),
       // console.warn(this);
        //this.socket=io("wss://localhost:5003"),
        this.reconnects = 0,
       
      



             

        this.name = "javad6",
        this.userId = 1218010;
        var editor={"nr":6,"id":1218010,"pic":null,"name":"javad6","mouse":[50,100],"active":[]};
        this.editorId=6,
        this.allowSync = !0,
       // this.unlock(),
        ui.sharing.setAccess("own"),
        this.editorNr=6;
         
        ui.editors.add(editor),
        ui.phone.addUser(editor),
         
        ui.toolbar.setTitle("hhhhhhhh");
       
        this.access = "own",
        

       

            this.editors[editor.nr] = editor,
            
         
       // console.warn("3333333333"),

        //this.socket.on("connect", function(t) {
        //    return function() {
        //        t.unlock(),
        //        t.socket.emit("open board", t.name)
        //    }
        //}(this)),
        //this.socket.on("board not found", function(t) {
        //    return function(e) {
        //        t.lock("board-not-found")
        //    }
        //}(this)),
        //this.socket.on("ping", function(t) {
        //    return function() {
        //        t.socket.emit("pong")
        //    }
        //}(this)),
        //this.socket.on("disconnect", function(t) {
        //    return function() {
        //        5 === t.reconnects ? (t.lock("reconnect-manual"),
        //        t.socket.disconnect()) : t.lock("reconnect"),
        //        t.allowSync = !1
        //    }
        //}(this)),
        //this.socket.on("reconnect", function(t) {
        //    return function() {
        //        t.reconnects++,
        //        t.lock("load"),
        //        $("#reconnecting").fadeOut()
        //    }
        //}(this)),
        //this.socket.on("reconnecting", function(t) {
        //    return function() {}
        //}(this)),
        //this.socket.on("reconnect_failed", function(t) {
        //    return function() {
        //        t.lock("fail")
        //    }
        //}(this)),
        //this.socket.on("info", function(t) {
        //    return function(e) {
        //        t.userId = e.uid,
        //        ui.sharing.setAccess(e.access),
        //        ui.toolbar.setTitle(e.title),
        //        t.unlock()
        //    }
        //}(this)),
        //this.socket.on("access level", function(t) {
        //    return function(e) {
        //        t.access = e,
        //        ui.toolbar.setLevel(e),
        //        ui.aside.setLevel(e),
        //        ui.clipboard.setLevel(e),
        //        ui.keyboard.setLevel(e),
        //        ui.phone.setLevel(e),
        //        t.canEdit() ? (t.container.on("dragenter.edit-access dragover.edit-access", function(t) {
        //            return t.preventDefault()
        //        }),
        //        t.container.on("drop.edit-access", function(e) {
        //            return t.handleDrop(e.originalEvent)
        //        }),
        //        t.container.on("contextmenu.edit-access", function(e) {
        //            return t.contextmenu()
        //        })) : (t.container.off(".edit-access"),
        //        t.releaseAll(),
        //        idroo.history.clear())
        //    }
        //}(this)),
        //this.socket.on("set", function(t) {
        //    return function(t, e) {
        //        switch (t) {
        //        case "access":
        //            ui.sharing.setAccess(e);
        //            break;
        //        case "title":
        //            ui.toolbar.setTitle(e)
        //        }
        //    }
        //}(this)),
        //this.socket.on("init", function(t) {
        //    console.log("get init");
        //    return function(e, u) {
        //        console.log(e);
        //        console.log(u);
        //        t.init(),
        //        e && t.restoreChange(e),
        //        u && idroo.ui.chat.init(u),
        //        t.allowSync = !0
        //        console.log("get init2");
        //    }
        //}(this)),
        //this.socket.on("sync", function(t) {
        //    return function(e) {
        //        myArr.push(e);

        //      //  t.restoreChange(e)
        //    }
        //}(this)),
        //this.socket.on("editor nr", function(t) {
        //    return function(e) {
        //        t.editorNr = e
        //    }
        //}(this)),
        //this.socket.on("add editor", function(t) {
        //    return function(e) {
        //        t.editors[e.nr] = e,
        //        ui.editors.add(e),
        //        ui.phone.addUser(e)
        //    }
        //}(this)),
        //this.socket.on("remove editor", function(t) {
        //    return function(e) {
        //        t.removeEditor(e)
        //    }
        //}(this)),
        //this.socket.on("users", ui.sharing.setUsers),
        //this.socket.on("add user", ui.sharing.addUser),
        //this.socket.on("remove user", ui.sharing.removeUser),
        //this.socket.on("set user access", ui.sharing.setUserAccess),
        //this.socket.on("set background", function(t) {
        //    return function(e) {
        //        t.setBackground(e)
        //    }
        //}(this)),
        //this.socket.on("chat", idroo.ui.chat.add),
        //this.socket.on("phone", ui.phone.handleMessage),
        $("#lock-reason-reconnect-manual .button").click(function(t) {
            return function() {
                t.socket.connect(),
                t.reconnects = 0,
                t.lock("load")
            }
        }(this)),
        this.androidInput = !1,
        navigator.userAgent.toLowerCase().indexOf("android") > -1 ? (this.androidInput = !0,
        this.input = $('<textarea id="input-element" class="allow-propagation" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">')) : this.input = $('<div id="input-element" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" contenteditable="true">'),
        this.textActive = null,
        this.caretVisible = 0,
        this.previousTextState = {
            text: null
        },
        this.cursorOverHandle = !1,
        this.container = $(e),
        this.container.append([this.background.canvas, this.locked.canvas, this.fixed.canvas, this.others.canvas, this.active.canvas, this.highlights.canvas, this.overlay.canvas, this.input[0]]),
        this.clipboard = null,
        ui.pointer.init(this.container),
        this.container.on("wheel", function(t) {
            return function () {
              
                return;
                var e;
                return e = 0,
                function(u) {
                    var i, o, r;
                    u.preventDefault(),
                    e += u.originalEvent.deltaY,
                    -25 > e && (t.zoomBy(-.5),
                    e = 0),
                    e > 25 && (t.zoomBy(.5),
                    e = 0),
                    r = ui.pointer.fetchOffset(u.originalEvent),
                    i = r.offsetX,
                    o = r.offsetY,
                    t.pointerMove(i, o)
                }
            }
        }(this)()),
        this.refresh(),
        this.draw()
    }
    var e, u, i, o, r, n, s;
    return i = "hsla(210,100%,50%,.3)",
    u = 5,
    e = 8,
    o = {
        tl: "br",
        tr: "bl",
        bl: "tr",
        br: "tl"
    },
    r = Math.tan(Math.PI / 8),
    s = -3,
    n = 3,
    t.prototype.init = function() {
        var t, e, u, i;
        for (this.releaseAll(),
        i = [this.locked, this.fixed, this.others, this.active, this.highlights],
        t = 0,
        u = i.length; u > t; t++)
            e = i[t],
            e.empty();
        this.backgroundImage = "",
        this.emptyEditors(),
        this.index.length = 0,
        this.objects = {},
        this.selection = !1,
        this.syncNew = {},
        this.syncChanged = {},
        this.syncDelete = {},
        this.syncActive = !1,
        this.nextSync(),
        idroo.history.clear()
    }
    ,
    t.prototype.nextSync = function() {
       // console.log("sync1 ggggg");
        var t;
        return t = Date.now(),    
        this.sync(function(e) {          
            return function() {              
                var u, i, o;
                return o =250,// idroo.plan.sync_interval || 100,
                i = Date.now() - t,
                u = Math.max(5, Math.min(o - i)),
                setTimeout(function() {
                    return e.nextSync()
                }, 400)
            }
        }(this))
    }
    ,
    t.prototype.save = function(t) {
        return this.socket.emit("save"),
        this.socket.once("saved", t)
    }
    ,
    t.prototype.lock = function(t, e) {
        return null == e && (e = 0),
        this.lockTimeout && (clearTimeout(this.lockTimeout),
        this.lockTimeout = !1),
        this.lockTimeout = setTimeout(function() {
            return $("#lock-message .lock-reason").hide().filter("#lock-reason-" + t).show(),
            $("#lock").fadeIn()
        }, e)
    }
    ,
    t.prototype.unlock = function() {
        return this.lockTimeout && (clearTimeout(this.lockTimeout),
        this.lockTimeout = !1),
        $("#lock").fadeOut()
    }
    ,
    t.prototype.canEdit = function() {
        var t;
        return "own" === (t = this.access) || "edit" === t
    }
    ,
    t.prototype.setAccess = function(t) {
        this.socket.emit("set", "access", t),
        ui.sharing.setAccess(t)
    }
    ,
    t.prototype.grantAccess = function(t, e) {
        this.socket.emit("grant access", t, e)
    }
    ,
    t.prototype.sendChat = function(t) {
        this.socket.emit("chat", t)
    }
    ,
    t.prototype.removeEditor = function(t) {
        ui.editors.remove(t),
        ui.phone.removeUser(t),
        delete this.editors[t],
        this.others.to(t, this.fixed, this.locked).remove(t),
        this.overlay.changed = !0
    }
    ,
    t.prototype.emptyEditors = function() {
        var t;
        for (t in this.editors)
            ui.editors.remove(t),
            ui.phone.removeUser(t);
        this.editors = {}
    }
    ,
    t.prototype.changeBackground = function(t) {
        this.socket.emit("set background", t),
        this.setBackground(t)
    }
    ,
    t.prototype.changeTitle = function(t) {
        this.socket.emit("set", "title", t)
    }
    ,
        t.prototype.setBackground = function (t) {
       // console.log('ret bg');
       // console.log(t)
        var e;
        ui.settings.selectBackground(t),
        "" === t ? (this.backgroundImage = "",
        this.background.changed = !0) : (e = new Image,
        e.onload = function(t) {
            return function() {
                return t.backgroundImage = e,
                t.background.changed = !0
            }
        }(this),
        e.src =t)// "/img/background-" + t + ".jpg")
    }
    ,
    t.prototype.uid = function() {
        var t, e, u;
        for (e = "",
        t = u = 1; 4 >= u; t = ++u)
            e += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()));
        return this.objects[e] ? this.uid() : e
    }
    ,
        t.prototype.refresh = function () {
       // console.log('refresh ...............');//ggggg
        var t, e, u, i;
        for (this.width = this.container.width(),
        this.height = this.container.height(),
        i = [this.background, this.locked, this.fixed, this.others, this.active, this.highlights, this.overlay],
        t = 0,
        u = i.length; u > t; t++)
            e = i[t],
            e.canvas.width = this.width,
            e.canvas.height = this.height,
            e.changed = !0;
        this.updateViewport()
    }
    ,
    t.prototype.coordsFromPointer = function(t, e) {
        return [MyMath.round2(t * this.zoom - this.x), MyMath.round2(e * this.zoom - this.y)]
    }
    ,
    t.prototype.pickActiveHandle = function(t, e) {
        var u;
        return this.active.index.length ? (u = this.pickScaleHandle(t, e)) ? (this.activeScaleHandle = u,
        this.action = "scale",
        this.scaleFrom = this.scaleTo = this.activeBounds.slice(0),
        !0) : this.pickRotateHandle(t, e) ? (this.rotateCenter = [(this.activeBounds[0] + this.activeBounds[2]) / 2, (this.activeBounds[1] + this.activeBounds[3]) / 2],
        this.rotateFrom = this.rotateTo = [t, e],
        this.action = "rotate",
        !0) : !1 : !1
    }
    ,
    t.prototype.pointerDown = function(t, e) {
        var u, i, o, r, n, s, a;
        if (r = this.coordsFromPointer(t, e),
        s = r[0],
        a = r[1],
        o = this.pointer,
        o.offsetX = t,
        o.offsetY = e,
        o.startX = o.x = o.shadowX = s,
        o.startY = o.y = o.shadowY = a,
         !this.canEdit())
            return void (this.action = "pan");  
        switch (this.syncPointer = !0,
        ui.keyboard.modifiers.shift || ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta ? this.highlight() : this.highlightOff(),
        this.action = idroo.action,
        this.action) {
        case "draw":
            if ("Text" === (n = idroo.objectType) || "Formula" === n) {
                if (this.pickActiveHandle(s, a))
                    return;
                if ((i = this.active.pickObject(s, a)) ? this.objects[i].type !== idroo.objectType && (i = null) : (i = this.fixed.pickObject(s, a)) && (this.objects[i].type === idroo.objectType ? (this.releaseAll(),
                this.selectObjects(i),
                this.beginTextInput(i)) : i = null),
                i)
                    return this.objects[i].mousedown(s, a, ui.keyboard.modifiers),
                    this.active.changed = !0,
                    this.action = "text-mouse",
                    this.caretVisible = 0,
                    void this.setCursor()
            }
            this.releaseAll(),
            i = this.uid(),
            u = new (DrawObject.byType(idroo.objectType))(s,a,idroo.style),
            this.addObject(i, u, this.active);
            break;
        case "point":
            ui.keyboard.modifiers.shift || ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta ? (this.selection = [s, a, s, a],
            this.overlay.changed = !0,
            this.action = "select") : this.pickActiveHandle(s, a) || ((i = this.active.pickObject(s, a)) ? i === this.textActive ? (this.objects[this.textActive].mousedown(s, a, ui.keyboard.modifiers),
            this.active.changed = !0,
            this.action = "text-mouse",
            this.caretVisible = 0) : this.action = "move" : (i = this.fixed.pickObject(s, a)) ? (this.selectObjects(i),
            this.action = "move") : (this.active.isEmpty() || this.releaseAll(),
            this.selection = [s, a, s, a],
            this.overlay.changed = !0,
            this.action = "select"));
            break;
        case "erase":
            this.deleteUnderEraser(s, a)
        }
        this.setCursor(),
        "text-mouse" !== this.action && this.endTextInput(),
        $(":input:focus").blur()
    }
    ,
    t.prototype.setPointerTo = function(t, e) {
        var u;
        this.pointer.offsetX = t,
        this.pointer.offsetY = e,
        u = this.coordsFromPointer(t, e),
        this.pointer.x = u[0],
        this.pointer.y = u[1]
    }
    ,
        t.prototype.pointerMove = function (t, e) {
       // console.log("pointer move22 " + t + '  : ' + e);//ggggg
       // console.log(this.viewport.x+' ' + this.viewport.width)
        if ( t<1 || e<1 || t >= this.viewport.width-5 || e >= this.viewport.height-5) {
           // console.log('errrr ' + this.viewport.width + " " + this.viewport.height);
           // console.log('errrr ' + this.bounds.width + " " + this.bounds.height);
            return;
        }
        var u;
        return "pan" === this.action ? void this.panTo(t, e) : (this.setPointerTo(t, e),
        void (this.canEdit() && (this.syncPointer = !0,
        this.action ? this.handlePointerMove() : "point" !== idroo.action && "Text" !== (u = idroo.objectType) && "Formula" !== u || this.highlight())))
    }
    ,
    t.prototype.panTo = function(t, e) {
        return this.panBy(t - this.pointer.offsetX, e - this.pointer.offsetY),
        this.setPointerTo(t, e),
        this.panBy
    }
    ,
        t.prototype.panBy = function (t, e) {
        return;//ggggg
        this.x += t * this.zoom,
            this.y += e * this.zoom,
           
       // this.updateViewport(),ggggg
        this.positionOverlays(),
        this.redraw()
    }
    ,
        t.prototype.handlePointerMove = function () {
        
        var t, e, u, i, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k;
        if (l = this.pointer,
        b = l.startX,
        E = l.startY,
        w = l.x,
        _ = l.y,
        y = l.shadowX,
        v = l.shadowY,
        e = y,
        u = v,
        y = w,
        v = _,
        "move" === this.action || "draw" === this.action && "Line" === idroo.objectType ? (x = 1,
        k = _ > E == w > b ? 1 : -1,
        i = Math.abs((_ - E) / (w - b)),
        ui.keyboard.modifiers.shift && (r > i ? v = E : i > 3 * r ? y = b : (d = Geometry.directionalDistance([w, _], [b + x, E + k], [b, E]),
        g = d[0],
        m = d[1],
        y = MyMath.round2(b + g),
        v = MyMath.round2(E + m)))) : "draw" === (p = this.action) && this.activeObject()[1]instanceof DrawRectangle ? (x = 1,
        k = _ > E == w > b ? 1 : -1,
        ui.keyboard.modifiers.shift && (f = Geometry.directionalDistance([w, _], [b + x, E + k], [b, E]),
        g = f[0],
        m = f[1],
        y = MyMath.round2(b + g),
        v = MyMath.round2(E + m))) : "scale" !== this.action || "tl" !== (C = this.activeScaleHandle) && "tr" !== C && "bl" !== C && "br" !== C || (t = !1,
        1 !== this.active.index.length || "Line" !== (B = this.activeObject()[1].type) && "Rectangle" !== B && "Ellipse" !== B && "Text" !== B || (t = !0),
        t === ui.keyboard.modifiers.shift && (D = this.scaleHandleOffset(),
        a = D[0],
        h = D[1],
        A = c = this.getScaleOrigin(o[this.activeScaleHandle]),
        n = A[0],
        s = A[1],
        F = Geometry.directionalDistance([w - a, _ - h], this.getScaleOrigin(this.activeScaleHandle), c),
        g = F[0],
        m = F[1],
        y = MyMath.round2(n + g + a),
        v = MyMath.round2(s + m + h))),
        l.shadowX = y,
        l.shadowY = v,
        e = y - e,
        u = v - u,
        e || u)
            switch (this.action) {
            case "draw":
                    this.active.each(function (t) {
                        return function (t, e) {
                            return e.update(y, v)
                        }
                    }(this)),
                        this.active.toMap(this.syncChanged),
                        this.active.changed = !0; 
               // this.refreshBounds();
                break;
            case "move":
                this.active.each(function(t) {
                    return function(t, i) {
                        return i.move(e, u)
                    }
                }(this)),
                this.active.toMap(this.syncChanged),
                this.active.changed = !0,
                this.calculateActiveBounds(),
                this.refreshBounds();
                break;
            case "scale":
                this.moveScaleHandleTo(y, v),
                this.active.each(function(t) {
                    return function(e, u) {
                        return u.scale(t.scaleTo, t.activeBounds)
                    }
                }(this)),
                this.active.toMap(this.syncChanged),
                this.active.changed = !0,
                this.scaleTo = this.activeBounds.slice(0),
                this.refreshBounds();
                break;
            case "rotate":
                this.active.each(function(t) {
                    return function(e, u) {
                        return u.rotate(t.rotateCenter, t.rotateTo, [w, _])
                    }
                }(this)),
                this.active.toMap(this.syncChanged),
                this.active.changed = !0,
                this.rotateTo = [w, _],
                this.overlay.changed = !0,
                this.refreshBounds();
                break;
            case "select":
                this.selection[2] = w,
                this.selection[3] = _,
                this.overlay.changed = !0,
                this.highlight();
                break;
            case "text-mouse":
                this.active.each(function(t) {
                    return function(t, e) {
                        return e.mousemove(w, _)
                    }
                }(this)),
                this.active.changed = !0,
                this.overlay.changed = !0;
                break;
            case "erase":
                this.deleteUnderEraser(w, _)
            }
    }
    ,
    t.prototype.pointerUp = function() {
        var t, e, u, i;
        switch (this.action) {
        case "draw":
            i = this.activeObject(),
            e = i[0],
            t = i[1],
            this.active.each(function(t, e) {
                return e.repair()
            }),
            this.active.toMap(this.syncChanged),
            this.active.changed = !0,
            t instanceof DrawText || t instanceof DrawFormula ? (t.fixOrientation(),
            this.beginTextInput(e)) : this.active.to(this.fixed),
            this.syncActive = !0,
            idroo.history.addCreate(e);
           // console.log(e);
            break;
        case "move":
            this.highlight(),
            idroo.history.addMove(this.active.index, this.pointer.shadowX - this.pointer.startX, this.pointer.shadowY - this.pointer.startY);
            break;
        case "scale":
            this.active.each(function(t, e) {
                return e.repair()
            }),
            this.active.changed = !0,
            this.highlight(),
            this.calculateActiveBounds(),
            this.activeScaleHandle = !1,
            idroo.history.addScale(this.active.index, this.scaleFrom, this.scaleTo);
            break;
        case "rotate":
            this.highlight(),
            this.calculateActiveBounds(),
            idroo.history.addRotate(this.active.index, this.rotateCenter, this.rotateFrom, this.rotateTo);
            break;
        case "select":
            u = this.getSelectionObjectKeys(),
            this.selectObjects(u),
            this.selection = !1,
            this.overlay.changed = !0,
            this.highlights.empty(),
            this.highlight();
           // console.log(u);
            break;
        case "text-mouse":
            this.active.each(function(t) {
                return function(e, u) {
                    return u.mouseup(t.pointer.x, t.pointer.y)
                }
            }(this)),
            this.active.changed = !0,
            this.overlay.changed = !0;
            break;
        case "erase":
            idroo.history.addDelete()
        }
        this.action = "",
        this.focusInput()
    }
    ,
    t.prototype.pointerDblAction = function(t, e) {
        var u, i, o, r, n, s;
        return o = this.activeObject(),
        i = o[0],
        u = o[1],
        (u instanceof DrawText || u instanceof DrawFormula) && (this.textActive === i ? (r = this.coordsFromPointer(t, e),
        n = r[0],
        s = r[1],
        u.doubleClick(n, s),
        this.redrawActiveOverlay()) : this.beginTextInput(i)),
        !1
    }
    ,
    t.prototype.insertUploadFile = function(t, e, u) {
        return null == e && (e = this.pointer.x),
        null == u && (u = this.pointer.y),
        idroo.plan.f_advanced_tools ? this.addOverlay(e, u, idroo.drawer.uploadFile(t, function(t) {
            return function(i, o) {
                if ("DUPLICATE" !== i) {
                    if (i)
                        return alert(i);
                    t.insertImageByURL(e, u, "/doc/" + o.id + "/0"),
                    o.isImage || idroo.drawer.openDocument(o)
                }
            }
        }(this))) : void $("#paid-f-advanced-tools").fadeIn()
    }
    ,
    t.prototype.handleDrop = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p;
        if (t.preventDefault(),
        a = ui.pointer.fetchOffset(t),
        n = a.offsetX,
        s = a.offsetY,
        h = this.coordsFromPointer(n, s),
        d = h[0],
        p = h[1],
        l = t.dataTransfer.getData("text"))
            return void ((r = l.match(/^idroo(:fit)?:(.*)$/)) && (e = ":fit" === r[1],
            this.insertImageByURL(d, p, r[2], e)));
        for (c = t.dataTransfer.files,
        i = 0,
        o = c.length; o > i; i++)
            u = c[i],
            this.insertUploadFile(u, d, p)
    }
    ,
        t.prototype.contextmenu = function () {
        return;
        var t;
        return this.canEdit() ? ((t = this.active.pickObject(this.pointer.x, this.pointer.y)) || ((t = this.fixed.pickObject(this.pointer.x, this.pointer.y)) ? this.selectObjects(t) : (t = this.locked.pickObject(this.pointer.x, this.pointer.y)) && this.selectObjects(t)),
        this.contextmenuForActive(this.pointer.offsetX, this.pointer.offsetY),
        !1) : !1
    }
    ,
        t.prototype.contextmenuForActive = function (t, e) {
        return;
        var u, i, o, r, n, s;
        for (null == t && (t = this.pointer.x),
        null == e && (e = this.pointer.y),
        s = {},
        n = this.active.index,
        u = 0,
        o = n.length; o > u; u++)
            i = n[u],
            s[this.objects[i].type] = 1;
        r = this.container.position(),
        ui.contextmenu.open(t + r.left, e + r.top, _.keys(s), this.active.index)
    }
    ,
    t.prototype.setCursor = function() {
        var t, e, u;
        t = ["cursor"],
        t.push("action-" + (this.action || idroo.action)),
        ui.keyboard.modifiers.shift || ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta || ((e = this.cursorOverHandle || this.activeScaleHandle) ? t.push("handle-" + e) : (u = this.highlights.index.length) ? 1 === u ? this.textActive && this.textActive === this.highlights.index[0] ? t.push("text-beam") : "draw" === idroo.action && this.objects[this.highlights.index[0]].type === idroo.objectType ? t.push("text-beam") : t.push("move") : t.push("move") : idroo.objectType && t.push(idroo.objectType)),
        this.container.attr("class", t.join(" "))
    }
    ,
        t.prototype.zoomTo = function (t, e, u) {
        return;//gggggg
        var i, o;
        null == e && (e = this.pointer.offsetX),
        null == u && (u = this.pointer.offsetY),
        i = -e * this.zoom,
        o = -u * this.zoom,
        this.zoomLevel = Math.max(s, Math.min(n, t)),
        this.zoom = Math.pow(2, this.zoomLevel),
        i += e * this.zoom,
        o += u * this.zoom,
        this.x += i,
        this.y += o,
        this.updateViewport(),
        this.redraw(),
        this.positionOverlays(),
        ui.toolbar.setZoom(1 / this.zoom)
    }
    ,
    t.prototype.zoomBy = function(t, e, u) {
        null == e && (e = this.pointer.offsetX),
        null == u && (u = this.pointer.offsetY),
        this.zoomTo(this.zoomLevel + t, e, u)
    }
    ,
    t.prototype.updateViewport = function() {
        this.viewport.x = this.x,
        this.viewport.y = this.y,
        this.viewport.width = this.width * this.zoom,
        this.viewport.height = this.height * this.zoom
    }
    ,
    t.prototype.pointToViewport = function(t) {
        var e, u;
        return e = t[0],
        u = t[1],
        [(e + this.x) / this.zoom, (u + this.y) / this.zoom]
    }
    ,
    t.prototype.rectangleToViewport = function(t) {
        var e, u, i, o;
        return e = t[0],
        i = t[1],
        u = t[2],
        o = t[3],
        [(e + this.x) / this.zoom, (i + this.y) / this.zoom, (u + this.x) / this.zoom, (o + this.y) / this.zoom]
    }
    ,
    t.prototype.addOverlay = function(t, e, u) {
        var i;
        i = this.overlayId++,
        this.overlays[i] = u,
        this.positionOverlay(u.data({
            x: t,
            y: e
        })),
        this.container.append(u.addClass("overlay")),
        u.on("done", function(t) {
            return function() {
                return u.fadeOut(500, function() {
                    return delete t.overlays[i]
                })
            }
        }(this))
    }
    ,
    t.prototype.positionOverlay = function(t) {
        return t.css({
            left: (this.x + t.data("x")) / this.zoom,
            top: (this.y + t.data("y")) / this.zoom
        })
    }
    ,
    t.prototype.positionOverlays = _.throttle(function() {
        var t, e, u, i;
        u = this.overlays,
        i = [];
        for (t in u)
            e = u[t],
            i.push(this.positionOverlay(e));
        return i
    }, 50, {
        leading: !1
    }),
    t.prototype.beginTextInput = function(t) {
        var e, u, i;
        u = this.objects[t],
        this.textActive = t,
        this.caretVisible = 1,
        this.overlay.changed = !0,
        this.previousTextState = u.getState(),
        u instanceof DrawFormula && ui.style.toggleFormulaButtons(!0),
        e = !1,
        i = function() {
            return e = !0,
            setTimeout(function() {
                return e = !1
            }, 1)
        }
        ,
        this.caretBlink && clearInterval(this.caretBlink),
        this.caretBlink = setInterval(function(t) {
            return function() {
                return t.textActive ? (t.caretVisible++,
                t.caretVisible %= 3,
                t.overlay.changed = !0) : (clearInterval(t.caretBlink),
                void delete t.caretBlink)
            }
        }(this), 300),
        this.input.on("keydown.input", function(e) {
            return function(o) {
                var r;
                if (ui.keyboard.trackModifiers(o),
                e.caretVisible = 1,
                r = o.which,
                indexOf.call(DrawText.KB, r) >= 0)
                    return e.previousTextState = u.getState(),
                    u.handleKeyDown(r, ui.keyboard.modifiers) && (e.syncChanged[t] = u),
                    e.redrawActiveOverlay(),
                    e.recordTextHistory(),
                    !1;
                switch (idroo.utils.extractShortcut(o)) {
                case "space":
                    o.stopPropagation();
                    break;
                case "tab":
                    return e.insertText("	");
                case "return":
                    return e.insertText("\n");
                case "esc":
                    return e.endTextInput(),
                    !1;
                case "ctrl+a":
                case "meta+a":
                    return u.selectAll(),
                    e.redrawActiveOverlay(),
                    !1;
                case "ctrl+c":
                case "ctrl+shift+c":
                case "ctrl+insert":
                case "meta+c":
                case "meta+shift+c":
                    return void i();
                case "ctrl+v":
                case "ctrl+shift+v":
                case "shift+insert":
                case "meta+v":
                case "meta+shift+v":
                    return void i();
                case "ctrl+x":
                case "meta+x":
                    return void i();
                case "ctrl+z":
                case "ctrl+shift+z":
                case "ctrl+y":
                case "meta+z":
                case "meta+shift+z":
                case "meta+y":
                    return o.preventDefault(),
                    !0
                }
                o.stopPropagation()
            }
        }(this)),
        this.androidInput ? this.input.on("input.input", function(t) {
            return function(e) {
                return t.insertText(t.input.val()),
                t.input.val("").blur().focus(),
                !1
            }
        }(this)) : this.input.on("keypress.input", function(t) {
            return function(u) {
                return e ? void 0 : (u.charCode && t.insertText(String.fromCharCode(u.charCode)),
                !1)
            }
        }(this)),
        this.input.on("keyup.input", function(t) {
            return function(t) {
                var e, u;
                return e = t.keyCode,
                indexOf.call(DrawText.KB, e) >= 0 ? !1 : void (32 === (u = t.keyCode) && t.stopPropagation())
            }
        }(this)),
        $("body").on("focus.input", ":input:not(#input-element)", function(t) {
            return function() {
                t.endTextInput()
            }
        }(this)),
        u.mousedown(this.pointer.x, this.pointer.y),
        u.mouseup(this.pointer.x, this.pointer.y),
        this.active.changed = !0,
        this.focusInput()
    }
    ,
    t.prototype.endTextInput = function() {
        var t, e;
        this.textActive && (e = this.objects[t = this.textActive],
        e.resetCaret(),
        e.autosize = !1,
        this.recordTextHistory(),
        this.textActive = null,
        $("body").off(".input"),
        this.input.off(".input"),
        this.input.empty(),
        this.overlay.changed = !0,
        this.active.changed = !0,
        e.canDelete && (this.deleteObjects([t]),
        idroo.history.forget(t)),
        ui.style.toggleFormulaButtons(!1))
    }
    ,
    t.prototype.insertText = function(t) {
        var e;
        if (this.textActive)
            return e = this.objects[this.textActive],
            this.previousTextState = e.getState(),
            e.insertText(t),
            this.syncChanged[this.textActive] = e,
            this.redrawActiveOverlay(),
            this.recordTextHistory(),
            !1
    }
    ,
    t.prototype.recordTextHistory = function() {
        var t;
        this.textActive && (t = this.objects[this.textActive].getState(),
        t.text !== this.previousTextState.text && (idroo.history.addText(this.textActive, this.previousTextState, t),
        this.previousTextState = t))
    }
    ,
    t.prototype.addObject = function(t, e, u, i) {
        null == u && (u = this.fixed),
            null == i && (i = !0),
            this.index.push(t),
            // console.warn(e),
            this.objects[t] = e,
            i && (delete this.syncDelete[t],
                this.syncNew[t] = e,
                this.syncActive = !0),
            u.add(t),
            e.changeCaller && (e.callChange = function (u) {
                return function (i) {
                    return t in u.objects ? (i && (u.syncChanged[t] = u.objects[t],
                        (e instanceof DrawText || e instanceof DrawFormula) && idroo.history.fixScale(t, e.bounds)),
                        u.markObjectLayersChanged(t),
                        u.checkActiveTouched(t),
                        u.highlights.changed = !0,
                        u.highlight(),
                        u.refreshBounds()) : void 0
                }
            }(this)),
            u === this.active && "draw" !== this.action && this.calculateActiveBounds();
       // this.refreshBounds()
        
    }
    ,
    t.prototype.insertImageByURL = function(t, e, u, i) {
        var o;
        null == i && (i = !1),
        o = document.createElement("img"),
        o.src = u,
        $(o).on("load", function(r) {
            return function() {
                var n, s, a, h, c, l, d, p;
                p = o.width,
                n = o.height,
                i && (c = Math.max(.8 * r.width, 500),
                h = Math.max(.8 * r.height, 500),
                p > c && (n = n * c / p,
                p = c),
                n > h && (p = p * h / n,
                n = h),
                p = Math.floor(p),
                n = Math.floor(n)),
                s = t - Math.floor(p / 2),
                a = e - Math.floor(n / 2),
                d = r.uid(),
                l = new DrawImage(s,a,idroo.style),
                l.setSource(u),
                l.update(s + p, a + n, {}),
                r.addObject(d, l),
                idroo.history.addCreate(d),
                r.redraw()
            }
        }(this))
    }
    ,
    t.prototype.highlight = _.throttle(function(t) {
        var e, u, i, o, r, n, s, a, h, c;
        t !== !1 && this.canEdit() && (a = this.cursorOverHandle,
        this.cursorOverHandle = !1,
        n = this.pointer,
        h = n.x,
        c = n.y,
        e = function(t) {
            return function(e, u) {
                var i;
                return t.active.index.length ? (i = t.pickScaleHandle(e, u)) ? (t.cursorOverHandle = i,
                t.active.index) : t.pickRotateHandle(e, u) ? (t.cursorOverHandle = "rotate",
                t.active.index) : !1 : !1
            }
        }(this),
        "point" === idroo.action || "select" === this.action ? (r = [],
        "select" === this.action || ui.keyboard.modifiers.shift || ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta ? r = this.getSelectionObjectKeys() : (i = e(h, c)) ? r.push.apply(r, i) : (o = this.active.pickObject(h, c)) ? r.push.apply(r, this.active.index) : (o = this.fixed.pickObject(h, c)) && r.push(o),
        u = this.cursorOverHandle ? a !== this.cursorOverHandle : !o || o !== this.highlights.pickObject(h, c),
        u && (this.highlights.empty(),
        r.length && this.highlights.add(r))) : "draw" !== idroo.action || this.action || "Text" !== (s = idroo.objectType) && "Formula" !== s ? this.highlights.empty() : ((o = e(h, c)[0]) || (o = this.active.pickObject(h, c)) || (o = this.fixed.pickObject(h, c)) && this.objects[o].type !== idroo.objectType && (o = null),
        o !== this.highlights.index[0] && (this.highlights.empty(),
        o && this.highlights.add(o))),
        this.setCursor())
    }, 50),
    t.prototype.highlightOff = function() {
        this.highlight(!1),
        this.highlights.empty()
    }
    ,
    t.prototype.changeObjectText = function(t, e) {
        var u;
        u = this.objects[t],
        u.setState(e),
        this.markObjectLayersChanged(t),
        t === this.textActive && (this.previousTextState = e),
        this.redrawActiveOverlay(),
        this.syncChanged[t] = u,
        this.checkActiveTouched(t),
        this.highlight(),
        this.refreshBounds()
    }
    ,
    t.prototype.formulaInsert = function() {
        var t, e, u, i;
        u = 1 <= arguments.length ? slice.call(arguments, 0) : [],
        i = this.activeObject(),
        e = i[0],
        t = i[1],
        e === this.textActive && t instanceof DrawFormula && (this.previousTextState = t.getState(),
        t.insertFromToolbar.apply(t, u),
        this.recordTextHistory(),
        this.syncChanged[e] = t)
    }
    ,
    t.prototype.selectAll = function() {
        this.active.to(this.fixed, this.locked),
        this.selectObjects(this.fixed.index.slice(0))
    }
    ,
    t.prototype.selectObjects = function(t) {
        this.endTextInput(),
        this.active.to(this.fixed, this.locked),
        this.locked.remove(t),
        this.fixed.remove(t),
        this.active.add(t),
        this.syncActive = !0,
        this.highlights.index.length && (this.highlights.empty(),
        this.highlight()),
        this.calculateActiveBounds(),
        this.updateToolbars()
    }
    ,
    t.prototype.updateToolbars = function() {
        var t, e, u, i, o, r, n, s;
        for (s = {},
        s[idroo.objectType] = 1,
        r = this.active.index,
        t = 0,
        i = r.length; i > t; t++)
            e = r[t],
            s[this.objects[e].type] = 1;
        for (ui.style.types(s),
        n = this.active.index,
        u = 0,
        o = n.length; o > u; u++)
            e = n[u],
            this.objects[e]instanceof DrawGroup || ui.style.set(this.objects[e].style)
    }
    ,
    t.prototype.checkActiveTouched = function(t) {
        var e, u, i, o;
        if (e = this.active.objects,
        "string" == typeof t)
            return void (t in e && this.calculateActiveBounds());
        for (u = 0,
        o = t.length; o > u; u++)
            if (i = t[u],
            i in e)
                return void this.calculateActiveBounds()
    }
    ,
    t.prototype.releaseAll = function() {
        return this.selectObjects([])
    }
    ,
    t.prototype.activeObject = function() {
        var t, e;
        return 1 === (t = this.active.index).length ? [e = t[0], this.objects[e]] : [null, null]
    }
    ,
    t.prototype.getSelectionOnLayer = function(t) {
        var e, u, i;
        return (u = this.selection) ? (i = u[0] === u[2] && u[1] === u[3],
        i ? (e = t.pickObject(u[0], u[1])) ? [e] : [] : t.pickObjects(u)) : (e = t.pickObject(this.pointer.x, this.pointer.y)) ? [e] : []
    }
    ,
    t.prototype.getSelectionObjectKeys = function() {
        var t, e;
        return e = this.getSelectionOnLayer(this.fixed),
        t = this.getSelectionOnLayer(this.active),
        (ui.keyboard.modifiers.shift || ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta) && e.push.apply(e, this.active.index),
        t.length && (ui.keyboard.modifiers.ctrl || ui.keyboard.modifiers.meta ? e.removeItems(t) : ui.keyboard.modifiers.shift || e.push.apply(e, t)),
        e
    }
    ,
        t.prototype.refreshBounds = _.throttle(function () {
           // console.log(this.index); 
          //  console.log('refreshBounds4 ........');//ggggg   
        //var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C;
        //for (h = c = l = d = 0,
        //p = this.index,
        //t = e = 0,
        //i = p.length; i > e; t = ++e)
        //    u = p[t],
        //    o = this.objects[u],
        //    t ? (f = o.outerBounds,
        //    r = f[0],
        //    s = f[1],
        //    n = f[2],
        //    a = f[3],
        //    h > r && (h = r),
        //    l > s && (l = s),
        //    n > c && (c = n),
        //    a > d && (d = a)) : (C = o.outerBounds,
        //    h = C[0],
        //    l = C[1],
        //    c = C[2],
        //    d = C[3]);
        this.bounds = {
            left:0,// h,
            top:0,// l,
            width: this.viewport.width,// c - h,
            height: this.viewport.height// d - l
        }
    }, 50, {
        leading: !1
    }),
    t.prototype.calculateActiveBounds = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E;
        if (!this.active.index.length)
            return void (this.activeBounds && (this.overlay.changed = !0,
            this.activeBounds = !1,
            this.activeBoundsOffset = !1));
        for (D = this.active.index,
        o = r = 0,
        s = D.length; s > r; o = ++r)
            n = D[o],
            a = this.objects[n],
            o ? (A = a.bounds,
            t = A[0],
            u = A[1],
            e = A[2],
            i = A[3],
            y > t && (y = t),
            b > u && (b = u),
            e > v && (v = e),
            i > E && (E = i),
            F = a.outerBounds,
            h = F[0],
            l = F[1],
            c = F[2],
            d = F[3],
            p > h && (p = h),
            C > l && (C = l),
            c > f && (f = c),
            d > B && (B = d)) : (g = a.bounds,
            y = g[0],
            b = g[1],
            v = g[2],
            E = g[3],
            m = a.outerBounds,
            p = m[0],
            C = m[1],
            f = m[2],
            B = m[3]);
        this.activeBounds = [y, b, v, E],
        this.activeBoundsOffset = [p - y, C - b, f - v, B - E],
        this.calculateScalePoints()
    }
    ,
    t.prototype.outerActiveBounds = function() {
        var t, e, i, o, r, n, s, a, h, c, l, d, p;
        return n = this.activeBounds,
        c = n[0],
        d = n[1],
        l = n[2],
        p = n[3],
        s = this.activeBoundsOffset,
        t = s[0],
        i = s[1],
        e = s[2],
        o = s[3],
        a = l > c ? [c + t, l + e] : [l - e, c - t],
        c = a[0],
        l = a[1],
        h = p > d ? [d + i, p + o] : [p - o, d - i],
        d = h[0],
        p = h[1],
        r = u,
        [c - r, d - r, l + r, p + r]
    }
    ,
    t.prototype.getScaleOrigin = function(t) {
        var e, u, i, o, r;
        switch (e = this.scaleFrom,
        u = e[0],
        o = e[1],
        i = e[2],
        r = e[3],
        t) {
        case "tl":
            return [u, o];
        case "tr":
            return [i, o];
        case "bl":
            return [u, r];
        case "br":
            return [i, r]
        }
    }
    ,
    t.prototype.scaleHandleOffset = function() {
        var t, e, i, o, r, n, s, a, h, c, l, d, p, f;
        return a = this.activeBounds,
        l = a[0],
        p = a[1],
        d = a[2],
        f = a[3],
        h = this.activeBoundsOffset,
        o = h[0],
        n = h[1],
        r = h[2],
        s = h[3],
        c = this.activeScaleHandle,
        "l" === c || "tl" === c || "bl" === c ? (t = o - u,
        e = d > l ? t : -t) : (t = r + u,
        e = d > l ? t : -t),
        "t" === c || "tl" === c || "tr" === c ? (t = n - u,
        i = f > p ? t : -t) : (t = s + u,
        i = f > p ? t : -t),
        [e, i]
    }
    ,
    t.prototype.calculateScalePoints = function() {
        var t, e, i, o, r, n, s, a, h;
        r = this.outerActiveBounds(),
        n = r[0],
        a = r[1],
        s = r[2],
        h = r[3],
        i = (n + s) / 2,
        o = (a + h) / 2,
        t = {
            tl: [n, a],
            tr: [s, a],
            bl: [n, h],
            br: [s, h]
        },
        e = 10,
        h - a > e && (t.l = [n, o],
        t.r = [s, o]),
        s - n > e && (t.t = [i, a],
        t.b = [i, h]),
        t.o = [i, a - 5 * u],
        this.scaleHandles = t,
        this.overlay.changed = !0
    }
    ,
    t.prototype.pickScaleHandle = function(t, i) {
        var o, r, n, s, a, h, c, l, d, p, f, C, B, D, A;
        if (a = e * this.zoom,
        f = u * this.zoom,
        h = a - f,
        c = 2 * f + h,
        C = this.outerActiveBounds(),
        o = C[0],
        n = C[1],
        r = C[2],
        s = C[3],
        p = [t, i],
        Geometry.pointInRectangle(p, [o + h, n + h, r - h, s - h]))
            return !1;
        if (!Geometry.pointInRectangle(p, [o - c, n - c, r + c, s + c]))
            return !1;
        B = this.scaleHandles;
        for (A in B)
            if (D = B[A],
            l = D[0],
            d = D[1],
            Geometry.pointInSquare(t, i, l, d, a))
                return A;
        return !1
    }
    ,
    t.prototype.pickRotateHandle = function(t, u) {
        var i, o, r;
        if (null != this.scaleHandles.o)
            return r = this.scaleHandles.o,
            i = r[0],
            o = r[1],
            Geometry.pointInSquare(t, u, i, o, e * this.zoom)
    }
    ,
    t.prototype.moveScaleHandleTo = function(t, e) {
        var i, o, r, n, s, a, h, c, l, d, p, f;
        c = this.activeScaleHandle,
        a = this.activeBounds,
        l = a[0],
        p = a[1],
        d = a[2],
        f = a[3],
        h = this.activeBoundsOffset,
        o = h[0],
        n = h[1],
        r = h[2],
        s = h[3],
        "l" !== c && "tl" !== c && "bl" !== c || (i = u - o,
        l = d > t ? Math.min(d + .01, t + i) : Math.max(d - .01, t - i)),
        "t" !== c && "tl" !== c && "tr" !== c || (i = u - n,
        p = f > e ? Math.min(f + .01, e + i) : Math.max(f - .01, e - i)),
        "r" !== c && "tr" !== c && "br" !== c || (i = u + r,
        d = t > l ? Math.max(l - .01, t - i) : Math.min(l + .01, t + i)),
        "b" !== c && "bl" !== c && "br" !== c || (i = u + s,
        f = e > p ? Math.max(p - .01, e - i) : Math.min(p + .01, e + i)),
        this.activeBounds = [l, p, d, f],
        this.calculateScalePoints()
    }
    ,
    t.prototype.deleteSelected = function() {
        this.active.index.length && (idroo.history.addDelete(this.active.index),
        this.deleteObjects(this.active.index.slice(0)),
        this.setCursor(),
        this.syncActive = !0)
    }
    ,
    t.prototype.deleteObjects = function(t, e) {
        var u, i, o, r, n, s, a;
        if (null == e && (e = !0),
        a = !1,
        u = this.active.objects,
        e)
            for (i = 0,
            n = t.length; n > i; i++)
                o = t[i],
                delete this.syncNew[o],
                delete this.syncChanged[o],
                this.syncDelete[o] = !0,
                !a && o in u && (a = !0);
        for (1 === t.length && t[0] === this.textActive && this.endTextInput(),
        this.locked.remove(t),
        this.fixed.remove(t),
        this.active.remove(t),
        this.highlights.remove(t),
        r = 0,
        s = t.length; s > r; r++)
            o = t[r],
            delete this.objects[o];
        this.index.removeItems(t),
            a && (this.calculateActiveBounds(),
                this.syncActive = !0),
            this.highlight(),
            this.updateToolbars();
       // this.refreshBounds()
    }
    ,
    t.prototype.deleteUnderEraser = function(t, e) {
        var u;
        u = this.fixed.pickObjects([t - 11, e - 11, t + 11, e + 11]),
        u.length && (idroo.history.addDelete(u, !0),
        this.deleteObjects(u))
    }
    ,
    t.prototype.deleteAll = function() {
        this.releaseAll(),
        idroo.history.addDelete(this.index),
        this.deleteObjects(this.index.slice(0), !0)
    }
    ,
    t.prototype.focusInput = function(t) {
        var e, u;
        (this.textActive || t) && (this.input.focus(),
        this.androidInput || (0 === this.input.text().length && this.input.text("nada"),
        e = document.createRange(),
        e.selectNodeContents(this.input[0]),
        u = window.getSelection(),
        u.removeAllRanges(),
        u.addRange(e)))
    }
    ,
    t.prototype.copy = function(t, e) {
        var u, i;
        if (!this.active.index.length)
            return !1;
        if (this.textActive) {
            if (i = this.objects[this.textActive],
            i instanceof DrawFormula)
                return (u = i.selectedFormula()) && (t("idroo/formula", AJson.stringify(u)),
                e && this.insertText("")),
                !1;
            if (i instanceof DrawText)
                return (u = i.selectedText()) && (t("text/plain", u),
                e && this.insertText("")),
                !1
        }
        return u = [],
        this.active.each(function(t) {
            return function(t, e) {
                return u.push(e.serialize())
            }
        }(this)),
        t("idroo/objects", AJson.stringify(u)),
        u.length && e && this.deleteSelected(),
        !1
    }
    ,
    t.prototype.pasteText = function(t) {
        var e, u, i, o, r;
        i = this.pointer,
        o = i.x,
        r = i.y,
        t = t.replace(/\r/g, ""),
        this.textActive ? this.insertText(t) : (e = this.uid(),
        this.addObject(e, u = new DrawText(o,r)),
        u.update(o, r),
        u.insertText(t),
        u.measure(),
        this.centerPastedOnMouse(e),
        idroo.history.addCreate(e),
        this.selectObjects(e))
    }
    ,
    t.prototype.pasteObjects = function(t) {
        var e, u, i, o, r, n;
        for (i = [],
        e = 0,
        o = t.length; o > e; e++)
            n = t[e],
            i.push(u = this.uid()),
            this.addObject(u, r = DrawObject.restore(n));
        this.centerPastedOnMouse(i),
        idroo.history.addCreate(i),
        this.selectObjects(i)
    }
    ,
    t.prototype.pasteFormula = function(t) {
        var e, u;
        (u = this.objects[this.textActive])instanceof DrawFormula ? (this.previousTextState = u.getState(),
        u.insertFormula(t),
        this.syncChanged[this.textActive] = u,
        this.redrawActiveOverlay(),
        this.recordTextHistory()) : (e = this.uid(),
        this.addObject(e, u = new DrawFormula(this.pointer.x,this.pointer.y)),
        u.insertFormula(t),
        u.measure(),
        this.centerPastedOnMouse(e),
        idroo.history.addCreate(e),
        this.selectObjects(e))
    }
    ,
    t.prototype.centerPastedOnMouse = function(t) {
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C;
        for ("string" == typeof t && (t = [t]),
        e = [],
        o = 0,
        s = t.length; s > o; o++)
            r = t[o],
            c = this.objects[r].bounds,
            d = c[0],
            f = c[1],
            p = c[2],
            C = c[3],
            e.push([d, f], [p, C]);
        for (l = Geometry.bounding.apply(Geometry, e),
        d = l[0],
        f = l[1],
        p = l[2],
        C = l[3],
        u = this.pointer.x - (d + p) / 2,
        i = this.pointer.y - (f + C) / 2,
        n = 0,
        a = t.length; a > n; n++)
            r = t[n],
            h = this.objects[r],
            h.move(u, i),
            h.serializeChange()
    }
    ,
    t.prototype.groupSelected = function() {
        var t;
        t = this.active.index.slice(0),
        t.length < 2 || (idroo.history.addDelete(t),
        idroo.history.link(),
        idroo.history.addCreate(this.groupObjects(t)))
    }
    ,
    t.prototype.groupObjects = function(t, e) {
        var u, i, o, r;
        return null == e && (e = !0),
        r = function() {
            var e, i, o;
            for (o = [],
            e = 0,
            i = t.length; i > e; e++)
                u = t[e],
                o.push(this.objects[u]);
            return o
        }
        .call(this),
        o = this.uid(),
        i = function(t, e, u) {
            u.prototype = t.prototype;
            var i = new u
              , o = t.apply(i, e);
            return Object(o) === o ? o : i
        }(DrawGroup, r, function() {}),
        this.deleteObjects(t),
        this.addObject(o, i, this.active),
        o
    }
    ,
    t.prototype.ungroupSelected = function() {
        var t, e;
        this.active.index.length && (e = function() {
            var e, u, i, o;
            for (i = this.active.index,
            o = [],
            e = 0,
            u = i.length; u > e; e++)
                t = i[e],
                this.objects[t]instanceof DrawGroup && o.push(t);
            return o
        }
        .call(this),
        e.length && (idroo.history.addDelete(e),
        idroo.history.link(),
        idroo.history.addCreate(this.ungroupObjects(e))))
    }
    ,
    t.prototype.ungroupObjects = function(t) {
        var e, u, i, o, r, n, s, a, h, c;
        for (h = [],
        u = 0,
        r = t.length; r > u; u++)
            for (i = t[u],
            s = this.objects[i],
            c = s.objects,
            o = 0,
            n = c.length; n > o; o++)
                e = c[o],
                h.push(a = this.uid()),
                this.addObject(a, e, this.active);
        return this.deleteObjects(t),
        h
    }
    ,
    t.prototype.applyStyle = function(t) {
        this.active.isEmpty() || (idroo.history.addStyle(this.active.index, t),
            this.active.each(function (e) {
                return function (e, u) {
                    return u.setStyle(t)
                }
            }(this)),
            this.active.toMap(this.syncChanged),
            this.active.changed = !0,
            null == t.stroke && null == t.strokeWidth || (this.calculateActiveBounds()));
       // this.refreshBounds()))
    }
    ,
    t.prototype.changeObjectStyle = function(t, e) {
        var u;
        (u = this.objects[t]) && (u.setStyle(e),
            this.syncChanged[t] = u,
            this.markObjectLayersChanged(t),
            null == e.stroke && null == e.strokeWidth || (this.checkActiveTouched(t)));
       // this.refreshBounds()))
    }
    ,
    t.prototype.changeObjectsStyle = function(t, e) {
        var u, i, o, r;
        for (u = 0,
        o = t.length; o > u; u++)
            i = t[u],
            (r = this.objects[i]) && (r.setStyle(e),
            this.syncChanged[i] = r);
        this.markObjectLayersChanged(t),
            null == e.stroke && null == e.strokeWidth || (this.checkActiveTouched(t));
        //this.refreshBounds())
    }
    ,
    t.prototype.moveSelected = function(t, e) {
        this.active.isEmpty() || (this.active.each(function(u) {
            return function(u, i) {
                return i.move(t, e)
            }
        }(this)),
        this.active.toMap(this.syncChanged),
        this.active.changed = !0,
        idroo.history.addMove(this.active.index, t, e),
        this.calculateActiveBounds(),
        this.afterChangeObjects())
    }
    ,
    t.prototype.moveObjects = function(t, e, u) {
        var i, o, r, n;
        for (i = 0,
        r = t.length; r > i; i++)
            o = t[i],
            (n = this.objects[o]) && (n.move(e, u),
            this.syncChanged[o] = n);
        this.afterChangeObjects(t)
    }
    ,
    t.prototype.scaleObjects = function(t, e, u) {
        var i, o, r, n;
        for (i = 0,
        r = t.length; r > i; i++)
            o = t[i],
            (n = this.objects[o]) && (n.scale(e, u),
            this.syncChanged[o] = n);
        this.afterChangeObjects(t)
    }
    ,
    t.prototype.rotateObjects = function(t, e, u, i) {
        var o, r, n, s;
        for (o = 0,
        n = t.length; n > o; o++)
            r = t[o],
            (s = this.objects[r]) && (s.rotate(e, u, i),
            this.syncChanged[r] = s);
        this.afterChangeObjects(t)
    }
    ,
    t.prototype.afterChangeObjects = function(t) {
        t && (this.markObjectLayersChanged(t),
            this.checkActiveTouched(t)),
            this.highlightOff(),
            this.highlight();
       // this.refreshBounds()
    }
    ,
    t.prototype.bringSelectedToFront = function() {
        var t;
        return t = this.active.index.slice(0),
        this.syncOrder.push(["front", t]),
        this.bringObjectsToFront(t)
    }
    ,
    t.prototype.sendSelectedToBack = function() {
        var t;
        return t = this.active.index.slice(0),
        this.syncOrder.push(["back", t]),
        this.sendObjectsToBack(t)
    }
    ,
    t.prototype.moveSelectedForward = function() {
        var t;
        return t = this.active.index.slice(0),
        this.syncOrder.push(["forward", t]),
        this.moveObjectsForward(t)
    }
    ,
    t.prototype.moveSelectedBackward = function() {
        var t;
        return t = this.active.index.slice(0),
        this.syncOrder.push(["backward", t]),
        this.moveObjectsBackward(t)
    }
    ,
    t.prototype.bringObjectsToFront = function(t) {
        var e;
        return this.index.removeItems(t),
        (e = this.index).push.apply(e, t)
    }
    ,
    t.prototype.sendObjectsToBack = function(t) {
        var e;
        return this.index.removeItems(t),
        (e = this.index).unshift.apply(e, t)
    }
    ,
    t.prototype.moveObjectsForward = function(t) {
        var e, u;
        return e = 1 + this.index.indexOf(t[t.length - 1]),
        0 !== e && e !== this.index.length ? (this.index.removeItems(t),
        (u = this.index).splice.apply(u, [e - t.length + 1, 0].concat(slice.call(t)))) : void 0
    }
    ,
    t.prototype.moveObjectsBackward = function(t) {
        var e, u;
        return e = this.index.indexOf(t[0]),
        1 > e ? void 0 : (this.index.removeItems(t),
        (u = this.index).splice.apply(u, [e - 1, 0].concat(slice.call(t))))
    }
    ,
    t.prototype.lockSelected = function() {
        return idroo.history.addLock(this.active.index),
        this.setLockObjects(this.active.index, !0),
        this.releaseAll()
    }
    ,
    t.prototype.unlockSelected = function() {
        return idroo.history.addUnlock(this.active.index),
        this.setLockObjects(this.active.index, !1),
        this.releaseAll()
    }
    ,
    t.prototype.setLockObjects = function(t, e) {
        var u, i, o, r;
        for (this.markObjectLayersChanged(t),
        u = 0,
        o = t.length; o > u; u++)
            i = t[u],
            (r = this.objects[i]) && (r.setLocked(e),
            this.syncChanged[i] = r);
        return this.correctLocks(t)
    }
    ,
    t.prototype.correctLocks = function(t) {
        var e, u, i, o, r, n;
        for (r = [],
        n = [],
        e = 0,
        i = t.length; i > e; e++)
            u = t[e],
            (o = this.objects[u]) && (o.locked ? u in this.fixed.objects && r.push(u) : u in this.locked.objects && n.push(u));
        r.length && (this.fixed.remove(r),
        this.locked.add(r)),
        n.length && (this.locked.remove(n),
        this.fixed.add(n)),
        (r.length || n.length) && (this.fixed.changed = !0,
        this.locked.changed = !0)
    }
    ,
    t.prototype.draw = function() {
        return this.drawBackground(),
        this.locked.draw(),
        this.fixed.draw(),
        this.others.draw(),
        this.active.draw(),
        this.highlights.draw(),
        this.drawOverlay(),
        requestAnimationFrame(function(t) {
            return function() {
                return t.draw()
            }
        }(this)),
        this
    }
    ,
    t.prototype.drawToDataURL = function() {
        var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D;
        for (h = 400,
        p = this.bounds,
        n = p.left,
        B = p.top,
        D = p.width,
        u = p.height,
        D > u ? (u = h * u / D | 0,
        D = h) : (D = h * D / u | 0,
        u = h),
        e = $("<canvas>")[0],
        e.width = D,
        e.height = u,
        t = e.getContext("2d"),
        o = D / this.bounds.width,
        t.scale(o, o),
        this.backgroundImage && (d = t.createPattern(this.backgroundImage, "repeat"),
        t.fillStyle = d,
        t.fillRect(0, 0, this.bounds.width, this.bounds.height)),
        t.translate(-n, -B),
        l = {
            stroke: !0,
            fill: !0,
            extra: !0,
            highlight: !1,
            points: !1
        },
        f = this.index,
        i = 0,
        s = f.length; s > i; i++)
            o = f[i],
            (c = this.objects[o]) && c.locked && c.draw(t, l);
        for (C = this.index,
        r = 0,
        a = C.length; a > r; r++)
            o = C[r],
            (c = this.objects[o]) && (c.locked || c.draw(t, l));
        return e.toDataURL()
    }
    ,
    t.prototype.drawBackground = function() {
        return this.background.draw(function(t) {
            return function(e) {
                var u;
                "" === t.backgroundImage ? (e.width = e.width,
                e.clearRect(-t.viewport.x, -t.viewport.y, t.viewport.width, t.viewport.height)) : (u = e.createPattern(t.backgroundImage, "repeat"),
                e.fillStyle = u,
                e.fillRect(-t.viewport.x, -t.viewport.y, t.viewport.width, t.viewport.height))
            }
        }(this)),
        this
    }
    ,
    t.prototype.drawOverlay = function() {
        return this.overlay.draw(function(t) {
            return function(e) {
                var i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b, E, w, x, _, k, S, T, M;
                if (t.textActive && t.caretVisible && t.objects[t.textActive].drawCaret(e),
                e.restore(),
                t.activeBounds) {
                    e.save(),
                    "rotate" === t.action && (a = t.pointToViewport(t.rotateCenter),
                    l = t.pointToViewport(t.rotateFrom),
                    b = t.pointToViewport(t.rotateTo),
                    Graphics.drawRotationHelper(e, a, l, b),
                    e.translate(a[0], a[1]),
                    e.rotate(Geometry.angleBetweenVectors(a, l, b)),
                    e.translate(-a[0], -a[1])),
                    Graphics.drawActiveBounds(e, t.rectangleToViewport(t.outerActiveBounds())),
                    D = t.scaleHandles;
                    for (i in D)
                        f = D[i],
                        Graphics.drawHandlePoint(e, t.pointToViewport(f), u);
                    e.restore()
                }
                k = 10,
                M = 10,
                T = t.width - 10 - ui.aside.elem.width(),
                _ = t.height - 10,
                n = (k + T) / 2,
                s = (M + _) / 2,
                S = Geometry.v2Length([T - k, _ - M]) / 2,
                A = t.editors;
                for (p in A)
                    c = A[p],
                    c.nr !== t.editorNr && (h = idroo.utils.editorColor(p),
                    F = f = t.pointToViewport(c.mouse),
                    C = F[0],
                    B = F[1],
                    Geometry.pointInRectangle(f, [k, M, T, _]) ? Graphics.drawEditorCursor(e, f, h, c.name) : (g = Geometry.v2Scale([C - n, B - s], S),
                    w = g[0],
                    x = g[1],
                    o = Geometry.angleBetweenVectors([0, 0], [-1, 1], [w, x]),
                    w = MyMath.limit(k, T, w + n),
                    x = MyMath.limit(M, _, x + s),
                    Graphics.drawEditorCursor(e, [w, x], h, "", o, .5)));
                t.selection && Graphics.drawSelectionRectangle(e, t.rectangleToViewport(t.selection)),
                v = t.width - 11,
                y = t.height - 11,
                d = v * MyMath.limit(0, .95, (-t.bounds.left - t.viewport.x) / t.bounds.width),
                m = v * MyMath.limit(.05, 1, (-t.bounds.left - t.viewport.x + t.viewport.width) / t.bounds.width),
                E = y * MyMath.limit(0, .95, (-t.bounds.top - t.viewport.y) / t.bounds.height),
                r = y * MyMath.limit(.05, 1, (-t.bounds.top - t.viewport.y + t.viewport.height) / t.bounds.height),
                e.fillStyle = "rgba(0,0,0,.3)",
                e.fillRect(2, 2 + E, 5, r - E),
                e.fillRect(9 + d, t.height - 7, m - d, 5),
                e.save()
            }
        }(this)),
        this
    }
    ,
    t.prototype.redraw = function() {
        var t, e, u, i;
        for (i = [this.background, this.locked, this.fixed, this.others, this.active, this.highlights, this.overlay],
        t = 0,
        u = i.length; u > t; t++)
            e = i[t],
            e.changed = !0
    }
    ,
    t.prototype.redrawActiveOverlay = function() {
        this.active.changed = !0,
        this.overlay.changed = !0
    }
    ,
    t.prototype.markObjectLayersChanged = function(t) {
        var e, u, i, o, r, n, s, a, h;
        for (h = "string" == typeof t,
        a = [this.locked, this.fixed, this.others, this.active],
        e = 0,
        n = a.length; n > e; e++)
            if (o = a[e],
            r = o.objects,
            h)
                t in r && (o.changed = !0);
            else
                for (i = 0,
                s = t.length; s > i; i++)
                    if (u = t[i],
                    u in r) {
                        o.changed = !0;
                        break
                    }
    }
    ,
    t.prototype.serializeChange = function() {
        var t, e, u, i, o, r, n, s, a, h;
        n = {},
        h = [],
        s = {},
        a = [],
        t = !1,
        this.syncPointer && (n.m = [this.pointer.x, this.pointer.y],
        this.syncPointer = !1,
        t = !0),
        this.syncActive && (n.a = this.active.index,
        this.syncActive = !1,
        t = !0),
        h = function() {
            var t, e;
            t = this.syncNew,
            e = [];
            for (u in t)
                i = t[u],
                null != this.objects[u] && (u in this.syncChanged && (i.serializeChange(),
                delete this.syncChanged[u]),
                e.push([u, i.serialize()]));
            return e
        }
        .call(this),
        h.length && (n.n = h,
        t = !0),
        e = !1,
        o = this.syncChanged;
        for (u in o)
            i = o[u],
            this.objects[u] && (e = !0,
            s[u] = i.serializeChange());
        e && (n.c = s,
        t = !0),
        r = this.syncDelete;
        for (u in r)
            i = r[u],
            a.push(u);
        return a.length && (n.d = a,
        t = !0),
        this.syncOrder.length && (n.o = this.syncOrder.slice(0),
        t = !0),
        this.syncNew = {},
        this.syncChanged = {},
        this.syncDelete = {},
        this.syncOrder.length = 0,
        t ? n : null
    }
    ,
    t.prototype.restoreChange = function(t) {
       // console.log("ggggg");
      //  console.warn(t.editors);
       // console.log(t);
        if (t.m) {
           // console.log(t.m);
            this.editors[6].mouse = t.m;
        }
        var e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v;
        if (t.background && this.setBackground(t.background),
        t.editors) {
            e = {},
            A = t.editors;
            for (i in A)
                u = A[i],
                e[i] = u.active,
                delete u.active,
                ui.editors.add(u),
                ui.phone.addUser(u);
            this.editors = t.editors,
            this.overlay.changed = !0
        }
        if (t.m && (this.editors[6].mouse = t.m,
        this.overlay.changed = !0),
        t.n)
            for (F = t.n,
            r = 0,
            c = F.length; c > r; r++)
                g = F[r],
                n = g[0],
                C = g[1],
                C && (f = DrawObject.restore(C),
                this.addObject(n, f, f.locked ? this.locked : this.fixed, !1));
        if (t.c) {
            a = [],
            m = t.c;
            for (n in m)
                C = m[n],
                this.objects[n].restoreChange(C),
                this.markObjectLayersChanged(n),
                a.push(n);
            this.correctLocks(a),
            idroo.history.forget(a),
            this.refreshBounds()
        }
        if (t.a && (this.others.to(t.e, this.fixed, this.locked).add(t.e, t.a),
        this.locked.remove(t.a),
        this.fixed.remove(t.a),
        idroo.history.forget(t.a)),
        e)
            for (n in e)
                o = e[n],
                this.others.add(n, o),
                this.locked.remove(o),
                this.fixed.remove(o),
                idroo.history.forget(t.a);
        if (t.d && this.deleteObjects(t.d, !1),
        t.o)
            for (y = t.o,
            h = 0,
            l = y.length; l > h; h++) {
                for (v = y[h],
                D = v[0],
                a = v[1],
                B = [],
                p = 0,
                d = a.length; d > p; p++)
                    s = a[p],
                    s in this.objects && B.push(s);
                if (B.length)
                    switch (D) {
                    case "front":
                        this.bringObjectsToFront(B);
                        break;
                    case "back":
                        this.sendObjectsToBack(B);
                        break;
                    case "forward":
                        this.moveObjectsForward(B);
                        break;
                    case "backward":
                        this.moveObjectsBackward(B)
                    }
            }
    }
    ,
    t.prototype.sync = function(t) {
        var m = this.serializeChange();
      

        if(m)
        {
           // console.log(this.editors);
          //  console.log(m);
            // var t, e, u, i, o, r, n, s, a, h;
            //var d = new Date();
            //var time1 = d.getTime();
            //console.log(screenControler.screanShareRecquestTime);
            //console.log(time1);

            //if (screenControler.screanShareRecquestTime && time1 > screenControler.screanShareRecquestTime) {
            //    console.log("nothing 1");
            //    t()
            //    return;
            //}
             
            if ( m.t == undefined && m.e == undefined && m.u == undefined && m.i == undefined && m.o == undefined && m.r == undefined && m.n == undefined && m.s == undefined && m.a == undefined && m.h == undefined && m.c == undefined && m.d == undefined) {
                //console.log("nothing");
                //console.log(m);ggggg
                if (CBoard.MousePointer) {
                  
                    
                    if (board.user.permission.toolBox) {
                        p = { type: 'mouse', action: 'board', p: bboard.pageID, f: bboard.fileID, m: m, name: board.shortName };
                        mainApp.sendToServer(p);
                    }
                }
              
                t()
                return;
            }
            //console.warn(m);
            p = { type: 'board', action: 'board', p: bboard.pageID, f: bboard.fileID, m: m  };
           // console.warn(p);
            if (board.user.permission.toolBox) {
                mainApp.sendToServer(p);
            }
           // this.socket.emit("sync", p, t)
        }
       
         
        t()
        return
       /*  console.log("send sync");
        var p  = this.serializeChange();
        this.socket.emit("sync", p, t);
        console.log(t);
        return; */
        var e;
         (e = this.serializeChange()) ? this.socket.emit("sync", e, t) : t()
        // console.log(e);
       // this.allowSync && (e = this.serializeChange()) ? this.socket.emit("sync", e, t) : t()
    }
    ,
    t
}();
var hasProp = {}.hasOwnProperty
  , indexOf = [].indexOf || function(t) {
    for (var e = 0, u = this.length; u > e; e++)
        if (e in this && this[e] === t)
            return e;
    return -1
}
;
!function() {
    var t, e, u, i, o, r, n, s, a, h, c, l;
    return c = $("#undo-button"),
    n = $("#redo-button"),
    a = [],
    u = 0,
    o = {
        keys: [],
        objects: []
    },
    e = function(t, e) {
        var u, i, o, r;
        i = {};
        for (u in t)
            hasProp.call(t, u) && (o = t[u],
            null != e[u] && (r = "function" == typeof o.push ? e[u].slice(0) : e[u],
            i[u] = r));
        return i
    }
    ,
    s = function(t, e, u) {
        var i, o, r, n, s, a, h, c, l;
        if (e.length !== t.keys.length)
            return !1;
        l = {};
        for (r in u)
            if (hasProp.call(u, r) && null == t.style[r])
                return !1;
        a = t.style;
        for (r in a)
            if (hasProp.call(a, r) && null == u[r])
                return !1;
        for (c = {},
        h = t.keys,
        i = 0,
        n = h.length; n > i; i++)
            r = h[i],
            c[r] = !0;
        for (o = 0,
        s = e.length; s > o; o++)
            if (r = e[o],
            !c[r])
                return !1;
        return !0
    }
    ,
    l = function() {
        c.toggleClass("disabled", 0 === u),
        n.toggleClass("disabled", u === a.length)
    }
    ,
    this.idroo.history = {
        updateUI: l,
        clear: function() {
            a = [],
            u = 0,
            o = {
                keys: [],
                objects: []
            },
            l()
        },
        push: i = function(t, e) {
            e.type = t,
            null == e.time && (e.time = (new Date).getTime()),
            a.length = u,
            a.push(e),
            u++,
            l()
        }
        ,
        link: function() {
            u && (a[u - 1].link = !0)
        },
        forget: function(t) {
            var e, i, o, r, n, s, h, c, d, p, f;
            for ("string" == typeof t && (t = [t]),
            e = o = h = a.length - 1; o > -1; e = o += -1)
                switch (f = a[e],
                f.type) {
                case "create":
                case "delete":
                case "style":
                    if (n = f.keys.length,
                    f.keys.removeItems(t),
                    n !== f.keys.length)
                        if (f.keys.length)
                            for (s = f.objects,
                            i = r = c = s.length - 1; r > -1; i = r += -1)
                                d = s[i].key,
                                indexOf.call(t, d) >= 0 && s.splice(i, 1);
                        else
                            a.splice(e, 1),
                            u > e && u--;
                    break;
                case "move":
                case "scale":
                case "rotate":
                case "lock":
                    f.keys.removeItems(t),
                    f.keys.length || (a.splice(e, 1),
                    u > e && u--);
                    break;
                case "text":
                    p = f.key,
                    indexOf.call(t, p) >= 0 && (a.splice(e, 1),
                    u > e && u--)
                }
            l()
        },
        undoAfter: function(t) {
            for (; u > 0 && a[u - 1].time > t; )
                h();
            a.length = u,
            l()
        },
        undo: h = function() {
            var t, e, i, o, r, n, s, c, d;
            if (u) {
                switch (d = a[--u],
                t = idroo.board,
                d.type) {
                case "create":
                    t.deleteObjects(d.keys);
                    break;
                case "delete":
                    for (s = d.objects,
                    e = 0,
                    o = s.length; o > e; e++)
                        n = s[e],
                        t.addObject(n.key, DrawObject.restore(n.data));
                    break;
                case "move":
                    t.moveObjects(d.keys, -d.dx, -d.dy);
                    break;
                case "scale":
                    t.scaleObjects(d.keys, d.to, d.from);
                    break;
                case "rotate":
                    t.rotateObjects(d.keys, d.center, d.to, d.from);
                    break;
                case "style":
                    for (c = d.objects,
                    i = 0,
                    r = c.length; r > i; i++)
                        n = c[i],
                        t.changeObjectStyle(n.key, n.style);
                    break;
                case "text":
                    t.changeObjectText(d.key, d.oldState);
                    break;
                case "lock":
                    t.setLockObjects(d.keys, !d.lock)
                }
                u && a[u - 1].link ? h() : (l(),
                t.updateToolbars())
            }
        }
        ,
        redo: r = function() {
            var t, e, i, o, n, s;
            if (u < a.length) {
                switch (s = a[u++],
                t = idroo.board,
                s.type) {
                case "create":
                    for (n = s.objects,
                    e = 0,
                    i = n.length; i > e; e++)
                        o = n[e],
                        t.addObject(o.key, DrawObject.restore(o.data));
                    break;
                case "delete":
                    t.deleteObjects(s.keys);
                    break;
                case "move":
                    t.moveObjects(s.keys, s.dx, s.dy);
                    break;
                case "scale":
                    t.scaleObjects(s.keys, s.from, s.to);
                    break;
                case "rotate":
                    t.rotateObjects(s.keys, s.center, s.from, s.to);
                    break;
                case "style":
                    t.changeObjectsStyle(s.keys, s.style);
                    break;
                case "text":
                    t.changeObjectText(s.key, s.state);
                    break;
                case "lock":
                    t.setLockObjects(s.keys, s.lock)
                }
                s.link ? r() : (l(),
                t.updateToolbars())
            }
        }
        ,
        addCreate: t = function(t, e, u) {
            var r, n, s, a;
            for (null == t && (t = []),
            null == e && (e = "create"),
            null == u && (u = !1),
            r = idroo.board.objects,
            "string" == typeof t && (t = [t]),
            n = 0,
            a = t.length; a > n; n++)
                s = t[n],
                o.objects.push({
                    key: s,
                    data: r[s].serialize()
                });
            o.keys.push.apply(o.keys, t),
            u || (o.keys.length && i(e, {
                keys: o.keys.slice(0),
                objects: o.objects.slice(0)
            }),
            o.keys.length = o.objects.length = 0)
        }
        ,
        addDelete: function(e, u) {
            return null == e && (e = []),
            null == u && (u = !1),
            t(e, "delete", u)
        },
        addMove: function(t, e, u) {
            return e || u ? i("move", {
                keys: t.slice(0),
                dx: e,
                dy: u
            }) : void 0
        },
        addScale: function(t, e, u) {
            i("scale", {
                keys: t.slice(0),
                from: e.slice(0),
                to: u.slice(0)
            })
        },
        addRotate: function(t, e, u, o) {
            i("rotate", {
                keys: t.slice(0),
                center: e.slice(0),
                from: u.slice(0),
                to: o.slice(0)
            })
        },
        fixScale: function(t, e) {
            var i;
            u && (0 === u || u < a.length || (i = a[u - 1],
            "scale" === i.type && 1 === i.keys.length && i.keys[0] === t && (i.to = e.slice(0))))
        },
        addStyle: function(t, o) {
            var r, n, h, c, l, d, p, f;
            if (f = (new Date).getTime(),
            u && "style" === (p = a[u - 1]).type && f - p.time < 200 && s(p, t, o))
                return p.time = f,
                p.style = e(o, o),
                void (a.length = u);
            for (d = [],
            r = idroo.board.objects,
            n = 0,
            c = t.length; c > n; n++)
                h = t[n],
                l = r[h],
                d.push({
                    key: h,
                    style: e(o, l.style)
                });
            return i("style", {
                time: f,
                keys: t.slice(0),
                objects: d,
                style: e(o, o)
            })
        },
        addText: function(t, e, o) {
            var r, n;
            return n = (new Date).getTime(),
            u && "text" === (r = a[u - 1]).type && n - r.time < 500 ? (r.time = n,
            r.state = o,
            void (a.length = u)) : i("text", {
                time: n,
                key: t,
                oldState: e,
                state: o
            })
        },
        addLock: function(t) {
            return i("lock", {
                keys: t.slice(0),
                lock: !0
            })
        },
        addUnlock: function(t) {
            return i("lock", {
                keys: t.slice(0),
                lock: !1
            })
        }
    }
}();
var idroo;
idroo = this.idroo = this.idroo || {},
function() {
    var t;
    return t = {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        91: "meta",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        191: "/"
    },
    idroo.utils = {
        colorsEqual: function(t, e) {
            return t.length === e.length && t[0] === e[0] && t[1] === e[1] && t[2] === e[2]
        },
        editorColor: function(t, e, u) {
            return null == e && (e = 1),
            null == u && (u = 70),
            "hsla(" + 261 * (t - 1) % 360 + ",80%," + u + "%," + e + ")"
        },
        extractShortcut: function(e) {
            var u, i, o;
            return o = t[e.which],
            u = String.fromCharCode(e.which).toLowerCase(),
            i = "",
            e.altKey && "alt" !== o && (i += "alt+"),
            e.ctrlKey && "ctrl" !== o && (i += "ctrl+"),
            e.metaKey && "meta" !== o && (i += "meta+"),
            e.shiftKey && "shift" !== o && (i += "shift+"),
            i + (o || u)
        },
        dataURItoBlob: function(t) {
            var e, u, i, o, r, n, s, a, h, c, l;
            for (c = t.split(","),
            s = c[0],
            o = c[1],
            l = s.match(/:([^;]*);?(.*)/),
            e = l[0],
            a = l[1],
            r = l[2],
            i = "base64" === r ? atob(o) : unescape(o),
            h = i.length,
            u = new ArrayBuffer(h),
            n = new Uint8Array(u); h--; )
                n[h] = i.charCodeAt(h);
            return new Blob([u],{
                type: a
            })
        },
        formatTime: function(t) {
            var e, u, i;
            return i = parseInt(t, 10),
            e = Math.floor(i / 3600),
            u = Math.floor(i % 3600 / 60),
            i %= 60,
            10 > e && (e = "0" + e),
            10 > u && (u = "0" + u),
            10 > i && (i = "0" + i),
            e + ":" + u + ":" + i
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = this.idroo.ui = this.idroo.ui || {},
function() {
    var t, e;
    return t = $("#ui"),
    e = ".colorpicker.open, .select-button.open, #colorpicker, #context-menu, .menu-button",
    t.on("pointerdown", ".select-button:not(.disabled)", function() {
        return ui.toggleDropdown(this),
        !1
    }),
    t.on("pointerdown", ".select-button .items", !1),
    t.on("pointerup", ".select-button .items .button", function() {
        var t, e;
        e = $(this),
        t = e.closest(".select-button"),
        t.trigger("change", [e.data("value")]),
        t.removeClass("open")
    }),
    t.on("pointerdown", ".menu-button", function() {
        return ui.toggleDropdown(this),
        !1
    }),
    t.on("click", ".menu-button .menu .button", function(t) {
        $(this).closest(".menu-button").removeClass("open")
    }),
    t.on("pointerdown", ".menu-button > .menu", function(t) {
        t.stopPropagation()
    }),
    t.on("pointerdown", ".select-button", function(t) {
        t.stopPropagation()
    }),
    ui.closeDropdowns = function() {
        var t, u;
        return t = $(e),
        u = t.filter(".open").length,
        u && t.trigger("close").removeClass("open"),
        u
    }
    ,
    ui.toggleDropdown = function(t) {
        $(e).not(t).removeClass("open"),
        $(t).toggleClass("open")
    }
    ,
    idroo.window.on("pointerdown", ui.closeDropdowns),
    t.on("click", ".dialog-box .close.button", function() {
        return $(this).closest(".dialog-box").fadeOut()
    })
}(),
$.fn.slider = function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d;
    return a = $(this),
    l = a.find(".track"),
    e = a.find(".handle"),
    u = 0,
    d = 0,
    h = 0,
    o = a.data("min") || 0,
    i = a.data("max") || 100,
    c = a.data("step") || 1,
    n = i - o,
    t = null,
    l.attr("touch-action", "none").css("touch-action", "none"),
    r = function(t) {
        return MyMath.limit(o, i, o + c * Math.round(n / c * (t - h) / d))
    }
    ,
    a.set = s = function(u, i) {
        return t === u ? a : (t = u,
        a.attr("data-value", u),
        e.css({
            width: 100 * (u - o) / n + "%"
        }),
        i && a.trigger("change", [u]),
        a)
    }
    ,
    l.on("pointerdown", function(t) {
        t.preventDefault(),
        this.setPointerCapture(t.originalEvent.pointerId),
        u = parseFloat(e.css("border-right-width")),
        d = l.width() - u,
        h = l.offset().left + u / 2,
        s(r(t.pageX), !0),
        a.addClass("sliding")
    }),
    l.on("pointermove", function(t) {
        t.preventDefault(),
        a.is(".sliding") && s(r(t.pageX), !0)
    }),
    l.on("pointerup", function(t) {
        t.preventDefault(),
        a.removeClass("sliding")
    }),
    s(parseFloat(a.data("value"))),
    a
}
,
$.fn.picker = function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p;
    return n = $(this),
    t = n.find(".area"),
    s = n.find(".pointer"),
    p = 0,
    u = 0,
    r = [parseInt(t.css("padding-left"), 10), parseInt(t.css("padding-top"), 10)],
    l = [0, 0],
    o = n.data("min") || 0,
    i = n.data("max") || 100,
    d = n.data("step") || 1,
    h = i - o,
    e = [null, null],
    n.attr("touch-action", "none").css("touch-action", "none"),
    a = function(t) {
        return [MyMath.limit(o, i, o + d * Math.round(h / d * (t.pageX - l[0]) / p)), MyMath.limit(o, i, o + d * Math.round(h / d * (t.pageY - l[1]) / u))]
    }
    ,
    n.set = c = function(t, u) {
        return e[0] === t[0] && e[1] === t[1] ? n : (e = t,
        s.css({
            left: 100 * (t[0] - o) / h + "%",
            top: 100 * (t[1] - o) / h + "%"
        }),
        u && n.trigger("change", t.slice()),
        n)
    }
    ,
    n.on("pointerdown", function(e) {
        var i;
        e.preventDefault(),
        this.setPointerCapture(e.originalEvent.pointerId),
        p = t.innerWidth(),
        u = t.innerHeight(),
        i = t.offset(),
        l = [i.left + r[0], i.top + r[1]],
        c(a(e), !0),
        n.addClass("sliding")
    }),
    n.on("pointermove", function(t) {
        t.preventDefault(),
        n.is(".sliding") && c(a(t), !0)
    }),
    n.on("pointerup", function(t) {
        t.preventDefault(),
        n.removeClass("sliding")
    }),
    n
}
;
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.colorpicker = function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f;
    return s = $("#colorpicker"),
    o = $(".close", s),
    c = $("#colorpicker-picker-color"),
    l = $("#colorpicker-preview"),
    h = $("#colorpicker-picker").picker(),
    a = $("#colorpicker-hue").slider(),
    e = $("#colorpicker-alpha").slider(),
    n = [0, 100, 50],
    t = 100,
    i = null,
    r = null,
    o = function() {
        return r && r(),
        i = null,
        r = null,
        s.detach()
    }
    ,
    s.on("pointerdown", function(t) {
        return t.stopPropagation()
    }),
    s.on("click", ".icon-close", o),
    l.on("click", o),
    s.on("dblclick", o),
    s.on("close", o),
    s.on("click", ".color", function() {
        d($(this).data("color").slice(), 100),
        u()
    }),
    u = function() {
        return i ? i(n.slice(), t) : void 0
    }
    ,
    f = function() {
        return c.css("background-color", "hsl(" + n[0] + ",100%,50%)")
    }
    ,
    p = function() {
        return e.css("background-color", DrawObject.makeColor(n)),
        l.css("background-color", DrawObject.makeColor(n, t))
    }
    ,
    h.on("change", function(t, e, i) {
        return n[1] = Math.round(e),
        n[2] = Math.round(100 - i),
        p(),
        u()
    }),
    a.on("change", function(t, e) {
        return n[0] = e,
        f(),
        p(),
        u()
    }),
    e.on("change", function(e, i) {
        return t = i,
        p(),
        u()
    }),
    d = function(u, i) {
        null == i && (i = 100),
        n = u,
        t = i,
        a.set(n[0]),
        e.set(t),
        h.set([n[1], 100 - n[2]]),
        f(),
        p()
    }
    ,
    {
        pick: function(t, e, u, o) {
            i = o.change,
            r = o.close,
            d(e, u),
            s.insertAfter(t),
            s.addClass("open")
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.progressbar = function() {
    var t, e, u, i;
    return e = $('<div class="progress">'),
    u = $('<div class="text">'),
    t = $('<div class="bar">'),
    i = $('<div class="value">'),
    t.append(i),
    e.append(u),
    e.append(t),
    e.setState = function(e, o) {
        null != o ? (t.removeClass("spin"),
        i.css("width", 100 * o + "%")) : (t.addClass("spin"),
        i.css("width", "")),
        u.text(e)
    }
    ,
    e.done = function() {
        e.trigger("done")
    }
    ,
    e
}
;
var idroo, ui, slice = [].slice;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B, D, A, F, g, m, y, v, b;
    return t = 2,
    p = $("aside .file-list"),
    a = $("#documents .list-scroller, #images .list-scroller"),
    n = $("#documents-list"),
    u = $("#document-pages"),
    d = $("#images-list"),
    o = $("#document"),
    i = $("#document h2"),
    v = $("#upload-queue"),
    m = $("#documents .file-upload-button, #images .file-upload-button"),
    g = $("#documents .button.icon-trash, #images .button.icon-trash"),
    c = /^image/,
    h = null,
    r = [],
    l = [],
    b = {},
    p.on("dragstart", ".file", function(t) {
        var e, u;
        e = $(this),
        e.closest(".drop-target").addClass("disabled"),
        e.addClass("dragging"),
        u = t.originalEvent.dataTransfer,
        e.data("allowFit") ? u.setData("text", "idroo:fit:" + e.data("image")) : u.setData("text", "idroo:" + e.data("image"))
    }),
    p.on("dragend", ".file", function(t) {
        var e;
        e = $(this),
        e.closest(".drop-target").removeClass("disabled"),
        e.removeClass("dragging")
    }),
    m.on("change", "input", function(t) {
        var e, u, i, o;
        for (o = t.target.files,
        u = 0,
        i = o.length; i > u; u++)
            e = o[u],
            s(e)
    }),
    a.on("dragenter dragover", function(t) {
        return t.preventDefault()
    }),
    a.on("drop", function(t) {
        var e, u, i;
        if (h = t.originalEvent.dataTransfer.files)
            for (u = 0,
            i = h.length; i > u; u++)
                e = h[u],
                s(e)
    }),
    g.on("dragenter dragover", function(t) {
        return t.preventDefault()
    }),
    g.on("drop", function(t) {
        var e, u, i, o, n;
        (n = t.originalEvent.dataTransfer.getData("text")) && (o = n.match(/^idroo:(?:fit:)?\/doc\/(.*)\//)) && (u = o[1],
        e = $("#doc-" + u),
        i = e.closest("#images").length,
        e.remove(),
        delete h[u],
        r = r.filter(function(t) {
            return t.id !== u
        }),
        l = l.filter(function(t) {
            return t.id !== u
        }),
        i && F(),
        $.post("/drawer/trash/" + u))
    }),
    n.on("click", ".file.document", function() {
        B($(this).data("file"))
    }),
    o.on("click", ".icon-back", function() {
        o.removeClass("active")
    }),
    s = function(t) {
        var e;
        e = y(t, function(t, e) {
            return t ? alert(t) : C(e)
        }),
        e.appendTo(v.show()),
        e.on("done", function() {
            return e.remove(),
            v.children().length ? void 0 : v.hide()
        })
    }
    ,
    e = function(t) {
        t.id in h || (h[t.id] = t,
        t.isImage ? l.push(t) : r.push(t))
    }
    ,
    f = function(t) {
        return h ? t() : (h = {},
        void $.getJSON("/drawer/docs", function(u) {
            var i, o, r;
            for (o = 0,
            r = u.length; r > o; o++)
                i = u[o],
                e(i);
            return t()
        }))
    }
    ,
    A = function() {
        var t, e, u, i, o, r;
        for (d.empty(),
        l.length && d.siblings(".empty-list").remove(),
        e = [],
        o = 0,
        r = l.length; r > o; o++)
            u = l[o],
            i = $("<img>"),
            i.attr("src", "/doc/" + u.id + "/0/thumb"),
            i.on("load", F),
            t = $('<div class="list-item image file" id="doc-' + u.id + '" draggable="true">'),
            $('<div class="image">').append(i).appendTo(t),
            $('<div class="name">').text(u.name).appendTo(t),
            t.data({
                file: u,
                image: "/doc/" + u.id + "/0",
                allowFit: !0
            }),
            e.push(t);
        d.append(e),
        F()
    }
    ,
    D = function() {
        var t, e, u, i, o;
        for (n.empty(),
        r.length && n.siblings(".empty-list").remove(),
        i = 0,
        o = r.length; o > i; i++)
            e = r[i],
            u = $("<img>"),
            u.attr("src", "/doc/" + e.id + "/0/thumb"),
            t = $('<div class="list-item document file" id="doc-' + e.id + '" draggable="true">'),
            $('<div class="image">').append(u).appendTo(t),
            $('<div class="name">').text(e.name).appendTo(t),
            e.pages > 1 && $('<div class="pages">').text(e.pages + " pages").appendTo(t),
            t.data({
                file: e,
                image: "/doc/" + e.id + "/0"
            }),
            t.appendTo(n)
    }
    ,
    B = function(t) {
        var e, r, n, s, a;
        for (u.empty(),
        o.addClass("active"),
        i.text(t.name),
        r = s = 0,
        a = t.pages; a >= 0 ? a > s : s > a; r = a >= 0 ? ++s : --s)
            n = $("<img>"),
            n.attr("src", "/doc/" + t.id + "/" + r + "/thumb"),
            e = $('<div class="list-item file page" draggable="true">'),
            $('<div class="image">').append(n).appendTo(e),
            $('<div class="name">').text(r + 1).appendTo(e),
            e.data("image", "/doc/" + t.id + "/" + r),
            e.appendTo(u)
    }
    ,
    F = _.throttle(function() {
        var t, e;
        t = 0,
        e = 0,
        d.children().removeClass("right").each(function() {
            var u, i;
            return i = $(this),
            u = i.height() + parseInt(i.css("margin-bottom"), 10),
            t > e ? (i.addClass("right"),
            e += u) : t += u
        })
    }, 200),
    C = function(t) {
        t.isImage ? ui.aside.openSection("images") : ui.aside.openSection("documents", function() {
            return B(t)
        })
    }
    ,
    idroo.drawer = {
        openDocument: function(t) {
            C(t)
        },
        uploadFile: y = function(t, u) {
            var i, o, r, n, s;
            if (i = !1,
            o = function() {
                var t;
                return t = 1 <= arguments.length ? slice.call(arguments, 0) : [],
                i ? void 0 : (i = !0,
                u.apply(null, t))
            }
            ,
            "string" == typeof t)
                try {
                    t = idroo.utils.dataURItoBlob(t)
                } catch (a) {
                    return r = a,
                    void setTimeout(function() {
                        return o("Unsupported file")
                    }, 0)
                }
            return n = ui.progressbar(),
            s = new FileReader,
            s.addEventListener("progress", function(t) {
                n.setState("Reading file", t.loaded / t.total)
            }),
            s.addEventListener("loadend", function(u) {
                var i, r;
                return r = (new Rusha).digestFromBuffer,
                i = r(u.target.result),
                null != b[i] ? (n.done(),
                o("DUPLICATE")) : (b[i] = !0,
                void $.getJSON("/docinfo/" + i, {
                    add: !0,
                    name: t.name
                }, function(u) {
                    var r, s, a, h, c;
                    return u ? (u.success ? (r = u.document,
                    f(function() {
                        return e(r)
                    }),
                    o(null, r)) : o(u.error),
                    n.done(),
                    void delete b[i]) : (c = new XMLHttpRequest,
                    c.upload.addEventListener("progress", function(t) {
                        t.lengthComputable && (t.loaded === t.total ? n.setState("Processing") : n.setState("Uploading", t.loaded / t.total))
                    }, !1),
                    c.onload = function(t) {
                        u = JSON.parse(c.responseText),
                        u.success ? 200 === c.status ? (r = u.document,
                        f(function() {
                            return e(r)
                        }),
                        o(null, r)) : o("Upload failed for unknown reason") : o(u.error),
                        n.done(),
                        delete b[i]
                    }
                    ,
                    c.open("POST", "/doc"),
                    a = null != (h = t.name) ? h : "Pasted " + (t.type.match(/^image/) ? "image" : "file"),
                    s = new FormData,
                    s.append("file", t, a),
                    void c.send(s))
                }))
            }),
            s.readAsArrayBuffer(t),
            n
        }
    },
    ui.documents = {
        open: function(t) {
            f(function() {
                return D(),
                "function" == typeof t ? t() : void 0
            })
        }
    },
    ui.images = {
        open: function(t) {
            f(function() {
                return A(),
                "function" == typeof t ? t() : void 0
            })
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.sharing = function() {
    var t, e, u, i, o, r, n, s;
    return i = $("#sharing"),
    t = $("#board-access"),
    e = $("#board-link"),
    u = $("#board-users"),
    n = $("#board-user-template").detach().removeAttr("id"),
    s = {},
    t.on("click", ".button", function() {
        idroo.board.setAccess($(this).data("level"))
    }),
    e.on("focus click pointerup", function() {
        return this.select(),
        !1
    }),
    u.on("click", ".rights .button", function() {
        var t;
        t = $(this),
        idroo.board.grantAccess(t.closest(".user").data("id"), t.data("level"))
    }),
    r = function() {
        var t, e;
        u.empty();
        for (t in s)
            e = s[t],
            o(t, e)
    }
    ,
    o = function(t, e) {
        var i, o;
        e.listItem = i = n.clone(),
        i.data("id", t),
        i.find(".name").text(e.name),
        e.picture && i.find(".user-image").css("background-image", "url(" + e.picture + ")"),
        o = i.find(".rights"),
        o.attr("data-value", o.find('[data-level="' + e.level + '"]').text()),
        "own" !== e.level && t !== idroo.board.userId || o.addClass("disabled"),
        i.appendTo(u)
    }
    ,
    {
        setAccess: function(e) {
            t.attr("data-value", t.find('[data-level="' + e + '"]').text())
        },
        setUsers: function(t) {
            s = t,
            i.is(".active") && r()
        },
        addUser: function(t) {
            s[t.id] || (u.is(":visible") && o(t.id, t),
            s[t.id] = t)
        },
        removeUser: function(t) {
            var e, u;
            (u = s[t]) && (null != (e = u.listItem) && e.remove(),
            delete s[t])
        },
        setUserAccess: function(t, e) {
            var u, i;
            (i = s[t]) && (i.level = e,
            i.listItem && (u = i.listItem.find(".rights"),
            u.attr("data-value", u.find('[data-level="' + e + '"]').text())))
        },
        open: function(t) {
            r(),
            "function" == typeof t && t()
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.settings = function() {
    var t, e, u, i;
    return e = $("#settings"),
    t = $("#backgrounds"),
    i = {},
    t.on("click", ".background-style", function() {
        var t;
        t = $(this).data("background"),
        u(t),
        idroo.board.changeBackground(t)
    }),
    {
        selectBackground: u = function(e) {
            t.find('.background-style[data-background="' + e + '"]').addClass("active").siblings().removeClass("active")
        }
        ,
        open: function(t) {
            "function" == typeof t && t()
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.tutorads = function() {
    return;
    var t, e, u, i;
    return t = $("#tutors"),
    i = $("#tutor-ad-template").detach().removeAttr("id"),
    e = function(e) {
        var u;
        u = i.clone(),
        e.picture && u.find(".tutor-image").css("background-image", "url(" + e.picture + ")"),
        u.find(".subjects").text(e.subjects),
        u.attr("href", "/tutor/" + e.id),
        u.appendTo(t)
    }
    ,
    u = function() {
        return t.html('<p>No tutos have added their info yet.<p>If you are a teacher, check out <a href="/tutors/about">Tutor profiles</a>.')
    }
    ,
    $.getJSON("https://idroo.com/tutor-ads", function(i) {
        var o, r, n;
        if (t.empty(),
        Object.keys(i).length)
            for (r = 0,
            n = i.length; n > r; r++)
                o = i[r],
                e(o);
        else
            u()
    }),
    {
        open: function(t) {
            "function" == typeof t && t()
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p;
    for (t = $("#ui"),
    h = {
        stroke: c = {
            toolbar: $("#stroke-toolbar"),
            color: $("#stroke-color-button"),
            picker: $("#stroke-color-picker"),
            width: $("#stroke-width-slider").slider()
        },
        fill: u = {
            toolbar: $("#fill-toolbar"),
            color: $("#fill-color-button"),
            picker: $("#fill-color-picker")
        },
        text: l = {
            toolbar: $("#text-toolbar"),
            color: $("#text-color-button"),
            picker: $("#text-color-picker"),
            size: $("#text-size-slider").slider(),
            font: $("#text-font-button")
        },
        formula: o = {
            toolbar: $("#formula-toolbar"),
            color: $("#formula-color-button"),
            picker: $("#formula-color-picker")
        }
    },
    c.width.on("change", function(t, u) {
        return e({
            strokeWidth: u
        })
    }),
    l.size.on("change", function(t, u) {
        return e({
            textSize: u
        })
    }),
    l.font.on("change", function(t, u) {
        return e({
            font: u
        })
    }),
    s = ["stroke", "fill", "text", "formula"],
    i = function(t) {
        var u, i, o, r, n;
        return n = h[t],
        u = n.color,
        i = n.picker,
        r = t + "Color",
        o = t + "Alpha",
        u.on("pointerdown", function() {
            return ui.toggleDropdown(i),
            !1
        }),
        i.on("pointerup", ".colorwheel", function(u) {
            return u.stopImmediatePropagation(),
            ui.colorpicker.pick(i, idroo.style[r], idroo.style[o], {
                change: function(u, i) {
                    var n;
                    return n = {},
                    0 === i ? n[t] = !1 : (idroo.style[t] === !1 && (n[t] = !0),
                    n[r] = u,
                    n[o] = i),
                    e(n)
                },
                close: function() {
                    return i.removeClass("open"),
                    idroo.board.focusInput()
                }
            }),
            i.removeClass("open")
        }),
        i.on("pointerup", ".color-button", function() {
            var u, o;
            u = $(this),
            o = {},
            u.is(".off") ? o[t] = !1 : (idroo.style[t] === !1 && (o[t] = !0),
            o[r] = u.data("color")),
            e(o),
            i.removeClass("open")
        }),
        i.on("pointerdown", function(t) {
            return t.stopPropagation()
        })
    }
    ,
    r = 0,
    n = s.length; n > r; r++)
        d = s[r],
        i(d);
    return a = function(t) {
        $.extend(!0, idroo.style, t),
        null != t.strokeWidth && c.width.set(t.strokeWidth),
        null != t.strokeColor && c.color.css("background-color", DrawObject.makeColor(t.strokeColor, idroo.style.strokeAlpha)),
        null != t.strokeAlpha && c.color.css("background-color", DrawObject.makeColor(idroo.style.strokeColor, t.strokeAlpha)),
        null != t.stroke && c.color.toggleClass("off", !t.stroke),
        null != t.fillColor && u.color.css("background-color", DrawObject.makeColor(t.fillColor, idroo.style.fillAlpha)),
        null != t.fillAlpha && u.color.css("background-color", DrawObject.makeColor(idroo.style.fillColor, t.fillAlpha)),
        null != t.fill && u.color.toggleClass("off", !t.fill),
            null != t.font && (l.font.css("font-family","tahoma"),// t.font),
            l.font.attr("data-value", "tahoma")),// t.font)),
        null != t.textSize && l.size.set(t.textSize),
        null != t.textColor && l.color.css("background-color", DrawObject.makeColor(t.textColor, idroo.style.textAlpha)),
        null != t.textAlpha && l.color.css("background-color", DrawObject.makeColor(idroo.style.textColor, t.textAlpha)),
        null != t.formulaColor && o.color.css("background-color", DrawObject.makeColor(t.formulaColor, idroo.style.formulaAlpha)),
        null != t.formulaAlpha && o.color.css("background-color", DrawObject.makeColor(idroo.style.formulaColor, t.formulaAlpha))
    }
    ,
    e = function(t) {
        a(t),
        idroo.board.applyStyle(t),
        idroo.board.focusInput()
    }
    ,
    p = function(t, e) {
        null == t && (t = {}),
        "string" == typeof (d = t) && (t = {},
        t[d] = 1),
        c.toolbar.toggleClass("enabled", !!(t.Freehand || t.Line || t.Rectangle || t.Ellipse || t.Text || t.Image || t.Formula)),
        u.toolbar.toggleClass("enabled", !!(t.Freehand || t.Rectangle || t.Ellipse || t.Text || t.Image || t.Formula)),
        l.toolbar.toggleClass("enabled", !!t.Text),
        o.toolbar.toggleClass("enabled", !!t.Formula)
    }
    ,
    a(DrawObject.defaultStyle),
    ui.style = {
        apply: e,
        set: a,
        types: p,
        toggleFormulaButtons: function(t) {
            return o.toolbar.find(".formula-select").toggle(t)
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c;
    return t = $("#ui"),
    s = $("#toolbar"),
    e = $("aside"),
    u = $("#board-title input"),
    a = $("#zoom"),
    h = $("#zoom-in"),
    c = $("#zoom-out"),
    n = $("#saving-box"),
    o = $("#download-box"),
    i = s.find(".button[data-action]"),
    i.on("click", function() {
        var t;
        t = $(this),
        idroo.action = t.data("action"),
        idroo.objectType = t.data("type"),
        t.addClass("active"),
        i.not(this).removeClass("active"),
        idroo.board.releaseAll(),
        idroo.board.setCursor(),
        idroo.board.focusInput()
    }),
    $("#menu-clean-board").on("click", function() {
        return idroo.board.deleteAll()
    }),
    r = function() {
        return idroo.board.changeTitle(u.val())
    }
    ,
    u.on("blur", r),
    u.on("keydown", function(t) {
        "return" === idroo.utils.extractShortcut(t) && (r(),
        this.blur(),
        idroo.board.focusInput())
    }),
    $("#undo-button").on("click", function() {
        idroo.history.undo(),
        idroo.board.focusInput()
    }),
    $("#redo-button").on("click", function() {
        idroo.history.redo(),
        idroo.board.focusInput()
    }),
    a.on("click", function() {
        return idroo.board.zoomTo(0, idroo.board.width / 2, idroo.board.height / 2)
    }),
    h.on("click", function() {
        return idroo.board.zoomBy(-.5, idroo.board.width / 2, idroo.board.height / 2)
    }),
    c.on("click", function() {
        return idroo.board.zoomBy(.5, idroo.board.width / 2, idroo.board.height / 2)
    }),
    t.on("click", ".save-and-download", function() {
        return n.fadeIn(),
        idroo.board.save(function() {
            return n.fadeOut(),
            o.fadeIn()
        }),
        !1
    }),
    ui.toolbar = {
        setLevel: function(e) {
            t.attr("class", e),
           // $("#canvas").css("top", t.height()),
            u.attr("disabled", "own" !== e),
            idroo.board.refresh()
        },
        selectTool: function(t) {
            i.filter('[data-name="' + t + '"]').click()
        },
        setTitle: function(t) {
            u.val(t)
        },
        setZoom: function(t) {
            a.attr("data-value", (100 * t).toFixed(0))
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B;
    return B = $("#formula-toolbar"),
    l = function(t) {
        var e;
        return e = $("<div>", {
            "class": "button select-button formula-select",
            text: t
        }),
        e.appendTo(B)
    }
    ,
    c = function(t) {
        var e;
        return e = new DrawFormula(0,0,{
            stroke: !1,
            fill: !1,
            formulaColor: [0, 100, 100]
        }),
        e.insertText(t),
        e.measure(),
        e.rebound(),
        $("<img>", {
            src: e.toDataURL()
        })
    }
    ,
    h = function(t, e) {
        var u, i, o, r, n, s, a;
        return "string" != typeof t && (n = t,
        t = n[0],
        r = n[1],
        i = null != (s = n[2]) ? s : 0),
        (o = t.match(/(.*)\ :\ (.*)/)) ? (t = o[1],
        a = o[2]) : a = t,
        u = $("<div>", {
            "class": "button",
            title: t
        }),
        u.on("click", function() {
            return idroo.board.formulaInsert(t, r, i),
            idroo.board.focusInput()
        }),
        u.append(c(a))
    }
    ,
    d = ["+", "−", "\\times ", "\\cdot ", "\\div ", "\\sdivide ", "\\setminus ", null, "\\pm ", "\\mp ", "\\odot ", "\\ominus ", "\\oplus ", "\\oslash ", "\\otimes ", null, "\\emptyset ", "\\exists ", "\\forall ", "\\inc ", "\\nabla ", "\\partial ", "\\neg ", null, "\\therefore ", "\\because ", "\\ddots ", "\\rddots ", "\\vdots ", "\\cdots ", null, "\\bot ", "\\top ", "\\dashv ", "\\vdash ", "\\models ", "\\mid ", "\\parallel "],
    f = ["\\cap ", "\\cup ", "\\sqcap ", "\\sqcup ", "\\uplus ", "\\vee ", "\\wedge ", "\\mapsto ", null, "\\subset ", "\\superset ", "\\in ", "\\ni ", "\\sqsubseteq ", "\\sqsuperseteq ", "\\subseteq ", "\\superseteq "],
    p = ["=", "\\ne ", "\\approx ", "\\equiv ", "\\cong ", "\\doteq ", "\\simeq ", "\\sim ", "\\asymp ", "\\propto ", null, "<", ">", "\\le ", "\\ge ", "\\ll ", "\\gg ", "\\prec ", "\\succ ", "\\preceq ", "\\succeq "],
    u = ["\\to ", "\\nwarrow ", "\\uparrow ", "\\nearrow ", "\\Uparrow ", "\\Rightarrow ", null, "\\gets ", "\\swarrow ", "\\downarrow ", "\\searrow ", "\\Downarrow ", "\\Leftarrow ", null, "\\hookrightarrow ", "\\rightharpoondown ", "\\rightharpoonup ", "\\leftrightarrow ", "\\updownarrow ", null, "\\hookleftarrow ", "\\leftharpoondown ", "\\leftharpoonup ", "\\Leftrightarrow ", "\\Updownarrow "],
    o = [["\\sum ", -1], ["\\int ", -1], ["\\iint ", -1], ["\\iiint ", -1], ["\\iiiint ", -1], null, ["\\oint ", -1], ["\\oiint ", -1], ["\\oiiint ", -1], ["\\amalg ", -1], ["\\prod ", -1]],
    s = ["\\alpha ", "\\beta ", "\\delta ", "\\gamma ", "\\epsilon ", "\\zeta ", "\\eta ", "\\theta ", null, "\\iota ", "\\kappa ", "\\lambda ", "\\mu ", "\\nu ", "\\xi ", "\\omicron ", "\\pi ", null, "\\rho ", "\\sigma ", "\\tau ", "\\upsilon ", "\\phi ", "\\chi ", "\\psi ", "\\omega ", null, "\\Alpha ", "\\Beta ", "\\Delta ", "\\Gamma ", "\\Epsilon ", "\\Zeta ", "\\Eta ", "\\Theta ", null, "\\Iota ", "\\Kappa ", "\\Lambda ", "\\Mu ", "\\Nu ", "\\Xi ", "\\Omicron ", "\\Pi ", null, "\\Rho ", "\\Sigma ", "\\Tau ", "\\Upsilon ", "\\Phi ", "\\Chi ", "\\Psi ", "\\Omega "],
    e = ["\\A ", "\\B ", "\\C ", "\\D ", "\\E ", "\\F ", "\\G ", null, "\\H ", "\\I ", "\\J ", "\\K ", "\\L ", "\\M ", "\\N ", null, "\\O ", "\\P ", "\\Q ", "\\R ", "\\S ", "\\T ", "\\U ", null, "\\V ", "\\W ", "\\X ", "\\Y ", "\\Z "],
    C = ["\\ast ", "\\circ ", "\\diamond ", "\\star ", "\\bowtie ", "\\infty ", null, "\\euler ", "\\ohm ", "\\ell ", "\\hbar ", "\\imath ", "\\jmath ", null, "\\aleph ", "\\beth ", "\\daleth ", "\\gimel ", "\\Im ", "\\Re ", "\\wp ", null, "\\angle ", "\\degree ", "\\overbar ", "\\prime ", "\\pprime ", "\\ppprime ", null, "\\wr ", "\\atop ", "\\rect ", "\\underbar ", "\\vbar ", "\\Vert "],
    n = [["\\log ", -1], ["\\ln ", -1], ["\\lim ", -1], ["\\min ", -1], ["\\max ", -1], null, ["\\sin ", -1], ["\\cos ", -1], ["\\tan ", -1], ["\\sinh ", -1], ["\\cosh ", -1], ["\\tanh ", -1], null, ["\\csc ", -1], ["\\sec ", -1], ["\\cot ", -1], ["\\csch ", -1], ["\\sech ", -1], ["\\coth ", -1], null, ["\\arcsin ", -1], ["\\arccos ", -1], ["\\arctan ", -1], null, ["\\deg ", -1], ["\\dim ", -1], ["\\gcd ", -1], ["\\Pr ", -1], null, ["\\inf ", -1], ["\\sup ", -1], ["\\liminf ", -1], ["\\limsup ", -1], ["\\ker ", -1]],
    t = ["\\acute  : \\ensp \\acute ", "\\bar  : \\ensp \\bar ", "\\Bar  : \\ensp \\Bar ", "\\breve  : \\ensp \\breve ", "\\check  : \\ensp \\check ", null, "\\ddddot  : \\ensp \\ddddot ", "\\dddot  : \\ensp \\dddot ", "\\ddot  : \\ensp \\ddot ", "\\dot  : \\ensp \\dot ", "\\grave  : \\ensp \\grave ", null, "\\hat  : \\ensp \\hat ", "\\hvec  : \\ensp \\hvec ", "\\tvec  : \\ensp \\tvec ", "\\vec  : \\ensp \\vec ", "\\tilde  : \\ensp \\tilde "],
    r = [["/ : a/b", -2, 1], ["^ : x^...", -2, 1], ["_ : x_...", -2, 1], null, ["\\sqrt  : \\sqrt ...", -1], ["\\above  : x\\above ...", -3, 1], ["\\below  : x\\below ...", -3, 2]],
    i = [["() : (...)", -1], ["{} : {...}", -1], ["[] : [...]", -1], null, ["\\bra \\ket  : \\bra ...\\ket ", -1], ["\\lceil \\rceil  : \\lceil ...\\rceil ", -1], ["\\lfloor \\rfloor  : \\lfloor ...\\rfloor ", -1]],
    a = function(t, e, u) {
        var i, o, r, n, s;
        for (null == u && (u = function(t) {
            return t
        }
        ),
        o = l(t),
        n = $("<div>", {
            "class": "items"
        }),
        r = 0,
        s = e.length; s > r; r++)
            i = e[r],
            null != i ? h(i, u).appendTo(n) : n.append("<br>");
        n.appendTo(o)
    }
    ,
    Fonts.afterLoaded("IDroo Math", function() {
        a("±", d),
        a("≅", p),
        a("∈", f),
        a("↗", u),
        a("²", r),
        a("( )", i),
        a("∑", o),
        a("()", n),
        a("Ψ", s),
        a("ℕ", e),
        a("ℵ", C),
        a(" ̃", t)
    })
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.contextmenu = function() {
    var t, e, u, i;
    return e = $("#context-menu"),
    t = {},
    e.find(".button").each(function() {
        var e;
        e = $(this),
        t[e.data("name")] = e
    }),
    i = $("#context-menu-ordering .button"),
    u = $("#context-menu-locking"),
    e.on("contextmenu", !1),
    e.on("pointerdown", function(t) {
        t.stopPropagation()
    }),
    $(window).on("pointerdown", function() {
        e.removeClass("open")
    }),
    e.on("pointerup", ".button", function(t) {
        switch (idroo.board.focusInput(),
        $(t.target).data("name")) {
        case "group":
            idroo.board.groupSelected();
            break;
        case "ungroup":
            idroo.board.ungroupSelected();
            break;
        case "bringfront":
            idroo.board.bringSelectedToFront();
            break;
        case "sendback":
            idroo.board.sendSelectedToBack();
            break;
        case "moveforward":
            idroo.board.moveSelectedForward();
            break;
        case "movebackward":
            idroo.board.moveSelectedBackward();
            break;
        case "delete":
            idroo.board.deleteSelected();
            break;
        case "lock":
            idroo.board.lockSelected();
            break;
        case "unlock":
            idroo.board.unlockSelected()
        }
        e.removeClass("open")
    }),
    {
        open: function(o, r, n, s) {
            var a, h, c, l, d, p;
            h = n.length > 0,
            i.toggleClass("disabled", !h),
            t["delete"].toggleClass("disabled", !h),
            a = s.length > 1,
            d = n.indexOf("Group") >= 0,
            t.group.toggleClass("disabled", !a),
            t.ungroup.toggleClass("disabled", !d),
            u.toggle(h),
            s.length && (l = idroo.board.objects[s[0]].locked,
            t.lock.toggle(!l),
            t.unlock.toggle(l)),
            e.css({
                left: o,
                top: r
            }),
            e.addClass("open"),
            p = e.outerWidth(),
            c = e.outerHeight(),
            p + o > idroo.window.width() && e.css({
                left: o - p
            }),
            c + r > idroo.window.height() && e.css({
                top: r - c
            })
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.chat = function() {
    var t, e, u, i, o, r, n, s, a;
    return u = $("#chat"),
    e = $('aside .button[data-section="chat"]'),
    r = $("#chat-messages"),
    o = $("#chat-message"),
    i = null,
    a = 0,
    o.on("keydown keyup", function(t) {
        t.stopPropagation()
    }),
    o.on("keypress", function(t) {
        var e;
        return 13 === t.which ? ((e = o.val()) && idroo.board.sendChat(e),
        o.val(""),
        !1) : void 0
    }),
    o.on("focus", function() {
        idroo.board.endTextInput()
    }),
    n = function() {
        r.prop("scrollTop", r.prop("scrollHeight"))
    }
    ,
    s = function(t) {
        null == t && (t = a + 1),
        e.is(".active") && (t = 0),
        e.attr("data-unread-messages", t || ""),
        a = t
    }
    ,
    {
        add: t = function(t) {
            var e, u, o, a;
            o = t,
            a = o.uid,
            u = o.name,
            t = o.message,
            e = $('<div class="message"></div>'),
            i !== a && e.append($('<div class="name"></div>').text(u)),
            e.append($('<div class="text"></div>').text(t)),
            r.append(e),
            i = a,
            n(),
            s()
        }
        ,
        init: function(e) {
            var u, i, o;
            for (u = 0,
            i = e.length; i > u; u++)
                o = e[u],
                t(o);
            s(0)
        },
        open: function(t) {
            n(),
            o.focus(),
            "function" == typeof t && t(),
            s(0)
        },
        blur: function() {
            return o.blur()
        }
    }
}();
var idroo;
idroo = this.idroo = this.idroo || {},
function() {
    var t, e, u, i, o, r;
    return r = idroo.ui = idroo.ui || {},
    t = $("aside"),
    e = t.children("section"),
    u = t.children(".toolbar"),
    u.on("click", ".button[data-section]", function() {
        return o($(this).data("section"))
    }),
    t.on("click", ".close", function() {
        return $(this).closest("section").removeClass("active"),
        u.find(".button.active").removeClass("active")
    }),
    o = function(t) {
        var e, o;
        o = u.find('.button[data-section="' + t + '"]'),
        e = "#" + t,
        o.is(".active") ? (o.removeClass("active"),
        $(e).removeClass("active")) : i(t)
    }
    ,
    r.aside = {
        elem: t,
        openSection: i = function(t, i) {
            var o, n, s;
            s = u.find('.button[data-section="' + t + '"]'),
            n = $("#" + t),
            n.length && (s.addClass("active").siblings().removeClass("active"),
            e.not(n).removeClass("active"),
            n.addClass("active"),
            null != (o = r[t]) && o.open(i))
        }
        ,
        setLevel: function(t) {
            "own" !== t && "edit" !== t && ($("#chat,#guest-info").is(":visible") || (e.removeClass("active"),
            u.find(".button").removeClass("active"))),
            "own" === t && i("sharing")
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u;
    return t = $("#editors"),
    ui.editors = {
        add: e = function(e) {
            u(e.nr),
            t.append($("<div>", {
                "class": "button user-button",
                id: "editor-" + e.nr,
                title: e.name,
                css: {
                    backgroundImage: e.pic ? "url(" + e.pic + ")" : "",
                    borderColor: idroo.utils.editorColor(e.nr)
                }
            }))
        }
        ,
        remove: u = function(t) {
            return $("#editor-" + t).remove()
        }
    }
}();
var idroo, ui, indexOf = [].indexOf || function(t) {
    for (var e = 0, u = this.length; u > e; e++)
        if (e in this && this[e] === t)
            return e;
    return -1
}
;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c;
    return i = $(document),
    h = null,
    r = null,
    t = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i,
    c = function(t) {
        return window.btoa(unescape(encodeURIComponent(t)))
    }
    ,
    e = function(t) {
        return decodeURIComponent(escape(window.atob(t)))
    }
    ,
    n = function(t) {
        return function(e, u) {
            var i, o;
            if (null != (null != t && null != (o = t.clipboardData) ? o.setData : void 0))
                try {
                    t.clipboardData.setData(e, u)
                } catch (n) {
                    i = n,
                    t.clipboardData.setData("text/plain", "idroo:" + e + ":" + c(u))
                }
            else
                r = {
                    type: e,
                    data: u
                }
        }
    }
    ,
    a = function(e) {
        return e.match(t) ? void idroo.board.insertUploadFile(e) : void idroo.board.pasteText(e)
    }
    ,
    s = function(u) {
        var i, o, n, s, h, c, l, d, p, f, C, B, D, A, F, g, m;
        if (null != u ? u.clipboardData : void 0) {
            if (null != u.clipboardData.items) {
                for (B = u.clipboardData.items,
                n = 0,
                d = B.length; d > n; n++)
                    if (s = B[n],
                    "file" === s.kind)
                        return idroo.board.insertUploadFile(s.getAsFile()),
                        !1;
                for (D = u.clipboardData.items,
                h = 0,
                p = D.length; p > h; h++)
                    if (s = D[h],
                    "string" === s.kind) {
                        if ("idroo/objects" === s.type)
                            return s.getAsString(function(t) {
                                return function(t) {
                                    return idroo.board.pasteObjects(AJson.parse(t))
                                }
                            }(this)),
                            !1;
                        if ("idroo/formula" === s.type)
                            return s.getAsString(function(t) {
                                return function(t) {
                                    return idroo.board.pasteFormula(AJson.parse(t))
                                }
                            }(this)),
                            !1
                    }
                for (A = u.clipboardData.items,
                c = 0,
                f = A.length; f > c; c++)
                    if (s = A[c],
                    "string" === s.kind && "text/plain" === s.type)
                        return s.getAsString(function(t) {
                            return function(t) {
                                var u, i, o;
                                if (!(o = t.match(/^idroo:(idroo\/(?:objects|formula)|text\/plain):(.*)$/)))
                                    return a(t);
                                try {
                                    switch (u = e(o[2]),
                                    o[1]) {
                                    case "idroo/objects":
                                        return idroo.board.pasteObjects(AJson.parse(u));
                                    case "idroo/formula":
                                        return idroo.board.pasteFormula(AJson.parse(u));
                                    case "text/plain":
                                        return a(u)
                                    }
                                } catch (r) {
                                    return i = r,
                                    a(t)
                                }
                            }
                        }(this)),
                        !1
            }
            if (null != (F = u.clipboardData.files) ? F.length : void 0) {
                for (g = u.clipboardData.files,
                l = 0,
                C = g.length; C > l; l++)
                    o = g[l],
                    idroo.board.insertUploadFile(s.getAsFile());
                return !1
            }
            return m = u.clipboardData.types,
            indexOf.call(m, "idroo/objects") >= 0 ? idroo.board.pasteObjects(AJson.parse(u.clipboardData.getData("idroo/objects"))) : indexOf.call(m, "idroo/formula") >= 0 ? idroo.board.pasteFormula(AJson.parse(u.clipboardData.getData("idroo/formula"))) : indexOf.call(m, "text/plain") >= 0 && a(u.clipboardData.getData("text/plain")),
            !1
        }
        if (r) {
            switch (i = r.data,
            r.type) {
            case "idroo/objects":
                idroo.board.pasteObjects(AJson.parse(i));
                break;
            case "idroo/formula":
                idroo.board.pasteFormula(AJson.parse(i));
                break;
            case "text/plain":
                a(i)
            }
            return !1
        }
        setTimeout(function() {
            var e, u, i, o, r;
            {
                if (!(i = idroo.board.input.find("img")) || !i.length)
                    return a(idroo.board.input.text()),
                    idroo.board.input.empty();
                for (r = 0,
                o = i.length; o > r; r++)
                    if (u = i[r],
                    u.src.match(t))
                        try {
                            idroo.board.insertUploadFile(u.src)
                        } catch (n) {
                            e = n,
                            console.log(e)
                        } finally {
                            idroo.board.input.empty()
                        }
            }
        }, 20)
    }
    ,
    o = function() {
        i.on("paste.idroo-clipboard", function(t) {
            return s(t.originalEvent)
        }),
        i.on("copy.idroo-clipboard cut.idroo-clipboard", function(t) {
            return idroo.board.copy(n(t.originalEvent), "cut" === t.type)
        }),
        i.on("cut.idroo-clipboard copy.idroo-clipboard paste.idroo-clipboard", ":input", function(t) {
            t.stopPropagation()
        })
    }
    ,
    u = function() {
        i.off(".idroo-clipboard")
    }
    ,
    ui.clipboard = {
        setLevel: function(t) {
            h !== t && ("edit" === t || "own" === t ? o() : u())
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h;
    return s = null,
    r = {
        alt: !1,
        ctrl: !1,
        meta: !1,
        shift: !1
    },
    a = {
        p: "pointer",
        f: "freehand",
        l: "line",
        r: "rectangle",
        c: "ellipse",
        t: "text",
        e: "eraser",
        m: "hand",
        g: "formula"
    },
    o = !1,
    n = "",
    i = function() {
        idroo.window.on("keydown.panning", function(t) {
            return function(t) {
                32 === t.which && (t.preventDefault(),
                o || (o = !0,
                n = idroo.action,
                idroo.action = "pan",
                idroo.board.setCursor()))
            }
        }(this)),
        idroo.window.on("keyup.panning", function(t) {
            return function(t) {
                32 === t.which && o && (t.preventDefault(),
                o = !1,
                idroo.action = n,
                idroo.board.setCursor())
            }
        }(this))
    }
    ,
    e = function() {
        return idroo.window.off(".panning")
    }
    ,
    h = function(t) {
        var e, u, i;
        return e = r.alt !== t.altKey || r.ctrl !== t.ctrlKey || r.meta !== t.metaKey || r.shift !== t.shiftKey,
        e ? (r.alt = t.altKey,
        r.ctrl = t.ctrlKey,
        r.meta = t.metaKey,
        r.shift = t.shiftKey,
        idroo.board.active.isEmpty() || "draw" !== (u = idroo.board.action) && "move" !== u && "scale" !== u || idroo.board.handlePointerMove(),
        "" !== (i = idroo.board.action) && "select" !== i || idroo.board.highlight(),
        !0) : void 0
    }
    ,
    u = function() {
        $("body").on("keydown keyup", ":input:not(.allow-propagation)", function(t) {
            t.stopPropagation()
        }),
        idroo.window.on("keydown.board-editor", function(t) {
            return function(t) {
                var e, u, i, o;
                if (e = idroo.board,
                h(t) && (r.ctrl || r.meta || r.shift) && idroo.board.focusInput(!0),
                16 !== (i = t.which) && 17 !== i && 18 !== i) {
                    if (e.action)
                        return !1;
                    switch (u = r.shift ? 10 : 1,
                    t.which) {
                    case 38:
                        return e.moveSelected(0, -u),
                        !1;
                    case 40:
                        return e.moveSelected(0, u),
                        !1;
                    case 37:
                        return e.moveSelected(-u, 0),
                        !1;
                    case 39:
                        return e.moveSelected(u, 0),
                        !1
                    }
                    switch (o = idroo.utils.extractShortcut(t)) {
                    case "esc":
                        return ui.closeDropdowns() || e.releaseAll(),
                        !1;
                    case "ctrl+a":
                    case "meta+a":
                        return e.selectAll(),
                        !1;
                    case "del":
                    case "backspace":
                        return e.deleteSelected(),
                        !1;
                    case "ctrl+z":
                    case "meta+z":
                        return idroo.history.undo(),
                        !1;
                    case "ctrl+shift+z":
                    case "ctrl+y":
                    case "meta+shift+z":
                    case "meta+y":
                        return idroo.history.redo(),
                        !1;
                    case "ctrl+c":
                    case "ctrl+shift+c":
                    case "ctrl+insert":
                    case "meta+c":
                    case "meta+shift+c":
                    case "meta+insert":
                        return;
                    case "ctrl+x":
                    case "meta+x":
                        return;
                    case "ctrl+v":
                    case "ctrl+shift+v":
                    case "shift+insert":
                    case "meta+v":
                    case "meta+shift+v":
                        return;
                    case "ctrl+g":
                    case "meta+g":
                        return e.groupSelected(),
                        !1;
                    case "ctrl+u":
                    case "meta+u":
                        return e.ungroupSelected(),
                        !1
                    }
                    return !e.textActive && o in a ? (idroo.ui.toolbar.selectTool(a[o]),
                    !1) : void 0
                }
            }
        }(this)),
        idroo.window.on("keyup.board-editor", function(t) {
            return function(t) {
                h(t)
            }
        }(this))
    }
    ,
    t = function() {
        idroo.window.off("keydown.board-editor keyup.board-editor"),
        $("body").off("keydown keyup", ":input:not(.allow-propagation)")
    }
    ,
    ui.keyboard = {
        modifiers: r,
        trackModifiers: h,
        setLevel: function(o) {
            s !== o && ("none" === o ? e() : i(),
            "edit" === o || "own" === o ? u() : t())
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
function() {
    var t, e, u, i, o, r, n, s, a, h, c, l, d, p, f, C, B;
    return o = 300,
    i = 500,
    r = 10,
    e = 800,
    u = 8,
    t = 500,
    n = .2,
    B = 0,
    p = null,
    f = null,
    d = null,
    c = function(t) {
        var e, u, i, o;
        return e = t.offsetX,
        u = t.offsetY,
        null != e && null != u || (o = t.target || t.srcElement,
        i = o.getBoundingClientRect(),
        e = t.clientX - i.left,
        u = t.clientY - i.top),
        {
            offsetX: e,
            offsetY: u
        }
    }
    ,
    l = function(t) {
        return function(e) {
            var u, i, o, r;
            ui.keyboard.trackModifiers(e),
            u = e.originalEvent,
            r = c(u),
            i = r.offsetX,
            o = r.offsetY,
            t(u, i, o, (new Date).getTime())
        }
    }
    ,
    C = function() {
        d = requestAnimationFrame(function() {
            var t;
            t = (new Date).getTime(),
            t - p.time < e ? C() : (d = null,
            idroo.board.contextmenu())
        })
    }
    ,
    h = function() {
        d && (cancelAnimationFrame(d),
        d = null)
    }
    ,
    a = function(t, e, u) {
        return Geometry.distanceFromPoint([t.x, t.y], [e, u])
    }
    ,
    s = function(t, e) {
        return Geometry.distanceFromPoint([t.x, t.y], [e.x, e.y])
    }
    ,
    ui.pointer = {
        fetchOffset: c,
        init: function(e) {
            var c, D, A, F, g, m, y;
            c = e[0],
            g = [],
            A = null,
            m = 0,
            y = !1,
            D = function() {
                return {
                    x: (g[0].x + g[1].x) / 2,
                    y: (g[0].y + g[1].y) / 2,
                    distance: s(g[0], g[1])
                }
            }
            ,
            F = function(t) {
                var e, u, i, o;
                for (e = u = 0,
                i = g.length; i > u; e = ++u)
                    if (o = g[e],
                    o.pointerId === t.pointerId)
                        return g[e] = t,
                        t.preventDefault(),
                        !0;
                return !1
            }
            ,
            e.on({
                pointerdown: l(function(e, u, i, o) {
                    switch (e.preventDefault(),
                    c.setPointerCapture(e.pointerId),
                    idroo.ui.chat.blur(),
                    g.push(e),
                    g.length > 1 && h(),
                    g.length) {
                    case 1:
                        0 === e.button && idroo.board.pointerDown(u, i),
                        "touch" === e.pointerType && C();
                        break;
                    case 2:
                        idroo.board.pointerUp(),
                        idroo.board.releaseAll(),
                        idroo.board.highlightOff(),
                        p && o - p.time < t && (idroo.history.undoAfter(p.time),
                        A = {},
                        A.start = A.last = D(),
                        m = 0,
                        y = !1)
                    }
                    p = {
                        x: u,
                        y: i,
                        time: o
                    }
                }),
                pointermove: l(function(t, e, i) {
                    var o, r, s;
                    if (!g.length)
                        return void idroo.board.pointerMove(e, i);
                    if (F(t))
                        switch (g.length) {
                        case 1:
                            4 === t.buttons ? idroo.board.panTo(e, i) : idroo.board.pointerMove(e, i),
                            d && a(p, e, i) > u && h();
                            break;
                        case 2:
                            A && (o = D(),
                            r = {
                                x: o.x - A.last.x,
                                y: o.y - A.last.y
                            },
                            idroo.board.panBy(r.x, r.y),
                            s = Math.log(A.last.distance / o.distance) / Math.log(2),
                            y ? idroo.board.zoomBy(s, o.x, o.y) : (m += s,
                            t.pointerId === g[1].pointerId && Math.abs(m) > n && Math.abs(o.distance - A.last.distance) > Geometry.v2Length([r.x, r.y]) && (idroo.board.zoomBy(m, o.x, o.y),
                            y = !0)),
                            A.last = o)
                        }
                }),
                pointerup: l(function(t, e, u, n) {
                    if (F(t)) {
                        switch (g.length) {
                        case 1:
                            idroo.board.pointerUp(),
                            h(),
                            a(p, e, u) < r && n - p.time < o ? (f && a(f, e, u) < r && n - f.time < i ? (B++,
                            2 === B && idroo.board.pointerDblAction(e, u)) : B = 1,
                            f = {
                                x: e,
                                y: u,
                                time: n
                            }) : (B = 0,
                            f = null);
                            break;
                        case 2:
                            A = null
                        }
                        g.length = 0
                    }
                }),
                pointercancel: function(t) {
                    F(t) && (h(),
                    g.length = 0,
                    p = f = null,
                    B = 0,
                    A = null)
                }
            })
        }
    }
}(),
function() {
    var t, e;
    return e = 0,
    t = $("body"),
    t.on("dragenter", function(u) {
        e || t.addClass("dragging"),
        e++
    }),
    t.on("dragleave", function(u) {
        e--,
        e || t.removeClass("dragging")
    }),
    t.on("drop dragend", function(u) {
        u.preventDefault(),
        e = 0,
        t.removeClass("dragging")
    })
}();
var ConvCall, ConvPeerConnection, idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ConvPeerConnection = function() {
    function t(t) {
        this.nr = t,
        this.pc = new RTCPeerConnection(i,e),
        this.pc.onicecandidate = function(t) {
            return function(e) {
                console.log("PC icecandidate"),
                e.candidate && idroo.board.socket.emit("phone", "ice", t.nr, e.candidate)
            }
        }(this),
        this.pc.onaddstream = function(t) {
            return function(e) {
                console.log("PC addstream"),
                t.audio = new Audio,
                t.audio.srcObject = e.stream,
                t.audio.play()
            }
        }(this),
        this.pc.onnegotiationneeded = function(t) {
            return function() {
                return console.log("PC negotiationneeded"),
                t.createOffer()
            }
        }(this)
    }
    var e, u, i;
    return i = {
        iceServers: [{
            url: "stun:stun.l.google.com:19302"
        }, {
            url: "stun:stun.services.mozilla.com"
        }]
    },
    e = {
        optional: []
    },
    u = function(t) {
        return t.sdp = t.sdp.replace("UDP/TLS/RTP/SAVPF", "RTP/SAVPF"),
        t
    }
    ,
    t.prototype.nr = null,
    t.prototype.pc = null,
    t.prototype.audio = null,
    t.prototype.offerer = null,
    t.prototype.close = function() {
        this.pc.close(),
        this.pc.onicecandidate = null,
        this.pc.onaddstream = null,
        this.pc.onnegotiationneeded = null,
        this.pc = null,
        this.audio && (this.audio.pause(),
        this.audio.srcObject = null,
        this.audio = null)
    }
    ,
    t.prototype.createOffer = function() {
        return console.log("PC.createOffer"),
        this.offerer === !1 ? (console.log("PS asking offerer for an offer"),
        void idroo.board.socket.emit("phone", "refresh", this.nr)) : (this.offerer = !0,
        "stable" !== this.pc.signalingState ? void console.log("createOffer NOT STABLE, ABORT!") : void this.pc.createOffer().then(function(t) {
            return function(e) {
                return console.log("PC ... offer created"),
                e = u(e),
                t.pc.setLocalDescription(e),
                idroo.board.socket.emit("phone", "offer", t.nr, e)
            }
        }(this))["catch"](function(t) {
            return console.log(t.toString())
        }))
    }
    ,
    t.prototype.createAnswer = function(t) {
        return console.log("PC.createAnswer"),
        this.offerer !== !0 ? (this.offerer = !1,
        "stable" !== this.pc.signalingState ? void console.log("createAnswer NOT STABLE, ABORT!") : void this.pc.setRemoteDescription(t).then(function(t) {
            return function() {
                return t.pc.createAnswer()
            }
        }(this)).then(function(t) {
            return function(e) {
                return console.log("PC ... answer created"),
                e = u(e),
                t.pc.setLocalDescription(e),
                idroo.board.socket.emit("phone", "answer", t.nr, e)
            }
        }(this))["catch"](function(t) {
            return console.log(t.toString())
        })) : void 0
    }
    ,
    t.prototype.gotAnswer = function(t) {
        console.log("PC.gotAnswer"),
        this.pc.setRemoteDescription(t)
    }
    ,
    t.prototype.addIceCandidate = function(t) {
        var e;
        console.log("PC.addIceCandidate"),
        e = this.pc.addIceCandidate(new RTCIceCandidate(t)),
        e && e["catch"](function(t) {
            return console.log(t)
        })
    }
    ,
    t.prototype.addStream = function(t) {
        console.log("PC.addStream"),
        this.pc.addStream(t)
    }
    ,
    t.prototype.setMute = function(t) {
        this.audio.muted = t
    }
    ,
    t
}(),
ConvCall = function() {
    function t() {
        this.pcs = {}
    }
    return t.prototype.pcs = null,
    t.prototype.stream = null,
    t.prototype.onStart = null,
    t.prototype.onEnd = null,
    t.prototype.start = function() {
        this.getMediaStream()
    }
    ,
    t.prototype.getMediaStream = function() {
        return "function" == typeof this.onStart && this.onStart(),
        navigator.mediaDevices.getUserMedia({
            audio: !0,
            video: !1
        }).then(function(t) {
            return function(e) {
                return t.setLocalStream(e),
                "function" == typeof cb ? cb() : void 0
            }
        }(this))["catch"](function(t) {
            return function(e) {
                return console.log(e),
                alert("Could not start call"),
                t.hangup()
            }
        }(this))
    }
    ,
    t.prototype.setLocalStream = function(t) {
        var e, u, i, o;
        this.stream = t,
        t.addEventListener("ended", function(t) {
            return function(e) {
                return console.log(e),
                t.stream = null,
                t.hangup()
            }
        }(this)),
        i = this.pcs,
        o = [];
        for (e in i)
            u = i[e],
            o.push(u.addStream(t));
        return o
    }
    ,
    t.prototype.add = function(t) {
        var e;
        t in this.pcs || (this.pcs[t] = e = new ConvPeerConnection(t),
        this.stream && e.addStream(this.stream))
    }
    ,
    t.prototype.offerHandler = function(t, e) {
        this.stream || this.getMediaStream(),
        this.add(t),
        this.pcs[t].createAnswer(e)
    }
    ,
    t.prototype.answerHandler = function(t, e) {
        this.pcs[t].gotAnswer(e)
    }
    ,
    t.prototype.iceHandler = function(t, e) {
        this.add(t),
        this.pcs[t].addIceCandidate(e)
    }
    ,
    t.prototype.hangupHandler = function(t) {
        t ? (t in this.pcs && (this.pcs[t].close(),
        delete this.pcs[t]),
        0 === Object.keys(this.pcs).length && this.hangup()) : this.hangup()
    }
    ,
    t.prototype.refreshHandler = function(t) {
        t && t in this.pcs && this.pcs[t].createOffer()
    }
    ,
    t.prototype.openHandler = function() {}
    ,
    t.prototype.hangup = function() {
        var t, e, u;
        u = this.pcs;
        for (t in u)
            e = u[t],
            e.close(),
            delete this.pcs[t];
        this.pcs = {},
        this.stream && (this.stream.getTracks().forEach(function(t) {
            return function() {
                return function(t) {
                    return t.stop()
                }
            }
        }(this)),
        this.stream = null),
        "function" == typeof this.onEnd && this.onEnd()
    }
    ,
    t.prototype.setMute = function(t) {
        var e, u, i;
        i = this.pcs;
        for (e in i)
            u = i[e],
            u.setMute(t)
    }
    ,
    t
}(),
ui.phone = function() {
    var t, e, u, i, o, r, n, s, a, h;
    return h = {},
    u = new ConvCall,
    s = $("#phone"),
    e = $("#phone-call"),
    o = $("#phone-hangup"),
    r = $("#phone-info"),
    n = $("#phone-info-box"),
    r.on("click", function() {
        return ga("send", "event", "Phone", "show-prompt", n.fadeIn())
    }),
    e.on("click", function() {
        return ga("send", "event", "Phone", "call", t())
    }),
    o.on("click", function() {
        return ga("send", "event", "Phone", "hangup", i())
    }),
    n.on("click", ".get-premium", function() {
        return ga("send", "event", "Phone", "get-premium"),
        thanksFree.hide()
    }),
    u.onStart = function() {
        o.removeClass("disabled").siblings().addClass("disabled")
    }
    ,
    u.onEnd = function() {
        e.removeClass("disabled").siblings().addClass("disabled")
    }
    ,
    a = function() {
        Object.keys(h).length > 1 ? s.show() : s.hide()
    }
    ,
    t = function() {
        var t, e, i, o;
        if (console.log("Calling..."),
        "chrome" !== (i = adapter.browserDetails.browser) && "opera" !== i && "firefox" !== i && "safari" !== i)
            return void alert("Your browser is not supported at the moment");
        o = idroo.board.editors;
        for (e in o)
            t = o[e],
            t.nr !== idroo.board.editorNr && u.add(t.nr);
        u.start()
    }
    ,
    i = function() {
        u.hangup(),
        idroo.board.socket.emit("phone", "hangup")
    }
    ,
    {
        handleMessage: function(t, i, o) {
            if ("ice" === t || "offer" === t || "answer" === t || "hangup" === t || "refresh" === t)
                return u[t + "Handler"](i, o);
            switch (t) {
            case "open":
                return void e.removeClass("disabled").siblings().addClass("disabled")
            }
        },
        addUser: function(t) {
            h[t.nr] = 1,
            a()
        },
        removeUser: function(t) {
            delete h[t.nr],
            a()
        },
        mute: function() {
            return u.setMute(!0)
        },
        play: function() {
            return u.setMute(!1)
        },
        setLevel: function(t) {
            return s.toggleClass("disabled", "own" !== t && "edit" !== t)
        }
    }
}();
var idroo, ui;
idroo = this.idroo = this.idroo || {},
ui = idroo.ui = idroo.ui || {},
ui.premiumPrompt = function() {
    var t, e, u;
    return t = 3e5,
    u = $("#thanks-free"),
    u.on("click", ".get-premium", function() {
        return ga("send", "event", "PremiumPrompt", "get-premium"),
        u.hide()
    }),
    u.on("click", ".close", function() {
        return ga("send", "event", "PremiumPrompt", "close")
    }),
    e = function() {
        u.fadeIn(),
        ga("send", "event", "PremiumPrompt", "show", {
            nonInteraction: !0
        })
    }
    ,
    {
        delayShow: function() {
            return setTimeout(e, t)
        }
    }
}();
var boardName;
boardName = "tV4Q8UGG9P",
// location.pathname.match(/board-([^\/]+)$/)[1],
idroo.board = new Board(boardName,"#canvas"),
idroo.window.resize(function() {
    return idroo.board.refresh()
});
