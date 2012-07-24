
Oshinko.given(/^I tap the left navigation bar button$/, function(window, captures) {
    
    var navBar = window.navigationBar();
    navBar.leftButton().tap();

    Oshinko.target.delay( 0.5 );    
});

Oshinko.given(/^I tap the right navigation bar button$/, function(window, captures) {
    
    var navBar = window.navigationBar();
    navBar.rightButton().tap();
    
    Oshinko.target.delay( 0.5 );
});

Oshinko.then(/^I should see a navigation bar with title "([^\"]*)"$/, function(window, captures) {
    
    var navBar = window.navigationBar();
    var title = captures[0];
    assertEquals(title, navBar.name());
    
});

Oshinko.then(/^I should see a left navigation bar button with title "([^\"]*)"$/, function(window, captures) {
    
    var navBar = window.navigationBar();
    var title = captures[0];
    assertEquals(title, navBar.leftButton().name());
    
});
