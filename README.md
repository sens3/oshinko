# Kraut #
## Gherkin (Cucumber) for iOS UIAutomation ##

Krauts allows you to write features in [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) that will execute code with iOS UIAutomation.

For example:

	Scenario: Going to the New Players screen
		Given I am on the "Players" tab
		When I tap the right navigation bar
		Then I should see a navigation bar with title "Add Player"
		

Step Definitions are defined in Javascript:

	Kraut.given(/I am on the "([^\"]*)" tab/, function(window, tabName) {

    	var tabBar = window.tabBar();
    	tabBar.buttons().firstWithName(tabName).tap();
        
	});
	
	Kraut.then(/I should see a navigation bar with title "([^\"]*)"/, function(window, captures) {
    
    	var navBar = window.navigationBar();
    	var title = captures[0];
    	assertEquals(title, navBar.name());
    
	});
	

## Install ##


You can use git submodules to add Kraut to your project

	git submodule add git://github.com/sens3/kraut.git
  
Kraut itself uses git submodules for it's one dependency: [tuneup_js](https://github.com/alexvollmer/tuneup_js).
Thus, make sure to install the submodules by running:
	
	git submodule update --recursive
	 
Kraut ships with a bunch of default step definitions, like the one above. And tuneup's assertion methods are used to implement them.

## Setup ##

Kraut expects a certain directory structure:

	MyAppUITests
		- /js
			- /kraut
			- /step_definitions # your step definitions, if you have any
			- main.js # or whatever your main file is that will be executed by UIAutomation
		- /features
			- foo.feature
			- bar.feature

Your main script *might* look like this:

	// Load Kraut
	#import "kraut/kraut.js"

	// Load your step definitions (if you have any)
	#import "step_definitions/mine.js"

	// set the path to your features directory
	var featureDirectory = "/path/to/your/app/features/";

	Kraut.runFeaturesInDir ( featureDirectory ); 

If you run your main script using the `instruments` CLI `featuredDirectory` can be relative to the directory you run it from.  

If you run it directly from within Instruments `featuresDirectory` needs to be absolute.


## Notes ##
Not all of Gherkin is yet implemented. What you can do is the basic Given/When/Then/And.

Kraut can not reset your app after each scenario. Thus, all steps, throughout all features and scenarios are run sequentially.



