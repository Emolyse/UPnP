module.exports = function(app,utils) {
    app.directive("media",function() {
        return {
            restrict: 'E'
            , templateUrl: 'templates/media.html'
            , scope: {
                media: "=media",
                context: "=context",
                brick: "=brick"
            }//Chaine passée directement
            , controllerAs: "mc"
            , controller: function ($scope) {
                var ctrl = this;
                ctrl.updateMedia = function (mediaId) {
                    $scope.context.loadedMedia = mediaId;
                };
                ctrl.loadMedias = function (serverId, rendererId, media){
                    $scope.context.mediaName = media.name;
                    utils.call(rendererId
                        , "loadMedia"
                        , [serverId, media.id]
                        , function (res) {
                            $scope.context.loadedMedia = media.id;
                        });
                };
            }
        }
    });
}