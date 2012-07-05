describe( "Oshinko", function() {

  it( "should return the local target", function() {
    expect( Oshinko.target.mock ).toEqual( UIATarget.localTarget().mock );
  });

  it( "should return the front most app", function() {
    expect( Oshinko.application ).toEqual( UIATarget.localTarget().frontMostApp() );
  })

});