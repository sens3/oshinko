
Kraut.colorRed   = '\033[33;31m';
Kraut.colorGreen = '\033[33;32m';
Kraut.colorReset = '\033[0m';

Kraut.runFeaturesInDir = function ( featureDirectory ) {
        
    var featureFiles = Kraut.bash.ls( featureDirectory );

    featureFiles.forEach( function ( featureFile) {
        
        var featurePath = featureDirectory + '/' + featureFile;
        var featureText = Kraut.bash.cat( featurePath );
        
        Kraut.runFeature( featureText );
        
    });

}


Kraut.runFeature = function (feature) {
    Kraut.parseFeature(feature);
}

Kraut.parseFeature = function (feature) {
    
    var lines = feature.split( '\n' );
    
    lines.forEach(function ( line ) {
        
        var featureStartMatch = line.match( /^\s*Feature:(.*)/i )
        if ( featureStartMatch )
            Kraut.startFeature();
        
        var scenarioMatch = line.match( /^\s*Scenario:(.*)/i );
        if ( scenarioMatch )
            Kraut.startScenario(scenarioMatch[1]);
            
        var stepMatch = line.match( /^\s*(?:Given|When|Then|And)(.*)\s*$/i );
        if (stepMatch) {
            Kraut.runStep(stepMatch[1]);
        }
    });
}
    
Kraut.startScenario = function(scenario) {
    UIALogger.logMessage('\n');
    UIALogger.logStart(scenario);
}

Kraut.startFeature = function() {
    UIALogger.logMessage( '\n\n' );
}
    
Kraut.runStep = function( step ) {
    Kraut.findAndExecuteStepDefinition( step );
}


Kraut.findAndExecuteStepDefinition = function(step) {
    
    var success = false;
    
    Kraut.stepDefinitions.forEach( function ( stepDefinition ) {
    
        var match = step.match(stepDefinition.regex);

        if (match) {
            success = true;
            var title = step;
            var callbackArgs = match.slice(1);
            Kraut.executeStepDefinition(stepDefinition, title, callbackArgs);
        }    
        
    });
    
    if ( !success ) 
        UIALogger.logFail(this.colorRed + "No step definition for: " + step + this.colorReset);
}

Kraut.executeStepDefinition = function( stepDefinition, title, callbackArgs ) {
    
    try {
    
        stepDefinition.callback( Kraut.target, Kraut.application, callbackArgs );
        
        UIALogger.logPass( this.colorGreen + title + this.colorReset);
    
    }
    catch (e) {
        
        UIALogger.logFail( this.colorRed + title + this.colorReset);
        UIALogger.logError( this.colorRed + e.toString() + this.colorReset);
        Kraut.target.logElementTree();
        
    }
}

