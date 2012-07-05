# Oshinko #
## Gherkin (Cucumber) for iOS UIAutomation ##

Oshinko allows you to write features in [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) that will execute code with iOS UIAutomation.

For example:

	Scenario: Going to the New Players screen
		Given I am on the "Players" tab
		When I tap the right navigation bar
		Then I should see a navigation bar with title "Add Player"
		

Step Definitions are defined in Javascript:

	Oshinko.given(/I am on the "([^\"]*)" tab/, function(window, tabName) {

    	var tabBar = window.tabBar();
    	tabBar.buttons().firstWithName(tabName).tap();
        
	});
	
	Oshinko.then(/I should see a navigation bar with title "([^\"]*)"/, function(window, captures) {
    
    	var navBar = window.navigationBar();
    	var title = captures[0];
    	assertEquals(title, navBar.name());
    
	});
	

## Install ##


You *should* use git submodules to add Oshinko to your project

	git submodule add git://github.com/sens3/oshinko.git
  
Oshinko itself uses git submodules for it's one dependency: [tuneup_js](https://github.com/alexvollmer/tuneup_js).
Thus, make sure to install the submodules by running:
	
	git submodule update --init --recursive
	 
Oshinko ships with a bunch of default step definitions, like the one above. And tuneup's assertion methods are used to implement them.

## Setup ##

Oshinko expects a certain directory structure:

	MyAppUITests
		- /js
			- /oshinko
			- /step_definitions # your step definitions, if you have any
			- main.js # or whatever your main file is that will be executed by UIAutomation
		- /features
			- foo.feature
			- bar.feature

Your main script *might* look like this:

	// Load Oshinko
	#import "oshinko/oshinko.js"

	// Load your step definitions (if you have any)
	#import "step_definitions/mine.js"

	// init Oshinko with the path to your features directory
	Oshinko.init( {
		featureDir: "/path/to/your/app/features/",
	});
	
	Oshinko.run(); 
	
`Oshinko.init` takes the following options

#####featureDir (required)
The directory with your *.feature files. 

*Note:* If you run your main script using the `instruments` CLI `featureDir` can be relative to the directory you run it from.  

The Instruments app sets your working directory to "/" so `featureDir` needs to be absolute.

#####disableColors

Default: false

Disables color output.



## Notes ##
Not all of Gherkin is yet implemented. What you *can* do is the basic Given/When/Then/And.

Oshinko can not reset your app after each scenario. Thus, all steps, throughout all features and scenarios are run sequentially.

Oshinko does not *magically* fix UIAutomation. Yet.



