Oshinko.when( /^I empty the text field "([^\"]+)"$/ , function (window, captures) {
    
    Oshinko.target.delay(1);
    
    var field = UIQuery.firstKindWithName("textFields", captures[0]);

    field.setValue("");
    
    // tap somewhere to "end editing"
    window.tap();
});