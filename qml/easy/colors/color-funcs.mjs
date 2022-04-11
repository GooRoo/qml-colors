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

import { Color } from "./colors.mjs"

function adjust (color, change) {
	return new Color(color).adjust(change)
}

function adjustHue (color, offset) {
	return new Color(color).adjustHue(offset)
}

function change (color, change) {
	return new Color(color).change(change)
}

function complement (color) {
	return new Color(color).complement()
}

function darken (color, amount = 0.25) {
	return new Color(color).darken(amount)
}

function desaturate (color, amount = 0.25) {
	return new Color(color).desaturate(amount)
}

function grayscale (color) {
	return new Color(color).grayscale()
}

function invert (color, weight = 1.0) {
	return new Color(color).invert(weight)
}

function lighten (color, amount = 0.25) {
	return new Color(color).lighten(amount)
}

function mix (color1, color2, weight = 0.5) {
	return new Color(color1).mix(color2, weight)
}

function opacify (color, amount = 0.25) {
	return new Color(color).opacify(amount)
}

function saturate (color, amount = 0.25) {
	return new Color(color).saturate(amount)
}

function scale (color, change) {
	return new Color(color).scale(change)
}

function transparentize (color, amount = 0.25) {
	return new Color(color).transparentize(amount)
}
