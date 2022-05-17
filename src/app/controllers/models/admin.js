const mongoose = require('mongoose')
const  Schema  = mongoose.Schema;

const Admin = new Schema({
    user: {type: String,maxlength: 255 }, // String is shorthand for {type: String}
    password: {type: String,maxlength: 255 },
    },
    {
        collection: 'admin'
    }
);

module.exports = mongoose.model('Admin', Admin)