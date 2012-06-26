/**
 * Thin wrapper around a few bash commands
 */ 
Kraut.bash = {};

/**
 * Returns an array of filenames in the specified directory.
 * Will not list hidden files, i.e. .bashrc
 */ 
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


/**
 * Reads the file at the given filePath and
 * returns it's content as a string.
 */
Kraut.bash.cat = function ( filePath ) {
    var cmd = "/bin/cat";
    
    var result = Kraut.target.host().performTaskWithPathArgumentsTimeout( cmd, [ filePath ], 5 );
    
    if ( result.stderr )
        throw result.stderr;
    
    return result.stdout;
};
