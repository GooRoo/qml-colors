import QtTest 1.1

import easy.colors 1.0

TestCase {
	name: 'Utils'

	function test_anyOf() {
		const anyOf = ColorUtils.anyOf
		verify( anyOf([1, 2, 3],        Number.isInteger))
		verify( anyOf([1, null, 2.5],   Number.isInteger))
		verify(!anyOf(['1', null, 2.5], Number.isInteger))
	}

	function test_allOf() {
		const allOf = ColorUtils.allOf
		verify( allOf([1, 2, 3],        Number.isInteger))
		verify(!allOf([1, null, 2.0],   Number.isInteger))
		verify(!allOf(['1', null, 2.5], Number.isInteger))
	}

	function test_clamp() {
		const clamp = ColorUtils.clamp
		compare(clamp(1.5), 1)
		compare(clamp(-1.5), 0)
		compare(clamp(0.01), 0.01)

		compare(clamp(1.5, -1), 1)
		compare(clamp(-1.5, -1), -1)
		compare(clamp(0.01, -1), 0.01)

		compare(clamp(5, -10, 10), 5)
		compare(clamp(-20, -10, 10), -10)
		compare(clamp(20, -10, 10), 10)
		compare(clamp(-10, -10, 10), -10)
		compare(clamp(10, -10, 10), 10)
	}

	function test_absmod() {
		const absmod = ColorUtils.absmod
		compare(absmod(3, 2), 1)
		compare(absmod(-3, 2), 1)

		verify(absmod(3, 2) === 3 % 2)
		verify(absmod(-3, 2) !== -3 % 2)

		compare(absmod(-90, 360), 270) // useful with degrees
	}

	property string c1: '#8000ff'
	property color c2: '#8000ff'
	function test_isQtColor() {
		const isQtColor = ColorUtils.isQtColor
		verify( isQtColor(Qt.rgba(0.5, 0, 1, 1)))
		verify( isQtColor(Qt.hsla(0.75, 1, 0.5, 1)))
		verify(!isQtColor(c1))
		verify( isQtColor(c2))
		verify(!isQtColor(cc`orange`))
	}

	function test_isQtColorCompatible() {
		const isQtColorCompatible = ColorUtils.isQtColorCompatible
		verify( isQtColorCompatible(Qt.rgba(0.5, 0, 1, 1)))
		verify( isQtColorCompatible(Qt.hsla(0.75, 1, 0.5, 1)))
		verify(!isQtColorCompatible(c1))
		verify( isQtColorCompatible(c2))
		verify( isQtColorCompatible(cc`orange`))
	}

	function test_textToColor() {
		const textToColor = ColorUtils.textToColor
		compare(
			textToColor(`Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
				Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
				purus lectus malesuada libero, sit amet commodo magna eros quis urna.`),
			'#42acb8'
		)
		compare(
			textToColor(`Pellentesque habitant morbi tristique senectus et netus et
				malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.`),
			'#213d57'
		)

		const name = 'John'
		compare($.textToColor`Hello, ${name}!!!`, '#234a90')
	}
}
