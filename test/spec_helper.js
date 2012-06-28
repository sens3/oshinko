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
	mock: "frontMostApp"
}

var localTarget = {
	mock: "localTarget",
	frontMostApp: function() { return frontMostApp; },
	host: function() { return host; }
}

var UIATarget = {
  localTarget: function() { return localTarget; }
};