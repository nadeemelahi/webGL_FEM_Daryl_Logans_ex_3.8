/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 4th 2025
 */

"use strict";
class ShaderLampDrawObject  {
	constructor ( ) {
		this.offset = 0 ;
		this.colour = [ 0.5 , 0.5 , 0.5 , 1 ] ; 
		this.scale = [ 0.1 , 0.1 , 0.1 ] ;
		this.loc = [ 0 , 0 , 0 ] ;
		this.rot = [ 0 , 0 , 0 ] ;
		this.cnt = 0 ;
		this.len = 0 ;
		this.verts = [ ] ;

		// rotation animation 
		this.rotx = 0 ;
		this.roty = 0 ;
		this.rotz = 0 ; 

		this.stepx = 0 ;
		this.stepy = 0 ;
		this.stepz = 0 ;

		this.limx = 360 - this.stepx ;
		this.limy = 360 - this.stepy ;
		this.limz = 360 - this.stepz ;	
	}

	setRotXYZ ( ) {
		this.rot = [ this.rotx, this.roty, this.rotz ];
	}

	updateRotX ( ) {
		this.rotx += this.stepx ;
		if ( this.rotx > this.limx ) this.rotx = 0 ;
	}

	updateRotY ( ) {
		this.roty += this.stepy ;
		if ( this.roty > this.limy ) this.roty = 0 ;
	}

	updateRotZ ( ) {
		this.rotz += this.stepz ;
		if ( this.rotz > this.limz ) this.rotz = 0 ;

	}

	update ( ) {
		this.setRotXYZ ( ) ;
		this.updateRotX( ) ;
		this.updateRotY( ) ;
		this.updateRotZ( ) ;
	}

	d2r ( deg ) { 
		return deg * 3.14 / 180 ; 
	}
	round ( num ) { 
		return ( ( num * 1000 ) >> 0 ) / 1000 ; 
	}
	cos ( ang ) { 
		return this.round ( 
			Math.cos ( this.d2r ( ang ) ) 
		); }
	sin ( ang ) { 
		return this.round ( 
			Math.sin( this.d2r ( ang ) ) 
		); }

}


