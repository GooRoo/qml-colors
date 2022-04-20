.pragma library

.import 'tags.mjs' as Tags
.import 'color-funcs.mjs' as Funcs
.import 'utils.mjs' as Utils

function registerGlobalFunctions(...functions) {
	for (const func of functions) {
		const [f, fn] = func instanceof Array? func : [func, func.name]
		if (typeof this[fn] === 'undefined') {
			console.debug(`Registering global function '${f.name}' as '${fn}'`)
			this[fn] = f
		}
	}
}

registerGlobalFunctions.call(this,
	Tags.color,
	[Tags.color, 'cc'],
	Tags.qolor,
	[Tags.qolor, 'q'],

	Tags.argb,
	Tags.argb32,
	[Tags.hsla, 'hsl'],
	Tags.hsla,
	[Tags.hsva, 'hsv'],
	Tags.hsva,
	[Tags.hwba, 'hwb'],
	Tags.hwba,
	[Tags.rgba, 'rgb'],
	[Tags.rgba32, 'rgb24'],
	Tags.rgba,
	Tags.rgba32
)

this.$ = {}

registerGlobalFunctions.call(this.$,
	Funcs.adjust,
	[Funcs.adjustHue, 'spin'],
	Funcs.adjustHue,
	Funcs.change,
	Funcs.complement,
	Funcs.darken,
	Funcs.desaturate,
	[Funcs.grayscale, 'greyscale'],
	Funcs.grayscale,
	Funcs.invert,
	Funcs.lighten,
	Funcs.mix,
	[Funcs.opacify, 'fadeIn'],
	Funcs.opacify,
	Funcs.saturate,
	Funcs.scale,
	[Funcs.transparentize, 'fadeOut'],
	Funcs.transparentize,

	Utils.textToColor,
)
