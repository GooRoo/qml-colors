# The `Color` class

Basically, the `Color` is just a thin wrapper around Qt Quick's [`color`][qolor]. It provides useful properties and methods though. They are listed below.

## Properties

| Category | Properties (and aliases)                                                                                                                                      |
|---------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Common   | [`alpha`](#alpha) (or [`a`](#alpha)), [`color`](#color) (or [`qolor`](#color)), [`valid`](#valid)                                                             |
| RGB      | [`red`](#red), [`green`](#green), [`blue`](#blue) (or just [`r`](#red), [`g`](#green), [`b`](#blue))                                                          |
| HSL      | [`hue`](#hue), [`saturation`](#saturation), [`lightness`](#lightness)<br/>(or [`hslHue`](#hue), [`hslSaturation`](#saturation), [`hslLightness`](#lightness)) |
| HSV      | [`hsvHue`](#hue) (or just [`hue`](#hue)), [`hsvSaturation`](#hsvsaturation), [`hsvValue`](#hsvvalue)                                                          |
| HWB      | [`hue`](#hue), [`whiteness`](#whiteness), [`blackness`](#blackness)<br/>(or [`hwbHue`](#hue), [`hwbWhiteness`](#whiteness), [`hwbBlackness`](#blackness))     |

### Own

#### `alpha`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`a`](#a)</td></tr>
	</table>

	Returns the _alpha_ channel of the color.

#### `blackness`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>`hwbBlackness`</td></tr>
	</table>

	Returns the [HWB][hwb-model] _blackness_ of the color.

	**See also:** [`hue`](#hue), [`whiteness`](#whiteness).

#### `blue`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`b`](#b)</td></tr>
	</table>

	Returns the [RGB][rgb-model] _blue_ channel of the color.

	**See also:** [`green`](#green), [`red`](#red).

#### `color`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`qolor`][qolor]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>`qolor`</td></tr>
	</table>

	Returns the underlying [Qt Quick's `color`][qolor].

#### `green`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`g`](#g)</td></tr>
	</table>

	Returns the [RGB][rgb-model] _green_ channel of the color.

	**See also:** [`blue`](#blue), [`red`](#red).

#### `hue`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`hslHue`](#hslhue), [`hsvHue`](#hsvhue), `hwbHue`</td></tr>
	</table>

	Returns the [HSL][hsl-model], [HSV][hsv-model], or [HWB][hwb-model] _hue_ of the color.

	**See also:**

	- HSL: [`lightness`](#lightness), [`saturation`](#saturation)
	- HSV: [`hsvSaturation`](#hsvsaturation), [`hsvValue`](#hsvvalue)
	- HWB: [`blackness`](#blackness), [`whiteness`](#whiteness)

#### `lightness`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`hslLightness`](#hsllightness)</td></tr>
	</table>

	Returns the [HSL][hsl-model] _lightness_ of the color.

	**See also:** [`hue`](#hue), [`saturation`](#saturation).

#### `red`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`r`](#r)</td></tr>
	</table>

	Returns the [RGB][rgb-model] _red_ channel of the color.

	**See also:** [`blue`](#blue), [`green`](#green).

#### `saturation`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>[`hslSaturation`](#hslsaturation)</td></tr>
	</table>

	Returns the [HSL][hsl-model] _saturation_ of the color.

	For [HSV][hsv-model] _saturation_, **see** [`hsvSaturation`](#hsvsaturation).

	**See also:** [`hue`](#hue), [`lightness`](#lightness).

#### `whiteness`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
		<tr><td style="text-align: right">Alias:</td><td>`hwbWhiteness`</td></tr>
	</table>

	Returns the [HWB][hwb-model] _whiteness_ of the color.

	**See also:** [`blackness`](#blackness), [`hue`](#hue).

### Inherited from Qt Quick's `color`

#### `a`

:	Same as [`alpha`](#alpha).

#### `b`

:	Same as [`blue`](#blue).

#### `g`

:	Same as [`green`](#green).

#### `hslHue`

:	Same as [`hue`](#hue).

#### `hslLightness`

:	Same as [`lightness`](#lightness).

#### `hslSaturation`

:	Same as [`saturation`](#saturation).

#### `hsvHue`

:	Same as [`hue`](#hue).

#### `hsvSaturation`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSV][hsv-model] _saturation_ of the color.

	For [HSL][hsl-model] _saturation_, **see** [`saturation`](#saturation).

	**See also:** [`hsvHue`](#hue), [`hsvValue`](#hsvvalue).

#### `hsvValue`

:	<table class="type-alias">
		<tr><td style="text-align: right">Type:</td><td>[`norm`][norm]</td></tr>
	</table>

	Returns the [HSV][hsv-model] _value_ of the color.

	**See also:** [`hsvHue`](#hue), [`hsvSaturation`](#hsvsaturation).

#### `r`

:	Same as [`red`](#red).

#### `valid`

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

## Methods

| Category      | Methods (and aliases)                                                                                                  |
|--------------:|------------------------------------------------------------------------------------------------------------------------|
| Multi-changes | [`adjust`](#adjust), [`change`](#change), [`scale`](#scale)                                                            |
| Hue           | [`adjustHue`](#adjusthue) (or [`spin`](#adjusthue)), [`complement`](#complement)                                       |
| Brightness    | [`darker`](#darken), [`lighten`](#lighten)                                                                             |
| Saturation    | [`desaturate`](#desaturate), [`grayscale`](#grayscale) (or [`greyscale`](#grayscale)), [`saturate`](#saturate)         |
| Opacity       | [`opacify`](#opacify) (or [`fadeIn`](#opacify)), [`transparentize`](#transparentize) (or [`fadeOut`](#transparentize)) |
| Other         | [`invert`](#invert), [`mix`](#mix)                                                                                     |

#### adjust

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`change`: [`offset-object`][offset-object]) &rarr; [`color`][color]</td></tr>
	</table>

	Increases or decreases one or more properties of the color by fixed amounts.

	Adds the value passed for each keyword argument to the corresponding property of the color, and returns a new adjusted instance of color.

	Restrictions (for more details see [`offset-object`][offset-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`offset`][offset] and optional.

	**Examples:**
	```js
	c`#6b717f`.adjust({rgb: {r: +15 .int}})  // ⇒ #7a717f
	```
	```js
	c`#d2e1dd`.adjust({rgb: {red: -10 .int, blue: +10 .int}})  // ⇒ #c8e1e7
	```
	```js
	c`#998099`.adjust({
		hsl: {lightness: -30 .percent},
		alpha: -40 .percent
	})  // ⇒ #99473947
	```

	**See also:** [`change`](#change), [`scale`](#scale), [`%`][percent], [`°`][deg].

#### adjustHue

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`offset`: [`offset`][offset]) &rarr; [`color`][color]</td></tr>
		<tr><td>Alias:</td><td>`spin`</td></tr>
	</table>

	Increases or decreases the color‘s hue.

	**Examples:**
	```js
	// Hue 222° becomes 282°
	c`#6b717f`.adjustHue(+60 .deg)  // ⇒ #796b7f
	```
	```js
	// Hue 164° becomes 104°.
	c`#d2e1dd`.spin(-60['°'])  // ⇒ #d6e1d2
	```
	```js
	// Hue 210° becomes 255°
	c`#036`.adjustHue(+45 .deg)  // ⇒ #1a0066
	```

	**See also:** [`adjust`](#adjust), [`°`][deg].

#### change

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`change`: [`change-object`][change-object]) &rarr; [`color`][color]</td></tr>
	</table>

	Sets one or more properties of the color to new values and returns a new adjusted instance of color.

	Restrictions (for more details see [`change-object`][change-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`norm`][norm] and optional.

	**Examples:**
	```js
	c`#6b717f`.change({rgb: {r: 100 .int}})  // ⇒ #64717f
	```
	```js
	c`#d2e1dd`.change({rgb: {red: 100 .int, blue: 50 .int}})  // ⇒ #64e132
	```
	```js
	c`#998099`.change({
		hsl: {lightness: 30 .percent},
		alpha: 0.5
	})  // ⇒ #80554455
	```

	**See also:** [`adjust`](#adjust), [`scale`](#scale), [`%`][percent], [`°`][deg].

#### complement

:	<table class="type-alias">
		<tr><td>Type:</td><td>() &rarr; [`color`][color]</td></tr>
	</table>

	Returns the RGB [complement](https://en.wikipedia.org/wiki/Complementary_colors) of the color.

	This is identical to `#!js color.adjustHue(-180 .deg)`.

	**Examples:**
	```js
	// Hue 222° becomes 42°
	c`#6b717f`.complement()  // ⇒ #7f796b
	```
	```js
	// Hue 164° becomes 344°
	c`#d2e1dd`.complement()  // ⇒ #e1d2d6
	```
	```js
	// Hue 210° becomes 30°
	c`#036`.complement()  // ⇒ #663300
	```

	**See also:** [`adjust`](#adjust), [`adjustHue`](#adjusthue), [`invert`](#invert).

#### darken

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Makes the color darker by specified `amount` (by decreasing the HSL _lightness_).

	**Examples:**
	```js
	// Lightness 92% becomes 72%
	c`#b37399`.darken(20['%'])  // ⇒ #7c4465
	```
	```js
	// Lightness 85% becomes 45%
	c`#f2ece4`.darken(40 .percent)  // ⇒ #b08b5a
	```
	```js
	// Lightness 20% becomes 0%
	c`#036`.darken(0.3)  // ⇒ #000000
	```
	```js
	// Lightness 50% becomes 25%
	c`#8000ff`.darken()  // ⇒ #000000
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### desaturate

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Makes the color less saturated by specified `amount` (by decreasing the HSL _saturation_).

	**Examples:**
	```js
	// Saturation 100% becomes 80%
	c`#036`.desaturate(20 .percent)  // ⇒ #0a335c
	```
	```js
	// Saturation 35% becomes 15%
	c`#f2ece4`.desaturate(20 .percent)  // ⇒ #eeebe8
	```
	```js
	// Saturation 20% becomes 0%
	c`#d2e1dd`.desaturate(30 .percent)  // ⇒ #dadada
	```
	```js
	// Saturation 100% becomes 75%
	c`#8000ff`.desaturate()  // ⇒ #8020df
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### grayscale

:	<table class="type-alias">
		<tr><td>Type:</td><td>() &rarr; [`color`][color]</td></tr>
		<tr><td>Alias:</td><td>`greyscale`</td></tr>
	</table>

	Returns a gray color with the same lightness as the color's one.

	This is identical to `#!js color.change({hsl: {saturation: 0}})`.

	**Examples:**
	```js
	c`#6b717f`.grayscale()  // ⇒ #757575
	```
	```js
	c`#d2e1dd`.grayscale()  // ⇒ #dadada
	```
	```js
	c`#036`.greyscale()  // ⇒ #333333
	```

	**See also:** [`change`](#change).

#### invert

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`weight = 1.0`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Returns the [negative](https://en.wikipedia.org/wiki/Negative_(photography)) of the color.

	A higher `weight` means the result will be closer to the negative, and a lower `weight` means it will be closer to $color. `#!js weight = 0.5` will always produce `#808080`.

	**Examples:**
	```js
	c`#b37399`.invert()  // ⇒ #4c8c66
	```
	```js
	c`black`.invert()  // ⇒ #ffffff
	```
	```js
	c`#550e0c`.invert(20 .percent)  // ⇒ #663b3a
	```

	**See also:** [`complement`](#complement), [`%`][percent].

#### lighten

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Makes the color lighter by specified `amount` (by increasing the HSL _lightness_).

	**Examples:**
	```js
	// Lightness 46% becomes 66%
	c`#6b717f`.lighten(20['%'])  // ⇒ #a1a5af
	```
	```js
	// Lightness 20% becomes 80%
	c`#036`.lighten(60 .percent)  // ⇒ #99ccff
	```
	```js
	// Lightness 85% becomes 100%
	c`#e1d7d2`.lighten(0.3)  // ⇒ #ffffff
	```
	```js
	// Lightness 50% becomes 75%
	c`#8000ff`.lighten()  // ⇒ #c080ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### mix

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color2`: [`any-color`][any-color], `weight = 0.5`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Returns a new color that’s a mixture of the current color and `color2`.

	Both the `weight` and the relative opacity of each color determines how much of each color is in the result. A larger `weight` indicates that more of the current color should be used, and a smaller `weight` indicates that more of `color2` should be used.

	By default, the colors are mixed in equal proportions.

	**Examples:**
	```js
	c`#036`.mix(c`#d2e1dd`)  // ⇒ #698aa2
	```
	```js
	c`#036`.mix(q`#d2e1dd`, 75 .percent)  // ⇒ #355f84
	```
	```js
	c`#036`.mix('#d2e1dd', 25['%'])  // ⇒ #9eb6bf
	```
	```js
	c`${0.5.byte} ${242} ${236} ${228}`.mix(c`#6b717f`)  // ⇒ #8d9098
	```

	**See also:** [`%`][percent].

#### opacify

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
		<tr><td>Alias:</td><td>`fadeIn`</td></tr>
	</table>

	Makes the color more opaque by increasing the alpha channel by `amount`.

	**Examples:**
	```js
	c`#806b717f`.opacify(0.2)  // ⇒ #b36b717f
	```
	```js
	c`#80e1d7d2`.fadeIn(40['%'])  // ⇒ #e6e1d7d2
	```
	```js
	c(rgba('#036', 0.3)).opacify(70['%'])  // ⇒ #003366
	```
	```js
	c`#808000ff`.opacify()  // ⇒ #c08000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### saturate

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
	</table>

	Makes the color more saturated by specified `amount` (by increasing the HSL _saturation_).

	**Examples:**
	```js
	// Saturation 50% becomes 70%
	c`#c69`.saturate(20 .percent)  // ⇒ #e05299
	```
	```js
	// Saturation 35% becomes 85%
	c`#f2ece4`.saturate(50['%'])  // ⇒ #fcedda
	```
	```js
	// Saturation 80% becomes 100%
	c`#0e4982`.saturate(0.3)  // ⇒ #004990
	```
	```js
	// Saturation 75% becomes 100%
	c`#8020df`.desaturate()  // ⇒ #8000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### scale

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`change`: `offset-object`) &rarr; [`color`][color]</td></tr>
	</table>

	Fluidly scales one or more properties of the color and returns a new adjusted instance of color.

	Each keyword argument indicates how far the corresponding property of the color should be moved from its original position towards the maximum (if the argument is positive) or the minimum (if the argument is negative). This means that, for example, `#!js {hsl: {lightness: +50['%']}}` will make a color 50% closer to maximum lightness without making it fully white.

	Restrictions (for more details see [`offset-object`][offset-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`offset`][offset] and optional.
	- Although it is possible to specify `hue` for HSL, HSV, or HWB keyword arguments, it doesn't make much sense because the menthal model of such a change is vague IMO.

	**Examples:**
	```js
	c`#6b717f`.scale({rgb: {red: +15 .percent}})  // ⇒ #81717f
	```
	```js
	c`#d2e1dd`.scale({
		hsl: {
			l: -10['%'],
			s: +10['%']
		}
	})  // ⇒ #b3d4cb
	```
	```js
	c`#998099`.scale({a: -40 .percent})  // ⇒ #99998099
	```

	**See also:** [`adjust`](#adjust), [`change`](#change), [`%`][percent], [`°`][deg].

#### transparentize
:	<table class="type-alias">
		<tr><td>Type:</td><td>(`amount = 0.25`: [`norm`][norm]) &rarr; [`color`][color]</td></tr>
		<tr><td>Alias:</td><td>`fadeOut`</td></tr>
	</table>

	Makes the color less opaque by decreasing the alpha channel by `amount`.

	**Examples:**
	```js
	c`#806b717f`.transparentize(20 .percent)  // ⇒ #4d6b717f
	```
	```js
	c(rgba('#e1d7d2', 0.5)).fadeOut(40['%'])  // ⇒ #1ae1d7d2
	```
	```js
	c(rgba('#036', 0.3)).transparentize(0.3)  // ⇒ #00003366
	```
	```js
	c`#8000ff`.transparentize()  // ⇒ #bf8000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

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
