/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 8th 2025
 */

"use strict";

var resSph = 30 
   , scaleBase = 0.1 
   , scaleBaseDown = 0.02 
   , scaleSphere = 0.08 
   , scaleSphereDown = 0.05 

   , offsetxyz = [ -0.4 , 0.0, -0.5 ] 
   , offsetWallBases = -0.6 

   , locLeftWall = [ -0.9 , 0 , 0.0 ] 

   , locAppliedLoad = [ 0.72 , 0 , 0 ] 
   , locBase2 = [ 0 , 0 , 0.36 ] 
   , locBase3 = [ 0 , 0.72 , 0.36 ]
   , locBase4 = [ 0 , -0.48 , 0 ] 

   , pinColour = [ 0.7 , 0.7 , 0.7 , 1 ] 
;

// left wall

class LeftWall extends Cube {
   constructor ( ) {
      super ( ) ; 
      this.colour = [ 0.9 , 0.3 , 0.3 , 1 ] ;
      this.scale = [ 0.1 , 1.2 , 0.45 ] ;
   }
}


// point 1 
class AppliedLoad extends Cone {

   constructor ( ) {
      super ( 10 ) ; 

      // move down y-=0.5 so tip is origin
      var idx , step = 4 , yoffset = 1.0 ;
      for ( idx = 0 ; idx < this.len ; idx += step ) {

	 this.verts [ idx + 1 ] -= yoffset ; 
      }

      this.colour = [ 0.9 , 0.1 , 0.9 , 1 ] ;
   }
}
class LoadPin extends SphereLatLongRings {

   constructor ( ) {
      super ( 20 ) ; 

      this.colour = pinColour ;
      this.scale = [ 0.05 , 0.05 , 0.05 ] ; 
   }
}


// ball socket 2 base 
class WallBase2 extends Cube {
   constructor ( ) {
      super ( ) ; 
      this.colour = [ 0.3 , 0.3 , 0.9 , 1 ] ;
      this.scale = [ scaleBaseDown , scaleBase , scaleBase ] ; 
   }
}

class Sphere2 extends SphereLatLongRings {
   constructor ( ) {
      super ( resSph ) ; 
      this.colour = pinColour ;
      this.scale = [ scaleSphereDown , scaleSphere , scaleSphere ] ;
   }
}
// ball socket 3 base 
class WallBase3 extends Cube {
   constructor ( ) {
      super ( ) ; 
      this.colour = [ 0.3 , 0.9 , 0.0 , 1 ] ;
      this.scale = [ scaleBaseDown , scaleBase , scaleBase ] ; 
   }
}

class Sphere3 extends SphereLatLongRings {
   constructor ( ) {
      super ( resSph ) ; 
      this.colour = pinColour ;
      this.scale = [ scaleSphereDown , scaleSphere , scaleSphere ] ;
   }
}


class WallBase4 extends Cube {
   constructor ( ) {
      super ( ) ; 
      this.colour = [ 0.3 , 0.9 , 0.9 , 1 ] ;
      this.scale = [ scaleBaseDown , scaleBase , scaleBase ] ; 
   }
}

class Sphere4 extends SphereLatLongRings {
   constructor ( ) {
      super ( resSph ) ; 
      this.colour = pinColour ;
      this.scale = [ scaleSphereDown , scaleSphere , scaleSphere ] ;
   }
}

class Rod12 extends CylinderByEndPoints {
   constructor ( rad , locBase2 , locAppliedLoad ) {
      super ( 10 , rad , locBase2 , locAppliedLoad ) ; 
      this.scale = [ 1 , 1 , 1 ] ;
      this.colour = [ 0.3 , 0.3 , 0.9 , 1 ] ;
   }
}

class Rod13 extends CylinderByEndPoints {
   constructor ( rad , locBase3 , locAppliedLoad ) {
      super ( 10 , rad , locBase3 , locAppliedLoad ) ; 
      this.scale = [ 1 , 1 , 1 ] ;
      this.colour = [ 0.3 , 0.9 , 0.0 , 1 ] ;
   }
}

class Rod14 extends CylinderByEndPoints {
   constructor ( rad , locBase4 , locAppliedLoad ) {
      super ( 10 , rad , locBase4 , locAppliedLoad ) ; 
      this.scale = [ 1 , 1 , 1 ] ;
      this.colour = [ 0.3 , 0.9 , 0.9 , 1 ] ;
   }
}


