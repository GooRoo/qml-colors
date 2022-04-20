---
hide:
  - navigation
---

# Development

## Running tests

The best way of making some changes or adding new functionality is to write tests first.

I use [Qbs](https://qbs.io)[^Qt] as the build system because I like it the most. Please, read the documentation to learn how to set it up.

To run the tests, simply execute the command:

```sh
qbs build
```

## Writing documentation

For this documentation, I use [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). You'll need a working Python interpreter to use it.

Assuming that you have it, first install the MkDocs:

=== "macOS / Linux"

	```sh
	pip3 install mkdocs-material
	```

=== "Windows"

	```powershell
	pip install mkdocs-material
	```

Then, to run the documentation site locally, you can use:

```sh
mkdocs serve
```

For the rest of features, check their documentation.

[^Qt]: It was also [developed by Qt](https://doc.qt.io/qbs/) company in the past
