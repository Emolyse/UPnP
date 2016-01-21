module.exports = function(app,utils) {
    app.directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                brick:"=brick"
                ,context:"=context"
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mec"
            ,controller:function ($scope) {
                var ctrl = this;
                //ctrl.idBrick = $scope.idBrick;
                ctrl.breadCrumb={
                    0: {
                        titre : $scope.title
                    }
                };
                $scope.$watch("context.explorer.directories",function(){
                    var dirId = 0;
                    //var dir = $scope.context.directories;
                    console.log('Les bananas');
                    //if(dir.l){
                    //    dir = $scope.context.directories[0];
                    //    if(dir.id==0){
                    //
                    //    }
                    //}
                });
                ctrl.Browse = function(dirId){
                    $scope.context.explorer = utils.Browse($scope.brick.id,dirId);
                };
            }
        }
    });
};