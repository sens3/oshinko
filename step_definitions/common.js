
Oshinko.then( /^I should see the "([^\"]+)" (switch|text field|slider|button|table view|label)$/ , function ( window, captures ) {
    
    var elementName = captures[0],
        elementType = captures[1],
        elementTypeUIA = Oshinko._getUIAType( elementType ),
        element = UIQuery.firstKindWithName(elementTypeUIA, elementName);
    
    assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );
    
    Oshinko.target.delay( 0.5 );
    
    assertTrue( element.isVisible(), elementType + " " + elementName + " should be visible" );       
});

Oshinko.when( /^I tap the "([^\"]+)" (switch|text field|slider|button|table view|label)$/ , function ( window, captures ) {

    Oshinko.target.delay(1);
    
    var elementName = captures[0],
        elementType = captures[1],
        elementTypeUIA = Oshinko._getUIAType(elementType),
        element = UIQuery.firstKindWithName(elementTypeUIA, elementName);

    assertNotNull( element, "Could not find " + elementType + " (" + elementTypeUIA + ") named " + elementName );

    element.vtap();
    
} );

Oshinko.when( /^I swipe up$/ , function( window, captures ) {
  Oshinko.target.dragInsideWithOptions({startOffset:{x:0.5, y:0.8}, endOffset:{x:0.5, y:0.0}, duration:1.0});
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