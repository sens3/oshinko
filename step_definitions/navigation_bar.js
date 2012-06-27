
Kraut.given(/I tap the left navigation bar button/, function(window, captures) {
    
    var navBar = window.navigationBar();
    navBar.leftButton().tap();
    
});

Kraut.given(/I tap the right navigation bar button/, function(window, captures) {
    
    var navBar = window.navigationBar();
    navBar.rightButton().tap();
    
});

Kraut.then(/I should see a navigation bar with title "([^\"]*)"/, function(window, captures) {
    
    var navBar = window.navigationBar();
    var title = captures[0];
    assertEquals(title, navBar.name());
    
});

Kraut.then(/I should see a left navigation bar button with title "([^\"]*)"/, function(window, captures) {
    
    var navBar = window.navigationBar();
    var title = captures[0];
    assertEquals(title, navBar.leftButton().name());
    
});
