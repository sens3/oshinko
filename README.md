# Kraut #
## Gherkin (Cucumber) for iOS UIAutomation ##

Krauts allows you to write features in [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) that will execute code with iOS UIAutomation.

Step Definitions are defined in Javascript:

	Kraut.given(/I am on the "([^\"]*)" tab/, function(target, app, tabName) {
    	var window = app.mainWindow();
    	var tabBar = window.tabBar();
    	tabBar.buttons().firstWithName(tabName).tap();
	});


You can use git submodules to add Kraut to your project

	git submodule add git://github.com/apporchard/kraut.git
  
You also need to install [tuneup_js](https://github.com/alexvollmer/tuneup_js)

    git submodule add git://github.com/alexvollmer/tuneup_js.git tuneup

Kraut expects a certain directory structure:

	MyAppTests
		- js
			- kraut
			- step_definitions # your step definitions
			- tuneup # https://github.com/alexvollmer/tuneup_js
			- main.js # or whatever your main file is that will be executed by UIAutomation
		- features
			- foo.feature
			- bar.feature

At the top of your main test script import Kraut:

    #import kraut/kraut.js
  
Start running Kraut:
      
    Kraut.run();
  
  