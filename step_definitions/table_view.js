
Oshinko.when(/^I tap the (\d+)(?:st|nd|rd|th) cell in the "([^\"]+)" table view$/, function(window, captures) {

    var tableView = UIQuery.firstKindWithName('tableViews', captures[1]);
    var index = captures[0] - 1;
    var cell = tableView.cells()[index];
    
    cell.vtap();
    
});


Oshinko.when(/^I tap the (\d+)(?:st|nd|rd|th) table view cell$/, function(window, captures) {

    Oshinko._assertOneTableView( window );

    var tableView = window.tableViews()[0];
    var index = captures[0] - 1;
    var cell = tableView.cells()[index];
    
    cell.vtap();
    
});
 
Oshinko.when(/^I tap the table view cell with title "([^\"]+)"$/, function(window, captures) {

    Oshinko._assertOneTableView( window );

    var tableView = window.tableViews()[0];
    var title = captures[0];
    var cell = tableView.cells()[title];
    
    cell.vtap();
    
});


Oshinko.then(/^I should see a table view with (\d+) cells?$/, function(window, captures) {

    Oshinko._assertOneTableView( window );
    
    var tableView = window.tableViews()[0];
    var cells = tableView.cells();
    var length = captures[0];
    
    assertEquals(length, cells.length);
    
});

Oshinko.then(/^I should see a table view with (\d+) visible cells?$/, function(window, captures) {
    
    Oshinko._assertOneTableView( window );
    
    var tableView = window.tableViews()[0];
    var cells = tableView.visibleCells();
    var length = captures[0];
    
    assertEquals(length, cells.length);
    
});

Oshinko.then(/^I should see a table view with (\d+) groups?$/, function(window, captures) {
    
    Oshinko._assertOneTableView( window );
    
    var tableView = window.tableViews()[0];
    var groups = tableView.groups();
    var length = captures[0];
    
    assertEquals(length, groups.length);
    
});

Oshinko.then(/^I should see the "([^\"]+)" table view with (\d+) groups?$/, function(window, captures) {
  
    var name = captures[0],
        length = captures[1];
        
    var tableView = UIQuery.firstKindWithName('tableViews', name);
    var groups = tableView.groups();
  
    assertEquals(length, groups.length);    
  
});

Oshinko.then(/^I should see the "([^\"]+)" table view with (\d+) cells?$/, function(window, captures) {
  
    var name = captures[0],
        length = captures[1];
        
    var tableView = UIQuery.firstKindWithName('tableViews', name);
    var cells = tableView.cells();
  
    assertEquals(length, cells.length);    
  
});

Oshinko.then(/^I should see "([^\"]+)" in the (\d+)(?:st|nd|rd|th) group of the "([^\"]+)" table view$/, function(window, captures) {

    var text = captures[0],
        index = captures[1] - 1,
        name = captures[2];
    
    var tableView = UIQuery.firstKindWithName('tableViews', name);
    var group = tableView.groups()[index];
    
    assertEquals(text, group.name());   
});

Oshinko._assertOneTableView = function( window ) {
  var tableViews = window.tableViews();
  var tableView = tableViews[0];
  assertEquals(tableViews.length, 1, "Expected only one tableview in window, use refined step definition")
}