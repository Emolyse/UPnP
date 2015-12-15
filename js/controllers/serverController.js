module.exports = function(app,utils) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        $http.get("/getContext").success(function (data) {
            //ctrl.context = data;
            ctrl.context = {bricks:{}};
            for(var i in data.bricks){
                ctrl.context.bricks[data.bricks[i].id]=data.bricks[i];
            }

            utils.io.on("brickAppears", function (data) {
                ctrl.context.bricks[data.id] = data;
                $scope.$apply();
            });

            utils.io.on("brickDisappears", function (data) {
                delete ctrl.context.bricks[data.brickID];
            });
            ctrl.context.explorer = [];
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
                    var parser = new DOMParser();
                    ctrl.context.explorer.splice(0,ctrl.context.explorer.length);
                    var doc = parser.parseFromString(str, "text/xml");
                    var res = doc.querySelector("Result");
                    var content = parser.parseFromString(res.textContent, "text/xml");
                    var containers = content.querySelectorAll("container");
                    for(var i=0;i<containers.length;i++){
                        var dir = {};
                        var attr = containers[i].attributes;
                        if(attr)
                            for(var j=0;j<attr.length;j++){
                                dir[attr[j].name]=attr[j].value;
                            }
                        var children = containers[i].children;
                        if(children)
                            for(var j=0;j<children.length;j++){
                                var name = children[j].tagName+"";
                                name = name.split(':');
                                name = name[name.length-1];
                                dir[name]=children[i].textContent;
                            }
                        ctrl.context.explorer.push(dir);
                    }
                    $scope.$apply();
                    console.log(ctrl.context.explorer);
                });
        }


        /**********************************************
         *              Mise en forme                 *
         **********************************************/



    }]);
}