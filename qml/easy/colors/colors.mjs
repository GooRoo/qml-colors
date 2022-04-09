export {
	alpha,
	blue,
	complement,
	darken,
	desaturate,
	green,
	hue,
	invert,
	lighten,
	lightness,
	mix,
	opacify as fadeIn,
	opacify,
	red,
	saturate,
	saturation,
	transparentize as fadeOut,
	transparentize,
}

import ColorNames from './color-names.mjs'
import * as utils from './utils.mjs'

export class Color {
	static fromString(str) {
		function hexStringToReal(hex) {
			if (typeof hex !== 'string') {
				throw new TypeError('The input argument must be of string type.')
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
					throw new RangeError('The input must be either 1 or 2 hex-digit(s).')
			}
			return Number(`0x${hh}`) / 255
		}

		if (str.startsWith('#')) {
			switch (str.length) {
				case 1 + 3:
				case 1 + 4:
					const re1 = /^#([\dA-Fa-f])?([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])$/
					let [_, a, r, g, b] = str.match(re1)
					a = a ?? 'f'
					return Qt.rgba(
						hexStringToReal(r),
						hexStringToReal(g),
						hexStringToReal(b),
						hexStringToReal(a)
					)

				case 1 + 6:
				case 1 + 8:
					const re2 = /^#([\dA-Fa-f]{2})?([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})$/
					let [__, aa, rr, gg, bb] = str.match(re2)
					aa = aa ?? 'ff'
					return Qt.rgba(
						hexStringToReal(rr),
						hexStringToReal(gg),
						hexStringToReal(bb),
						hexStringToReal(aa)
					)

				default:
					throw new TypeError('The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
					break;
			}
		} else {
			if (str in ColorNames) {
				return ColorNames[str]
			} else {
				throw new TypeError('Unknown color.')
			}
		}
	}

	static copyObject(c) {
		if (typeof c === 'undefined' || typeof c === 'null') {
			return c
		} else if (typeof c === 'string') {
			return Color.fromString(c)
		} else if (typeof c === 'object') {
			const iface = [
				'r', 'g', 'b', 'a',
				'hsvHue', 'hsvSaturation', 'hsvValue',
				'hslHue', 'hslSaturation', 'hslLightness',
				'valid'
			]

			// check if valid and match against interface
			if (c.valid && utils.allOf(iface, prop => c.hasOwnProperty(prop))) {
				return Qt.rgba(c.r, c.g, c.b, c.a)  // new copy
			} else {
				throw new Error('Invalid color')
			}
		} else {
			throw new TypeError("Can't create a color object from the argument")
		}
	}

	constructor (qtColor) {
		this.qtColor = qtColor
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

	get g () { return this.green }
	set g (green) { this.green = green }
	get green () { return this.qtColor.g }
	set green (green) { this.qtColor.g = green }

	get hsvHue () { return this.hue }
	set hsvHue (hue) { this.hue = hue }

	get hsvSaturation () { return this.qtColor.hsvSaturation }
	set hsvSaturation (saturation) { this.qtColor.hsvSaturation = saturation }

	get hsvValue () { return this.qtColor.hsvValue }
	set hsvValue (value) { this.qtColor.hsvValue = value }

	get hue () { return this.qtColor.hslHue }
	set hue (hue) { this.qtColor.hslHue = hue }

	get hwbHue () { return this.hue }
	set hwbHue (hue) { this.hue = hue }

	get lightness () { return this.qtColor.hslLightness }
	set lightness (lightness) { this.qtColor.hslLightness = lightness }

	get r () { return this.red }
	set r (red) { this.red = red }
	get red () { return this.qtColor.r }
	set red (red) { this.qtColor.r = red }

	get saturation () { return this.qtColor.hslSaturation }
	set saturation (saturation) { this.qtColor.hslSaturation = saturation }

	get whiteness () { return (1 - this.hsvSaturation) * this.hsvValue }
	set whiteness (whiteness) {
		const w = whiteness
		const b = blackness()

		this.hsvSaturation = 1 - w / (1 - b)
		this.hsvValue = 1 - b
	}

	adjust (change) {
		let {
			rgb = null,
			hsl = null,
			hsv = null,
			hwb = null,
			alpha = 0.0
		} = change

		this.alpha = utils.clamp(this.alpha + alpha)

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = 0.0, g = 0.0, b = 0.0,
				red = 0.0, green = 0.0, blue = 0.0
			} = rgb
			r = r || red
			g = g || green
			b = b || blue
			this.red = utils.clamp(this.red + r)
			this.green = utils.clamp(this.green + g)
			this.blue = utils.clamp(this.blue + b)
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = 0.0, s = 0.0, l = 0.0,
				hue = 0.0, saturation = 0.0, lightness = 0.0
			} = hsl
			h = h || hue
			s = s || saturation
			l = l || lightness
			this.hue = utils.absmod(this.hue + h, 1.0)
			this.saturation = utils.clamp(this.saturation + s)
			this.lightness = utils.clamp(this.lightness + l)
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = 0.0, s = 0.0, v = 0.0,
				hue = 0.0, saturation = 0.0, value = 0.0
			} = hsv
			h = h || hue
			s = s || saturation
			v = v || value
			this.hsvHue = utils.absmod(this.hsvHue + h, 1.0)
			this.hsvSaturation = utils.clamp(this.hsvSaturation + s)
			this.hsvValue = utils.clamp(this.hsvValue + v)
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = 0.0, w = 0.0, b = 0.0,
				hue = 0.0, whiteness = 0.0, blackness = 0.0
			} = hwb
			h = h || hue
			w = w || whiteness
			b = b || blackness
			this.hue = utils.absmod(this.hue + h, 1.0)
			this.whiteness = utils.clamp(this.whiteness + w)
			this.blackness = utils.clamp(this.blackness + b)
		} else {
			throw new Error("You can't mix RGB, HSL, HSV, and HWB adjustments. Use only one of them")
		}

		return this
	}

	adjustHue (offset) {
		this.hue = utils.absmod(this.hue + offset, 1.0)
		return this
	}

	change (change) {
		let {
			rgb = null,
			hsl = null,
			hsv = null,
			hwb = null,
			alpha = null
		} = change

		if (alpha)
			this.alpha = alpha

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = null, g = null, b = null,
				red = null, green = null, blue = null
			} = rgb
			this.red = r ?? red ?? this.red
			this.green = g ?? green ?? this.green
			this.blue = b ?? blue ?? this.blue
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = null, s = null, l = null,
				hue = null, saturation = null, lightness = null
			} = hsl
			this.hue = h ?? hue ?? this.hue
			this.saturation = s ?? saturation ?? this.saturation
			this.lightness = l ?? lightness ?? this.lightness
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = null, s = null, v = null,
				hue = null, saturation = null, value = null
			} = hsv
			this.hsvHue = h ?? hue ?? this.hsvHue
			this.hsvSaturation = s ?? saturation ?? this.hsvSaturation
			this.hsvValue = v ?? value ?? this.hsvValue
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = null, w = null, b = null,
				hue = null, whiteness = null, blackness = null
			} = hwb
			this.hue = h ?? hue ?? this.hue
			this.whiteness = w ?? whiteness ?? this.whiteness
			this.blackness = b ?? blackness ?? this.blackness
		} else {
			throw new Error("You can't mix RGB, HSL, HSV, and HWB settings. Use only one of them")
		}

		return this
	}

	complement () {
		this.hue = utils.absmod(this.hue - 0.5, 1.0)
		return this
	}

	copy () {
		return new Color(Qt.rgba(this.qtColor.r, this.qtColor.g, this.qtColor.b, this.qtColor.a))
	}

	darken (amount = 0.25) {
		this.lightness = utils.clamp(this.lightness - amount)
		return this
	}

	desaturate (amount = 0.25) {
		this.saturation = utils.clamp(this.saturation - amount)
		return this
	}

	fadeIn (amount = 0.25) {
		return this.opacify(amount)
	}

	fadeOut (amount = 0.25) {
		return this.transparentize(amount)
	}

	grayscale () {
		this.saturation = 0.0
		return this
	}

	invert (weight = 1.0) {
		let c = this.copy()
		c.r = 1.0 - c.r
		c.g = 1.0 - c.g
		c.b = 1.0 - c.b
		return this.mix(c.qtColor, 1.0 - weight) // TODO: @GooRoo - should be this.mix(c, weight) in future
	}

	lighten (amount = 0.25) {
		this.lightness = utils.clamp(this.lightness + amount)
		return this
	}

	mix (color2, weight = 0.5) {
		const c1 = this
		const c2 = Color.copyObject(color2)

		const w = 2 * weight - 1
		const a = c1.a - c2.a

		const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
		const w2 = 1 - w1

		this.qtColor = Qt.rgba(
			w1 * c1.r + w2 * c2.r,
			w1 * c1.g + w2 * c2.g,
			w1 * c1.b + w2 * c2.b,
			c1.a * weight + c2.a * (1 - weight)
		)
		return this
	}

	opacify (amount = 0.25) {
		this.a = utils.clamp(this.a + amount)
		return this
	}

	saturate (amount = 0.25) {
		this.saturation = utils.clamp(this.saturation + amount)
		return this
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
			alpha = 0.0
		} = change

		if (alpha)
			this.alpha = utils.clamp(this.alpha + scaledOffset(this.alpha, alpha))

		if (rgb && !(hsl || hsv || hwb)) {
			let {
				r = 0.0, g = 0.0, b = 0.0,
				red = 0.0, green = 0.0, blue = 0.0
			} = rgb
			r = r || red
			g = g || green
			b = b || blue
			if (r) this.red = utils.clamp(this.red + scaledOffset(this.red, r))
			if (g) this.green = utils.clamp(this.green + scaledOffset(this.green, g))
			if (b) this.blue = utils.clamp(this.blue + scaledOffset(this.blue, b))
		} else if (hsl && !(rgb || hsv || hwb)) {
			let {
				h = 0.0, s = 0.0, l = 0.0,
				hue = 0.0, saturation = 0.0, lightness = 0.0
			} = hsl
			h = h || hue
			s = s || saturation
			l = l || lightness
			if (h) this.hue = utils.clamp(this.hue + scaledOffset(this.hue, h))
			if (s) this.saturation = utils.clamp(this.saturation + scaledOffset(this.saturation, s))
			if (l) this.lightness = utils.clamp(this.lightness + scaledOffset(this.lightness, l))
		} else if (hsv && !(rgb || hsl || hwb)) {
			let {
				h = 0.0, s = 0.0, v = 0.0,
				hue = 0.0, saturation = 0.0, value = 0.0
			} = hsv
			h = h || hue
			s = s || saturation
			v = v || value
			if (h) this.hsvHue = utils.clamp(this.hsvHue + scaledOffset(this.hsvHue, h))
			if (s) this.hsvSaturation = utils.clamp(this.hsvSaturation + scaledOffset(this.hsvSaturation, s))
			if (v) this.hsvValue = utils.clamp(this.hsvValue + scaledOffset(this.hsvValue, v))
		} else if (hwb && !(rgb || hsl || hsv)) {
			let {
				h = 0.0, w = 0.0, b = 0.0,
				hue = 0.0, whiteness = 0.0, blackness = 0.0
			} = hwb
			h = h || hue
			w = w || whiteness
			b = b || blackness
			if (h) this.hue = utils.clamp(this.hue + scaledOffset(this.hue, h))
			if (w) this.whiteness = utils.clamp(this.whiteness + scaledOffset(this.whiteness, w))
			if (b) this.blackness = utils.clamp(this.blackness + scaledOffset(this.blackness, b))
		} else {
			throw new Error("You can't mix RGB, HSL, HSV, and HWB scalings. Use only one of them")
		}

		return this
	}

	transparentize (amount = 0.25) {
		this.a = utils.clamp(this.a - amount)
		return this
	}
}

