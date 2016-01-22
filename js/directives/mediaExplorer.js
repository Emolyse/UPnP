module.exports = function(app,utils) {
    app.directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                brick:"=brick"
                ,context:"=context"
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mec"
            ,controller:function ($scope) {
                var ctrl = this;
                //ctrl.idBrick = $scope.idBrick;
                ctrl.breadCrumb = [];
                ctrl.currentDir = 0;
                ctrl.fileTree={
                    0: {
                        id:0,
                        title : $scope.title
                    }
                };

                //On gère le file de navigation ici
                $scope.$watchCollection("context.explorer.directories",function(newDirs){
                    //On complète l'arborescence
                    var dir;
                    for(var id in newDirs){
                        dir = newDirs[id];
                        if(!ctrl.fileTree[dir.id] && dir.parentID){
                            ctrl.fileTree[dir.id] = {
                                id: dir.id,
                                title: dir.name,
                                parentID: dir.parentID
                            };
                        }
                    }
                    var dirId = 0;
                    if(newDirs.length>0){
                        dir = newDirs[0];
                        //On regarde si le dir a un parent
                        if(dir.parentID){
                            //On réccupère le parent (c'est lui qui nous intéresse)
                            if(ctrl.currentDir == dir.parentID)//On a pas bougé
                                return;
                            //console.log(ctrl.currentDir,"devient",dir.parentID);
                            ctrl.currentDir = dir.parentID;
                            dirId = dir.parentID;
                        } else {
                            //console.log(ctrl.currentDir,"devient",0);
                            ctrl.currentDir = 0;
                        }
                    } else {
                        //console.log(ctrl.currentDir,"used");
                        dirId = ctrl.currentDir;
                    }
                    var directory = ctrl.fileTree[dirId];
                    ctrl.breadCrumb = [{id:directory.id,title:directory.title}];
                    ctrl.iter = 0;
                    while ( directory.parentID!==undefined && ctrl.iter<10) {
                        directory = ctrl.fileTree[directory.parentID];
                        ctrl.breadCrumb.unshift({id: directory.id, title: directory.title});
                    }
                });

                ctrl.Browse = function(dir) {
                    var dirId = dir.id ? dir.id : dir;
                    $scope.context.explorer = utils.Browse($scope.brick.id, dirId);
                    ctrl.currentDir = dirId;
                }
            }
        }
    });
};