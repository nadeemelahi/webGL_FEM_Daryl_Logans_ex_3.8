/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 2025
 */


"use strict;"
app();
function app() {
	ngl.init( "fsCanvas" ) ; //console.log( ngl.gl.getParameter( ngl.gl.MAX_VERTEX_ATTRIBS ) ); // 16

	var shader = ngl.shaderLamp;
	shader.compile();
	shader.use_program();

	var resCone = 5
		, resCy = 9
		, resCyep = 9
		, radCyep = 0.7

		, pt1 = [ -1.0 , -0.9 , 0.0 ]
		, pt2 = [  1.2 , -1.1 , 0.0 ]

		, resSllr = 16 
		, resBs = 16 

		, primList = [
			// plane objects 012
			new TriangleDrawA01 ( ) 
			, new QuadDrawA01 ( ) 
			, new CircleDrawA01 ( 10 ) 

			// 3d objects 345
			, new EquilateralPyramidDrawA01 ( 10 ) 
			, new CubeDrawA01 ( ) 
			, new ConeDrawA01 ( resCone ) 

			// advanced objects 678
			, new CylinderDrawA01 ( resCy ) 
			, new CylinderByEndPointsDrawA01 ( resCyep , radCyep , pt1 , pt2 ) 
			, new SphereLatLongRingsDrawA01 ( resSllr ) 

			// grouped object 9
			, new BallSocketDrawA01 ( resBs ) 
		]
	;

	var form = document.forms[0] ;
	//console.log(form.eModPin3.value);
	//form.eModPin3.value = 1100000;
	//console.log( form.locked.value ) ;
	//form.locked.value = "lockx";
	form.addEventListener( "submit", submith, false ) ;

	function submith ( evt ) {
		if ( !evt ) var evt = window.event ;
		evt.preventDefault();
		nc.clear();
		fem.form2fem () ;
	}

	form.addEventListener( "change", changeh, false ) ;
	function changeh ( evt ) {
		if ( !evt ) var evt = window.event ;

		var split = evt.target.name.split("_")
			, pin = split[0]
			, param = split[1]
			, axis = null
		;

		if ( split.length > 2 ) axis = split[2] ; 

		if ( pin == "pin3" ) {
	
			if ( param == "eMod" ) {
				rod13eMod = form.pin3_area.value ;
			} else { 
				if ( param == "loc" ) { 
					setPosition_pin3 () ;
				} else if ( param == "area" ) {
					setRod3area();
				}
				mkRodShader13 () ; 
				loadDrawData ( shader , drawList ) ;
			}

		} else if ( pin == "pin2" ) {
		
			if ( param == "eMod" ) {
				rod12eMod = form.pin2_area.value ;
			} else { 
				if ( param == "loc" ) { 
					setPosition_pin2 () ;
				} else if ( param == "area" ) {
					setRod2area();
				}
				mkRodShader12 () ; 
				loadDrawData ( shader , drawList ) ;
			}

		} else if ( pin == "pin4" ) {
			
			if ( param == "eMod" ) {
				rod14eMod = form.pin4_area.value ;
			} else { 
				if ( param == "loc" ) { 
					setPosition_pin4 () ;
				} else if ( param == "area" ) {
					setRod4area();
				}
				mkRodShader14 () ; 
				loadDrawData ( shader , drawList ) ;
			}
	
		} else if ( pin == "load" ) {

			if ( param == "applied" ) {
				setScale_load () ;

			} else if ( param == "loc" ) {
				setPosition_load () ;
				mkRodShaders1To234 () ; 
			}

		}
	}


	form.addEventListener( "reset", reseth, false ) ;

	function reseth ( evt ) {

		// reset event fires before the form resets,
		// hence this delay 
		setTimeout ( function () {
			setPosition_load ( ) ;
			setScale_load ( ) ;
			mkRodShaders1To234 () ; 
			setPosition_pin3 () ;
			setPosition_pin2 () ;
			setPosition_pin4 () ;
		}, 100 ) ;

		nc.clear();
		fem.resetResult () ;
		
	}

	form.addEventListener( "keydown", keydownh, false ) ;
	function keydownh ( evt ) {
		if ( !evt ) var evt = window.event;
		if ( evt.keyCode == 13) {
			// or .key == "ENTER"
			evt.preventDefault();
			// prevents change event too!
			changeh ( evt ) ;
		}
	}


	var idx , lim = 3
		, hundred = 100 

		, locLeftWall = [ -1.2 , 0 , -0.05 ] 
		, offsetxyz = [ -0.85 , 0 , -0.5 ] 
		, locAppliedLoad = [ 0.72 , 0 , 0 ] 

		, locBase2 = [] // [ 0 , 0 , 0.36 ] 
		, locBase3 = [] // [ 0 , 0.72 , 0.36 ]
		, locBase4 = [] // [ 0 , -0.48 , 0 ] 

		, locBase2offset = [] 
		, locBase3offset = []
		, locBase4offset = []

		, rod12eMod = 1200000
		, rod13eMod = 1200000
		, rod14eMod = 1200000

		, rodScale = 40

		, rod12rad = 0.302 
		, rod13rad = 0.729 
		, rod14rad = 0.187 

		, rod12radScaled
		, rod13radScaled
		, rod14radScaled
	
		, olist = [] 
		, drawList = [] 
		, len 
	;

	var feaList = [

		// fea 0
		new LeftWall ( ) 

		// 1 2
		, new AppliedLoad ( ) 
		, new LoadPin ( ) 

		// 3 4 5
		, new WallBase2 ( ) 
		, new Sphere2 ( ) 
		, null // new Rod12 ( ) 

		// 6 7 8
		, new WallBase3 ( ) 
		, new Sphere3 ( ) 
		, null // new Rod13 ( ) 

		// 9 10 11 
		, new WallBase4 ( ) 
		, new Sphere4 ( ) 
		, null // new Rod14 ( ) 
	] 
	;

	// offset the x loc - move it far left
	feaList[0].loc = locLeftWall;

	setPosition_load ( ) ;
	function setPosition_load( ) {

		locAppliedLoad[0] = parseInt ( form.load_loc_x.value ) / hundred ;
		locAppliedLoad[1] = parseInt ( form.load_loc_y.value ) / hundred ;
		locAppliedLoad[2] = parseInt ( form.load_loc_z.value ) / hundred ;
		for ( idx = 0 ; idx < 3 ; idx ++ ) {

			locAppliedLoad[idx] += offsetxyz[idx]
		}
		feaList[1].loc = locAppliedLoad ;
		feaList[2].loc = locAppliedLoad ; 
	}

	setPosition_pin2 ( ) ;
	function setPosition_pin2 ( ) {

		locBase2[0] = 0 ; 
		locBase2[1] = parseInt ( form.pin2_loc_y.value ) / hundred ;
		locBase2[2] = parseInt ( form.pin2_loc_z.value ) / hundred ;
		for ( idx = 0 ; idx < 3 ; idx ++ ) {

			locBase2offset[idx] = locBase2[idx] + offsetxyz[idx]
		}
		feaList[3].loc = locBase2offset ;
		feaList[4].loc = locBase2offset ;
	}

	setPosition_pin3 ( ) ;
	function setPosition_pin3 ( ) {

		locBase3[0] = 0;
		locBase3[1] = parseInt ( form.pin3_loc_y.value ) / hundred ;
		locBase3[2] = parseInt ( form.pin3_loc_z.value ) / hundred ;
		for ( idx = 0 ; idx < 3 ; idx ++ ) {

			locBase3offset[idx] = locBase3[idx] + offsetxyz[idx]
		}
		feaList[6].loc = locBase3offset ;
		feaList[7].loc = locBase3offset ;
	}

	setPosition_pin4 ( ) ;
	function setPosition_pin4 ( ) {

		locBase4[0] = 0 ; 
		locBase4[1] = parseInt ( form.pin4_loc_y.value ) / hundred ;
		locBase4[2] = parseInt ( form.pin4_loc_z.value ) / hundred ;
		for ( idx = 0 ; idx < 3 ; idx ++ ) {

			locBase4offset[idx] = locBase4[idx] + offsetxyz[idx]
		}
		feaList[9].loc = locBase4offset ;
		feaList[10].loc = locBase4offset ;
	}

	olist = feaList.concat( primList ) ;
	
	setScale_load ( ) ;
	function setScale_load ( ) {

		olist[1].scale[0] = 0.1 * form.load_applied.value / 1000 ;
		olist[1].scale[1] = 0.2 * form.load_applied.value / 1000 ;
		olist[1].scale[2] = 0.1 * form.load_applied.value / 1000 ;

	}
	function scaleRod ( rod1_rad ) {
		return rod1_rad / 40 ; 
	}

	setRod2area();
	function setRod2area () {
		rod12rad = form.pin2_area.value ;
	}	

	setRod3area();
	function setRod3area () {
		rod13rad = form.pin3_area.value ;
	}

	setRod4area();
	function setRod4area () {
		rod14rad = form.pin4_area.value ;
	}

	function mkRod12 () {
		rod12radScaled = scaleRod ( rod12rad ) ;
		olist [ 5 ] = new Rod12 ( rod12radScaled
			, locBase2offset , locAppliedLoad ) ;
	}
	function mkRod13 () {
		rod13radScaled = scaleRod ( rod13rad ) ;
		olist [ 8 ] = new Rod13 ( rod13radScaled
			, locBase3offset , locAppliedLoad ) ;
	}
	function mkRod14 () {
		rod14radScaled = scaleRod ( rod14rad ) ;
		olist [ 11 ] = new Rod14 ( rod14radScaled
			, locBase4offset , locAppliedLoad ) ;
	}

	mkRods1To234() ;
	function mkRods1To234() { 
		mkRod12(); mkRod13(); mkRod14(); 
	}

	// do not immediately invoke following 3 functions
	// just for updates
	function mkRodShader12 () {
		mkRod12(); 
		drawList [ 5 ] = new ShaderLampMesh ( 
			shader , olist [ 5 ] );
	}
	function mkRodShader13 () {
		mkRod13(); 
		drawList [ 8 ] = new ShaderLampMesh ( 
			shader , olist [ 8 ] );
	}
	function mkRodShader14 () {
		mkRod14(); 
		drawList [ 11 ] = new ShaderLampMesh ( 
			shader , olist [ 11 ] );
	}

	function mkRodShaders1To234() { 
		mkRodShader12(); 
		mkRodShader13(); 
		mkRodShader14(); 
		loadDrawData ( shader , drawList ) ;
	}

	len = olist.length ;	

	dataToGPU() ;
	function dataToGPU() {
		for ( idx = 0 ; idx < len ; idx ++ ) {

			drawList [ idx ] = new ShaderLampMesh ( 
				shader , olist [ idx ] );
		}
		loadDrawData ( shader , drawList ) ;
	}

	function draw () {

		for ( idx = 0 ; idx < len ; idx ++ ) {

			olist [ idx ] .update ( ) ;
			drawList [ idx ] .loadUniforms ( ) ;
			drawList [ idx ] .draw ( ) ;
		}
	}

	var ctm = 51 , rate = 50;
	this.tick = function ( dtm ){

		ctm += dtm ;

		if ( ctm > rate ) {
			draw () ;
			ctm = 0 ;
		};
	};
	T.add(this);



}



