chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		addLink();
	}
	}, 1);
	var locationInterval = window.setInterval(checkLocation, 100)
});

var currentLocation = window.location.href;
var buttonExists = false;
var feelingLucky = "https://www.google.com/search?btnI=I%27m+Feeling+Lucky&q="

var addLink = function(){
	console.log('...working');
	if (window.location.href.indexOf('watch') !== -1) {
		buttonExists = false;
		return;
	}
	var songTitle = $.trim($('#eow-title[title]').text().replace(/'/g, ""));
	var songTitle = sanitizeTitle(songTitle);
	var artistName = '';
	var button = jQuery("#subscribe-button");
	var link = "https://play.spotify.com/search/" + songTitle;
	buttonExists = true;
	var url = 'https://api.spotify.com/v1/search?type=track&query=' + songTitle;
	url = url.split(' ').join('+');
	var spotifyResponse;
	var menuLink = $("#action-panel-overflow-button");
	$.get(url, function(data){
			spotifyResponse = data;
			link = data.tracks.items[0].uri;
			var find = $("<a href='" + link +"' class='find-on-spotify' alt='This will pause YouTube'>Open in Spotify</a>");
			find.css({
				"background-image": "url(" + chrome.extension.getURL("src/images/spotify.png") + ")"
			});
			button.append(find);
			$('.find-on-spotify').click(pausePlayer);
			artistName = data.tracks.items[0].artists[0].name;
			artistName = artistName.replace(" ", "%20");
			var hLink = feelingLucky + artistName;
			var homepage = "<a class='homepage-link' target='_blank' href='"+ hLink + "'><img class='homepage-link-image' src='"+ chrome.extension.getURL("src/images/website.png") +"'></a>";
			var fbLink = "https://www.facebook.com/search/str/"+ artistName +"/keywords_top?ref=usmanity.com";
			var facebook = "<a class='homepage-link' target='_blank' href='"+ fbLink + "'><img class='fb-link-image' src='"+ chrome.extension.getURL("src/images/fb.png") +"'></a>";
	});
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
		}, 10);
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
