export function anyOf (collection, predicate) {
	for (const element of collection) {
		if (predicate(element)) {
			return true
		}
	}
	return false
}

export function allOf (collection, predicate) {
	for (const element of collection) {
		if (!predicate(element)) {
			return false
		}
	}
	return true
}

export function clamp (n, min = 0.0, max = 1.0) {
	return Math.max(Math.min(n, max), min)
}

export function absmod (n, r) {
	let result = n % r
	if (result < 0.0) {
		result += r
	}
	return result
}
