const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
    category: {
        title: {
            type: String,
            required: true,
        },
    },
    subCategory: {
        title: {
            type: String,
            default: '',
        },
    },
    class: {
        title: {
            type: String,
            default: '',
        },
    },
    subject: {
        title: {
            type: String,
            default: '',
        },
    },
    chapter: {
        title: {
            type: String,
            default: '',
        },
    }
},  {
        timestamps: true,
    });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
