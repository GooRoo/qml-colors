# qml-colors

[![Made by Ukrainian](https://img.shields.io/static/v1?label=Made%20by&message=Ukrainian&labelColor=1f5fb2&color=fad247&style=flat-square)](https://github.com/GooRoo/ukrainian-shields)
[![License](https://img.shields.io/github/license/GooRoo/qml-colors?style=flat-square)](LICENSE)

## Struggling with colors?

Are you sick and tired of poorness of Qt Quick's `color` datatype as much as I am? Ever wanted to have an easier way of doing simple color transformations in QML bindings like following?
```qml hl_lines="5"
Rectangle { id: r1; color: 'red' }

Rectangle {
	// oh god, I just wanted to add some transparency
	color: Qt.rgba(r1.color.r, r1.color.g, r1.color.b, 0.8)
}
```
What if you could write it like this?
```qml
Rectangle {
	color: rgba(r1.color, 0.8)
}
```
Or even like this?
```qml
Rectangle {
	color: fadeOut(r1.color, 20 .percent)
}
```
Interested? **Then welcome aboard!** Let's see some examples.

## With this library you can…

### …construct color objects

in many various ways

```qml
Rectangle {
	color: rgba('indigo', 0.8)  // ⇒ #cc4b0082 (as ARGB)
}
```

```qml
Rectangle {
	color: q`#036`  // ⇒ #003366
}
```

```qml
Rectangle {
	color: q`r:${128} g:${0} b:${255}`  // ⇒ #8000ff
}
```

And even imperatively out of `color`-properties

```qml hl_lines="3"
Item {
	Component.onCompleted: {
		const c = q`yellow`       // It looks like a string, but it's an object!

		// this is expected
		console.log(q`yellow`)    // ⇒ #ffff00

		// but let's try this
		console.log(q`yellow`.r)  // ⇒ 1.0
		console.log(q`yellow`.g)  // ⇒ 1.0
		console.log(q`yellow`.b)  // ⇒ 0.0
	}
}
```

### …use units

```qml
Rectangle {
	color: cc`#036`.adjustHue(+45['°'])   // ⇒ #1a0066
}
```
```qml
Rectangle {
	color: cc`#036`.lighten(60 .percent)  // ⇒ #99ccff
}
```

### …rely on a whole bunch of auxiliary color functions

```qml
Rectangle {
	color: mix('#036', '#d2e1dd', 75['%'])  // ⇒ #355f84
}
```
```qml
Rectangle {
	color: scale('#d2e1dd', {hsl: {l: -10['%'], s: +10['%']}})  // ⇒ #b3d4cb
}
```
```qml
Rectangle {
	color: desaturate('#f2ece4', 20 .percent)  // ⇒ #eeebe8
}
```

### …chain as many transformations as you need

```qml
Rectangle {
	color:
		cc`#0000ff`
			.adjustHue(-105 .deg)
			.desaturate(20 .percent)
			.mix('red', 85 .percent)
			.adjust({alpha: -30 .percent})
			.color                          // ⇒ #b33cc341
}
```

### …work with `color`s imperatively

```qml hl_lines="3 6-7"
Rectangle {
	color: {
		let newColor = cc`darkorange`
		console.log(newColor)  // ⇒ #ffa500
		console.log(newColor.hue, newColor.saturation)  // ⇒ 0.108 1.0
		newColor.hue = 20 .deg
		newColor.saturation = 65 .percent
		console.log(newColor)  // ⇒ #d2642d
		return newColor
	}
}
```

### …and maybe something else

but I don't even remember.

## Wanna use it?

Convinced? [Get started][get-started] now!

Not yet? Anyway, read the [documentation][get-started] and you'll change your mind.

[get-started]: https://gooroo.github.io/qml-colors/getting-started/why/
