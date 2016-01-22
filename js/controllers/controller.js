module.exports = function(app,utils) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        ctrl.context = {bricks:{}};
        ctrl.firstbrick = {};
        ctrl.context.loadedMedia = '1';
        ctrl.context.rendererId = '-1';
        $http.get("/getContext").success(function (data) {
            var init = true;
            for(var i in data.bricks) {
                ctrl.context.bricks[data.bricks[i].id] = data.bricks[i];
                if(init &&  ctrl.context.bricks[i].type[2] === "BrickUPnP_MediaServer"){
                    ctrl.firstbrick = data.bricks[i];
                    init = false;
                }
            }

            utils.io.on("brickAppears", function (data) {
                console.log('brickAppears');
                $scope.$applyAsync(function () {
                    if (!ctrl.context.bricks[data.id]) {
                        ctrl.context.bricks[data.id] = data;
                    }
                });
            });

            utils.io.on("brickDisappears", function (data) {
                $scope.$applyAsync(function () {
                    console.log('brickDisappears');
                    delete ctrl.context.bricks[data.brickId];
                });
            });

            ctrl.context.directories= [];
            ctrl.context.medias = [];

        });

        ctrl.setRenderer = function (rendererId){
            ctrl.context.rendererId = rendererId;
        };

        /**********************************************
         *              Mise en forme                 *
         **********************************************/



    }]);
}