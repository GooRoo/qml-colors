.pragma library

Object.defineProperty(Number.prototype, 'percent', {
	get: function () {
		return this / 100
	}
})

Object.defineProperty(Number.prototype, '%', {
	get: function () {
		return this / 100
	}
})

Object.defineProperty(Number.prototype, 'int', {
	get: function () {
		return this / 255
	}
})

Object.defineProperty(Number.prototype, 'byte', {
	get: function () {
		return this * 255
	}
})

Object.defineProperty(Number.prototype, 'deg', {
	get: function () {
		return (this % 360) / 360
	}
})

Object.defineProperty(Number.prototype, '°', {
	get: function () {
		return (this % 360) / 360
	}
})
