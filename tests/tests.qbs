import qbs

Project {
	references: [
		'qml/qml.qbs',
	]

	AutotestRunner {
		Depends { name: 'Qt.core'; versionAtLeast: '5.15' }

		builtByDefault: true

		environment: {
			var env = base

			// Windows
			if (qbs.hostOS.contains('windows') && qbs.targetOS.contains('windows')) {
				var withoutQt = 'PATH='
				var withQt = 'PATH=' + Qt.core.binPath + ';'

				var pathIndex = -1
				for (var i = 0; i < env.length; i++) {
					if (env[i].startsWith(withoutQt)) {
						pathIndex = i
						break
					}
				}

				if (pathIndex != -1)
					env[pathIndex] = env[pathIndex].replace(withoutQt, withQt)
				else
					env.push(withQt)
			}

			// Mac
			if (qbs.hostOS.contains('darwin') && qbs.targetOS.contains('darwin')) {
				env.push('DYLD_FRAMEWORK_PATH=' + Qt.core.libPath)
				env.push('DYLD_LIBRARY_PATH=' + Qt.core.libPath)
			}

			return env
		}
	}
}
