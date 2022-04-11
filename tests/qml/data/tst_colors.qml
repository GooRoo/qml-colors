import QtQuick 2.15
import QtTest 1.1

import easy.colors 1.0

TestCase {
	id: root
	name: 'Colors'

	function test_Qolor_hexStringToReal() {
		const hexStringToReal = Colors.Qolor.hexStringToReal
		compare(hexStringToReal('0'), 0x00 / 255)
		compare(hexStringToReal('1'), 0x11 / 255)
		compare(hexStringToReal('9'), 0x99 / 255)
		compare(hexStringToReal('a'), 0xAA / 255)
		compare(hexStringToReal('f'), 0xFF / 255)
		compare(hexStringToReal('A'), 0xAA / 255)
		compare(hexStringToReal('F'), 0xFF / 255)

		compare(hexStringToReal('12'), 0x12 / 255)
		compare(hexStringToReal('92'), 0x92 / 255)
		compare(hexStringToReal('a2'), 0xA2 / 255)
		compare(hexStringToReal('f2'), 0xF2 / 255)
		compare(hexStringToReal('A2'), 0xA2 / 255)
		compare(hexStringToReal('F2'), 0xF2 / 255)

		let exc = false
		// incorrect input type
		try { hexStringToReal(1) }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'The input argument must be of string type.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect length
		try { hexStringToReal('abc') }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'The input must be either 1 or 2 hex-digit(s).')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// negative number
		try { hexStringToReal('-1') }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'The input must be either 1 or 2 hex-digit(s).')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_Qolor_fromString() {
		const fromString = Colors.Qolor.fromString

		verify(ColorUtils.isQtColor(fromString('indigo')))

		compare(fromString('yellow'), '#ffff00')
		compare(fromString('blanchedalmond'), '#ffebcd')
		compare(fromString('salmon'), '#fa8072')
		compare(fromString('transparent'), '#00000000')

		compare(fromString('#789'), '#778899')
		compare(fromString('#789').r, 0x77 / 255)
		compare(fromString('#789').g, 0x88 / 255)
		compare(fromString('#789').b, 0x99 / 255)

		compare(fromString('#6789'), '#66778899')
		compare(fromString('#778899'), '#778899')
		compare(fromString('#8000ff'), '#8000ff')
		compare(fromString('#808000ff'), '#808000ff')

		let exc = false
		// unknown color
		try { fromString('nightmoon') }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Unknown color.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// unknown color
		try { fromString('#nightmoon') }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// invalid ARGB
		try { fromString('#56789') }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	property color c1
	property color c2
	property color invalid  // no initial value => invalid color, because it can't be undefined
	function test_Qolor_copy() {
		const copy = Colors.Qolor.copy

		function withUpdatedGreen(c, g) {
			c.g = g
			return c
		}

		// As we can see, colors are treated as primitive values,
		// i.e. the comparison is not referential
		compare(Qt.rgba(0.5, 0, 1, 1), Qt.rgba(0.5, 0, 1, 1))

		// Thus, we can't simply check as following
		// verify(c1 !== copy(c1))

		// instead:

		c1 = '#ffff00'
		compare(c1, '#ffff00')
		// pass by reference
		c2 = withUpdatedGreen(c1, 0.5)
		compare(c1, c2)
		compare(c1, '#ff8000')
		compare(c2, '#ff8000')

		c1 = '#ffff00'
		compare(c1, '#ffff00')
		// pass as copy
		c2 = withUpdatedGreen(copy(c1), 0.5)
		verify(c1 !== c2)
		compare(c1, '#ffff00')
		compare(c2, '#ff8000')

		// empty
		compare(copy(), undefined)
		compare(copy(null), null)

		// string
		compare(copy('yellow'), '#ffff00')
		compare(copy('#ff8000'), '#ff8000')
		verify(typeof copy('#ff8000') !== 'string')
		compare(copy('#ff8000').g, 0x80 / 255)

		let exc = false
		// invalid color
		try { copy(invalid) }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Invalid color.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// some wrong argument
		try { copy(42) }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, "Can't create a color object from the argument.")
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	// readonly property var cc: new Colors.Color(Colors.Qolor.fromString('yellow'))
	// property color c3: cc.color
	// property color c4: cc.transparentize(0.5).color
	// property color c5: cc.color
	// function test_Color_inplace() {
		// compare(c3, '#ffff00')
		// console.warn(c3.color)
		// compare(c4, '#80ffff00')
		// console.warn(c`yellow`.transparentize(0.5))
		// compare(c5, '#ffff00')
		// cc.fadeIn()
		// console.warn('------------------')
		// console.warn(c5)
		// console.warn('------------------')
	// }
	// onC5Changed: {
	// 	console.warn('------------------')
	// 	console.warn(c5)
	// 	console.warn('------------------')
	// }

	function test_Color_adjust() {
		compare(
			c`#6b717f`.adjust({rgb: {r: +15 .int}}),
			 '#7a717f'
		)
		compare(
			c`#d2e1dd`.adjust({rgb: {red: -10 .int, blue: +10 .int}}),
			 '#c8e1e7'
		)
		compare(
			c`#998099`.adjust({
				hsl: {lightness: -30 .percent},
			    alpha: -40 .percent
			}),
			rgba32`r${71} g${57} b${71} a${0.6.byte}`.toString()
		)
	}

	function test_Color_adjustHue() {
		compare(
			c`#6b717f`.adjustHue(+60 .deg),
			 '#796b7f'
		)
		compare(
			c`#d2e1dd`.adjustHue(-60['°']),
			 '#d6e1d2'
		)
		compare(
			c`#d2e1dd`.adjustHue(-780 .deg),  // 720 + 60
			 '#d6e1d2'
		)
		compare(
			c`#036`.adjustHue(+45 .deg),
			 '#1a0066'
		)
		compare(
			c`#036`.adjustHue(+405 .deg),  // 360 + 45
			 '#1a0066'
		)
		compare(
			c`#6b717f`.adjustHue(+60 .deg).hue,
			c`#6b717f`.hue + 60 .deg
		)
	}

	function test_Color_change() {
		compare(
			c`#6b717f`.change({rgb: {r: 100 .int}}),
			 '#64717f'
		)
		compare(
			c`#d2e1dd`.change({rgb: {red: 100 .int, blue: 50 .int}}),
			 '#64e132'
		)
		compare(
			c`#998099`.change({
				hsl: {lightness: 30 .percent},
			    alpha: 0.5
			}),
			rgba32`r${85} g${68} b${85} a${0.5 .byte}`.toString()
		)
	}

	function test_Color_complement() {
		compare(
			c`#6b717f`.complement(),
			 '#7f796b'
		)
		compare(
			c`#d2e1dd`.complement(),
			 '#e1d2d6'
		)
		compare(
			c`#036`.complement(),
			 '#663300'
		)
	}

	function test_Color_darken() {
		compare(
			c`#b37399`.darken(20['%']),
			 '#7c4465'
		)
		compare(
			c`#f2ece4`.darken(40['%']),
			 '#b08b5a'
		)
		compare(
			c`#036`.darken(30['%']),
			 '#000000'
		)
	}

	function test_Color_desaturate() {
		compare(
			c`#036`.desaturate(20 .percent),
			 '#0a335c'
		)
		compare(
			c`#f2ece4`.desaturate(20 .percent),
			 '#eeebe8'
		)
		compare(
			c`#d2e1dd`.desaturate(30 .percent),
			 '#dadada'
		)
	}

	function test_Color_grayscale() {
		compare(
			c`#6b717f`.grayscale(),
			 '#757575'
		)
		compare(
			c`#d2e1dd`.grayscale(),
			 '#dadada'
		)
		compare(
			c`#036`.greyscale(),  // grayscale == greyscale
			 '#333333'
		)
	}

	function test_Color_invert() {
		compare(
			c`#b37399`.invert(),
			 '#4c8c66'
		)
		compare(
			c`black`.invert().color,
			q`white`
		)
		compare(
			c`#550e0c`.invert(20 .percent),
			 `#663b3a`
		)
	}

	function test_Color_lighten() {
		compare(
			c`#6b717f`.lighten(20 .percent),
			 '#a1a5af'
		)
		compare(
			c`#036`.lighten(60 .percent),
			 '#99ccff'
		)
		compare(
			c`#e1d7d2`.lighten(30 .percent),
			 '#ffffff'
		)
	}

	function test_Color_mix() {
		compare(
			c`#036`.mix(c`#d2e1dd`),
			 '#698aa2'
		)
		compare(
			c`#036`.mix(q`#d2e1dd`, 75 .percent),
			 '#355f84'
		)
		compare(
			c`#036`.mix('#d2e1dd', 25 .percent),
			 '#9eb6bf'
		)
		compare(
			c`${0.5.byte} ${242} ${236} ${228}`.mix(c`#6b717f`),
			rgba32`${141} ${144} ${152} ${0.75.byte}`.toString()
		)
	}

	function test_Color_opacify() {
		compare(
			c`#806b717f`.opacify(0.2),
			rgba32`${107} ${113} ${127} ${0.7.byte}`.toString()
		)
		compare(
			c`#80e1d7d2`.fadeIn(40['%']),
			rgba32`${225} ${215} ${210} ${90 .percent.byte}`.toString()
		)
		compare(
			c(rgba('#036', 0.3)).opacify(70['%']).color,
			q`#003366`
		)
	}

	function test_Color_saturate() {
		compare(
			c`#c69`.saturate(20 .percent),
			 '#e05299'
		)
		compare(
			c`#f2ece4`.saturate(50 .percent),
			 '#fcedda'
		)
		compare(
			c`#0e4982`.saturate(30 .percent),
			 '#004990'
		)
	}

	function test_Color_scale() {
		compare(
			c`#6b717f`.scale({rgb: {red: +15 .percent}}),
			 '#81717f'
		)
		compare(
			c`#d2e1dd`.scale({hsl: {l: -10['%'], s: +10['%']}}),
			 '#b3d4cb'
		)
		compare(
			c`#998099`.scale({a: -40 .percent}).color,
			rgba('#998099', 0.6)
		)
	}

	function test_Color_transparentize() {
		compare(
			c`#806b717f`.transparentize(0.2),
			rgba32(107, 113, 127, 0.3.byte).toString()
		)
		compare(
			c(rgba('#e1d7d2', 0.5)).fadeOut(0.4).color,
			rgba32(225, 215, 210, 0.1.byte)
		)
		compare(
			c(rgba('#036', 0.3)).transparentize(0.3).color,
			rgba32(0, 51, 102, 0)
		)
	}
}
