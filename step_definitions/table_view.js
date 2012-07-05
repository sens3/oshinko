
Oshinko.when(/I tap the (\d+)(?:st|nd|rd|th) table view cell/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var index = captures[0] - 1;
    var cell = tableView.cells()[index];
    
    cell.vtap();
    
});
 
Oshinko.when(/I tap the table view cell with title "([^\"]+)"/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var title = captures[0];
    var cell = tableView.cells()[title];
    
    cell.vtap();
    
});


Oshinko.then(/I should see a table view with (\d+) cells/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var cells = tableView.cells();
    var length = captures[0];
    
    assertEquals(length, cells.length);
    
});

Oshinko.then(/I should see a table view with (\d+) visible cells/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var cells = tableView.visibleCells();
    var length = captures[0];
    
    assertEquals(length, cells.length);
    
});

Oshinko.then(/I should see a table view with (\d+) groups?/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var groups = tableView.groups();
    var length = captures[0];
    
    assertEquals(length, groups.length);
    
});

