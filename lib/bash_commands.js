Kraut.bash = {};

Kraut.bash.ls = function ( path ) {
    var cmd = "/bin/ls";
    
    var result = Kraut.target.host().performTaskWithPathArgumentsTimeout( cmd, [ path ], 5 );
    
    if (result.stderr)
        throw result.stderr;

    var fileNames = result.stdout.split( '\n' );
    
    // remove empty lines
    fileNames = fileNames.filter( function ( fileName ) {
        return ( fileName !== '' );
    } );
    
    return fileNames;
};

Kraut.bash.cat = function ( filePath ) {
    var cmd = "/bin/cat";
    
    var result = Kraut.target.host().performTaskWithPathArgumentsTimeout( cmd, [ filePath ], 5 );
    
    if ( result.stderr )
        throw result.stderr;
    
    return result.stdout;
};
