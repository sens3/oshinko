Oshinko.when( /^I type "([^\"]+)"$/ , function (window, captures) {

    var keyboard = UIATarget.localTarget().frontMostApp().keyboard();

    var string = captures[0];
    
    for ( var i = 0; i < string.length; i++ )
    {
        var strChar = string.charAt( i );
        keyboard.typeString( strChar );
    }
       
    var searchButton = keyboard.buttons().firstWithName( "search" );
    if (searchButton.isValid())
      searchButton.tap();

} );

Oshinko.when( /^I type Delete$/ , function ( window, captures ) {
   
   var keyboard = UIATarget.localTarget().frontMostApp().keyboard();
   
   var deleteButton = keyboard.buttons().firstWithName( "Delete" );
   
   deleteButton.tap();
    
});

Oshinko.when( /^I type Done$/ , function ( window, captures ) {
   
   var keyboard = UIATarget.localTarget().frontMostApp().keyboard();
   
   var deleteButton = keyboard.buttons().firstWithName( "DONE" );
   
   if (!deleteButton.isValid())
    deleteButton =  keyboard.buttons().firstWithName( "done" );
   
   deleteButton.tap();
    
});