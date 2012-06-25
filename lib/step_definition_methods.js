Kraut.stepDefinitions = [];

Kraut.addStepDefinition = function ( regex, callback ) {
    
    var stepDefinition = {
        'regex'     : regex,
        'callback'  : callback
    };
    
    Kraut.stepDefinitions.push( stepDefinition );
}

Kraut.given = Kraut.addStepDefinition;
Kraut.when  = Kraut.addStepDefinition;
Kraut.then  = Kraut.addStepDefinition;