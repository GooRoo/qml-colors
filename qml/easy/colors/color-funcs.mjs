export {
	adjust,
	adjustHue as spin,
	adjustHue,
	change,
	complement,
	darken,
	desaturate,
	grayscale as greyscale,
	grayscale,
	invert,
	lighten,
	mix,
	opacify as fadeIn,
	opacify,
	saturate,
	scale,
	transparentize as fadeOut,
	transparentize,
}

import { cc } from "./tags.mjs"

function adjust (color, change) {
	return cc(color).adjust(change).color
}

function adjustHue (color, offset) {
	return cc(color).adjustHue(offset).color
}

function change (color, change) {
	return cc(color).change(change).color
}

function complement (color) {
	return cc(color).complement().color
}

function darken (color, amount = 0.25) {
	return cc(color).darken(amount).color
}

function desaturate (color, amount = 0.25) {
	return cc(color).desaturate(amount).color
}

function grayscale (color) {
	return cc(color).grayscale().color
}

function invert (color, weight = 1.0) {
	return cc(color).invert(weight).color
}

function lighten (color, amount = 0.25) {
	return cc(color).lighten(amount).color
}

function mix (color1, color2, weight = 0.5) {
	return cc(color1).mix(color2, weight).color
}

function opacify (color, amount = 0.25) {
	return cc(color).opacify(amount).color
}

function saturate (color, amount = 0.25) {
	return cc(color).saturate(amount).color
}

function scale (color, change) {
	return cc(color).scale(change).color
}

function transparentize (color, amount = 0.25) {
	return cc(color).transparentize(amount).color
}
