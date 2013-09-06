// ==UserScript==
// @name         Link Rewriter
// @namespace    https://github.com/chag/UserScripts/
// @version      0.0.2
// @description  rewrite outgoing link interception
// @match        http://*/*
// @copyright    (C) 2013 chag@stalkerbox.net
// ==/UserScript==


(function() {
	function encodeSearch(data) {
		return Object.keys(data).map(function(key) {
			return [key, data[key]].map(encodeURIComponent).join("=");
		}).join("&");
	}
	
	function decodeSearch(searchquery) {
		var match, data = {};
		while(match = (/([^&=]+)=?([^&]*)/g).exec(searchquery.substring(1))) {
			data[decodeURIComponent(match[1].replace(/\+/g, " "))] = decodeURIComponent(match[2].replace(/\+/g, " "));
		}
		return data;
	}
	
	var anchors = window.document.getElementsByTagName('a');
	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].search && anchors[i].pathname) {
			window.console.log(anchors[i]);
		}
	}
})();
