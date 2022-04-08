export {
	color as c,
	color,
	argb,
	argb32,
	hsla as hsl,
	hsla,
	hsva as hsv,
	hsva,
	hwba as hwb,
	hwba,
	rgba as rgb,
	rgba,
	rgba32 as rgb32,
	rgba32,
}

import * as utils from './utils.mjs'
import { Color } from './colors.mjs'

function rgba32 (_, r, g, b, a = 0xFF) {
	if (!utils.allOf([r, g, b, a], param => Number.isInteger(param) && param >= 0 && param <= 255)) {
		throw new RangeError('All three or four parameters must be integers between 0 and 255')
	}
	return Qt.rgba(
		r / 0xFF,
		g / 0xFF,
		b / 0xFF,
		a / 0xFF
	)
}

function argb32 (_, a, r, g, b) {
	if (!utils.allOf([a, r, g, b], param => Number.isInteger(param) && param >= 0 && param <= 255)) {
		throw new RangeError('All four parameters must be integers between 0 and 255')
	}
	return Qt.rgba(
		r / 0xFF,
		g / 0xFF,
		b / 0xFF,
		a / 0xFF
	)
}

function rgba (_, r, g, b, a = 1.0) {
	if (!utils.allOf([r, g, b, a], param => typeof param === 'number' && param >= 0.0 && param <= 1.0)) {
		throw new RangeError('All three or four parameters must be numbers between 0.0 and 1.0')
	}
	return Qt.rgba(r, g, b, a)
}

function argb (_, a, r, g, b) {
	if (!utils.allOf([a, r, g, b], param => typeof param === 'number' && param >= 0.0 && param <= 1.0)) {
		throw new RangeError('All four parameters must be numbers between 0.0 and 1.0')
	}
	return Qt.rgba(r, g, b, a)
}

function hsla (_, h, s, l, a = 1.0) {
	if (!utils.allOf([h, s, l, a], param => typeof param === 'number' && param >= 0.0 && param <= 1.0)) {
		throw new RangeError('All three or four parameters must be numbers between 0.0 and 1.0')
	}
	return Qt.hsla(h, s, l, a)
}

function hsva (_, h, s, v, a = 1.0) {
	if (!utils.allOf([h, s, v, a], param => typeof param === 'number' && param >= 0.0 && param <= 1.0)) {
		throw new RangeError('All three or four parameters must be numbers between 0.0 and 1.0')
	}
	return Qt.hsva(h, s, v, a)
}

function hwba (_, h, w, b, a = 1.0) {
	if (!utils.allOf([h, w, b, a], param => typeof param === 'number' && param >= 0.0 && param <= 1.0)) {
		throw new RangeError('All three or four parameters must be numbers between 0.0 and 1.0')
	}
	const v = 1 - b
	const s = 1 - w / v
	return Qt.hsva(h, s, v, a)
}

function qolor(strings, ...params) {
	function zipConcat(a, b) {
		return a.map((e, i) => `${e}${b[i]}`).join('')
	}

	// if called as a function directly
	if (typeof strings === 'string')
		strings = [strings]
	// else if (typeof strings === 'object') {
	// 	return Color.copyObject(strings)
	// }

	const evaluatedString = zipConcat(strings, [...params, ''])
	try {
		return Color.fromString(evaluatedString)
	} catch (error) {
		console.debug(`Matching by string '${evaluatedString}' failed with the error:`, error)
		console.debug('Trying to construct the color as RGBA32')
	}

	try {
		return rgba32(strings, ...params)
	} catch (error) { console.debug(error) }
}

function color(strings, ...params) {
	return new Color(qolor(strings, ...params))
}

console.warn(color`ye${'l'.repeat(2)}ow`);
console.warn(color`#${'7f'}00${'ff'}`);
console.warn(color`#20f`.red * 255);
console.warn(color`${0x20}, ${0x00}, ${0xff}`);
console.warn(color('yel' + 'low'));

console.error(color`red`)
console.error(color`red`.adjust({hsl: { hue: +180 .deg}}))
console.error(color`red`.invert())

console.warn(color`#036`.mix('#d2e1dd', 25 .percent))

console.warn('-----------------')
console.warn(color`#d2e1dd`.scale({hsl: {l: -10 .percent, s: +10 .percent}}))
console.warn('-----------------')
