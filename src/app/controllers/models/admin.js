const mongoose = require('mongoose')
const  Schema  = mongoose.Schema;

const Admin = new Schema({
    admin: {type: String,maxlength: 255 }, // String is shorthand for {type: String}
    password: {type: String,maxlength: 255 },
    },
    {
        collection: 'admin'
    }
);
const Notify = new Schema({
    title: {type: String},
    link: {type: String}
},
{
    collection: 'notify'
}
)

module.exports = {Admin: mongoose.model('Admin', Admin),
Notify: mongoose.model('Notify', Notify)}