module.exports = function(app,utils) {
    app.directive("player",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/player.html'
            ,scope:{
                brick:"=brick"
                ,media:"=media"
                ,title:"=title"
            }//Chaine passée directement
            ,controllerAs:"mr"
            ,controller:function ($scope,$location,$http) {
                var ctrl = this;
                ctrl.brick = $scope.brick;
                ctrl.media = $scope.media;
                ctrl.breadCrumb = [$scope.title];
                ctrl.loadMedia = function(brick) {
                    console.log(brick);
                }
            }
        }
    });
};