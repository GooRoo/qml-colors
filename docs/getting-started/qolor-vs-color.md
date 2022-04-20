# `qolor` vs `color`

When it comes to choosing between [`qolor`][qolor] and [`color`][color], it solely depends on the matter of your taste.

There are three key differences:

1. [`color`][color] is a wrapper around [`qolor`][qolor], so you can't assign it directly to QML's [`color` property](https://doc.qt.io/qt-5/qml-color.html). You need to [unwrap](../reference/color.md#color) it first.
2. [`qolor`][qolor] misses some properties that [`color`][color] has. For example, it lacks HWB support completely.
3. You can chain color transformations on [`color`][color] via dot-syntax, but not on [`qolor`][qolor] where you have to use procedural style with functions.

I'll demonstrate these and other differences on the examples below:

## Examples

### Creating a color

#### using a [color keyword](../reference/color-names.md) in QML

=== "`qolor`"

	```qml hl_lines="2"
	Rectangle {
		color: q`indigo`
	}
	```

=== "`color`"

	```qml hl_lines="2"
	Rectangle {
		color: cc`indigo`.color
	}
	```

#### using a [color keyword](../reference/color-names.md) in JS

=== "`qolor`"

	```qml hl_lines="3"
	Item {
		Component.onCompleted: {
			const c = q`indigo`
			console.log('RGB:', c.r, c.g, c.b)
		}
	}
	```

=== "`color`"

	```qml hl_lines="3"
	Item {
		Component.onCompleted: {
			const c = cc`indigo`
			console.log('RGB:', c.r, c.g, c.b)
		}
	}
	```

#### using an [ARGB literal](./basic-concepts.md#color-literal)

=== "`qolor`"

	```qml hl_lines="2"
	Rectangle {
		color: q`#cc8000ff`
	}
	```

=== "`color`"

	```qml hl_lines="2"
	Rectangle {
		color: cc`#cc8000ff`.color
	}
	```

#### using an [RGB32 literal](../reference/tagged-literals.md#argb32)

=== "`qolor`"

	```qml hl_lines="2"
	Rectangle {
		color: q`${128} ${0} ${255}`
	}
	```

=== "`color`"

	```qml hl_lines="2"
	Rectangle {
		color: cc`${128} ${0} ${255}`.color
	}
	```

### Accessing color components separately

#### Changing hue and saturation manually

=== "`qolor`"

	```qml hl_lines="3-6"
	Rectangle {
		color: {
			let c = q`indigo`
			c.hslHue = 270 / 360
			c.hslSaturation += 0.1
			return c
		}
	}
	```

=== "`color`"

	```qml hl_lines="3-6"
	Rectangle {
		color: {
			let c = cc`indigo`
			c.hue = 270['°']
			c.saturation += 10['%']
			return c.color
		}
	}
	```

#### Printing as HWB

=== "`qolor`"

	```qml
	// no support
	```

=== "`color`"

	```js
	Item {
		function printAsHwb({hue: h, blackness: b, whiteness: b}) {
			const fl = Math.floor
			console.log(`hwb(${fl(h * 360)}°, ${fl(w * 100)}%, ${fl(b * 100)}%)`)
		}

		Component.onCompleted: {
			printAsHwb(cc`indigo`)  // ⇒ hwb(275°, 0%, 49%)
		}
	}
	```

### Modification of a color

#### [Inverting](../reference/color.md#invert) a color

=== "`qolor`"

	```qml hl_lines="2"
	Rectancle {
		color: $.invert(q`indigo`)
	}
	```

=== "`color`"

	```qml hl_lines="2"
	Rectangle {
		color: cc`indigo`.invert().color
	}
	```

#### Chain of modifications

=== "`qolor`"

	```qml hl_lines="2-9"
	Rectangle {
		color:
			$.adjust(
				$.mix(
					$.desaturate(
						$.adjustHue(cc`#0000ff`, -105 .deg),
						20 .percent),
					'red', 85 .percent),
				{alpha: -30 .percent})
	}
	```

=== "`color`"

	```qml hl_lines="2-7"
	Rectangle {
		color: cc`#0000ff`
				.adjustHue(-105 .deg)
				.desaturate(20 .percent)
				.mix('red', 85 .percent)
				.adjust({alpha: -30 .percent})
				.color
	}
	```

## Instead of conclusion

As you can see from examples, in most cases it's enough to use [`qolor`][qolor] and modifying [functions](../reference/functions.md#modificators). The real beauty of [`color`][color] comes when you need to chain modifications as [methods](../reference/color.md#methods) or when you need to work with extended set of [properties](../reference/color.md#properties) (for example, with HWB).

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
