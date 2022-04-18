# Units

Units are functions that transform a value from one interval to another and are made for pure convenience. You are free to not use them at all since they have no impact on the main library functionality.

All units except `byte` are intended to return a [real offset value][offset-interval] $r \in [-1, 1]$. But they never check the boundaries, so the resulting value may be out of bounds for the specified interval. This is done intentionally.

## Cautions

!!! attention "Units are defined globally"

	All units are defined on `#!js Number.prototype`. It means that you can use them with _any number_ literal, or variable, or property in **_any context,_** not only when dealing with colors.

??? info "Note on syntax"

	Although QML is statically typed, JavaScript, which it inherits, is not. It's beneficial to remember it, especially when dealing with numbers. QML has types `int`, `real`, and `double` while JavaScript has only `number`.

	So, if a unit name is a **valid** JS identificator, you are able to use it the following way:
	```js
	0.5.unit
	```
	however, you can't write like this because it leads to an interpreter error:
	```js
	1.unit  // ⇒ SyntaxError: Invalid or unexpected token
	```
	**“What's the difference?”**  you might think. It's all with the dot.

	JavaScript allows to omit either a leading or a trailing zero in number literals as following:
	```js
	0.5  // ⇒ 0.5
	 .5  // ⇒ 0.5
	1.   // ⇒ 1.0
	1.0  // ⇒ 1.0
	```
	So, when you write `#!js 1.unit`, the interpreter treats the dot as a part of the number literal and not as a method call.

	To help interpreter understand what you would like to do, you have the following variants (~~stolen~~ inspired [here](https://stackoverflow.com/a/33119577/194223)):
	```js
	1 .unit
	1..unit
	1.0.unit
	(1).unit
	1['unit']
	```
	I decided to use almost exclusively the **first variant** with a space between a number and a unit. But you are free to define your own coding style.

	For those units with names that are **invalid** identificators, the only possible way of using it is obviously the last one.

## Available units

#### `%` (or `percent`)

:	Percent &ndash; a ratio expressed as a fraction of 100.
	```js
	 10 .percent  // ⇒  0.1
	+50 .percent  // ⇒  0.5
	-25 .percent  // ⇒ -0.25
	146 ['%']     // ⇒  1.46
	```

#### `°` (or `deg`)

:	Degree represents an angle measurement and is mainly used for _hue_ values in HSL, HSV, or HWB color models.
	```js
	 18 .deg   // ⇒  0.05
	+60 .deg   // ⇒  0.16666667
	-90 ['°']  // ⇒ -0.25
	 45 ['°']  // ⇒  0.125
	```
	??? info "Note on modulus"

		If you use this unit with an argument which absolute value is greater than 360, it will be taken modulo 360 because, as we know from school, for angles the following applies:
		$$
		450° \equiv 90° \pmod{360}
		$$
		Example:
		```js
		450 .deg === 90['°'] === 0.25
		```

#### `int`

:	This unit can be used to normalize individual components of RGB(A), HSL(A), HSV(A), or HWB(A) color models (such as _red, green, blue, lightness, blackness, alpha,_ etc.) from [integer offset][integer-interval] $s\in [-255, 255]$.
	```js
	   0 .int  // ⇒ 0.0
	-255 .int  // ⇒ -1.0
	 191 .int  // ⇒ 0.75 (roughly)
	0x7F .int  // ⇒ 0.5 (roughly)
	```

#### `byte`

:	Transforms a [real offset][offset-interval] to [integer offset][integer-offset-interval].
	```js
	 -1 .byte  // ⇒ -255
	0.5 .byte  // ⇒ 128
	```
	???+ warning

		Note that it doesn't guarantee an integer result. So in fact, `#!js 0.5.byte` returns `#!js 127.5`. This is done intentionally to avoid rounding errors when dealing with color functions.

[normalized-interval]: ../getting-started/basic-concepts.md#normalized-real-interval-norm "Normalized real interval"
[offset-interval]: ../getting-started/basic-concepts.md#normalized-real-offset-interval-offset "Normalized real offset inteval"
[integer-interval]: ../getting-started/basic-concepts.md#integer-interval-8bit "Integer interval"
[integer-offset-interval]: ../getting-started/basic-concepts.md#integer-offset-interval-9bit "Integer offset interval"

---8<--- "docs/abbreviations.md"
