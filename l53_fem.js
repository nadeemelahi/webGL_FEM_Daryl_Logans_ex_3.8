/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 17, 19th 2025
 */

"use strict";

function round ( num ) {
	var precision = 10000 ;
	return ( num * precision >> 0 ) / precision ;
}

var Rod = function ( form, pinNumber ) {

	this.lockedXYZ012 = null ;
	this.eMod = parseInt ( form[ ( "pin"+ pinNumber + "_eMod" ) ].value ) ;
	this.xarea = parseFloat ( form[ ( "pin"+ pinNumber + "_area" ) ].value ) ;
	this.pt1 = [
		0
		, parseInt ( form[ ( "pin"+ pinNumber + "_loc_y" ) ].value )
		, parseInt ( form[ ( "pin"+ pinNumber + "_loc_z" ) ].value )
	];
	this.colour = null;
	
	if ( pinNumber == 1 ) this.colour = "#E516E5" 
	else if ( pinNumber == 2 ) this.colour = "#4D4DE5" 
	else if ( pinNumber == 3 ) this.colour = "#4DE500" 
	else if ( pinNumber == 4 ) this.colour = "#4DE5E5" 


	// filled later on prototype, cause they will be the same for all Rods
	//this.pt2 = null ; 
	//with pt2, then each can calculate their lengths
	
	this.rodLen = null;
	this.delxyz = [];
	this.EbyL = null;
	this.AEbyL = null;

	this.cosines = [];
	this.cos1 = null;
	this.cos2 = null;
	this.stress = null;

	// row major
	this.lambda = [];

	// restrict z for pt 1 (load) 
	this.globalMat = [];

	this.init ( form ) ;

};
Rod.prototype.pt2 = null;
Rod.prototype.init = function ( form ) {

	this.setLoadPoint ( form ) ;
	this.setLockedXYZ012 ( form ) ;
	this.setDelxyz( ) ;
	this.setRodLen( ) ;
	this.setCosines ( ) ;
	this.setLambda( ) ;
	this.setEbyL ( ) ;
	this.setAEbyL ( ) ;
	this.setGlobalMat ( ) ;

	//this.printRodLen( ) ;
	//this.printCosines ( ) ;
	//this.printLambda( ) ;
	//this.printAEbyL( ) ;

	//
	// textbook example
	// pt1 ( 72,  0,  0 ) -> ( 72,  0,  0)  // LOAD
	// pt2 (  0, 36,  0 ) -> (  0,  0, 36)  // blue middle
	// pt3 (  0, 36, 72 ) -> (  0, 72, 36)  // green top 
	// pt4 (  0,  0,-48 ) -> (  0,-48,  0)  // cyan near

	// this.printRodLen();
	// rod1 line12 blue 80.5
	// rod2 line13 green 108
	// rod3 line14 cyan 86.5 in
	//
	// this.printCosines();
	// rod1 blue -0.89 , 0 , 0.45
	// rod2 green -0.667 , 0.667 , 0.33
	// rod3 cyan -0.833 , -0.550 , 0
	// 
	// this.printLambda();
	//
	// rod1 
	//  |  0.79   0     -0.40  |
	//  |  0      0      0     |
	//  | -0.4    0      0.20  |
	//
	// rod2 
	//  |  0.45  -0.45  -0.22  |
	//  | -0.45   0.45   0.22  |
	//  | -0.22   0.22   0.11  |
	//
	// rod3 
	//  |  0.69   0.46   0     |
	//  |  0.46   0.30   0     |
	//  |  0      0      0     |
	//
	// 	1x    2y    3z
	//
	//  1x  
	//
	//  2y
	//
	//  3z
	//
	// B.C - load point 1 restrict z
	//  
	// 	1x    2y
	//
	//  1x  
	//
	//  2y
	//
	// 	1x    2y
	//
	//  1x  00    -01
	//
	//  2y  -10    11
	//


};
Rod.prototype.setLoadPoint = function ( form ) {
	this.pt2 = [
		 parseInt ( form["load_loc_x"].value )
		 , parseInt ( form["load_loc_y"].value )
		 , parseInt ( form["load_loc_z"].value )
	];
};

Rod.prototype.setLockedXYZ012 = function ( form ) {
	var locked = form.locked.value;
	if ( locked == "load_lock_x" ) this.lockedXYZ012 = 0 ; 
	else if ( locked == "load_lock_y" ) this.lockedXYZ012 = 1 ; 
	else if ( locked == "load_lock_z" ) this.lockedXYZ012 = 2 ; 
};

Rod.prototype.setDelxyz = function ( form ) {

	this.delxyz[0] = this.pt1[0] - this.pt2[0];
	this.delxyz[1] = this.pt1[1] - this.pt2[1];
	this.delxyz[2] = this.pt1[2] - this.pt2[2];
};

Rod.prototype.setRodLen = function ( form ) {
	this.rodLen = round (
		Math.sqrt ( this.delxyz[0] * this.delxyz[0]
			+ this.delxyz[1] * this.delxyz[1]
			+ this.delxyz[2] * this.delxyz[2]
		)
	);
};

