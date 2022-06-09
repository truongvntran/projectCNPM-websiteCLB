const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const  Schema  = mongoose.Schema;

const Admin = new Schema({
    admin: {type: String,maxlength: 255 }, // String is shorthand for {type: String}
    password: {type: String,maxlength: 255 },
    },
    {
        collection: 'admin'
    }
)

const BQT = new Schema({
    fullname: {type: String},
    avatar: {type: String},
    office: {type: String},
},
{
    collection: 'BQT',
    timestamps: true,
}
)

const Chairman = new Schema({
    fullname: {type: String},
    year: {type: String},
    avatar: {type: String},
},
{
    collection: 'chairman',
    timestamps: true,
}
)

const News = new Schema({
    title: {type: String},
    link: {type: String},
    img: {type: String},
    content: {type: String},
    type: {type: String},
},
{
    collection: 'news',
    timestamps: true,
}
)

const Researchs = new Schema({
    title: {type: String},
    link: {type: String},
    img: {type: String},
    content: {type: String},
    type: {type: String},
},
{
    collection: 'research',
    timestamps: true,
}
)

const Contact = new Schema({
    phone: {type: String},
    address: {type: String},
    email: {type: String},
    type: {type: String},
},
{
    collection: 'contact',
    timestamps: true,
}
)

const Document = new Schema({
    title: {type: String},
    img: {type: String},
    content: {type: String},
    link: {type: String},
    type: {type: String},
},
{
    collection: 'document',
    timestamps: true,
}
)

const Group = new Schema({
    name: {type: String},
    leader: {type: String},
    nameLeader: {type: String},
    avatar: {type: String},
    description: {type: String},
    type: {type: String},
},
{
    collection: 'group',
    timestamps: true,
}
)

BQT.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });
News.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });
Researchs.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });
Contact.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });
Document.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });
Group.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' });


module.exports = {Admin: mongoose.model('Admin', Admin),
BQT: mongoose.model('BQT', BQT),
News: mongoose.model('News', News),
Researchs: mongoose.model('Researchs', Researchs),
Contact: mongoose.model('Contact', Contact),
Document: mongoose.model('Document', Document),
Group: mongoose.model('Group', Group),
Chairman: mongoose.model('Chairman', Chairman),
}