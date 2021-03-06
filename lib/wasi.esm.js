/*
 *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*****************************************************************************/

define(function(require, exports, module) {
  function aa(a, b) {
    aa = Object.setPrototypeOf ||
        {__proto__: []} instanceof Array && function(a, b) {
          a.__proto__ = b
        } || function(a, b) {
          for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
        };
    return aa(a, b)
  }
  function ba(a, b) {
    function c() {
      this.constructor = a
    }
    aa(a, b);
    a.prototype =
        null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
  }
  function ca(a) {
    var b = 'function' === typeof Symbol && a[Symbol.iterator], c = 0;
    return b ? b.call(a) : {
      next: function() {
        a && c >= a.length && (a = void 0);
        return {
          value: a && a[c++], done: !a
        }
      }
    }
  }
  function da(a, b) {
    var c = 'function' === typeof Symbol && a[Symbol.iterator];
    if (!c) return a;
    a = c.call(a);
    var d, e = [];
    try {
      for (; (void 0 === b || 0 < b--) && !(d = a.next()).done;) e.push(d.value)
    } catch (g) {
      var f = { error: g }
    } finally {
      try {
        d && !d.done && (c = a['return']) && c.call(a)
      } finally {
        if (f) throw f.error;
      }
    }
    return e
  }
  function ea() {
    for (var a = [], b = 0; b < arguments.length; b++)
      a = a.concat(da(arguments[b]));
    return a
  }
  var fa = 'undefined' !== typeof globalThis ?
      globalThis :
      'undefined' !== typeof global ? global : {},
      k = 'undefined' !== typeof BigInt ? BigInt : fa.BigInt || Number,
      ha = DataView;
  ha.prototype.setBigUint64 ||
      (ha.prototype.setBigUint64 =
           function(a, b, c) {
             if (b < Math.pow(2, 32))
               var d = 0;
             else {
               d = b.toString(2);
               b = '';
               for (var e = 0; e < 64 - d.length; e++) b += '0';
               b += d;
               d = parseInt(b.substring(0, 32), 2);
               b = parseInt(b.substring(32), 2)
             }
             this.setUint32(a + (c ? 0 : 4), b, c);
             this.setUint32(a + (c ? 4 : 0), d, c)
           },
       ha.prototype.getBigUint64 =
           function(a, b) {
             var c = this.getUint32(a + (b ? 0 : 4), b);
             a = this.getUint32(a + (b ? 4 : 0), b);
             c = c.toString(2);
             a = a.toString(2);
             b = '';
             for (var d = 0; d < 32 - c.length; d++) b += '0';
             return k('0b' + a + (b + c))
           });
  var l = 'undefined' !== typeof global ?
      global :
      'undefined' !== typeof self ? self :
                                    'undefined' !== typeof window ? window : {},
      p = [], u = [],
      ia = 'undefined' !== typeof Uint8Array ? Uint8Array : Array, ja = !1;
  function ka() {
    ja = !0;
    for (var a = 0; 64 > a; ++a)
      p[a] =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[a],
      u['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
            .charCodeAt(a)] = a;
    u[45] = 62;
    u[95] = 63
  }
  function ma(a, b, c) {
    for (var d = [], e = b; e < c; e += 3)
      b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2],
      d.push(p[b >> 18 & 63] + p[b >> 12 & 63] + p[b >> 6 & 63] + p[b & 63]);
    return d.join('')
  }
  function na(a) {
    ja || ka();
    for (var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c; f < g;
         f += 16383)
      e.push(ma(a, f, f + 16383 > g ? g : f + 16383));
    1 === c ? (a = a[b - 1], d += p[a >> 2], d += p[a << 4 & 63], d += '==') :
              2 === c &&
            (a = (a[b - 2] << 8) + a[b - 1], d += p[a >> 10],
             d += p[a >> 4 & 63], d += p[a << 2 & 63], d += '=');
    e.push(d);
    return e.join('')
  }
  function oa(a, b, c, d, e) {
    var f = 8 * e - d - 1;
    var g = (1 << f) - 1, h = g >> 1, n = -7;
    e = c ? e - 1 : 0;
    var m = c ? -1 : 1, r = a[b + e];
    e += m;
    c = r & (1 << -n) - 1;
    r >>= -n;
    for (n += f; 0 < n; c = 256 * c + a[b + e], e += m, n -= 8)
      ;
    f = c & (1 << -n) - 1;
    c >>= -n;
    for (n += d; 0 < n; f = 256 * f + a[b + e], e += m, n -= 8)
      ;
    if (0 === c)
      c = 1 - h;
    else {
      if (c === g) return f ? NaN : Infinity * (r ? -1 : 1);
      f += Math.pow(2, d);
      c -= h
    }
    return (r ? -1 : 1) * f * Math.pow(2, c - d)
  }
  function pa(a, b, c, d, e, f) {
    var g, h = 8 * f - e - 1, n = (1 << h) - 1, m = n >> 1,
           r = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    f = d ? 0 : f - 1;
    var q = d ? 1 : -1, x = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
    b = Math.abs(b);
    isNaN(b) || Infinity === b ?
        (b = isNaN(b) ? 1 : 0, d = n) :
        (d = Math.floor(Math.log(b) / Math.LN2),
         1 > b * (g = Math.pow(2, -d)) && (d--, g *= 2),
         b = 1 <= d + m ? b + r / g : b + r * Math.pow(2, 1 - m),
         2 <= b * g && (d++, g /= 2),
         d + m >= n ?
             (b = 0, d = n) :
             1 <= d + m ? (b = (b * g - 1) * Math.pow(2, e), d += m) :
                          (b = b * Math.pow(2, m - 1) * Math.pow(2, e), d = 0));
    for (; 8 <= e; a[c + f] = b & 255, f += q, b /= 256, e -= 8)
      ;
    d = d << e | b;
    for (h += e; 0 < h; a[c + f] = d & 255, f += q, d /= 256, h -= 8)
      ;
    a[c + f - q] |= 128 * x
  }
  var qa = {}.toString, ra = Array.isArray || function(a) {
    return '[object Array]' == qa.call(a)
  };
  w.TYPED_ARRAY_SUPPORT =
      void 0 !== l.TYPED_ARRAY_SUPPORT ? l.TYPED_ARRAY_SUPPORT : !0;
  function y(a, b) {
    if ((w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
      throw new RangeError('Invalid typed array length');
    w.TYPED_ARRAY_SUPPORT ? (a = new Uint8Array(b), a.__proto__ = w.prototype) :
                            (null === a && (a = new w(b)), a.length = b);
    return a
  }
  function w(a, b, c) {
    if (!(w.TYPED_ARRAY_SUPPORT || this instanceof w)) return new w(a, b, c);
    if ('number' === typeof a) {
      if ('string' === typeof b)
        throw Error(
            'If encoding is specified then the first argument must be a string');
      return sa(this, a)
    }
    return ta(this, a, b, c)
  }
  w.poolSize = 8192;
  w._augment = function(a) {
    a.__proto__ = w.prototype;
    return a
  };
  function ta(a, b, c, d) {
    if ('number' === typeof b)
      throw new TypeError('"value" argument must not be a number');
    if ('undefined' !== typeof ArrayBuffer && b instanceof ArrayBuffer) {
      b.byteLength;
      if (0 > c || b.byteLength < c)
        throw new RangeError('\'offset\' is out of bounds');
      if (b.byteLength < c + (d || 0))
        throw new RangeError('\'length\' is out of bounds');
      b = void 0 === c && void 0 === d ?
          new Uint8Array(b) :
          void 0 === d ? new Uint8Array(b, c) : new Uint8Array(b, c, d);
      w.TYPED_ARRAY_SUPPORT ? (a = b, a.__proto__ = w.prototype) : a = ua(a, b);
      return a
    }
    if ('string' === typeof b) {
      d = a;
      a = c;
      if ('string' !== typeof a || '' === a) a = 'utf8';
      if (!w.isEncoding(a))
        throw new TypeError('"encoding" must be a valid string encoding');
      c = va(b, a) | 0;
      d = y(d, c);
      b = d.write(b, a);
      b !== c && (d = d.slice(0, b));
      return d
    }
    return wa(a, b)
  }
  w.from = function(a, b, c) {
    return ta(null, a, b, c)
  };
  w.TYPED_ARRAY_SUPPORT &&
      (w.prototype.__proto__ = Uint8Array.prototype, w.__proto__ = Uint8Array);
  function xa(a) {
    if ('number' !== typeof a)
      throw new TypeError('"size" argument must be a number');
    if (0 > a) throw new RangeError('"size" argument must not be negative');
  }
  w.alloc = function(a, b, c) {
    xa(a);
    a = 0 >= a ? y(null, a) :
                 void 0 !== b ? 'string' === typeof c ? y(null, a).fill(b, c) :
                                                        y(null, a).fill(b) :
                                y(null, a);
    return a
  };
  function sa(a, b) {
    xa(b);
    a = y(a, 0 > b ? 0 : ya(b) | 0);
    if (!w.TYPED_ARRAY_SUPPORT)
      for (var c = 0; c < b; ++c) a[c] = 0;
    return a
  }
  w.allocUnsafe = function(a) {
    return sa(null, a)
  };
  w.allocUnsafeSlow = function(a) {
    return sa(null, a)
  };
  function ua(a, b) {
    var c = 0 > b.length ? 0 : ya(b.length) | 0;
    a = y(a, c);
    for (var d = 0; d < c; d += 1) a[d] = b[d] & 255;
    return a
  }
  function wa(a, b) {
    if (z(b)) {
      var c = ya(b.length) | 0;
      a = y(a, c);
      if (0 === a.length) return a;
      b.copy(a, 0, 0, c);
      return a
    }
    if (b) {
      if ('undefined' !== typeof ArrayBuffer &&
              b.buffer instanceof ArrayBuffer ||
          'length' in b)
        return (c = 'number' !== typeof b.length) ||
                   (c = b.length, c = c !== c),
               c ? y(a, 0) : ua(a, b);
      if ('Buffer' === b.type && ra(b.data)) return ua(a, b.data)
    }
    throw new TypeError(
        'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
  }
  function ya(a) {
    if (a >= (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
      throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' +
          (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
          ' bytes');
    return a | 0
  }
  w.isBuffer = za;
  function z(a) {
    return !(null == a || !a._isBuffer)
  }
  w.compare = function(a, b) {
    if (!z(a) || !z(b)) throw new TypeError('Arguments must be Buffers');
    if (a === b) return 0;
    for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
      if (a[e] !== b[e]) {
        c = a[e];
        d = b[e];
        break
      }
    return c < d ? -1 : d < c ? 1 : 0
  };
  w.isEncoding = function(a) {
    switch (String(a).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return !0;
      default:
        return !1
    }
  };
  w.concat = function(a, b) {
    if (!ra(a))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === a.length) return w.alloc(0);
    var c;
    if (void 0 === b)
      for (c = b = 0; c < a.length; ++c) b += a[c].length;
    b = w.allocUnsafe(b);
    var d = 0;
    for (c = 0; c < a.length; ++c) {
      var e = a[c];
      if (!z(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      e.copy(b, d);
      d += e.length
    }
    return b
  };
  function va(a, b) {
    if (z(a)) return a.length;
    if ('undefined' !== typeof ArrayBuffer &&
        'function' === typeof ArrayBuffer.isView &&
        (ArrayBuffer.isView(a) || a instanceof ArrayBuffer))
      return a.byteLength;
    'string' !== typeof a && (a = '' + a);
    var c = a.length;
    if (0 === c) return 0;
    for (var d = !1;;) switch (b) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return c;
        case 'utf8':
        case 'utf-8':
        case void 0:
          return Aa(a).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * c;
        case 'hex':
          return c >>> 1;
        case 'base64':
          return Ba(a).length;
        default:
          if (d) return Aa(a).length;
          b = ('' + b).toLowerCase();
          d = !0
      }
  }
  w.byteLength = va;
  function Ca(a, b, c) {
    var d = !1;
    if (void 0 === b || 0 > b) b = 0;
    if (b > this.length) return '';
    if (void 0 === c || c > this.length) c = this.length;
    if (0 >= c) return '';
    c >>>= 0;
    b >>>= 0;
    if (c <= b) return '';
    for (a || (a = 'utf8');;) switch (a) {
        case 'hex':
          a = b;
          b = c;
          c = this.length;
          if (!a || 0 > a) a = 0;
          if (!b || 0 > b || b > c) b = c;
          d = '';
          for (c = a; c < b; ++c)
            a = d, d = this[c],
            d = 16 > d ? '0' + d.toString(16) : d.toString(16), d = a + d;
          return d;
        case 'utf8':
        case 'utf-8':
          return Da(this, b, c);
        case 'ascii':
          a = '';
          for (c = Math.min(this.length, c); b < c; ++b)
            a += String.fromCharCode(this[b] & 127);
          return a;
        case 'latin1':
        case 'binary':
          a = '';
          for (c = Math.min(this.length, c); b < c; ++b)
            a += String.fromCharCode(this[b]);
          return a;
        case 'base64':
          return b = 0 === b && c === this.length ? na(this) :
                                                    na(this.slice(b, c)),
                 b;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          b = this.slice(b, c);
          c = '';
          for (a = 0; a < b.length; a += 2)
            c += String.fromCharCode(b[a] + 256 * b[a + 1]);
          return c;
        default:
          if (d) throw new TypeError('Unknown encoding: ' + a);
          a = (a + '').toLowerCase();
          d = !0
      }
  }
  w.prototype._isBuffer = !0;
  function A(a, b, c) {
    var d = a[b];
    a[b] = a[c];
    a[c] = d
  }
  w.prototype.swap16 = function() {
    var a = this.length;
    if (0 !== a % 2)
      throw new RangeError('Buffer size must be a multiple of 16-bits');
    for (var b = 0; b < a; b += 2) A(this, b, b + 1);
    return this
  };
  w.prototype.swap32 = function() {
    var a = this.length;
    if (0 !== a % 4)
      throw new RangeError('Buffer size must be a multiple of 32-bits');
    for (var b = 0; b < a; b += 4) A(this, b, b + 3), A(this, b + 1, b + 2);
    return this
  };
  w.prototype.swap64 = function() {
    var a = this.length;
    if (0 !== a % 8)
      throw new RangeError('Buffer size must be a multiple of 64-bits');
    for (var b = 0; b < a; b += 8)
      A(this, b, b + 7), A(this, b + 1, b + 6), A(this, b + 2, b + 5),
          A(this, b + 3, b + 4);
    return this
  };
  w.prototype.toString = function() {
    var a = this.length | 0;
    return 0 === a ?
        '' :
        0 === arguments.length ? Da(this, 0, a) : Ca.apply(this, arguments)
  };
  w.prototype.equals = function(a) {
    if (!z(a)) throw new TypeError('Argument must be a Buffer');
    return this === a ? !0 : 0 === w.compare(this, a)
  };
  w.prototype.inspect = function() {
    var a = '';
    0 < this.length &&
        (a = this.toString('hex', 0, 50).match(/.{2}/g).join(' '),
         50 < this.length && (a += ' ... '));
    return '<Buffer ' + a + '>'
  };
  w.prototype.compare = function(a, b, c, d, e) {
    if (!z(a)) throw new TypeError('Argument must be a Buffer');
    void 0 === b && (b = 0);
    void 0 === c && (c = a ? a.length : 0);
    void 0 === d && (d = 0);
    void 0 === e && (e = this.length);
    if (0 > b || c > a.length || 0 > d || e > this.length)
      throw new RangeError('out of range index');
    if (d >= e && b >= c) return 0;
    if (d >= e) return -1;
    if (b >= c) return 1;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    e >>>= 0;
    if (this === a) return 0;
    var f = e - d, g = c - b, h = Math.min(f, g);
    d = this.slice(d, e);
    a = a.slice(b, c);
    for (b = 0; b < h; ++b)
      if (d[b] !== a[b]) {
        f = d[b];
        g = a[b];
        break
      }
    return f < g ? -1 : g < f ? 1 : 0
  };
  function Fa(a, b, c, d, e) {
    if (0 === a.length) return -1;
    'string' === typeof c ?
        (d = c, c = 0) :
        2147483647 < c ? c = 2147483647 : -2147483648 > c && (c = -2147483648);
    c = +c;
    isNaN(c) && (c = e ? 0 : a.length - 1);
    0 > c && (c = a.length + c);
    if (c >= a.length) {
      if (e) return -1;
      c = a.length - 1
    } else if (0 > c)
      if (e)
        c = 0;
      else
        return -1;
    'string' === typeof b && (b = w.from(b, d));
    if (z(b)) return 0 === b.length ? -1 : Ga(a, b, c, d, e);
    if ('number' === typeof b)
      return b &= 255,
             w.TYPED_ARRAY_SUPPORT &&
                     'function' === typeof Uint8Array.prototype.indexOf ?
                 e ? Uint8Array.prototype.indexOf.call(a, b, c) :
                     Uint8Array.prototype.lastIndexOf.call(a, b, c) :
                 Ga(a, [b], c, d, e);
    throw new TypeError('val must be string, number or Buffer');
  }
  function Ga(a, b, c, d, e) {
    function f(a, b) {
      return 1 === g ? a[b] : a.readUInt16BE(b * g)
    }
    var g = 1, h = a.length, n = b.length;
    if (void 0 !== d &&
        (d = String(d).toLowerCase(),
         'ucs2' === d || 'ucs-2' === d || 'utf16le' === d ||
             'utf-16le' === d)) {
      if (2 > a.length || 2 > b.length) return -1;
      g = 2;
      h /= 2;
      n /= 2;
      c /= 2
    }
    if (e)
      for (d = -1; c < h; c++)
        if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
          if (-1 === d && (d = c), c - d + 1 === n) return d * g
        } else
          -1 !== d && (c -= c - d), d = -1;
    else
      for (c + n > h && (c = h - n); 0 <= c; c--) {
        h = !0;
        for (d = 0; d < n; d++)
          if (f(a, c + d) !== f(b, d)) {
            h = !1;
            break
          }
        if (h) return c
      }
    return -1
  }
  w.prototype.includes = function(a, b, c) {
    return -1 !== this.indexOf(a, b, c)
  };
  w.prototype.indexOf = function(a, b, c) {
    return Fa(this, a, b, c, !0)
  };
  w.prototype.lastIndexOf = function(a, b, c) {
    return Fa(this, a, b, c, !1)
  };
  w.prototype.write = function(a, b, c, d) {
    if (void 0 === b)
      d = 'utf8', c = this.length, b = 0;
    else if (void 0 === c && 'string' === typeof b)
      d = b, c = this.length, b = 0;
    else if (isFinite(b))
      b |= 0,
          isFinite(c) ? (c |= 0, void 0 === d && (d = 'utf8')) :
                        (d = c, c = void 0);
    else
      throw Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported');
    var e = this.length - b;
    if (void 0 === c || c > e) c = e;
    if (0 < a.length && (0 > c || 0 > b) || b > this.length)
      throw new RangeError('Attempt to write outside buffer bounds');
    d || (d = 'utf8');
    for (e = !1;;) switch (d) {
        case 'hex':
          a: {
            b = Number(b) || 0; d = this.length - b;
            c ? (c = Number(c), c > d && (c = d)) : c = d;
            d = a.length;
            if (0 !== d % 2) throw new TypeError('Invalid hex string');
            c > d / 2 && (c = d / 2);
            for (d = 0; d < c; ++d) {
              e = parseInt(a.substr(2 * d, 2), 16);
              if (isNaN(e)) {
                a = d;
                break a
              }
              this[b + d] = e
            } a = d
          } return a;
        case 'utf8':
        case 'utf-8':
          return Ha(Aa(a, this.length - b), this, b, c);
        case 'ascii':
          return Ha(Ia(a), this, b, c);
        case 'latin1':
        case 'binary':
          return Ha(Ia(a), this, b, c);
        case 'base64':
          return Ha(Ba(a), this, b, c);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          d = a;
          e = this.length - b;
          for (var f = [], g = 0; g < d.length && !(0 > (e -= 2)); ++g) {
            var h = d.charCodeAt(g);
            a = h >> 8;
            h %= 256;
            f.push(h);
            f.push(a)
          }
          return Ha(f, this, b, c);
        default:
          if (e) throw new TypeError('Unknown encoding: ' + d);
          d = ('' + d).toLowerCase();
          e = !0
      }
  };
  w.prototype.toJSON = function() {
    return {
      type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };
  function Da(a, b, c) {
    c = Math.min(a.length, c);
    for (var d = []; b < c;) {
      var e = a[b], f = null, g = 239 < e ? 4 : 223 < e ? 3 : 191 < e ? 2 : 1;
      if (b + g <= c) switch (g) {
          case 1:
            128 > e && (f = e);
            break;
          case 2:
            var h = a[b + 1];
            128 === (h & 192) &&
                (e = (e & 31) << 6 | h & 63, 127 < e && (f = e));
            break;
          case 3:
            h = a[b + 1];
            var n = a[b + 2];
            128 === (h & 192) && 128 === (n & 192) &&
                (e = (e & 15) << 12 | (h & 63) << 6 | n & 63,
                 2047 < e && (55296 > e || 57343 < e) && (f = e));
            break;
          case 4:
            h = a[b + 1];
            n = a[b + 2];
            var m = a[b + 3];
            128 === (h & 192) && 128 === (n & 192) && 128 === (m & 192) &&
                (e = (e & 15) << 18 | (h & 63) << 12 | (n & 63) << 6 | m & 63,
                 65535 < e && 1114112 > e && (f = e))
        }
      null === f ? (f = 65533, g = 1) :
                   65535 < f &&
              (f -= 65536, d.push(f >>> 10 & 1023 | 55296),
               f = 56320 | f & 1023);
      d.push(f);
      b += g
    }
    a = d.length;
    if (a <= Ja)
      d = String.fromCharCode.apply(String, d);
    else {
      c = '';
      for (b = 0; b < a;)
        c += String.fromCharCode.apply(String, d.slice(b, b += Ja));
      d = c
    }
    return d
  }
  var Ja = 4096;
  w.prototype.slice = function(a, b) {
    var c = this.length;
    a = ~~a;
    b = void 0 === b ? c : ~~b;
    0 > a ? (a += c, 0 > a && (a = 0)) : a > c && (a = c);
    0 > b ? (b += c, 0 > b && (b = 0)) : b > c && (b = c);
    b < a && (b = a);
    if (w.TYPED_ARRAY_SUPPORT)
      b = this.subarray(a, b), b.__proto__ = w.prototype;
    else {
      c = b - a;
      b = new w(c, void 0);
      for (var d = 0; d < c; ++d) b[d] = this[d + a]
    }
    return b
  };
  function B(a, b, c) {
    if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint');
    if (a + b > c)
      throw new RangeError('Trying to access beyond buffer length');
  }
  w.prototype.readUIntLE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || B(a, b, this.length);
    c = this[a];
    for (var d = 1, e = 0; ++e < b && (d *= 256);) c += this[a + e] * d;
    return c
  };
  w.prototype.readUIntBE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || B(a, b, this.length);
    c = this[a + --b];
    for (var d = 1; 0 < b && (d *= 256);) c += this[a + --b] * d;
    return c
  };
  w.prototype.readUInt8 = function(a, b) {
    b || B(a, 1, this.length);
    return this[a]
  };
  w.prototype.readUInt16LE = function(a, b) {
    b || B(a, 2, this.length);
    return this[a] | this[a + 1] << 8
  };
  w.prototype.readUInt16BE = function(a, b) {
    b || B(a, 2, this.length);
    return this[a] << 8 | this[a + 1]
  };
  w.prototype.readUInt32LE = function(a, b) {
    b || B(a, 4, this.length);
    return (this[a] | this[a + 1] << 8 | this[a + 2] << 16) +
        16777216 * this[a + 3]
  };
  w.prototype.readUInt32BE = function(a, b) {
    b || B(a, 4, this.length);
    return 16777216 * this[a] +
        (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3])
  };
  w.prototype.readIntLE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || B(a, b, this.length);
    c = this[a];
    for (var d = 1, e = 0; ++e < b && (d *= 256);) c += this[a + e] * d;
    c >= 128 * d && (c -= Math.pow(2, 8 * b));
    return c
  };
  w.prototype.readIntBE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || B(a, b, this.length);
    c = b;
    for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256);)
      e += this[a + --c] * d;
    e >= 128 * d && (e -= Math.pow(2, 8 * b));
    return e
  };
  w.prototype.readInt8 = function(a, b) {
    b || B(a, 1, this.length);
    return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
  };
  w.prototype.readInt16LE = function(a, b) {
    b || B(a, 2, this.length);
    a = this[a] | this[a + 1] << 8;
    return a & 32768 ? a | 4294901760 : a
  };
  w.prototype.readInt16BE = function(a, b) {
    b || B(a, 2, this.length);
    a = this[a + 1] | this[a] << 8;
    return a & 32768 ? a | 4294901760 : a
  };
  w.prototype.readInt32LE = function(a, b) {
    b || B(a, 4, this.length);
    return this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24
  };
  w.prototype.readInt32BE = function(a, b) {
    b || B(a, 4, this.length);
    return this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]
  };
  w.prototype.readFloatLE = function(a, b) {
    b || B(a, 4, this.length);
    return oa(this, a, !0, 23, 4)
  };
  w.prototype.readFloatBE = function(a, b) {
    b || B(a, 4, this.length);
    return oa(this, a, !1, 23, 4)
  };
  w.prototype.readDoubleLE = function(a, b) {
    b || B(a, 8, this.length);
    return oa(this, a, !0, 52, 8)
  };
  w.prototype.readDoubleBE = function(a, b) {
    b || B(a, 8, this.length);
    return oa(this, a, !1, 52, 8)
  };
  function C(a, b, c, d, e, f) {
    if (!z(a))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (b > e || b < f)
      throw new RangeError('"value" argument is out of bounds');
    if (c + d > a.length) throw new RangeError('Index out of range');
  }
  w.prototype.writeUIntLE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    c |= 0;
    d || C(this, a, b, c, Math.pow(2, 8 * c) - 1, 0);
    d = 1;
    var e = 0;
    for (this[b] = a & 255; ++e < c && (d *= 256);) this[b + e] = a / d & 255;
    return b + c
  };
  w.prototype.writeUIntBE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    c |= 0;
    d || C(this, a, b, c, Math.pow(2, 8 * c) - 1, 0);
    d = c - 1;
    var e = 1;
    for (this[b + d] = a & 255; 0 <= --d && (e *= 256);)
      this[b + d] = a / e & 255;
    return b + c
  };
  w.prototype.writeUInt8 = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 1, 255, 0);
    w.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
    this[b] = a & 255;
    return b + 1
  };
  function Ka(a, b, c, d) {
    0 > b && (b = 65535 + b + 1);
    for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
      a[c + e] = (b & 255 << 8 * (d ? e : 1 - e)) >>> 8 * (d ? e : 1 - e)
  }
  w.prototype.writeUInt16LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 2, 65535, 0);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) :
                            Ka(this, a, b, !0);
    return b + 2
  };
  w.prototype.writeUInt16BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 2, 65535, 0);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a & 255) :
                            Ka(this, a, b, !1);
    return b + 2
  };
  function La(a, b, c, d) {
    0 > b && (b = 4294967295 + b + 1);
    for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
      a[c + e] = b >>> 8 * (d ? e : 3 - e) & 255
  }
  w.prototype.writeUInt32LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 4, 4294967295, 0);
    w.TYPED_ARRAY_SUPPORT ? (this[b + 3] = a >>> 24, this[b + 2] = a >>> 16,
                             this[b + 1] = a >>> 8, this[b] = a & 255) :
                            La(this, a, b, !0);
    return b + 4
  };
  w.prototype.writeUInt32BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 4, 4294967295, 0);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16,
                             this[b + 2] = a >>> 8, this[b + 3] = a & 255) :
                            La(this, a, b, !1);
    return b + 4
  };
  w.prototype.writeIntLE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    d || (d = Math.pow(2, 8 * c - 1), C(this, a, b, c, d - 1, -d));
    d = 0;
    var e = 1, f = 0;
    for (this[b] = a & 255; ++d < c && (e *= 256);)
      0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
          this[b + d] = (a / e >> 0) - f & 255;
    return b + c
  };
  w.prototype.writeIntBE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    d || (d = Math.pow(2, 8 * c - 1), C(this, a, b, c, d - 1, -d));
    d = c - 1;
    var e = 1, f = 0;
    for (this[b + d] = a & 255; 0 <= --d && (e *= 256);)
      0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
          this[b + d] = (a / e >> 0) - f & 255;
    return b + c
  };
  w.prototype.writeInt8 = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 1, 127, -128);
    w.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
    0 > a && (a = 255 + a + 1);
    this[b] = a & 255;
    return b + 1
  };
  w.prototype.writeInt16LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 2, 32767, -32768);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) :
                            Ka(this, a, b, !0);
    return b + 2
  };
  w.prototype.writeInt16BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 2, 32767, -32768);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a & 255) :
                            Ka(this, a, b, !1);
    return b + 2
  };
  w.prototype.writeInt32LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 4, 2147483647, -2147483648);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8,
                             this[b + 2] = a >>> 16, this[b + 3] = a >>> 24) :
                            La(this, a, b, !0);
    return b + 4
  };
  w.prototype.writeInt32BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || C(this, a, b, 4, 2147483647, -2147483648);
    0 > a && (a = 4294967295 + a + 1);
    w.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16,
                             this[b + 2] = a >>> 8, this[b + 3] = a & 255) :
                            La(this, a, b, !1);
    return b + 4
  };
  function Ma(a, b, c, d) {
    if (c + d > a.length) throw new RangeError('Index out of range');
    if (0 > c) throw new RangeError('Index out of range');
  }
  w.prototype.writeFloatLE = function(a, b, c) {
    c || Ma(this, a, b, 4);
    pa(this, a, b, !0, 23, 4);
    return b + 4
  };
  w.prototype.writeFloatBE = function(a, b, c) {
    c || Ma(this, a, b, 4);
    pa(this, a, b, !1, 23, 4);
    return b + 4
  };
  w.prototype.writeDoubleLE = function(a, b, c) {
    c || Ma(this, a, b, 8);
    pa(this, a, b, !0, 52, 8);
    return b + 8
  };
  w.prototype.writeDoubleBE = function(a, b, c) {
    c || Ma(this, a, b, 8);
    pa(this, a, b, !1, 52, 8);
    return b + 8
  };
  w.prototype.copy = function(a, b, c, d) {
    c || (c = 0);
    d || 0 === d || (d = this.length);
    b >= a.length && (b = a.length);
    b || (b = 0);
    0 < d && d < c && (d = c);
    if (d === c || 0 === a.length || 0 === this.length) return 0;
    if (0 > b) throw new RangeError('targetStart out of bounds');
    if (0 > c || c >= this.length)
      throw new RangeError('sourceStart out of bounds');
    if (0 > d) throw new RangeError('sourceEnd out of bounds');
    d > this.length && (d = this.length);
    a.length - b < d - c && (d = a.length - b + c);
    var e = d - c;
    if (this === a && c < b && b < d)
      for (d = e - 1; 0 <= d; --d) a[d + b] = this[d + c];
    else if (1E3 > e || !w.TYPED_ARRAY_SUPPORT)
      for (d = 0; d < e; ++d) a[d + b] = this[d + c];
    else
      Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b);
    return e
  };
  w.prototype.fill = function(a, b, c, d) {
    if ('string' === typeof a) {
      'string' === typeof b ? (d = b, b = 0, c = this.length) :
                              'string' === typeof c && (d = c, c = this.length);
      if (1 === a.length) {
        var e = a.charCodeAt(0);
        256 > e && (a = e)
      }
      if (void 0 !== d && 'string' !== typeof d)
        throw new TypeError('encoding must be a string');
      if ('string' === typeof d && !w.isEncoding(d))
        throw new TypeError('Unknown encoding: ' + d);
    } else
      'number' === typeof a && (a &= 255);
    if (0 > b || this.length < b || this.length < c)
      throw new RangeError('Out of range index');
    if (c <= b) return this;
    b >>>= 0;
    c = void 0 === c ? this.length : c >>> 0;
    a || (a = 0);
    if ('number' === typeof a)
      for (d = b; d < c; ++d) this[d] = a;
    else
      for (a = z(a) ? a : Aa((new w(a, d)).toString()), e = a.length, d = 0;
           d < c - b; ++d)
        this[d + b] = a[d % e];
    return this
  };
  var Na = /[^+\/0-9A-Za-z-_]/g;
  function Aa(a, b) {
    b = b || Infinity;
    for (var c, d = a.length, e = null, f = [], g = 0; g < d; ++g) {
      c = a.charCodeAt(g);
      if (55295 < c && 57344 > c) {
        if (!e) {
          if (56319 < c) {
            -1 < (b -= 3) && f.push(239, 191, 189);
            continue
          } else if (g + 1 === d) {
            -1 < (b -= 3) && f.push(239, 191, 189);
            continue
          }
          e = c;
          continue
        }
        if (56320 > c) {
          -1 < (b -= 3) && f.push(239, 191, 189);
          e = c;
          continue
        }
        c = (e - 55296 << 10 | c - 56320) + 65536
      } else
        e && -1 < (b -= 3) && f.push(239, 191, 189);
      e = null;
      if (128 > c) {
        if (0 > --b) break;
        f.push(c)
      } else if (2048 > c) {
        if (0 > (b -= 2)) break;
        f.push(c >> 6 | 192, c & 63 | 128)
      } else if (65536 > c) {
        if (0 > (b -= 3)) break;
        f.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128)
      } else if (1114112 > c) {
        if (0 > (b -= 4)) break;
        f.push(
            c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128)
      } else
        throw Error('Invalid code point');
    }
    return f
  }
  function Ia(a) {
    for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255);
    return b
  }
  function Ba(a) {
    a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(Na, '');
    if (2 > a.length)
      a = '';
    else
      for (; 0 !== a.length % 4;) a += '=';
    ja || ka();
    var b = a.length;
    if (0 < b % 4)
      throw Error('Invalid string. Length must be a multiple of 4');
    var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0;
    var d = new ia(3 * b / 4 - c);
    var e = 0 < c ? b - 4 : b;
    var f = 0;
    for (b = 0; b < e; b += 4) {
      var g = u[a.charCodeAt(b)] << 18 | u[a.charCodeAt(b + 1)] << 12 |
          u[a.charCodeAt(b + 2)] << 6 | u[a.charCodeAt(b + 3)];
      d[f++] = g >> 16 & 255;
      d[f++] = g >> 8 & 255;
      d[f++] = g & 255
    }
    2 === c ? (g = u[a.charCodeAt(b)] << 2 | u[a.charCodeAt(b + 1)] >> 4,
               d[f++] = g & 255) :
              1 === c &&
            (g = u[a.charCodeAt(b)] << 10 | u[a.charCodeAt(b + 1)] << 4 |
                 u[a.charCodeAt(b + 2)] >> 2,
             d[f++] = g >> 8 & 255, d[f++] = g & 255);
    return d
  }
  function Ha(a, b, c, d) {
    for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
      b[e + c] = a[e];
    return e
  }
  function za(a) {
    return null != a &&
        (!!a._isBuffer || Oa(a) ||
         'function' === typeof a.readFloatLE && 'function' === typeof a.slice &&
             Oa(a.slice(0, 0)))
  }
  function Oa(a) {
    return !!a.constructor && 'function' === typeof a.constructor.isBuffer &&
        a.constructor.isBuffer(a)
  }
  var D = w,
      Pa = 'undefined' !== typeof globalThis ?
      globalThis :
      'undefined' !== typeof window ?
      window :
      'undefined' !== typeof global ? global :
                                      'undefined' !== typeof self ? self : {};
  function Qa(a, b) {
    return b = {exports: {}}, a(b, b.exports), b.exports
  }
  function Ra() {
    throw Error('setTimeout has not been defined');
  }
  function Sa() {
    throw Error('clearTimeout has not been defined');
  }
  var E = Ra, F = Sa;
  'function' === typeof l.setTimeout && (E = setTimeout);
  'function' === typeof l.clearTimeout && (F = clearTimeout);
  function Ta(a) {
    if (E === setTimeout) return setTimeout(a, 0);
    if ((E === Ra || !E) && setTimeout) return E = setTimeout, setTimeout(a, 0);
    try {
      return E(a, 0)
    } catch (b) {
      try {
        return E.call(null, a, 0)
      } catch (c) {
        return E.call(this, a, 0)
      }
    }
  }
  function Ua(a) {
    if (F === clearTimeout) return clearTimeout(a);
    if ((F === Sa || !F) && clearTimeout)
      return F = clearTimeout, clearTimeout(a);
    try {
      return F(a)
    } catch (b) {
      try {
        return F.call(null, a)
      } catch (c) {
        return F.call(this, a)
      }
    }
  }
  var G = [], Va = !1, H, Wa = -1;
  function Xa() {
    Va && H && (Va = !1, H.length ? G = H.concat(G) : Wa = -1, G.length && Ya())
  }
  function Ya() {
    if (!Va) {
      var a = Ta(Xa);
      Va = !0;
      for (var b = G.length; b;) {
        H = G;
        for (G = []; ++Wa < b;) H && H[Wa].run();
        Wa = -1;
        b = G.length
      }
      H = null;
      Va = !1;
      Ua(a)
    }
  }
  function Za(a) {
    var b = Array(arguments.length - 1);
    if (1 < arguments.length)
      for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
    G.push(new $a(a, b));
    1 !== G.length || Va || Ta(Ya)
  }
  function $a(a, b) {
    this.fun = a;
    this.array = b
  }
  $a.prototype.run = function() {
    this.fun.apply(null, this.array)
  };
  function I() {}
  var ab = l.performance || {},
      bb = ab.now || ab.mozNow || ab.msNow || ab.oNow || ab.webkitNow ||
      function() {
        return (new Date).getTime()
      },
      cb = new Date, db = {
        nextTick: Za,
        title: 'browser',
        browser: !0,
        env: {},
        argv: [],
        version: '',
        versions: {},
        on: I,
        addListener: I,
        once: I,
        off: I,
        removeListener: I,
        removeAllListeners: I,
        emit: I,
        binding: function() {
          throw Error('process.binding is not supported');
        },
        cwd: function() {
          return '/'
        },
        chdir: function() {
          throw Error('process.chdir is not supported');
        },
        umask: function() {
          return 0
        },
        hrtime: function(a) {
          var b = .001 * bb.call(ab), c = Math.floor(b);
          b = Math.floor(b % 1 * 1E9);
          a && (c -= a[0], b -= a[1], 0 > b && (c--, b += 1E9));
          return [c, b]
        },
        platform: 'browser',
        release: {},
        config: {},
        uptime: function() {
          return (new Date - cb) / 1E3
        }
      },
      J = [], L = [],
      eb = 'undefined' !== typeof Uint8Array ? Uint8Array : Array, fb = !1;
  function gb() {
    fb = !0;
    for (var a = 0; 64 > a; ++a)
      J[a] =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[a],
      L['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
            .charCodeAt(a)] = a;
    L[45] = 62;
    L[95] = 63
  }
  function hb(a, b, c) {
    for (var d = [], e = b; e < c; e += 3)
      b = (a[e] << 16) + (a[e + 1] << 8) + a[e + 2],
      d.push(J[b >> 18 & 63] + J[b >> 12 & 63] + J[b >> 6 & 63] + J[b & 63]);
    return d.join('')
  }
  function ib(a) {
    fb || gb();
    for (var b = a.length, c = b % 3, d = '', e = [], f = 0, g = b - c; f < g;
         f += 16383)
      e.push(hb(a, f, f + 16383 > g ? g : f + 16383));
    1 === c ? (a = a[b - 1], d += J[a >> 2], d += J[a << 4 & 63], d += '==') :
              2 === c &&
            (a = (a[b - 2] << 8) + a[b - 1], d += J[a >> 10],
             d += J[a >> 4 & 63], d += J[a << 2 & 63], d += '=');
    e.push(d);
    return e.join('')
  }
  function jb(a, b, c, d, e) {
    var f = 8 * e - d - 1;
    var g = (1 << f) - 1, h = g >> 1, n = -7;
    e = c ? e - 1 : 0;
    var m = c ? -1 : 1, r = a[b + e];
    e += m;
    c = r & (1 << -n) - 1;
    r >>= -n;
    for (n += f; 0 < n; c = 256 * c + a[b + e], e += m, n -= 8)
      ;
    f = c & (1 << -n) - 1;
    c >>= -n;
    for (n += d; 0 < n; f = 256 * f + a[b + e], e += m, n -= 8)
      ;
    if (0 === c)
      c = 1 - h;
    else {
      if (c === g) return f ? NaN : Infinity * (r ? -1 : 1);
      f += Math.pow(2, d);
      c -= h
    }
    return (r ? -1 : 1) * f * Math.pow(2, c - d)
  }
  function kb(a, b, c, d, e, f) {
    var g, h = 8 * f - e - 1, n = (1 << h) - 1, m = n >> 1,
           r = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    f = d ? 0 : f - 1;
    var q = d ? 1 : -1, x = 0 > b || 0 === b && 0 > 1 / b ? 1 : 0;
    b = Math.abs(b);
    isNaN(b) || Infinity === b ?
        (b = isNaN(b) ? 1 : 0, d = n) :
        (d = Math.floor(Math.log(b) / Math.LN2),
         1 > b * (g = Math.pow(2, -d)) && (d--, g *= 2),
         b = 1 <= d + m ? b + r / g : b + r * Math.pow(2, 1 - m),
         2 <= b * g && (d++, g /= 2),
         d + m >= n ?
             (b = 0, d = n) :
             1 <= d + m ? (b = (b * g - 1) * Math.pow(2, e), d += m) :
                          (b = b * Math.pow(2, m - 1) * Math.pow(2, e), d = 0));
    for (; 8 <= e; a[c + f] = b & 255, f += q, b /= 256, e -= 8)
      ;
    d = d << e | b;
    for (h += e; 0 < h; a[c + f] = d & 255, f += q, d /= 256, h -= 8)
      ;
    a[c + f - q] |= 128 * x
  }
  var mb = {}.toString, nb = Array.isArray || function(a) {
    return '[object Array]' == mb.call(a)
  };
  M.TYPED_ARRAY_SUPPORT =
      void 0 !== l.TYPED_ARRAY_SUPPORT ? l.TYPED_ARRAY_SUPPORT : !0;
  var ob = M.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  function N(a, b) {
    if ((M.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < b)
      throw new RangeError('Invalid typed array length');
    M.TYPED_ARRAY_SUPPORT ? (a = new Uint8Array(b), a.__proto__ = M.prototype) :
                            (null === a && (a = new M(b)), a.length = b);
    return a
  }
  function M(a, b, c) {
    if (!(M.TYPED_ARRAY_SUPPORT || this instanceof M)) return new M(a, b, c);
    if ('number' === typeof a) {
      if ('string' === typeof b)
        throw Error(
            'If encoding is specified then the first argument must be a string');
      return pb(this, a)
    }
    return qb(this, a, b, c)
  }
  M.poolSize = 8192;
  M._augment = function(a) {
    a.__proto__ = M.prototype;
    return a
  };
  function qb(a, b, c, d) {
    if ('number' === typeof b)
      throw new TypeError('"value" argument must not be a number');
    if ('undefined' !== typeof ArrayBuffer && b instanceof ArrayBuffer) {
      b.byteLength;
      if (0 > c || b.byteLength < c)
        throw new RangeError('\'offset\' is out of bounds');
      if (b.byteLength < c + (d || 0))
        throw new RangeError('\'length\' is out of bounds');
      b = void 0 === c && void 0 === d ?
          new Uint8Array(b) :
          void 0 === d ? new Uint8Array(b, c) : new Uint8Array(b, c, d);
      M.TYPED_ARRAY_SUPPORT ? (a = b, a.__proto__ = M.prototype) : a = rb(a, b);
      return a
    }
    if ('string' === typeof b) {
      d = a;
      a = c;
      if ('string' !== typeof a || '' === a) a = 'utf8';
      if (!M.isEncoding(a))
        throw new TypeError('"encoding" must be a valid string encoding');
      c = sb(b, a) | 0;
      d = N(d, c);
      b = d.write(b, a);
      b !== c && (d = d.slice(0, b));
      return d
    }
    return tb(a, b)
  }
  M.from = function(a, b, c) {
    return qb(null, a, b, c)
  };
  M.TYPED_ARRAY_SUPPORT &&
      (M.prototype.__proto__ = Uint8Array.prototype, M.__proto__ = Uint8Array);
  function ub(a) {
    if ('number' !== typeof a)
      throw new TypeError('"size" argument must be a number');
    if (0 > a) throw new RangeError('"size" argument must not be negative');
  }
  M.alloc = function(a, b, c) {
    ub(a);
    a = 0 >= a ? N(null, a) :
                 void 0 !== b ? 'string' === typeof c ? N(null, a).fill(b, c) :
                                                        N(null, a).fill(b) :
                                N(null, a);
    return a
  };
  function pb(a, b) {
    ub(b);
    a = N(a, 0 > b ? 0 : vb(b) | 0);
    if (!M.TYPED_ARRAY_SUPPORT)
      for (var c = 0; c < b; ++c) a[c] = 0;
    return a
  }
  M.allocUnsafe = function(a) {
    return pb(null, a)
  };
  M.allocUnsafeSlow = function(a) {
    return pb(null, a)
  };
  function rb(a, b) {
    var c = 0 > b.length ? 0 : vb(b.length) | 0;
    a = N(a, c);
    for (var d = 0; d < c; d += 1) a[d] = b[d] & 255;
    return a
  }
  function tb(a, b) {
    if (O(b)) {
      var c = vb(b.length) | 0;
      a = N(a, c);
      if (0 === a.length) return a;
      b.copy(a, 0, 0, c);
      return a
    }
    if (b) {
      if ('undefined' !== typeof ArrayBuffer &&
              b.buffer instanceof ArrayBuffer ||
          'length' in b)
        return (c = 'number' !== typeof b.length) ||
                   (c = b.length, c = c !== c),
               c ? N(a, 0) : rb(a, b);
      if ('Buffer' === b.type && nb(b.data)) return rb(a, b.data)
    }
    throw new TypeError(
        'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
  }
  function vb(a) {
    if (a >= (M.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823))
      throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' +
          (M.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) +
          ' bytes');
    return a | 0
  }
  M.isBuffer = wb;
  function O(a) {
    return !(null == a || !a._isBuffer)
  }
  M.compare = function(a, b) {
    if (!O(a) || !O(b)) throw new TypeError('Arguments must be Buffers');
    if (a === b) return 0;
    for (var c = a.length, d = b.length, e = 0, f = Math.min(c, d); e < f; ++e)
      if (a[e] !== b[e]) {
        c = a[e];
        d = b[e];
        break
      }
    return c < d ? -1 : d < c ? 1 : 0
  };
  M.isEncoding = function(a) {
    switch (String(a).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return !0;
      default:
        return !1
    }
  };
  M.concat = function(a, b) {
    if (!nb(a))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === a.length) return M.alloc(0);
    var c;
    if (void 0 === b)
      for (c = b = 0; c < a.length; ++c) b += a[c].length;
    b = M.allocUnsafe(b);
    var d = 0;
    for (c = 0; c < a.length; ++c) {
      var e = a[c];
      if (!O(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      e.copy(b, d);
      d += e.length
    }
    return b
  };
  function sb(a, b) {
    if (O(a)) return a.length;
    if ('undefined' !== typeof ArrayBuffer &&
        'function' === typeof ArrayBuffer.isView &&
        (ArrayBuffer.isView(a) || a instanceof ArrayBuffer))
      return a.byteLength;
    'string' !== typeof a && (a = '' + a);
    var c = a.length;
    if (0 === c) return 0;
    for (var d = !1;;) switch (b) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return c;
        case 'utf8':
        case 'utf-8':
        case void 0:
          return xb(a).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * c;
        case 'hex':
          return c >>> 1;
        case 'base64':
          return yb(a).length;
        default:
          if (d) return xb(a).length;
          b = ('' + b).toLowerCase();
          d = !0
      }
  }
  M.byteLength = sb;
  function zb(a, b, c) {
    var d = !1;
    if (void 0 === b || 0 > b) b = 0;
    if (b > this.length) return '';
    if (void 0 === c || c > this.length) c = this.length;
    if (0 >= c) return '';
    c >>>= 0;
    b >>>= 0;
    if (c <= b) return '';
    for (a || (a = 'utf8');;) switch (a) {
        case 'hex':
          a = b;
          b = c;
          c = this.length;
          if (!a || 0 > a) a = 0;
          if (!b || 0 > b || b > c) b = c;
          d = '';
          for (c = a; c < b; ++c)
            a = d, d = this[c],
            d = 16 > d ? '0' + d.toString(16) : d.toString(16), d = a + d;
          return d;
        case 'utf8':
        case 'utf-8':
          return Ab(this, b, c);
        case 'ascii':
          a = '';
          for (c = Math.min(this.length, c); b < c; ++b)
            a += String.fromCharCode(this[b] & 127);
          return a;
        case 'latin1':
        case 'binary':
          a = '';
          for (c = Math.min(this.length, c); b < c; ++b)
            a += String.fromCharCode(this[b]);
          return a;
        case 'base64':
          return b = 0 === b && c === this.length ? ib(this) :
                                                    ib(this.slice(b, c)),
                 b;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          b = this.slice(b, c);
          c = '';
          for (a = 0; a < b.length; a += 2)
            c += String.fromCharCode(b[a] + 256 * b[a + 1]);
          return c;
        default:
          if (d) throw new TypeError('Unknown encoding: ' + a);
          a = (a + '').toLowerCase();
          d = !0
      }
  }
  M.prototype._isBuffer = !0;
  function P(a, b, c) {
    var d = a[b];
    a[b] = a[c];
    a[c] = d
  }
  M.prototype.swap16 = function() {
    var a = this.length;
    if (0 !== a % 2)
      throw new RangeError('Buffer size must be a multiple of 16-bits');
    for (var b = 0; b < a; b += 2) P(this, b, b + 1);
    return this
  };
  M.prototype.swap32 = function() {
    var a = this.length;
    if (0 !== a % 4)
      throw new RangeError('Buffer size must be a multiple of 32-bits');
    for (var b = 0; b < a; b += 4) P(this, b, b + 3), P(this, b + 1, b + 2);
    return this
  };
  M.prototype.swap64 = function() {
    var a = this.length;
    if (0 !== a % 8)
      throw new RangeError('Buffer size must be a multiple of 64-bits');
    for (var b = 0; b < a; b += 8)
      P(this, b, b + 7), P(this, b + 1, b + 6), P(this, b + 2, b + 5),
          P(this, b + 3, b + 4);
    return this
  };
  M.prototype.toString = function() {
    var a = this.length | 0;
    return 0 === a ?
        '' :
        0 === arguments.length ? Ab(this, 0, a) : zb.apply(this, arguments)
  };
  M.prototype.equals = function(a) {
    if (!O(a)) throw new TypeError('Argument must be a Buffer');
    return this === a ? !0 : 0 === M.compare(this, a)
  };
  M.prototype.inspect = function() {
    var a = '';
    0 < this.length &&
        (a = this.toString('hex', 0, 50).match(/.{2}/g).join(' '),
         50 < this.length && (a += ' ... '));
    return '<Buffer ' + a + '>'
  };
  M.prototype.compare = function(a, b, c, d, e) {
    if (!O(a)) throw new TypeError('Argument must be a Buffer');
    void 0 === b && (b = 0);
    void 0 === c && (c = a ? a.length : 0);
    void 0 === d && (d = 0);
    void 0 === e && (e = this.length);
    if (0 > b || c > a.length || 0 > d || e > this.length)
      throw new RangeError('out of range index');
    if (d >= e && b >= c) return 0;
    if (d >= e) return -1;
    if (b >= c) return 1;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    e >>>= 0;
    if (this === a) return 0;
    var f = e - d, g = c - b, h = Math.min(f, g);
    d = this.slice(d, e);
    a = a.slice(b, c);
    for (b = 0; b < h; ++b)
      if (d[b] !== a[b]) {
        f = d[b];
        g = a[b];
        break
      }
    return f < g ? -1 : g < f ? 1 : 0
  };
  function Bb(a, b, c, d, e) {
    if (0 === a.length) return -1;
    'string' === typeof c ?
        (d = c, c = 0) :
        2147483647 < c ? c = 2147483647 : -2147483648 > c && (c = -2147483648);
    c = +c;
    isNaN(c) && (c = e ? 0 : a.length - 1);
    0 > c && (c = a.length + c);
    if (c >= a.length) {
      if (e) return -1;
      c = a.length - 1
    } else if (0 > c)
      if (e)
        c = 0;
      else
        return -1;
    'string' === typeof b && (b = M.from(b, d));
    if (O(b)) return 0 === b.length ? -1 : Cb(a, b, c, d, e);
    if ('number' === typeof b)
      return b &= 255,
             M.TYPED_ARRAY_SUPPORT &&
                     'function' === typeof Uint8Array.prototype.indexOf ?
                 e ? Uint8Array.prototype.indexOf.call(a, b, c) :
                     Uint8Array.prototype.lastIndexOf.call(a, b, c) :
                 Cb(a, [b], c, d, e);
    throw new TypeError('val must be string, number or Buffer');
  }
  function Cb(a, b, c, d, e) {
    function f(a, b) {
      return 1 === g ? a[b] : a.readUInt16BE(b * g)
    }
    var g = 1, h = a.length, n = b.length;
    if (void 0 !== d &&
        (d = String(d).toLowerCase(),
         'ucs2' === d || 'ucs-2' === d || 'utf16le' === d ||
             'utf-16le' === d)) {
      if (2 > a.length || 2 > b.length) return -1;
      g = 2;
      h /= 2;
      n /= 2;
      c /= 2
    }
    if (e)
      for (d = -1; c < h; c++)
        if (f(a, c) === f(b, -1 === d ? 0 : c - d)) {
          if (-1 === d && (d = c), c - d + 1 === n) return d * g
        } else
          -1 !== d && (c -= c - d), d = -1;
    else
      for (c + n > h && (c = h - n); 0 <= c; c--) {
        h = !0;
        for (d = 0; d < n; d++)
          if (f(a, c + d) !== f(b, d)) {
            h = !1;
            break
          }
        if (h) return c
      }
    return -1
  }
  M.prototype.includes = function(a, b, c) {
    return -1 !== this.indexOf(a, b, c)
  };
  M.prototype.indexOf = function(a, b, c) {
    return Bb(this, a, b, c, !0)
  };
  M.prototype.lastIndexOf = function(a, b, c) {
    return Bb(this, a, b, c, !1)
  };
  M.prototype.write = function(a, b, c, d) {
    if (void 0 === b)
      d = 'utf8', c = this.length, b = 0;
    else if (void 0 === c && 'string' === typeof b)
      d = b, c = this.length, b = 0;
    else if (isFinite(b))
      b |= 0,
          isFinite(c) ? (c |= 0, void 0 === d && (d = 'utf8')) :
                        (d = c, c = void 0);
    else
      throw Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported');
    var e = this.length - b;
    if (void 0 === c || c > e) c = e;
    if (0 < a.length && (0 > c || 0 > b) || b > this.length)
      throw new RangeError('Attempt to write outside buffer bounds');
    d || (d = 'utf8');
    for (e = !1;;) switch (d) {
        case 'hex':
          a: {
            b = Number(b) || 0; d = this.length - b;
            c ? (c = Number(c), c > d && (c = d)) : c = d;
            d = a.length;
            if (0 !== d % 2) throw new TypeError('Invalid hex string');
            c > d / 2 && (c = d / 2);
            for (d = 0; d < c; ++d) {
              e = parseInt(a.substr(2 * d, 2), 16);
              if (isNaN(e)) {
                a = d;
                break a
              }
              this[b + d] = e
            } a = d
          } return a;
        case 'utf8':
        case 'utf-8':
          return Db(xb(a, this.length - b), this, b, c);
        case 'ascii':
          return Db(Eb(a), this, b, c);
        case 'latin1':
        case 'binary':
          return Db(Eb(a), this, b, c);
        case 'base64':
          return Db(yb(a), this, b, c);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          d = a;
          e = this.length - b;
          for (var f = [], g = 0; g < d.length && !(0 > (e -= 2)); ++g) {
            var h = d.charCodeAt(g);
            a = h >> 8;
            h %= 256;
            f.push(h);
            f.push(a)
          }
          return Db(f, this, b, c);
        default:
          if (e) throw new TypeError('Unknown encoding: ' + d);
          d = ('' + d).toLowerCase();
          e = !0
      }
  };
  M.prototype.toJSON = function() {
    return {
      type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };
  function Ab(a, b, c) {
    c = Math.min(a.length, c);
    for (var d = []; b < c;) {
      var e = a[b], f = null, g = 239 < e ? 4 : 223 < e ? 3 : 191 < e ? 2 : 1;
      if (b + g <= c) switch (g) {
          case 1:
            128 > e && (f = e);
            break;
          case 2:
            var h = a[b + 1];
            128 === (h & 192) &&
                (e = (e & 31) << 6 | h & 63, 127 < e && (f = e));
            break;
          case 3:
            h = a[b + 1];
            var n = a[b + 2];
            128 === (h & 192) && 128 === (n & 192) &&
                (e = (e & 15) << 12 | (h & 63) << 6 | n & 63,
                 2047 < e && (55296 > e || 57343 < e) && (f = e));
            break;
          case 4:
            h = a[b + 1];
            n = a[b + 2];
            var m = a[b + 3];
            128 === (h & 192) && 128 === (n & 192) && 128 === (m & 192) &&
                (e = (e & 15) << 18 | (h & 63) << 12 | (n & 63) << 6 | m & 63,
                 65535 < e && 1114112 > e && (f = e))
        }
      null === f ? (f = 65533, g = 1) :
                   65535 < f &&
              (f -= 65536, d.push(f >>> 10 & 1023 | 55296),
               f = 56320 | f & 1023);
      d.push(f);
      b += g
    }
    a = d.length;
    if (a <= Fb)
      d = String.fromCharCode.apply(String, d);
    else {
      c = '';
      for (b = 0; b < a;)
        c += String.fromCharCode.apply(String, d.slice(b, b += Fb));
      d = c
    }
    return d
  }
  var Fb = 4096;
  M.prototype.slice = function(a, b) {
    var c = this.length;
    a = ~~a;
    b = void 0 === b ? c : ~~b;
    0 > a ? (a += c, 0 > a && (a = 0)) : a > c && (a = c);
    0 > b ? (b += c, 0 > b && (b = 0)) : b > c && (b = c);
    b < a && (b = a);
    if (M.TYPED_ARRAY_SUPPORT)
      b = this.subarray(a, b), b.__proto__ = M.prototype;
    else {
      c = b - a;
      b = new M(c, void 0);
      for (var d = 0; d < c; ++d) b[d] = this[d + a]
    }
    return b
  };
  function Q(a, b, c) {
    if (0 !== a % 1 || 0 > a) throw new RangeError('offset is not uint');
    if (a + b > c)
      throw new RangeError('Trying to access beyond buffer length');
  }
  M.prototype.readUIntLE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || Q(a, b, this.length);
    c = this[a];
    for (var d = 1, e = 0; ++e < b && (d *= 256);) c += this[a + e] * d;
    return c
  };
  M.prototype.readUIntBE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || Q(a, b, this.length);
    c = this[a + --b];
    for (var d = 1; 0 < b && (d *= 256);) c += this[a + --b] * d;
    return c
  };
  M.prototype.readUInt8 = function(a, b) {
    b || Q(a, 1, this.length);
    return this[a]
  };
  M.prototype.readUInt16LE = function(a, b) {
    b || Q(a, 2, this.length);
    return this[a] | this[a + 1] << 8
  };
  M.prototype.readUInt16BE = function(a, b) {
    b || Q(a, 2, this.length);
    return this[a] << 8 | this[a + 1]
  };
  M.prototype.readUInt32LE = function(a, b) {
    b || Q(a, 4, this.length);
    return (this[a] | this[a + 1] << 8 | this[a + 2] << 16) +
        16777216 * this[a + 3]
  };
  M.prototype.readUInt32BE = function(a, b) {
    b || Q(a, 4, this.length);
    return 16777216 * this[a] +
        (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3])
  };
  M.prototype.readIntLE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || Q(a, b, this.length);
    c = this[a];
    for (var d = 1, e = 0; ++e < b && (d *= 256);) c += this[a + e] * d;
    c >= 128 * d && (c -= Math.pow(2, 8 * b));
    return c
  };
  M.prototype.readIntBE = function(a, b, c) {
    a |= 0;
    b |= 0;
    c || Q(a, b, this.length);
    c = b;
    for (var d = 1, e = this[a + --c]; 0 < c && (d *= 256);)
      e += this[a + --c] * d;
    e >= 128 * d && (e -= Math.pow(2, 8 * b));
    return e
  };
  M.prototype.readInt8 = function(a, b) {
    b || Q(a, 1, this.length);
    return this[a] & 128 ? -1 * (255 - this[a] + 1) : this[a]
  };
  M.prototype.readInt16LE = function(a, b) {
    b || Q(a, 2, this.length);
    a = this[a] | this[a + 1] << 8;
    return a & 32768 ? a | 4294901760 : a
  };
  M.prototype.readInt16BE = function(a, b) {
    b || Q(a, 2, this.length);
    a = this[a + 1] | this[a] << 8;
    return a & 32768 ? a | 4294901760 : a
  };
  M.prototype.readInt32LE = function(a, b) {
    b || Q(a, 4, this.length);
    return this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24
  };
  M.prototype.readInt32BE = function(a, b) {
    b || Q(a, 4, this.length);
    return this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]
  };
  M.prototype.readFloatLE = function(a, b) {
    b || Q(a, 4, this.length);
    return jb(this, a, !0, 23, 4)
  };
  M.prototype.readFloatBE = function(a, b) {
    b || Q(a, 4, this.length);
    return jb(this, a, !1, 23, 4)
  };
  M.prototype.readDoubleLE = function(a, b) {
    b || Q(a, 8, this.length);
    return jb(this, a, !0, 52, 8)
  };
  M.prototype.readDoubleBE = function(a, b) {
    b || Q(a, 8, this.length);
    return jb(this, a, !1, 52, 8)
  };
  function R(a, b, c, d, e, f) {
    if (!O(a))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (b > e || b < f)
      throw new RangeError('"value" argument is out of bounds');
    if (c + d > a.length) throw new RangeError('Index out of range');
  }
  M.prototype.writeUIntLE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    c |= 0;
    d || R(this, a, b, c, Math.pow(2, 8 * c) - 1, 0);
    d = 1;
    var e = 0;
    for (this[b] = a & 255; ++e < c && (d *= 256);) this[b + e] = a / d & 255;
    return b + c
  };
  M.prototype.writeUIntBE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    c |= 0;
    d || R(this, a, b, c, Math.pow(2, 8 * c) - 1, 0);
    d = c - 1;
    var e = 1;
    for (this[b + d] = a & 255; 0 <= --d && (e *= 256);)
      this[b + d] = a / e & 255;
    return b + c
  };
  M.prototype.writeUInt8 = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 1, 255, 0);
    M.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
    this[b] = a & 255;
    return b + 1
  };
  function Gb(a, b, c, d) {
    0 > b && (b = 65535 + b + 1);
    for (var e = 0, f = Math.min(a.length - c, 2); e < f; ++e)
      a[c + e] = (b & 255 << 8 * (d ? e : 1 - e)) >>> 8 * (d ? e : 1 - e)
  }
  M.prototype.writeUInt16LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 2, 65535, 0);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) :
                            Gb(this, a, b, !0);
    return b + 2
  };
  M.prototype.writeUInt16BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 2, 65535, 0);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a & 255) :
                            Gb(this, a, b, !1);
    return b + 2
  };
  function Hb(a, b, c, d) {
    0 > b && (b = 4294967295 + b + 1);
    for (var e = 0, f = Math.min(a.length - c, 4); e < f; ++e)
      a[c + e] = b >>> 8 * (d ? e : 3 - e) & 255
  }
  M.prototype.writeUInt32LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 4, 4294967295, 0);
    M.TYPED_ARRAY_SUPPORT ? (this[b + 3] = a >>> 24, this[b + 2] = a >>> 16,
                             this[b + 1] = a >>> 8, this[b] = a & 255) :
                            Hb(this, a, b, !0);
    return b + 4
  };
  M.prototype.writeUInt32BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 4, 4294967295, 0);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16,
                             this[b + 2] = a >>> 8, this[b + 3] = a & 255) :
                            Hb(this, a, b, !1);
    return b + 4
  };
  M.prototype.writeIntLE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    d || (d = Math.pow(2, 8 * c - 1), R(this, a, b, c, d - 1, -d));
    d = 0;
    var e = 1, f = 0;
    for (this[b] = a & 255; ++d < c && (e *= 256);)
      0 > a && 0 === f && 0 !== this[b + d - 1] && (f = 1),
          this[b + d] = (a / e >> 0) - f & 255;
    return b + c
  };
  M.prototype.writeIntBE = function(a, b, c, d) {
    a = +a;
    b |= 0;
    d || (d = Math.pow(2, 8 * c - 1), R(this, a, b, c, d - 1, -d));
    d = c - 1;
    var e = 1, f = 0;
    for (this[b + d] = a & 255; 0 <= --d && (e *= 256);)
      0 > a && 0 === f && 0 !== this[b + d + 1] && (f = 1),
          this[b + d] = (a / e >> 0) - f & 255;
    return b + c
  };
  M.prototype.writeInt8 = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 1, 127, -128);
    M.TYPED_ARRAY_SUPPORT || (a = Math.floor(a));
    0 > a && (a = 255 + a + 1);
    this[b] = a & 255;
    return b + 1
  };
  M.prototype.writeInt16LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 2, 32767, -32768);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8) :
                            Gb(this, a, b, !0);
    return b + 2
  };
  M.prototype.writeInt16BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 2, 32767, -32768);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 8, this[b + 1] = a & 255) :
                            Gb(this, a, b, !1);
    return b + 2
  };
  M.prototype.writeInt32LE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 4, 2147483647, -2147483648);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a & 255, this[b + 1] = a >>> 8,
                             this[b + 2] = a >>> 16, this[b + 3] = a >>> 24) :
                            Hb(this, a, b, !0);
    return b + 4
  };
  M.prototype.writeInt32BE = function(a, b, c) {
    a = +a;
    b |= 0;
    c || R(this, a, b, 4, 2147483647, -2147483648);
    0 > a && (a = 4294967295 + a + 1);
    M.TYPED_ARRAY_SUPPORT ? (this[b] = a >>> 24, this[b + 1] = a >>> 16,
                             this[b + 2] = a >>> 8, this[b + 3] = a & 255) :
                            Hb(this, a, b, !1);
    return b + 4
  };
  function Ib(a, b, c, d) {
    if (c + d > a.length) throw new RangeError('Index out of range');
    if (0 > c) throw new RangeError('Index out of range');
  }
  M.prototype.writeFloatLE = function(a, b, c) {
    c || Ib(this, a, b, 4);
    kb(this, a, b, !0, 23, 4);
    return b + 4
  };
  M.prototype.writeFloatBE = function(a, b, c) {
    c || Ib(this, a, b, 4);
    kb(this, a, b, !1, 23, 4);
    return b + 4
  };
  M.prototype.writeDoubleLE = function(a, b, c) {
    c || Ib(this, a, b, 8);
    kb(this, a, b, !0, 52, 8);
    return b + 8
  };
  M.prototype.writeDoubleBE = function(a, b, c) {
    c || Ib(this, a, b, 8);
    kb(this, a, b, !1, 52, 8);
    return b + 8
  };
  M.prototype.copy = function(a, b, c, d) {
    c || (c = 0);
    d || 0 === d || (d = this.length);
    b >= a.length && (b = a.length);
    b || (b = 0);
    0 < d && d < c && (d = c);
    if (d === c || 0 === a.length || 0 === this.length) return 0;
    if (0 > b) throw new RangeError('targetStart out of bounds');
    if (0 > c || c >= this.length)
      throw new RangeError('sourceStart out of bounds');
    if (0 > d) throw new RangeError('sourceEnd out of bounds');
    d > this.length && (d = this.length);
    a.length - b < d - c && (d = a.length - b + c);
    var e = d - c;
    if (this === a && c < b && b < d)
      for (d = e - 1; 0 <= d; --d) a[d + b] = this[d + c];
    else if (1E3 > e || !M.TYPED_ARRAY_SUPPORT)
      for (d = 0; d < e; ++d) a[d + b] = this[d + c];
    else
      Uint8Array.prototype.set.call(a, this.subarray(c, c + e), b);
    return e
  };
  M.prototype.fill = function(a, b, c, d) {
    if ('string' === typeof a) {
      'string' === typeof b ? (d = b, b = 0, c = this.length) :
                              'string' === typeof c && (d = c, c = this.length);
      if (1 === a.length) {
        var e = a.charCodeAt(0);
        256 > e && (a = e)
      }
      if (void 0 !== d && 'string' !== typeof d)
        throw new TypeError('encoding must be a string');
      if ('string' === typeof d && !M.isEncoding(d))
        throw new TypeError('Unknown encoding: ' + d);
    } else
      'number' === typeof a && (a &= 255);
    if (0 > b || this.length < b || this.length < c)
      throw new RangeError('Out of range index');
    if (c <= b) return this;
    b >>>= 0;
    c = void 0 === c ? this.length : c >>> 0;
    a || (a = 0);
    if ('number' === typeof a)
      for (d = b; d < c; ++d) this[d] = a;
    else
      for (a = O(a) ? a : xb((new M(a, d)).toString()), e = a.length, d = 0;
           d < c - b; ++d)
        this[d + b] = a[d % e];
    return this
  };
  var Jb = /[^+\/0-9A-Za-z-_]/g;
  function xb(a, b) {
    b = b || Infinity;
    for (var c, d = a.length, e = null, f = [], g = 0; g < d; ++g) {
      c = a.charCodeAt(g);
      if (55295 < c && 57344 > c) {
        if (!e) {
          if (56319 < c) {
            -1 < (b -= 3) && f.push(239, 191, 189);
            continue
          } else if (g + 1 === d) {
            -1 < (b -= 3) && f.push(239, 191, 189);
            continue
          }
          e = c;
          continue
        }
        if (56320 > c) {
          -1 < (b -= 3) && f.push(239, 191, 189);
          e = c;
          continue
        }
        c = (e - 55296 << 10 | c - 56320) + 65536
      } else
        e && -1 < (b -= 3) && f.push(239, 191, 189);
      e = null;
      if (128 > c) {
        if (0 > --b) break;
        f.push(c)
      } else if (2048 > c) {
        if (0 > (b -= 2)) break;
        f.push(c >> 6 | 192, c & 63 | 128)
      } else if (65536 > c) {
        if (0 > (b -= 3)) break;
        f.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128)
      } else if (1114112 > c) {
        if (0 > (b -= 4)) break;
        f.push(
            c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128)
      } else
        throw Error('Invalid code point');
    }
    return f
  }
  function Eb(a) {
    for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c) & 255);
    return b
  }
  function yb(a) {
    a = (a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, '')).replace(Jb, '');
    if (2 > a.length)
      a = '';
    else
      for (; 0 !== a.length % 4;) a += '=';
    fb || gb();
    var b = a.length;
    if (0 < b % 4)
      throw Error('Invalid string. Length must be a multiple of 4');
    var c = '=' === a[b - 2] ? 2 : '=' === a[b - 1] ? 1 : 0;
    var d = new eb(3 * b / 4 - c);
    var e = 0 < c ? b - 4 : b;
    var f = 0;
    for (b = 0; b < e; b += 4) {
      var g = L[a.charCodeAt(b)] << 18 | L[a.charCodeAt(b + 1)] << 12 |
          L[a.charCodeAt(b + 2)] << 6 | L[a.charCodeAt(b + 3)];
      d[f++] = g >> 16 & 255;
      d[f++] = g >> 8 & 255;
      d[f++] = g & 255
    }
    2 === c ? (g = L[a.charCodeAt(b)] << 2 | L[a.charCodeAt(b + 1)] >> 4,
               d[f++] = g & 255) :
              1 === c &&
            (g = L[a.charCodeAt(b)] << 10 | L[a.charCodeAt(b + 1)] << 4 |
                 L[a.charCodeAt(b + 2)] >> 2,
             d[f++] = g >> 8 & 255, d[f++] = g & 255);
    return d
  }
  function Db(a, b, c, d) {
    for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); ++e)
      b[e + c] = a[e];
    return e
  }
  function wb(a) {
    return null != a &&
        (!!a._isBuffer || Kb(a) ||
         'function' === typeof a.readFloatLE && 'function' === typeof a.slice &&
             Kb(a.slice(0, 0)))
  }
  function Kb(a) {
    return !!a.constructor && 'function' === typeof a.constructor.isBuffer &&
        a.constructor.isBuffer(a)
  }
  var Lb = Object.freeze({
    __proto__: null,
    INSPECT_MAX_BYTES: 50,
    kMaxLength: ob,
    Buffer: M,
    SlowBuffer: function(a) {
      +a != a && (a = 0);
      return M.alloc(+a)
    },
    isBuffer: wb
  }),
      Mb = Qa(function(a, b) {
        function c(a, b) {
          for (var c in a) b[c] = a[c]
        }
        function d(a, b, c) {
          return e(a, b, c)
        }
        var e = Lb.Buffer;
        e.from&& e.alloc&& e.allocUnsafe&& e.allocUnsafeSlow ?
            a.exports = Lb :
            (c(Lb, b), b.Buffer = d);
        d.prototype = Object.create(e.prototype);
        c(e, d);
        d.from = function(a, b, c) {
          if ('number' === typeof a)
            throw new TypeError('Argument must not be a number');
          return e(a, b, c)
        };
        d.alloc = function(a, b, c) {
          if ('number' !== typeof a)
            throw new TypeError('Argument must be a number');
          a = e(a);
          void 0 !== b ? 'string' === typeof c ? a.fill(b, c) : a.fill(b) :
                         a.fill(0);
          return a
        };
        d.allocUnsafe = function(a) {
          if ('number' !== typeof a)
            throw new TypeError('Argument must be a number');
          return e(a)
        };
        d.allocUnsafeSlow = function(a) {
          if ('number' !== typeof a)
            throw new TypeError('Argument must be a number');
          return Lb.SlowBuffer(a)
        }
      }),
      Nb = Qa(function(a, b) {
        function c() {
          throw Error(
              'secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11');
        }
        function d(a, b) {
          if ('number' !== typeof a || a !== a)
            throw new TypeError('offset must be a number');
          if (a > q || 0 > a) throw new TypeError('offset must be a uint32');
          if (a > m || a > b) throw new RangeError('offset out of range');
        }
        function e(a, b, c) {
          if ('number' !== typeof a || a !== a)
            throw new TypeError('size must be a number');
          if (a > q || 0 > a) throw new TypeError('size must be a uint32');
          if (a + b > c || a > m) throw new RangeError('buffer too small');
        }
        function f(a, b, c, f) {
          if (!(n.isBuffer(a) || a instanceof Pa.Uint8Array))
            throw new TypeError(
                '"buf" argument must be a Buffer or Uint8Array');
          if ('function' === typeof b)
            f = b, b = 0, c = a.length;
          else if ('function' === typeof c)
            f = c, c = a.length - b;
          else if ('function' !== typeof f)
            throw new TypeError('"cb" argument must be a function');
          d(b, a.length);
          e(c, b, a.length);
          return g(a, b, c, f)
        }
        function g(a, b, c, d) {
          b = new Uint8Array(a.buffer, b, c);
          r.getRandomValues(b);
          if (d)
            Za(function() {
              d(null, a)
            });
          else
            return a
        }
        function h(a, b, c) {
          'undefined' === typeof b && (b = 0);
          if (!(n.isBuffer(a) || a instanceof Pa.Uint8Array))
            throw new TypeError(
                '"buf" argument must be a Buffer or Uint8Array');
          d(b, a.length);
          void 0 === c && (c = a.length - b);
          e(c, b, a.length);
          return g(a, b, c)
        }
        var n = Mb.Buffer, m = Mb.kMaxLength, r = Pa.crypto || Pa.msCrypto,
            q = Math.pow(2, 32) - 1;
        r && r.getRandomValues ? (b.randomFill = f, b.randomFillSync = h) :
                                 (b.randomFill = c, b.randomFillSync = c)
      }),
      Ob = Qa(function(a) {
             a.exports = Nb
           }).randomFillSync,
      Pb = Math.floor(.001 * (Date.now() - performance.now()));
  function S(a) {
    if ('string' !== typeof a)
      throw new TypeError(
          'Path must be a string. Received ' + JSON.stringify(a));
  }
  function Qb(a, b) {
    for (var c = '', d = 0, e = -1, f = 0, g, h = 0; h <= a.length; ++h) {
      if (h < a.length)
        g = a.charCodeAt(h);
      else if (47 === g)
        break;
      else
        g = 47;
      if (47 === g) {
        if (e !== h - 1 && 1 !== f)
          if (e !== h - 1 && 2 === f) {
            if (2 > c.length || 2 !== d || 46 !== c.charCodeAt(c.length - 1) ||
                46 !== c.charCodeAt(c.length - 2))
              if (2 < c.length) {
                if (e = c.lastIndexOf('/'), e !== c.length - 1) {
                  -1 === e ? (c = '', d = 0) :
                             (c = c.slice(0, e),
                              d = c.length - 1 - c.lastIndexOf('/'));
                  e = h;
                  f = 0;
                  continue
                }
              } else if (2 === c.length || 1 === c.length) {
                c = '';
                d = 0;
                e = h;
                f = 0;
                continue
              }
            b && (c = 0 < c.length ? c + '/..' : '..', d = 2)
          } else
            c = 0 < c.length ? c + ('/' + a.slice(e + 1, h)) :
                               a.slice(e + 1, h),
            d = h - e - 1;
        e = h;
        f = 0
      } else
        46 === g&& -1 !== f ? ++f : f = -1
    }
    return c
  }
  var Rb = {
    resolve: function() {
      for (var a = '', b = !1, c, d = arguments.length - 1; - 1 <= d && !b;
           d--) {
        if (0 <= d)
          var e = arguments[d];
        else
          void 0 === c && (c = db.cwd()), e = c;
        S(e);
        0 !== e.length && (a = e + '/' + a, b = 47 === e.charCodeAt(0))
      }
      a = Qb(a, !b);
      return b ? 0 < a.length ? '/' + a : '/' : 0 < a.length ? a : '.'
    },
    normalize: function(a) {
      S(a);
      if (0 === a.length) return '.';
      var b = 47 === a.charCodeAt(0), c = 47 === a.charCodeAt(a.length - 1);
      a = Qb(a, !b);
      0 !== a.length || b || (a = '.');
      0 < a.length && c && (a += '/');
      return b ? '/' + a : a
    },
    isAbsolute: function(a) {
      S(a);
      return 0 < a.length && 47 === a.charCodeAt(0)
    },
    join: function() {
      if (0 === arguments.length) return '.';
      for (var a, b = 0; b < arguments.length; ++b) {
        var c = arguments[b];
        S(c);
        0 < c.length && (a = void 0 === a ? c : a + ('/' + c))
      }
      return void 0 === a ? '.' : Rb.normalize(a)
    },
    relative: function(a, b) {
      S(a);
      S(b);
      if (a === b) return '';
      a = Rb.resolve(a);
      b = Rb.resolve(b);
      if (a === b) return '';
      for (var c = 1; c < a.length && 47 === a.charCodeAt(c); ++c)
        ;
      for (var d = a.length, e = d - c, f = 1;
           f < b.length && 47 === b.charCodeAt(f); ++f)
        ;
      for (var g = b.length - f, h = e < g ? e : g, n = -1, m = 0; m <= h;
           ++m) {
        if (m === h) {
          if (g > h) {
            if (47 === b.charCodeAt(f + m)) return b.slice(f + m + 1);
            if (0 === m) return b.slice(f + m)
          } else
            e > h && (47 === a.charCodeAt(c + m) ? n = m : 0 === m && (n = 0));
          break
        }
        var r = a.charCodeAt(c + m), q = b.charCodeAt(f + m);
        if (r !== q)
          break;
        else
          47 === r && (n = m)
      }
      e = '';
      for (m = c + n + 1; m <= d; ++m)
        if (m === d || 47 === a.charCodeAt(m))
          e = 0 === e.length ? e + '..' : e + '/..';
      if (0 < e.length) return e + b.slice(f + n);
      f += n;
      47 === b.charCodeAt(f) && ++f;
      return b.slice(f)
    },
    _makeLong: function(a) {
      return a
    },
    dirname: function(a) {
      S(a);
      if (0 === a.length) return '.';
      for (var b = a.charCodeAt(0), c = 47 === b, d = -1, e = !0,
               f = a.length - 1;
           1 <= f; --f)
        if (b = a.charCodeAt(f), 47 === b) {
          if (!e) {
            d = f;
            break
          }
        } else
          e = !1;
      return -1 === d ? c ? '/' : '.' : c && 1 === d ? '//' : a.slice(0, d)
    },
    basename: function(a, b) {
      if (void 0 !== b && 'string' !== typeof b)
        throw new TypeError('"ext" argument must be a string');
      S(a);
      var c = 0, d = -1, e = !0, f;
      if (void 0 !== b && 0 < b.length && b.length <= a.length) {
        if (b.length === a.length && b === a) return '';
        var g = b.length - 1, h = -1;
        for (f = a.length - 1; 0 <= f; --f) {
          var n = a.charCodeAt(f);
          if (47 === n) {
            if (!e) {
              c = f + 1;
              break
            }
          } else
            -1 === h && (e = !1, h = f + 1),
                0 <= g &&
                (n === b.charCodeAt(g) ? -1 === --g && (d = f) :
                                         (g = -1, d = h))
        }
        c === d ? d = h : -1 === d && (d = a.length);
        return a.slice(c, d)
      }
      for (f = a.length - 1; 0 <= f; --f)
        if (47 === a.charCodeAt(f)) {
          if (!e) {
            c = f + 1;
            break
          }
        } else
          -1 === d && (e = !1, d = f + 1);
      return -1 === d ? '' : a.slice(c, d)
    },
    extname: function(a) {
      S(a);
      for (var b = -1, c = 0, d = -1, e = !0, f = 0, g = a.length - 1; 0 <= g;
           --g) {
        var h = a.charCodeAt(g);
        if (47 === h) {
          if (!e) {
            c = g + 1;
            break
          }
        } else
          -1 === d && (e = !1, d = g + 1),
              46 === h ? -1 === b ? b = g : 1 !== f && (f = 1) :
                         -1 !== b && (f = -1)
      }
      return -1 === b || -1 === d || 0 === f ||
              1 === f && b === d - 1 && b === c + 1 ?
          '' :
          a.slice(b, d)
    },
    format: function(a) {
      if (null === a || 'object' !== typeof a)
        throw new TypeError(
            'The "pathObject" argument must be of type Object. Received type ' +
            typeof a);
      var b = a.dir || a.root, c = a.base || (a.name || '') + (a.ext || '');
      a = b ? b === a.root ? b + c : b + '/' + c : c;
      return a
    },
    parse: function(a) {
      S(a);
      var b = {root: '', dir: '', base: '', ext: '', name: ''};
      if (0 === a.length) return b;
      var c = a.charCodeAt(0), d = 47 === c;
      if (d) {
        b.root = '/';
        var e = 1
      } else
        e = 0;
      for (var f = -1, g = 0, h = -1, n = !0, m = a.length - 1, r = 0; m >= e;
           --m)
        if (c = a.charCodeAt(m), 47 === c) {
          if (!n) {
            g = m + 1;
            break
          }
        } else
          -1 === h && (n = !1, h = m + 1),
              46 === c ? -1 === f ? f = m : 1 !== r && (r = 1) :
                         -1 !== f && (r = -1);
      -1 === f || -1 === h || 0 === r || 1 === r && f === h - 1 && f === g + 1 ?
          -1 !== h &&
              (b.base = 0 === g && d ? b.name = a.slice(1, h) :
                                       b.name = a.slice(g, h)) :
          (0 === g && d ? (b.name = a.slice(1, f), b.base = a.slice(1, h)) :
                          (b.name = a.slice(g, f), b.base = a.slice(g, h)),
           b.ext = a.slice(f, h));
      0 < g ? b.dir = a.slice(0, g - 1) : d && (b.dir = '/');
      return b
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null
  },
      Sb = Rb.posix = Rb, Wb = {
        hrtime: function(a) {
          return function(b) {
            b = a(b);
            return 1E9 * b[0] + b[1]
          }
        }(function(a) {
          var b = .001 * performance.now(), c = Math.floor(b) + Pb;
          b = Math.floor(b % 1 * 1E9);
          a && (c -= a[0], b -= a[1], 0 > b && (c--, b += 1E9));
          return [c, b]
        }),
        exit: function(a) {
          throw new Tb(a);
        },
        kill: function(a) {
          throw new Ub(a);
        },
        randomFillSync: Ob,
        isTTY: function() {
          return !0
        },
        path: Sb,
        fs: null
      },
      T, U = k(1), V = k(2), Xb = k(4), Yb = k(8), W = k(16), Zb = k(32),
      X = k(64), $b = k(128), ac = k(256), bc = k(512), cc = k(1024),
      dc = k(2048), ec = k(4096), fc = k(8192), gc = k(16384), kc = k(32768),
      lc = k(65536), mc = k(131072), nc = k(262144), oc = k(524288),
      pc = k(1048576), Y = k(2097152), qc = k(4194304), rc = k(8388608),
      sc = k(16777216), tc = k(33554432), uc = k(67108864), vc = k(134217728),
      wc = k(268435456),
      xc = U | V | Xb | Yb | W | Zb | X | $b | ac | bc | cc | dc | ec | fc |
      gc | kc | lc | mc | nc | oc | pc | Y | rc | qc | sc | uc | tc | vc | wc,
      yc = U | V | Xb | Yb | W | Zb | X | $b | ac | Y | qc | rc | vc, zc = k(0),
      Ac = Yb | W | $b | bc | cc | dc | ec | fc | gc | kc | lc | mc | nc | oc |
      pc | Y | rc | sc | uc | tc | vc,
      Bc = Ac | yc, Cc = V | Yb | X | Y | vc | wc, Dc = V | Yb | X | Y | vc,
      Ec = k(0), Fc = {
        E2BIG: 1,
        EACCES: 2,
        EADDRINUSE: 3,
        EADDRNOTAVAIL: 4,
        EAFNOSUPPORT: 5,
        EALREADY: 7,
        EAGAIN: 6,
        EBADF: 8,
        EBADMSG: 9,
        EBUSY: 10,
        ECANCELED: 11,
        ECHILD: 12,
        ECONNABORTED: 13,
        ECONNREFUSED: 14,
        ECONNRESET: 15,
        EDEADLOCK: 16,
        EDESTADDRREQ: 17,
        EDOM: 18,
        EDQUOT: 19,
        EEXIST: 20,
        EFAULT: 21,
        EFBIG: 22,
        EHOSTDOWN: 23,
        EHOSTUNREACH: 23,
        EIDRM: 24,
        EILSEQ: 25,
        EINPROGRESS: 26,
        EINTR: 27,
        EINVAL: 28,
        EIO: 29,
        EISCONN: 30,
        EISDIR: 31,
        ELOOP: 32,
        EMFILE: 33,
        EMLINK: 34,
        EMSGSIZE: 35,
        EMULTIHOP: 36,
        ENAMETOOLONG: 37,
        ENETDOWN: 38,
        ENETRESET: 39,
        ENETUNREACH: 40,
        ENFILE: 41,
        ENOBUFS: 42,
        ENODEV: 43,
        ENOENT: 44,
        ENOEXEC: 45,
        ENOLCK: 46,
        ENOLINK: 47,
        ENOMEM: 48,
        ENOMSG: 49,
        ENOPROTOOPT: 50,
        ENOSPC: 51,
        ENOSYS: 52,
        ENOTCONN: 53,
        ENOTDIR: 54,
        ENOTEMPTY: 55,
        ENOTRECOVERABLE: 56,
        ENOTSOCK: 57,
        ENOTTY: 59,
        ENXIO: 60,
        EOVERFLOW: 61,
        EOWNERDEAD: 62,
        EPERM: 63,
        EPIPE: 64,
        EPROTO: 65,
        EPROTONOSUPPORT: 66,
        EPROTOTYPE: 67,
        ERANGE: 68,
        EROFS: 69,
        ESPIPE: 70,
        ESRCH: 71,
        ESTALE: 72,
        ETIMEDOUT: 73,
        ETXTBSY: 74,
        EXDEV: 75
      },
      Gc =
          (T = {}, T[6] = 'SIGHUP', T[8] = 'SIGINT', T[11] = 'SIGQUIT',
           T[7] = 'SIGILL', T[15] = 'SIGTRAP', T[0] = 'SIGABRT',
           T[2] = 'SIGBUS', T[5] = 'SIGFPE', T[9] = 'SIGKILL',
           T[20] = 'SIGUSR1', T[12] = 'SIGSEGV', T[21] = 'SIGUSR2',
           T[10] = 'SIGPIPE', T[1] = 'SIGALRM', T[14] = 'SIGTERM',
           T[3] = 'SIGCHLD', T[4] = 'SIGCONT', T[13] = 'SIGSTOP',
           T[16] = 'SIGTSTP', T[17] = 'SIGTTIN', T[18] = 'SIGTTOU',
           T[19] = 'SIGURG', T[23] = 'SIGXCPU', T[24] = 'SIGXFSZ',
           T[22] = 'SIGVTALRM', T),
      Hc = U | V | W | $b | Y | vc, Ic = U | X | W | $b | Y | vc;
  function Jc(a) {
    var b = Math.trunc(a);
    a = k(Math.round(1E3 * (a - b)));
    return k(b) * k(1E3) + a
  }
  function Z(a) {
    return function() {
      for (var b = [], c = 0; c < arguments.length; c++) b[c] = arguments[c];
      try {
        return a.apply(void 0, ea(b))
      } catch (d) {
        if (d && d.code && 'string' === typeof d.code) return Fc[d.code] || 28;
        if (d instanceof Kc) return d.errno;
        throw d;
      }
    }
  }
  function Lc(a, b) {
    var c = a.FD_MAP.get(b);
    if (!c) throw new Kc(8);
    if (void 0 === c.filetype) {
      var d = a.bindings.fs.fstatSync(c.real);
      a = Mc(a, b, d);
      b = a.rightsBase;
      d = a.rightsInheriting;
      c.filetype = a.filetype;
      c.rights || (c.rights = {base: b, inheriting: d})
    }
    return c
  }
  function Mc(a, b, c) {
    switch (!0) {
      case c.isBlockDevice():
        return {filetype: 1, rightsBase: xc, rightsInheriting: xc};
      case c.isCharacterDevice():
        return void 0 !== b && a.bindings.isTTY(b) ?
            {filetype: 2, rightsBase: Dc, rightsInheriting: Ec} :
            {filetype: 2, rightsBase: xc, rightsInheriting: xc};
      case c.isDirectory():
        return {filetype: 3, rightsBase: Ac, rightsInheriting: Bc};
      case c.isFIFO():
        return {filetype: 6, rightsBase: Cc, rightsInheriting: xc};
      case c.isFile():
        return {filetype: 4, rightsBase: yc, rightsInheriting: zc};
      case c.isSocket():
        return {filetype: 6, rightsBase: Cc, rightsInheriting: xc};
      case c.isSymbolicLink():
        return {filetype: 7, rightsBase: k(0), rightsInheriting: k(0)};
      default:
        return {
          filetype: 0, rightsBase: k(0), rightsInheriting: k(0)
        }
    }
  }
  var Kc = function(a) {
    function b(c) {
      var d = a.call(this) || this;
      d.errno = c;
      Object.setPrototypeOf(d, b.prototype);
      return d
    }
    ba(b, a);
    return b
  }(Error), Tb = function(a) {
    function b(c) {
      var d = a.call(this, 'WASI Exit error: ' + c) || this;
      d.code = c;
      Object.setPrototypeOf(d, b.prototype);
      return d
    }
    ba(b, a);
    return b
  }(Error), Ub = function(a) {
    function b(c) {
      var d = a.call(this, 'WASI Kill signal: ' + c) || this;
      d.signal = c;
      Object.setPrototypeOf(d, b.prototype);
      return d
    }
    ba(b, a);
    return b
  }(Error), Nc = function() {
    function a(a) {
      function b(a) {
        switch (a) {
          case 0:
          case 2:
            return r.hrtime();
          case 1:
          case 3:
            return r.hrtime() - Oc;
          default:
            return null
        }
      }
      function d(a, b) {
        a = Lc(g, a);
        if (b !== k(0) && (a.rights.base & b) === k(0)) throw new Kc(63);
        return a
      }
      function e(a, b) {
        g.refreshMemory();
        return Array.from({length: b}, function(b, c) {
          c = a + 8 * c;
          b = g.view.getUint32(c, !0);
          c = g.view.getUint32(c + 4, !0);
          return new Uint8Array(g.memory.buffer, b, c)
        })
      }
      var f, g = this, h = {};
      a&& a.preopens ? h = a.preopens :
                       a && a.preopenDirectories && (h = a.preopenDirectories);
      var n = {};
      a && a.env && (n = a.env);
      var m = [];
      a && a.args && (m = a.args);
      var r = Wb;
      a && a.bindings && (r = a.bindings);
      this.view = this.memory = void 0;
      this.bindings = r;
      this.FD_MAP = new Map([
        [
          0, {
            real: 0,
            filetype: 2,
            rights: {base: Hc, inheriting: k(0)},
            path: void 0
          }
        ],
        [
          1, {
            real: 1,
            filetype: 2,
            rights: {base: Ic, inheriting: k(0)},
            path: void 0
          }
        ],
        [
          2, {
            real: 2,
            filetype: 2,
            rights: {base: Ic, inheriting: k(0)},
            path: void 0
          }
        ]
      ]);
      var q = this.bindings.fs, x = this.bindings.path;
      try {
        for (var Ea = ca(Object.entries(h)), la = Ea.next(); !la.done;
             la = Ea.next()) {
          var Vb = da(la.value, 2), Pc = Vb[0], hc = Vb[1],
              Qc = q.openSync(hc, q.constants.O_RDONLY),
              Rc = ea(this.FD_MAP.keys()).reverse()[0] + 1;
          this.FD_MAP.set(Rc, {
            real: Qc,
            filetype: 3,
            rights: {base: Ac, inheriting: Bc},
            fakePath: Pc,
            path: hc
          })
        }
      } catch (v) {
        var ic = { error: v }
      } finally {
        try {
          la && !la.done && (f = Ea.return ) && f.call(Ea)
        } finally {
          if (ic) throw ic.error;
        }
      }
      var Oc = r.hrtime();
      this.wasiImport = {
        args_get: function(a, b) {
          g.refreshMemory();
          var c = a, d = b;
          m.forEach(function(a) {
            g.view.setUint32(c, d, !0);
            c += 4;
            d += D.from(g.memory.buffer).write(a + '\x00', d)
          });
          return 0
        },
        args_sizes_get: function(a, b) {
          g.refreshMemory();
          g.view.setUint32(a, m.length, !0);
          a = m.reduce(function(a, b) {
            return a + D.byteLength(b) + 1
          }, 0);
          g.view.setUint32(b, a, !0);
          return 0
        },
        environ_get: function(a, b) {
          g.refreshMemory();
          var c = a, d = b;
          Object.entries(n).forEach(function(a) {
            var b = da(a, 2);
            a = b[0];
            b = b[1];
            g.view.setUint32(c, d, !0);
            c += 4;
            d += D.from(g.memory.buffer).write(a + '=' + b + '\x00', d)
          });
          return 0
        },
        environ_sizes_get: function(a, b) {
          g.refreshMemory();
          var c = Object.entries(n).map(function(a) {
            a = da(a, 2);
            return a[0] + '=' + a[1] + '\x00'
          }),
              d = c.reduce(function(a, b) {
                return a + D.byteLength(b)
              }, 0);
          g.view.setUint32(a, c.length, !0);
          g.view.setUint32(b, d, !0);
          return 0
        },
        clock_res_get: function(a, b) {
          g.view.setBigUint64(b, k(0));
          return 0
        },
        clock_time_get: function(a, c, d) {
          g.refreshMemory();
          a = b(a);
          if (null === a) return 28;
          g.view.setBigUint64(d, k(a), !0);
          return 0
        },
        fd_advise: Z(function(a) {
          d(a, $b);
          return 52
        }),
        fd_allocate: Z(function(a) {
          d(a, ac);
          return 52
        }),
        fd_close: Z(function(a) {
          var b = d(a, k(0));
          q.closeSync(b.real);
          g.FD_MAP.delete(a);
          return 0
        }),
        fd_datasync: function(a) {
          a = d(a, U);
          q.fdatasyncSync(a.real);
          return 0
        },
        fd_fdstat_get: Z(function(a, b) {
          a = d(a, k(0));
          g.refreshMemory();
          g.view.setUint8(b, a.filetype);
          g.view.setUint16(b + 2, 0, !0);
          g.view.setUint16(b + 4, 0, !0);
          g.view.setBigUint64(b + 8, k(a.rights.base), !0);
          g.view.setBigUint64(b + 8 + 8, k(a.rights.inheriting), !0);
          return 0
        }),
        fd_fdstat_set_flags: Z(function(a) {
          d(a, Yb);
          return 52
        }),
        fd_fdstat_set_rights: Z(function(a, b, c) {
          a = d(a, k(0));
          b |= a.rights.base;
          if (b > a.rights.base) return 63;
          c |= a.rights.inheriting;
          if (c > a.rights.inheriting) return 63;
          a.rights.base = b;
          a.rights.inheriting = c;
          return 0
        }),
        fd_filestat_get: Z(function(a, b) {
          a = d(a, Y);
          var c = q.fstatSync(a.real);
          g.refreshMemory();
          g.view.setBigUint64(b, k(c.dev), !0);
          b += 8;
          g.view.setBigUint64(b, k(c.ino), !0);
          b += 8;
          g.view.setUint8(b, a.filetype);
          b += 4;
          g.view.setUint32(b, Number(c.nlink), !0);
          b += 4;
          g.view.setBigUint64(b, k(c.size), !0);
          b += 8;
          g.view.setBigUint64(b, Jc(c.atimeMs), !0);
          b += 8;
          g.view.setBigUint64(b, Jc(c.mtimeMs), !0);
          g.view.setBigUint64(b + 8, Jc(c.ctimeMs), !0);
          return 0
        }),
        fd_filestat_set_size: Z(function(a, b) {
          a = d(a, qc);
          q.ftruncate(a.real, Number(b));
          return 0
        }),
        fd_filestat_set_times: Z(function(a, c, e, g) {
          a = d(a, rc);
          var f = b(2);
          q.futimesSync(a.real, 2 === (g & 2) ? f : c, 8 === (g & 8) ? f : e);
          return 0
        }),
        fd_prestat_get: Z(function(a, b) {
          a = d(a, k(0));
          if (!a.path) return 28;
          g.refreshMemory();
          g.view.setUint8(b, 0);
          g.view.setUint32(b + 4, D.byteLength(a.fakePath), !0);
          return 0
        }),
        fd_prestat_dir_name: Z(function(a, b, c) {
          a = d(a, k(0));
          if (!a.path) return 28;
          g.refreshMemory();
          D.from(g.memory.buffer).write(a.fakePath, b, c, 'utf8');
          return 0
        }),
        fd_pwrite: Z(function(a, b, c, f, h) {
          var v = d(a, X | Xb), t = 0;
          e(b, c).forEach(function(a) {
            for (var b = 0; b < a.byteLength;)
              b += q.writeSync(v.real, a, b, a.byteLength - b, f + t + b);
            t += b
          });
          g.view.setUint32(h, t, !0);
          return 0
        }),
        fd_write: Z(function(a, b, c, f) {
          var v = d(a, X), h = 0;
          e(b, c).forEach(function(a) {
            for (var b = 0; b < a.byteLength;) {
              var c = q.writeSync(
                  v.real, a, b, a.byteLength - b,
                  v.offset ? Number(v.offset) : null);
              v.offset && (v.offset += k(c));
              b += c
            }
            h += b
          });
          g.view.setUint32(f, h, !0);
          return 0
        }),
        fd_pread: Z(function(a, b, c, f, h) {
          var v = d(a, V | Xb), t = 0;
          e(b, c).forEach(function(a) {
            for (var b = 0; b < a.byteLength;)
              b += q.readSync(v.real, a, b, a.byteLength - b, f + t + b);
            t += b
          });
          g.view.setUint32(h, t, !0);
          return 0
        }),
        fd_read: Z(function(a, b, c, f) {
          var v;
          a = d(a, V);
          var h = 0 === a.real, t = 0;
          try {
            var n = ca(e(b, c)), m = n.next();
            a: for (; !m.done; m = n.next()) {
              var lb = m.value;
              for (b = 0; b < lb.byteLength;) {
                var r = lb.byteLength - b,
                    K = q.readSync(
                        a.real, lb, b, r,
                        h || void 0 === a.offset ? null : Number(a.offset));
                h || (a.offset = (a.offset ? a.offset : k(0)) + k(K));
                b += K;
                t += K;
                if (0 === K || K < r) break a
              }
            }
          } catch (Sc) {
            var x = { error: Sc }
          } finally {
            try {
              m && !m.done && (v = n.return ) && v.call(n)
            } finally {
              if (x) throw x.error;
            }
          }
          g.view.setUint32(f, t, !0);
          return 0
        }),
        fd_readdir: Z(function(a, b, c, e, f) {
          a = d(a, gc);
          g.refreshMemory();
          var v = q.readdirSync(a.path, {withFileTypes: !0}), h = b;
          for (e = Number(e); e < v.length; e += 1) {
            var n = v[e], t = D.byteLength(n.name);
            g.view.setBigUint64(b, k(e + 1), !0);
            b += 8;
            var m = q.statSync(x.resolve(a.path, n.name));
            g.view.setBigUint64(b, k(m.ino), !0);
            b += 8;
            g.view.setUint32(b, t, !0);
            b += 4;
            switch (!0) {
              case m.isBlockDevice():
                m = 1;
                break;
              case m.isCharacterDevice():
                m = 2;
                break;
              case m.isDirectory():
                m = 3;
                break;
              case m.isFIFO():
                m = 6;
                break;
              case m.isFile():
                m = 4;
                break;
              case m.isSocket():
                m = 6;
                break;
              case m.isSymbolicLink():
                m = 7;
                break;
              default:
                m = 0
            }
            g.view.setUint8(b, m);
            b += 1;
            b += 3;
            if (b + t >= h + c) break;
            D.from(g.memory.buffer).write(n.name, b);
            b += D.byteLength(n.name)
          }
          g.view.setUint32(f, b - h, !0);
          return 0
        }),
        fd_renumber: Z(function(a, b) {
          d(a, k(0));
          d(b, k(0));
          q.closeSync(g.FD_MAP.get(a).real);
          g.FD_MAP.set(a, g.FD_MAP.get(b));
          g.FD_MAP.delete(b);
          return 0
        }),
        fd_seek: Z(function(a, b, c, e) {
          a = d(a, Xb);
          g.refreshMemory();
          switch (c) {
            case 0:
              a.offset = (a.offset ? a.offset : k(0)) + k(b);
              break;
            case 1:
              c = q.fstatSync(a.real).size;
              a.offset = k(c) + k(b);
              break;
            case 2:
              a.offset = k(b)
          }
          g.view.setBigUint64(e, a.offset, !0);
          return 0
        }),
        fd_tell: Z(function(a, b) {
          a = d(a, Zb);
          g.refreshMemory();
          a.offset || (a.offset = k(0));
          g.view.setBigUint64(b, a.offset, !0);
          return 0
        }),
        fd_sync: Z(function(a) {
          a = d(a, W);
          q.fsyncSync(a.real);
          return 0
        }),
        path_create_directory: Z(function(a, b, c) {
          a = d(a, bc);
          if (!a.path) return 28;
          g.refreshMemory();
          b = D.from(g.memory.buffer, b, c).toString();
          q.mkdirSync(x.resolve(a.path, b));
          return 0
        }),
        path_filestat_get: Z(function(a, b, c, e, f) {
          a = d(a, nc);
          if (!a.path) return 28;
          g.refreshMemory();
          c = D.from(g.memory.buffer, c, e).toString();
          c = q.statSync(x.resolve(a.path, c));
          g.view.setBigUint64(f, k(c.dev), !0);
          f += 8;
          g.view.setBigUint64(f, k(c.ino), !0);
          f += 8;
          g.view.setUint8(f, Mc(g, void 0, c).filetype);
          f += 4;
          g.view.setUint32(f, Number(c.nlink), !0);
          f += 4;
          g.view.setBigUint64(f, k(c.size), !0);
          f += 8;
          g.view.setBigUint64(f, Jc(c.atimeMs), !0);
          f += 8;
          g.view.setBigUint64(f, Jc(c.mtimeMs), !0);
          g.view.setBigUint64(f + 8, Jc(c.ctimeMs), !0);
          return 0
        }),
        path_filestat_set_times: Z(function(a, c, e, f, h, n) {
          a = d(a, pc);
          if (!a.path) return 28;
          g.refreshMemory();
          var m = b(2), v = 2 === (c & 2);
          c = 8 === (c & 8);
          e = D.from(g.memory.buffer, e, f).toString();
          q.utimesSync(x.resolve(a.path, e), v ? m : h, c ? m : n);
          return 0
        }),
        path_link: Z(function(a, b, c, e, f, h, m) {
          a = d(a, dc);
          f = d(f, ec);
          if (!a.path || !f.path) return 28;
          g.refreshMemory();
          c = D.from(g.memory.buffer, c, e).toString();
          h = D.from(g.memory.buffer, h, m).toString();
          q.linkSync(x.resolve(a.path, c), x.resolve(f.path, h));
          return 0
        }),
        path_open: Z(function(a, b, c, e, f, h, m, n, r) {
          b = d(a, fc);
          h = k(h);
          m = k(m);
          a = (h & (V | gc)) !== k(0);
          var v = (h & (U | X | ac | qc)) !== k(0);
          if (v && a)
            var t = q.constants.O_RDWR;
          else
            a ? t = q.constants.O_RDONLY : v && (t = q.constants.O_WRONLY);
          a = h | fc;
          h |= m;
          0 !== (f & 1) && (t |= q.constants.O_CREAT, a |= cc);
          0 !== (f & 2) && (t |= q.constants.O_DIRECTORY);
          0 !== (f & 4) && (t |= q.constants.O_EXCL);
          0 !== (f & 8) && (t |= q.constants.O_TRUNC, a |= oc);
          0 !== (n & 1) && (t |= q.constants.O_APPEND);
          0 !== (n & 2) &&
              (t = q.constants.O_DSYNC ? t | q.constants.O_DSYNC :
                                         t | q.constants.O_SYNC,
               h |= U);
          0 !== (n & 4) && (t |= q.constants.O_NONBLOCK);
          0 !== (n & 8) &&
              (t = q.constants.O_RSYNC ? t | q.constants.O_RSYNC :
                                         t | q.constants.O_SYNC,
               h |= W);
          0 !== (n & 16) && (t |= q.constants.O_SYNC, h |= W);
          v && 0 === (t & (q.constants.O_APPEND | q.constants.O_TRUNC)) &&
              (h |= Xb);
          g.refreshMemory();
          c = D.from(g.memory.buffer, c, e).toString();
          c = x.resolve(b.path, c);
          if (x.relative(b.path, c).startsWith('..')) return 76;
          try {
            var K = q.realpathSync(c);
            if (x.relative(b.path, K).startsWith('..')) return 76
          } catch (jc) {
            if ('ENOENT' === jc.code)
              K = c;
            else
              throw jc;
          }
          t = q.openSync(K, t);
          c = ea(g.FD_MAP.keys()).reverse()[0] + 1;
          g.FD_MAP.set(c, {
            real: t,
            filetype: void 0,
            rights: {base: a, inheriting: h},
            path: K
          });
          Lc(g, c);
          g.view.setUint32(r, c, !0);
          return 0
        }),
        path_readlink: Z(function(a, b, c, e, f, h) {
          a = d(a, kc);
          if (!a.path) return 28;
          g.refreshMemory();
          b = D.from(g.memory.buffer, b, c).toString();
          b = x.resolve(a.path, b);
          b = q.readlinkSync(b);
          e = D.from(g.memory.buffer).write(b, e, f);
          g.view.setUint32(h, e, !0);
          return 0
        }),
        path_remove_directory: Z(function(a, b, c) {
          a = d(a, tc);
          if (!a.path) return 28;
          g.refreshMemory();
          b = D.from(g.memory.buffer, b, c).toString();
          q.rmdirSync(x.resolve(a.path, b));
          return 0
        }),
        path_rename: Z(function(a, b, c, e, f, h) {
          a = d(a, lc);
          e = d(e, mc);
          if (!a.path || !e.path) return 28;
          g.refreshMemory();
          b = D.from(g.memory.buffer, b, c).toString();
          f = D.from(g.memory.buffer, f, h).toString();
          q.renameSync(x.resolve(a.path, b), x.resolve(e.path, f));
          return 0
        }),
        path_symlink: Z(function(a, b, c, e, f) {
          c = d(c, sc);
          if (!c.path) return 28;
          g.refreshMemory();
          a = D.from(g.memory.buffer, a, b).toString();
          e = D.from(g.memory.buffer, e, f).toString();
          q.symlinkSync(a, x.resolve(c.path, e));
          return 0
        }),
        path_unlink_file: Z(function(a, b, c) {
          a = d(a, uc);
          if (!a.path) return 28;
          g.refreshMemory();
          b = D.from(g.memory.buffer, b, c).toString();
          q.unlinkSync(x.resolve(a.path, b));
          return 0
        }),
        poll_oneoff: function(a, c, d, e) {
          var f = 0, h = 0;
          g.refreshMemory();
          for (var m = 0; m < d; m += 1) {
            var n = g.view.getBigUint64(a, !0);
            a += 8;
            var q = g.view.getUint8(a);
            a += 1;
            switch (q) {
              case 0:
                a += 7;
                g.view.getBigUint64(a, !0);
                a += 8;
                var t = g.view.getUint32(a, !0);
                a += 4;
                a += 4;
                q = g.view.getBigUint64(a, !0);
                a += 8;
                g.view.getBigUint64(a, !0);
                a += 8;
                var v = g.view.getUint16(a, !0);
                a += 2;
                a += 6;
                var x = 1 === v;
                v = 0;
                t = k(b(t));
                null === t ? v = 28 : (q = x ? q : t + q, h = q > h ? q : h);
                g.view.setBigUint64(c, n, !0);
                c += 8;
                g.view.setUint16(c, v, !0);
                c += 2;
                g.view.setUint8(c, 0);
                c += 1;
                c += 5;
                f += 1;
                break;
              case 1:
              case 2:
                a += 3;
                g.view.getUint32(a, !0);
                a += 4;
                g.view.setBigUint64(c, n, !0);
                c += 8;
                g.view.setUint16(c, 52, !0);
                c += 2;
                g.view.setUint8(c, q);
                c += 1;
                c += 5;
                f += 1;
                break;
              default:
                return 28
            }
          }
          for (g.view.setUint32(e, f, !0); r.hrtime() < h;)
            ;
          return 0
        },
        proc_exit: function(a) {
          r.exit(a);
          return 0
        },
        proc_raise: function(a) {
          if (!(a in Gc)) return 28;
          r.kill(Gc[a]);
          return 0
        },
        random_get: function(a, b) {
          g.refreshMemory();
          r.randomFillSync(new Uint8Array(g.memory.buffer), a, b);
          return 0
        },
        sched_yield: function() {
          return 0
        },
        sock_recv: function() {
          return 52
        },
        sock_send: function() {
          return 52
        },
        sock_shutdown: function() {
          return 52
        }
      }
    }
    a.prototype.refreshMemory = function() {
      this.view && 0 !== this.view.buffer.byteLength ||
          (this.view = new ha(this.memory.buffer))
    };
    a.prototype.setMemory = function(a) {
      this.memory = a
    };
    a.prototype.start = function(a) {
      a = a.exports;
      if (null === a || 'object' !== typeof a)
        throw Error('instance.exports must be an Object. Received ' + a + '.');
      var b = a.memory;
      if (!(b instanceof WebAssembly.Memory))
        throw Error(
            'instance.exports.memory must be a WebAssembly.Memory. Recceived ' +
            b + '.');
      this.setMemory(b);
      a._start && a._start()
    };
    a.defaultBindings = Wb;
    return a
  }();
  //export default Nc;
  var WASI = Nc;
  var WASIError = Kc;
  var WASIExitError = Tb;
  var WASIKillError = Ub;

  return Object.assign(exports, {
      "WASI": WASI,
      "WASIError": WASIError,
      "WASIExitError": WASIExitError,
      "WASIKillError": WASIKillError
  })
  //export {WASI, WASIError, WASIExitError, WASIKillError};
});
