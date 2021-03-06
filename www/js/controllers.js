angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $q, $timeout, $ionicModal, $ionicPopup, $ionicLoading, $cordovaDevice, AuthSvc) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};
  document.addEventListener("deviceready", function () {
      var device = $cordovaDevice.getDevice()
      console.log('Device UUID is: ' + device.uuid);
  });
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
	
  $scope.getUserType = function() {
	  AuthSvc.getUserType().then(function(result) {
			$ionicPopup.alert({
				title: 'USERTYPE',
				template: result
			});
	  });
  };

  // Open the login modal
  $scope.login = function() {
	  if (AuthSvc.isAuthenticated()) {
		  console.log('logging out');
		  $ionicLoading.show();
		  AuthSvc.logout().catch(function(err) {
			  console.error('AppCtrl', err);
		  }).finally(function() {
			  $ionicLoading.hide();
		  });
	  } else {
		  console.log('open login modal');
		  $scope.modal.show();
	  }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $ionicLoading.show();
	  
	console.log('MyCordovaPlugin: start the login logic on the plugin...');
//	MyCordovaPlugin.login({"username":"fsdemo-manager", "password":"FuelStation17!"}, function(res) {
//								// Success
//								console.log('CognitoSession:');
//								console.log(res);
//								$scope.closeLogin();
//								$ionicLoading.hide();
//							}, function(err) {
//								 // Error : err
//								 console.error(err);
//								$ionicLoading.hide();
//							 });
		AuthSvc.login({"username":"fsdemo-manager", "password":"FuelStation17!"})
		.then(function(result) {
			console.log('CognitoSession:');
			console.log(result);
			$scope.closeLogin();
			$ionicLoading.hide();		  
		}).catch(function(err) {
			console.error(err);
			$ionicLoading.hide();
		});
  };
	
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
