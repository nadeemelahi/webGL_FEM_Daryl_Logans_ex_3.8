/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */

"use strict";

class ConeDrawA01 extends Cone {
	constructor ( res ) {
		super ( res ) ; 

		this.stepx = 0 ;
		this.stepy = 1 ;
		this.stepz = 0 ;

		this.colour = [ 1.0 , 0.75 , 0.0 , 1 ] ;
		this.loc = [  -0.25 ,  -1.7 , 0.0 ] ;
	}
}


