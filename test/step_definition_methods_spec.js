describe( "Oshinko - Step Definition Methods", function() {

	it( "should hold an array of step definitions", function() {

		expect(Oshinko.stepDefinitions).toEqual([]);
		
	});
	
	it( "should add the given regex and callback to the list", function() {

		var callback = function() { return 42; };
		
		Oshinko.addStepDefinition( /I am testing/, callback);

		expect(Oshinko.stepDefinitions.length).toEqual(1);

		var stepDef = Oshinko.stepDefinitions[0];
		expect(stepDef).toEqual({
			regex: /I am testing/,
			callback: callback
		});
	});

	it( "should setup aliases for given/when/then", function() {

		expect(Oshinko.given).toEqual(Oshinko.addStepDefinition);
		expect(Oshinko.when).toEqual(Oshinko.addStepDefinition);
		expect(Oshinko.then).toEqual(Oshinko.addStepDefinition);

	});

});