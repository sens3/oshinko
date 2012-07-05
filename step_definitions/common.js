
Kraut.then( /I should see a (switch|text field|slider|button|table view) labeled "([^\"]+)"/ , function ( window, captures ) {
    
    var elements = undefined;

    switch( captures[0] ){
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

    var element = elements.firstWithName( captures[1] );
           
    assertNotNull( element );
           
    assertTrue( element.isVisible() );       
});

Kraut.when( /I tap the "([^\"]+)" (switch|text field|slider|button|table view)/ , function (window, captures) {

    Kraut.target.delay(1);
    
    var elements = undefined;

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

    assertNotNull( element );

    element.vtap();
    
} );