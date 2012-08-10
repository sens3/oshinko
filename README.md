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

	git submodule add git://github.com/sens3/oshinko.git MyApp/UIAutomationTests/js/oshinko
  
Oshinko itself uses git submodules for it's one dependency: [tuneup_js](https://github.com/alexvollmer/tuneup_js).
Thus, make sure to install the submodules by running:
	
	git submodule update --init --recursive
	 
Oshinko ships with a bunch of default step definitions, like the one above. And tuneup's assertion methods are used to implement them.

## Setup ##

Oshinko expects a certain directory structure:

	MyApp
		- UIAutomationTests
			- /js
				- /oshinko
				- /step_definitions # your step definitions, if you have any
				- main.js # the file you will feed to UIAutomation
			- /features
				- foo.feature
				- bar.feature

Your main script *should* look like this:

	// Load Oshinko
	#import "oshinko/oshinko.js"

	// Load your step definitions (if you have any)
	#import "step_definitions/mine.js"

	// Run Oshinko
	Oshinko.run();

## Run

Simply execute the included bash script:
	
	./MyApp/UIAutomationTests/js/oshinko/bin/run

You might have to edit this, based on your workspace/project structure.

## .gitignore

You might want to add these two to your *.gitignore*:

	.oshinko
	automation_results

## Notes ##
Not all of Gherkin is yet implemented. What you *can* do is the basic Given/When/Then/And.

The app is restarted for each feature, but *not* for every scenario.

Oshinko does not *magically* fix UIAutomation. Yet.




