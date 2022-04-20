export { Qolor, Color }

import ColorNames from './color-names.mjs'
import * as utils from './utils.mjs'

class Qolor {
	static hexStringToReal(hex) {
		if (typeof hex !== 'string') {
			throw new TypeError('The input argument must be of string type.')
		} else if (!hex.match(/^[\dA-Fa-f]{1,2}$/)) {
			throw new RangeError('The input must be either 1 or 2 hex-digit(s).')
		}

		let hh
		switch (hex.length) {
			case 1:
				hh = hex.repeat(2)
				break
			case 2:
				hh = hex
				break
			default:
				throw new Error('This should never happen.')
		}
		return Number(`0x${hh}`) / 255
	}

	static fromString(str) {
		if (str.startsWith('#')) {
			switch (str.length) {
				case 1 + 3:
				case 1 + 4:
					const re1 = /^#([\dA-Fa-f])?([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])$/
					let [_, a, r, g, b] = str.match(re1)
					a = a ?? 'f'
					return Qt.rgba(
						Qolor.hexStringToReal(r),
						Qolor.hexStringToReal(g),
						Qolor.hexStringToReal(b),
						Qolor.hexStringToReal(a)
					)

				case 1 + 6:
				case 1 + 8:
					const re2 = /^#([\dA-Fa-f]{2})?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/
					let [__, aa, rr, gg, bb] = str.match(re2)
					aa = aa ?? 'ff'
					return Qt.rgba(
						Qolor.hexStringToReal(rr),
						Qolor.hexStringToReal(gg),
						Qolor.hexStringToReal(bb),
						Qolor.hexStringToReal(aa)
					)

				default:
					throw new TypeError('The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
			}
		} else {
			if (str in ColorNames) {
				return ColorNames[str]
			} else {
				throw new TypeError('Unknown color.')
			}
		}
	}

	static copy(c) {
		if (typeof c === 'undefined' || c === null) {
			return c
		} else if (typeof c === 'string') {
			return Qolor.fromString(c)
		} else if (typeof c === 'object') {
			// check if valid and match against interface
			if (utils.isQtColorCompatible(c) && c.valid) {
				return Qt.rgba(c.r, c.g, c.b, c.a)  // new copy
			} else {
				throw new TypeError('Invalid color.')
			}
		} else {
			throw new TypeError("Can't create a color object from the argument.")
		}
	}
}

class Color {
	constructor (qtColor) {
		this.qtColor = qtColor
	}

	copy () {
		return new Color(Qolor.copy(this.qtColor))
	}

	static createCopy(c) {
		if (c instanceof Color) {
			return c.copy()
		} else {
			return new Color(Qolor.copy(c))
		}
	}

	toString () {
		return typeof this.qtColor !== 'undefined'? this.qtColor.toString() : this.qtColor
	}

	valueOf () {
		return this.qtColor
	}

	get a () { return this.alpha }
	set a (alpha) { this.alpha = alpha }
	get alpha () { return this.qtColor.a }
	set alpha (alpha) { this.qtColor.a = alpha }

	get blackness () { return 1 - this.hsvValue }
	set blackness (blackness) {
		const w = this.whiteness
		const b = blackness

		this.hsvSaturation = 1 - w / (1 - b)
		this.hsvValue = 1 - b
	}

	get b () { return this.blue }
	set b (blue) { this.blue = blue }
	get blue () { return this.qtColor.b }
	set blue (blue) { this.qtColor.b = blue }

	get color () { return this.qtColor }

	get g () { return this.green }
	set g (green) { this.green = green }
	get green () { return this.qtColor.g }
	set green (green) { this.qtColor.g = green }

	get hslHue () { return this.hue }
	set hslHue (hue) { this.hue = hue }

	get hslSaturation () { return this.saturation }
	set hslSaturation (saturation) { this.saturation = saturation }

	get hslLightness () { return this.lightness }
	set hslLightness (lightness) { this.lightness = lightness }

	get hsvHue () { return this.hue }
	set hsvHue (hue) { this.hue = hue }

	get hsvSaturation () { return this.qtColor.hsvSaturation }
	set hsvSaturation (saturation) { this.qtColor.hsvSaturation = saturation }

	get hsvValue () { return this.qtColor.hsvValue }
	set hsvValue (value) { this.qtColor.hsvValue = value }

	get hue () { return this.qtColor.hslHue }
	set hue (hue) { this.qtColor.hslHue = hue }

	get hwbBlackness () { return this.blackness }
	set hwbBlackness (blackness) { this.blackness = blackness }

	get hwbHue () { return this.hue }
	set hwbHue (hue) { this.hue = hue }

	get hwbWhiteness () { return this.whiteness }
	set hwbWhiteness (whiteness) { this.whiteness = whiteness }

