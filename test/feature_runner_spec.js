describe( "Kraut - Feature Runner", function () {

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

	it( "should run each feature in the given directory", function() {
		spyOn( Kraut.bash, "ls").andReturn(["first.feature", "second.feature"]);
		spyOn( Kraut.bash, "cat").andReturn(feature);
		spyOn( Kraut, "parseAndRunFeature" );
		
		Kraut.init( { featureDir: "features"} );
		Kraut.run();

		expect( Kraut.bash.ls ).toHaveBeenCalledWith( "features" );

		expect( Kraut.bash.cat ).toHaveBeenCalledWith( "features/first.feature" );
		expect( Kraut.bash.cat ).toHaveBeenCalledWith( "features/second.feature" );

		expect( Kraut.parseAndRunFeature ).toHaveBeenCalledWith(feature);
	});

	describe( "running the test feature", function() {

		beforeEach(function() {
			Kraut.stepDefinitions = [];
			Kraut.given( /I write good code/, function(w, c) {} );
			Kraut.when( /I go to the "([^\"]+)"/, function(w, c) {} );
			Kraut.then( /I should only see green/, function(w, c) { throw "kazoom"; } );
			expect( Kraut.stepDefinitions.length ).toEqual(3);
			
			spyOn(Kraut.stepDefinitions[0], "callback").andCallThrough();
			spyOn(Kraut.stepDefinitions[1], "callback").andCallThrough();
			spyOn(Kraut.stepDefinitions[2], "callback").andCallThrough();

			Kraut.parseAndRunFeature( feature );
		});

		it( "should start a new feature", function() {
			expect(UIALogger.logMessage).toHaveBeenCalledWith('\n\n');
		});

		it( "should start a new scenario", function() {
			expect( UIALogger.logStart ).toHaveBeenCalledWith('\n');
			expect( UIALogger.logStart ).toHaveBeenCalledWith("Testing my code");
		});

		it( "should log a pass message for the passing steps", function() {
			expect( UIALogger.logPass ).toHaveBeenCalledWith( Kraut.colorGreen + "I write good code" + Kraut.colorReset );
			expect( UIALogger.logPass ).toHaveBeenCalledWith( Kraut.colorGreen + "I go to the \"spec runner page\"" + Kraut.colorReset );
		});

		it( "should log a fail message for each missing or failing step", function() {
			var message = 'Missing step definition for "I should get high fives"';
			expect( UIALogger.logFail ).toHaveBeenCalledWith( Kraut.colorRed + message + Kraut.colorReset );

			var message = "I should only see green";
			expect( UIALogger.logFail ).toHaveBeenCalledWith( Kraut.colorRed + message + Kraut.colorReset );
		});

		it( "should execute the callbacks passing the main window and captures", function() {
			expect( Kraut.stepDefinitions[0].callback ).toHaveBeenCalledWith( Kraut.application.mainWindow(), [] );	
			expect( Kraut.stepDefinitions[1].callback ).toHaveBeenCalledWith( Kraut.application.mainWindow(), ["spec runner page"] );				
			expect( Kraut.stepDefinitions[2].callback ).toHaveBeenCalledWith( Kraut.application.mainWindow(), [] );				
		})
	});

});
