module.exports = function(app,utils) {
    app.directive("media",function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/media.html'
            , scope: {
                brick: "=brick"
                , context: "=context"
                , title: "@title"
            }//Chaine passée directement
            , controllerAs: "mc"
            , controller: function ($scope) {

            }
        }
    });
}