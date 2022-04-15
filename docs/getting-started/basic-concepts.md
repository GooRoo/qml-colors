# Basic concepts

Before I start explaining to you how to use the library, we need to agree on certain terminology.

#### color-name

:	One of the [extended color keywords](https://www.w3.org/TR/css-color-3/#svg-color) from CSS.

	??? example "List of all names"

		---8<--- "docs/reference/color-names.html"

#### color-literal

:	A string in either form:

	- `#!js '#rgb'`
	- `#!js '#argb'`
	- `#!js '#rrggbb'`
	- `#!js '#aarrggbb'`

	Every `a`, `r`, `g`, or `b` is a [hex-digit](https://en.wikipedia.org/wiki/Hexadecimal), i.e. a value _0–9_ or _A–F_ (or _a–f_). They represent _alpha, red, green,_ and _blue_ correspondingly.

	??? info "Expanding rules"

		The `#aarrggbb` is a full form and all other forms are expanded to it with the following rules:

		- If alpha is omitted, it equals to FF~16~ (= 255~10~).
		- In short form, every digit is doubled.

	???+ example "Examples"

		```js
		'#70f'       // ⇒ #ff7700ff
		'#a789'      // ⇒ #aa778899
		'#8000ff'    // ⇒ #ff8000ff
		'#c0ff79bf'  // ⇒ #c0ff79bf
		```

#### qolor

:	Qt Quick's `color`

#### color

: 	my `Color`

## Value ranges

### Normalized real interval (`norm`)
$$
n \in [0, 1]
$$
Almost all functions work with arguments that belong to the normalized interval. Also, all color components' values are stored internally as normalized real values.

For example, `#!js rgba(0.5, 0, 1, 1)`.

### Normalized real offset interval (`offset`)
$$
r \in [-1, 1]
$$
This one is mainly used to denote an offset/change of a normalized value.

For instance, `#!js {hsl: {saturation: -0.3}}`.

### Integer interval (`8bit`)
$$
u \in [0, 255]
$$
This should be quite familiar for those coming from CSS where color components are specified using integers. Usually, functions, that work with such values, have suffix `24` or `32`.

For example, `#!js rgb24(128, 0, 255)`.

### Integer offset interval (`9bit`)
$$
s \in [-255, 255]
$$
AFAIR, there are no functions that work with this interval, however, you can use such values, for instance, together with [units](/reference/units/#int).

Example: `#!js {alpha: -128 .int}`.

---8<--- "docs/abbreviations.md"
