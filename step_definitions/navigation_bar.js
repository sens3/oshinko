
Kraut.given(/I tap the left navigation bar button/, function(target, app, captures) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    navBar.leftButton().tap();
    
});

Kraut.given(/I tap the right navigation bar button/, function(target, app, captures) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    navBar.rightButton().tap();
    
});

Kraut.then(/I should see a navigation bar with title "([^\"]*)"/, function(target, app, captures) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    var title = captures[0];
    assertEquals(title, navBar.name());
    
});
