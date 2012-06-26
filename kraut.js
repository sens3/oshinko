// load dependencies
#import "vendor/tuneup/tuneup.js"

// set up Kraut 'namespace'
Kraut = {};
Kraut.target      = UIATarget.localTarget();
Kraut.application = Kraut.target.frontMostApp();


// load lib
#import "lib/bash_commands.js"
#import "lib/runner.js"
#import "lib/step_definition_methods.js"

// load default step definitions
#import "step_definitions/app.js"
#import "step_definitions/tab_bar.js"
#import "step_definitions/table_view.js"
#import "step_definitions/navigation_bar.js"