Rod.prototype.log = function ( msg ) {
	nc.log ( msg , this.colour ) ;
};
Rod.prototype.printRodLen = function ( ) {

	this.log ( this.rodLen ) ;
};

Rod.prototype.setEbyL = function ( ) {
	this.EbyL = round ( this.eMod / this.rodLen );
};

Rod.prototype.setAEbyL = function ( ) {
	this.AEbyL = round ( this.xarea * this.EbyL );
};

Rod.prototype.printAEbyL = function ( ) {
	this.log ( this.AEbyL ) ; 
};

Rod.prototype.setCosines = function ( ) {

	this.cosines [ 0 ] = round ( this.delxyz[0] / this.rodLen );
	this.cosines [ 1 ] = round ( this.delxyz[1] / this.rodLen );
	this.cosines [ 2 ] = round ( this.delxyz[2] / this.rodLen );
};

Rod.prototype.printCosines = function ( ) {

	this.log ( this.cosines [ 0 ] 
		+ "  ,  " +  this.cosines [ 1 ] 
		+ "  ,  " + this.cosines [ 2 ] 
	);

};
Rod.prototype.setLambda = function ( ) {

	var cx = this.cosines[0]
		, cy = this.cosines[1]
		, cz = this.cosines[2]

		, rnd = round

		, cxx = rnd ( cx * cx ) 
		, cyy = rnd ( cy * cy ) 
		, czz = rnd ( cz * cz ) 

		, cxy = rnd ( cx * cy ) 
		, cxz = rnd ( cx * cz )
		, cyz = rnd ( cy * cz ) 
	;

	this.lambda = [

		cxx , cxy , cxz

		, cxy , cyy , cyz

		, cxz , cyz , czz

	];
};

Rod.prototype.printLambdaRow = function ( idx ) {
	var lambda = this.lambda ;

	this.log ( 
		( "|   " + lambda[idx]   
			+ "    " + lambda[idx + 1]  
			+ "    " + lambda[idx + 2]  + "   |"
		)
	) ;
};
Rod.prototype.printLambda = function ( ) {

	this.printLambdaRow ( 0 ) ; // 012
	this.printLambdaRow ( 3 ) ; // 345
	this.printLambdaRow ( 6 ) ; // 678

};

Rod.prototype.setGlobalMat = function ( ) {
	var idx , len = 9
		, offset = 3
		, lda = this.lambda
		, ael = this.AEbyL 
		, idx1 , idx2
		, kay = []
	;

	for ( idx = 0 ; idx < len ; idx ++ ) {

		kay [ idx ] = ael * lda[idx] ;
	}

	if ( this.lockedXYZ012 == 0 ) {
		// yz
		idx1 = 1 ; idx2 = 2 ;

	} else if ( this.lockedXYZ012 == 1 ) {
		// xz
		idx1 = 0 ; idx2 = 2 ;

	} else if ( this.lockedXYZ012 == 2 ) {
		// xy
		idx1 = 0 ; idx2 = 1 ;
	}
	this.cos1 = this.cosines[idx1] ; 
	this.cos2 = this.cosines[idx2] ;

	this.globalMat = [
		kay [ idx1 ] 		, kay [ idx2 ] 
		, kay [ idx1 + offset ] , kay [ idx2 + offset ]  
	];
	// is is symmetric so Transpose is the same
};
Rod.prototype.calcStress = function ( solve0 , solve1) {
	this.stress = round ( -1*this.EbyL*( this.cos1 * solve0 + this.cos2 * solve1 ) ) ;
};

