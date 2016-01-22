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
                ctrl = this;
                ctrl.updateMedia = function (mediaId) {
                    $scope.context.loadedMedia = mediaId;
                };
                ctrl.loadMedias = function (serverId, rendererId, mediaId){
                    alert(serverId);
                    alert(rendererId);
                    alert(mediaId);
                    utils.call(rendererId
                        , "loadMedia"
                        , [serverId, mediaId]
                        , function (res) {
                            $scope.context.loadedMedia = mediaId;
                        });
                };
            }
        }
    });
}