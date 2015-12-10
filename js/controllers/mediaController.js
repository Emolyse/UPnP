module.exports = function (app,utils,parser) {
	app.controller("mc", ['$scope','$location', '$http',function ($scope,$location,$http) {
		var ctrl = this;
		ctrl.breadCrumb = [$scope.title];
	    ctrl.bricks = $scope.bricks;
	}]);
}