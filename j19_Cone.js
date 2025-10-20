/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

// starting with class Circle NOT EquilateralPyramid 
class Cone extends ShaderLampDrawObject {
	constructor ( res ) {
		super ( ) ; 

		this.verts = [] ; 

		if ( res < 5 ) res = 5 ;

		var idx , angle = 360 / res ;
		for ( idx = 0 ; idx < res ; idx ++ ) {

			// base
			// instead of xy plane we want xz (base of cone) sitting on xz floor

			this.verts.push ( 0 ); 
			this.verts.push ( 0 ); 
			this.verts.push ( 0 ); 
			this.verts.push ( 1 ); 

			// go clockwize so the outside of the  face faces down 
			// ie) in negative y direction
			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) );
			this.verts.push ( 0 );
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) );
			this.verts.push ( 1 );

			this.verts.push ( this.cos ( idx * angle ) );
			this.verts.push ( 0 );
			this.verts.push ( this.sin ( idx * angle ) );
			this.verts.push ( 1 );


			// cone sides

			this.verts.push ( this.cos ( idx * angle ) );
			this.verts.push ( 0 );
			this.verts.push ( this.sin ( idx * angle ) );
			this.verts.push ( 1 );

			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) );
			this.verts.push ( 0 );
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) );
			this.verts.push ( 1 );


			this.verts.push ( 0 );
			this.verts.push ( 1 );
			this.verts.push ( 0 );
			this.verts.push ( 1 );

		}

		this.len = this.verts.length ;
		this.cnt = this.len / 4 ; 
	}
}

