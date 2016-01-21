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
                    console.log("server controller",brickId,dirId);
                    $scope.context.explorer = utils.Browse(brickId,dirId);
                };
                var firstwatcher = $scope.$watch("firstbrick", function () {
                    console.log('Watcher first brick',$scope.firstbrick);
                    if($scope.firstbrick){
                        if($scope.firstbrick.id){
                            console.log("Browse first brick");
                            $scope.context.explorer = ctrl.Browse($scope.firstbrick.id,0);
                            firstwatcher();
                        }
                    }
                });
            }
        }
    });
}