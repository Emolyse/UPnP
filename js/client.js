var utils = require("./utils.js");
utils.initIO();

var app = angular.module("UPnP",['ngMaterial','ui.router','angular-toArrayFilter'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange')
            .warnPalette('red');
    });

require( "./controllers/serverController.js" )(app,utils);
require( "./directives/serverExplorer.js" )(app,utils);
require( "./directives/mediaExplorer.js" )(app,utils);
require( "./directives/directory.js" )(app,utils);
require( "./directives/media.js" )(app,utils);
require( "./directives/player.js" )(app,utils);
require( "./directives/mediaRenderer.js" )(app,utils);
