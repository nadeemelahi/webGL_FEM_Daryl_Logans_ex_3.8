/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Sep 2025
 */

"use strict;"
function loadDrawData ( shader , drawList ) {

	var offset = 0 
		, dldx , dlLen = drawList.length 
		, allVertsLen = drawList[ 0 ].mesh.len ; // the first one
	;
	
	// set the offsets
	// skip odx = 0 because offset 0 is correct for first olist item
	for ( dldx = 1 ; dldx < dlLen ; dldx ++ ) {

		allVertsLen += drawList [ dldx ].mesh.len ;
		offset += drawList [ dldx - 1 ].mesh.cnt ;
		drawList [ dldx ].mesh.offset = offset ;

	}

	var idx , all_vertex012 = []
		, all_shufle120 = []
		, all_shufle201 = []
		, all_fragments = []
	;

	function push_data ( idx , lso ) {

		all_vertex012.push ( lso.verts012 [ idx ] ) ;
		all_shufle120.push ( lso.shufle120 [ idx ] ) ;
		all_shufle201.push ( lso.shufle201 [ idx ] ) ;
		all_fragments.push ( lso.frags [ idx ] ) ;

	}

	var eachLen ;
	for ( dldx = 0 ; dldx < dlLen ; dldx ++ ) {

		eachLen = drawList [ dldx ].mesh.len ;

		for ( idx = 0 ; idx < eachLen ; idx ++ ) {

			push_data ( idx , drawList [ dldx ] ) ;
		}
	}

	var vertex012 = new Float32Array ( allVertsLen ) 
		, shufle120 = new Float32Array ( allVertsLen )  
		, shufle201 = new Float32Array ( allVertsLen ) 
		, fragments = new Float32Array ( allVertsLen ) 
	;

	for ( idx = 0 ; idx < allVertsLen ; idx ++ ) {

		vertex012 [ idx ] = all_vertex012 [ idx ] ;
		shufle120 [ idx ] = all_shufle120 [ idx ] ;
		shufle201 [ idx ] = all_shufle201 [ idx ] ;
		fragments [ idx ] = all_fragments [ idx ] ;
	}

	shader.load.vertices_3 ( vertex012 , shufle120 , shufle201 ) ;
	shader.load.fragments ( fragments ) ;
			

	}
