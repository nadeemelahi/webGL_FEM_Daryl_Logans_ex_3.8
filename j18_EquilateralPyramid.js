/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";
class EquilateralPyramid extends ShaderLampDrawObject {

	constructor ( ) {
		super ( ) ; 

		this.verts = [
			1, -1, 0, 1 
			, -0.5, -1, -0.866, 1
			, -0.5, -1, 0.866, 1

			, 1, -1, 0, 1 
			, -0.5, -1, 0.866, 1 
			, 0, 1, 0, 1 

			, -0.5, -1, 0.866, 1 
			, -0.5, -1, -0.866, 1 
			, 0, 1, 0, 1 

			, -0.5, -1, -0.866, 1 
			, 1, -1, 0, 1 
			, 0, 1, 0, 1 
		];

		this.cnt = 12 ;
		this.len = 48 ;
	}


}
/*
 * DO NOT DEL
print_eqltrlPyrmd_verts ();
function print_eqltrlPyrmd_verts () {

	//function d2r ( deg ) { return deg * 3.14156 / 180 ; }
	//function round ( num ) { return ( ( ( num * 100 ) >> 0 ) ) / 100 ; }

	var dummy
		, cos120  = -0.5
		, sin120 = 0.866
		, cos240 = -0.5
		, sin240 = -0.866

		, adx = [ 1 , -1 , 0 ] 
		, bdx = [ cos120 , -1 , sin120 ] 
		, cdx  = [ cos240 , -1 , sin240 ] 
		, ddx = [ 0 , 1, 0 ]  

		, acb = [ adx , cdx , bdx ]
		, abd = [ adx , bdx , ddx ]
		, bcd = [ bdx , cdx , ddx ]
		, cad = [ cdx , adx , ddx ]

		, faces = [ acb , abd , bcd , cad ]
	;

	// 4 floats x 3 verts/float X 4 faces
	var idx , ilim = 4 
		, jdx , jlim = 3 
		, kdx , klim = 3 
		, vertLine ;

	// loop faces = [ acb, ...
	for ( idx = 0 ; idx < ilim ; idx ++ ) {

		for ( jdx = 0 ; jdx < jlim ; jdx ++ ) {
			vertLine = "" ;
			// loop adx = [ 1 , - 1 , 0 ]
			for ( kdx = 0 ; kdx < klim ; kdx ++ ) {

				vertLine += ", " + faces [ idx ][ jdx ][ kdx ] ;
			}
			vertLine += ", 1" ;

			console.log ( vertLine ) ;
		}
	}
}
*/

