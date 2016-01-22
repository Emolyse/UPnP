module.exports = function(app,utils) {
    app.directive("serverExplorer",function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/server-explorer.html'
            , scope: {
                context: "=context",
                firstbrick:"=firstbrick"
            }
            , controllerAs: "sec"
            , controller: function ($scope) {
                console.log($scope.context);
                var ctrl = this;
                ctrl.Browse = function(brickId,dirId){
                    console.log("Server", dirId)
                    utils.Browse($scope,brickId, dirId);
                    $scope.context.explorer = utils.Browse(brickId,dirId);
                    console.log("Server",dirId);
                };
                var firstwatcher = $scope.$watch("firstbrick", function () {
                    if($scope.firstbrick){
                        if($scope.firstbrick.id){
                            console.log("Browse first brick");
                            ctrl.Browse($scope.firstbrick.id,0);
                            firstwatcher();
                        }
                    }
                });
            }
        }
    });
}