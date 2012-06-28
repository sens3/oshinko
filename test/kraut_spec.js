describe( "Kraut", function() {

  it( "should return the local target", function() {
    expect( Kraut.target.mock ).toEqual( UIATarget.localTarget().mock );
  });

  it( "should return the front most app", function() {
    expect( Kraut.application ).toEqual( UIATarget.localTarget().frontMostApp() );
  })

});