module.exports = function(app,utils) {
    app.directive("player",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/player.html'
            ,scope:{
                context:"=context"
            }//Chaine passée directement
            ,controllerAs:"pc"
            ,controller:function ($scope) {
                var pc = this;
                pc.volume = 100;
                $scope.$watch('pc.volume', function() {
                    pc.SetVolume(pc.volume);
                });

                pc.Play = function(rendererId) {
                    utils.call(rendererId
                        ,'Play'
                        ,[]
                        , function(res){
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

                pc.SetVolume = function(volume) {
                    utils.call($scope.context.rendererId
                        ,'setVolume'
                        ,[volume]
                        , function(res){
                        });
                };
                pc.SetVolume(100);
            }
        }
    });
};