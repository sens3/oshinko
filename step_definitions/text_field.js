Kraut.when( /I empty the text field "([^\"]+)"/ , function (window, captures) {
    
    Kraut.target.delay(1);
    
    var field = window.textFields().firstWithName( captures[0] );

    field.setValue("");
    
    // tap somewhere to "end editing"
    window.tap();
});