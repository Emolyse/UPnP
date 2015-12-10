var utils = require("./utils.js");
utils.initIO();

var parser = new DOMParser();

var app = angular.module("UPnP",['ngMaterial','ui.router','angular-toArrayFilter']);

require( "./controllers/serverController.js" )(app,utils,parser);
require( "./controllers/mediaController.js" )(app,utils,parser);
require( "./directives/mediaExplorer.js" )(app);