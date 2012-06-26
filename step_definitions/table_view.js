
Kraut.then(/I should see a table view with (\d+) cells/, function(window, captures) {

    var tableView = window.tableViews()[0];
    var cells = tableView.cells();
    var length = captures[0];
    
    assertEquals(length, cells.length);
    
});