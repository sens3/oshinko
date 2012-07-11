Oshinko.when( /I drag the "([^\"]+)" slider to (\d+) of (\d+)/, function( window, captures ) {
    
    var slider = Oshinko.findElement("UIASlider", captures[0]); // window.sliders().firstWithName( captures[0] );
    var value = captures[1];
    var max = captures[2];
    var x = value / parseFloat(max);

    slider.dragToValue( x );
});