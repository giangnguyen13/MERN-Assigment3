// Load the application controllers
var indexController = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', indexController.render); //go to http://localhost:3000/
};
