
Oshinko.then( /^I should (not )?see the "([^\"]+)" (switch|text field|slider|button|table view|label)$/ , function ( window, captures ) {
    
    var not         = (captures[0] !== undefined),
        elementName = captures[1],
        elementType = captures[2],
        elementTypeUIA = Oshinko._getUIAType( elementType ),
        element     = UIQuery.firstKindWithName(elementTypeUIA, elementName);
    
    Oshinko.target.delay( 0.5 );
    
    if (not) {
      
      assertNull( element, elementType + " " + elementName + " should not be on screen");       
      
    } else {
      
      element = UIQuery.firstKindWithName(elementTypeUIA, elementName);
      
      assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );
      assertTrue(  element.isVisible(), elementType + " " + elementName + " should be visible" );
      
    }
});

Oshinko.when( /^I tap the "([^\"]+)" (switch|text field|slider|button|table view|label)$/ , function ( window, captures ) {

    Oshinko.target.delay( 0.5 );
    
    var elementName = captures[0],
        elementType = captures[1],
        elementTypeUIA = Oshinko._getUIAType(elementType),
        element = UIQuery.firstKindWithName(elementTypeUIA, elementName);

    assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );

    element.vtap();
    
} );

Oshinko.when( /^I swipe up$/ , function( window, captures ) {
  var duration = 0.2;
  Oshinko.target.dragInsideWithOptions({startOffset:{x:0.5, y:0.8}, endOffset:{x:0.5, y:0.0}, duration:duration});
  Oshinko.target.delay( duration );
})

Oshinko.when( /^I swipe right$/ , function( window, captures ) {
  var duration = 0.2;
  Oshinko.target.dragInsideWithOptions({startOffset:{x:0.9, y:0.5}, endOffset:{x:0.0, y:0.5}, duration:duration});
  Oshinko.target.delay( duration );
})

Oshinko.then( /^I log the window view hierarchy$/ , function( window, captures ) {
  window.logElementTree();
});


Oshinko._getUIAType = function ( elementType ){
  var elementTypeUIA;
  
  switch( elementType ){
  	case 'switch':
  		elementTypeUIA = "switches";
  		break;
  	case 'label':
  		elementTypeUIA = "staticTexts";
  		break;
  	case 'text field':
  		elementTypeUIA = "textFields"
  		break;	
  	case 'slider':
  		elementTypeUIA = "sliders";
  		break;	
  	case 'button':
  		elementTypeUIA = "buttons";
  		break;	
  	case 'table view':
  		elementTypeUIA = "tableViews";
  		break;	
  }
  
  return elementTypeUIA;
  
}