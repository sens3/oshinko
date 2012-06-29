var host = {
	mock: "host",
	performTaskWithPathArgumentsTimeout: function() {
		return {
			stdout: "foo.txt\nbar.txt\n",
			stderr: undefined
		}
	}
}

var frontMostApp = { 
	mock: "frontMostApp",
	mainWindow: function(){
		return {
			mock: "mainWindow"
		}
	}
}

var localTarget = {
	mock: "localTarget",
	frontMostApp: function() { return frontMostApp; },
	host: function() { return host; },
	logElementTree: function() {}
}

var UIATarget = {
  localTarget: function() { return localTarget; }
};

var UIALogger = {
	logStart: function(){},
	logPass: function(){},
	logFail: function(){},
	logMessage: function(){},
	logError: function(){}
};