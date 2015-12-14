module.exports = function(app,utils,parser) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        $http.get("/getContext").success(function (data) {
            //ctrl.context = data;
            ctrl.context = {bricks:{}};
            for(var i in data.bricks){
                console.log();
                ctrl.context.bricks[data.bricks[i].id]=data.bricks[i];
            }
            console.log(data);
            console.log("ctrl.context.bricks", ctrl.context.bricks);

            utils.io.on("brickAppears", function (data) {
                console.log("brickAppears", data);
                ctrl.context.bricks[data.id] = data;
                $scope.$apply();
            });

            utils.io.on("brickDisappears", function (data) {
                console.log("brickDisappears", data);
                delete ctrl.context.bricks[data.brickID];
            })
        });

        /**
         * @name Browse
         * @description 
         * @param brick 
         * @param dirId 
         */
        ctrl.Browse = function (brick,dirId) {
            if(!dirId)
                dirId = 0;
            utils.call(brick.id
                , "Browse"
                , [dirId]
                , function (str) {
                    var doc = parser.parseFromString(str, "text/xml");
                    console.log(doc);
                    var res = doc.querySelector("Result");
                    console.log(res);
                });
        }


        /**********************************************
         *              Mise en forme                 *
         **********************************************/



    }]);
}