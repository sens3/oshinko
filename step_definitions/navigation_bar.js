
Kraut.given(/I tap the left navigation bar button/, function(target, app) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    navBar.leftButton().tap();
    
});

Kraut.given(/I tap the right navigation bar button/, function(target, app) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    navBar.rightButton().tap();
    
});

Kraut.then(/I should see a navigation bar with title "([^\"]*)"/, function(target, app, title) {
    
    var window = app.mainWindow();
    var navBar = window.navigationBar();
    assertEquals(title, navBar.name());
    
});
