/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Oct 17th 2025
 */

"use strict";
// nadeem's console
function empty ( node ) {
	while ( node.firstChild ) node.removeChild(node.firstChild);
}
var nc = new function () {

	var div = document.getElementById("nclog") 
		, par 
		, txt
	/*
		, cp2 = "#4D4DE5" 
		, cp3 = "#4DE500" 
		, cp4 = "#4DE5E5" 
		, cld = "#E516E5" 
		*/
	;

	this.log = function ( msg , colour ) {

		par = document.createElement("p");
		if ( arguments.length > 1 ) {
			par.style.color = colour ;
		}
		txt = document.createTextNode(msg);
		par.appendChild(txt);
		div.appendChild(par);
	};

	this.clear = function () { empty ( div ) ; };

	
	/*
	this.delay = function ( msg , colour ) {

		setTimeout( function(){
			nc.log ( msg , colour) ;
		}, 1000 );

	};
	*/

	/*
	this.delay('test no colour');
	this.delay('test colour pin2', cp2);
	this.delay('test colour pin3', cp3);
	this.delay('test colour pin4', cp4);
	this.delay('test colour load', cld);
	*/
};
