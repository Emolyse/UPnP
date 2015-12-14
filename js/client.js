var utils = require("./utils.js");
utils.initIO();

var app = angular.module("UPnP",['ngMaterial','ui.router','angular-toArrayFilter']);

require( "./controllers/serverController.js" )(app,utils);
require( "./directives/mediaExplorer.js" )(app,utils);