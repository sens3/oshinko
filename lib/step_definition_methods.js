/**
 * Step Definitions will be collected in an array
 * A step definition consists of
 * - a regex that identifies this step
 * - a callback that should be executed
 */
Kraut.stepDefinitions = [];

Kraut.addStepDefinition = function ( regex, callback ) {
    
    var stepDefinition = {
        'regex'     : regex,
        'callback'  : callback
    };
    
    Kraut.stepDefinitions.push( stepDefinition );

    return stepDefinition; // makes testing easier
}

/**
 * These all do the same.
 */
Kraut.given = Kraut.addStepDefinition;
Kraut.when  = Kraut.addStepDefinition;
Kraut.then  = Kraut.addStepDefinition;