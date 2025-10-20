
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict";

// nadeem's graphic library
var ShaderLampMesh = function ( shader , mesh ) {
	// mesh.offset,colour[r,g,b,a],scale[x,y,z],loc[x,y,z],rot[x,y,z]
	
	this.shader = shader ;
	this.mesh = mesh;

	this.frags = [];
	var idx , jdx ;

	for ( idx = 0 ; idx < mesh.cnt ; idx ++ ) {

		for ( jdx = 0 ; jdx < 4 ; jdx ++ ) {

			this.frags.push( mesh.colour [ jdx ] ) ;

		}
	}

	//this.mesh = mesh;
	this.verts012 = mesh.verts;
	this.shufle120 = [] ;
	this.shufle201 = [] ;


	var stride = 4 * 3 ; // 3 verts per face
	// copy 3 verts per loop
	// 012 -> 120
	// 012 -> 201
	for ( idx = 0 ; idx < mesh.len ; idx += stride ) {

		// 012 
		// 0 : 0 1 2  3
		// 1 : 4 5 6  7
		// 2 : 8 9 10 11
		//

		//shufle 012 -> 120
		// 0 : 4 5 6  7 
		this.shufle120 [ idx + 0 ] = this.verts012 [ idx + 4 ] ;
		this.shufle120 [ idx + 1 ] = this.verts012 [ idx + 5 ] ;
		this.shufle120 [ idx + 2 ] = this.verts012 [ idx + 6 ] ;
		this.shufle120 [ idx + 3 ] = this.verts012 [ idx + 7 ] ;

		//shufle 012 -> 120
		// 1 : 8 9 10 11
		this.shufle120 [ idx + 4 ] = this.verts012 [ idx + 8 ] ;
		this.shufle120 [ idx + 5 ] = this.verts012 [ idx + 9 ] ;
		this.shufle120 [ idx + 6 ] = this.verts012 [ idx + 10 ] ;
		this.shufle120 [ idx + 7 ] = this.verts012 [ idx + 11 ] ;

		//shufle 012 -> 120
		// 1 : 0 1 2  3 
		this.shufle120 [ idx + 8 ] = this.verts012 [ idx + 0 ] ;
		this.shufle120 [ idx + 9 ] = this.verts012 [ idx + 1 ] ;
		this.shufle120 [ idx + 10 ] = this.verts012 [ idx + 2 ] ;
		this.shufle120 [ idx + 11 ] = this.verts012 [ idx + 3 ] ;

		//shufle 012 -> 201
		// 0 : 8 9 10 11
		this.shufle201 [ idx + 0 ] = this.verts012 [ idx + 8 ] ;
		this.shufle201 [ idx + 1 ] = this.verts012 [ idx + 9 ] ;
		this.shufle201 [ idx + 2 ] = this.verts012 [ idx + 10 ] ;
		this.shufle201 [ idx + 3 ] = this.verts012 [ idx + 11 ] ;

		//shufle 012 -> 201
		// 0 : 0 1 2  3 
		this.shufle201 [ idx + 4 ] = this.verts012 [ idx + 0 ] ;
		this.shufle201 [ idx + 5 ] = this.verts012 [ idx + 1 ] ;
		this.shufle201 [ idx + 6 ] = this.verts012 [ idx + 2 ] ;
		this.shufle201 [ idx + 7 ] = this.verts012 [ idx + 3 ] ;

		//shufle 012 -> 201
		// 0 : 4 5 6  7 
		this.shufle201 [ idx + 8 ] = this.verts012 [ idx + 4 ] ;
		this.shufle201 [ idx + 9 ] = this.verts012 [ idx + 5 ] ;
		this.shufle201 [ idx + 10 ] = this.verts012 [ idx + 6 ] ;
		this.shufle201 [ idx + 11 ] = this.verts012 [ idx + 7 ] ;

	}

	this.update = function () { };
		//console.log("dummy update() here, you must override"); };

};

ShaderLampMesh.prototype.load_scale = function () {

	this.shader.load.scale_xyz ( 
		this.mesh.scale[0]
		, this.mesh.scale[1]
		, this.mesh.scale[2]
	);
};
ShaderLampMesh.prototype.load_loc = function () {

	this.shader.load.loc_xyz ( 
		this.mesh.loc[0]
		, this.mesh.loc[1]
		, this.mesh.loc[2]
	);
};
ShaderLampMesh.prototype.load_rot = function () {

	this.shader.load.angle_xyz ( 
		this.mesh.rot[0]
		, this.mesh.rot[1]
		, this.mesh.rot[2]
	);
};
ShaderLampMesh.prototype.loadUniforms = function () {

	this.load_scale();
	this.load_loc();
	this.load_rot();
};

ShaderLampMesh.prototype.draw = function () {

	this.shader.draw ( this.mesh.offset , this.mesh.cnt ) ;
};







