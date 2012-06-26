
Kraut.given(/I am on the "([^\"]*)" tab/, function(window, captures) {

    var tabBar = window.tabBar();
    var tabName = captures[0];
    tabBar.buttons().firstWithName(tabName).tap();
    
});

