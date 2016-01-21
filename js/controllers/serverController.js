module.exports = function(app,utils) {
    app.controller("sc", ['$scope','$location', '$http',function ($scope,$location,$http) {
        var ctrl = this;
        ctrl.context = {bricks:{}};

        $http.get("/getContext").success(function (data) {
            //ctrl.context = data;
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
            ctrl.browses(ctrl.firstbrick, 0);
        });
        ctrl.context.loadedMedia = -1;

        /**
         * @name Browse
         * @description 
         * @param brick 
         * @param dirId 
         */
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
                    ctrl.context.directories = json.directories;
                    ctrl.context.medias = json.medias;
                });
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