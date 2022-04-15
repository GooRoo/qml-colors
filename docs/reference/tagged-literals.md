# Tagged literals

This feature is based on [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) from ES2016.

#### `argb`

:	(`alpha`, `red`, `green`, `blue`: [`norm`][norm]) &rarr; [`qolor`][qolor]

	As tagged literal:
	```js
	argb`${0.5}${0.5}${0}${1}  // ⇒ #8000ff, alpha = 0.5
	```

#### `argb32`

:	(`alpha`, `red`, `green`, `blue`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]

#### `hsla` (or `hsl`)

:	(`hue`, `saturation`, `lightness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

#### `hsva` (or `hsv`)

:	(`hue`, `saturation`, `value`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

#### `hwba` (or `hwb`)

:	(`hue`, `whiteness`, `blackness`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

#### `rgba` (or `rgb`)

:	(`red`, `green`, `blue`, `alpha = 1.0`: [`norm`][norm]) &rarr; [`qolor`][qolor]

#### `rgba32` (or `rgb24`)

:	(`red`, `green`, `blue`, `alpha = 255`: [`8bit`][8bit]) &rarr; [`qolor`][qolor]

#### `qolor` (or `q`)

:	(various types) &rarr; [`qolor`][qolor]

#### `color` (or `c`)

:	(various types) &rarr; [`color`][color]

[norm]: /getting-started/basic-concepts/#normalized-real-interval-norm
[8bit]: /getting-started/basic-concepts/#integer-interval-8bit
[qolor]: /getting-started/basic-concepts/#qolor
[color]: /getting-started/basic-concepts/#color
