describe( "Kraut - Bash Commands", function() {

	describe( "ls", function() {
		
		var error;

		beforeEach( function() {
			
			error = undefined;

			spyOn( Kraut.target.host(), "performTaskWithPathArgumentsTimeout" ).andCallFake( function() {
				return {
					stdout: "foo.txt\nbar.txt\n",
					stderr: error
				};
			} );
		});
		
		it( "should get the targets host", function() {
			var host = Kraut.target.host();
			spyOn( Kraut.target, "host" ).andReturn( host );

			Kraut.bash.ls( "/" );

    	expect( Kraut.target.host ).toHaveBeenCalled();
  	});

  	it( "should perform the ls task on the host for the given path", function() {

  		// var ret = Kraut.target.host().performTaskWithPathArgumentsTimeout( "/bin/ls", ["/"], 5 );
  		// spyOn( Kraut.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		
  		Kraut.bash.ls( "/" );

  		expect( Kraut.target.host().performTaskWithPathArgumentsTimeout ).toHaveBeenCalledWith( "/bin/ls", ["/"], 5 );
  	});

  	it( "should throw an error if the task returns one", function() {
  		// var ret = Kraut.target.host().performTaskWithPathArgumentsTimeout( "/bin/ls", ["/"], 5 );
  		// ret.stderr = "error";

  		error = "error";

  		expect( Kraut.bash.ls ).toThrow();

  	});

  	it( "should return a list of filenames", function() {
  		expect( Kraut.target.host().performTaskWithPathArgumentsTimeout().stdout ).toEqual( "foo.txt\nbar.txt\n" ); 
  		expect( Kraut.bash.ls() ).toEqual( ["foo.txt", "bar.txt"] );
  	});

	});

	describe( "cat", function() {

		it( "should get the targets host", function() {
			var host = Kraut.target.host();
			spyOn( Kraut.target, "host" ).andReturn( host );

			Kraut.bash.cat( "foo.txt" );

    	expect( Kraut.target.host ).toHaveBeenCalled();
  	});

  	it( "should perform the ls task on the host for the given path", function() {

  		var ret = Kraut.target.host().performTaskWithPathArgumentsTimeout( "/bin/cat", ["foo.txt"], 5 );
  		spyOn( Kraut.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		
  		Kraut.bash.cat( "foo.txt" );

  		expect( Kraut.target.host().performTaskWithPathArgumentsTimeout ).toHaveBeenCalledWith( "/bin/cat", ["foo.txt"], 5 );
  	});

  	it( "should throw an error if the task returns one", function() {
  		var ret = Kraut.target.host().performTaskWithPathArgumentsTimeout( "/bin/cat", ["doesnt.exist"], 5 );
  		ret.stderr = "error";

  		spyOn( Kraut.target.host(), "performTaskWithPathArgumentsTimeout" ).andReturn( ret );
  		var doIt = function(){
  			Kraut.bash.cat( "doesnt.exist" );
  		}
  		expect( doIt ).toThrow();

  	});

  	it( "should return the content of the given file", function() {
  		
  		expect( Kraut.bash.ls() ).toEqual( ["foo.txt", "bar.txt"] );
  	});

	});

});