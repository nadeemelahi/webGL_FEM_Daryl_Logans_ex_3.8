/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

class SphereLatLongRingsDrawA01 extends SphereLatLongRings {
	constructor ( res ) {
		super ( res ) ; 

		this.stepx = 0 ;
		this.stepy = 1 ;
		this.stepz = 0 ;

		this.colour = [ 0.3 , 0.9 , 0.1 , 1 ] ;

		this.scale[2] *=1.2 ; // scale up the z so it is stretched to make the rotation about y more obvious

		this.loc = [ 0.85 , -1.7 , 0.0 ] ;

	}
}


