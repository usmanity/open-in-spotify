chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		addLink();

		!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";
		analytics.load("6ZTf0oanOl0OPI8hzXMZw9Ku2WPZg431");
		analytics.page()
	}}();

	}
	}, 10);
	var locationInterval = window.setInterval(checkLocation, 100)
});

var currentLocation = window.location.href;
var buttonExists = false;

var addLink = function(){
	if (window.location.href.indexOf('watch') === -1) {
		buttonExists = true;
		return;
	}
	var songTitle = $.trim($('#eow-title[title]').text().replace(/'/g, ""));
	var songTitle = sanitizeTitle(songTitle);
	var button = jQuery(".yt-uix-button-subscription-container");
	var link = "https://play.spotify.com/search/" + songTitle;
	buttonExists = true;
	var url = 'https://api.spotify.com/v1/search?type=track&query=' + songTitle;
	url = url.split(' ').join('+');
	var spotifyResponse;
	var menuLink = $("#action-panel-overflow-button");
	var amazonTitle = songTitle.split(' ').join('%20');
	var amazonLink = "<a class='amazon-link' target='_blank' href='http://smile.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=triangleface-20&linkId=U6QIH3JDQYXL2I7B&keywords="+ amazonTitle +"'><img class='amazon-link-image' src='http://mhmd.us/1iHuB+'></a>";
	menuLink.parent().parent().after(amazonLink);
	$.get(url, function(data){
			spotifyResponse = data;
			link = data.tracks.items[0].uri;
			var find = $("<a href='" + link +"' class='find-on-spotify' alt='This will pause YouTube'>Play in Spotify</a>");
			button.append(find);
			$('.find-on-spotify').click(pausePlayer);
	})

}

var checkLocation = function(){
	if (window.location.href !== currentLocation){
		buttonExists = false;
		if (!buttonExists && $('#progress').length === 0){
			addLink();
		}
		window.setTimeout(function(){
			if ($('#progress').length === 0) {
				currentLocation = window.location.href;
			}
		}, 100);
	}
}

var sanitizeTitle = function(title){
	var _has = function(char) { return title.indexOf(char) !== -1 }
	var cleanTitle = title;
	if (_has('(') || _has('[') || _has('{')){
		var matches = title.match(/\(.*\)|\[.*\]|\{.*\}/);
		if (matches.length > 0) {
			for ( var i in matches ){
				cleanTitle = title.replace(/\(.*\)|\[.*\]|\{.*\}/, '').replace(/ - /, ' ').replace(/-/, ' ');
			}
		}
	}
	return cleanTitle;
}

var pausePlayer = function(){
	$('.html5-player-chrome .ytp-button-pause').click()
}
