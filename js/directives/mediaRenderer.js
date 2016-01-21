module.exports = function(app,utils) {
    app.directive("mediaRenderer",function(){
        return{
            restrict:'E'
            ,template:'templates/media-renderer.html'
            ,scope:{
                brick:"=brick"
                ,current:"=current"
                }//Chaine passée directement
            ,controllerAs:"mr"
            ,controller:function ($scope,$location,$http) {
                var ctrl = this;
                ctrl.brick = $scope.brick;
                ctrl.updateRenderer = function (id) {
                    $scope.current = id;
                }
            }
        }
    });
};