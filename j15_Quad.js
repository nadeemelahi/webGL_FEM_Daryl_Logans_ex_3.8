/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

class Quad extends ShaderLampDrawObject {
	constructor ( ) {
		super ( ) ; 

		this.verts = [
			  -1	,   -1	  , 0 , 1 
			,  1	,    1	  , 0 , 1 
			, -1	,    1	  , 0 , 1 

			, -1	,   -1	  , 0 , 1 
			,  1	,   -1	  , 0 , 1 
			,  1	,    1	  , 0 , 1 
		];

		this.cnt = 6 ;
		this.len = 24 ;
	}

}

