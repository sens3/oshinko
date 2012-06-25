
Kraut.target      = UIATarget.localTarget();
Kraut.application = Kraut.target.frontMostApp();

Kraut.colorRed   = '\033[33;31m';
Kraut.colorGreen = '\033[33;32m';
Kraut.colorReset = '\033[0m';


Kraut.runFeaturesInDir = function ( featureDirectory ) {
    
    var host = Kraut.target.host();
    
    var result = host.performTaskWithPathArgumentsTimeout( "/bin/ls", [ featureDirectory ], 5);
    
    var featureFiles = result.stdout.split('\n');

    for ( var i = 0 ; i < featureFiles.length ; i++) {
        var featurePath = featureDirectory + '/' + featureFiles[i]
        var result = host.performTaskWithPathArgumentsTimeout("/bin/cat", [featurePath], 5);
        
        Kraut.runFeature(result.stdout);
    }

}


Kraut.runFeature = function (feature) {
    Kraut.parseFeature(feature);
}

Kraut.parseFeature = function (feature) {
    
    var lines = feature.split( '\n' );

    for(var i = 0; i < lines.length; i++) {
        
        var line = lines[i];
        
        var featureStartMatch = line.match( /^\s*Feature:(.*)/i )
        if ( featureStartMatch )
            Kraut.startFeature();
        
        var scenarioMatch = line.match( /^\s*Scenario:(.*)/i );
        if ( scenarioMatch )
            Kraut.startScenario(scenarioMatch[1]);
            
        var stepMatch = line.match( /^\s*(?:Given|When|Then|And)(.*)\s*$/i );
        if (stepMatch) {
            Kraut.findStepDefinition(stepMatch[1]);
        }
    }
}

Kraut.findStepDefinition = function(step) {
    
    var success = false;
    
    for(var i = 0; i < Kraut.stepDefinitions.length; i++) {
        
        var stepDefinition = Kraut.stepDefinitions[i];
        var match = step.match(stepDefinition.regex);

        if (match) {
            success = true;
            Kraut.runStep(stepDefinition, match);
        }    
        
    }
    
    if ( !success ) 
        UIALogger.logFail(this.colorRed + "No step definition for: " + step + this.colorReset);
}
    
Kraut.startScenario = function(scenario) {
    UIALogger.logMessage('\n');
    UIALogger.logStart(scenario);
}

Kraut.startFeature = function() {
    UIALogger.logMessage( '\n\n' );
}
    

Kraut.runStep = function(stepDefinition, match) {

    var title = match[0];
    
    try {
    
        stepDefinition.callback(Kraut.target, Kraut.application, match[1], match[2]);
        
        UIALogger.logPass( this.colorGreen + title + this.colorReset);
    
    }
    catch (e) {
        
        UIALogger.logFail( this.colorRed + title + this.colorReset);
        UIALogger.logError( this.colorRed + e.toString() + this.colorReset);
        Kraut.target.logElementTree();
        
    }
}

