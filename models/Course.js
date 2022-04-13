const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* veri tabanımızdaki oluşacak olan kurs dökümanlarının yapısının ne olacağını buradaki şablon sayesinde belirliyoruz*/
const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description : {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;