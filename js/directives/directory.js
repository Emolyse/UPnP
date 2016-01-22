module.exports = function(app,utils) {
    app.directive("directory",function() {
        return {
            restrict: 'E'
            , template: '{{dirName}}'
            , scope: {
                dirName: "="
            }//Chaine passée directement
        }
    });
}