Oshinko.when( /I (?:select|tap) the (\d+)(?:st|nd|rd|th) button in the "([^\"]+)" segmented control/, function( window, captures) {
    
    var segmentedControl = Oshinko.findElement("UIASegmentedControl", captures[1]);
    var index = captures[0] - 1;
    
    var button = segmentedControl.buttons()[ index ];
    
    button.vtap();
});