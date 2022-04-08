.pragma library

.import 'tags.mjs' as Tags

function registerGlobalFunctions(...functions) {
	for (const func of functions) {
		const [f, fn] = func instanceof Array? func : [func, func.name]
		console.debug(`Registering global function '${f.name}' as '${fn}'`)
		this[fn] = f
	}
}

registerGlobalFunctions.call(this,
	Tags.argb,
	Tags.argb32,
	[Tags.hsla, 'hsl'],
	Tags.hsla,
	[Tags.hsva, 'hsv'],
	Tags.hsva,
	[Tags.hwba, 'hwb'],
	Tags.hwba,
	[Tags.rgba, 'rgb'],
	[Tags.rgba32, 'rgb32'],
	Tags.rgba,
	Tags.rgba32
)
