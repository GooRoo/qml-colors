# Basic concepts

Before I start explaining to you how to use the library, we need to agree on certain terminology.

## Color models

This library supports several color models described below.

!!! info "Alpha-channel"

	Each model may contain an additional optional alpha-channel that represents transparency (or, to be more precise, opacity). If so, the model's name contains the A letter as you'll see below.

### RGB

Represents a color as a combination of _**R**ed, **G**reen,_ and _**B**lue_ components.

More details [on Wikipedia][rgb-wiki].

Variants: RGB, ARGB, RGBA.

### HSL

It's an alternative representation of a color in [RGB color model](#rgb) that uses a combination of:

* _**H**ue_ $\in [0°, 360°]$
* _**S**aturation_ $\in [0\%, 100\%]$
* _**L**ightness_ $\in [0\%, 100\%]$

More details [on Wikipedia][hsl-hsv-wiki].

Variants: HSL, HSLA.

### HSV

It's an alternative representation of a color in [RGB color model](#rgb) that uses a combination of:

* _**H**ue_ $\in [0°, 360°]$
* _**S**aturation_ $\in [0\%, 100\%]$
* _**V**alue_ $\in [0\%, 100\%]$ (AKA brightness)

More details [on Wikipedia][hsl-hsv-wiki].

Variants: HSV, HSVA.

### HWB

It's an alternative representation of a color in [RGB color model](#rgb) that uses a combination of:

* _**H**ue_ $\in [0°, 360°]$
* _**W**hiteness_ $\in [0\%, 100\%]$
* _**B**lackness_ $\in [0\%, 100\%]$

More details [on Wikipedia][hwb-wiki].

Variants: HWB, HWBA.

## Types

#### color-name

:	It's a `string` that contains one of the [extended color keywords](https://www.w3.org/TR/css-color-3/#svg-color) from CSS.

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

#### Qt color (`qolor`)

:	Qt Quick's [`color`](https://doc.qt.io/qt-5/qml-color.html) basic type.

#### The Color class (`color`)

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
AFAIR, there are no functions that work with this interval, however, you can use such values, for instance, together with [units](../reference/units.md#int).

Example: `#!js {alpha: -128 .int}`.

---8<--- "docs/abbreviations.md"

[hsl-hsv-wiki]: https://en.wikipedia.org/wiki/HSL_and_HSV
[rgb-wiki]: https://en.wikipedia.org/wiki/RGB_color_model
[hwb-wiki]: https://en.wikipedia.org/wiki/HWB_color_model
