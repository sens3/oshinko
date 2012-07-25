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