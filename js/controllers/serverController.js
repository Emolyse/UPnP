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
                ctrl.context.bricks[data.id] = data;
            });

            utils.io.on("brickDisappears", function (data) {
                delete ctrl.context.bricks[data.id];
            });

            ctrl.context.directories= [];
            ctrl.context.medias = [];
            ctrl.context.rendererId = '-1';
            ctrl.Browse(ctrl.context,ctrl.firstbrick.id, 0);
        });

        utils.Browse = function (brickId,dirId) {
            if(!dirId)
                dirId = 0;
            var explorer = {medias: [], directories: []};
            utils.call(brickId
                , "Browse"
                , [dirId]
                , function (str) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(str, "text/xml");
                    console.log("Params",brickId,dirId);
                    var Result = doc.querySelector('Result');
                    console.log(str);
                    if(Result) {
                        var ResultDoc = parser.parseFromString(Result.textContent, "text/xml");
                        var L_containers = ResultDoc.querySelectorAll('container'), i, title, icon;
                        for(i=0; i<L_containers.length; i++) {
                            var container	= L_containers.item(i);
                            title	= container.querySelector('title').textContent; //container.getElementsByTagName('title').item(0).textContent;
                            icon	= container.querySelector('albumArtURI'); icon = icon?icon.textContent:"./img/folder.jpg";
                            explorer.directories.push( {serverId: brickId, name: title, iconURL: icon, id: container.getAttribute("id")} );
                        }
                        var L_items	= ResultDoc.querySelectorAll('item');
                        for(i=0; i<L_items.length; i++) {
                            var item	= L_items.item(i);
                            title	= item.querySelector('title').textContent; //item.getElementsByTagName('title').item(0).textContent;
                            icon	= item.querySelector('albumArtURI'); icon = icon?icon.textContent:"./images/icons/media_icon.jpg";
                            explorer.medias.push( {serverId: brickId, name: title, iconURL: icon, id: item.getAttribute("id")} );
                        }
                    }
                });
                return explorer;
        };

        ctrl.Browse = function(brickId,dirId){
            ctrl.context.explorer = utils.Browse(brickId,dirId);
        };

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