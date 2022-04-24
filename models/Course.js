const mongoose = require('mongoose');
const slugify = require('slugify');
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
    },
    slug: {
        type: String,
        unique: true
    },
    //kursları oluştururken bu kursların bir kategorisi olmasını isteriz
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //yeni bir kurs oluşturduğumuzda hangi kullanıcı ile giriş yaptığımızda onun id sini alacağız.
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

//kurs oluşturulduğunda veri tabanına kaydetmeden önce slug oluşturmasını istiyoruz
//slug alanı isim alanından oluşuyor.
CourseSchema.pre('validate',function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict:true
    });
    next();
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;