module.exports = function(app,utils) {
    app.directive("player",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/player.html'
            ,scope:{
                renderer:"=renderer"
            }//Chaine passée directement
            ,controllerAs:"pc"
            ,controller:function ($scope) {
                var pc = this;
                pc.Play = function(rendererId) {
                    utils.call(rendererId
                        ,'Play'
                        ,[]
                        , function(res, rendererId){
                            console.log(rendererId);
                            console.log("En cours de lecture");
                        });
                };

                pc.Stop = function(rendererId) {
                    utils.call(rendererId
                        ,'Stop'
                        ,[]
                        , function(res){
                        });
                };

                pc.Pause = function(rendererId) {
                    utils.call(rendererId
                        ,'Pause'
                        ,[]
                        , function(res){
                        });
                };
            }
        }
    });
};