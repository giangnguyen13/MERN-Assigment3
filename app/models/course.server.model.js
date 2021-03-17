const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        trim: true,
        required: 'Course Code cannot be blank',
    },
    courseName: {
        type: String,
        trim: true,
        required: 'Course Name cannot be blank',
    },
    section: Number,
    semester: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Student',
    },
});

CourseSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

mongoose.model('Course', CourseSchema);
