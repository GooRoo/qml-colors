# Installation

!!! question "Already have the library?"

	Skip to the [next article](./basic-concepts.md).

## Prerequisites

The library has _no external dependencies_ and is written completely in QML and JS, so it _doesn't require a C++ compiler_ either.

It also works on **all operating systems** where QML 2 works.

It was written and tested on **Qt 5.15,** however, maybe it would work starting with Qt 5.12. Usage with earlier versions is not possible because the library relies heavily on ECMA Script 2016 features that were missing in Qt before.

## Download

### via Git

=== "HTTPS"

	```sh
	git clone https://github.com/GooRoo/qml-colors.git
	```

=== "SSH"

	```sh
	git clone git@github.com:GooRoo/qml-colors.git
	```

### as archive

[Download zip](https://github.com/GooRoo/qml-colors/archive/refs/heads/main.zip){ .md-button .md-button--primary }

## Add to your project

I expect that whichever method of getting the source code of the library you chose, you've put it somewhere inside your project folder.

Now you are free to pack it as [Qt resources](https://doc.qt.io/qt-5/resources.html) or bundle it along with your app[^1].

The only thing you have to do is to add a corresponding [**import path**](https://doc.qt.io/qt-5/qtqml-syntax-imports.html#qml-import-path) to your QML engine.

Having the library installed under `3rdParty/qml-colors`, the line that should do the trick will be something similar to:

=== "In resources"

	```cpp hl_lines="2"
	QQmlApplicationEngine engine;
	engine.addImportPath("qrc:/3rdParty/qml-colors/qml");
	```

=== "Locally"

	```cpp hl_lines="2"
	QQmlApplicationEngine engine;
	engine.addImportPath(app.applicationDirPath() + "3rdParty/qml-colors/qml");
	```

In any case, you know your project structure better. Just don't forget to add the import path using any of the available ways.

## Use in QML

Just import the module **at least once** anywhere in your project:

=== "Qt 5"

	```qml
	import easy.colors 1.0
	```

=== "Qt 6"

	```qml
	import easy.colors  // never tested it in Qt 6 by the way
	```

??? info "Note on `import`"

	You don't need to `import` it in every file where you want to work with colors because the library modifies the root context object making its functions available everywhere. However, it would hurt no one if you put a corresponding `import` in every file.

	If only one of your files will contain the `import`, remember that it should be the file loaded by QML Engine before you try to use any of the library's facilities. Let it be your `main.qml` in such a case.

## Done

!!! success

	If you did everything according to this manual, you are good to go with using the library now!

[^1]: For that, read the docs of the build system of your choice.
