# Tagged literals

This feature is based on [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) from ES2016.

It allow constructing color objects using one of the available tags listed [below](#list-of-available-tags) in a quick and easy manner.

??? question "Skipped notation part?"

	You can always find it [here][notation].

## Instead of introduction

If you are too lazy to read the documentation on tagged template literals from ES2016, I'm here to help you with this short introduction.

??? important "About tagged literals"

	Some general information on how to pass parameters to tagged literals is available [here](./index.md#parameters-of-tagged-literals "Parameters of tagged literals").

	For all tags except [`qolor`](#qolor-or-q) and [`color`](#color-or-c) the following rules apply:

	1. **String parts are ignored.** The following literals are equal:
		```js
		argb`${0.5}${0.5}${0}${1}`
		```
		```js
		argb`a:${0.5} r:${0.5} g:${0} b:${1}`
		```
	2. Previous rule means the **literals can be multiline.** These are equal:
		```js
		argb`${0.5}${0.5}${0}${1}`
		```
		```js
		argb`
			a:${0.5}
			r:${0.5} g:${0} b:${1}
		`
		```
		```js
		argb`
			alpha: ${1/2}
			red:   ${1/2}
			green: ${ 0 }
			blue:  ${ 1 }
		`
		```
	3. **Every parameter** is an expression, so it **can contain calculations** or any other code. These are equal:
		```js
		argb`${0.5}${0.5}${0}${1}`
		```
		```js
		const anotherElementOpacity = 1.0
		const r = 0.5
		const g = 0.0
		const b = 1.0

		argb`${anotherElementOpacity / 2} ${r} ${g} ${b}`
		```

	4. If a parameter has some **[default value](./index.md#types-of-functions)**, it **can be omitted.** The following literals are equal:
		```js
		rgba`${0.5}${0}${1}${1}`
		```
		```js
		rgba`${0.5}${0}${1}`
		```

## List of available tags

The first two tags—[`qolor`](#qolor-or-q) and [`color`](#color-or-c)—are trying to cover 80% of needs of an average user of the library by using a multi-step heuristics approach.

If you need to construct a color using a precise form, please, see [`argb`](#argb), [`argb32`](#argb32), [`hsla`](#hsla-or-hsl), [`hsva`](#hsva-or-hsv), [`hwba`](#hwba-or-hwb), [`rgba`](#rgba-or-rgb), or [`rgba32`](#rgba32-or-rgb24) below.

#### `qolor` (or `q`)

:	??? info "(various types) &rarr; [`qolor`][qolor]"

		- (`name`: [`color-name`][color-name]) &rarr; [`qolor`][qolor]
		- (`#aarrggbb`|`#rrggbb`|`#argb`|`#rgb`: [`color-literal`][color-literal]) &rarr; [`qolor`][qolor]
		- (`a = 255`, `r`, `g`, `b`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]

	This tag tries to construct a [Qt color][qolor] based on the following magic (order matters):

	1. Treat the resulting string as [color name][color-name].
	2. Treat the resulting string as [color literal][color-literal].
	4. Treat the template parameters as [ARGB32](#argb32).
	5. Treat the template parameters as [RGB24](#rgba32-or-rgb24)
	6. If nothing works, return `undefined`.

	Examples:

	##### [Color names][color-name]
	```js
	q`indigo`  // ⇒ #4b0082
	q`yellow`  // ⇒ #ffff00
	```
	```js
	const fish = 'salmon'
	q`dark${fish}`  // ⇒ #e9967a AKA darksalmon
	```

	##### [Color literals][color-literal]
	```js
	q`#789`  // ⇒ #778899
	q`#8000ff`  // ⇒ #8000ff
	q`#ccff8000`  // ⇒ #ccff8000
	```

	##### (A)RGB32
	```js
	q`${0xCC}${255}${128}${0}`  // ⇒ #ccff8000
	q`${128}${0}${255}`  // ⇒ #8000ff
	```

	???+ warning "Beware the hash `#`!"

		If your literal starts with `#` and contains no spaces, it will be treated first as a regular color literal giving you most probably an unexpected result.

		Let's consider an example:
		```js
		q`${0x20}${0x00}${0xff}`  // ⇒ #2000ff
		```
		It contructs us exactly what we wanted: `#2000ff`. How? It first tries to match it as a color name, doesn't succeed, then tries to match as a regular color literal, again no success, and then it matches it as RGB24.

		Now, let's look at and analyze the following:
		```js
		q`#${0x20}${0x00}${0xff}`  // ⇒ #320255
		```
		We see that it's nearly the same except the hash sign `#` in the very beginning. And again, it tries to match agains color names first with no success, obviously.

		However, then it tries to match it as a regular [color literal][color-literal]. To do so, it needs to combine the parameters into a string:

		1. First, let's convert hexadecimal numbers into decimal
			- 20~16~ = 32~10~
			- 0~16~ = 0~10~
			- FF~16~ = 255~10~
		2. Then we combine a string as if it were a regular (not tagged) template as following: ```#!js `#${32}${0}${255}` ```
		3. The resulting string starts with `#` and contains exactly 6 digits, so it is treated as a color literal.
		4. The `#320255` is returned.


#### `color` (or `c`)

:	??? info "(various types) &rarr; [`color`][color]"

		- (`name`: [`color-name`][color-name]) &rarr; [`color`][color]
		- (`#aarrggbb`|`#rrggbb`|`#argb`|`#rgb`: [`color-literal`][color-literal]) &rarr; [`color`][color]
		- (`a = 255`, `r`, `g`, `b`: [`8bit`][8bit]) &rarr; [`color`][color]

	The only difference to [`qolor`](#qolor-or-q) tag is that this one creates an instance of the [`Color`][color] class instead of a regular [Qt color][qolor]. This class contains lots of useful methods and is far more superior in general. However, everthing comes with a price.

	##### [Color names][color-name]
	```js
	c`indigo`  // ⇒ #4b0082
	c`yellow`  // ⇒ #ffff00
	```
	```js
	const fish = 'salmon'
	c`dark${fish}`  // ⇒ #e9967a AKA darksalmon
	```

	##### [Color literals][color-literal]
	```js
	c`#789`  // ⇒ #778899
	c`#8000ff`  // ⇒ #8000ff
	c`#ccff8000`  // ⇒ #ccff8000
	```

	##### (A)RGB32
	```js
	c`${0xCC}${255}${128}${0}`  // ⇒ #ccff8000
	c`${128}${0}${255}`  // ⇒ #8000ff
	```

#### `argb`

:	(`alpha`, `red`, `green`, `blue`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	argb`${0.5} ${0.5} ${0} ${1}`  // ⇒ #808000ff
	```
	```js
	argb`${80['%']} ${1} ${0.5} ${0}`  // ⇒ #ccff8000
	```

#### `argb32`

:	(`alpha`, `red`, `green`, `blue`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	argb32`${128} ${128} ${0} ${255}`  // ⇒ #808000ff
	```
	```js
	argb32`${0x80} ${0.5.byte} ${0} ${0xFF}`  // ⇒ #808000ff
	```
	```js
	argb32`${204} ${255} ${128} ${0}`  // ⇒ #ccff8000
	```

#### `hsla` (or `hsl`)

:	(`hue`, `saturation`, `lightness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	hsla`${0.75} ${1} ${0.5} ${0.5}`  // ⇒ #808000ff
	```
	```js
	hsla`
		hue: ${270 .deg}
		saturation: ${100 .percent}
		lightness: ${50 .percent}
		alpha: ${50 .percent}
	`  // ⇒ #808000ff
	```
	```js
	hsla`${30['°']} ${100['%']} ${50['%']} ${0xCC.int}`  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hsl`${211 .deg} ${100 .percent} ${36 .percent}`  // ⇒ #0057b7
	hsl`${ 51 .deg} ${100 .percent} ${50 .percent}`  // ⇒ #ffd700
	```

#### `hsva` (or `hsv`)

:	(`hue`, `saturation`, `value`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	hsva`${0.75} ${1} ${1} ${0.5}`  // ⇒ #808000ff
	```
	```js
	hsva`
		hue: ${270 .deg}
		saturation: ${100 .percent}
		value: ${100 .percent}
		alpha: ${50 .percent}
	`  // ⇒ #808000ff
	```
	```js
	hsva`${30['°']} ${100['%']} ${100['%']} ${0xCC.int}`  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hsv`${211 .deg} ${100 .percent} ${ 72 .percent}`  // ⇒ #0057b7
	hsv`${ 51 .deg} ${100 .percent} ${100 .percent}`  // ⇒ #ffd700
	```

#### `hwba` (or `hwb`)

:	(`hue`, `whiteness`, `blackness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	hwba`${0.75} ${0} ${0} ${0.5}`  // ⇒ #808000ff
	```
	```js
	hwba`
		hue: ${270 .deg}
		blackness: ${0 .percent}
		whiteness: ${0 .percent}
		alpha: ${50 .percent}
	`  // ⇒ #808000ff
	```
	```js
	hwba`${30['°']} ${0['%']} ${0['%']} ${0xCC.int}`  // ⇒ #ccff8000
	```
	:flag_ua: (no alpha):
	```js
	hwb`${211 .deg} ${0 .percent} ${ 28 .percent}`  // ⇒ #0057b7
	hwb`${ 51 .deg} ${0 .percent} ${  0 .percent}`  // ⇒ #ffd700
	```

#### `rgba` (or `rgb`)

:	(`red`, `green`, `blue`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	rgba`${0.5} ${0} ${1} ${0.5}`  // ⇒ #808000ff
	```
	```js
	rgba`${1} ${0.5} ${0} ${80['%']}`  // ⇒ #ccff8000
	```

	:flag_ua: (no alpha):
	```js
	rgb`${0} ${87 .int} ${0.72}`  // ⇒ #0057b7
	rgb`${1} ${0xD7.int} ${0}`  // ⇒ #ffd700
	```

#### `rgba32` (or `rgb24`)

:	(`red`, `green`, `blue`, `alpha = 255`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]

	If this tag can't construct a color from literal's parameters, an exception is raised.

	Examples:

	```js
	rgba32`${128} ${0} ${255} ${128}`  // ⇒ #808000ff
	```
	```js
	rgba32`${0xFF} ${0x80} ${0x00} ${0xCC}`  // ⇒ #ccff8000
	```

	:flag_ua: (no alpha):
	```js
	rgb24`${0} ${87} ${183}`  // ⇒ #0057b7
	rgb24`${255} ${215} ${0}`  // ⇒ #ffd700
	```

[norm]: ../getting-started/basic-concepts.md#normalized-real-interval-norm "Normalized real interval (norm)"
[8bit]: ../getting-started/basic-concepts.md#integer-interval-8bit "Integer interval (8bit)"
[qolor]: ../getting-started/basic-concepts.md#qt-color-qolor "Qt color"
[color]: ../getting-started/basic-concepts.md#the-color-class-color "Color class from this library"
[color-name]: ../getting-started/basic-concepts.md#color-name
[color-literal]: ../getting-started/basic-concepts.md#color-literal
[notation]: ./index.md#notation "Notation"

---8<--- "docs/abbreviations.md"
