import qbs

CppApplication {
	name: 'tst_qml'
	type: ['application', 'autotest']

	Depends {
		name: 'Qt'; versionAtLeast: '5.15'
		submodules: ['core', 'qmltest']
	}
	Depends { name: 'autotest' }

	autotest.arguments: [
		'-import', project.sourceDirectory + '/qml',
		'-import', product.sourceDirectory,
		'-input', product.sourceDirectory
	]

	cpp.cxxLanguageVersion: 'c++17'
	consoleApplication: true

	files: [
		'tst_qml.cpp',
		'data/tst_*.qml'
	]
}
