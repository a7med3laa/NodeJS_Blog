const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {
    JSDOM
} = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
 
    ,
    senitizedHtml: {
        type: String,
        required: true
    }


});


articleSchema.pre('validate', function (next) {
    if (this.markdown) {
        this.senitizedHtml = domPurify.sanitize(marked(this.markdown));
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema);