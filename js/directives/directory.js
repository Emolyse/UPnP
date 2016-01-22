module.exports = function(app,utils) {
    app.directive("directory",function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/directory.html'
            , scope: {
                dirName: "="
            }//Chaine passée directement
        }
    });
}