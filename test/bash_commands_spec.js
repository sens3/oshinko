describe( "Oshinko - Bash Commands", function() {

	describe( "ls", function() {
		
		var error;

		beforeEach( function() {
			
			error = undefined;

			spyOn( Oshinko.target.host(), "performTaskWithPathArgumentsTimeout" ).andCallFake( function() {
				return {
					stdout: "foo.txt\nbar.txt\n",
					stderr: error
				};
			} );
		});
		
		it( "should get the targets host", function() {
			var host = Oshinko.target.host();
			spyOn( Oshinko.target, "host" ).andReturn( host );

			Oshinko.bash.ls( "/" );

    	expect( Oshinko.target.host ).toHaveBeenCalled();
  	});

  	it( "should perform the ls task on the host for the given path", function() {

  		// var ret = Oshinko.target.host().performTaskWithPathArgumentsTimeout( "/bin/ls", ["/"], 5 );
  		// spyOn( Oshinko.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		
  		Oshinko.bash.ls( "/" );

  		expect( Oshinko.target.host().performTaskWithPathArgumentsTimeout ).toHaveBeenCalledWith( "/bin/ls", ["/"], 5 );
  	});

  	it( "should throw an error if the task returns one", function() {
  		// var ret = Oshinko.target.host().performTaskWithPathArgumentsTimeout( "/bin/ls", ["/"], 5 );
  		// ret.stderr = "error";

  		error = "error";

  		expect( Oshinko.bash.ls ).toThrow();

  	});

  	it( "should return a list of filenames", function() {
  		expect( Oshinko.target.host().performTaskWithPathArgumentsTimeout().stdout ).toEqual( "foo.txt\nbar.txt\n" ); 
  		expect( Oshinko.bash.ls() ).toEqual( ["foo.txt", "bar.txt"] );
  	});

	});

	describe( "cat", function() {

		it( "should get the targets host", function() {
			var host = Oshinko.target.host();
			spyOn( Oshinko.target, "host" ).andReturn( host );

			Oshinko.bash.cat( "foo.txt" );

    	expect( Oshinko.target.host ).toHaveBeenCalled();
  	});

  	it( "should perform the ls task on the host for the given path", function() {

  		var ret = Oshinko.target.host().performTaskWithPathArgumentsTimeout( "/bin/cat", ["foo.txt"], 5 );
  		spyOn( Oshinko.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		
  		Oshinko.bash.cat( "foo.txt" );

  		expect( Oshinko.target.host().performTaskWithPathArgumentsTimeout ).toHaveBeenCalledWith( "/bin/cat", ["foo.txt"], 5 );
  	});

  	it( "should throw an error if the task returns one", function() {
  		var ret = Oshinko.target.host().performTaskWithPathArgumentsTimeout( "/bin/cat", ["doesnt.exist"], 5 );
  		ret.stderr = "error";

  		spyOn( Oshinko.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		var doIt = function(){
  			Oshinko.bash.cat( "doesnt.exist" );
  		}
  		expect( doIt ).toThrow();

  	});

  	it( "should return the content of the given file", function() {
  		
  		expect( Oshinko.bash.ls() ).toEqual( ["foo.txt", "bar.txt"] );
  	});

	});

});