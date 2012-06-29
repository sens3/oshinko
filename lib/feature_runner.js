/**
 * Kraut feature runner
 * 
 */



// Output colors
Kraut.colorRed   = '\033[33;31m';
Kraut.colorGreen = '\033[33;32m';
Kraut.colorReset = '\033[0m';

// Gherkin regex
Kraut.featureRegex  = /^\s*Feature:\s*(.*)/i;
Kraut.scenarioRegex = /^\s*Scenario:\s*(.*)/i;
Kraut.stepRegex     = /^\s*(?:Given|When|Then|And)\s(.*)\s*$/i;

Kraut.init = function ( options ) {
    Kraut.featureDirectory = options.featureDir;
    
    if (options.disableColors) {
        Kraut.colorRed = "";
        Kraut.colorGreen = "";
        Kraut.colorReset = "";
    };
}

/**
 * Runs the features in the specified directory
 */
Kraut.run = function ( ) {
        
    var featureFiles = Kraut.bash.ls( Kraut.featureDirectory );

    featureFiles.forEach( function ( featureFile) {
        
        var featurePath = Kraut.featureDirectory + '/' + featureFile;
        var featureText = Kraut.bash.cat( featurePath );
        
        Kraut.parseAndRunFeature( featureText );
        
    });

}

/**
 * Parses the given feature
 * Does either
 * - start a new feature
 * - start a new scenario
 * - run a step
 */
Kraut.parseAndRunFeature = function ( feature ) {
    
    var lines = feature.split( '\n' );
    
    lines.forEach(function ( line ) {
        
        var featureStartMatch = line.match( Kraut.featureRegex )
        if ( featureStartMatch )
            Kraut.startFeature();
        
        var scenarioMatch = line.match( Kraut.scenarioRegex );
        if ( scenarioMatch )
            Kraut.startScenario( scenarioMatch[1] );
            
        var stepMatch = line.match( Kraut.stepRegex );
        if (stepMatch)
            Kraut.runStep( stepMatch[1] );

    });
}

/**
 * Start a new scenario
 */    
Kraut.startScenario = function( scenario ) {
    UIALogger.logStart( '\n' );
    UIALogger.logStart( scenario );
}

/**
 * Start a new feature
 */
Kraut.startFeature = function() {
    UIALogger.logMessage( '\n\n' );
}
 
/**
 * Runs the given step
 */       
Kraut.runStep = function( step ) {
    Kraut.findAndExecuteStepDefinition( step );
}


/**
 * Takes a step
 * finds the matching step definition
 * and executes the step definition
 */
Kraut.findAndExecuteStepDefinition = function( step ) {
    
    var success = false;
    
    Kraut.stepDefinitions.forEach( function ( stepDefinition ) {
    
        var match = step.match( stepDefinition.regex );

        if (match) {
            success = true;
            var title = step;
            var captures = match.slice( 1 );
            Kraut.executeStepDefinition( stepDefinition, title, captures );
        }    
        
    });
    
    if ( !success ) 
        UIALogger.logFail( this.colorRed + "Missing step definition for \"" + step + "\"" +this.colorReset);
}

/**
 * Executes the given step definitions
 * Runs the step definition's callback 
 * and provides the application's main window and any captures to it
 */
Kraut.executeStepDefinition = function( stepDefinition, title, captures ) {
    
    try {

        stepDefinition.callback( Kraut.application.mainWindow(), captures );
        
        UIALogger.logPass( this.colorGreen + title + this.colorReset );
    
    }
    catch (e) {
        
        UIALogger.logFail( this.colorRed + title + this.colorReset );
        UIALogger.logError( this.colorRed + e.toString() + this.colorReset );
        Kraut.target.logElementTree();
        
    }
}

