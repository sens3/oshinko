Oshinko.when( /I empty the text field "([^\"]+)"/ , function (window, captures) {
    
    Oshinko.target.delay(1);
    
    var field = Oshinko.findElement("UIATextField", captures[0]);

    field.setValue("");
    
    // tap somewhere to "end editing"
    window.tap();
});