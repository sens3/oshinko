/**
 * Step Definitions will be collected in an array
 * A step definition consists of
 * - a regex that identifies this step
 * - a callback that should be executed
 */
Oshinko.stepDefinitions = [];

Oshinko.addStepDefinition = function ( regex, callback ) {
    
    var stepDefinition = {
        'regex'     : regex,
        'callback'  : callback
    };
    
    Oshinko.stepDefinitions.push( stepDefinition );

    return stepDefinition; // makes testing easier
}

/**
 * These all do the same.
 */
Oshinko.given = Oshinko.addStepDefinition;
Oshinko.when  = Oshinko.addStepDefinition;
Oshinko.then  = Oshinko.addStepDefinition;