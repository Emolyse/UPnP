var utils = require("./utils.js");
console.log(utils);
utils.initIO();

var parser = new DOMParser();

angular.module("UPnP", ['ngMaterial','ui.router','angular-toArrayFilter'])
    .controller("UPnPController", function ($scope,$http) {
        var ctrl = this;
        $http.get("/getContext").success(function (data) {
            ctrl.context = data;
            console.log("ctrl.context");
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

        ctrl.Browse = function (brick) {
            utils.call(brick.id
                , "Browse"
                , [0]
                , function (str) {
                    var doc = parser.parseFromString(str, "text/xml");
                    var res = doc.querySelector("Result");
                    console.log(res);
                });
        }
    })
    .directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                bricks:"=bricks"//
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mc"
            ,controller:function($scope){
                this.breadCrumb = [];
            }
        }
    });