function adjustHue(c, degrees) {

}

function alpha(color) {
	let c = Color.copyObject(color)
	return c.a
}

function blackness(c) {

}

function blue(color) {
	let c = Color.copyObject(color)
	return c.b
}

function change(c) {

}

function complement(color) {
	let c = Color.copyObject(color)
	c.hslHue = utils.absmod(c.hslHue - 0.5, 1.0)
	return c
}

function darken(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.hslLightness = utils.clamp(c.hslLightness - amount)
	return c
}

function desaturate(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.hslSaturation = utils.clamp(c.hslSaturation - amount)
	return c
}

function grayscale(c) {

}

function green(color) {
	let c = Color.copyObject(color)
	return c.g
}

function hue(color) {
	let c = Color.copyObject(color)
	return c.hslHue
}

function hwb(hue, whiteness, blackness, alpha) {

}

function invert(color, weight = 1.0) {
	let c = Color.copyObject(color)
	c.r = 1.0 - c.r
	c.g = 1.0 - c.g
	c.b = 1.0 - c.b
	return mix(c, color, weight)
}

function lighten(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.hslLightness = utils.clamp(c.hslLightness + amount)
	return c
}

function lightness(color) {
	let c = Color.copyObject(color)
	return c.hslLightness
}

function mix(color1, color2, weight = 0.5) {
	const c1 = Color.copyObject(color1)
	const c2 = Color.copyObject(color2)

	const w = 2 * weight - 1
	const a = c1.a - c2.a

	const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
	const w2 = 1 - w1

	return Qt.rgba(
		w1 * c1.r + w2 * c2.r,
		w1 * c1.g + w2 * c2.g,
		w1 * c1.b + w2 * c2.b,
		c1.a * weight + c2.a * (1 - weight)
	)
}

function opacify(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.a = utils.clamp(c.a + amount)
	return c
}

function red(color) {
	let c = Color.copyObject(color)
	return c.r
}

function saturate(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.hslSaturation = utils.clamp(c.hslSaturation + amount)
	return c
}

function saturation(color) {
	let c = Color.copyObject(color)
	return c.hslSaturation
}

function scale(c) {

}

function transparentize(color, amount = 0.25) {
	let c = Color.copyObject(color)
	c.a = utils.clamp(c.a - amount)
	return c
}

function whiteness(c) {

}
