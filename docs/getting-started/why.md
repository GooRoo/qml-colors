# Why? a.k.a. Rationale

## What does Qt offer?

You may be wondering why we need an additional library to work with colors in QML. Does anyone really lack it? Also, Qt provides some functions, doesn't it? Aren't they enough?

??? info "Spoiler"

	NO, they aren't enough.

I'd expect you want more details. So, we start with an examination of what is already available in Qt Quick.

### Qt Quick's `color`

Maybe it's not that important but beneficial to understand that QML language itself does not provide any `color` type. Instead, it's [registered by Qt Quick](https://doc.qt.io/qt-5/qtquick-qmlmodule.html#basic-types) framework which is bound to QML so tightly that many people do not distinguish them. Internally, it's implemented as [`Q_GADGET`](https://doc.qt.io/qt-5/qobject.html#Q_GADGET), so, despite its type being determined as `'object'`, we can consider it as a value type, i.e. value semantics is applied, I guess.

Having this special type allows us to create properties or variables both declaratively (via property declaration)
```qml
property color backgroundColor: 'red'
```
and imperatively (via corresponding functions)
```qml
let c = Qt.rgba(1.0, 0.0, 0.0, 0.0, 1.0)
```
However, the overall abilities to work with colors are quite limited. Let's consider three aspects: creation, initialization/assignment, and modification.

#### Creation

As mentioned above, the simplest way of creating a color is to define a property of the `color` type. Besides that, the following functions are available to create colors imperatively:

- [`Qt.rgba(r, g, b, a)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#rgba-method)
- [`Qt.hsla(h, s, l, a)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#hsla-method)
- [`Qt.hsva(h, s, v, a)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#hsva-method)

#### Initialization / assignment

To initialize with or assign to a color property or variable, you to pass a result of one of the [creational functions](#creation).

With a `color`-property, you have one additional choice of passing a string as value. In such a case, the string is implicitly converted to color if it follows one of the following formats:

- `#!qml '<color_name>'`
- `#!qml '#RGB'` (translates to `#!qml '#RRGGBB'`, for instance, `#!qml '#70f'` becomes `#!qml '#7700ff'`. It's not mentioned anywhere in the official documentation by the way.)
- `#!qml '#RRGGBB'`
- `#!qml '#AARRGGBB'`

#### Modification

To modify a color value without deconstructing it and building again, you have the following standard functions:

- [`Qt.darker(color, factor = 2.0)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#darker-method)
- [`Qt.lighter(color, factor = 2.0)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#lighter-method)
- [`Qt.tint(baseColor, tintColor)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#tint-method)

The `darker`/`lighter` functions use quite weird logic behind their `factor` argument (like they were written by programmers _for programmers,_ ha-ha), e.g. `#!qml Qt.darker('red', factor)` sets the color's brightness to $\dfrac{1}{factor}$. So if you want to get a color that is 75% as bright as the original one, you have to use the `factor` of $\dfrac{4}{3}$, right? :exploding_head: Good luck with explaining this to your designers!

How the `tint` function works, I have no clue. In which proportions does it mix the colors? No idea!

#### Other

There is one more auxiliary function: [`Qt.colorEqual(lhs, rhs)`](https://doc.qt.io/qt-5/qml-qtqml-qt.html#colorEqual-method). It's supposed to compare the colors for equality. Guess why? Because you can't simply write `#!qml '#ff0000' === 'red'` as it would compare strings. The official documentation says its return type is `color` which is obviously not correct.

### What's wrong with standard functions?

It's a good topic for a separate article which I'll definitely write one day but let me outline at least the most noticeable inconveniences:

- Poor official documentation on colors in general
- No way to create a `color` instance from `string` imperatively
- There are only functions that work with normalized values ($\in [0.0, 1.0]$), but no functions that work with commonly used integer values ($\in [0, 255]$).
- Not even close to CSS3 (not saying about SCSS/Sass).

## Why in JavaScript and not in C++?

When it comes to making things convenient, C++ is the last thing I would think about. And that is related not only to the development of the library itself but also to further usage.

Indeed, the process of connecting a QML module, (partially) written in C++, is quite cumbersome, and heavily relies on the build system of choice and on your toolchain in general. At the same time, you have to do only two steps in order to start using my library.

??? note "Note to future generations"

	It's quite possible though that the next version of the library will be in C++, but if so, it will be released under another name anyway.
