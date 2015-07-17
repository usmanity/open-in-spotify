chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            addLink();
        }
    }, 10);
});

var currentLocation = window.location.href;
var buttonExists = false;

var checkLocation = function () {
    console.log("window.location.href: " + currentLocation);
    if (window.location.href !== currentLocation) {
        buttonExists = false;
        if (!buttonExists && $('#progress').length === 0) {
            addLink();
        }
        window.setTimeout(function () {
            if ($('#progress').length === 0) {
                currentLocation = window.location.href;
            }
        }, 100);
    }
};

var addLink = function () {
    if (window.location.href.indexOf('watch') === -1) {
        buttonExists = true;
        return;
    }
    var songTitle = $.trim($('#eow-title[title]').text().replace(/'/g, ""));
    songTitle = sanitizeTitle(songTitle);
    var button = jQuery(".yt-uix-button-subscription-container");
    // var link = "https://play.spotify.com/search/" + songTitle;
    buttonExists = true;
    var url = 'https://api.spotify.com/v1/search?type=track&query=' + songTitle;
    url = url.split(' ').join('+');
    var spotifyResponse;
    $.get(url, function (data) {
        spotifyResponse = data;
        var link = data.tracks.items[0].uri;
        console.log("Found tracks: " + data.tracks.items);
        var find = $("<a href='" + link + "' class='find-on-spotify' alt='This will pause YouTube'>Open in Spotify</a>");
        find.css({
            "background-image": "url(" + chrome.extension.getURL("src/images/spotify.png") + ")"
        });
        button.append(find);
        $('.find-on-spotify').click(pausePlayer);
    });
};

var sanitizeTitle = function (title) {
    return title.replace(/\(.*\)|\[.*\]|\{.*\}/g, '').replace(/-/, ' ').replace(/ +(?= )/g,'');
};

var pausePlayer = function () {
    $('.html5-player-chrome .ytp-button-pause').click()
};
