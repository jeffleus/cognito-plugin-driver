// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.MyCordovaPlugin) {
		var cognitoIdentityUserPoolId = "us-west-2_KMI3gTfQw";
		var cognitoIdentityUserPoolAppClientId = "49f7iepq786236nea8t33m1kje";
		var cognitoArnIdentityPoolId = "us-west-2:28695927-b308-4073-acd6-fedc4e1cd40b";

		var options = {
			"CognitoIdentityUserPoolId": cognitoIdentityUserPoolId,
			"CognitoIdentityUserPoolAppClientId": cognitoIdentityUserPoolAppClientId,
			"arnIdentityPoolId": cognitoArnIdentityPoolId
		};

		console.log('MyCordovaPlugin: init the plugin after $ionicPlatform.ready()');
		MyCordovaPlugin.init(options, function() {
											console.log("connectionPluginInstance Init Ok");
											//login();
										}, function() {
											console.log("connectionPluginInstance Init Fail");
										});	
	}
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
