export {
	color as cc,
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
	rgba32 as rgb24,
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
	if (typeof _ === 'object' && _ instanceof Array) { // for rgba32`${128}${0}${255}${128}`
		checkArgsNumber(3, 4, r, g, b)
		checkTypes('number', 'integers', r, g, b, a)
		checkRanges([0, 255], r, g, b, a)
		return Qt.rgba(
			r / 0xFF,
			g / 0xFF,
			b / 0xFF,
			a / 0xFF
		)
	} else if (typeof _ === 'string' && !g && !b) {    // for rgba32('#8000ff', 128)
		let [rgb, trueA] = [Qolor.fromString(_), r ?? a]
		return Qt.rgba(
			rgb.r,
			rgb.g,
			rgb.b,
			trueA / 0xFF
		)
	} else if (typeof _ === 'object' && !g && !b) {    // for rgba32(q`#8000ff`, 128)
		let [rgb, trueA] = [_, r ?? a]
		return rgba([], rgb.r, rgb.g, rgb.b, trueA) // calling floating-point variant
	} else {                                           // for rgba(128, 0, 255, 128)
		return rgba32([], _, r, g, b ?? a) // recursive call
	}
}

function argb32 (_, a, r, g, b) {
	if (typeof _ === 'object' && _ instanceof Array) {
		checkArgsNumber(4, 4, a, r, g, b)
		checkTypes('number', 'integers', a, r, g, b)
		checkRanges([0, 255], a, r, g, b)
		return Qt.rgba(
			r / 0xFF,
			g / 0xFF,
			b / 0xFF,
			a / 0xFF
		)
	} else {
		return argb32([], _, a, r, g)
	}
}

function rgba (_, r, g, b, a = 1.0) {
	if (typeof _ === 'object' && _ instanceof Array) {  // for rgba`${0.5}${0}${1}${0.5}`
		checkArgsNumber(3, 4, r, g, b)
		checkTypes('number', 'numbers', r, g, b, a)
		checkRanges([0.0, 1.0], r, g, b, a)
		return Qt.rgba(r, g, b, a)
	} else if (typeof _ === 'string' && !g && !b) {     // for rgba('#8000ff', 0.5)
		let [rgb, trueA] = [Qolor.fromString(_), r ?? a]
		return Qt.rgba(rgb.r, rgb.g, rgb.b, trueA)
	} else if (typeof _ === 'object' && !g && !b) {     // for rgba(q`#8000ff`, 0.5)
		let [rgb, trueA] = [_, r ?? a]
		return rgba([], rgb.r, rgb.g, rgb.b, trueA)
	} else {                                            // for rgba(0.5, 0, 1, 0.5)
		return rgba([], _, r, g, b ?? a)
	}
}

function argb (_, a, r, g, b) {
	if (typeof _ === 'object' && _ instanceof Array) {
		checkArgsNumber(4, 4, a, r, g, b)
		checkTypes('number', 'numbers', a, r, g, b)
		checkRanges([0.0, 1.0], a, r, g, b)
		return Qt.rgba(r, g, b, a)
	} else {
		return argb([], _, a, r, g)
	}
}

function hsla (_, h, s, l, a = 1.0) {
	if (typeof _ === 'object' && _ instanceof Array) {
		checkArgsNumber(3, 4, h, s, l)
		checkTypes('number', 'numbers', h, s, l, a)
		checkRanges([0.0, 1.0], h, s, l, a)
		return Qt.hsla(h, s, l, a)
	} else {
		return hsla([], _, h, s, l ?? a)
	}
}

function hsva (_, h, s, v, a = 1.0) {
	if (typeof _ === 'object' && _ instanceof Array) {
		checkArgsNumber(3, 4, h, s, v)
		checkTypes('number', 'numbers', h, s, v, a)
		checkRanges([0.0, 1.0], h, s, v, a)
		return Qt.hsva(h, s, v, a)
	} else {
		return hsva([], _, h, s, v ?? a)
	}
}

function hwba (_, h, w, b, a = 1.0) {
	if (typeof _ === 'object' && _ instanceof Array) {
		checkArgsNumber(3, 4, h, w, b)
		checkTypes('number', 'numbers', h, w, b, a)
		checkRanges([0.0, 1.0], h, w, b, a)
		const v = 1 - b
		const s = 1 - w / v
		return Qt.hsva(h, s, v, a)
	} else {
		return hwba([], _, h, w, b ?? a)
	}
}

function qolor(strings, ...params) {
	// if called as a function directly
	if (typeof strings === 'string') {
		strings = [strings]
	} else if (typeof strings === 'object' && utils.isQtColorCompatible(strings)) {
		return Qolor.copy(strings)
	}

	const evaluatedString = utils.zipConcat(strings, [...params, ''])
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
	if (typeof strings === 'object' && strings instanceof Color) {
		return Color.createCopy(strings)
	} else {
		return new Color(qolor(strings, ...params))
	}
}
