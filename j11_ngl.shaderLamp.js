/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Feb 2025 
 */

"use strict";
// REQUIRES
// ngl.load_vf
//
// ngl.shader_lamp
// .aout
// .vs
// .fs
// .compile()
// .use_program()
// 
// .load
// 	.aout // inheritied
// 	.dim : 4
// 	.uniform ( name , data ) // called internally 
// 	.attribute ( name , data ) // called internally
// 	.vertices_3 ( vertices ) 
// 	.fragments ( fragments ) 
// 	.scale_xyz
// 	.angle_xyz
// 	.loc_xyz
// .draw
// 	.cnt
// 	.draw_type ( type ) // called internally
// 	.triangles ()
//
// .writeShaders()
//   -- called from .compile()


ngl.shaderLamp = {

	aout : null

	, vs : document.getElementById("vs_lamp").textContent  
	, fs : document.getElementById("fs_lamp").textContent

	, compile : function (){
		
		this.aout = ngl.compile( this.vs , this.fs );

		// inheritance pass on to .load{} child obj:
		this.load.aout = this.aout ;

		// reference draw{} from load{} 
		// so it can write draw.cnt
		this.load.draw = this.draw ;
	}

	, use_program : function (){

		ngl.gl.useProgram( this.aout );

		this.load.scale_xyz( 1.0 , 1.0 , 1.0 ) ;
		this.load.angle_xyz( 0.0 , 0.0 , 0.0 ) ;
		this.load.loc_xyz( 0.0 , 0.0 , 0.0 ) ;

	}

	, load : {

		// inherited
		aout : null

		, dim : 4

		// internal
		,  uniform : function ( name , data ) {

			ngl.load_fl( 
				this.aout , 
				name , 
				data 
			) ;
		}

		// internal
		, attribute : function ( name , data ) {

			ngl.load_data(
				this.aout , 
				name , 
				data , 
				this.dim
			);
		}

		, vertices_3: function 

		( v012 , v120 , v201 ) {

			this.attribute ( "vertex012" , v012 ) ;
			this.attribute ( "shufle120" , v120 ) ;
			this.attribute ( "shufle201" , v201 ) ;


		}

		, fragments : function 

		( frag ) {

			this.attribute ( "fragment" , frag ) ;
			
		}

		, scale_xyz : function 

		( x_scl , y_scl , z_scl ) {

			this.uniform ( "x_scl" , x_scl ) ;
			this.uniform ( "y_scl" , y_scl ) ;
			this.uniform ( "z_scl" , z_scl ) ;
		}
		, angle_xyz : function 

		( x_angle , y_angle , z_angle ) {

			this.uniform ( "x_angle" , x_angle ) ;
			this.uniform ( "y_angle" , y_angle ) ;
			this.uniform ( "z_angle" , z_angle ) ;
		}

		, loc_xyz : function 

		( x_loc , y_loc , z_loc ) {

			this.uniform ( "x_loc" , x_loc ) ;
			this.uniform ( "y_loc" , y_loc ) ;
			this.uniform ( "z_loc" , z_loc ) ;

		}
	}

	
	, draw  : function ( offset , vertsCnt ) {

		ngl.gl.drawArrays(
			ngl.gl.TRIANGLES 	
			, offset 
			, vertsCnt
		);
		// does not support
		//ngl.gl.LINES 
		//ngl.gl.POINTS 
	}
};

