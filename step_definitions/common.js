
Oshinko.then( /I should see the "([^\"]+)" (switch|text field|slider|button|table view|label)/ , function ( window, captures ) {
    
    var elementName = captures[0],
    	  elementType = captures[1],
    	  elementTypeUIA = Oshinko._getUIAType(elementType),
        element = Oshinko.findElement(elementTypeUIA, elementName);
    
    assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );
    
    Oshinko.target.delay( 0.5 );
    
    assertTrue( element.isVisible(), elementType + " " + elementName + " should be visible" );       
});

Oshinko.when( /I tap the "([^\"]+)" (switch|text field|slider|button|table view|label)/ , function (window, captures) {

    Oshinko.target.delay(1);
    
    var elementName = captures[0],
        elementType = captures[1],
        elementTypeUIA = Oshinko._getUIAType(elementType),
        element = Oshinko.findElement(elementTypeUIA, elementName);

    assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );

    element.vtap();
    
} );


Oshinko._getUIAType = function ( elementType ){
  var elementTypeUIA;
  
  switch( elementType ){
  	case 'switch':
  		elementTypeUIA = "UIASwitch";
  		break;
  	case 'label':
  		elementTypeUIA = "UIAStaticText";
  		break;
  	case 'text field':
  		elementTypeUIA = "UIATextField"
  		break;	
  	case 'slider':
  		elementTypeUIA = "UIASlider";
  		break;	
  	case 'button':
  		elementTypeUIA = "UIAButton";
  		break;	
  	case 'table view':
  		elementTypeUIA = "UIATableView";
  		break;	
  }
  
  return elementTypeUIA;
  
}