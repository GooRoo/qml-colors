export {
	color as c,
	color,
	qolor as q,
	qolor,

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
import { Color, Qolor } from './colors.mjs'

function checkArgsNumber (from, to, ...params) {
	const nonEmpty = params.reduce(
		(acc, param) => acc + (typeof param !== 'undefined'),
		0
	)

	if (from > to) {
		;[from, to] = [to, from]
	}

	const fromTo = from !== to? `from ${from} to ${to}` : from
	if (nonEmpty < from) {
		throw new TypeError(`Insufficient number of arguments. The function takes ${fromTo}. You provided only ${nonEmpty}.`)
	}
}

function checkTypes (type, typeStr, ...params) {
	const valid = utils.allOf(params, param => {
		if (typeof type === 'function') {
			return type(param)
		} else {
			return typeof param == type
		}
	})
	if (!valid) {
		throw new TypeError(`All parameters must be ${typeStr}.`)
	}
}

function checkRanges ([min, max], ...params) {
	const valid = utils.allOf(params, param => param >= min && param <= max)
	if (!valid) {
		throw new RangeError(`All parameters must be within [${min}; ${max}] range.`)
	}
}

function rgba32 (_, r, g, b, a = 0xFF) {
	checkArgsNumber(3, 4, r, g, b)
	checkTypes('number', 'integers', r, g, b, a)
	checkRanges([0, 255], r, g, b, a)
	return Qt.rgba(
		r / 0xFF,
		g / 0xFF,
		b / 0xFF,
		a / 0xFF
	)
}

function argb32 (_, a, r, g, b) {
	checkArgsNumber(4, 4, a, r, g, b)
	checkTypes('number', 'integers', a, r, g, b)
	checkRanges([0, 255], a, r, g, b)
	return Qt.rgba(
		r / 0xFF,
		g / 0xFF,
		b / 0xFF,
		a / 0xFF
	)
}

function rgba (_, r, g, b, a = 1.0) {
	checkArgsNumber(3, 4, r, g, b)
	checkTypes('number', 'numbers', r, g, b, a)
	checkRanges([0.0, 1.0], r, g, b, a)
	return Qt.rgba(r, g, b, a)
}

function argb (_, a, r, g, b) {
	checkArgsNumber(4, 4, a, r, g, b)
	checkTypes('number', 'numbers', a, r, g, b)
	checkRanges([0.0, 1.0], a, r, g, b)
	return Qt.rgba(r, g, b, a)
}

function hsla (_, h, s, l, a = 1.0) {
	checkArgsNumber(3, 4, h, s, l)
	checkTypes('number', 'numbers', h, s, l, a)
	checkRanges([0.0, 1.0], h, s, l, a)
	return Qt.hsla(h, s, l, a)
}

function hsva (_, h, s, v, a = 1.0) {
	checkArgsNumber(3, 4, h, s, v)
	checkTypes('number', 'numbers', h, s, v, a)
	checkRanges([0.0, 1.0], h, s, v, a)
	return Qt.hsva(h, s, v, a)
}

function hwba (_, h, w, b, a = 1.0) {
	checkArgsNumber(3, 4, h, w, b)
	checkTypes('number', 'numbers', h, w, b, a)
	checkRanges([0.0, 1.0], h, w, b, a)
	const v = 1 - b
	const s = 1 - w / v
	return Qt.hsva(h, s, v, a)
}

function qolor(strings, ...params) {
	function zipConcat(a, b) {
		return a.map((e, i) => `${e}${b[i]}`).join('')
	}

	// if called as a function directly
	if (typeof strings === 'string') {
		strings = [strings]
	}
	// else if (typeof strings === 'object') {
	// 	return Color.copyObject(strings)
	// }

	const evaluatedString = zipConcat(strings, [...params, ''])
	try {
		return Qolor.fromString(evaluatedString)
	} catch (error) {
		console.debug(`Matching by string '${evaluatedString}' failed with the error:`, error)
		console.debug('Trying to construct the color as RGBA32')
	}

	try {
		if (params.length > 3) {
			return argb32(strings, ...params)
		} else {
			return rgba32(strings, ...params)
		}
	} catch (error) { console.debug(error) }
}

function color(strings, ...params) {
	return new Color(qolor(strings, ...params))
}

// console.error(color`red`)
// console.error(color`red`.adjust({hsl: { hue: +180 .deg}}))
// console.error(color`red`.invert())

// console.warn(color`#036`.mix('#d2e1dd', 25 .percent))

// console.warn('-----------------')
// console.warn(color`#d2e1dd`.scale({hsl: {l: -10 .percent, s: +10 .percent}}))
// console.warn('-----------------')
