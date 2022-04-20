# Functions

???+ hint "This page describes global functions"

	If you are looking for [tagged literals](./tagged-literals.md) or the [`Color` class' methods](./color.md#methods), check the links.

## Constructors

#### `qolor`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`color`: [`any-color`][any-color]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td text-align="right">Alias:</td><td>`q`</td></tr>
	</table>

	Constructs a [Qt Quick's `color`][qolor] from [any other color][any-color].

	Examples:

	```js
	q('indigo')  // ⇒ #4b0082
	```
	```js
	q(Qt.rgba(1, 1, 0, 1))  // ⇒ #ffff00
	```
	```js
	q(argb32`${0xCC}${255}${128}${0}`)  // ⇒ #ccff8000
	```
	```js
	q(cc`#789`)  // ⇒ #778899
	```

#### `color`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`color`: [`any-color`][any-color]) &rarr; [`color`][color]</td></tr>
		<tr><td text-align="right">Alias:</td><td>`cc`</td></tr>
	</table>

	Constructs an instance of the [`Color` class][color] from [any other color][any-color].

	Examples:

	```js
	cc('indigo')  // ⇒ #4b0082
	```
	```js
	cc(Qt.rgba(1, 1, 0, 1))  // ⇒ #ffff00
	```
	```js
	cc(argb32`${0xCC}${255}${128}${0}`)  // ⇒ #ccff8000
	```
	```js
	cc(cc`#789`)  // ⇒ #778899
	```

#### `rgba`

:	<table class="type-alias">
		<tr>
			<td text-align="right" rowspan="2">Type:</td>
			<td rowspan="2">
				(`red`, `green`, `blue`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]<br/>
				(`color`: [`any-color`][any-color], `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]
			</td>
			<td>(1)</td>
		</tr>
		<tr><td>(2)</td></tr>
		<tr><td text-align="right">Alias:</td><td>`rgb`</td></tr>
	</table>

	Creates a color either from [RGBA][rgb-model] parameters (1) or from a `color` and `alpha` (2). In the latter case, if the `color` has already some transparency, it will be overridden by a specified value of _alpha_ channel.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	rgba(0.5, 0, 1, 0.5)  // ⇒ #808000ff
	```
	```js
	rgba('#8000ff', 0.5)  // ⇒ #808000ff
	```
	```js
	rgba(1, 0.5, 0, 80['%'])  // ⇒ #ccff8000
	```

	:flag_ua: (no alpha):
	```js
	rgb(0, 87 .int, 0.72)  // ⇒ #0057b7
	rgb(1, 0xD7.int, 0)  // ⇒ #ffd700
	```

#### `rgba32`

:	<table class="type-alias">
		<tr>
			<td text-align="right" rowspan="2">Type:</td>
			<td rowspan="2">
				(`red`, `green`, `blue`, `alpha = 255`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]<br/>
				(`color`: [`any-color`][any-color], `alpha = 255`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]
			</td>
			<td>(1)</td>
		</tr>
		<tr><td>(2)</td></tr>
		<tr><td text-align="right">Alias:</td><td>`rgb24`</td></tr>
	</table>

	Creates a color either from [RGBA][rgb-model] parameters (1) or from a `color` and `alpha` (2). In the latter case, if the `color` has already some transparency, it will be overridden by a specified value of _alpha_ channel.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	rgba32(128, 0, 255, 128)  // ⇒ #808000ff
	```
	```js
	rgba32('#8000ff', 128)  // ⇒ #808000ff
	```
	```js
	rgba32(0xFF, 0x80, 0x00, 0xCC)  // ⇒ #ccff8000
	```

	:flag_ua: (no alpha):
	```js
	rgb24(0, 87, 183)  // ⇒ #0057b7
	rgb24(255, 215, 0)  // ⇒ #ffd700
	```

#### `argb`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`alpha`, `red`, `green`, `blue`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Creates a color from [ARGB][rgb-model] parameters.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	argb(0.5, 0.5, 0, 1)  // ⇒ #808000ff
	```
	```js
	argb(80['%'], 1, 0.5, 0)  // ⇒ #ccff8000
	```

#### `argb32`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`alpha`, `red`, `green`, `blue`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Creates a color from [ARGB][rgb-model] parameters.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	argb32(128, 128, 0, 255)  // ⇒ #808000ff
	```
	```js
	argb32(0x80, 0.5.byte, 0, 0xFF)  // ⇒ #808000ff
	```
	```js
	argb32(204, 255, 128, 0)  // ⇒ #ccff8000
	```

#### `hsla`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`hue`, `saturation`, `lightness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td text-align="right">Alias:</td><td>`hsl`</td></tr>
	</table>

	Creates a color from [HSLA][hsl-model] parameters.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	hsla(0.75, 1, 0.5, 0.5)  // ⇒ #808000ff
	```
	```js
	hsla(
		270 .deg,
		100 .percent,
		50 .percent,
		50 .percent,
	)  // ⇒ #808000ff
	```
	```js
	hsla(30['°'], 100['%'], 50['%'], 0xCC.int)  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hsl(211 .deg, 100 .percent, 36 .percent)  // ⇒ #0057b7
	hsl( 51 .deg, 100 .percent, 50 .percent)  // ⇒ #ffd700
	```

#### `hsva`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`hue`, `saturation`, `value`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td text-align="right">Alias:</td><td>`hsv`</td></tr>
	</table>

	Creates a color from [HSVA][hsv-model] parameters.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	hsva(0.75, 1, 1, 0.5)  // ⇒ #808000ff
	```
	```js
	hsva(
		270 .deg,
		100 .percent,
		100 .percent,
		50 .percent
	)  // ⇒ #808000ff
	```
	```js
	hsva(30['°'], 100['%'], 100['%'], 0xCC.int)  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hsv(211 .deg, 100 .percent,  72 .percent)  // ⇒ #0057b7
	hsv( 51 .deg, 100 .percent, 100 .percent)  // ⇒ #ffd700
	```

#### `hwba`

:	<table class="type-alias">
		<tr><td text-align="right">Type:</td><td>(`hue`, `whiteness`, `blackness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td text-align="right">Alias:</td><td>`hwb`</td></tr>
	</table>

	Creates a color from [HWBA][hwb-model] parameters.

	If this function can't construct a color from its parameters, an exception is raised.

	Examples:

	```js
	hwba(0.75, 0, 0, 0.5)  // ⇒ #808000ff
	```
	```js
	hwba(
		270 .deg,
		0 .percent,
		0 .percent,
		50 .percent
	)  // ⇒ #808000ff
	```
	```js
	hwba(30['°'], 0['%'], 0['%'], 0xCC.int)  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hwb(211 .deg, 0 .percent,  28 .percent)  // ⇒ #0057b7
	hwb( 51 .deg, 0 .percent,   0 .percent)  // ⇒ #ffd700
	```

## Modificators

!!! attention "How to access these functions"

	To avoid clashes with your own functions' names, all modifying functions are defined not globally but on the `$` global object instead (similarly to jQuery[^1]).

	It means that you can call them the following way:
	```js
	$.invert('white')  // ⇒ #000000
	```

| Category      | Functions (and aliases)                                                                                                |
|--------------:|------------------------------------------------------------------------------------------------------------------------|
| Multi-changes | [`adjust`](#adjust), [`change`](#change), [`scale`](#scale)                                                            |
| Hue           | [`adjustHue`](#adjusthue) (or [`spin`](#adjusthue)), [`complement`](#complement)                                       |
| Brightness    | [`darken`](#darken), [`lighten`](#lighten)                                                                             |
| Saturation    | [`desaturate`](#desaturate), [`grayscale`](#grayscale) (or [`greyscale`](#grayscale)), [`saturate`](#saturate)         |
| Opacity       | [`opacify`](#opacify) (or [`fadeIn`](#opacify)), [`transparentize`](#transparentize) (or [`fadeOut`](#transparentize)) |
| Other         | [`invert`](#invert), [`mix`](#mix)                                                                                     |

#### `adjust`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `change`: [`offset-object`][offset-object]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Increases or decreases one or more properties of the `color` by fixed amounts.

	Adds the value passed for each keyword argument to the corresponding property of the `color`, and returns a new adjusted instance of color.

	Restrictions (for more details see [`offset-object`][offset-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`offset`][offset] and optional.

	**Examples:**
	```js
	$.adjust('#6b717f', {rgb: {r: +15 .int}})  // ⇒ #7a717f
	```
	```js
	$.adjust('#d2e1dd', {rgb: {red: -10 .int, blue: +10 .int}})  // ⇒ #c8e1e7
	```
	```js
	$.adjust('#998099', {
		hsl: {lightness: -30 .percent},
		alpha: -40 .percent
	})  // ⇒ #99473947
	```

	**See also:** [`change`](#change), [`scale`](#scale), [`%`][percent], [`°`][deg].

#### `adjustHue`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `offset`: [`offset`][offset]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td>Alias:</td><td>`spin`</td></tr>
	</table>

	Increases or decreases the `color`'s hue.

	**Examples:**
	```js
	// Hue 222° becomes 282°
	$.adjustHue('#6b717f', +60 .deg)  // ⇒ #796b7f
	```
	```js
	// Hue 164° becomes 104°.
	$.spin('#d2e1dd', -60['°'])  // ⇒ #d6e1d2
	```
	```js
	// Hue 210° becomes 255°
	$.adjustHue('#036', +45 .deg)  // ⇒ #1a0066
	```

	**See also:** [`adjust`](#adjust), [`°`][deg].

#### `change`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `change`: [`change-object`][change-object]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Sets one or more properties of the `color` to new values and returns a new adjusted instance of color.

	Restrictions (for more details see [`change-object`][change-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`norm`][norm] and optional.

	**Examples:**
	```js
	$.change('#6b717f', {rgb: {r: 100 .int}})  // ⇒ #64717f
	```
	```js
	$.change('#d2e1dd', {rgb: {red: 100 .int, blue: 50 .int}})  // ⇒ #64e132
	```
	```js
	$.change('#998099', {
		hsl: {lightness: 30 .percent},
		alpha: 0.5
	})  // ⇒ #80554455
	```

	**See also:** [`adjust`](#adjust), [`scale`](#scale), [`%`][percent], [`°`][deg].

#### `complement`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Returns the RGB [complement](https://en.wikipedia.org/wiki/Complementary_colors) of the `color`.

	This is identical to `#!js adjustHue(color, -180 .deg)`.

	**Examples:**
	```js
	// Hue 222° becomes 42°
	$.complement('#6b717f')  // ⇒ #7f796b
	```
	```js
	// Hue 164° becomes 344°
	$.complement('#d2e1dd')  // ⇒ #e1d2d6
	```
	```js
	// Hue 210° becomes 30°
	$.complement('#036')  // ⇒ #663300
	```

	**See also:** [`adjust`](#adjust), [`adjustHue`](#adjusthue), [`invert`](#invert).

#### `darken`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Makes the `color` darker by specified `amount` (by decreasing the HSL _lightness_).

	**Examples:**
	```js
	// Lightness 92% becomes 72%
	$.darken('#b37399', 20['%'])  // ⇒ #7c4465
	```
	```js
	// Lightness 85% becomes 45%
	$.darken('#f2ece4', 40 .percent)  // ⇒ #b08b5a
	```
	```js
	// Lightness 20% becomes 0%
	$.darken('#036', 0.3)  // ⇒ #000000
	```
	```js
	// Lightness 50% becomes 25%
	$.darken('#8000ff')  // ⇒ #000000
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### `desaturate`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Makes the `color` less saturated by specified `amount` (by decreasing the HSL _saturation_).

	**Examples:**
	```js
	// Saturation 100% becomes 80%
	$.desaturate('#036', 20 .percent)  // ⇒ #0a335c
	```
	```js
	// Saturation 35% becomes 15%
	$.desaturate('#f2ece4', 20 .percent)  // ⇒ #eeebe8
	```
	```js
	// Saturation 20% becomes 0%
	$.desaturate('#d2e1dd', 30 .percent)  // ⇒ #dadada
	```
	```js
	// Saturation 100% becomes 75%
	$.desaturate('#8000ff')  // ⇒ #8020df
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### `grayscale`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td>Alias:</td><td>`greyscale`</td></tr>
	</table>

	Returns a gray color with the same lightness as the `color`'s one.

	This is identical to `#!js change(color, {hsl: {saturation: 0}})`.

	**Examples:**
	```js
	$.grayscale('#6b717f')  // ⇒ #757575
	```
	```js
	$.grayscale('#d2e1dd')  // ⇒ #dadada
	```
	```js
	$.greyscale('#036')  // ⇒ #333333
	```

	**See also:** [`change`](#change).

#### `invert`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `weight = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Returns the [negative](https://en.wikipedia.org/wiki/Negative_(photography)) of the `color`.

	A higher `weight` means the result will be closer to the negative, and a lower `weight` means it will be closer to the original `color`. `#!js weight = 0.5` will always produce `#808080`.

	**Examples:**
	```js
	$.invert('#b37399')  // ⇒ #4c8c66
	```
	```js
	$.invert('black')  // ⇒ #ffffff
	```
	```js
	$.invert('#550e0cc', 20 .percent)  // ⇒ #663b3a
	```

	**See also:** [`complement`](#complement), [`%`][percent].

#### `lighten`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Makes the `color` lighter by specified `amount` (by increasing the HSL _lightness_).

	**Examples:**
	```js
	// Lightness 46% becomes 66%
	$.lighten('#6b717f', 20['%'])  // ⇒ #a1a5af
	```
	```js
	// Lightness 20% becomes 80%
	$.lighten('#036', 60 .percent)  // ⇒ #99ccff
	```
	```js
	// Lightness 85% becomes 100%
	$.lighten('#e1d7d2', 0.3)  // ⇒ #ffffff
	```
	```js
	// Lightness 50% becomes 75%
	$.lighten('#8000ff')  // ⇒ #c080ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### `mix`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color1`, `color2`: [`any-color`][any-color], `weight = 0.5`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Returns a new color that’s a mixture of `color1` and `color2`.

	Both the `weight` and the relative opacity of each color determines how much of each color is in the result. A larger `weight` indicates that more of `color1` should be used, and a smaller `weight` indicates that more of `color2` should be used.

	By default, the colors are mixed in equal proportions.

	**Examples:**
	```js
	$.mix('#036', cc`#d2e1dd`)  // ⇒ #698aa2
	```
	```js
	$.mix('#036', q`#d2e1dd`, 75 .percent)  // ⇒ #355f84
	```
	```js
	$.mix('#036', '#d2e1dd', 25['%'])  // ⇒ #9eb6bf
	```
	```js
	$.mix(cc`${0.5.byte} ${242} ${236} ${228}`, cc`#6b717f`)  // ⇒ #8d9098
	```

	**See also:** [`%`][percent].

#### `opacify`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td>Alias:</td><td>`fadeIn`</td></tr>
	</table>

	Makes the `color` more opaque by increasing the alpha channel by `amount`.

	**Examples:**
	```js
	$.opacify('#806b717f', 0.2)  // ⇒ #b36b717f
	```
	```js
	$.fadeIn('#80e1d7d2', 40['%'])  // ⇒ #e6e1d7d2
	```
	```js
	$.opacify(rgba('#036', 0.3), 70['%'])  // ⇒ #003366
	```
	```js
	$.opacify('#808000ff')  // ⇒ #c08000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### `saturate`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Makes the `color` more saturated by specified `amount` (by increasing the HSL _saturation_).

	**Examples:**
	```js
	// Saturation 50% becomes 70%
	$.saturate('#c69', 20 .percent)  // ⇒ #e05299
	```
	```js
	// Saturation 35% becomes 85%
	$.saturate('#f2ece4', 50['%'])  // ⇒ #fcedda
	```
	```js
	// Saturation 80% becomes 100%
	$.saturate('#0e4982', 0.3)  // ⇒ #004990
	```
	```js
	// Saturation 75% becomes 100%
	$.desaturate('#8020df')  // ⇒ #8000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

#### `scale`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `change`: [`offset-object`][offset-object]) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	Fluidly scales one or more properties of the `color` and returns a new adjusted instance of color.

	Each keyword argument indicates how far the corresponding property of the `color` should be moved from its original position towards the maximum (if the argument is positive) or the minimum (if the argument is negative). This means that, for example, `#!js {hsl: {lightness: +50['%']}}` will make the `color` 50% closer to maximum lightness without making it fully white.

	Restrictions (for more details see [`offset-object`][offset-object]):

	- `alpha` keyword **can be** specified separately.
	- Among `rgb`, `hsl`, `hsv`, and `hwb`, **only one** may be used at a time.
	- All keyword arguments are of type [`offset`][offset] and optional.
	- Although it is possible to specify `hue` for HSL, HSV, or HWB keyword arguments, it doesn't make much sense because the menthal model of such a change is vague IMO.

	**Examples:**
	```js
	$.scale('#6b717f', {rgb: {red: +15 .percent}})  // ⇒ #81717f
	```
	```js
	$.scale('#d2e1dd', {
		hsl: {
			l: -10['%'],
			s: +10['%']
		}
	})  // ⇒ #b3d4cb
	```
	```js
	$.scale('#998099', {a: -40 .percent})  // ⇒ #99998099
	```

	**See also:** [`adjust`](#adjust), [`change`](#change), [`%`][percent], [`°`][deg].

#### `transparentize`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`color`: [`any-color`][any-color], `amount = 0.25`: [`norm`][norm]) &rarr; [`qolor`][qolor]</td></tr>
		<tr><td>Alias:</td><td>`fadeOut`</td></tr>
	</table>

	Makes the `color` less opaque by decreasing the alpha channel by `amount`.

	**Examples:**
	```js
	$.transparentize('#806b717f', 20 .percent)  // ⇒ #4d6b717f
	```
	```js
	$.fadeOut(rgba('#e1d7d2', 0.5), 40['%'])  // ⇒ #1ae1d7d2
	```
	```js
	$.transparentize(rgba('#036', 0.3), 0.3)  // ⇒ #00003366
	```
	```js
	$.transparentize('#8000ff')  // ⇒ #bf8000ff
	```

	**See also:** [`adjust`](#adjust), [`%`][percent].

## Utilities

??? attention "How to access these functions"

	To avoid clashes with your own functions' names, all utility functions are defined not globally but on the `$` global object instead.

	Please, see examples below.

#### `textToColor`

:	<table class="type-alias">
		<tr><td>Type:</td><td>(`text`: `string`) &rarr; [`qolor`][qolor]</td></tr>
	</table>

	This function creates a unique (to some extent) color based on `text`.

	- It **does** guarantee that for the same `text` it always returns the same color.
	- It **does not** guarantee that for any two different texts the resulting colors will also be different.

	Examples:
	```js
	$.textToColor('Button')  // ⇒ #471352
	```
	```js
	let name = 'John'
	$.textToColor`Hello, ${name}!!!`  // ⇒ #234a90
	```
	```js
	$.textToColor`Lorem ipsum dolor sit amet,
		consectetuer adipiscing elit. Maecenas
		porttitor congue massa. Fusce posuere,
		magna sed pulvinar ultricies, purus
		lectus malesuada libero, sit amet
		commodo magna eros quis urna.`  // ⇒ #a9e52e
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

[^1]: Oh, God, what have I done‽

---8<--- "docs/abbreviations.md"
