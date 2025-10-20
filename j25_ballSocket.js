/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

// a cube center at base and a sphere
class BallSocket extends ShaderLampDrawObject {

	constructor ( res ) {
		super ( ) ; 

		this.verts = [];

		var cubeVerts = [

			// cube 
			// -it will hold a cube, so it should be half height

			// bottom  - object center on base center
			// going clock wise
			1.0  ,  0.0  ,  1.0	, 1	// far right	
			, -1.0  ,  0.0  , -1.0	, 1	// near left
			, -1.0  ,  0.0  ,  1.0 	, 1	// far left

			,  1.0  ,  0.0  ,  1.0	, 1	// far right	
			,  1.0  ,  0.0  , -1.0	, 1	// near right	
			, -1.0  ,  0.0  , -1.0	, 1	// near left

			// top 
			// same as bottom face except clock wise and y = 1 
			,  1.0  ,  1.0  ,  1.0	, 1	// far right	
			, -1.0  ,  1.0  ,  1.0 	, 1	// far left
			, -1.0  ,  1.0  , -1.0	, 1	// near left

			,  1.0  ,  1.0  ,  1.0	, 1	// far right	
			, -1.0  ,  1.0  , -1.0	, 1	// near left
			,  1.0  ,  1.0  , -1.0	, 1	// near right	

			// right face
			// going counter clock wise
			,  1.0  ,  0.0  ,  1.0	, 1	// far right	
			,  1.0  ,  1.0  ,  1.0	, 1	// far right top	
			,  1.0  ,  1.0  , -1.0	, 1	// near right top	

			,  1.0  ,  0.0  ,  1.0	, 1	// far right	
			,  1.0  ,  1.0  , -1.0	, 1	// near right top	
			,  1.0  ,  0.0  , -1.0	, 1	// near right	

			// left face
			// same as right face except clock wise and -1 * x
			, -1.0  ,  0.0  ,  1.0	, 1	// far right	
			, -1.0  ,  1.0  , -1.0	, 1	// near right top	
			, -1.0  ,  1.0  ,  1.0	, 1	// far right top	

			, -1.0  ,  0.0  ,  1.0	, 1	// far right	
			, -1.0  ,  0.0  , -1.0	, 1	// near right	
			, -1.0  ,  1.0  , -1.0	, 1	// near right top	

			// front face
			// going counter
			,  1.0  ,  0.0  , -1.0	, 1	// near right	
			, -1.0  ,  0.0  , -1.0	, 1	// near left
			, -1.0  ,  1.0  , -1.0	, 1	// near left top

			,  1.0  ,  0.0  , -1.0	, 1	// near right	
			, -1.0  ,  1.0  , -1.0	, 1	// near left top
			,  1.0  ,  1.0  , -1.0	, 1	// near right top

			// back face
			// same as front except going clock wise 
			// and -1 * z 
			,  1.0  ,  0.0  ,  1.0	, 1	// near right	
			, -1.0  ,  1.0  ,  1.0	, 1	// near left top
			, -1.0  ,  0.0  ,  1.0	, 1	// near left

			,  1.0  ,  0.0  ,  1.0	, 1	// near right	
			,  1.0  ,  1.0  ,  1.0	, 1	// near right top
			, -1.0  ,  1.0  ,  1.0	, 1	// near left top


		] ;

		var sphere = new SphereLatLongRings ( res ) ;

		// translate y += 1 so it is center at base
		var idx , vstep = 4 // step each vertex ie) dim = 4
			, sphlen = sphere.verts.length 
			, yoffset = 1  // xyzw - 0123
		;

		for ( idx = 0 ; idx < sphlen ; idx += vstep ) {

			sphere.verts[ idx + yoffset ] += 1 ;

		}



		this.verts = cubeVerts.concat ( sphere.verts ) ;

		this.len = this.verts.length ;
		this.cnt = this.len / 4 ;
	} 
}
