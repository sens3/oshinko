describe( "Kraut - Step Definition Methods", function() {

	it( "should hold an array of step definitions", function() {

		expect(Kraut.stepDefinitions).toEqual([]);
		
	});
	
	it( "should add the given regex and callback to the list", function() {

		var callback = function() { return 42; };
		
		Kraut.addStepDefinition( /I am testing/, callback);

		expect(Kraut.stepDefinitions.length).toEqual(1);

		var stepDef = Kraut.stepDefinitions[0];
		expect(stepDef).toEqual({
			regex: /I am testing/,
			callback: callback
		});
	});

	it( "should setup aliases for given/when/then", function() {

		expect(Kraut.given).toEqual(Kraut.addStepDefinition);
		expect(Kraut.when).toEqual(Kraut.addStepDefinition);
		expect(Kraut.then).toEqual(Kraut.addStepDefinition);

	});

});