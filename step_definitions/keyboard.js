Kraut.when( /I type "([^\"]+)"/ , function (window, captures) {

    var keyboard = UIATarget.localTarget().frontMostApp().keyboard();

    var string = captures[0];
    
    for ( var i = 0; i < string.length; i++ )
    {
        var strChar = string.charAt( i );
        keyboard.typeString( strChar );
    }
       
    keyboard.buttons().firstWithName( "search" ).tap();

} );