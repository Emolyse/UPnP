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
                $scope.$watch("context.explorer.directories",function(){
                    var dirs = $scope.context.directories;
                    console.log("##############"+$scope.brick.name+"#############");
                    console.log("Current",ctrl.currentDir,dirs);
                    var dirId = 0;
                    if(dirs.length>0){
                        var dir = $scope.context.directories[0];
                        //On regarde si le dir a un parent
                        if(dir.parentID){
                            //On réccupère le parent (c'est lui qui nous intéresse)
                            if(ctrl.currentDir == dir.parentID)//On a pas bougé
                                return;
                            console.log("Current devient", ctrl.currentDir, dir.parentID);
                            ctrl.currentDir = dir.parentID;
                            dirId = dir.parentID;
                        } else {
                            dirId = 0;
                            ctrl.currentDir = 0;
                        }

                    } else {
                        dirId = ctrl.currentDir;
                        console.log("on garde le current");
                    }
                    var directory = ctrl.fileTree[dirId];
                    ctrl.breadCrumb = [{id:directory.id,title:directory.title}];
                    ctrl.iter = 0;
                    while ( directory.parentID !== undefined && ctrl.iter<10) {
                        directory = ctrl.fileTree[directory.parentID];
                        ctrl.breadCrumb.unshift({id: directory.id, title: directory.title});
                    }

                    console.log("###################################");
                });

                ctrl.Browse = function(dir){
                    if(dir.id) {
                        //On remplie l'arborescence parcourue ici
                        if (dir.parentID && !ctrl.fileTree[dir.id]) {
                            ctrl.fileTree[dir.id] = {
                                id: dir.id,
                                title: dir.name,
                                parentID: dir.parentID
                            };
                        }
                        ctrl.currentDir = dir.id;
                        $scope.context.explorer = utils.Browse($scope.brick.id, dir.id);
                    } else{
                        ctrl.currentDir = dir;
                        $scope.context.explorer = utils.Browse($scope.brick.id, dir);
                    }
                };
            }
        }
    });
};