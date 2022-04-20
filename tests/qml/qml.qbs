import qbs

CppApplication {
	Depends {
		name: 'Qt'; versionAtLeast: '5.15'
		submodules: ['core', 'qmltest']
	}
	Depends { name: 'autotest' }

	name: 'tst_qml'
	type: ['application', 'autotest']

	property bool outputToFile: false
	property string outputFile: outputToFile? project.sourceDirectory + '/test-results.xml,junitxml' : '-'

	autotest.arguments: [
		'-o', outputFile,
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
