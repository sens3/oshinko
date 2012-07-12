/*
 * Allows global lookup of elements based on
 * the elements type (i.e. UIATableView)
 * and the accessibility label
 *
 * This is a bit experimental at this point and thus without test coverage
 */

Oshinko.findElement = function (type, name) {

  Oshinko.target.delay( 0.5 );
  
  var window = Oshinko.application.mainWindow();
  var treeLog = Oshinko._treeLog(window);
  
  var tree = Oshinko._buildTree( treeLog );
    
  var node = tree.find(function (node) {
    return (name == node.data.name) && (type == node.data.type);
  });
  
  if (node) {
    // id always starts with 0/0/.... since we have one tree and one window
    var indexes = node.id.split('/').slice(2);

    var element = window;
    
    // walk down the tree based on the retrieved indexes
    indexes.forEach( function( index ) {
      element = element.elements()[ index ];
    });
    
  } else {
    element = null;
  }  
  
  return element;
}

Oshinko.Element = function( type, name ){
  this.type = type;
  this.name = name;
  return this;
}

Oshinko._treeLog = function(window) {
  
  // treelog start marker
  UIALogger.logMessage('Oshinko.startTree');
  window.logElementTree();
  // treelog end marker
  UIALogger.logMessage('Oshinko.endTree');
  
  // the unix_instruments script will write all 
  // output between the markers into .oshinko/tree
  Oshinko.target.delay( 0.5 );
  var treeLog = Oshinko.bash.cat('.oshinko/tree');
  
  return treeLog;
}

Oshinko._buildTree = function( treeLog ) {
 
  var lines = treeLog.split('\n'),
      tree = new Oshinko.Arboreal(),
      currentNode = tree,
      match = undefined;

  lines.forEach( function( line ) {

    match = line.match( /^\s*(UIA[a-zA-Z]+) \"([^\"]+)\"/ );
    if ( match ) {
      var type = match[1];
      var name = match[2];
      var newElement = new Oshinko.Element(type, name);
      currentNode.appendChild( newElement ) 
    }
    
    match = line.match( /^\s*elements: \{/ );
    if ( match ) {
      // the last child is now the current node
      currentNode = currentNode.children[ currentNode.children.length - 1 ];
    }
    
    match = line.match( /^\s*}\s*/ );
    if (match) {
      currentNode = currentNode.parent;
    }
    
  });
  
  return tree;
}