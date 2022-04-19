const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

/* veri tabanımızdaki oluşacak olan kurs dökümanlarının yapısının ne olacağını buradaki şablon sayesinde belirliyoruz*/
const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true
    }
});

//category oluşturulduğunda veri tabanına kaydetmeden önce slug oluşturmasını istiyoruz
//slug alanı isim alanından oluşuyor.
CategorySchema.pre('validate',function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict:true
    });
    next();
})

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;