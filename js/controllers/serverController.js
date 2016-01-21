module.exports = function(app,utils) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        ctrl.firstbrick = {};
        $http.get("/getContext").success(function (data) {
            //ctrl.context = data;
            ctrl.context = {bricks:{}};
            var init = true;
            for(var i in data.bricks){
                ctrl.context.bricks[data.bricks[i].id]=data.bricks[i];
                if(init){
                    ctrl.firstbrick = data.bricks[i];
                    init = false;
                }
            }

            ctrl.func = utils.io.on("brickAppears", function (data) {
                ctrl.context.bricks[data.id] = data;
            });

            utils.io.on("brickDisappears", function (data) {
                delete ctrl.context.bricks[data.id];
            });

            ctrl.context.explorer = [];
            ctrl.context.directories= [];
            ctrl.context.medias = [];
            ctrl.rendererId = '-1';
            ctrl.browses(ctrl.firstbrick, 0);
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


        ctrl.browses = function (brick, dirId) {

            utils.call(brick.id
                , "Browse"
                , [dirId]
                , function (str) {
                    if(!dirId)
                        dirId = 0;
                    var parser = new DOMParser();
                    var json = {medias: [], directories: []};
                    var doc = parser.parseFromString(str, "text/xml");
                    var Result = doc.querySelector('Result');
                    console.log(str);
                    if(Result) {
                        var ResultDoc = parser.parseFromString(Result.textContent, "text/xml");
                        var L_containers = ResultDoc.querySelectorAll('container'), i, title, icon;
                        for(i=0; i<L_containers.length; i++) {
                            var container	= L_containers.item(i);
                            title	= container.querySelector('title').textContent; //container.getElementsByTagName('title').item(0).textContent;
                            icon	= container.querySelector('albumArtURI'); icon = icon?icon.textContent:"./img/folder.jpg";
                            json.directories.push( {serverId: brick.id, name: title, iconURL: icon, directory: container.getAttribute("id")} );
                        }
                        var L_items	= ResultDoc.querySelectorAll('item');
                        for(i=0; i<L_items.length; i++) {
                            var item	= L_items.item(i);
                            title	= item.querySelector('title').textContent; //item.getElementsByTagName('title').item(0).textContent;
                            icon	= item.querySelector('albumArtURI'); icon = icon?icon.textContent:"./images/icons/media_icon.jpg";
                            json.medias.push( {serverId: brick.id, name: title, iconURL: icon, mediaId: item.getAttribute("id")} );
                        }
                    }
                    console.log(json);
                    ctrl.context.directories = json.directories;
                    ctrl.context.medias = json.medias;
                    console.log(ctrl.context.directories);
                });
        };

        ctrl.loadMedias = function (serverId, rendererId, mediaID){
            utils.call(rendererId
                , "loadMedia"
                , [serverId, mediaID])
        };

        ctrl.play = function (rendererId){
            utils.call(rendererId
                , "Play"
                , []
                , function (str) {
                    console.log(str);
                    console.log("play");
                });
        };

        ctrl.setRenderer = function (rendererId){
            ctrl.rendererId = rendererId;
        };


        /**********************************************
         *              Mise en forme                 *
         **********************************************/



    }]);
}