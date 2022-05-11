## sử dụng mongoose
1. cài đặt npm mongoose :

```
npm install mongoose --save
```
2. cấu hình code tại model/students-mode.js
```
const mongoose = require('mongoose');

//dựng schema
const studentsTestSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    ranker: {
        type:String,
        required:true
    },
    slug: {
        type: String
    }
})
//hàm dựng để sử dụng studentsTest
//studentsTable là collection
let studentsTemp = mongoose.model("studentsTable", studentsTestSchema);

module.exports = studentsTemp;
```
import vào model/index.js
```
const modelStudents = require('./students-model');
const a = 'b';
module.exports = {
    modelStudents:modelStudents,
    a : a
};
```

import  vào index.js
```
//import mongoose + import modelStudents từ model
const mongoose = require('mongoose');
const {modelStudents} = require('./model');
```
cấu hình .env tránh bị lộ link mongo
```
MONGODB_URL='mongodb://172.17.0.2:27017/studentsTest'
// studentsTest ở đây là database
```

#### connect to mongoDB
```
//Connect.db
mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Connect to DB");
})
```

chạy app check
```
app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`);
})
```

##### X GET /students
```
- [ get list ]
app.get('/students',async (req,res) => {
    // res.send("hello World list");
    try {
        const students = await modelStudents.find();
        res.status(200).json(students);
    } catch(err) {
        console.log(err + "");
    }
});
```

##### X GET /students/:id
```
- [get :id]
app.get(`/students/:id`,async (req,res) => {
    try {
        // console.log(req.params.id);
        const students = await modelStudents.find({"_id": req.params.id});
        // res.send(students);
        res.status(200).json(students);
    } catch(err) {
        console.log(err + "");
    }
})
```

##### X GET /students?q=""&ranker=""
```
app.get(`/students`,async (req,res) => {
    try {
        // console.log(req.query.q);
        const slugQ = slugify(req.query.q, {
            replacement: '-',
            lower: true,
            trim: true
        });
        console.log(slugQ);
        const ranker = slugify(req.query.ranker, {
            replacement: '-',
            lower: true,
            trim: true
        });
        console.log(ranker);
        const students = await modelStudents.find({
            $and: [
                { $or: [
                    {"phone" : slugQ}, 
                    {"email" : slugQ},  
                    {"slug" : slugQ}
                ]},
                {"ranker" : ranker}
            ]
        })
        res.status(200).json(students);
    } catch(err) {
        console.log(err + "");
    }
})
```

##### X POST /students
```
app.post('/students',async (req,res) => {
    // res.send("create students");
    //studentsTTT ở đây là hàm dựng ở './model/model/'
    let fullName = req.body.firstName + ' ' + req.body.lastName;
    console.log(fullName);
    const slugName = slugify(fullName, {
        lower : true
    });
    console.log(slugName);
    const students = new modelStudents({
        slug : slugName,
        ...req.body
    })
    try {
        // res.status(200).json(req.body);
        await students.save();
        res.status(200).json(req.body);
    } catch(err) {
        console.log(err + "");
    }
})
```