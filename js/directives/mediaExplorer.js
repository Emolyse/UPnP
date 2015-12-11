module.exports = function(app,utils) {
    app.directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                bricks:"=bricks"//
                ,explorer:"=explorer"
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mc"
            ,controller:function ($scope,$location,$http) {
                var ctrl = this;
                ctrl.breadCrumb = [$scope.title];
                ctrl.bricks = $scope.bricks;
                ctrl.explorer = $scope.explorer;
                ctrl.Browse = function (brick,dirId) {
                    console.log("bananas");
                    if(!dirId)
                        dirId = 0;
                    utils.call(brick.id
                        , "Browse"
                        , [dirId]
                        , function (str) {
                            var parser = new DOMParser();
                            ctrl.explorer.splice(0,ctrl.explorer.length);
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
                                        //name = name.split(':');
                                        //name = name[name.length-1];
                                        dir[name]=children[i].textContent;
                                    }
                                ctrl.explorer.push(dir);
                            }
                            $scope.$apply();
                        });
                }
            }
        }
    });
}