/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */

"use strict";
class SphereLatLongRings extends ShaderLampDrawObject {
	constructor ( res ) {
		super ( ) ; 

		this.verts = [] ;

		if ( res < 8 ) res = 8 ;

		function d2r ( deg ) { return deg * 3.14156 / 180; }
		function round ( num ) { return ( (num * 1000)>>0 ) / 1000 ; }
		function cos ( angle ) { return round ( Math.cos( d2r( angle ) ) ); }
		function sin ( angle ) { return round ( Math.sin( d2r( angle ) ) ); }

		// see geometryLateralLongitudinalRings.svg/pdf
		var idy , idz 
			, angle = 360 / res 
			, crY , crZ 	// current X/Y
			, ntY , ntZ  	// next X/Y
			, angleY , angleZ
			, verts = [] 
		; 
		function pushYZ ( ) {
			verts.push ( cos ( angleZ ) * cos ( angleY ) ) ; 
			verts.push ( -1 * sin ( angleZ ) * cos ( angleY ) ) ; 
			verts.push ( -1 * sin ( angleY ) ) ; 
			verts.push ( 1 ) ;
		}
		function push_1 () {
			angleY = crY ;
			angleZ = crZ ;
			pushYZ();
		}
		function push_2 () {
			angleY = ntY ;
			angleZ = crZ ;
			pushYZ();
		}
		function push_3 () {
			angleY = crY ;
			angleZ = ntZ ;
			pushYZ();
		}

		function push_4 () {
			angleY = ntY ;
			angleZ = ntZ ;
			pushYZ();
		}

		var lastY = res - 1 ; // skip last one for the south pole
		for ( idy = 0 ; idy < res ; idy ++ ) {
			for ( idz = 0 ; idz < res ; idz ++ ) {

				crY = idy * angle ; 
				crZ = idz * angle ; 

				ntY = ( idy + 1 ) * angle ; 
				ntZ = ( idz + 1 ) * angle ; 

				// going clockwise since looking at inside face
				// 134
				push_1(); push_3(); push_4();

				// 142
				push_1(); push_4(); push_2();
			}
		}

		this.verts = verts ;
		this.len = this.verts.length ;
		this.cnt = this.len / 4 ; 

	}
}

