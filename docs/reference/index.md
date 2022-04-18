# Reference

## Notation

### Types of functions

To specify types of the functions' arguments and types of their return values, I use the following notation:

(`r`, `g`, `b`, `a = 1.0`: `8bit`) &rarr; `qolor`

!!! quote "Read it as following:"

	- The function takes 4 arguments: `r`, `g`, `b`, and `a`.
	- All arguments are of `8bit` type.
	- The `a` argument has default value `1.0`. Thus, it can be omitted.
	- The return value of the function is of type `qolor`.

#### Parameters of functions

Having a function like this:

**`sum`**: (`x`, `y`: `real`) &rarr; `real`

we can invoke it as following:

```js
sum(10, 3)
```

#### Parameters of tagged literals

Having a tag like this:

**`sum`**: (`x`, `y`: `real`) &rarr; `real`

we can use it as following:
```js
sum`${10}${3}`
```

In other words:

1. The whole literal is wrapped into backticks `` `
2. Parameters are specified between `${` and `}`.
3. Every parameter is an expression, thus it can be not only number literals like in most examples but also may contain some calculations:
	```js
	const arr = [1, 2, 3]
	sum`${1000}${arr.length - 1}`
	```

### Resulting color

I use `⇒ #RRGGBB` or `⇒ #AARRGGBB` syntax everywhere to express the resulting color in examples as following:

```qml hl_lines="6"
return Qt.rgba(
	0.5,
	0,
	1,
	0.5
)  // ⇒ #808000ff
```
