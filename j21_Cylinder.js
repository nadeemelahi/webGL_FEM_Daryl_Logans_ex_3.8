/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */

"use strict";
class Cylinder extends ShaderLampDrawObject {
	constructor ( res ) {
		super ( ) ; 

		this.verts = [] ;

		if ( res < 6 ) res = 6 ;

		var idx , angle = 360 / res , zloc ; 

		// front
		zloc = - 1
		for ( idx = 0 ; idx < res ; idx ++ ) {

			this.verts.push ( 0 ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;
		}


		// back  
		zloc = 1
		for ( idx = 0 ; idx < res ; idx ++ ) {

			this.verts.push ( 0 ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;
		}

		// sides - 2 faces each loop
		for ( idx = 0 ; idx < res ; idx ++ ) {

			// face 1
			zloc = -1 ;
			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			zloc = 1 ;
			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			zloc = 1 ;
			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			// face 2
			zloc = -1 ;
			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			zloc = 1 ;
			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

			zloc = -1 ;
			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( zloc ) ;
			this.verts.push ( 1 ) ;

		}

		this.len = this.verts.length ;
		this.cnt = this.len / 4 ; 
	}
}


/* 
 * DO NOT DEL
 * prints out the default 5 divisions resolution circle
 *
	var idx , res = 5 // ie) divisions
		, angle = 360 / res ,
		zloc 
	;

	function d2r ( deg ) { return deg * 3.14156 / 180; }
	function round ( num ) { return ( (num * 1000)>>0 ) / 1000 ; }
	function cos ( angle ) { return round ( Math.cos( d2r( angle ) ) ); }
	function sin ( angle ) { return round ( Math.sin( d2r( angle ) ) ); }

	zloc = -1 ; 
// front 
	for ( idx = 0 ; idx < res ; idx ++ ) {

		console.log ( ",  0   ,   0   ,   " + zloc + "   ,   1 " ) ;

		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);
	}

	zloc = 1 ; 
// back 
	for ( idx = 0 ; idx < res ; idx ++ ) {

	console.log ( ",  0   ,   0   ,   " + zloc + "   ,   1 " ) ;
		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);


	}

// sides  - 2 faces each loop
	for ( idx = 0 ; idx < res ; idx ++ ) {

		// face 1
		zloc = -1 ;
		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

		zloc =  1 ;
		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

		zloc = 1 ;
		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

// face 2
		zloc = -1 ;
		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);

		zloc = 1 ;
		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);
		zloc = -1 ;
		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " , " + zloc + "    ,   1 " 
		);
	}
*/


