import { Qolor } from "./colors.mjs"

export function anyOf (collection, predicate) {
	for (const element of collection) {
		if (predicate(element)) {
			return true
		}
	}
	return false
}

export function allOf (collection, predicate) {
	for (const element of collection) {
		if (!predicate(element)) {
			return false
		}
	}
	return true
}

export function clamp (n, min = 0.0, max = 1.0) {
	return Math.max(Math.min(n, max), min)
}

export function absmod (n, r) {
	let result = n % r
	if (result < 0.0) {
		result += r
	}
	return result
}

export function isQtColor (obj) {
	const iface = [
		'r', 'g', 'b', 'a',
		'hsvHue', 'hsvSaturation', 'hsvValue',
		'hslHue', 'hslSaturation', 'hslLightness',
		'valid'
	]

	return typeof obj === 'object' &&
		allOf(iface, prop => obj.hasOwnProperty(prop))
}

export function isQtColorCompatible (obj) {
	const iface = [
		'r', 'g', 'b', 'a',
		'hsvHue', 'hsvSaturation', 'hsvValue',
		'hslHue', 'hslSaturation', 'hslLightness',
		'valid'
	]

	const hasProperty = (obj, prop) => obj.hasOwnProperty(prop) || Object.getPrototypeOf(obj).hasOwnProperty(prop)

	return typeof obj === 'object' &&
		allOf(iface, prop => hasProperty(obj, prop))
}

export function zipConcat(a, b) {
	return a.map((e, i) => `${e}${b[i]}`).join('')
}

function hashCode(str) { // java String#hashCode
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	return hash
}

function intToRGB(i){
	const c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase()

	return '00000'.substring(0, 6 - c.length) + c
}

// Calculates the hash of the string and converts it to unique color
// Inspired by StackOverlow answer: https://stackoverflow.com/a/3426956
export function textToColor(texts, ...params) {
	const finalText = typeof texts === 'string'
		? texts
		: zipConcat(texts, [...params, ''])

	return Qolor.fromString(`#${intToRGB(hashCode(finalText))}`)
}
