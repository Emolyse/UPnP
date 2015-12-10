module.exports = function(app,utils) {
    app.directive("mediaExplorer",function(){
        return{
            restrict:'E'
            ,templateUrl:'templates/media-explorer.html'
            ,scope:{
                bricks:"=bricks"//
                ,title:"@title"}//Chaine passée directement
            ,controllerAs:"mc"
        }
    });
}