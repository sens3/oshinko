Oshinko.when( /^I empty the text field "([^\"]+)"$/ , function (window, captures) {
    
    Oshinko.target.delay(1);
    
    var field = UIQuery.firstKindWithName("textFields", captures[0]);

    field.setValue("");
    
    // tap somewhere to "end editing"
    window.tap();
});

Oshinko.then( /^I should see "([^\"]+)" in the "([^\"]+)" text field$/ , function (window, captures) {
  
  var field = UIQuery.firstKindWithName("textFields", captures[1]);
  var text = captures[0];
  
  assertEquals(field.value(), text);
});