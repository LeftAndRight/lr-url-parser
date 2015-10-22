(function(){
	var window		= this;

$code$

	// Node module definition
	if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = URLParser;
	}
	// AMD module definition
	else if (typeof define === "function" && define.amd){
		define(function () { return URLParser; } );
	}
	// Standard window definition
	else if (typeof window === "object" && typeof window.document === "object") {
		window.RootClass = URLParser;
	}
}).call(this);