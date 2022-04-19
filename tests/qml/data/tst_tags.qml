import QtQuick 2.15
import QtTest 1.1

import easy.colors 1.0

TestCase {
	name: 'Tags'

	function test_argb() {
		compare(argb`${1}${0.5}${0}${1}`, '#8000ff')
		compare(argb`${0.5}${0.5}${0}${1}`, '#808000ff')

		// string literal parts are ignored
		compare(argb`a:${1} r:${0.5} g:${0} b:${1}`, '#8000ff')

		let exc = false
		// missing parameter
		try { argb`${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes 4. You provided only 3.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { argb`${'1'}${0.5}${null}${1}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be numbers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { argb`${2}${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 1] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_argb32() {
		compare(argb32`${255}${128}${0}${255}`, '#8000ff')
		compare(argb32`${128}${128}${0}${255}`, '#808000ff')

		// string literal parts are ignored
		compare(argb32`a:${0xFF} r:${0x80} g:${0x00} b:${0xFF}`, '#8000ff')

		let exc = false
		// missing parameter
		try { argb32`${128}${0}${255}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes 4. You provided only 3.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { argb32`${'255'}${128}${null}${255}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be integers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { argb32`${256}${128}${0}${255}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 255] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
		try { argb32`${255}${-128}${0}${255}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 255] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_hsla() {
		compare(hsl`${0.75}${1}${0.5}`, '#8000ff')
		compare(hsla`${0.75}${1}${0.5}`, '#8000ff')
		compare(hsla`${0.75}${1}${0.5}${1}`, '#8000ff')
		compare(hsla`${0.75}${1}${0.5}${0.5}`, '#808000ff')

		// string literal parts are ignored
		compare(hsl`h:${0.75} s:${1} l:${0.5}`, '#8000ff')
		compare(hsla`h:${0.75} s:${1} l:${0.5}`, '#8000ff')
		compare(hsla`h:${0.75} s:${1} l:${0.5} a:${1}`, '#8000ff')

		let exc = false
		// missing parameter
		try { hsla`${0.5}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes from 3 to 4. You provided only 2.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { hsla`${0.75}${1}${null}${1}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be numbers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { hsla`${2}${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 1] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_hsva() {
		compare(hsv`${0.75}${1}${1}`, '#8000ff')
		compare(hsva`${0.75}${1}${1}`, '#8000ff')
		compare(hsva`${0.75}${1}${1}${1}`, '#8000ff')
		compare(hsva`${0.75}${1}${1}${0.5}`, '#808000ff')

		// string literal parts are ignored
		compare(hsv`h:${0.75} s:${1} v:${1}`, '#8000ff')
		compare(hsva`h:${0.75} s:${1} v:${1}`, '#8000ff')
		compare(hsva`h:${0.75} s:${1} v:${1} a:${1}`, '#8000ff')

		let exc = false
		// missing parameter
		try { hsva`${0.5}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes from 3 to 4. You provided only 2.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { hsva`${0.75}${1}${null}${1}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be numbers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { hsva`${2}${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 1] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_hwba() {
		compare(hwb`${0.75}${0}${0}`, '#8000ff')
		compare(hwba`${0.75}${0}${0}`, '#8000ff')
		compare(hwba`${0.75}${0}${0}${1}`, '#8000ff')
		compare(hwba`${0.75}${0}${0}${0.5}`, '#808000ff')

		// string literal parts are ignored
		compare(hwb`h:${0.75} w:${0} b:${0}`, '#8000ff')
		compare(hwba`h:${0.75} w:${0} b:${0}`, '#8000ff')
		compare(hwba`h:${0.75} w:${0} b:${0} a:${1}`, '#8000ff')

		let exc = false
		// missing parameter
		try { hwba`${0.5}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes from 3 to 4. You provided only 2.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { hwba`${0.75}${0}${null}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be numbers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { hwba`${2}${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 1] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_rgba() {
		compare(rgb`${0.5}${0}${1}`, '#8000ff')
		compare(rgba`${0.5}${0}${1}`, '#8000ff')
		compare(rgba`${0.5}${0}${1}${1}`, '#8000ff')
		compare(rgba`${0.5}${0}${1}${0.5}`, '#808000ff')

		// string literal parts are ignored
		compare(rgb`r:${0.5} g:${0} b:${1}`, '#8000ff')
		compare(rgba`r:${0.5} g:${0} b:${1}`, '#8000ff')
		compare(rgba`r:${0.5} g:${0} b:${1} a:${1}`, '#8000ff')

		let exc = false
		// missing parameter
		try { rgba`${0.5}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes from 3 to 4. You provided only 2.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { rgba`${0.5}${0}${null}${1}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be numbers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { rgba`${2}${0.5}${0}${1}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 1] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_rgba32() {
		compare(rgb24`${128}${0}${255}`, '#8000ff')
		compare(rgba32`${128}${0}${255}`, '#8000ff')
		compare(rgba32`${128}${0}${255}${255}`, '#8000ff')
		compare(rgba32`${128}${0}${255}${128}`, '#808000ff')

		// string literal parts are ignored
		compare(rgb24`r:${0x80} g:${0x00} b:${0xFF}`, '#8000ff')
		compare(rgba32`r:${0x80} g:${0x00} b:${0xFF}`, '#8000ff')
		compare(rgba32`r:${0x80} g:${0x00} b:${0xFF} a:${0xFF}`, '#8000ff')

		let exc = false
		// missing parameter
		try { rgba32`${128}${0}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'Insufficient number of arguments. The function takes from 3 to 4. You provided only 2.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// incorrect types
		try { rgba32`${'255'}${128}${null}${255}` }
		catch (error) {
			verify(error instanceof TypeError)
			compare(error.message, 'All parameters must be integers.')
			exc = true
		} finally {
			verify(exc); exc = false
		}

		// out of range
		try { rgba32`${256}${128}${0}${255}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 255] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
		try { rgba32`${255}${-128}${0}${255}` }
		catch (error) {
			verify(error instanceof RangeError)
			compare(error.message, 'All parameters must be within [0; 255] range.')
			exc = true
		} finally {
			verify(exc); exc = false
		}
	}

	function test_qolor () {
		compare(typeof qolor`indigo`, 'object')
		verify(qolor`indigo`.valid)
		verify(!(qolor`indigo` instanceof Colors.Color))

		compare(qolor`indigo`, '#4b0082')
		compare(qolor`ye${'ll'}ow`, '#ffff00')
		compare(qolor('yel' + 'low'), '#ffff00')
		compare(qolor`#7`, undefined)
		compare(qolor`#78`, undefined)

		compare(qolor`#789`, '#778899')
		compare(qolor`#789`.r, 0x77 / 255)
		compare(qolor`#789`.g, 0x88 / 255)
		compare(qolor`#789`.b, 0x99 / 255)

		compare(qolor`#6789`, '#66778899')
		compare(qolor`#56789`, undefined)
		compare(qolor`#778899`, '#778899')
		compare(qolor`#8000ff`, '#8000ff')
		compare(qolor`#56789AB`, undefined)
		compare(qolor`#808000ff`, '#808000ff')
		compare(qolor`#${'7f'}00${'ff'}`, '#7f00ff')
		compare(qolor`#${0x20}${0x00}${0xff}`, '#320255')
		compare(qolor`#${0x20}${0x00}${0xff}!`, '#2000ff')
		compare(qolor`${0x20}${0x00}${0xff}`, '#2000ff')
		compare(qolor`${0x80}${0x80}${0x00}${0xff}`, '#808000ff')
		compare(qolor`
			alpha: ${0x80}
			red: ${0x80}
			green: ${0x00}
			blue: ${0xff}
		`, '#808000ff')

		compare(q`indigo`, '#4b0082')
		compare(q`ye${'ll'}ow`, '#ffff00')
		compare(q('yel' + 'low'), '#ffff00')
		compare(q`#7`, undefined)
		compare(q`#78`, undefined)

		compare(q`#789`, '#778899')
		compare(q`#789`.r, 0x77 / 255)
		compare(q`#789`.g, 0x88 / 255)
		compare(q`#789`.b, 0x99 / 255)

		compare(q`#6789`, '#66778899')
		compare(q`#56789`, undefined)
		compare(q`#778899`, '#778899')
		compare(q`#8000ff`, '#8000ff')
		compare(q`#56789AB`, undefined)
		compare(q`#808000ff`, '#808000ff')
		compare(q`#${'7f'}00${'ff'}`, '#7f00ff')
		compare(q`#${0x20}${0x00}${0xff}`, '#320255')
		compare(q`#${0x20}${0x00}${0xff}!`, '#2000ff')
		compare(q`${0x20}${0x00}${0xff}`, '#2000ff')
		compare(q`${0x80}${0x80}${0x00}${0xff}`, '#808000ff')
		compare(q`
			alpha: ${0x80}
			red: ${0x80}
			green: ${0x00}
			blue: ${0xff}
		`, '#808000ff')
	}

	function benchmark_qolor_name() {
		qolor`indigo`
	}

	function benchmark_qolor_argb_string() {
		qolor`#808000ff`
	}

	function benchmark_qolor_argb32() {
		qolor`${0x80}${0x80}${0x00}${0xff}`
	}

	function test_color () {
		compare(typeof color`indigo`, 'object')
		verify(color`indigo` instanceof Colors.Color)

		compare(color`indigo`, '#4b0082')
		compare(color`ye${'l'.repeat(2)}ow`, '#ffff00')
		compare(color('yel' + 'low'), '#ffff00')
		compare(color`#7`.toString(), undefined)
		compare(color`#78`.toString(), undefined)
		compare(color`#789`, '#778899')
		compare(color`#6789`, '#66778899')
		compare(color`#56789`.toString(), undefined)
		compare(color`#778899`, '#778899')
		compare(color`#8000ff`, '#8000ff')
		compare(color`#56789AB`.toString(), undefined)
		compare(color`#808000ff`, '#808000ff')
		compare(color`#${'7f'}00${'ff'}`, '#7f00ff')
		compare(color`#${0x20}${0x00}${0xff}`, '#320255')
		compare(color`#${0x20}${0x00}${0xff}!`, '#2000ff')
		compare(color`${0x20}${0x00}${0xff}`, '#2000ff')
		compare(color`${0x80}${0x80}${0x00}${0xff}`, '#808000ff')
		compare(color`
			alpha: ${0x80}
			red: ${0x80}
			green: ${0x00}
			blue: ${0xff}
		`, '#808000ff')

		compare(cc`indigo`, '#4b0082')
		compare(cc`ye${'ll'}ow`, '#ffff00')
		compare(cc('yel' + 'low'), '#ffff00')
		compare(cc`#7`.toString(), undefined)
		compare(cc`#78`.toString(), undefined)
		compare(cc`#789`, '#778899')
		compare(cc`#6789`, '#66778899')
		compare(cc`#56789`.toString(), undefined)
		compare(cc`#778899`, '#778899')
		compare(cc`#8000ff`, '#8000ff')
		compare(cc`#56789AB`.toString(), undefined)
		compare(cc`#808000ff`, '#808000ff')
		compare(cc`#${'7f'}00${'ff'}`, '#7f00ff')
		compare(cc`#${0x20}${0x00}${0xff}`, '#320255')
		compare(cc`#${0x20}${0x00}${0xff}!`, '#2000ff')
		compare(cc`${0x20}${0x00}${0xff}`, '#2000ff')
		compare(cc`${0x80}${0x80}${0x00}${0xff}`, '#808000ff')
		compare(cc`
			alpha: ${0x80}
			red: ${0x80}
			green: ${0x00}
			blue: ${0xff}
		`, '#808000ff')
	}
}
