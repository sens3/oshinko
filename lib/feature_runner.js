/**
 * Oshinko feature runner
 * 
 */


// Output colors
Oshinko.colorRed   = '\033[33;31m';
Oshinko.colorGreen = '\033[33;32m';
Oshinko.colorReset = '\033[0m';

// Gherkin regex
Oshinko.featureRegex  = /^\s*Feature:\s*(.*)/i;
Oshinko.scenarioRegex = /^\s*Scenario:\s*(.*)/i;
Oshinko.stepRegex     = /^\s*(?:Given|When|Then|And)\s(.*)\s*$/i;

Oshinko.featureFiles = [];

Oshinko.featureFailed = false;

Oshinko.init = function ( options ) {
      
    if (options.disableColors) {
        Oshinko.colorRed = "";
        Oshinko.colorGreen = "";
        Oshinko.colorReset = "";
    };
}

/**
 * Runs all featureFiles
 */
Oshinko.runAll = function ( featureDirectory ) {
  
  featureFiles = Oshinko.bash.ls( featureDirectory );
  
  featureFiles.forEach( function ( featureFilename ) {
      
      var featureFile = featureDirectory + '/' + featureFilename;
      
      Oshinko.run( featureFile );
      
  });
  
}

/**
 * Runs a given featureFile
 */
Oshinko.run = function ( featureFile ) {
  
  if (featureFile === undefined)
    featureFile = Oshinko.bash.cat( '.oshinko/feature' );
  
  var featureText = Oshinko.bash.cat( featureFile );
  
  Oshinko.parseAndRunFeature( featureText );
}

/**
 * Parses the given feature
 * Does either
 * - start a new feature
 * - start a new scenario
 * - run a step
 */
Oshinko.parseAndRunFeature = function ( feature ) {
    
    var lines = feature.split( '\n' );
    
    for (var i=0; i < lines.length; i++) {
        
        var line = lines[i],
            featureStartMatch = line.match( Oshinko.featureRegex )
        
        if ( featureStartMatch )
            Oshinko.startFeature();
        
        var scenarioMatch = line.match( Oshinko.scenarioRegex );
        if ( scenarioMatch )
            Oshinko.startScenario( scenarioMatch[1] );
            
        var stepMatch = line.match( Oshinko.stepRegex );
        if (stepMatch)
            Oshinko.runStep( stepMatch[1] );

    };
    
    Oshinko.endFeature();
}

/**
 * Start a new scenario
 */    
Oshinko.startScenario = function( scenario ) {
    UIALogger.logStart( '\n' );
    UIALogger.logStart( scenario );
}

/**
 * Start a new feature
 */
Oshinko.startFeature = function() {
    Oshinko.featureFailed = false;
    UIALogger.logMessage( '\n\n' );
}

/**
 * End the feature
 */
Oshinko.endFeature = function() {

    var message;
    if (Oshinko.featureFailed)
      UIALogger.logFail( this.colorRed + 'Feature failed!' + this.colorReset );
    else
      UIALogger.logPass( this.colorGreen + 'Feature passed!' + this.colorReset );
    
}
 
/**
 * Runs the given step
 */       
Oshinko.runStep = function( step ) {
    Oshinko.findAndExecuteStepDefinition( step );
}


/**
 * Takes a step
 * finds the matching step definition
 * and executes the step definition
 */
Oshinko.findAndExecuteStepDefinition = function( step ) {
    
    var success = false,
        match = undefined;
    
    for (var i = Oshinko.stepDefinitions.length - 1; i >= 0 && match == undefined; i--){
        
        var stepDefinition = Oshinko.stepDefinitions[i];
        
        match = step.match( stepDefinition.regex );

         if (match) {
             success = true;
             var title = step;
             var captures = match.slice( 1 );
             Oshinko.executeStepDefinition( stepDefinition, title, captures );
         }
        
     };
    
     if ( !success ) 
        UIALogger.logFail( this.colorRed + "Missing step definition for \"" + step + "\"" +this.colorReset);
}

/**
 * Executes the given step definitions
 * Runs the step definition's callback 
 * and provides the application's main window and any captures to it
 */
Oshinko.executeStepDefinition = function( stepDefinition, title, captures ) {
    
    try {

        stepDefinition.callback( Oshinko.application.mainWindow(), captures );
        
        UIALogger.logPass( this.colorGreen + title + this.colorReset );
    
    }
    catch (e) {
        
        UIALogger.logFail( this.colorRed + title + this.colorReset );
        UIALogger.logError( this.colorRed + e.toString() + this.colorReset );
        Oshinko.target.logElementTree();
        Oshinko.featureFailed = true;
    }
}

