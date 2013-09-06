// ==UserScript==
// @name         Link Rewriter
// @namespace    https://github.com/chag/UserScripts/
// @version      0.0.3
// @description  rewrite outgoing link URLs
// @match        http://*/*
// @copyright    (C) 2013 chag@stalkerbox.net
// ==/UserScript==


(function() {
	var decode_re = /([^&=]+)=?([^&]*)/g;
	var space_re = /\+/g;
	var path_re = /\/out\.\w+$/gi;
	
	function encodeSearch(data) {
		return Object.keys(data).map(function(key) {
			return [key, data[key]].map(encodeURIComponent).join("=");
		}).join("&");
	}
	
	function decodeSearch(searchquery) {
		var match, data = {};
		while(match = decode_re.exec(searchquery.substring(1))) {
			data[decodeURIComponent(match[1].replace(space_re, " "))] = decodeURIComponent(match[2].replace(space_re, " "));
		}
		return data;
	}
	
	var anchors = window.document.getElementsByTagName('a');
	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].search && anchors[i].pathname && path_re.test(anchors[i].pathname)) {
			var data = decodeSearch(anchors[i].search);
			if(data.url) {
				anchors[i].href = data.url;
			}
		}
	}
})();
