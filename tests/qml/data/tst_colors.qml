import QtQuick 2.15
import QtTest 1.1
import testUtils 1.0

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
		}
		verify(exc); exc = false

		// incorrect length
		try { hexStringToReal('abc') }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'The input must be either 1 or 2 hex-digit(s).')
			exc = true
		}
		verify(exc); exc = false

		// negative number
		try { hexStringToReal('-1') }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'The input must be either 1 or 2 hex-digit(s).')
			exc = true
		}
		verify(exc); exc = false
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
		}
		verify(exc); exc = false

		// unknown color
		try { fromString('#nightmoon') }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
			exc = true
		}
		verify(exc); exc = false

		// invalid ARGB
		try { fromString('#56789') }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'The color must be one of the following: #rgb, #argb, #rrggbb, #aarrggbb.')
			exc = true
		}
		verify(exc); exc = false
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
		}
		verify(exc); exc = false

		// some wrong argument
		try { copy(42) }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, "Can't create a color object from the argument.")
			exc = true
		}
		verify(exc); exc = false
	}
}
