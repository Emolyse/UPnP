module.exports = function(app,utils) {
    app.directive("mediaRenderer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-renderer.html'
            ,scope:{
                brick:"=brick"
                ,context:"=context"
            }//Chaine passée directement
            ,controllerAs:"mr"
            ,controller:function ($scope,$location,$http) {
                var ctrl = this;
                ctrl.brick = $scope.brick;
                ctrl.updateRenderer = function (id) {
                    $scope.context.rendererId = id;
                }
            }
        }
    });
};