var fem = new function () {

	var idx , jdx
		, offset = 2 //
		, rodCnt = 3
		, form = document.forms[0] 
		, rods 
		, weight
		, allBCmat = []
	// matrix of all 3 rods with BC applied
	 	, gere = []
	// guass elimination row echelon form 
	// 3x2
	// 1x1x 1x1y | f1x = 0 
	// 1y1x 1y1y | f1y = load = -1*1000 
, solve0
		, solve1
		, span_resultDeformation = document.getElementById("resultDeformation")
		, resultDeformation_txt
		, span_resultStresses = [
			document.getElementById("resultStressRod1")
			, document.getElementById("resultStressRod2")
			, document.getElementById("resultStressRod3")
		]
		, resultStress_txt
	; 

	function load_rods () {

		rods = [] ;
		// pins 2,3,4
		for ( idx = 0 ; idx < rodCnt ; idx ++ ) {

			rods[idx] = new Rod ( form , ( idx + offset ) ) ; 
		}
	}

	function assembleGlobalMat () {

		for ( jdx = 0 ; jdx < 4 ; jdx ++ ) {
			allBCmat[jdx] = 0 ;
			for ( idx = 0 ; idx < rodCnt ; idx ++ ) {

			allBCmat[jdx] += rods[idx].globalMat[jdx] ;

			}
		}

		for ( jdx = 0 ; jdx < 4 ; jdx ++ ) {
			
			allBCmat[jdx] = round ( allBCmat[jdx] ) ;
		}

	}

	function loadGERE () {

		weight = parseInt ( form.load_applied.value ) ;

		gere[0] = allBCmat[0] ;
		gere[1] = allBCmat[1] ;
		gere[2] = 0 ;

		gere[3] = allBCmat[2] ;
		gere[4] = allBCmat[3] ;
		gere[5] = -1 * weight ;

	}

	function solveDeformations(){

		//printGERE() ;

		//printDashLineBreak ( ) ;
		normalizeGERErow2 () ;
		//printGERE() ;

		//printDashLineBreak ( ) ;
		zeroOutRow2Col1() ;
		//printGERE() ;

		//printDashLineBreak ( ) ;
		solveGE () ;

	}

	this.form2fem = function(){

		load_rods () ;

		assembleGlobalMat () ;

		loadGERE () ;

		solveDeformations();
		

		if ( rods[0].lockedXYZ012 == 0 ) { 
			deformationYZ_text() ;
			//print_solveYZ () ;
		} else if ( rods[0].lockedXYZ012 == 1 )  {  
			deformationXZ_text() ;
			//print_solveXZ () ;
		} else if ( rods[0].lockedXYZ012 == 2 )  {  
			deformationXY_text() ;
			//print_solveXY () ;
		}

		for ( idx = 0 ; idx < rodCnt ; idx ++ ) {

			rods[idx].calcStress ( solve0 , solve1 ) ;
			resultStress_txt = document.createTextNode ( rods[idx].stress ) ;
			empty ( span_resultStresses[idx] ) ;
			span_resultStresses[idx].appendChild ( resultStress_txt ) ;
			
		}

		empty ( span_resultDeformation  ) ;
		span_resultDeformation.appendChild ( resultDeformation_txt ) ;

	};

	function printDashLineBreak ( ) { nc.log ( "---" ); }
	function printGlobalMatRow ( idx ) {
		nc.log ( allBCmat[idx] + "  " + allBCmat[idx+1] );
	}
	function printGlobalMat ( ) {
		printGlobalMatRow ( 0 ) ;
		printGlobalMatRow ( 2 ) ;
	}

	function printGERErow ( idx ) {
		nc.log ( gere[idx] + "  " + gere[idx+1] + "  |  " + gere[idx+2]);
	}
	function printGERE ( ) {
		printGERErow ( 0 ) ;
		printGERErow ( 3 ) ;
	}
	
	function normalizeGERErow2 () {

		var idx , lim = 6
			, factor = gere[0] / gere[3] 
		;

		for ( idx = 3 ; idx < lim ; idx ++ ) {
			gere[idx] *= factor ;
			gere[idx] = round ( gere[idx] ) ;
		}
	} 

	function zeroOutRow2Col1 () {

		var idx = 0 , offset = 3 ;
		gere[offset] = gere[idx] - gere[offset] ;
		gere[offset + 1 ] = gere[idx + 1 ] - gere[offset + 1] ;
		gere[offset + 2 ] = gere[idx + 2 ] - gere[offset + 2] ;
	}
	function solveGE () {

		solve1 = round ( gere[5] / gere[4] );
		solve0 = round ( ( gere[2] - ( gere[1] * solve1 ) ) / gere[0] );

	}

	function deformationYZ_text () {
		resultDeformation_txt = document.createTextNode ( " 0 , " + solve0 + " , " + solve1 ) ;
	}

	function deformationXZ_text () {
		resultDeformation_txt = document.createTextNode ( solve0 + " , 0 , " + solve1 ) ;
	}

	function deformationXY_text () {
		resultDeformation_txt = document.createTextNode ( solve0 + " , " + solve1 + " , 0 " ) ;
	}

	this.resetResult = function () {

		resultDeformation_txt = document.createTextNode ( " _ , _ , _ " ) ;
		empty ( span_resultDeformation  ) ;
		span_resultDeformation.appendChild ( resultDeformation_txt ) ;

		for ( idx = 0 ; idx < 3 ; idx ++ ) {
			empty ( span_resultStresses[idx] ) ;
			resultStress_txt = document.createTextNode ( "_" ) ;
			span_resultStresses[idx].appendChild ( resultStress_txt ) ;
		}
	};

	function print_solveXZ () {
		nc.log( "d1x = " + solve0 + " , d1z = " + solve1 ) ;
	}
	
	function print_solveXY () {
		nc.log( "d1x = " + solve0 + " , d1y = " + solve1 ) ;
	}


	function print_solveYZ () {
		nc.log( "d1y = " + solve0 + " , d1z = " + solve1 ) ;
	}

	function print_solveXZ () {
		nc.log( "d1x = " + solve0 + " , d1z = " + solve1 ) ;
	}
	
	function print_solveXY () {
		nc.log( "d1x = " + solve0 + " , d1y = " + solve1 ) ;
	}



};
