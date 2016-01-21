module.exports = function(app,utils) {
    app.directive("directory",function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/directory.html'
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