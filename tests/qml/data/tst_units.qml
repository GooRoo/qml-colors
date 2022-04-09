import QtTest 1.1
import testUtils 1.0

import easy.colors 1.0

TestCase {
	name: 'Units'

	function test_percent() {
		compare(0.5.percent, 0.005)
		compare(-10 .percent, -0.1)
		compare(42['percent'], 0.42)
		compare(+146 .percent, 1.46)

		compare(0.5['%'], 0.005)
		compare(-10['%'], -0.1)
		compare(146['%'], 1.46)
	}

	function test_deg() {
		compare(45 .deg, 0.125)
		compare(-90 .deg, -0.25)
		compare(180['deg'], 0.5)
		compare(+450 .deg, 0.25)

		compare(45['°'], 0.125)
		compare(-90['°'], -0.25)
		compare(180['°'], 0.5)
		compare(+450['°'], 0.25)
	}
}
