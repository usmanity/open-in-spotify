// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// window.onload = function() {
//   ChromeExOAuth.initCallbackPage();
// }

var redirect_uri = 'chrome-extension://kpjdpbeffncpamkmkhnoephlpolgkidn/src/options.html';
var redirect_uri = 'https://usmanity.com/spotify-auth';
var client_id = 'fca34c0c1115412eac543d33861b6a50';
var authUrl = 'https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri)

var authLink = document.getElementById('authLink');
authLink.setAttribute('href', authUrl);