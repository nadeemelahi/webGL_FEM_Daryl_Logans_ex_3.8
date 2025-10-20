/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

class BallSocketDrawA01 extends BallSocket {
	constructor ( res ) {
		super ( res ) ; 

		this.stepx = 0 ;
		this.stepy = 1 ;
		this.stepz = 0 ;

		this.colour = [ 0.9 , 0.9 , 0.1 , 1 ] ;

		this.loc = [ 1.2 , -1.8 , 0.0 ] ;

	}
}


