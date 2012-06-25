
Kraut.given(/I am on the "([^\"]*)" tab/, function(target, app, tabName) {
    var window = app.mainWindow();
    var tabBar = window.tabBar();
    tabBar.buttons().firstWithName(tabName).tap();
});

