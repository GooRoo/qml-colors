# Qt Quick's `color`

Did you know that all `property`s of `color` type in Qt Quick have attributes that can be accessed as any other object members (via dot or subscription)? I also didn't because the [official documentation](https://doc.qt.io/qt-5/qml-color.html) contains no information (yes, just **nothing, zero info**) about it.

But I was so kind to collect this here.

It means that you can do, for example, like this:

```qml hl_lines="6-8 12-14"
Item {
	property color color: '#8000ff'

	Component.onCompleted: {
		// Print the color's RGB values:
		console.log(
			'RGB:', color.r, color.g, color.b
		)  // ⇒ RGB: 0.5019607843137255 0 1

		// or print the same color as HSV:
		let {hsvHue: h, hsvSaturation: s, hsvValue: v} = color
		console.log(
			`hsv(${Math.floor(h * 360)}°, ${s * 100}%, ${v * 100}%)`
		)  // ⇒ hsv(270°, 100%, 100%)
	}
}
```

## Properties

| Category | Properties (and aliases)                                                          |
|---------:|-----------------------------------------------------------------------------------|
| Common   | [`a`](#alpha), [`valid`](#valid)                                                  |
| RGB      | [`r`](#red), [`g`](#green), [`b`](#blue)                                          |
| HSL      | [`hslHue`](#hslhue), [`hslSaturation`](#saturation), [`hslLightness`](#lightness) |
| HSV      | [`hsvHue`](#hslhue), [`hsvSaturation`](#hsvsaturation), [`hsvValue`](#hsvvalue)   |

#### `a`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the _alpha_ channel of the color.

#### `b`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [RGB][rgb-model] _blue_ channel of the color.

	**See also:** [`g`](#g), [`r`](#r).

#### `g`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [RGB][rgb-model] _green_ channel of the color.

	**See also:** [`b`](#b), [`r`](#r).

#### `hslHue`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`hsvHue`](#hsvhue)</td></tr>
	</table>

	Returns the [HSL][hsl-model] or [HSV][hsv-model] _hue_ of the color.

	**See also:**

	- HSL: [`hslLightness`](#hsllightness), [`hslSaturation`](#hslsaturation)
	- HSV: [`hsvSaturation`](#hsvsaturation), [`hsvValue`](#hsvvalue)

#### `hslLightness`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSL][hsl-model] _lightness_ of the color.

	**See also:** [`hslHue`](#hslhue), [`hslSaturation`](#hslsaturation).

#### `r`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [RGB][rgb-model] _red_ channel of the color.

	**See also:** [`b`](#b), [`g`](#g).

#### `hslSaturation`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSL][hsl-model] _saturation_ of the color.

	For [HSV][hsv-model] _saturation_, **see** [`hsvSaturation`](#hsvsaturation).

	**See also:** [`hslHue`](#hslhue), [`hslLightness`](#hsllightness).

#### `hsvHue`

:	Same as [`hslHue`](#hslhue).

#### `hsvSaturation`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSV][hsv-model] _saturation_ of the color.

	For [HSL][hsl-model] _saturation_, **see** [`hslSaturation`](#hslsaturation).

	**See also:** [`hsvHue`](#hslhue), [`hsvValue`](#hsvvalue).

#### `hsvValue`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSV][hsv-model] _value_ of the color.

	**See also:** [`hsvHue`](#hslhue), [`hsvSaturation`](#hsvsaturation).

#### `valid` {.readonly-prop}

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>`boolean`</td></tr>
	</table>

	Returns `true` if the color is valid and `false` otherwise. The only two ways of getting invalid colors in QML I found are:

	1. Passing an invalid (for example, default-constructed `QColor` from C++.
	2. Defining an uninitialized `color` property:
		```qml
		Item {
			property color myColor
			Component.onCompleted: {
				console.log(myColor.valid)  // ⇒ false
			}
		}
		```

[norm]: ../getting-started/basic-concepts.md#normalized-real-interval-norm "Normalized real interval (norm)"
[offset]: ../getting-started/basic-concepts.md#normalized-real-offset-interval-offset "Normalized real interval offset (offset)"
[8bit]: ../getting-started/basic-concepts.md#integer-interval-8bit "Integer interval (8bit)"
[qolor]: ../getting-started/basic-concepts.md#qt-color-qolor "Qt color"
[color]: ../getting-started/basic-concepts.md#the-color-class-color "Color class from this library"
[any-color]: ../getting-started/basic-concepts.md#any-type-of-color-any-color "Any type of color"
[offset-object]: ../getting-started/basic-concepts.md#offset-object
[change-object]: ../getting-started/basic-concepts.md#change-object
[percent]: ./units.md#or-percent "% (or percent)"
[deg]: ./units.md#or-deg "° (or deg)"

[rgb-model]: ../getting-started/basic-concepts.md#rgb
[hsl-model]: ../getting-started/basic-concepts.md#hsl
[hsv-model]: ../getting-started/basic-concepts.md#hsv
[hwb-model]: ../getting-started/basic-concepts.md#hwb

---8<--- "docs/abbreviations.md"
