describe( "Oshinko - Feature Runner", function () {

	var feature = "";
	feature += "Feature:\n";
	feature += "	In order to know if my code works\n";
	feature += "	As a developer\n";
	feature += "	I want to be able to test\n";
	feature += "\n";
	feature += "	Scenario: Testing my code\n";
	feature += "		Given I write good code\n";
	feature += "		When I go to the \"spec runner page\"\n";
	feature += "		Then I should only see green\n";
	feature += "		And I should get high fives\n";

	var logStartBuffer;
	var logPassBuffer;
	var logFailBuffer;
	var logMessageBuffer;
	var logErrorBugger;

	beforeEach(function() {
		logStartBuffer = "";
		logPassBuffer = "";
		logFailBuffer = "";
		logMessageBuffer = "";
		logErrorBuffer = "";

		spyOn( UIALogger, "logStart").andCallFake( function (log) {
			logStartBuffer += log;
		});

		spyOn( UIALogger, "logPass").andCallFake( function (log) {
			logPassBuffer += log;
		});

		spyOn( UIALogger, "logFail").andCallFake( function (log) {
			logFailBuffer += log;
		});

		spyOn( UIALogger, "logMessage").andCallFake( function (log) {
			logMessageBuffer += log;
		});

		spyOn( UIALogger, "logError").andCallFake( function (log) {
			logErrorBuffer += log;
		});
	});

	it( "should run all features in the given directory", function() {
		spyOn( Oshinko.bash, "ls").andReturn(["first.feature", "second.feature"]);
		spyOn( Oshinko.bash, "cat").andReturn(feature);
		spyOn( Oshinko, "parseAndRunFeature" );
		
		Oshinko.runAll( "features" );

		expect( Oshinko.bash.ls ).toHaveBeenCalledWith( "features" );

		expect( Oshinko.bash.cat ).toHaveBeenCalledWith( "features/first.feature" );
		expect( Oshinko.bash.cat ).toHaveBeenCalledWith( "features/second.feature" );

		expect( Oshinko.parseAndRunFeature ).toHaveBeenCalledWith(feature);
	});
	
	it( "should run a given feature", function() {
		spyOn( Oshinko.bash, "cat").andReturn(feature);
		spyOn( Oshinko, "parseAndRunFeature" );
		
		Oshinko.run("features/first.feature");

		expect( Oshinko.bash.cat ).toHaveBeenCalledWith( "features/first.feature" );

		expect( Oshinko.parseAndRunFeature ).toHaveBeenCalledWith(feature);
	});
  

	describe( "running the test feature", function() {
    
		beforeEach(function() {
			Oshinko.stepDefinitions = [];
			
			Oshinko.given( /I write good code/, function(w, c) {} );
			Oshinko.when( /I go to the "([^\"]+)"/, function(w, c) {} );
			Oshinko.then( /I should only see green/, function(w, c) { throw "kazoom"; } );
			
			expect( Oshinko.stepDefinitions.length ).toEqual(3);
			
			spyOn(Oshinko.stepDefinitions[0], "callback").andCallThrough();
			spyOn(Oshinko.stepDefinitions[1], "callback").andCallThrough();
			spyOn(Oshinko.stepDefinitions[2], "callback").andCallThrough();

			Oshinko.parseAndRunFeature( feature );
		});

		it( "should start a new feature", function() {
			expect(UIALogger.logMessage).toHaveBeenCalledWith('\n\n');
		});

		it( "should start a new scenario", function() {
			expect( UIALogger.logStart ).toHaveBeenCalledWith('\n');
			expect( UIALogger.logStart ).toHaveBeenCalledWith("Testing my code");
		});

		it( "should log a pass message for the passing steps", function() {
			expect( UIALogger.logPass ).toHaveBeenCalledWith( Oshinko.colorGreen + "I write good code" + Oshinko.colorReset );
			expect( UIALogger.logPass ).toHaveBeenCalledWith( Oshinko.colorGreen + "I go to the \"spec runner page\"" + Oshinko.colorReset );
		});

		it( "should log a fail message for each missing or failing step", function() {
			var message = 'Missing step definition for "I should get high fives"';
			expect( UIALogger.logFail ).toHaveBeenCalledWith( Oshinko.colorRed + message + Oshinko.colorReset );

			var message = "I should only see green";
			expect( UIALogger.logFail ).toHaveBeenCalledWith( Oshinko.colorRed + message + Oshinko.colorReset );
		});

		it( "should execute the callbacks passing the main window and captures", function() {
			expect( Oshinko.stepDefinitions[0].callback ).toHaveBeenCalledWith( Oshinko.application.mainWindow(), [] );	
			expect( Oshinko.stepDefinitions[1].callback ).toHaveBeenCalledWith( Oshinko.application.mainWindow(), ["spec runner page"] );				
			expect( Oshinko.stepDefinitions[2].callback ).toHaveBeenCalledWith( Oshinko.application.mainWindow(), [] );				
		});
		
		it( "should execute the last step definition with a matching regex", function() {
		    Oshinko.given( /I write good code/, function(w, c) {} );
		    spyOn(Oshinko.stepDefinitions[3], "callback").andCallThrough();
		    Oshinko.parseAndRunFeature( feature );

		    expect( Oshinko.stepDefinitions[3].callback ).toHaveBeenCalledWith( Oshinko.application.mainWindow(), [] );	
		});
		
		it( "should end a failing feature", function() {
		  expect( UIALogger.logFail ).toHaveBeenCalledWith( Oshinko.colorRed + 'Feature failed!' + Oshinko.colorReset );
		});
		
		it( "should end a passing feature", function() {
		  Oshinko.stepDefinitions.pop();
		  expect( Oshinko.stepDefinitions.length ).toEqual(2);
			Oshinko.then( /I should only see green/, function(w, c) {} );
		  Oshinko.then( /I should get high fives/, function(w, c) {} );
		  expect( Oshinko.stepDefinitions.length ).toEqual(4);
		  
		  Oshinko.parseAndRunFeature( feature );
		
			expect( Oshinko.featureFailed ).toBeFalsy();
		  
		  expect( UIALogger.logPass ).toHaveBeenCalledWith( Oshinko.colorGreen + 'Feature passed!' + Oshinko.colorReset );
		});
		
	});

});
