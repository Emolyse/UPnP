module.exports = function(app,utils) {
    app.directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                brick:"=brick"
                ,context:"=context"
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mc"
            ,controller:function ($scope) {
                var ctrl = this;
                //ctrl.idBrick = $scope.idBrick;
                ctrl.breadCrumb = [{
                    title : $scope.title,
                    dirId : 0
                }];
                $scope.$watch("directories",function(){
                    var dirId = 0;
                    var dir = $scope.context.directories;

                });
                ctrl.Browse = function(dirId){
                    $scope.context.explorer = utils.Browse($scope.brick.id,dirId);
                };
            }
        }
    });
};