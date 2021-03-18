// Load the application controllers
const indexController = require('../controllers/index.server.controller');
const studentController = require('../controllers/student.server.controller');
const courseController = require('../controllers/course.server.controller');
const apiPrefix = '/api/';

// Define the routes module' method
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', indexController.render); //go to http://localhost:3000/

    app.post('/signin', studentController.authenticate);
    app.get('/signout', studentController.signout);
    app.get('/read_cookie', studentController.isSignedIn);

    app.route(apiPrefix + 'students')
        .get(studentController.list)
        .post(studentController.create);

    app.route(apiPrefix + 'courses')
        .get(courseController.list)
        .post(courseController.create);
    //app.get(apiPrefix + 'students', studentController.list);

    //
    app.route('/api/showcourse/:courseId')
    .get(courseController.courseByID)
    .put(courseController.update)
    .delete(courseController.delete);
    //
    app.route('/api/studentCourses/:studentId')
    .get(courseController.listCoursesByStudentId);
    //
    app.param('courseId', courseController.courseByID);
    app.param('studentId', courseController.listCoursesByStudentId);

};
