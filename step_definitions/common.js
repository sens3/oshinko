
Kraut.then( /I should see a (switch|text field|slider|button|table view) labeled "([^\"]+)"/ , function ( window, captures ) {
    
    Kraut.target.delay(1);
    
    var elements = undefined,
    	elementType = captures[0],
    	elementName = captures[1];

    switch( elementType ){
    	case 'switch':
    		elements = window.switches();
    		break;
    	case 'text field':
    		elements = window.textFields();
    		break;	
    	case 'slider':
    		elements = window.sliders();
    		break;	
    	case 'button':
    		elements = window.buttons();
    		break;	
    	case 'table view':
    		elements = window.tableViews();
    		break;	
    }

    var element = elements.firstWithName( elementName );
    
    assertNotNull( element, "Could not find " + elementType + " named " + elementName );
     
    assertTrue( element.isVisible(), elementType + " " + elementName + " should be visible" );       
});

Kraut.when( /I tap the "([^\"]+)" (switch|text field|slider|button|table view)/ , function (window, captures) {

    Kraut.target.delay(1);
    
    var elements = undefined,
        elementName = captures[0],
        elementType = captures[1];

    switch( captures[1] ){
    	case 'switch':
    		elements = window.switches();
    		break;
    	case 'text field':
    		elements = window.textFields();
    		break;	
    	case 'slider':
    		elements = window.sliders();
    		break;	
    	case 'button':
    		elements = window.buttons();
    		break;	
    	case 'table view':
    		elements = window.tableViews();
    		break;	
    }

    var element = elements.firstWithName( captures[0] )

    assertNotNull( element, "Could not find " + elementType + " named " + elementName );

    element.vtap();
    
} );