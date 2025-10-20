/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */

"use strict";

class CylinderByEndPoints extends ShaderLampDrawObject {
	constructor ( res , rad , pt1 , pt2 ) {
		super ( ) ; 

		this.verts = [] ;

		if ( res < 5 ) res = 5 ;

		function d2r ( deg ) { return deg * 3.14156 / 180; }
		function round ( num ) { return ( (num * 1000)>>0 ) / 1000 ; }
		function cos ( angle ) { return round ( Math.cos( d2r( angle ) ) ); }
		function sin ( angle ) { return round ( Math.sin( d2r( angle ) ) ); }
		
		var idx 
			, dfx = pt2[0] - pt1[0]  
			, dfy = pt2[1] - pt1[1]  
			, dfz =  pt2[2] - pt1[2]  

			, ln12 = [ dfx , dfy , dfz ]
			, ln21 = [ -dfx , -dfy , -dfz ]

			, lnmag = Math.sqrt ( 
				Math.pow ( dfx , 2 )  
				+ Math.pow ( dfy , 2 )  
				+ Math.pow ( dfy , 2 )  
			)

			, uvi = dfx / lnmag
			, uvj = dfy / lnmag
			, uvk = dfz / lnmag

			, rotz 
			, roty

			, angle = 360 / res 

			, cosz
			, cosy

			, xgbl
			, ygbl
			, zgbl

			, endface1 = []
			, endface2 = []

		; 


		function calculateLoc2GblTranformAngles4pt2() {

			rotz = Math.atan ( uvk / uvi );
			roty = Math.atan ( uvj / uvi );
		}
		calculateLoc2GblTranformAngles4pt2();

		// above is 4 point 2, for point 1 multiple all by -1 
		// and call calculateLoc2GblTranformAngles4pt1();
		function calculateLoc2GblTranformAngles4pt1(){

			uvi *= -1;
			uvj *= -1;
			uvk *= -1;
			calculateLoc2GblTranformAngles4pt2();
		}

		function translatePt2 ( ) {

			xgbl += pt2[0] ;
			ygbl += pt2[1] ;
			zgbl += pt2[2] ;
		}

		function translatePt1 ( ) {

			xgbl += pt1[0] ;
			ygbl += pt1[1] ;
			zgbl += pt1[2] ;
		}

		function calcXglobal( xlcl,ylcl,zlcl ) {
			xgbl = cos ( rotz ) * cos ( roty ) * xlcl
				+ sin ( rotz ) * ylcl
				+ cos ( rotz ) * sin ( roty ) * zlcl
			;
		}
		function calcYglobal( xlcl,ylcl,zlcl ) {
			ygbl = -1 * sin ( rotz ) * cos ( roty ) * xlcl
				+ cos ( rotz ) * ylcl
				- sin ( rotz ) * sin ( roty ) * zlcl
			;
		}
		function calcZglobal( xlcl,ylcl,zlcl ) {
			zgbl = -1 * sin ( roty ) * xlcl
				+ cos ( roty ) * zlcl
			;
		}
		function calcGlobal( xlcl,ylcl,zlcl ) {
			calcXglobal( xlcl,ylcl,zlcl ) ;
			calcYglobal( xlcl,ylcl,zlcl ) ;
			calcZglobal( xlcl,ylcl,zlcl ) ;
		}

		function pushXYZ ( verts ){
			verts.push ( xgbl ) ;
			verts.push ( ygbl ) ;
			verts.push ( zgbl ) ;
			verts.push ( 1 ) ;
		}
		function pushEndFacePoints1 ( x,y,z ) {
			endface1.push(x);
			endface1.push(y);
			endface1.push(z);
		}
		function pushEndFacePoints2 ( x,y,z ) {
			endface2.push(x);
			endface2.push(y);
			endface2.push(z);
		}

		// circle face at endpoint 2 
		for ( idx = 0 ; idx < res; idx ++ ) {

			// Local
			// 1: 0 , 0 , 0 
			// 2: 0 , rad*sin(idx*angle) , rad*cos(idx*angle)
			// 3: 0 , rad*sin((idx+1)*angle) , rad*cos((idx+1)*angle)

			// 1-2-3
			// 1
			calcGlobal ( 0 , 0 , 0 ) ;
			translatePt2();
			pushXYZ(this.verts);

			// 2
			calcGlobal ( 0 , rad*sin(idx*angle) , rad*cos(idx*angle) ) ;
			translatePt2();
			pushXYZ(this.verts);

			pushEndFacePoints2(xgbl,ygbl,zgbl);

			// 3
			calcGlobal ( 0 , rad*sin((idx+1)*angle) , rad*cos((idx+1)*angle) ) ;
			translatePt2();
			pushXYZ(this.verts);
		}

		calculateLoc2GblTranformAngles4pt1();
		// circle face at endpoint 1 
		for ( idx = 0 ; idx < res; idx ++ ) {

			// Local
			// 1: 0 , 0 , 0 
			// 2: 0 , rad*sin(idx*angle) , rad*cos(idx*angle)
			// 3: 0 , rad*sin((idx+1)*angle) , rad*cos((idx+1)*angle)

			// 1-3-2
			// 1
			calcGlobal ( 0 , 0 , 0 ) ;
			translatePt1();
			pushXYZ(this.verts);

			// 3
			calcGlobal ( 0 , rad*sin((idx+1)*angle) , rad*cos((idx+1)*angle) ) ;
			translatePt1();
			pushXYZ(this.verts);

			// 2
			calcGlobal ( 0 , rad*sin(idx*angle) , rad*cos(idx*angle) ) ;
			translatePt1();
			pushXYZ(this.verts);

			pushEndFacePoints1(xgbl,ygbl,zgbl);
		}

		function pt1push2 ( idx , verts ) {
			verts.push( endface1[ idx ] ) ;
			verts.push( endface1[ idx + 1 ] ) ;
			verts.push( endface1[ idx + 2 ] ) ;
			verts.push( 1 ) ;
		}

		function pt1push3 ( idx , verts ) {
			verts.push( endface1[ idx + 3 ] ) ;
			verts.push( endface1[ idx + 4 ] ) ;
			verts.push( endface1[ idx + 5] ) ;
			verts.push( 1 ) ;
		}

		function pt2push2 ( idx , verts ) {
			verts.push( endface2[ idx ] ) ;
			verts.push( endface2[ idx + 1 ] ) ;
			verts.push( endface2[ idx + 2 ] ) ;
			verts.push( 1 ) ;
		}

		function pt2push3 ( idx , verts ) {
			verts.push( endface2[ idx + 3 ] ) ;
			verts.push( endface2[ idx + 4 ] ) ;
			verts.push( endface2[ idx + 5] ) ;
			verts.push( 1 ) ;
		}

		var endFaceLen = endface1.length - 3 ;
		// ex) res = 5 , 5x3(xyz) = 15
		// 0 3 ... 12
		// minus - 3 to skip last one for closing up the loop
		for ( idx = 0 ; idx < endFaceLen; idx += 3 ) {

			// pt2 - 2 
			pt2push2 ( idx , this.verts ) ;

			// pt2 - 3
			pt2push3 ( idx , this.verts ) ;

			// pt1 - 2
			pt1push2 ( idx , this.verts ) ;

			//

			// pt2 - 3
			pt2push3 ( idx , this.verts ) ;

			// pt1 - 3
			pt1push3 ( idx , this.verts ) ;

			// pt1 - 2
			pt1push2 ( idx , this.verts ) ;
		}
		// last one goes back to begining

		// pt2 - 2 
		pt2push2 ( idx , this.verts ) ;

		// pt2 - 3 --back to beginning
		pt2push2 ( 0 , this.verts ) ;

		// pt1 - 2
		pt1push2 ( idx , this.verts ) ;

		//

		// pt2 - 2 --back to beginning
		pt2push2 ( 0 , this.verts ) ;

		// pt1 - 3 --back to beginning
		pt1push2 ( 0 , this.verts ) ;

		// pt1 - 2
		pt1push2 ( idx , this.verts ) ;




		this.len = this.verts.length ; 
		this.cnt = this.len / 4 ; //  x dim=4  
		//console.log("len,cnt"); console.log(this.len,this.cnt);
	}
}
