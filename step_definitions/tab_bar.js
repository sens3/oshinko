
Oshinko.given(/^I (?:am on|go to) the "([^\"]*)" tab$/, function(window, captures) {

    var tabBar = window.tabBar();
    var tabName = captures[0];
    tabBar.buttons().firstWithName(tabName).tap();
    
});

Oshinko.given(/^I should be on the "([^\"]*)" tab$/, function(window, captures) {

    var tabBar = window.tabBar();
    var tabName = captures[0];
    assertEquals(tabBar.selectedButton().name(), tabName);
    
});

