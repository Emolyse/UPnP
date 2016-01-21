module.exports = function(app,utils) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        ctrl.context = {bricks:{}};
        ctrl.firstbrick = {};
        $http.get("/getContext").success(function (data) {
            var init = true;
            for(var i in data.bricks) {
                ctrl.context.bricks[data.bricks[i].id] = data.bricks[i];
                if(init &&  ctrl.context.bricks[i].type[2] === "BrickUPnP_MediaServer"){
                    ctrl.firstbrick = data.bricks[i];
                    init = false;
                }
            }

            ctrl.func = utils.io.on("brickAppears", function (data) {
                console.log('brickAppears');
                ctrl.context.bricks[data.id] = data;
            });

            utils.io.on("brickDisappears", function (data) {
                console.log('brickDisappears');
                delete ctrl.context.bricks[data.id];
            });

            ctrl.context.directories= [];
            ctrl.context.medias = [];
            ctrl.context.rendererId = '-1';

        });

        ctrl.loadMedias = function (serverId, rendererId, mediaId){
            utils.call(rendererId
                , "loadMedia"
                , [serverId, mediaId]
                , function (res) {
                    ctrl.context.loadedMedia = mediaId;
                });
        };

        ctrl.play = function (rendererId){
            utils.call(rendererId
                , "Play"
                , []
                , function (str) {
                    console.log("play");
                });
        };

        ctrl.setRenderer = function (rendererId){
            ctrl.context.rendererId = rendererId;
        };


        /**********************************************
         *              Mise en forme                 *
         **********************************************/



    }]);
}