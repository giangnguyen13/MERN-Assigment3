const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = mongoose.model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
}
//
exports.create = function (req, res) {
    Student.findOne({ _id: req.body.creator }, (err, user) => {
        if (err) {
            return getErrorMessage(err);
        }
        //
        req.id = user._id;
        console.log('user._id', req.id);
    }).then(function () {
        console.log('in the then function');
        let course = new Course(req.body);
        course.creator = req.id;

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err));

                return res.status(400).send({
                    message: getErrorMessage(err),
                });
            } else {
                res.status(200).json(course);
            }
        });
    });
};
//
exports.list = function (req, res) {
    Course.find()
        .sort('-created')
        .populate('creator', 'courseCode courseName section semester')
        .exec((err, courses) => {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err),
                });
            } else {
                res.status(200).json(filterDuplicateCourses(courses));
            }
        });
};
//
exports.listStudentsInCourse = function (req, res, next, courseCode) {
    var query = { courseCode: courseCode };
    Course.find(query, (err, courses) => {
        const studentIds = courses.map((course) => course.creator);
        Student.find({ _id: { $in: studentIds } }, function (err, result) {
            if (err) {
                res.status(200).json({});
            } else {
                res.status(200).json(result);
            }
        });
    });
};
//
exports.listCoursesByStudentId = function (req, res, next, studentId) {
    var query = { creator: studentId };
    Course.find(query)
        .sort('-created')
        .populate('creator', 'courseCode courseName section semester')
        .exec((err, courses) => {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err),
                });
            } else {
                res.status(200).json(courses);
            }
        });
};
//
exports.courseByID = function (req, res, next, courseId) {
    console.log('in courseById:', courseId);

    Course.findById(courseId)
        .populate('creator', 'courseCode courseName section semester')
        .exec((err, course) => {
            if (err) return next(err);
            if (!course) return next(new Error('Failed to load course ' + id));
            req.course = course;
            //console.log('in courseById:', req.course);
            res.status(200).json(course);

            next();
        });
};
//
exports.read = function (req, res, next) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res, next) {
    console.log('update');
    console.log('in update:', req.body);
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err),
            });
        }
    });
};
//
exports.delete = function (req, res) {
    var query = { _id: req.course._id };

    Course.remove(query, (err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err),
            });
        }
    });
};
//
function filterDuplicateCourses(courses) {
    let courseCodes = [];
    var filteredCourses = [];
    for (let i = 0; i < courses.length; i++) {
        console.log(courses[i].courseCode);
        if (!courseCodes.includes(courses[i].courseCode)) {
            courseCodes.push(courses[i].courseCode);
            filteredCourses.push(courses[i]);
        }
    }
    return filteredCourses;
}
