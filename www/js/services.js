angular.module('starter.services', [])

.service('AuthSvc', function($q) {

	var self = this;
	var tokenKey = 'idToken';
	
	self.login = _login;
	self.logout = _logout;
	self.refresh = _refresh;
	self.isAuthenticated = _isAuthenticated;
	
	self.session = null;
	self.token = null;
	
	function _login( loginDetails ) {
		//wrap everything in a promise to make this easy for the client
		return $q(function(resolve, reject) {
			//start with a check for the plugin on the window object
			if (!window.MyCordovaPlugin) {
				//reject if there is not plugin and set msg for client
				reject('MyCordovaPlugin not found.  Are you running on a device, or simulator?  Did you add the plugin?');
				return;
			}
			//call the login method of the plugin using the loginDetails passed to the service method
			MyCordovaPlugin.login(loginDetails, function(result) {
				//log success, stash the sessionDictionary from the result, and return the idToken string
				console.log('successful login');
				self.session = result;
				self.token = self.session[tokenKey];
				resolve(self.token);
			}, function(err) {
				//log the error and reject the promise
				console.error(err);
				reject(err);
			});
		});
	}
	
	function _logout() {
		//wrap everything in a promise to make this easy for the client
		return $q(function(resolve, reject) {
			//start with a check for the plugin on the window object
			if (!window.MyCordovaPlugin) {
				//reject if there is not plugin and set msg for client
				reject('MyCordovaPlugin logut not found.  Are you running on a device, or simulator?  Did you add the plugin?');
				return;
			}
			MyCordovaPlugin.logout(function(result) {
				self.session = null;
				console.log('successful logout');
				resolve(result);
			}, function(err) {
				console.error(err);
				reject(err);
			});
		});
	}
	
	function _refresh() {
		//wrap everything in a promise to make this easy for the client
		return $q(function(resolve, reject) {
			//start with a check for the plugin on the window object
			if (!window.MyCordovaPlugin) {
				//reject if there is not plugin and set msg for client
				reject('MyCordovaPlugin logut not found.  Are you running on a device, or simulator?  Did you add the plugin?');
				return;
			}
			MyCordovaPlugin.refresh(null, function(result) {
				console.log('successful token refresh');
				self.session = result;
				self.token = self.session[tokenKey];
				resolve(self.token);
			}, function(err) {
				console.error(err);
				reject(err);
			});
		});
	}
	
	function _isAuthenticated() {
		return (self.session !== null);
	}
	
	function _getUserType() {
		return $q(function(resolve, reject) {
			if (self.session) {
				var base64Url = self.token.split('.')[1];
				var base64 = base64Url.replace('-', '+').replace('_', '/');
				var props = JSON.parse(window.atob(base64));
				self.userTeam = props['custom:team'];
				self.userType = props['custom:userType'];
				console.log(self.userProps);
				return resolve(self.userType);
			} else {
				return reject('there is no current authenticated session');
			}
		});
	}
	
});
