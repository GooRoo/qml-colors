import QtTest 1.1
import testUtils 1.0

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
	}
}
