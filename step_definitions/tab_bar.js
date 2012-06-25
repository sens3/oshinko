
Kraut.given(/I am on the "([^\"]*)" tab/, function(target, app, captures) {
    var window = app.mainWindow();
    var tabBar = window.tabBar();
    var tabName = captures[0];
    tabBar.buttons().firstWithName(tabName).tap();
});