	get lightness () { return this.qtColor.hslLightness }
	set lightness (lightness) { this.qtColor.hslLightness = lightness }

	get qolor () { return this.color }

	get r () { return this.red }
	set r (red) { this.red = red }
	get red () { return this.qtColor.r }
	set red (red) { this.qtColor.r = red }

	get rgb () { return Qt.rgba(this.r, this.g, this.b, 1.0) }

	get saturation () { return this.qtColor.hslSaturation }
	set saturation (saturation) { this.qtColor.hslSaturation = saturation }

	get valid () { return this.qtColor.valid }

	get whiteness () { return (1 - this.hsvSaturation) * this.hsvValue }
	set whiteness (whiteness) {
		const w = whiteness
		const b = this.blackness

		this.hsvSaturation = 1 - w / (1 - b)
		this.hsvValue = 1 - b
	}

	adjust (change) {
		let {
			rgb = null,
			hsl = null,
			hsv = null,
			hwb = null,
			alpha = 0.0,
			a = 0.0
		} = change
		alpha = alpha || a

		let cc = this.copy()

		cc.alpha = utils.clamp(cc.alpha + alpha)

		if (!rgb && !hsl && !hsv && !hwb) {
			return cc
		}

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = 0.0, g = 0.0, b = 0.0,
				red = 0.0, green = 0.0, blue = 0.0
			} = rgb
			r = r || red
			g = g || green
			b = b || blue
			cc.red = utils.clamp(cc.red + r)
			cc.green = utils.clamp(cc.green + g)
			cc.blue = utils.clamp(cc.blue + b)
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = 0.0, s = 0.0, l = 0.0,
				hue = 0.0, saturation = 0.0, lightness = 0.0
			} = hsl
			h = h || hue
			s = s || saturation
			l = l || lightness
			cc.hue = utils.absmod(cc.hue + h, 1.0)
			cc.saturation = utils.clamp(cc.saturation + s)
			cc.lightness = utils.clamp(cc.lightness + l)
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = 0.0, s = 0.0, v = 0.0,
				hue = 0.0, saturation = 0.0, value = 0.0
			} = hsv
			h = h || hue
			s = s || saturation
			v = v || value
			cc.hsvHue = utils.absmod(cc.hsvHue + h, 1.0)
			cc.hsvSaturation = utils.clamp(cc.hsvSaturation + s)
			cc.hsvValue = utils.clamp(cc.hsvValue + v)
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = 0.0, w = 0.0, b = 0.0,
				hue = 0.0, whiteness = 0.0, blackness = 0.0
			} = hwb
			h = h || hue
			w = w || whiteness
			b = b || blackness
			cc.hue = utils.absmod(cc.hue + h, 1.0)
			cc.whiteness = utils.clamp(cc.whiteness + w)
			cc.blackness = utils.clamp(cc.blackness + b)
		} else {
			throw new TypeError("You can't mix RGB, HSL, HSV, and HWB adjustments. Use only one of them.")
		}

		return cc
	}

	adjustHue (offset) {
		let cc = this.copy()
		cc.hue = utils.absmod(cc.hue + offset, 1.0)
		return cc
	}

	change (change) {
		let {
			rgb = null,
			hsl = null,
			hsv = null,
			hwb = null,
			alpha = null,
			a = null
		} = change
		alpha = alpha ?? a

		let cc = this.copy()

		if (alpha) {
			cc.alpha = alpha
		}

		if (!rgb && !hsl && !hsv && !hwb) {
			return cc
		}

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = null, g = null, b = null,
				red = null, green = null, blue = null
			} = rgb
			cc.red = r ?? red ?? cc.red
			cc.green = g ?? green ?? cc.green
			cc.blue = b ?? blue ?? cc.blue
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = null, s = null, l = null,
				hue = null, saturation = null, lightness = null
			} = hsl
			cc.hue = h ?? hue ?? cc.hue
			cc.saturation = s ?? saturation ?? cc.saturation
			cc.lightness = l ?? lightness ?? cc.lightness
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = null, s = null, v = null,
				hue = null, saturation = null, value = null
			} = hsv
			cc.hsvHue = h ?? hue ?? cc.hsvHue
			cc.hsvSaturation = s ?? saturation ?? cc.hsvSaturation
			cc.hsvValue = v ?? value ?? cc.hsvValue
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = null, w = null, b = null,
				hue = null, whiteness = null, blackness = null
			} = hwb
			cc.hue = h ?? hue ?? cc.hue
			cc.whiteness = w ?? whiteness ?? cc.whiteness
			cc.blackness = b ?? blackness ?? cc.blackness
		} else {
			throw new TypeError("You can't mix RGB, HSL, HSV, and HWB settings. Use only one of them.")
		}

		return cc
	}

	complement () {
		let cc = this.copy()
		cc.hue = utils.absmod(cc.hue - 0.5, 1.0)
		return cc
	}

	darken (amount = 0.25) {
		let cc = this.copy()
		cc.lightness = utils.clamp(cc.lightness - amount)
		return cc
	}

	desaturate (amount = 0.25) {
		let cc = this.copy()
		cc.saturation = utils.clamp(cc.saturation - amount)
		return cc
	}

	fadeIn (amount = 0.25) {
		return this.opacify(amount)
	}

	fadeOut (amount = 0.25) {
		return this.transparentize(amount)
	}

	grayscale () {
		let cc = this.copy()
		cc.saturation = 0.0
		return cc
	}

	greyscale () {
		return this.grayscale()
	}

	invert (weight = 1.0) {
		let cc = this.copy()
		cc.r = 1.0 - cc.r
		cc.g = 1.0 - cc.g
		cc.b = 1.0 - cc.b
		return cc.mix(this.qtColor, weight)
	}

	lighten (amount = 0.25) {
		let cc = this.copy()
		cc.lightness = utils.clamp(cc.lightness + amount)
		return cc
	}

	mix (color2, weight = 0.5) {
		const c1 = this
		const c2 = Color.createCopy(color2)

		const w = 2 * weight - 1
		const a = c1.a - c2.a

		const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
		const w2 = 1 - w1

		return new Color(Qt.rgba(
			w1 * c1.r + w2 * c2.r,
			w1 * c1.g + w2 * c2.g,
			w1 * c1.b + w2 * c2.b,
			c1.a * weight + c2.a * (1 - weight)
		))
	}

	opacify (amount = 0.25) {
		let cc = this.copy()
		cc.a = utils.clamp(cc.a + amount)
		return cc
	}

	saturate (amount = 0.25) {
		let cc = this.copy()
		cc.saturation = utils.clamp(cc.saturation + amount)
		return cc
	}

	spin (offset) {
		return this.adjustHue(offset)
	}

	scale (change) {
		function scaledOffset(value, offset) {
			return offset * (offset > 0? 1.0 - value : value)
		}

		let {
			rgb = null,
			hsl = null,
			hsv = null,
			hwb = null,
			alpha = 0.0,
			a = 0.0
		} = change
		alpha = alpha || a

		let cc = this.copy()

		if (alpha) {
			cc.alpha = utils.clamp(cc.alpha + scaledOffset(cc.alpha, alpha))
		}

		if (!rgb && !hsl && !hsv && !hwb) {
			return cc
		}

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = 0.0, g = 0.0, b = 0.0,
				red = 0.0, green = 0.0, blue = 0.0
			} = rgb
			r = r || red
			g = g || green
			b = b || blue
			if (r) cc.red = utils.clamp(cc.red + scaledOffset(cc.red, r))
			if (g) cc.green = utils.clamp(cc.green + scaledOffset(cc.green, g))
			if (b) cc.blue = utils.clamp(cc.blue + scaledOffset(cc.blue, b))
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = 0.0, s = 0.0, l = 0.0,
				hue = 0.0, saturation = 0.0, lightness = 0.0
			} = hsl
			h = h || hue
			s = s || saturation
			l = l || lightness
			if (h) cc.hue = utils.clamp(cc.hue + scaledOffset(cc.hue, h))
			if (s) cc.saturation = utils.clamp(cc.saturation + scaledOffset(cc.saturation, s))
			if (l) cc.lightness = utils.clamp(cc.lightness + scaledOffset(cc.lightness, l))
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = 0.0, s = 0.0, v = 0.0,
				hue = 0.0, saturation = 0.0, value = 0.0
			} = hsv
			h = h || hue
			s = s || saturation
			v = v || value
			if (h) cc.hsvHue = utils.clamp(cc.hsvHue + scaledOffset(cc.hsvHue, h))
			if (s) cc.hsvSaturation = utils.clamp(cc.hsvSaturation + scaledOffset(cc.hsvSaturation, s))
			if (v) cc.hsvValue = utils.clamp(cc.hsvValue + scaledOffset(cc.hsvValue, v))
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = 0.0, w = 0.0, b = 0.0,
				hue = 0.0, whiteness = 0.0, blackness = 0.0
			} = hwb
			h = h || hue
			w = w || whiteness
			b = b || blackness
			if (h) cc.hue = utils.clamp(cc.hue + scaledOffset(cc.hue, h))
			if (w) cc.whiteness = utils.clamp(cc.whiteness + scaledOffset(cc.whiteness, w))
			if (b) cc.blackness = utils.clamp(cc.blackness + scaledOffset(cc.blackness, b))
		} else {
			throw new TypeError("You can't mix RGB, HSL, HSV, and HWB scalings. Use only one of them.")
		}

		return cc
	}

	transparentize (amount = 0.25) {
		let cc = this.copy()
		cc.a = utils.clamp(cc.a - amount)
		return cc
	}
}
