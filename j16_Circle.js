/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */

"use strict";
class Circle extends ShaderLampDrawObject {

	constructor ( res ) {
		super ( ) ; 

		this.verts = [] ;

		if ( !res || res < 6 ) { 

			// res = 5 , 5 faces, 3/face
			this.cnt = 5 * 3 ;
			this.len = this.cnt * 4 ; //  x dim=4  

			this.verts = [
				0  	 ,   0   	,   0   ,   1
				, 1   	 ,   0 		,   0   ,   1
				, 0.309  ,   0.951 	,   0   ,   1

				,  0     ,   0   	,   0   ,   1
				, 0.309  ,   0.951 	,   0   ,   1
				, -0.809 ,   0.587 	,   0   ,   1

				,  0     ,   0   	,   0   ,   1
				, -0.809 ,   0.587 	,   0   ,   1
				, -0.809 ,   -0.587 	,   0   ,   1

				,  0     ,   0   	,   0   ,   1
				, -0.809 ,   -0.587 	,   0   ,   1
				, 0.308  ,   -0.951 	,   0   ,   1

				,  0     ,   0   	,   0   ,   1
				, 0.308  ,   -0.951 	,   0   ,   1
				, 0.999  ,   0 		,   0   ,   1 
			];

			return ;
		} 

		var idx , angle = 360 / res ; 
		for ( idx = 0 ; idx < res ; idx ++ ) {

			this.verts.push ( 0 ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( idx * angle ) ) ;
			this.verts.push ( this.sin ( idx * angle ) ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( 1 ) ;

			this.verts.push ( this.cos ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( this.sin ( ( idx + 1 ) * angle ) ) ;
			this.verts.push ( 0 ) ;
			this.verts.push ( 1 ) ;
		}

		this.len = this.verts.length ; 
		this.cnt = this.len / 4 ;

	}
	
}

// DO NOT DEL 
// prints out the default 5 divisions resolution circle
/*
	var idx , res = 5 // ie) divisions
	, angle = 360 / res ; 
	for ( idx = 0 ; idx < res ; idx ++ ) {
		console.log ( ",  0   ,   0   ,   0   ,   1 " ) ;
		console.log( ", " 
			+ cos( idx * angle ) 
			+ "   ,   " 
			+ sin( idx * angle ) 
			+ " ,   0    ,   1 " 
		);
		console.log( ", " 
			+ cos( (idx + 1) * angle ) 
			+ "   ,   " 
			+ sin( (idx + 1) * angle ) 
			+ " ,   0    ,   1 " 
		);
	}
	*/


